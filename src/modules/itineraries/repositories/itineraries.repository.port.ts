import type { ItineraryDto } from "@/modules/itineraries/dto/itinerary.dto";
import type { CreateItineraryInput, UpdateItineraryInput } from "@/modules/itineraries/validation";

export type PackageRef = {
  id: string;
};

export interface ItinerariesRepositoryPort {
  createItinerary(input: CreateItineraryInput): Promise<ItineraryDto>;
  updateItinerary(id: string, input: UpdateItineraryInput): Promise<ItineraryDto>;
  deleteItinerary(id: string): Promise<void>;
  findByPackageId(packageId: string): Promise<ItineraryDto[]>;
  findById(id: string): Promise<ItineraryDto | null>;
  findPackageById(packageId: string): Promise<PackageRef | null>;
  findByPackageIdAndDay(
    packageId: string,
    dayNumber: number
  ): Promise<ItineraryDto | null>;
}
