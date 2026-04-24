import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

// Shifted this file to price module
export class PackagePricingPolicy {
  static validateCreate(price: number, comparePrice: number) {
    if (comparePrice < price) {
      throw new AppError(ERROR_CODES.INVALID_PRICE_RANGE);
    }
  }
}
