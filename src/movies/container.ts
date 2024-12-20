
import { Pool } from 'pg';
import { MoviesHandlers, GenresHandler } from "./handlers";
import { GenresRepository, MoviesRepository } from "./repositories";
import {MoviesService, GenresService} from "./services";


export class Container {
    moviesHandlers: MoviesHandlers;
    genresHandler: GenresHandler;
    handlers: MoviesHandlers;
    constructor(db: Pool) {
        const moviesRepo = new MoviesRepository();
        const genresRepo = new GenresRepository(db);
        const moviesService = new MoviesService(moviesRepo, genresRepo);
        const genresService = new GenresService(genresRepo);
        this.handlers = new MoviesHandlers(moviesService);
        this.genresHandler = new GenresHandler(genresService);
    }
}

export const createContainer = (db: Pool) => new Container(db)

