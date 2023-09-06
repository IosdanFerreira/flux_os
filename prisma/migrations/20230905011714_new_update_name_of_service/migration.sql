/*
  Warnings:

  - Made the column `name` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "name" SET NOT NULL;
