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
} from "./types";
import { NotFoundError } from "../core/repository";
import { ListMoviesQuery } from "./schemas";
import { SortOrder } from "../core/types";

export class MovieNotFoundError extends Error {
  constructor(movieId: number) {
    super(`Movie with id ${movieId} not found`);
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
  async listActors(): Promise<IActor[]> {
    return await this.actorsRepo.list();
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
}
