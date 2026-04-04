import { PackageDto } from "@/modules/packages/dto/package.dto";
import { CreatePackageInput } from "@/modules/packages/packages.validation";

export type PackageRef = {
  id: string;
};

export interface PackagesRepositoryPort {
  findPackageBySlug(slug: string): Promise<PackageRef | null>;
  findPlaceById(placeId: string): Promise<PackageRef | null>;
  createPackage(input: CreatePackageInput): Promise<PackageDto>;
}
