/*
  Warnings:

  - You are about to drop the `_ServiceToWorkOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ServiceToWorkOrder" DROP CONSTRAINT "_ServiceToWorkOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToWorkOrder" DROP CONSTRAINT "_ServiceToWorkOrder_B_fkey";

-- DropTable
DROP TABLE "_ServiceToWorkOrder";

-- CreateTable
CREATE TABLE "services_on_work_orders" (
    "service_id" INTEGER NOT NULL,
    "workOrder_id" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_on_work_orders_pkey" PRIMARY KEY ("service_id","workOrder_id")
);

-- AddForeignKey
ALTER TABLE "services_on_work_orders" ADD CONSTRAINT "services_on_work_orders_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_on_work_orders" ADD CONSTRAINT "services_on_work_orders_workOrder_id_fkey" FOREIGN KEY ("workOrder_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
