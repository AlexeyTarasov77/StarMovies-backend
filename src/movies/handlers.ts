import { MovieNotFoundError, MoviesService } from "./services"
import { Request, Response } from "express"


export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service
    }
    public listMovies = async (req: Request, res: Response) => {
        const movies = await this.service.listMovies()
        res.status(200).json(movies)
    }
    public getOne = async (req: Request, res: Response): Promise<void> => {
        const movieId = parseInt(req.params.id)
        if (isNaN(movieId)) {
            res.status(400).json({ message: "Invalid movie`s id" })
            return
        }
        try {
            const movie = await this.service.getMovie(movieId)
            res.status(200).json(movie)
        } catch (err) {
            if (err instanceof MovieNotFoundError) {
                res.status(404).json({ message: err.message })
                return
            }
            throw err
        }
    }
}
