import { itineraryDtoSchema } from "@/modules/itineraries/dto/itinerary.dto";
import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { PackageItinerary } from "@/generated/prisma/client";

export class ItineraryMapper {
  toItineraryDto(row: PackageItinerary): ItineraryDto {
    return itineraryDtoSchema.parse({
      id: row.id,
      packageId: row.packageId,
      dayNumber: row.dayNumber,
      title: row.title,
      description: row.description,
    });
  }

  toItineraryDtoList(rows: PackageItinerary[]): ItineraryDto[] {
    return rows.map((row) => this.toItineraryDto(row));
  }
}

export const itineraryMapper = new ItineraryMapper();
