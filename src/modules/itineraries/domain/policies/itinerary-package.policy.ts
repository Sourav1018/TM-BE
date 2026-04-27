import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { ItinerariesRepositoryPort } from "@/modules/itineraries/repositories/itineraries.repository.port";

export class ItineraryPackagePolicy {
  static async assertExists(
    itinerariesRepository: ItinerariesRepositoryPort,
    packageId: string
  ) {
    const pkg = await itinerariesRepository.findPackageById(packageId);

    if (!pkg) {
      throw new AppError(ERROR_CODES.PACKAGE_NOT_FOUND, {
        message: "package not found.",
      });
    }
  }
}
