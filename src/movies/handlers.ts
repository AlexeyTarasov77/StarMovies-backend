import { NotFoundError } from "../core/repository"
import { MoviesService } from "./services"
import { Request, Response } from "express"


export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service
    }
    public listMovies = async (req: Request, res: Response) => {
        const movies = await this.service.listMovies()
        res.status(404).json(movies)
    }
    public getOne = async (req: Request, res: Response): Promise<void> => {
        const movieId = parseInt(req.params.id)
        const movie = await this.service.getMovie(movieId)
        if (isNaN(movieId)){
            res.status(400).json({ message: "Invalid movie`s id" })
        }
        try{
            res.status(200).json(movie)
        }catch (error){
            throw NotFoundError
        }

    }
}
