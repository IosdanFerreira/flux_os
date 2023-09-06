/*
  Warnings:

  - The primary key for the `services_on_work_orders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "services_on_work_orders" DROP CONSTRAINT "services_on_work_orders_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "services_on_work_orders_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "services_on_work_orders_service_id_workOrder_id_idx" ON "services_on_work_orders"("service_id", "workOrder_id");
