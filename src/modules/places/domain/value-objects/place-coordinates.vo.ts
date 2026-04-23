import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class PlaceCoordinates {
  private constructor(
    readonly latitude: number,
    readonly longitude: number,
  ) {}

  static create(latitude: number, longitude: number): PlaceCoordinates {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        message: "Latitude and longitude must be valid finite numbers.",
        details: {
          latitude,
          longitude,
        },
      });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        message: "Latitude must be between -90 and 90, and longitude between -180 and 180.",
        details: {
          latitude,
          longitude,
        },
      });
    }

    return new PlaceCoordinates(latitude, longitude);
  }
}
