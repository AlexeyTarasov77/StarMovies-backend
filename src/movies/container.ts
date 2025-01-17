import { MoviesHandlers } from "./handlers";
import { ActorsRepository, GenresRepository, MoviesRepository, ReviewsRepository } from "./repositories";
import { MoviesService } from "./services";

export class Container {
  handlers: MoviesHandlers;
  constructor() {
    const moviesRepo = new MoviesRepository();
    const genresRepo = new GenresRepository();
    const actorsRepo = new ActorsRepository();
    const reviewsRepo = new ReviewsRepository();
    const moviesService = new MoviesService(moviesRepo, genresRepo, actorsRepo, reviewsRepo);
    this.handlers = new MoviesHandlers(moviesService);
  }
}

export const container = new Container();
