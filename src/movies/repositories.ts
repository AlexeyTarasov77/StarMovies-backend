import { IMovie, IGenre, IActor, IReview } from "./interfaces";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GenresRepository {
  async list(): Promise<IGenre[]> {
    return await prisma.genre.findMany({});
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
            countryOfOrigin: true,
          },
        },
      },
    });
  }
  async getOne(id: number): Promise<IActor> {
    try {
      return await prisma.actor.findUniqueOrThrow({
        where: { id },
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
        genres: { select: { id: true, name: true } },
        actors: { select: { id: true, firstName: true, lastName: true } },
        reviews: {
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            movieId: true,
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
        countryOfOrigin: { select: { id: true, name: true } },
      },
    });
    return movies;
  }

  async getOne(id: number): Promise<IMovie> {
    try {
      return await prisma.movie.findUniqueOrThrow({
        where: { id },
        include: {
          countryOfOrigin: true,
          genres: true,
          actors: true,
          reviews: true,
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
