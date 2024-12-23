import { IMovie,IGenre } from "./interfaces";
import { prisma } from "../prisma"
// import { Prisma } from "@prisma/client"
import { NotFoundMovieError } from "../core/repository";



export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        const movies = await prisma.movie.findMany()
        return movies                                                                                                           
    }
    async getOne(movieID: number): Promise<IMovie> {
        try{
            const movie = await prisma.movie.findUniqueOrThrow({
                where: {
                    id: movieID
                }
            })
            return movie
        }catch(err){
            NotFoundMovieError(err)
        }
    }
}



export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return
    }
}

