import { IMovie, IGenre } from "./interfaces";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GenresRepository {
  async list(): Promise<IGenre[]> {
    return await prisma.genre.findMany({});
  }
}

export class MoviesRepository {
  async list(): Promise<IMovie[]> {
    return await prisma.movie.findMany();
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
