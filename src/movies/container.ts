
import { MoviesHandlers } from "./handlers";
import { GenresRepository, MoviesRepository } from "./repositories";
import { MoviesService } from "./services";


export class Container {
    handlers: MoviesHandlers;
    constructor() {
        const moviesRepo = new MoviesRepository();
        const genresRepo = new GenresRepository();
        const moviesService = new MoviesService(moviesRepo, genresRepo);
        this.handlers = new MoviesHandlers(moviesService);
    }
}

export const container = new Container() 

