import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { CreatePackageInput } from "@/modules/packages/validation";
import { PackagesRepositoryPort } from "@/modules/packages/packages.repository.port";

export class CreatePackageUseCase {
  constructor(private readonly packagesRepository: PackagesRepositoryPort) {}

  async execute(input: CreatePackageInput) {
    if (input.comparePrice < input.price) {
      throw new AppError(ERROR_CODES.INVALID_PRICE_RANGE);
    }

    const place = await this.packagesRepository.findPlaceById(input.placeId);
    if (!place) {
      throw new AppError(ERROR_CODES.PLACE_NOT_FOUND);
    }

    const existingPackage = await this.packagesRepository.findPackageBySlug(input.slug);
    if (existingPackage) {
      throw new AppError(ERROR_CODES.SLUG_ALREADY_EXISTS);
    }

    return this.packagesRepository.createPackage(input);
  }
}
