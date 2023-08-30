/*
  Warnings:

  - Made the column `payment_situation_id` on table `work_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_client_id_fkey";

-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_payment_situation_id_fkey";

-- AlterTable
ALTER TABLE "work_orders" ALTER COLUMN "payment_situation_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_payment_situation_id_fkey" FOREIGN KEY ("payment_situation_id") REFERENCES "payment_situations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
