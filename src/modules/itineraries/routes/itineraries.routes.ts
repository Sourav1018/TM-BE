import { Router } from "express";
import type { RequestHandler } from "express";
import type { ItinerariesController } from "@/modules/itineraries/controllers/itineraries.controller";

export class ItinerariesRoutes {
  private readonly itinerariesRouter = Router();
  private readonly publicRouter = Router();
  private readonly protectedRouter = Router();

  constructor(
    private readonly itinerariesController: ItinerariesController,
    private readonly protectedMiddlewares: RequestHandler[] = [],
  ) {
    this.registerPublicRoutes();
    this.registerProtectedRoutes();
    this.mountRouteGroups();
  }

  private registerPublicRoutes() {
    this.publicRouter.get("/", this.itinerariesController.getItinerariesModuleStatus);
    this.publicRouter.get("/package/:packageId", this.itinerariesController.getPackageItineraries);
  }

  private registerProtectedRoutes() {
    this.protectedRouter.post("/", this.itinerariesController.createItinerary);
    this.protectedRouter.patch("/:id", this.itinerariesController.updateItinerary);
    this.protectedRouter.delete("/:id", this.itinerariesController.deleteItinerary);
  }

  private mountRouteGroups() {
    this.itinerariesRouter.use("/", this.publicRouter);
    this.itinerariesRouter.use("/", ...this.protectedMiddlewares, this.protectedRouter);
  }

  getRouter() {
    return this.itinerariesRouter;
  }
}

export function createItinerariesRouter(
  itinerariesController: ItinerariesController,
  protectedMiddlewares: RequestHandler[] = [],
) {
  return new ItinerariesRoutes(itinerariesController, protectedMiddlewares).getRouter();
}
