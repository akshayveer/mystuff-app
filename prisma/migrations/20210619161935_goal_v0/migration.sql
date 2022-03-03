-- CreateTable
CREATE TABLE "goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "total_study_plans" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL DEFAULT -1
);
