/*
  Warnings:

  - You are about to drop the column `comission` on the `employees` table. All the data in the column will be lost.
  - Added the required column `commission` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "comission",
ADD COLUMN     "commission" INTEGER NOT NULL;
