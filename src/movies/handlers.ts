import { MoviesService } from "./services"
import { Request, Response } from "express";

export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service
    }
    public listMovies = async(req: Request, res: Response) => {
        const movies = await this.service.moviesList()
        res.status(200).json(movies)
    }
    public getOne = async(req: Request, res: Response): Promise<void> => {
        try{
            const movieId = parseInt(req.params.id)
            const movie = await this.service.getMovie(movieId)
            if (!movie) {
                res.status(404).json({ message: "Movie not found" })
            } 
            res.status(200).json(movie)
        }catch(error){

        }

    }
}
