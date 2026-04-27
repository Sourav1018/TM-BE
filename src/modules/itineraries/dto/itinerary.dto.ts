import { z } from "zod";

export const itineraryDtoSchema = z.object({
  id: z.uuid(),
  packageId: z.uuid(),
  dayNumber: z.number().int().nonnegative(),
  title: z.string(),
  description: z.string(),
});

export type ItineraryDto = z.infer<typeof itineraryDtoSchema>;
