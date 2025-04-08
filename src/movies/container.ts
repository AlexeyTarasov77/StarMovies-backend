import { UsersRepository } from "../users/repositories";
import { MoviesHandlers } from "./handlers";
import {
    ActorsRepository,
    CountriesRepository,
    GenresRepository,
    MoviesRepository,
    ReviewsRepository,
} from "./repositories";
import { MoviesService } from "./services";

export class Container {
    handlers: MoviesHandlers;
    constructor() {
        const moviesRepo = new MoviesRepository();
        const genresRepo = new GenresRepository();
        const actorsRepo = new ActorsRepository();
        const reviewsRepo = new ReviewsRepository();
        const usersRepo = new UsersRepository();
        const countriesRepo = new CountriesRepository();
        const moviesService = new MoviesService(
            moviesRepo,
            usersRepo,
            genresRepo,
            actorsRepo,
            reviewsRepo,
            countriesRepo,
        );
        this.handlers = new MoviesHandlers(moviesService);
    }
}

export const container = new Container();
