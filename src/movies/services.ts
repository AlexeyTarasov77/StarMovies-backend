import { IGenre, IMovie } from "./interfaces";
import { NotFoundError } from "../core/repository";

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

    async listMovies(): Promise<IMovie[]> {
        return await this.moviesRepo.list()
    }

    async getMovie(movieID: number): Promise<IMovie> {
        try{
            return await this.moviesRepo.getOne(movieID)
        }catch (error){
            if (error instanceof NotFoundError){
                throw new MovieNotFoundError()
            }
        }
    }

}