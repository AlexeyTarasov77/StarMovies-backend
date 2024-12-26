import { MoviesService } from "./services"
import { Request, Response } from 'express'

export class MoviesHandlers {
    constructor(private service: MoviesService) { }

    async listMovies(req: Request, res: Response): Promise<void> {
        const movies = await this.service.moviesList()
        res.status(200).json(movies)
    }

    async listGenres(req: Request, res: Response): Promise<void> {
        const genres = await this.service.listGenres()
        res.status(200).json(genres)

    }
}
