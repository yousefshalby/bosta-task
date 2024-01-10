/*
  Warnings:

  - You are about to drop the column `borrowed` on the `BorrowingProcess` table. All the data in the column will be lost.
  - You are about to drop the column `returnedDate` on the `BorrowingProcess` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BorrowingProcess_borrowersId_key";

-- AlterTable
ALTER TABLE "BorrowingProcess" DROP COLUMN "borrowed",
DROP COLUMN "returnedDate",
ADD COLUMN     "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duedate" TIMESTAMP(3);
