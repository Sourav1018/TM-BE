import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";
import type { CreateItineraryInput } from "@/modules/itineraries/validation";
import { ItineraryPackagePolicy } from "@/modules/itineraries/domain/policies/itinerary-package.policy";
import { ItineraryDayPolicy } from "@/modules/itineraries/domain/policies/itinerary-day.policy";

export class CreateItineraryUseCase {
  constructor(private readonly itinerariesRepository: ItinerariesRepositoryPort) {}

  async execute(input: CreateItineraryInput): Promise<ItineraryDto> {
    await ItineraryPackagePolicy.assertExists(
      this.itinerariesRepository,
      input.packageId
    );

    await ItineraryDayPolicy.assertNotExists(
      this.itinerariesRepository,
      input.packageId,
      input.dayNumber
    );

    return this.itinerariesRepository.createItinerary(input);
  }
}
