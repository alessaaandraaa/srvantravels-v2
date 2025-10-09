/*
  Warnings:

  - You are about to alter the column `ID_Picture` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `ID_Picture` VARCHAR(255) NULL;
