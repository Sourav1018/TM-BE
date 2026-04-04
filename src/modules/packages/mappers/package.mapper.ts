import { packageDtoSchema, PackageDto } from "@/modules/packages/dto/package.dto";
import type { CreatedPackageRow } from "@/modules/packages/packages.repository";

export function toPackageDto(row: CreatedPackageRow): PackageDto {
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
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  });
}
