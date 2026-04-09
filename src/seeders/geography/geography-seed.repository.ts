import { Prisma, PrismaClient } from "@generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { GeographySeedRepositoryPort, SeedWriteResult } from "@/seeders/geography/geography-seed.repository.port";
import {
  CitySeedRow,
  CountrySeedRow,
  PlaceSeedRow,
  StateSeedRow,
} from "@/seeders/geography/geography-seed.validation";
import { SeedError } from "@/seeders/shared/seed-error";

type DbClient = PrismaClient | Prisma.TransactionClient;

function isPrismaClient(db: DbClient): db is PrismaClient {
  return "$transaction" in db;
}

function toSeedWriteResult(created: boolean): SeedWriteResult {
  return { action: created ? "created" : "updated" };
}

export class PrismaGeographySeedRepository implements GeographySeedRepositoryPort {
  constructor(private readonly db: DbClient = prisma) {}

  async runInTransaction<T>(
    callback: (repository: GeographySeedRepositoryPort) => Promise<T>,
  ): Promise<T> {
    if (!isPrismaClient(this.db)) {
      return callback(this);
    }

    return this.db.$transaction(async (tx) => {
      const transactionalRepository = new PrismaGeographySeedRepository(tx);
      return callback(transactionalRepository);
    });
  }

  async resolveCountryIdBySlug(slug: string): Promise<string | null> {
    const country = await this.db.country.findUnique({
      where: { slug },
      select: { id: true },
    });

    return country?.id ?? null;
  }

  async resolveStateIdBySlug(slug: string): Promise<string | null> {
    const states = await this.db.state.findMany({
      where: { slug },
      select: { id: true },
      take: 2,
    });

    if (states.length > 1) {
      throw new SeedError("Ambiguous state slug. Found multiple rows.", {
        column: "state_slug",
        value: slug,
      });
    }

    return states[0]?.id ?? null;
  }

  async resolveCityIdBySlug(slug: string): Promise<string | null> {
    const cities = await this.db.city.findMany({
      where: { slug },
      select: { id: true },
      take: 2,
    });

    if (cities.length > 1) {
      throw new SeedError("Ambiguous city slug. Found multiple rows.", {
        column: "city_slug",
        value: slug,
      });
    }

    return cities[0]?.id ?? null;
  }

  async upsertCountry(row: CountrySeedRow): Promise<SeedWriteResult> {
    const existing = await this.db.country.findUnique({
      where: { slug: row.slug },
      select: { id: true },
    });

    if (!existing) {
      await this.db.country.create({
        data: {
          name: row.name,
          code: row.code,
          slug: row.slug,
        },
      });
      return toSeedWriteResult(true);
    }

    await this.db.country.update({
      where: { id: existing.id },
      data: {
        name: row.name,
        code: row.code,
      },
    });

    return toSeedWriteResult(false);
  }

  async upsertState(row: StateSeedRow, countryId: string): Promise<SeedWriteResult> {
    const existing = await this.db.state.findMany({
      where: {
        slug: row.slug,
        countryId,
      },
      select: { id: true },
      take: 2,
    });

    if (existing.length > 1) {
      throw new SeedError("Duplicate states found for slug and country.", {
        column: "slug",
        value: row.slug,
      });
    }

    if (existing.length === 0) {
      await this.db.state.create({
        data: {
          name: row.name,
          slug: row.slug,
          countryId,
        },
      });
      return toSeedWriteResult(true);
    }

    await this.db.state.update({
      where: { id: existing[0]!.id },
      data: {
        name: row.name,
      },
    });

    return toSeedWriteResult(false);
  }

  async upsertCity(row: CitySeedRow, stateId: string): Promise<SeedWriteResult> {
    const existing = await this.db.city.findMany({
      where: {
        slug: row.slug,
        stateId,
      },
      select: { id: true },
      take: 2,
    });

    if (existing.length > 1) {
      throw new SeedError("Duplicate cities found for slug and state.", {
        column: "slug",
        value: row.slug,
      });
    }

    if (existing.length === 0) {
      await this.db.city.create({
        data: {
          name: row.name,
          slug: row.slug,
          stateId,
        },
      });
      return toSeedWriteResult(true);
    }

    await this.db.city.update({
      where: { id: existing[0]!.id },
      data: {
        name: row.name,
      },
    });

    return toSeedWriteResult(false);
  }

  async upsertPlace(row: PlaceSeedRow, cityId: string): Promise<SeedWriteResult> {
    const existing = await this.db.place.findMany({
      where: {
        slug: row.slug,
        cityId,
      },
      select: { id: true },
      take: 2,
    });

    if (existing.length > 1) {
      throw new SeedError("Duplicate places found for slug and city.", {
        column: "slug",
        value: row.slug,
      });
    }

    if (existing.length === 0) {
      await this.db.place.create({
        data: {
          name: row.name,
          slug: row.slug,
          cityId,
          latitude: row.latitude,
          longitude: row.longitude,
          googlePlaceId: row.google_place_id,
          mapUrl: row.map_url,
        },
      });
      return toSeedWriteResult(true);
    }

    await this.db.place.update({
      where: { id: existing[0]!.id },
      data: {
        name: row.name,
        latitude: row.latitude,
        longitude: row.longitude,
        googlePlaceId: row.google_place_id,
        mapUrl: row.map_url,
      },
    });

    return toSeedWriteResult(false);
  }
}
