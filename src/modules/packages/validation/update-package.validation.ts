import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

const updatePackagePayloadSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    price: z.coerce.number().positive().optional(),
    comparePrice: z.coerce.number().positive().optional(),
    durationDays: z.coerce.number().int().positive().optional(),
    durationNights: z.coerce.number().int().positive().optional(),
    placeId: z.uuid().optional(),
    slug: z.string().trim().min(1).optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
  })
  .refine(
    (payload) => Object.values(payload).some((value) => value !== undefined),
    "At least one field must be provided for update.",
  );

const updatePackageParamsSchema = z.object({
  id: z.uuid(),
});

export class UpdatePackageValidation {
  static parseBody(payload: unknown): UpdatePackageInput {
    const parsed = updatePackagePayloadSchema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }

  static parseParams(params: unknown): UpdatePackageParams {
    const parsed = updatePackageParamsSchema.safeParse(params);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return parsed.data;
  }
}

export type UpdatePackageInput = z.infer<typeof updatePackagePayloadSchema>;
export type UpdatePackageParams = z.infer<typeof updatePackageParamsSchema>;
