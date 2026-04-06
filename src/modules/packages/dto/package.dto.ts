import { z } from "zod";

export const packageDtoSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  comparePrice: z.string(),
  durationDays: z.string(),
  durationNights: z.string(),
  placeId: z.uuid(),
  slug: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type PackageDto = z.infer<typeof packageDtoSchema>;
