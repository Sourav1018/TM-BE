import { Router } from "express";
import type { RequestHandler } from "express";
import type { PackagesController } from "@/modules/packages/controllers/packages.controller";

export class PackagesRoutes {
  private readonly packagesRouter = Router();
  private readonly publicRouter = Router();
  private readonly protectedRouter = Router();

  constructor(
    private readonly packagesController: PackagesController,
    private readonly protectedMiddlewares: RequestHandler[] = [],
  ) {
    this.registerPublicRoutes();
    this.registerProtectedRoutes();
    this.mountRouteGroups();
  }

  private registerPublicRoutes() {
    this.publicRouter.get("/", this.packagesController.getPackagesModuleStatus);
  }

  private registerProtectedRoutes() {
    this.protectedRouter.post("/", this.packagesController.createPackage);
  }

  private mountRouteGroups() {
    this.packagesRouter.use("/", this.publicRouter);
    this.packagesRouter.use("/", ...this.protectedMiddlewares, this.protectedRouter);
  }

  getRouter() {
    return this.packagesRouter;
  }
}

export function createPackagesRouter(
  packagesController: PackagesController,
  protectedMiddlewares: RequestHandler[] = [],
) {
  return new PackagesRoutes(packagesController, protectedMiddlewares).getRouter();
}
