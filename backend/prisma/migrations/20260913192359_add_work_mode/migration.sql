-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID', 'NOT_INFORMED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "work_mode" "WorkMode" NOT NULL DEFAULT 'NOT_INFORMED';

-- CreateIndex
CREATE INDEX "Application_work_mode_idx" ON "Application"("work_mode");
