/*
  Warnings:

  - Added the required column `updated_at` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `exclusions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `inclusion_exclusion_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `inclusions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `media_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `places` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "exclusions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "inclusion_exclusion_categories" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "inclusions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "media_variants" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "google_public_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
