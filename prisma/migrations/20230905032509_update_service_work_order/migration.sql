/*
  Warnings:

  - You are about to drop the column `assigned_by_id` on the `services_on_work_orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services_on_work_orders" DROP CONSTRAINT "services_on_work_orders_assigned_by_id_fkey";

-- AlterTable
ALTER TABLE "services_on_work_orders" DROP COLUMN "assigned_by_id";
