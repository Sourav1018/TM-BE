import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { PackagesRepositoryPort } from "@/modules/packages/repositories/packages.repository.port";

export class PackagePlacePolicy {
  static async assertAllExist(packagesRepository: PackagesRepositoryPort, placeIds: string[]) {
    const uniquePlaceIds = [...new Set(placeIds)];
    if (uniquePlaceIds.length === 0) {
      return;
    }

    const places = await packagesRepository.findPlacesByIds(uniquePlaceIds);

    if (places.length !== uniquePlaceIds.length) {
      const foundIds = new Set(places.map((place) => place.id));
      const missingIds = uniquePlaceIds.filter((placeId) => !foundIds.has(placeId));

      throw new AppError(ERROR_CODES.PLACE_NOT_FOUND, {
        details: { missingPlaceIds: missingIds },
      });
    }
  }
}
