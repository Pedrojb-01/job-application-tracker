-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('ACTION_PENDING', 'WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "DeadlineStatus" AS ENUM ('CURRENT', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id_user" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Application" (
    "id_application" UUID NOT NULL DEFAULT gen_random_uuid(),
    "company" VARCHAR(150) NOT NULL,
    "role" VARCHAR(150) NOT NULL,
    "link" VARCHAR(255),
    "notes" VARCHAR(700),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'WAITING',
    "priority" "Priority" NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id_application")
);

-- CreateTable
CREATE TABLE "Deadline" (
    "id_deadline" UUID NOT NULL DEFAULT gen_random_uuid(),
    "what" VARCHAR(100) NOT NULL,
    "due_date" DATE NOT NULL,
    "status" "DeadlineStatus" NOT NULL DEFAULT 'CURRENT',
    "completed_date" DATE,
    "id_application" UUID NOT NULL,

    CONSTRAINT "Deadline_pkey" PRIMARY KEY ("id_deadline")
);

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_priority_idx" ON "Application"("priority");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deadline" ADD CONSTRAINT "Deadline_id_application_fkey" FOREIGN KEY ("id_application") REFERENCES "Application"("id_application") ON DELETE CASCADE ON UPDATE CASCADE;
