import { IGenre, IMovie } from "./interfaces";
import { NotFoundError } from "../core/repository";

export class MovieNotFoundError extends Error {
    constructor(movieId: number) {
        super(`Movie with id ${movieId} not found`)
    }
}


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

    async listGenres(): Promise<IGenre[]> {
        return await this.genresRepo.list()
    }

    async listMovies(): Promise<IMovie[]> {
        return await this.moviesRepo.list()
    }

    async getMovie(movieId: number): Promise<IMovie> {
        try {
            return await this.moviesRepo.getOne(movieId)
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new MovieNotFoundError(movieId)
            }
            throw err
        }
    }
}
