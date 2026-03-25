import express, { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript server is running." });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
