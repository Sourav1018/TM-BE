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
  durationDays: true,
  durationNights: true,
  packagePlaces: {
    select: {
      placeId: true,
    },
  },
  slug: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type PackageRow = Prisma.PackageGetPayload<{
  select: typeof packageSelect;
}>;

export class PrismaPackagesRepository implements PackagesRepositoryPort {
  private getUniquePlaceIds(placeIds: string[]): string[] {
    return [...new Set(placeIds)];
  }

  async findPackageBySlug(slug: string): Promise<PackageRef | null> {
    const db = prisma;

    return db.package.findUnique({
      where: { slug },
      select: { id: true },
    });
  }

  async findPlacesByIds(placeIds: string[]): Promise<PackageRef[]> {
    const db = prisma;
    const uniquePlaceIds = this.getUniquePlaceIds(placeIds);

    if (uniquePlaceIds.length === 0) {
      return [];
    }

    return db.place.findMany({
      where: { id: { in: uniquePlaceIds } },
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
      },
    });

    if (!existingPackage) {
      return null;
    }

    return {
      id: existingPackage.id,
      slug: existingPackage.slug,
    };
  }

  async createPackageRecord(input: CreatePackageInput) {
    return prisma.$transaction(async (tx) => {
      const uniquePlaceIds = this.getUniquePlaceIds(input.placeIds);
      const createdPackage = await tx.package.create({
        data: {
          title: input.title,
          description: input.description,
          durationDays: input.durationDays,
          durationNights: input.durationNights,
          slug: input.slug,
          status: input.status,
        },
        select: { id: true },
      });

      if (uniquePlaceIds.length > 0) {
        await tx.packagePlace.createMany({
          data: uniquePlaceIds.map((placeId) => ({
            packageId: createdPackage.id,
            placeId,
          })),
        });
      }

      return tx.package.findUniqueOrThrow({
        where: { id: createdPackage.id },
        select: packageSelect,
      });
    });
  }

  async updatePackageRecord(packageId: string, input: UpdatePackageInput) {
    return prisma.$transaction(async (tx) => {
      await tx.package.update({
        where: { id: packageId },
        data: {
          title: input.title,
          description: input.description,
          durationDays: input.durationDays,
          durationNights: input.durationNights,
          slug: input.slug,
          status: input.status,
        },
        select: { id: true },
      });

      if (input.placeIds !== undefined) {
        const uniquePlaceIds = this.getUniquePlaceIds(input.placeIds);
        await tx.packagePlace.deleteMany({
          where: { packageId },
        });

        if (uniquePlaceIds.length > 0) {
          await tx.packagePlace.createMany({
            data: uniquePlaceIds.map((placeId) => ({
              packageId,
              placeId,
            })),
          });
        }
      }

      return tx.package.findUniqueOrThrow({
        where: { id: packageId },
        select: packageSelect,
      });
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
