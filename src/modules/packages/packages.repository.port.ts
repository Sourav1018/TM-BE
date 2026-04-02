import { CreatePackageInput } from "@/modules/packages/packages.validation";

export type PackageRef = {
  id: string;
};

export type CreatedPackage = {
  id: string;
  title: string;
  description: string;
  price: unknown;
  comparePrice: unknown;
  durationDays: number;
  durationNights: number;
  placeId: string;
  slug: string;
  status: CreatePackageInput["status"];
  createdAt: Date;
  updatedAt: Date;
};

export interface PackagesRepositoryPort {
  findPackageBySlug(slug: string): Promise<PackageRef | null>;
  findPlaceById(placeId: string): Promise<PackageRef | null>;
  createPackage(input: CreatePackageInput): Promise<CreatedPackage>;
}
