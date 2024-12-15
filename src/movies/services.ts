import { IGenre, IMovie } from "./interfaces";

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

    async moviesList(): Promise<IMovie[]> {}

    async getMovie(movieID: number): Promise<IMovie> {}

    async genresList(): Promise<IGenre> {}
}