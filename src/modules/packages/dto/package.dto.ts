import { z } from "zod";

export const packageDtoSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  comparePrice: z.string(),
  durationDays: z.number().int().positive(),
  durationNights: z.number().int().positive(),
  placeId: z.uuid(),
  slug: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type PackageDto = z.infer<typeof packageDtoSchema>;
