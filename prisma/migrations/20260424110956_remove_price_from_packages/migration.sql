/*
  Warnings:

  - You are about to drop the column `compare_price` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "packages" DROP COLUMN "compare_price",
DROP COLUMN "price";
