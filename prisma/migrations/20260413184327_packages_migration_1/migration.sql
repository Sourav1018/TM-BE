-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" CHAR(2) NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "country_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "state_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "city_id" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "google_place_id" TEXT,
    "map_url" TEXT,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "compare_price" DECIMAL(10,2) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "duration_nights" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "PackageStatus" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_places" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "place_id" UUID NOT NULL,

    CONSTRAINT "package_places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "media_id" UUID NOT NULL,
    "is_cover" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "package_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_itinerary" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "day_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "package_itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_map" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "is_route_map_available" BOOLEAN NOT NULL DEFAULT false,
    "location_map_url" TEXT,

    CONSTRAINT "route_map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inclusion_exclusion_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inclusion_exclusion_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inclusions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "slug" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exclusions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "slug" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_inclusions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "inclusion_id" UUID NOT NULL,

    CONSTRAINT "package_inclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_exclusions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "package_id" UUID NOT NULL,
    "exclusion_id" UUID NOT NULL,

    CONSTRAINT "package_exclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_masters" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "file_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "size_bytes" BIGINT,
    "metadata" JSONB,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_variants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "media_id" UUID NOT NULL,
    "variant_key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "size_bytes" BIGINT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");

-- CreateIndex
CREATE INDEX "states_country_id_idx" ON "states"("country_id");

-- CreateIndex
CREATE INDEX "cities_state_id_idx" ON "cities"("state_id");

-- CreateIndex
CREATE INDEX "places_city_id_idx" ON "places"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "packages_slug_key" ON "packages"("slug");

-- CreateIndex
CREATE INDEX "package_places_package_id_idx" ON "package_places"("package_id");

-- CreateIndex
CREATE INDEX "package_places_place_id_idx" ON "package_places"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_places_package_id_place_id_key" ON "package_places"("package_id", "place_id");

-- CreateIndex
CREATE INDEX "package_media_package_id_idx" ON "package_media"("package_id");

-- CreateIndex
CREATE INDEX "package_media_media_id_idx" ON "package_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_media_package_id_media_id_key" ON "package_media"("package_id", "media_id");

-- CreateIndex
CREATE INDEX "package_itinerary_package_id_idx" ON "package_itinerary"("package_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_itinerary_package_id_day_number_key" ON "package_itinerary"("package_id", "day_number");

-- CreateIndex
CREATE UNIQUE INDEX "route_map_package_id_key" ON "route_map"("package_id");

-- CreateIndex
CREATE UNIQUE INDEX "inclusion_exclusion_categories_slug_key" ON "inclusion_exclusion_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "inclusions_name_key" ON "inclusions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inclusions_slug_key" ON "inclusions"("slug");

-- CreateIndex
CREATE INDEX "inclusions_category_id_idx" ON "inclusions"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "exclusions_name_key" ON "exclusions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exclusions_slug_key" ON "exclusions"("slug");

-- CreateIndex
CREATE INDEX "exclusions_category_id_idx" ON "exclusions"("category_id");

-- CreateIndex
CREATE INDEX "package_inclusions_package_id_idx" ON "package_inclusions"("package_id");

-- CreateIndex
CREATE INDEX "package_inclusions_inclusion_id_idx" ON "package_inclusions"("inclusion_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_inclusions_package_id_inclusion_id_key" ON "package_inclusions"("package_id", "inclusion_id");

-- CreateIndex
CREATE INDEX "package_exclusions_package_id_idx" ON "package_exclusions"("package_id");

-- CreateIndex
CREATE INDEX "package_exclusions_exclusion_id_idx" ON "package_exclusions"("exclusion_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_exclusions_package_id_exclusion_id_key" ON "package_exclusions"("package_id", "exclusion_id");

-- CreateIndex
CREATE INDEX "media_variants_media_id_idx" ON "media_variants"("media_id");

-- CreateIndex
CREATE INDEX "media_variants_variant_key_idx" ON "media_variants"("variant_key");

-- CreateIndex
CREATE UNIQUE INDEX "media_variants_media_id_variant_key_key" ON "media_variants"("media_id", "variant_key");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_places" ADD CONSTRAINT "package_places_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_places" ADD CONSTRAINT "package_places_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_media" ADD CONSTRAINT "package_media_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_media" ADD CONSTRAINT "package_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_itinerary" ADD CONSTRAINT "package_itinerary_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_map" ADD CONSTRAINT "route_map_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inclusions" ADD CONSTRAINT "inclusions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inclusion_exclusion_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exclusions" ADD CONSTRAINT "exclusions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inclusion_exclusion_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_inclusions" ADD CONSTRAINT "package_inclusions_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_inclusions" ADD CONSTRAINT "package_inclusions_inclusion_id_fkey" FOREIGN KEY ("inclusion_id") REFERENCES "inclusions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_exclusions" ADD CONSTRAINT "package_exclusions_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_exclusions" ADD CONSTRAINT "package_exclusions_exclusion_id_fkey" FOREIGN KEY ("exclusion_id") REFERENCES "exclusions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_variants" ADD CONSTRAINT "media_variants_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
