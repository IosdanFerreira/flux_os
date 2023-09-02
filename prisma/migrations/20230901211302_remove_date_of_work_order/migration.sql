/*
  Warnings:

  - You are about to drop the column `date` on the `work_orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "work_orders_date_idx";

-- AlterTable
ALTER TABLE "work_orders" DROP COLUMN "date";

-- CreateIndex
CREATE INDEX "work_orders_created_at_idx" ON "work_orders"("created_at");
