import { IActor, ICountry, IGenre, IMovie, IReview } from "./interfaces";
import { NotFoundError } from "../core/repository";

export class MovieNotFoundError extends Error {
  constructor(movieId: number) {
    super(`Movie with id ${movieId} not found`);
  }
}

interface IMoviesRepo {
  list(): Promise<IMovie[]>;
  getOne(movieID: number): Promise<IMovie>;
}

interface IGenresRepo {
  list(): Promise<IGenre[]>;
}

interface IActorsRepo {
  list(): Promise<IActor[]>;
}

interface IReviewsRepo {
  list(): Promise<IReview[]>;
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

  async listMovies(): Promise<IMovie[]> {
    return await this.moviesRepo.list();
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
}
