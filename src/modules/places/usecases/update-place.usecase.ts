import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PlacesRepositoryPort } from "@/modules/places/repositories/places.repository.port";
import type { UpdatePlaceInput } from "@/modules/places/validation";
import { PlaceCoordinates } from "@/modules/places/domain/value-objects/place-coordinates.vo";
import { PlaceCityPolicy } from "@/modules/places/domain/policies/place-city.policy";

export class UpdatePlaceUseCase {
  constructor(private readonly placesRepository: PlacesRepositoryPort) {}

  async execute(placeId: string, input: UpdatePlaceInput) {
    const existingPlace = await this.placesRepository.findPlaceById(placeId);

    if (!existingPlace) {
      throw new AppError(ERROR_CODES.PLACE_NOT_FOUND, {
        message: "place not found.",
      });
    }

    if (input.cityId && input.cityId !== existingPlace.cityId) {
      await PlaceCityPolicy.assertExists(this.placesRepository, input.cityId);
    }

    if (input.slug && input.slug !== existingPlace.slug) {
      const placeWithSlug = await this.placesRepository.findPlaceBySlug(input.slug);

      if (placeWithSlug && placeWithSlug.id !== placeId) {
        throw new AppError(ERROR_CODES.SLUG_ALREADY_EXISTS, {
          message: "place slug already exists.",
        });
      }
    }

    if (input.latitude !== undefined || input.longitude !== undefined) {
      const latitude = input.latitude ?? existingPlace.latitude;
      const longitude = input.longitude ?? existingPlace.longitude;
      const coordinates = PlaceCoordinates.create(latitude, longitude);

      return this.placesRepository.updatePlace(placeId, {
        ...input,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
    }

    return this.placesRepository.updatePlace(placeId, input);
  }
}
