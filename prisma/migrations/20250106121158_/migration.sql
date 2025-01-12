-- CreateTable
CREATE TABLE "MoviesGenres" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("movieId", "genreId")
);
