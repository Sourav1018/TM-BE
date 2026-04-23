import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { placeMapper } from "@/modules/places/mappers/place.mapper";
import type { PlacesRepositoryPort } from "@/modules/places/repositories/places.repository.port";
import type {
  CreatePlaceData,
  PlaceRef,
  PlaceUpdateContext,
  UpdatePlaceData,
} from "@/modules/places/repositories/places.repository.port";

export const placeSelect = {
  id: true,
  name: true,
  cityId: true,
  latitude: true,
  longitude: true,
  googlePlaceId: true,
  mapUrl: true,
  googlePublicUrl: true,
  slug: true,
  createdAt: true,
} as const;

export type PlaceRow = Prisma.PlaceGetPayload<{
  select: typeof placeSelect;
}>;

export class PrismaPlacesRepository implements PlacesRepositoryPort {
  async findPlaceBySlug(slug: string): Promise<PlaceRef | null> {
    return prisma.place.findFirst({
      where: { slug },
      select: { id: true },
    });
  }

  async findPlaceById(placeId: string): Promise<PlaceUpdateContext | null> {
    const place = await prisma.place.findUnique({
      where: { id: placeId },
      select: {
        id: true,
        cityId: true,
        slug: true,
        latitude: true,
        longitude: true,
      },
    });

    if (!place) {
      return null;
    }

    return {
      id: place.id,
      cityId: place.cityId,
      slug: place.slug,
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  async findCityById(cityId: string): Promise<PlaceRef | null> {
    return prisma.city.findUnique({
      where: { id: cityId },
      select: { id: true },
    });
  }

  async createPlace(input: CreatePlaceData) {
    const createdPlace = await prisma.place.create({
      data: {
        name: input.name,
        cityId: input.cityId,
        latitude: input.latitude,
        longitude: input.longitude,
        googlePlaceId: input.googlePlaceId,
        mapUrl: input.mapsUrl,
        googlePublicUrl: input.googlePublicUrl,
        slug: input.slug,
      },
      select: placeSelect,
    });

    return placeMapper.toPlaceDto(createdPlace);
  }

  async updatePlace(placeId: string, input: UpdatePlaceData) {
    const updatedPlace = await prisma.place.update({
      where: { id: placeId },
      data: {
        name: input.name,
        cityId: input.cityId,
        latitude: input.latitude,
        longitude: input.longitude,
        googlePlaceId: input.googlePlaceId,
        mapUrl: input.mapUrl,
        googlePublicUrl: input.googlePublicUrl,
        slug: input.slug,
      },
      select: placeSelect,
    });

    return placeMapper.toPlaceDto(updatedPlace);
  }
}
