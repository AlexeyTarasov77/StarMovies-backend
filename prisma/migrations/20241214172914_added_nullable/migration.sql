-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "bornDate" DATETIME,
    "deathDate" DATETIME,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Actor" ("bio", "bornDate", "countryId", "deathDate", "firstName", "id", "lastName", "photoUrl") SELECT "bio", "bornDate", "countryId", "deathDate", "firstName", "id", "lastName", "photoUrl" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "synopsis" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "runtime" INTEGER NOT NULL DEFAULT 0,
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
