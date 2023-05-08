import { exec } from "child_process";
import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.SUMO_PORT || 3000;

const cwd = process.cwd();

const command = `${cwd}/sumo-files/sumo/bin/sumo -c ${cwd}/sumo-files/demo/demo.sumocfg`;

app.get("/", (_: Request, res: Response) => {
  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      res.status(500).send({ error, stderr });
    } else {
      res.send({
        data: stdout.split(/\r\n|\r|\n/).map((step) => step.trim()),
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
