/*
  Warnings:

  - You are about to alter the column `comission` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `updated_at` to the `work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "comission" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
