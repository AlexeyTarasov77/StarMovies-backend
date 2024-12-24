import { IMovie,IGenre } from "./interfaces";
import { prisma } from "../prisma"
import { NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";
import { NotFoundErrCode } from "../prisma";


export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        try{
            return prisma.movie.findMany()  
        }catch(error){
            if (error instanceof NotFoundError){
                    console.log(error)
                    throw error
            }
        }                                                                                                    
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
                    throw error
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

