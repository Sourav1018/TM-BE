import { packageDtoSchema } from "@/modules/packages/dto/package.dto";
import type { PackageDto } from "@/modules/packages/dto/package.dto";
import type { PackageRow } from "@/modules/packages/repositories/packages.repository";

export class PackageMapper {
  toPackageDto(row: PackageRow): PackageDto {
    return packageDtoSchema.parse({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price.toString(),
      comparePrice: row.comparePrice.toString(),
      durationDays: row.durationDays,
      durationNights: row.durationNights,
      placeId: row.placeId,
      slug: row.slug,
      status: row.status.toString(),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    });
  }
}

export const packageMapper = new PackageMapper();
