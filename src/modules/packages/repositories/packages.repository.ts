import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { PackageDto } from "@/modules/packages/dto/package.dto";
import { packageMapper } from "@/modules/packages/mappers/package.mapper";
import type {
  PackageRef,
  PackageUpdateContext,
  PackagesRepositoryPort,
} from "@/modules/packages/repositories/packages.repository.port";
import type { CreatePackageInput, UpdatePackageInput } from "@/modules/packages/validation";

export const packageSelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  comparePrice: true,
  durationDays: true,
  durationNights: true,
  placeId: true,
  slug: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PackageRow = Prisma.PackageGetPayload<{
  select: typeof packageSelect;
}>;

export class PrismaPackagesRepository implements PackagesRepositoryPort {
  async findPackageBySlug(slug: string): Promise<PackageRef | null> {
    const db = prisma;

    return db.package.findUnique({
      where: { slug },
      select: { id: true },
    });
  }

  async findPlaceById(placeId: string): Promise<PackageRef | null> {
    const db = prisma;

    return db.place.findUnique({
      where: { id: placeId },
      select: { id: true },
    });
  }

  async findPackageById(packageId: string): Promise<PackageUpdateContext | null> {
    const db = prisma;
    const existingPackage = await db.package.findUnique({
      where: { id: packageId },
      select: {
        id: true,
        slug: true,
        placeId: true,
        price: true,
        comparePrice: true,
      },
    });

    if (!existingPackage) {
      return null;
    }

    return {
      id: existingPackage.id,
      slug: existingPackage.slug,
      placeId: existingPackage.placeId,
      price: Number(existingPackage.price),
      comparePrice: Number(existingPackage.comparePrice),
    };
  }

  async createPackageRecord(input: CreatePackageInput) {
    const db = prisma;

    return db.package.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        comparePrice: input.comparePrice,
        durationDays: input.durationDays,
        durationNights: input.durationNights,
        placeId: input.placeId,
        slug: input.slug,
        status: input.status,
      },
      select: packageSelect,
    });
  }

  async updatePackageRecord(packageId: string, input: UpdatePackageInput) {
    const db = prisma;

    return db.package.update({
      where: { id: packageId },
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        comparePrice: input.comparePrice,
        durationDays: input.durationDays,
        durationNights: input.durationNights,
        placeId: input.placeId,
        slug: input.slug,
        status: input.status,
      },
      select: packageSelect,
    });
  }

  async createPackage(input: CreatePackageInput): Promise<PackageDto> {
    const createdPackage = await this.createPackageRecord(input);

    return packageMapper.toPackageDto(createdPackage);
  }

  async updatePackage(packageId: string, input: UpdatePackageInput): Promise<PackageDto> {
    const updatedPackage = await this.updatePackageRecord(packageId, input);

    return packageMapper.toPackageDto(updatedPackage);
  }
}
