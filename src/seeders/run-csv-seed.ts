import { prisma } from "@/lib/prisma";
import { SeedGeographyFromCsvUseCase } from "@/seeders/geography/application/seed-geography-from-csv.usecase";
import { PrismaGeographySeedRepository } from "@/seeders/geography/infrastructure/prisma/prisma-geography-seed.repository";
import { SeedError } from "@/seeders/shared/seed-error";

function logSummary(summary: Awaited<ReturnType<SeedGeographyFromCsvUseCase["execute"]>>) {
  console.log("Geography CSV seed completed.");
  console.log(`countries: read=${summary.countries.read}, created=${summary.countries.created}, updated=${summary.countries.updated}`);
  console.log(`states: read=${summary.states.read}, created=${summary.states.created}, updated=${summary.states.updated}`);
  console.log(`cities: read=${summary.cities.read}, created=${summary.cities.created}, updated=${summary.cities.updated}`);
  console.log(`places: read=${summary.places.read}, created=${summary.places.created}, updated=${summary.places.updated}`);
  console.log(`skipped=${summary.skipped}`);
  console.log(`durationMs=${summary.durationMs}`);
}

async function run() {
  const repository = new PrismaGeographySeedRepository(prisma);
  const useCase = new SeedGeographyFromCsvUseCase(repository);

  try {
    const summary = await useCase.execute();
    logSummary(summary);
    process.exitCode = 0;
  } catch (error: unknown) {
    const message = SeedError.format(error);
    console.error(`Seed failed: ${message}`);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void run();
