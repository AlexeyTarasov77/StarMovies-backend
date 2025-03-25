import { IMovie, IMovieBanner, IGenre, IActor, IReview } from "./interfaces";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return await prisma.genre.findMany({});
    }
    async getOne(id: number): Promise<IGenre> {
        return await prisma.genre.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
    }

    async createOne(data: Prisma.GenreCreateInput): Promise<IGenre> {
        try {
            return await prisma.genre.create({
                data: data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) throw new NotFoundError();
            }
            throw error;
        }
    }

    async updateOne(
        id: number,
        data: Prisma.GenreUpdateInput,
    ): Promise<IGenre> {
        const currentGenre = await prisma.genre.findUniqueOrThrow({
            where: {
                id: id,
            },
        });

        const updateGenre = await prisma.genre.update({
            where: {
                id: currentGenre.id,
            },
            data,
        });
        return updateGenre;
    }
}
export class ActorsRepository {
    async list(): Promise<IActor[]> {
        return await prisma.actor.findMany({
            include: {
                movies: {
                    select: {
                        id: true,
                        name: true,
                        coverUrl: true,
                        minAge: true,
                        countryOfOrigin: true,
                        countryOfOriginId: true,
                        releaseDate: true,
                        createdAt: true,
                        updatedAt: true,
                        runtime: true,
                        synopsis: true,
                    },
                },
                country: { select: { id: true, name: true } },
            },
        });
    }
    async getOne(id: number): Promise<IActor> {
        try {
            return await prisma.actor.findUniqueOrThrow({
                where: { id },
                include: {
                    country: true,
                    movies: {
                        select: {
                            id: true,
                            name: true,
                            coverUrl: true,
                            minAge: true,
                            countryOfOrigin: true,
                            countryOfOriginId: true,
                            releaseDate: true,
                            createdAt: true,
                            updatedAt: true,
                            runtime: true,
                            synopsis: true,
                        },
                    },
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) {
                    throw new NotFoundError("Not found");
                }
            }
            throw error;
        }
    }
}
export class ReviewsRepository {
    async list(): Promise<IReview[]> {
        return await prisma.review.findMany({});
    }
}

export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        const movies = await prisma.movie.findMany({
            include: {
                genres: { select: { id: true, name: true, description: true } },
                actors: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        country: true,
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        movieId: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
                countryOfOrigin: { select: { id: true, name: true } },
            },
        });
        return movies;
    }

    async getOne(id: number): Promise<IMovie> {
        try {
            return await prisma.movie.findFirstOrThrow({
                where: { id },
                include: {
                    countryOfOrigin: true,
                    genres: true,
                    actors: true,
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    avatarUrl: true,
                                    username: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) {
                    throw new NotFoundError("Not found");
                }
            }
            throw error;
        }
    }

    async listRecommendedMovies(
        watchedMoviesIds: number[],
    ): Promise<IMovieBanner[]> {
        const genres = await prisma.genre.findMany({
            where: {
                movies: {
                    some: { id: { in: watchedMoviesIds } },
                },
            },
            select: { id: true },
        });

        // Берем только ID жанров
        const genreIds = genres.map((genre) => genre.id);

        if (!genreIds.length) return [];

        return await prisma.movie.findMany({
            where: {
                AND: [
                    { genres: { some: { id: { in: genreIds } } } },
                    // Исключаем переданные фильмы, которые были переданы в recMovieIds
                    { id: { notIn: watchedMoviesIds } },
                ],
            },
            select: { id: true, coverUrl: true },
        });
    }
}
