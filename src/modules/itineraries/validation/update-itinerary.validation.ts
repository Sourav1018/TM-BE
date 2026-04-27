import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class UpdateItineraryValidation {
  static readonly paramsSchema = z.object({
    id: z.uuid(),
  });

  static readonly bodySchema = z.object({
    dayNumber: z.coerce.number().int().nonnegative().optional(),
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
  });

  static parseParams(payload: unknown): UpdateItineraryParams {
    const parsed = this.paramsSchema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }

  static parseBody(payload: unknown): UpdateItineraryInput {
    const parsed = this.bodySchema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }
}

export type UpdateItineraryParams = z.infer<typeof UpdateItineraryValidation.paramsSchema>;
export type UpdateItineraryInput = z.infer<typeof UpdateItineraryValidation.bodySchema>;
