import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PlacesRepositoryPort } from "@/modules/places/repositories/places.repository.port";

export class PlaceSlugPolicy {
  static async assertAvailable(placesRepository: PlacesRepositoryPort, slug: string) {
    const existingPlace = await placesRepository.findPlaceBySlug(slug);

    if (existingPlace) {
      throw new AppError(ERROR_CODES.SLUG_ALREADY_EXISTS, {
        message: "place slug already exists.",
      });
    }
  }
}
