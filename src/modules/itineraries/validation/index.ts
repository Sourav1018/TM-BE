export * from "@/modules/itineraries/validation/create-itinerary.validation";
export * from "@/modules/itineraries/validation/update-itinerary.validation";

import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class ItinerariesValidation {
  static validatePackageIdParam(payload: unknown): { packageId: string } {
    const schema = z.object({
      packageId: z.uuid(),
    });
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }
    return parsed.data;
  }

  static validateIdParam(payload: unknown): { id: string } {
    const schema = z.object({
      id: z.uuid(),
    });
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }
    return parsed.data;
  }
}
