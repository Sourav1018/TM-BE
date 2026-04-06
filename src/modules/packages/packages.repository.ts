import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { PackageDto } from "@/modules/packages/dto/package.dto";
import { packageMapper } from "@/modules/packages/mappers/package.mapper";
import {
  PackageRef,
  PackagesRepositoryPort,
} from "@/modules/packages/packages.repository.port";
import { CreatePackageInput } from "@/modules/packages/packages.validation";

export const createdPackageSelect = {
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

export type CreatedPackageRow = Prisma.PackageGetPayload<{
  select: typeof createdPackageSelect;
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
      select: createdPackageSelect,
    });
  }

  async createPackage(input: CreatePackageInput): Promise<PackageDto> {
    const createdPackage = await this.createPackageRecord(input);

    return packageMapper.toCreatePackageDto(createdPackage);
  }
}
