/*
  Warnings:

  - You are about to drop the `WorkOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_client_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_payment_form_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_payment_situation_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToWorkOrder" DROP CONSTRAINT "_ServiceToWorkOrder_B_fkey";

-- DropIndex
DROP INDEX "clients_email_id_idx";

-- DropTable
DROP TABLE "WorkOrder";

-- CreateTable
CREATE TABLE "work_orders" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "payment_form_id" INTEGER NOT NULL,
    "init_date" TEXT NOT NULL,
    "init_time" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "payment_situation_id" INTEGER,
    "comments" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_orders_date_idx" ON "work_orders"("date");

-- CreateIndex
CREATE INDEX "clients_email_name_surname_cpf_idx" ON "clients"("email", "name", "surname", "cpf");

-- CreateIndex
CREATE INDEX "employees_email_name_surname_cpf_idx" ON "employees"("email", "name", "surname", "cpf");

-- CreateIndex
CREATE INDEX "services_id_name_idx" ON "services"("id", "name");

-- CreateIndex
CREATE INDEX "vehicles_make_model_idx" ON "vehicles"("make", "model");

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_payment_form_id_fkey" FOREIGN KEY ("payment_form_id") REFERENCES "payment_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_payment_situation_id_fkey" FOREIGN KEY ("payment_situation_id") REFERENCES "payment_situations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToWorkOrder" ADD CONSTRAINT "_ServiceToWorkOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
