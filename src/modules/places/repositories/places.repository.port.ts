import type { PlaceDto } from "@/modules/places/dto/place.dto";
import type { CreatePlaceInput, UpdatePlaceInput } from "@/modules/places/validation";

export type PlaceRef = {
  id: string;
};

export type PlaceUpdateContext = {
  id: string;
  cityId: string;
  slug: string;
  latitude: number;
  longitude: number;
};

export interface PlacesRepositoryPort {
  findPlaceBySlug(slug: string): Promise<PlaceRef | null>;
  findPlaceById(placeId: string): Promise<PlaceUpdateContext | null>;
  findCityById(cityId: string): Promise<PlaceRef | null>;
  createPlace(input: CreatePlaceInput): Promise<PlaceDto>;
  updatePlace(placeId: string, input: UpdatePlaceInput): Promise<PlaceDto>;
}
