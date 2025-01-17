import { IMovie, IGenre, IActor, ICountry, IReview } from "./interfaces";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GenresRepository {
  async list(): Promise<IGenre[]> {
    return await prisma.genre.findMany({});
  async list(): Promise<IGenre[]> {
    return await prisma.genre.findMany({});
  }
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
  async list(): Promise<IReview[]> {
    return await prisma.review.findMany({});
  }
}
}

export class MoviesRepository {
  async list(): Promise<IMovie[]> {
    const movies = await prisma.movie.findMany({
      include: {
        genres: { select: { name: true } },
        countryOfOrigin: { select: { id: true, name: true } },
      },
    });
    const formattedMovies: IMovie[] = movies.map((movie) => ({
      ...movie,
      genres: movie.genres.map((genre) => genre.name),
      countryOfOriginId: movie.countryOfOrigin.id,
    }));
    return formattedMovies;
  }

  async getOne(id: number): Promise<IMovie> {
    try {
      return await prisma.movie.findUniqueOrThrow({
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
