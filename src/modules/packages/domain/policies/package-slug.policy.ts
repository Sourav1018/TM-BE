import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PackagesRepositoryPort } from "@/modules/packages/repositories/packages.repository.port";

export class PackageSlugPolicy {
  static async assertAvailable(packagesRepository: PackagesRepositoryPort, slug: string) {
    const existingPackage = await packagesRepository.findPackageBySlug(slug);

    if (existingPackage) {
      throw new AppError(ERROR_CODES.SLUG_ALREADY_EXISTS);
    }
  }
}
