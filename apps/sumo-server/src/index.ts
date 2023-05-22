import { exec, spawn } from "child_process";
import express, { type Request, type Response } from "express";
import multer from "multer";

let count = 0;
const app = express();
const port = process.env.SUMO_PORT || 3000;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, `${process.cwd()}/uploads/`);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}}`);
  },
});

const uploads = multer({ storage });

const command = `/usr/local/bin/sumo -c ${process.cwd()}/sumo-files/demo/demo.sumocfg`;

app.post(
  "/simulation",
  uploads.fields([
    { name: "network", maxCount: 1 }, // this should be three files, nod.xml, edg.xml. con.xml
    { name: "routes", maxCount: 1 },
  ]),
  (_req: Request, res: Response) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        res.status(500).send({ error, stderr });
      } else {
        res.send({
          data: stdout.split(/\r\n|\r|\n/).map((step) => step.trim()),
        });
      }
    });
  },
);

app.get("/start-simulation", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const traciProcess = spawn(
    `/usr/local/bin/python3 ${process.cwd()}/src/get_vehicle_positions.py`,
    { shell: true },
  );

  _req.on("close", () => {
    traciProcess.kill("SIGINT");
  });

  traciProcess.stdout.on("data", (data) => {
    count++;
    console.log("server ran", count, "times");
    res.write(`data: ${data}\n\n`);
  });

  traciProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  traciProcess.on("close", (code) => {
    console.log(`python process exited with code ${code}`);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
