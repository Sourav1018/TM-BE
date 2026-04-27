import { ItinerariesController } from "@/modules/itineraries/controllers/itineraries.controller";
import { ItinerariesFacade } from "@/modules/itineraries/application/itineraries.facade";
import { PrismaItinerariesRepository } from "@/modules/itineraries/repositories/itineraries.repository";
import { ItinerariesRoutes } from "@/modules/itineraries/routes/itineraries.routes";
import { CreateItineraryUseCase } from "@/modules/itineraries/usecases/create-itinerary.usecase";
import { UpdateItineraryUseCase } from "@/modules/itineraries/usecases/update-itinerary.usecase";
import { DeleteItineraryUseCase } from "@/modules/itineraries/usecases/delete-itinerary.usecase";
import { GetPackageItinerariesUseCase } from "@/modules/itineraries/usecases/get-package-itineraries.usecase";

const itinerariesRepository = new PrismaItinerariesRepository();
const createItineraryUseCase = new CreateItineraryUseCase(itinerariesRepository);
const updateItineraryUseCase = new UpdateItineraryUseCase(itinerariesRepository);
const deleteItineraryUseCase = new DeleteItineraryUseCase(itinerariesRepository);
const getPackageItinerariesUseCase = new GetPackageItinerariesUseCase(itinerariesRepository);

const itinerariesFacade = new ItinerariesFacade(
  createItineraryUseCase,
  updateItineraryUseCase,
  deleteItineraryUseCase,
  getPackageItinerariesUseCase,
);

const itinerariesController = new ItinerariesController(itinerariesFacade);
const itinerariesRoutes = new ItinerariesRoutes(itinerariesController);

export const itinerariesRouter = itinerariesRoutes.getRouter();
