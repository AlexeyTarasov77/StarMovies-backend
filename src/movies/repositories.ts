import { IMovie,IGenre } from "./interfaces";
import { prisma } from "../prisma"
import { NotFoundError } from "../core/repository";


export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        return prisma.movie.findMany()                                                                                                      
    }
    async getOne(movieID: number): Promise<IMovie> {
        try{
            const movie = await prisma.movie.findUniqueOrThrow({
                where: {
                    id: movieID
                }
            })
            return movie
        }catch(error){
            new NotFoundError(error)
        }
    }
}

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return
    }
}

