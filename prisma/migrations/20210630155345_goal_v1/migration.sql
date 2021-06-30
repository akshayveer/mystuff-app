/*
  Warnings:

  - You are about to drop the column `total_study_plans` on the `goals` table. All the data in the column will be lost.
  - Added the required column `duration` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "tasks" INTEGER NOT NULL DEFAULT 0,
    "completed_tasks" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL DEFAULT -1
);
INSERT INTO "new_goals" ("description", "id", "name", "user_id") SELECT "description", "id", "name", "user_id" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
