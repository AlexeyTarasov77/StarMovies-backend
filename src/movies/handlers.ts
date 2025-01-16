import { MovieNotFoundError, MoviesService } from "./services";
import { Request, Response } from "express";

export class MoviesHandlers {
  constructor(public service: MoviesService) {
    this.service = service;
  }
  public listMovies = async (req: Request, res: Response) => {
    const movies = await this.service.listMovies();
    res.status(200).json(movies);
  };
  public getOne = async (req: Request, res: Response): Promise<void> => {
    const movieId = parseInt(req.params.id);
    if (isNaN(movieId)) {
      res.status(400).json({ message: "Invalid movie`s id" });
      return;
    }
    try {
      const movie = await this.service.getMovie(movieId);
      res.status(200).json(movie);
    } catch (err) {
      if (err instanceof MovieNotFoundError) {
        res.status(404).json({ message: err.message });
        return;
      }
      throw err;
    }
  };
  public listGenres = async (req: Request, res: Response): Promise<void> => {
    const genres = await this.service.listGenres();
    res.status(200).json(genres);
  };

  public listActors = async (req: Request, res: Response): Promise<void> => {
    const actors = await this.service.listActors();
    res.status(200).json(actors);
  };

  public countryOfOrigin = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const countryOfOriginId = parseInt(req.params.id);
    const countryOfOrigin =
      await this.service.countryOfOrigin(countryOfOriginId);
    res.status(200).json(countryOfOrigin);
  };

  public listReviews = async (req: Request, res: Response): Promise<void> => {
    const reviews = await this.service.listReviews();
    res.status(200).json(reviews);
  };
}
