import { IMovie, IMovieBanner, IGenre, IActor, IReview } from "./types";
import { Country, Prisma } from "@prisma/client";
import { prisma, ErrorCodes, getErrorCode } from "../prisma";
import { AlreadyExistsError, NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SortOrder } from "../core/types";

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return await prisma.genre.findMany({});
    }
    async getOne(id: number): Promise<IGenre> {
        return await prisma.genre.findUniqueOrThrow({
            where: { id },
        });
    }

    async createOne(data: Prisma.GenreCreateInput): Promise<IGenre> {
        try {
            return await prisma.genre.create({ data });
        } catch (error) {
            if (getErrorCode(error) === ErrorCodes.AlreadyExists) {
                throw new AlreadyExistsError();
            }
            throw error;
        }
    }

    async updateOne(
        id: number,
        data: Prisma.GenreUpdateInput,
    ): Promise<IGenre> {
        try {
            const updatedGenre = await prisma.genre.update({
                where: { id },
                data,
            });
            return updatedGenre;
        } catch (err) {
            if (getErrorCode(err) === ErrorCodes.AlreadyExists)
                throw new AlreadyExistsError();
            throw err;
        }
    }
    async deleteOne(id: number): Promise<IGenre> {
        const genre = await prisma.genre.delete({
            where: {
                id: Number(id),
            },
        });

        return genre;
    }

    async listIdsForMovies(moviesIds: number[]): Promise<number[]> {
        const genres = await prisma.genre.findMany({
            where: {
                movies: {
                    some: { id: { in: moviesIds } },
                },
            },
            select: { id: true },
        });
        return genres.map((genre) => genre.id);
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
                if (error.code === ErrorCodes.NotFound) {
                    throw new NotFoundError();
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
    async list(limit?: number): Promise<IMovie[]> {
        const movies = await prisma.movie.findMany({
            take: limit,
            include: {
                genres: { select: { id: true, name: true } },
                actors: {
                    select: { id: true, firstName: true, lastName: true },
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        movieId: true,
                        user: { select: { id: true, username: true } },
                    },
                },
                countryOfOrigin: { select: { id: true, name: true } },
            },
        });
        return movies;
    }

    async listOrderedByPopulatiry(
        direction: SortOrder,
        limit?: number,
    ): Promise<IMovieBanner[]> {
        // double-check direction to prevent posibillity of sql injection
        if (direction !== SortOrder.ASC && direction !== SortOrder.DESC)
            throw new Error("Invalid direction");
        let query = `
        SELECT m.id, m.coverUrl from "Movie" m
        LEFT JOIN "Review" r on r."movieId" = m.id
        GROUP BY m.id, m.coverUrl
        ORDER BY AVG(r.rating) ${direction} `;
        const queryArgs = [];
        if (limit !== undefined) {
            query += " LIMIT $1";
            queryArgs.push(limit);
        }
        const banners = await prisma.$queryRawUnsafe<IMovieBanner[]>(
            query,
            ...queryArgs,
        );
        return banners;
    }

    async getOne(id: number): Promise<IMovie> {
        try {
            return await prisma.movie.findUniqueOrThrow({
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
            if (getErrorCode(error) == ErrorCodes.NotFound) {
                throw new NotFoundError();
            }
            throw error;
        }
    }

    async listByGenresExcludeByIds(
        genresIds: number[],
        excludeMoviesIds: number[],
    ): Promise<IMovieBanner[]> {
        return await prisma.movie.findMany({
            where: {
                AND: [
                    { genres: { some: { id: { in: genresIds } } } },
                    { id: { notIn: excludeMoviesIds } },
                ],
            },
            select: { id: true, coverUrl: true },
        });
    }

    async makeFavoriteForUser(movieId: number, userId: number): Promise<void> {
        try {
            const res =
                await prisma.$executeRaw`INSERT INTO _MovieToUser(A, B) VALUES(${movieId}, ${userId})`;
            console.log("res", res);
        } catch (err) {
            if (getErrorCode(err) == "P2010") {
                const prismaErr = err as PrismaClientKnownRequestError;
                const metaMsg = String(
                    prismaErr.meta!["message"],
                ).toLowerCase();
                if (metaMsg.includes("foreign key")) throw new NotFoundError();
                if (metaMsg.includes("unique")) throw new AlreadyExistsError();
                throw err;
            }
            throw err;
        }
    }
}

export class CountriesRepository {
    async list(): Promise<Country[]> {
        return await prisma.country.findMany();
    }
}
