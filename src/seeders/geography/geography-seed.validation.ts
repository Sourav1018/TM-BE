import { z } from "zod";
import { SeedError } from "@/seeders/shared/seed-error";

export const COUNTRY_HEADERS = ["name", "code", "slug"] as const;
export const STATE_HEADERS = ["name", "slug", "country_slug"] as const;
export const CITY_HEADERS = ["name", "slug", "state_slug"] as const;
export const PLACE_HEADERS = [
  "name",
  "slug",
  "city_slug",
  "latitude",
  "longitude",
  "google_place_id",
  "map_url",
] as const;

const countryRowSchema = z.object({
  name: z.string().trim().min(1),
  code: z.string().trim().length(2).transform((value) => value.toUpperCase()),
  slug: z.string().trim().min(1),
});

const stateRowSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  country_slug: z.string().trim().min(1),
});

const cityRowSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  state_slug: z.string().trim().min(1),
});

const placeRowSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  city_slug: z.string().trim().min(1),
  latitude: z.coerce.number().refine(Number.isFinite, {
    message: "latitude must be a number.",
  }).refine((value) => value >= -90 && value <= 90, {
    message: "latitude must be between -90 and 90.",
  }),
  longitude: z.coerce.number().refine(Number.isFinite, {
    message: "longitude must be a number.",
  }).refine((value) => value >= -180 && value <= 180, {
    message: "longitude must be between -180 and 180.",
  }),
  google_place_id: z.string().trim().optional().transform((value) => value || undefined),
  map_url: z.string().trim().optional().transform((value) => value || undefined),
});

export type CountrySeedRow = z.infer<typeof countryRowSchema>;
export type StateSeedRow = z.infer<typeof stateRowSchema>;
export type CitySeedRow = z.infer<typeof cityRowSchema>;
export type PlaceSeedRow = z.infer<typeof placeRowSchema>;

function parseWithSchema<T>(
  schema: z.ZodType<T>,
  row: Record<string, string>,
  file: string,
  rowNumber: number,
): T {
  const parsed = schema.safeParse(row);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const column = issue?.path[0]?.toString();
    const value = column ? row[column] : row;
    throw new SeedError(issue?.message ?? "Invalid row.", {
      file,
      row: rowNumber,
      column,
      value,
    });
  }

  return parsed.data;
}

export function parseCountrySeedRow(
  row: Record<string, string>,
  rowNumber: number,
): CountrySeedRow {
  return parseWithSchema(countryRowSchema, row, "countries.csv", rowNumber);
}

export function parseStateSeedRow(
  row: Record<string, string>,
  rowNumber: number,
): StateSeedRow {
  return parseWithSchema(stateRowSchema, row, "states.csv", rowNumber);
}

export function parseCitySeedRow(
  row: Record<string, string>,
  rowNumber: number,
): CitySeedRow {
  return parseWithSchema(cityRowSchema, row, "cities.csv", rowNumber);
}

export function parsePlaceSeedRow(
  row: Record<string, string>,
  rowNumber: number,
): PlaceSeedRow {
  return parseWithSchema(placeRowSchema, row, "places.csv", rowNumber);
}
