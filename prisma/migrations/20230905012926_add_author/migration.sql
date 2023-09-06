/*
  Warnings:

  - Added the required column `assigned_by_id` to the `services_on_work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services_on_work_orders" ADD COLUMN     "assigned_by_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "services_on_work_orders" ADD CONSTRAINT "services_on_work_orders_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
