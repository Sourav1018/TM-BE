import { prisma } from "@/lib/prisma";
import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import { itineraryMapper } from "@/modules/itineraries/mappers/itinerary.mapper";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";
import type { CreateItineraryInput, UpdateItineraryInput } from "@/modules/itineraries/validation";

export class PrismaItinerariesRepository implements ItinerariesRepositoryPort {
  async createItinerary(input: CreateItineraryInput): Promise<ItineraryDto> {
    const created = await prisma.packageItinerary.create({
      data: {
        packageId: input.packageId,
        dayNumber: input.dayNumber,
        title: input.title,
        description: input.description,
      },
    });

    return itineraryMapper.toItineraryDto(created);
  }

  async updateItinerary(id: string, input: UpdateItineraryInput): Promise<ItineraryDto> {
    const updated = await prisma.packageItinerary.update({
      where: { id },
      data: {
        dayNumber: input.dayNumber,
        title: input.title,
        description: input.description,
      },
    });

    return itineraryMapper.toItineraryDto(updated);
  }

  async deleteItinerary(id: string): Promise<void> {
    await prisma.packageItinerary.delete({
      where: { id },
    });
  }

  async findByPackageId(packageId: string): Promise<ItineraryDto[]> {
    const itineraries = await prisma.packageItinerary.findMany({
      where: { packageId },
      orderBy: { dayNumber: "asc" },
    });

    return itineraryMapper.toItineraryDtoList(itineraries);
  }

  async findById(id: string): Promise<ItineraryDto | null> {
    const itinerary = await prisma.packageItinerary.findUnique({
      where: { id },
    });

    if (!itinerary) return null;

    return itineraryMapper.toItineraryDto(itinerary);
  }

  async findPackageById(packageId: string) {
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
      select: { id: true },
    });

    return pkg;
  }

  async findByPackageIdAndDay(packageId: string, dayNumber: number) {
    const itinerary = await prisma.packageItinerary.findUnique({
      where: {
        packageId_dayNumber: {
          packageId,
          dayNumber,
        },
      },
    });

    if (!itinerary) return null;

    return itineraryMapper.toItineraryDto(itinerary);
  }
}
