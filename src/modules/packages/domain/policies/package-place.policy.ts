import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PackagesRepositoryPort } from "@/modules/packages/packages.repository.port";

export class PackagePlacePolicy {
  static async assertExists(packagesRepository: PackagesRepositoryPort, placeId: string) {
    const place = await packagesRepository.findPlaceById(placeId);

    if (!place) {
      throw new AppError(ERROR_CODES.PLACE_NOT_FOUND);
    }
  }
}
