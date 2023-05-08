import { exec } from "child_process";
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

const command = `${process.cwd()}/sumo-files/sumo/bin/sumo -c ${process.cwd()}/sumo-files/demo/demo.sumocfg`;
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
