import { IMovie,IGenre } from "./interfaces";
import { prisma } from "../prisma"
import { NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";
import { NotFoundErrCode } from "../prisma";


export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        return prisma.movie.findMany()                                                                                       
    }

    async getOne(movieID: number): Promise<IMovie> {
        try{
            return await prisma.movie.findUniqueOrThrow({
                where: {
                    id: movieID
                }
            })
        }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === NotFoundErrCode){
                    console.log(error)
                    throw NotFoundError
                }
            }
        }
    }
}

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return
    }
}

