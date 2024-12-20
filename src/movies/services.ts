
import { IGenre, IMovie } from "./interfaces";
import { GenresRepository } from './repositories';

export class MovieNotFoundError extends Error {}

interface IMoviesRepo {
    list(): Promise<IMovie[]>;
    getOne(movieID: number): Promise<IMovie>;
}

interface IGenresRepo {
    list(): Promise<IGenre[]>;
}

export class GenresService {
    constructor(public genresRepo: GenresRepository) {}

    async getGenres(): Promise<IGenre[]> {
        return this.genresRepo.list()
    }
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
        return await this.moviesRepo.getOne(movieID);
    }

    async genresList(): Promise<IGenre[]> {
        return await this.genresRepo.list()
    }
}
