/*
  Warnings:

  - You are about to drop the column `completed_tasks` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `tasks` on the `goals` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "duration" INTEGER NOT NULL,
    "completed_tasks" INTEGER NOT NULL DEFAULT 0,
    "goalId" INTEGER NOT NULL,
    FOREIGN KEY ("goalId") REFERENCES "goals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "studyPlanId" INTEGER,
    FOREIGN KEY ("studyPlanId") REFERENCES "StudyPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_goals" ("description", "id", "name", "user_id") SELECT "description", "id", "name", "user_id" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlan_goalId_unique" ON "StudyPlan"("goalId");
