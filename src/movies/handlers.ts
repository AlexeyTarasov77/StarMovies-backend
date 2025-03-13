import { HTTPNotFoundError } from "../core/http-errors";
import { validateObjectId } from "../core/validation";
import { ActorNotFoundError, GenreNotFoundError, MovieNotFoundError, MoviesService } from "./services";
import { NextFunction, Request, Response } from "express";

export class MoviesHandlers {
  constructor(public service: MoviesService) {
    this.service = service;
  }
  public listMovies = async (req: Request, res: Response) => {
    const movies = await this.service.listMovies();
    res.status(200).json(movies);
  };
  public getOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const movieId = validateObjectId(req.params.id);
    try {
      const movie = await this.service.getMovie(movieId);
      res.status(200).json(movie);
    } catch (err) {
      if (err instanceof MovieNotFoundError) {
        throw new HTTPNotFoundError(err.message);
      }
      throw err;
    }
  };
  public listGenres = async (req: Request, res: Response): Promise<void> => {
    const genres = await this.service.listGenres();
    res.status(200).json(genres);
  };

  public getGenre = async (req: Request, res: Response): Promise<void> => {
    const genreId = validateObjectId(req.params.id);
    try {
      const genre = await this.service.getGenre(genreId);
      res.status(200).json(genre);
    } catch (err) {
      if (err instanceof GenreNotFoundError) {
        res.status(404).json({ message: err.message });
        return;
      }
      throw err;
    }
  };

  public listActors = async (req: Request, res: Response): Promise<void> => {
    const actors = await this.service.listActors();
    res.status(200).json(actors);
  };
  public getActor = async (req: Request, res: Response): Promise<void> => {
    const actorId = validateObjectId(req.params.id);
    try {
      const actor = await this.service.getActor(actorId);
      res.status(200).json(actor);
    } catch (err) {
      if (err instanceof ActorNotFoundError) {
        res.status(404).json({ message: err.message });
        return;
      }
      throw err;
    }
  };

  public listReviews = async (req: Request, res: Response): Promise<void> => {
    const reviews = await this.service.listReviews();
    res.status(200).json(reviews);
  };

  public listRecommendedMovies = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    if (!req.query.id) {
      res.status(400).json({
        message:
          "Empty id param. Supply at least one movie id to get recommendations",
      });
      return;
    }
    const moviesIds = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    const movies = await this.service.listRecommendedMovies(
      moviesIds.map(Number),
    );
    res.status(200).json(movies);
  };
}
