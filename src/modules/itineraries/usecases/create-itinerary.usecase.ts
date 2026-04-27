import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";
import type { CreateItineraryInput } from "@/modules/itineraries/validation";

export class CreateItineraryUseCase {
  constructor(private readonly itinerariesRepository: ItinerariesRepositoryPort) {}

  async execute(input: CreateItineraryInput): Promise<ItineraryDto> {
    return this.itinerariesRepository.createItinerary(input);
  }
}
