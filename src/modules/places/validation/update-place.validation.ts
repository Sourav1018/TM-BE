import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

const updatePlacePayloadSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    cityId: z.uuid().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    googlePlaceId: z.string().trim().min(1).optional().nullable(),
    mapUrl: z.string().trim().min(1).optional().nullable(),
    slug: z.string().trim().min(1).optional(),
  })
  .refine(
    (payload) => Object.values(payload).some((value) => value !== undefined),
    "At least one field must be provided for update.",
  );

const updatePlaceParamsSchema = z.object({
  id: z.uuid(),
});

export class UpdatePlaceValidation {
  static parseBody(payload: unknown): UpdatePlaceInput {
    const parsed = updatePlacePayloadSchema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }

  static parseParams(params: unknown): UpdatePlaceParams {
    const parsed = updatePlaceParamsSchema.safeParse(params);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }
}

export type UpdatePlaceInput = z.infer<typeof updatePlacePayloadSchema>;
export type UpdatePlaceParams = z.infer<typeof updatePlaceParamsSchema>;
