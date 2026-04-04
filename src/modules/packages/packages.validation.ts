import { z } from "zod";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

const createPackageSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  comparePrice: z.coerce.number().positive(),
  durationDays: z.coerce.number().int().positive(),
  durationNights: z.coerce.number().int().positive(),
  placeId: z.string().uuid(),
  slug: z.string().trim().min(1),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type CreatePackageInput = z.infer<typeof createPackageSchema>;

export class PackagesValidation {
  static validateCreatePackageInput(payload: unknown): CreatePackageInput {
    const parsed = createPackageSchema.safeParse(payload);

    if (!parsed.success) {
      throw new AppError(ERROR_CODES.VALIDATION_ERROR, {
        details: parsed.error.flatten(),
      });
    }

    return parsed.data;
  }
}
