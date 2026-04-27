import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PlacesRepositoryPort } from "@/modules/places/repositories/places.repository.port";

export class PlaceCityPolicy {
  static async assertExists(placesRepository: PlacesRepositoryPort, cityId: string) {
    const city = await placesRepository.findCityById(cityId);

    if (!city) {
      throw new AppError(ERROR_CODES.CITY_NOT_FOUND);
    }
  }
}
