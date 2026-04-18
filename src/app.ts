import express from "express";
import { registerModules } from "@/modules";

export function createApp() {
  const app = express();

  app.use(express.json());
  registerModules(app);

  return app;
}

const app = createApp();

export default app;