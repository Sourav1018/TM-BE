import { z } from "zod";

export const packageDtoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  comparePrice: z.string(),
  durationDays: z.number().int(),
  durationNights: z.number().int(),
  placeId: z.string().uuid(),
  slug: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PackageDto = z.infer<typeof packageDtoSchema>;
