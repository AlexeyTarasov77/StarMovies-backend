import { IGenre, IMovieDetails } from "./interfaces"

export class MovieNotFoundError extends Error {}

interface IMoviesRepo {
    list(): Promise<IMovieDetails[]>;
    getOne(movieID: number): Promise<IMovieDetails>;
}

interface IGenresRepo {
    list(): Promise<IGenre[]>;
}

export class MoviesService {
    constructor(public moviesRepo: IMoviesRepo, public genresRepo: IGenresRepo) {
        this.moviesRepo = moviesRepo;
        this.genresRepo = genresRepo
    }

    async moviesList(): Promise<IMovieDetails[]> {
        return await this.moviesRepo.list()
    }

    async getMovie(movieID: number): Promise<IMovieDetails> {
        return await this.moviesRepo.getOne(movieID)
    }

    async listGenres(): Promise<IGenre[]> {
        return this.genresRepo.list()
    }
}