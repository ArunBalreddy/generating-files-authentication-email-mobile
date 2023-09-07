/*
  Warnings:

  - You are about to drop the column `employee_id` on the `ClientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `ClientDetails` table. All the data in the column will be lost.
  - Added the required column `admin_email` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_first_name` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_last_name` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_middle_name` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_mobile_number` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientDetails" DROP CONSTRAINT "ClientDetails_employee_id_fkey";

-- AlterTable
ALTER TABLE "ClientDetails" DROP COLUMN "employee_id",
DROP COLUMN "service",
ADD COLUMN     "admin_email" TEXT NOT NULL,
ADD COLUMN     "admin_first_name" TEXT NOT NULL,
ADD COLUMN     "admin_last_name" TEXT NOT NULL,
ADD COLUMN     "admin_middle_name" TEXT NOT NULL,
ADD COLUMN     "admin_mobile_number" TEXT NOT NULL,
ADD COLUMN     "status" "ServiceType" NOT NULL;
