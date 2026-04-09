import path from "node:path";
import { GeographySeedRepositoryPort } from "@/seeders/geography/geography-seed.repository.port";
import {
  CITY_HEADERS,
  COUNTRY_HEADERS,
  PLACE_HEADERS,
  STATE_HEADERS,
  parseCitySeedRow,
  parseCountrySeedRow,
  parsePlaceSeedRow,
  parseStateSeedRow,
} from "@/seeders/geography/geography-seed.validation";
import { CsvReader } from "@/seeders/geography/csv-reader";
import { SeedError } from "@/seeders/shared/seed-error";

type EntityCount = {
  read: number;
  created: number;
  updated: number;
};

export type GeographySeedSummary = {
  countries: EntityCount;
  states: EntityCount;
  cities: EntityCount;
  places: EntityCount;
  skipped: number;
  durationMs: number;
};

function createEmptyEntityCount(): EntityCount {
  return { read: 0, created: 0, updated: 0 };
}

export class SeedGeographyFromCsvUseCase {
  private readonly csvReader: CsvReader;

  constructor(
    private readonly repository: GeographySeedRepositoryPort,
    csvDirectory = path.join(process.cwd(), "src/data/seeders"),
  ) {
    this.csvReader = new CsvReader(csvDirectory);
  }

  async execute(): Promise<GeographySeedSummary> {
    const startTime = Date.now();

    const countries = this.csvReader.readRows(
      "countries.csv",
      COUNTRY_HEADERS,
      parseCountrySeedRow,
    );
    const states = this.csvReader.readRows(
      "states.csv",
      STATE_HEADERS,
      parseStateSeedRow,
    );
    const cities = this.csvReader.readRows(
      "cities.csv",
      CITY_HEADERS,
      parseCitySeedRow,
    );
    const places = this.csvReader.readRows(
      "places.csv",
      PLACE_HEADERS,
      parsePlaceSeedRow,
    );

    const summary = await this.repository.runInTransaction(async (txRepo) => {
      const counts = {
        countries: createEmptyEntityCount(),
        states: createEmptyEntityCount(),
        cities: createEmptyEntityCount(),
        places: createEmptyEntityCount(),
      };

      counts.countries.read = countries.length;
      for (const record of countries) {
        const result = await txRepo.upsertCountry(record.value);
        if (result.action === "created") {
          counts.countries.created += 1;
        } else {
          counts.countries.updated += 1;
        }
      }

      counts.states.read = states.length;
      for (const record of states) {
        const countryId = await txRepo.resolveCountryIdBySlug(record.value.country_slug);
        if (!countryId) {
          throw new SeedError("Parent country not found for state.", {
            file: "states.csv",
            row: record.rowNumber,
            column: "country_slug",
            value: record.value.country_slug,
          });
        }

        const result = await txRepo.upsertState(record.value, countryId);
        if (result.action === "created") {
          counts.states.created += 1;
        } else {
          counts.states.updated += 1;
        }
      }

      counts.cities.read = cities.length;
      for (const record of cities) {
        const stateId = await txRepo.resolveStateIdBySlug(record.value.state_slug);
        if (!stateId) {
          throw new SeedError("Parent state not found for city.", {
            file: "cities.csv",
            row: record.rowNumber,
            column: "state_slug",
            value: record.value.state_slug,
          });
        }

        const result = await txRepo.upsertCity(record.value, stateId);
        if (result.action === "created") {
          counts.cities.created += 1;
        } else {
          counts.cities.updated += 1;
        }
      }

      counts.places.read = places.length;
      for (const record of places) {
        const cityId = await txRepo.resolveCityIdBySlug(record.value.city_slug);
        if (!cityId) {
          throw new SeedError("Parent city not found for place.", {
            file: "places.csv",
            row: record.rowNumber,
            column: "city_slug",
            value: record.value.city_slug,
          });
        }

        const result = await txRepo.upsertPlace(record.value, cityId);
        if (result.action === "created") {
          counts.places.created += 1;
        } else {
          counts.places.updated += 1;
        }
      }

      return counts;
    });

    return {
      ...summary,
      skipped: 0,
      durationMs: Date.now() - startTime,
    };
  }
}
