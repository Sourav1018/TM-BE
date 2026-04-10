import type { PackageDto } from "@/modules/packages/dto/package.dto";
import type { CreatePackageInput, UpdatePackageInput } from "@/modules/packages/validation";

export type PackageRef = {
  id: string;
};

export type PackageUpdateContext = {
  id: string;
  slug: string;
  placeId: string;
  price: number;
  comparePrice: number;
};

export interface PackagesRepositoryPort {
  findPackageBySlug(slug: string): Promise<PackageRef | null>;
  findPlaceById(placeId: string): Promise<PackageRef | null>;
  findPackageById(packageId: string): Promise<PackageUpdateContext | null>;
  createPackage(input: CreatePackageInput): Promise<PackageDto>;
  // TODO: Statues should not be undefine as its enum after create some value it should pass
  updatePackage(packageId: string, input: UpdatePackageInput): Promise<PackageDto>;
}
