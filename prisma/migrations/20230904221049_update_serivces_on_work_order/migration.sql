/*
  Warnings:

  - The primary key for the `services_on_work_orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `services_on_work_orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "services_on_work_orders_service_id_workOrder_id_idx";

-- AlterTable
ALTER TABLE "services_on_work_orders" DROP CONSTRAINT "services_on_work_orders_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "services_on_work_orders_pkey" PRIMARY KEY ("service_id", "workOrder_id");
