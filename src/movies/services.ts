import { IGenre, IMovie } from "./interfaces";
import { MoviesRepository } from "./repositories";


export class MovieNotFoundError extends Error {}

interface IMoviesRepo {
    list(): Promise<IMovie[]>;
    getOne(movieID: number): Promise<IMovie>;
}

interface IGenresRepo {
    list(): Promise<IGenre[]>;
}

export class MoviesService {
    constructor(public moviesRepo: IMoviesRepo, public genresRepo: IGenresRepo) {
        this.moviesRepo = moviesRepo;
        this.genresRepo = genresRepo
    }

    async moviesList(): Promise<IMovie[]> {
        return await this.moviesRepo.list()
    }

    async getMovie(movieID: number): Promise<IMovie> {
        try{
            return await this.moviesRepo.getOne(movieID)
        }catch (error){
            console.error("Error fetching movie:", error) 
            return error
        }
    }

    // async genresList(): Promise<IGenre> {
    //     return
    // }
}