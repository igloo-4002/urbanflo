import { exec } from "child_process";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.SUMO_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/demo", (_, res) => {
  exec("../sumo/bin/sumo -c ../demo/demo.sumocfg", (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);

    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send({ error: "Execution failed" });
    }
    res.send({ output: stdout });
  });
});
