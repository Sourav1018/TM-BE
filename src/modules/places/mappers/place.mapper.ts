import { placeDtoSchema } from "@/modules/places/dto/place.dto";
import type { PlaceDto } from "@/modules/places/dto/place.dto";
import type { PlaceRow } from "@/modules/places/repositories/places.repository";

export class PlaceMapper {
  toPlaceDto(row: PlaceRow): PlaceDto {
    return placeDtoSchema.parse({
      id: row.id,
      name: row.name,
      cityId: row.cityId,
      latitude: row.latitude,
      longitude: row.longitude,
      googlePlaceId: row.googlePlaceId,
      mapUrl: row.mapUrl,
      googlePublicUrl: row.googlePublicUrl,
      slug: row.slug,
      createdAt: row.createdAt.toISOString(),
    });
  }
}

export const placeMapper = new PlaceMapper();
