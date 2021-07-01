-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accessType" TEXT NOT NULL DEFAULT 'public',
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_goals" ("description", "id", "name", "user_id") SELECT "description", "id", "name", "user_id" FROM "goals";
DROP TABLE "goals";
ALTER TABLE "new_goals" RENAME TO "goals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
