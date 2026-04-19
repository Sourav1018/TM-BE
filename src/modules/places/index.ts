import { PlacesController } from "@/modules/places/controllers/places.controller";
import { PlacesFacade } from "@/modules/places/application/places.facade";
import { PrismaPlacesRepository } from "@/modules/places/repositories/places.repository";
import { PlacesRoutes } from "@/modules/places/routes/places.routes";
import { CreatePlaceUseCase } from "@/modules/places/usecases/create-place.usecase";
import { UpdatePlaceUseCase } from "@/modules/places/usecases/update-place.usecase";

const placesRepository = new PrismaPlacesRepository();
const createPlaceUseCase = new CreatePlaceUseCase(placesRepository);
const updatePlaceUseCase = new UpdatePlaceUseCase(placesRepository);
const placesFacade = new PlacesFacade(createPlaceUseCase, updatePlaceUseCase);
const placesController = new PlacesController(placesFacade);
const placesRoutes = new PlacesRoutes(placesController);

export const placesRouter = placesRoutes.getRouter();
