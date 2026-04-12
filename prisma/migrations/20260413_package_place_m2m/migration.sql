-- 1) Create pivot table
CREATE TABLE IF NOT EXISTS "packages_places" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "package_id" UUID NOT NULL,
  "place_id" UUID NOT NULL,
  CONSTRAINT "packages_places_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "packages_places_package_id_fkey"
    FOREIGN KEY ("package_id") REFERENCES "packages"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "packages_places_place_id_fkey"
    FOREIGN KEY ("place_id") REFERENCES "places"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "packages_places_package_id_place_id_key"
  ON "packages_places"("package_id", "place_id");

CREATE INDEX IF NOT EXISTS "packages_places_package_id_idx"
  ON "packages_places"("package_id");

CREATE INDEX IF NOT EXISTS "packages_places_place_id_idx"
  ON "packages_places"("place_id");

-- 2) Backfill links from packages.place_id (if still present)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'packages'
      AND column_name = 'place_id'
  ) THEN
    INSERT INTO "packages_places" ("package_id", "place_id")
    SELECT "id", "place_id"
    FROM "packages"
    WHERE "place_id" IS NOT NULL
    ON CONFLICT ("package_id", "place_id") DO NOTHING;

    -- 3) Drop old column/relation from packages
    ALTER TABLE "packages" DROP COLUMN "place_id";
  END IF;
END $$;
