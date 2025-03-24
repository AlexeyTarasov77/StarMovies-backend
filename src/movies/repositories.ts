import { IMovie, IMovieBanner, IGenre, IActor, IReview } from "./types";
import { Prisma } from '@prisma/client'
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SortOrder } from "../core/types";

export class GenresRepository {
  async list(): Promise<IGenre[]> {
    return await prisma.genre.findMany({});
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
    return await prisma.actor.findMany({});
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
        actors: { select: { id: true, firstName: true, lastName: true } },
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

  async listOrderedByPopulatiry(direction: SortOrder, limit?: number): Promise<IMovieBanner[]> {
    // double-check direction to prevent posibillity of sql injection
    if (direction !== SortOrder.ASC && direction !== SortOrder.DESC) throw new Error("Invalid direction")
    let query = `
        SELECT m.id, m.coverUrl from "Movie" m
        LEFT JOIN "Review" r on r."movieId" = m.id
        GROUP BY m.id, m.coverUrl
        ORDER BY AVG(r.rating) ${direction}`
    let queryArgs = []
    if (limit !== undefined) {
      query += " LIMIT $1"
      queryArgs.push(limit)
    }
    const banners = await prisma.$queryRawUnsafe<IMovieBanner[]>(query, ...queryArgs)
    return banners
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
              user: { select: { avatarUrl: true, username: true, id: true } },
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

  async listByGenresExcludeByIds(
    genresIds: number[], excludeMoviesIds: number[]
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
}
