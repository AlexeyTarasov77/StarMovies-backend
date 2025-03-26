import { IActor, IGenre, IMovie, IMovieBanner, IReview, IMoviesRepo, IGenresRepo, IActorsRepo, IReviewsRepo } from "./types";
import { NotFoundError } from "../core/repository";
import { ListMoviesQuery } from "./schemas";
import { SortOrder } from "../core/types";
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

export class MoviesService {
    constructor(
        public moviesRepo: IMoviesRepo,
        public genresRepo: IGenresRepo,
        public actorsRepo: IActorsRepo,
        public reviewsRepo: IReviewsRepo,
    ) {
        this.moviesRepo = moviesRepo;
        this.genresRepo = genresRepo;
        this.actorsRepo = actorsRepo;
        this.reviewsRepo = reviewsRepo;
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
    // async updateGenre(
    //     data: Prisma.GenreUpdateInput,
    //     genreId: number,
    // ): Promise<IGenre> {
    //     return await this.genresRepo.updateOne(genreId, data);
    // }

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
      return await this.moviesRepo.listOrderedByPopulatiry(SortOrder.DESC, dto.limit)
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
    const genresIds = await this.genresRepo.listIdsForMovies(watchedMoviesIds)
    if (!genresIds.length) return []
    return await this.moviesRepo.listByGenresExcludeByIds(genresIds, watchedMoviesIds);
  }
}
