import {
    IActor,
    IGenre,
    IMovie,
    IMovieBanner,
    IReview,
    IMoviesRepo,
    IGenresRepo,
    IActorsRepo,
    IReviewsRepo,
    IUsersRepo,
    ICountriesRepo,
} from "./types";
import { AlreadyExistsError, NotFoundError } from "../core/repository";
import { ListMoviesQuery } from "./types";
import { SortOrder } from "../core/types";
import { InvalidCredentialsError } from "../users/services";
import { Prisma } from "@prisma/client";

export class MovieNotFoundError extends Error {
    constructor(movieId: number) {
        super(`Movie with id ${movieId} not found`);
    }
}

export class ActorNotFoundError extends Error {
    constructor(actorId: number) {
        super(`Actor with id ${actorId} not found`);
    }
}

export class GenreNotFoundError extends Error {
    constructor(genreId: number) {
        super(`Genge with id ${genreId} not found`);
    }
}

export class MovieAlreadyInFavoritesError extends Error {
    constructor() {
        super("That movie has been already added to favorites before");
    }
}

export class MoviesService {
    constructor(
        public moviesRepo: IMoviesRepo,
        public usersRepo: IUsersRepo,
        public genresRepo: IGenresRepo,
        public actorsRepo: IActorsRepo,
        public reviewsRepo: IReviewsRepo,
        public countriesRepo: ICountriesRepo,
    ) {
        this.moviesRepo = moviesRepo;
        this.genresRepo = genresRepo;
        this.actorsRepo = actorsRepo;
        this.reviewsRepo = reviewsRepo;
        this.usersRepo = usersRepo;
    }

    async listGenres(): Promise<IGenre[]> {
        return await this.genresRepo.list();
    }

    async getGenre(genreId: number): Promise<IGenre> {
        try {
            return await this.genresRepo.getOne(genreId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new GenreNotFoundError(genreId);
            }
            throw err;
        }
    }
    async createOne(data: Prisma.GenreCreateInput): Promise<IGenre> {
        return await this.genresRepo.createOne(data);
    }
    async updateGenre(
        data: Prisma.GenreUpdateInput,
        genreId: number,
    ): Promise<IGenre> {
        return await this.genresRepo.updateOne(genreId, data);
    }

    async listActors(): Promise<IActor[]> {
        return await this.actorsRepo.list();
    }

    async getActor(actorId: number): Promise<IActor> {
        try {
            return await this.actorsRepo.getOne(actorId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ActorNotFoundError(actorId);
            }
            throw err;
        }
    }

    async listReviews(): Promise<IReview[]> {
        return await this.reviewsRepo.list();
    }

    async listMovies(dto: ListMoviesQuery): Promise<IMovie[] | IMovieBanner[]> {
        if (dto.filters.includes("mostPopular"))
            return await this.moviesRepo.listOrderedByPopulatiry(
                SortOrder.DESC,
                dto.limit,
            );
        return await this.moviesRepo.list(dto.limit);
    }

    async getMovie(movieId: number): Promise<IMovie> {
        try {
            return await this.moviesRepo.getOne(movieId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new MovieNotFoundError(movieId);
            }
            throw err;
        }
    }

    async listRecommendedMovies(
        watchedMoviesIds: number[],
    ): Promise<IMovieBanner[]> {
        const genresIds = await this.genresRepo.listIdsForMovies(watchedMoviesIds);
        if (!genresIds.length) return [];
        return await this.moviesRepo.listByGenresExcludeByIds(
            genresIds,
            watchedMoviesIds,
        );
    }

    async addFavoriteMovie(movieId: number, userId: number): Promise<void> {
        try {

            await this.moviesRepo.makeFavoriteForUser(movieId, userId);
        } catch (err) {
            if (err instanceof NotFoundError) throw new MovieNotFoundError(movieId);
            if (err instanceof AlreadyExistsError) throw new MovieAlreadyInFavoritesError();
            throw err;
        }
    }
    async listFavoriteMovies(userId: number) {
        try {
            return await this.usersRepo.listFavoriteMovies(userId);
        } catch (err) {
            if (err instanceof NotFoundError) throw new InvalidCredentialsError();
            throw err;
        }
    }
    async listCountries() {
        return await this.countriesRepo.list();
    }
}
