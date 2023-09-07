/*
  Warnings:

  - Added the required column `is_delete` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_delete` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_delete` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "is_delete" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientDetails" ADD COLUMN     "is_delete" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "is_delete" TEXT NOT NULL;
