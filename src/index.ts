import express, { Request, Response } from "express";
import { env } from "env";
import { prisma } from "@/lib/prisma";

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript server is running." });
});

async function startServer() {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Database connection established.");

  const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });

  let isShuttingDown = false;

  const shutdown = async (signal: NodeJS.Signals) => {
    if (isShuttingDown) {
      console.log(`Shutdown already in progress. Ignoring ${signal}.`);
      return;
    }
    isShuttingDown = true;
    console.log(`Received ${signal}. Shutting down gracefully...`);

    const forceExitTimer = setTimeout(() => {
      console.error("Graceful shutdown timed out. Forcing exit.");
      process.exit(1);
    }, 10000);
    forceExitTimer.unref();

    server.close(async (error?: Error) => {
      clearTimeout(forceExitTimer);
      if (error) {
        console.error("Error while closing HTTP server:", error);
      }
      try {
        await prisma.$disconnect();
        console.log("Disconnected from database.");
        process.exit(error ? 1 : 0);
      } catch (disconnectError) {
        console.error("Error while disconnecting database:", disconnectError);
        process.exit(1);
      }
    });
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

startServer().catch(async (error: unknown) => {
  console.error("Failed to start server:", error);
  await prisma.$disconnect();
  process.exit(1);
});
