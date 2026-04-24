import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class CreatePackageValidation {
  static readonly schema = z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    durationDays: z.coerce.number().int().positive(),
    durationNights: z.coerce.number().int().positive(),
    placeIds: z.array(z.uuid()),
    slug: z.string().trim().min(1),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
  });

  static parse(payload: unknown): CreatePackageInput {
    const parsed = this.schema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: z.flattenError(parsed.error),
      });
    }

    return {
      ...parsed.data,
      placeIds: [...new Set(parsed.data.placeIds)],
    };
  }
}

export type CreatePackageInput = z.infer<typeof CreatePackageValidation.schema>;
