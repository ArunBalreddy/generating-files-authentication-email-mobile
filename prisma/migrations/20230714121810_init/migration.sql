-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('EXISTING', 'PROSPECTIVE');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "client_code" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientDetails" (
    "id" SERIAL NOT NULL,
    "incorporation_date" TIMESTAMP(3) NOT NULL,
    "fee" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "pan" TEXT NOT NULL,
    "gstn" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "std" TEXT NOT NULL,
    "land_line" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "job_code" TEXT NOT NULL,
    "service" "ServiceType" NOT NULL,
    "category_id" INTEGER NOT NULL,
    "job_department_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "ClientDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "location_type" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "client_details_id" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "client_details_id" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "job_department_id" INTEGER NOT NULL,

    CONSTRAINT "JobCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDepartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "job_department_code" TEXT NOT NULL,
    "activity_code" TEXT NOT NULL,

    CONSTRAINT "JobDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_client_id_key" ON "ClientDetails"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "ClientDetails" ADD CONSTRAINT "ClientDetails_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientDetails" ADD CONSTRAINT "ClientDetails_job_department_id_fkey" FOREIGN KEY ("job_department_id") REFERENCES "JobDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientDetails" ADD CONSTRAINT "ClientDetails_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientDetails" ADD CONSTRAINT "ClientDetails_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientDetails" ADD CONSTRAINT "ClientDetails_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_client_details_id_fkey" FOREIGN KEY ("client_details_id") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCode" ADD CONSTRAINT "JobCode_job_department_id_fkey" FOREIGN KEY ("job_department_id") REFERENCES "JobDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
