import { IMovie, IGenre } from "./interfaces";
import { prisma } from "../prisma"
import { NotFoundError } from "../core/repository";
import { NotFoundErrCode } from "../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        return prisma.movie.findMany()
    }

    async getOne(id: number): Promise<IMovie> {
        try {
            return await prisma.movie.findUniqueOrThrow({
                where: { id }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) {
                    throw new NotFoundError("Not found")
                }
            }
            throw error;
        }
    }
}

export class GenresRepository {
    // async list(): Promise<IGenre[]> {
    //     return
    // }
}

