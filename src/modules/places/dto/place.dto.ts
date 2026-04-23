import { z } from "zod";

export const placeDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  cityId: z.uuid(),
  latitude: z.number(),
  longitude: z.number(),
  googlePlaceId: z.string().nullable(),
  mapUrl: z.string().nullable(),
  googlePublicUrl: z.string().nullable(),
  slug: z.string(),
  createdAt: z.iso.datetime(),
});

export type PlaceDto = z.infer<typeof placeDtoSchema>;
