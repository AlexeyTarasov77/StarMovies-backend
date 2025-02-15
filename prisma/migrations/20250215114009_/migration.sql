/*
  Warnings:

  - You are about to drop the column `rating` on the `Movie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "synopsis" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "runtime" INTEGER NOT NULL,
    "minAge" INTEGER DEFAULT 0,
    "coverUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "countryOfOriginId" INTEGER NOT NULL,
    CONSTRAINT "Movie_countryOfOriginId_fkey" FOREIGN KEY ("countryOfOriginId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("countryOfOriginId", "coverUrl", "createdAt", "id", "minAge", "name", "releaseDate", "runtime", "synopsis", "updatedAt") SELECT "countryOfOriginId", "coverUrl", "createdAt", "id", "minAge", "name", "releaseDate", "runtime", "synopsis", "updatedAt" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
