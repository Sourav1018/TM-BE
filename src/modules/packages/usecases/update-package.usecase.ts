import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PackagesRepositoryPort } from "@/modules/packages/repositories/packages.repository.port";
import type { UpdatePackageInput } from "@/modules/packages/validation";
import { PackagePlacePolicy } from "@/modules/packages/domain/policies/package-place.policy";

export class UpdatePackageUseCase {
  constructor(private readonly packagesRepository: PackagesRepositoryPort) {}

  async execute(packageId: string, input: UpdatePackageInput) {
    const existingPackage = await this.packagesRepository.findPackageById(packageId);

    if (!existingPackage) {
      throw new AppError(ERROR_CODES.PACKAGE_NOT_FOUND);
    }

    if (input.placeIds !== undefined) {
      await PackagePlacePolicy.assertAllExist(this.packagesRepository, input.placeIds);
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
