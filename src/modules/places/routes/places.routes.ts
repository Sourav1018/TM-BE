import { Router } from "express";
import type { RequestHandler } from "express";
import type { PlacesController } from "@/modules/places/controllers/places.controller";

export class PlacesRoutes {
  private readonly placesRouter = Router();
  private readonly publicRouter = Router();
  private readonly protectedRouter = Router();

  constructor(
    private readonly placesController: PlacesController,
    private readonly protectedMiddlewares: RequestHandler[] = [],
  ) {
    this.registerPublicRoutes();
    this.registerProtectedRoutes();
    this.mountRouteGroups();
  }

  private registerPublicRoutes() {
    this.publicRouter.get("/", this.placesController.getPlacesModuleStatus);
  }

  private registerProtectedRoutes() {
    this.protectedRouter.post("/", this.placesController.createPlace);
    this.protectedRouter.put("/:id", this.placesController.updatePlace);
  }

  private mountRouteGroups() {
    this.placesRouter.use("/", this.publicRouter);
    this.placesRouter.use("/", ...this.protectedMiddlewares, this.protectedRouter);
  }

  getRouter() {
    return this.placesRouter;
  }
}

export function createPlacesRouter(
  placesController: PlacesController,
  protectedMiddlewares: RequestHandler[] = [],
) {
  return new PlacesRoutes(placesController, protectedMiddlewares).getRouter();
}
