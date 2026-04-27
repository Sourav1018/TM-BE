import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";
import type { UpdateItineraryInput } from "@/modules/itineraries/validation";
import { ItineraryDayPolicy } from "@/modules/itineraries/domain/policies/itinerary-day.policy";

export class UpdateItineraryUseCase {
  constructor(private readonly itinerariesRepository: ItinerariesRepositoryPort) {}

  async execute(id: string, input: UpdateItineraryInput): Promise<ItineraryDto> {
    const existing = await this.itinerariesRepository.findById(id);

    if (!existing) {
      throw new AppError(ERROR_CODES.ITINERARY_NOT_FOUND, {
        message: `Itinerary with ID ${id} not found`,
      });
    }

    if (input.dayNumber !== undefined && input.dayNumber !== existing.dayNumber) {
      await ItineraryDayPolicy.assertNotExists(
        this.itinerariesRepository,
        existing.packageId,
        input.dayNumber,
        id
      );
    }

    return this.itinerariesRepository.updateItinerary(id, input);
  }
}
