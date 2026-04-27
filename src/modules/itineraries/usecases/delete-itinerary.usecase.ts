import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";

export class DeleteItineraryUseCase {
  constructor(private readonly itinerariesRepository: ItinerariesRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.itinerariesRepository.findById(id);

    if (!existing) {
      throw new AppError(ERROR_CODES.ITINERARY_NOT_FOUND, {
        message: `Itinerary with ID ${id} not found`,
      });
    }

    await this.itinerariesRepository.deleteItinerary(id);
  }
}
