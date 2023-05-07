import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.SUMO_PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
