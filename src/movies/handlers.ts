
import { MoviesService} from "./services"
import { Request, Response } from 'express'

export class MoviesHandlers {
    constructor(private service: MoviesService) {}

    async getAllMovies(req: Request, res: Response): Promise<void> {
        try {
            const movies = await this.service.moviesList()
            res.status(200).json(movies)
        } catch (error) {
            console.error("getAllMovies:", error)
            res.status(500).json({ error: 'Ошибка получения фильмов In getAllMovies' })
        }
    }

    async getAllGenres(req: Request, res: Response): Promise<void> {
        try {
            const genres = await this.service.listGenres()
            res.status(200).json(genres)
        } catch (error) {
            console.error("getAllGenres:", error)
            res.status(500).json({ error: 'Ошибка получения жанров In getAllGenres' })
        }
    }
}