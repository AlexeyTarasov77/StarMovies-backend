import { IMovie,IGenre } from "./interfaces";
import { prisma } from "../prisma"
import { Prisma } from "@prisma/client"


export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        const movies = await prisma.movie.findMany()
        return movies                                                                                                           
    }
    async getOne(movieID: number): Promise<IMovie> {
        try{
            const movie = await prisma.movie.findUnique({
                where: {
                    id: movieID
                }
            })
            return movie
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                if (err.code === "P2025"){
                    console.log(err.message)
                    throw err
                }
            }

        }
    }
}


export const moviesRepository = new MoviesRepository();

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return
    }
}

