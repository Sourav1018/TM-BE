import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class CreatePlaceValidation {
  static readonly schema = z.object({
    name: z.string().trim().min(1),
    cityId: z.uuid(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    googlePlaceId: z.string().trim().min(1).optional().nullable(),
    mapUrl: z.string().trim().min(1).optional().nullable(),
    slug: z.string().trim().min(1),
  });

  static parse(payload: unknown): CreatePlaceInput {
    const parsed = this.schema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }
}

export type CreatePlaceInput = z.infer<typeof CreatePlaceValidation.schema>;
