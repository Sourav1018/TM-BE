import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { CreateItineraryUseCase } from "@/modules/itineraries/usecases/create-itinerary.usecase";
import type { DeleteItineraryUseCase } from "@/modules/itineraries/usecases/delete-itinerary.usecase";
import type { GetPackageItinerariesUseCase } from "@/modules/itineraries/usecases/get-package-itineraries.usecase";
import type { UpdateItineraryUseCase } from "@/modules/itineraries/usecases/update-itinerary.usecase";
import type { CreateItineraryInput, UpdateItineraryInput } from "@/modules/itineraries/validation";

export class ItinerariesFacade {
  constructor(
    private readonly createItineraryUseCase: CreateItineraryUseCase,
    private readonly updateItineraryUseCase: UpdateItineraryUseCase,
    private readonly deleteItineraryUseCase: DeleteItineraryUseCase,
    private readonly getPackageItinerariesUseCase: GetPackageItinerariesUseCase,
  ) {}

  async createItinerary(input: CreateItineraryInput): Promise<ItineraryDto> {
    return this.createItineraryUseCase.execute(input);
  }

  async updateItinerary(id: string, input: UpdateItineraryInput): Promise<ItineraryDto> {
    return this.updateItineraryUseCase.execute(id, input);
  }

  async deleteItinerary(id: string): Promise<void> {
    return this.deleteItineraryUseCase.execute(id);
  }

  async getPackageItineraries(packageId: string): Promise<ItineraryDto[]> {
    return this.getPackageItinerariesUseCase.execute(packageId);
  }
}
