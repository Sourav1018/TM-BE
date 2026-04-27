import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";

export class ItineraryDayPolicy {
  static async assertNotExists(
    itinerariesRepository: ItinerariesRepositoryPort,
    packageId: string,
    dayNumber: number,
    excludeId?: string
  ) {
    const existing = await itinerariesRepository.findByPackageIdAndDay(
      packageId,
      dayNumber
    );

    if (existing && existing.id !== excludeId) {
      throw new AppError(ERROR_CODES.ITINERARY_DAY_ALREADY_EXISTS, {
        message: `Itinerary for day ${dayNumber} already exists in this package.`,
      });
    }
  }
}
