import { Application } from "express";
import { healthRouter } from "@/modules/health";
import { geographyRouter } from "@/modules/geography";
import { packagesRouter } from "@/modules/packages";
import { contentMediaRouter } from "@/modules/content-media";

export function registerModules(app: Application) {
  app.use("/", healthRouter);
  app.use("/api/v1/geography", geographyRouter);
  app.use("/api/v1/packages", packagesRouter);
  app.use("/api/v1/content-media", contentMediaRouter);
}
