import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";

export class GetPackageItinerariesUseCase {
  constructor(private readonly itinerariesRepository: ItinerariesRepositoryPort) {}

  async execute(packageId: string): Promise<ItineraryDto[]> {
    return this.itinerariesRepository.findByPackageId(packageId);
  }
}
