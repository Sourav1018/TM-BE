import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class CreateItineraryValidation {
  static readonly schema = z.object({
    packageId: z.uuid(),
    dayNumber: z.coerce.number().int().nonnegative(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
  });

  static parse(payload: unknown): CreateItineraryInput {
    const parsed = this.schema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }
}

export type CreateItineraryInput = z.infer<typeof CreateItineraryValidation.schema>;
