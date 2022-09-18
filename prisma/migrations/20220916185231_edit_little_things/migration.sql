/*
  Warnings:

  - You are about to drop the column `categoryId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherDiciplineId` on the `tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "categoryId",
DROP COLUMN "teacherDiciplineId";
