import { Router } from "express";
import type { PackagesController } from "@/modules/packages/packages.controller";

export function createPackagesRouter(packagesController: PackagesController) {
  const packagesRouter = Router();

  packagesRouter.get("/", packagesController.getPackagesModuleStatus);
  packagesRouter.post("/", packagesController.createPackage);

  return packagesRouter;
}
