import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PackagesRepositoryPort } from "@/modules/packages/repositories/packages.repository.port";
import type { UpdatePackageInput } from "@/modules/packages/validation";
import { PackagePricingPolicy } from "@/modules/packages/domain/policies/package-pricing.policy";
import { PackagePlacePolicy } from "@/modules/packages/domain/policies/package-place.policy";

export class UpdatePackageUseCase {
  constructor(private readonly packagesRepository: PackagesRepositoryPort) {}

  async execute(packageId: string, input: UpdatePackageInput) {
    const existingPackage = await this.packagesRepository.findPackageById(packageId);

    if (!existingPackage) {
      throw new AppError(ERROR_CODES.PACKAGE_NOT_FOUND);
    }

    const nextPrice = input.price ?? existingPackage.price;
    const nextComparePrice = input.comparePrice ?? existingPackage.comparePrice;
    PackagePricingPolicy.validateCreate(nextPrice, nextComparePrice);

    if (input.placeId && input.placeId !== existingPackage.placeId) {
      await PackagePlacePolicy.assertExists(this.packagesRepository, input.placeId);
    }

    if (input.slug && input.slug !== existingPackage.slug) {
      const packageWithSlug = await this.packagesRepository.findPackageBySlug(input.slug);

      if (packageWithSlug && packageWithSlug.id !== packageId) {
        throw new AppError(ERROR_CODES.SLUG_ALREADY_EXISTS);
      }
    }

    return this.packagesRepository.updatePackage(packageId, input);
  }
}
