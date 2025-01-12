/*
  Warnings:

  - You are about to drop the `MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MovieGenres";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MovieGenres";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MoviesGenres" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("movieId", "genreId")
);

-- CreateTable
CREATE TABLE "_MoviesGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MoviesGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MoviesGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MoviesGenres_AB_unique" ON "_MoviesGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviesGenres_B_index" ON "_MoviesGenres"("B");
