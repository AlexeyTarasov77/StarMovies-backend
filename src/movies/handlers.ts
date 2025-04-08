import {
    HTTPBadRequestError,
    HTTPConflictError,
    HTTPNotFoundError,
    HTTPUnauthorizedError,
} from "../core/http-errors";
import { getSuccededResponse } from "../core/utils";
import { parseArray } from "../core/utils";
import { validateObjectId, validateRequest } from "../core/validation";
import { InvalidCredentialsError } from "../users/services";
import { requireAuthorized } from "../users/utils";
import { listMoviesQuerySchema } from "./schemas";
import {
    ActorNotFoundError,
    GenreNotFoundError,
    MovieAlreadyInFavoritesError,
    MovieNotFoundError,
    MoviesService,
} from "./services";
import { Request, Response } from "express";

export class MoviesHandlers {
    constructor(public service: MoviesService) {
        this.service = service;
    }
    public listMovies = async (req: Request, res: Response) => {
        const dto = validateRequest(req, listMoviesQuerySchema, "query");
        const movies = await this.service.listMovies(dto);
        res.status(200).json(getSuccededResponse(movies));
    };
    public getMovie = async (req: Request, res: Response): Promise<void> => {
        const movieId = validateObjectId(req.params.id);
        try {
            const movie = await this.service.getMovie(movieId);
            res.status(200).json(getSuccededResponse(movie));
        } catch (err) {
            if (err instanceof MovieNotFoundError) {
                throw new HTTPNotFoundError(err.message);
            }
            throw err;
        }
    };
    public listGenres = async (req: Request, res: Response): Promise<void> => {
        const genres = await this.service.listGenres();
        res.status(200).json(getSuccededResponse(genres));
    };

    public listActors = async (req: Request, res: Response): Promise<void> => {
        const actors = await this.service.listActors();
        res.status(200).json(getSuccededResponse(actors));
    };
    public createGenre = async (req: Request, res: Response): Promise<void> => {
        const genre = await this.service.createGenre(req.body);
        res.status(200).json(getSuccededResponse(genre));
    };
    public updateGenre = async (req: Request, res: Response): Promise<void> => {
        const genreId = validateObjectId(req.params.id)
        try {
            const genre = await this.service.updateGenre(req.body, genreId);
            res.status(200).json(getSuccededResponse(genre));
        } catch (err) {
            if (err instanceof GenreNotFoundError) {
                throw new HTTPNotFoundError(err.message);
            }
            throw err;
        }
    };
    public deleteGenre = async (req: Request, res: Response): Promise<void> => {
        const genreId = validateObjectId(req.params.id)
        try {
            const genre = await this.service.deleteGenre(genreId);
            res.status(200).json(getSuccededResponse(genre));
        } catch (err) {
            if (err instanceof GenreNotFoundError) {
                throw new HTTPNotFoundError(err.message)
            }
            throw err;
        }
    };
    public getGenre = async (req: Request, res: Response): Promise<void> => {
        const genreId = validateObjectId(req.params.id);
        try {
            const genre = await this.service.getGenre(genreId);
            res.status(200).json(getSuccededResponse(genre));
        } catch (err) {
            if (err instanceof GenreNotFoundError) {
                throw new HTTPNotFoundError(err.message)
            }
            throw err;
        }
    };
    public getActor = async (req: Request, res: Response): Promise<void> => {
        const actorId = validateObjectId(req.params.id);
        try {
            const actor = await this.service.getActor(actorId);
            res.status(200).json(getSuccededResponse(actor));
        } catch (err) {
            if (err instanceof ActorNotFoundError) {
                throw new HTTPNotFoundError(err.message)
            }
            throw err;
        }
    };

    public listReviews = async (req: Request, res: Response): Promise<void> => {
        const reviews = await this.service.listReviews();
        res.status(200).json(getSuccededResponse(reviews));
    };

    public listRecommendedMovies = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        if (!req.query.id) {
            throw new HTTPBadRequestError(
                "Empty id param. Supply at least one movie id to get recommendations",
            );
        }
        const moviesIds = parseArray(req.query.id, Number);
        const movies = await this.service.listRecommendedMovies(moviesIds);
        res.status(200).json(getSuccededResponse(movies));
    };

    public addFavoriteMovie = async (req: Request, res: Response) => {
        const userId = requireAuthorized(res);
        const movieId = validateObjectId(req.body.movieId);
        try {
            await this.service.addFavoriteMovie(movieId, userId);
        } catch (err) {
            if (err instanceof MovieNotFoundError)
                throw new HTTPNotFoundError(err.message);
            if (err instanceof MovieAlreadyInFavoritesError)
                throw new HTTPConflictError(err.message);
            throw err;
        }
        res.json(getSuccededResponse(null));
    };
    public listFavoriteMovies = async (req: Request, res: Response) => {
        const userId = requireAuthorized(res);
        try {
            const movies = await this.service.listFavoriteMovies(userId);
            res.json(getSuccededResponse(movies));
        } catch (err) {
            if (err instanceof InvalidCredentialsError)
                throw new HTTPUnauthorizedError(err.message);
            throw err;
        }
    };

    public listCountries = async (req: Request, res: Response) => {
        const countries = await this.service.listCountries();
        res.json(getSuccededResponse(countries));
    };
}
