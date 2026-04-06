import {
  CitySeedRow,
  CountrySeedRow,
  PlaceSeedRow,
  StateSeedRow,
} from "@/seeders/geography/domain/geography-seed-row";

export type SeedWriteResult = {
  action: "created" | "updated";
};

export interface GeographySeedRepositoryPort {
  runInTransaction<T>(callback: (repository: GeographySeedRepositoryPort) => Promise<T>): Promise<T>;
  resolveCountryIdBySlug(slug: string): Promise<string | null>;
  resolveStateIdBySlug(slug: string): Promise<string | null>;
  resolveCityIdBySlug(slug: string): Promise<string | null>;
  upsertCountry(row: CountrySeedRow): Promise<SeedWriteResult>;
  upsertState(row: StateSeedRow, countryId: string): Promise<SeedWriteResult>;
  upsertCity(row: CitySeedRow, stateId: string): Promise<SeedWriteResult>;
  upsertPlace(row: PlaceSeedRow, cityId: string): Promise<SeedWriteResult>;
}
