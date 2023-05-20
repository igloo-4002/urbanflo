import { exec, spawn } from "child_process";
import express, { type Request, type Response } from "express";
import multer from "multer";

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
    { name: "network", maxCount: 1 },
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

app.get("/simulation", (_req: Request, res: Response) => {
  const sumoProcess = spawn(command, { shell: true });

  sumoProcess.stdout.on("data", (data) => {
    console.log(`from sumo stdout: ${data}`);
  });

  sumoProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  sumoProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.redirect("/traci");
  });
});

app.get("/traci", (_req: Request, res: Response) => {
  const traciProcess = spawn(
    `/usr/local/bin/python3 ${process.cwd()}/src/get_vehicle_positions.py`,
    { shell: true },
  );

  let traciData = "";
  traciProcess.stdout.on("data", (data) => {
    traciData += data;
    console.log(`from traci stdout: ${data}`);
  });

  traciProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  traciProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.send({ data: traciData });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
