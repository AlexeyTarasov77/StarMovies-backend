
import { MoviesService } from "./services"
import { Request, Response } from 'express';
import { GenresService } from './services';


export class GenresHandler{
    constructor(public genresService: GenresService) {}

    async getGenres(req: Request, res: Response): Promise<void> {
        const genres = await this.genresService.getGenres()
        res.status(200).json(genres)
    }
}

export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service
    }
}
