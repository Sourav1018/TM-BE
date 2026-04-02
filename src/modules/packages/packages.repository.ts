import { prisma } from "@/lib/prisma";
import {
  CreatedPackage,
  PackageRef,
  PackagesRepositoryPort,
} from "@/modules/packages/packages.repository.port";
import { CreatePackageInput } from "@/modules/packages/packages.validation";

export class PrismaPackagesRepository implements PackagesRepositoryPort {
  async findPackageBySlug(slug: string): Promise<PackageRef | null> {
    return prisma.package.findUnique({
      where: { slug },
      select: { id: true },
    });
  }

  async findPlaceById(placeId: string): Promise<PackageRef | null> {
    return prisma.place.findUnique({
      where: { id: placeId },
      select: { id: true },
    });
  }

  async createPackage(input: CreatePackageInput): Promise<CreatedPackage> {
    return prisma.package.create({
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
      select: {
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
      },
    });
  }
}
