/*
  Warnings:

  - You are about to drop the column `duedate` on the `BorrowingProcess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BorrowingProcess" DROP COLUMN "duedate",
ADD COLUMN     "dueDate" TIMESTAMP(3);
