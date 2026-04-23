import type { CreatePlaceInput } from "@/modules/places/validation";
import type { PlacesRepositoryPort } from "@/modules/places/repositories/places.repository.port";
import { PlaceCoordinates } from "@/modules/places/domain/value-objects/place-coordinates.vo";
import { GooglePublicUrl } from "@/modules/places/domain/value-objects/google-public-url.vo";
import { PlaceCityPolicy } from "@/modules/places/domain/policies/place-city.policy";
import { PlaceSlugPolicy } from "@/modules/places/domain/policies/place-slug.policy";

export class CreatePlaceUseCase {
  constructor(private readonly placesRepository: PlacesRepositoryPort) {}

  async execute(input: CreatePlaceInput) {
    const coordinates = PlaceCoordinates.create(
      input.latitude,
      input.longitude,
    );
    const googlePublicUrl = GooglePublicUrl.fromCoordinates(coordinates);

    await PlaceCityPolicy.assertExists(this.placesRepository, input.cityId);
    await PlaceSlugPolicy.assertAvailable(this.placesRepository, input.slug);

    return this.placesRepository.createPlace({
      ...input,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      googlePublicUrl: googlePublicUrl.value,
    });
  }
}
