export interface IReview {
  rating: number;
  comment: string | null;
  movieId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  movie?: IMovie;
  user?: IUser;
}

export interface IMovie {
  id: number;
  name: string;
  synopsis: string | null;
  releaseDate: Date;
  movie?: IMovieBase;
  user?: IUser;
}

export interface IMovieBase {
  id: number;
  name: string;
  releaseDate: Date;
  runtime: number;
}

export interface IMovieDetails extends IMovieBase {
  synopsis?: string;
  runtime: number;
  minAge?: number;
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  actors?: IActor[];
  genres?: IGenre[];
  countryOfOriginId: number;
  countryOfOrigin?: ICountry;
  reviews?: IReview[];
}

export interface IGenre {
  id: number;
  name: string;
  movies?: IMovieBase[];
}

export interface IActor {
  id: number;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  photoUrl: string | null;
  bornDate: Date | null;
  deathDate: Date | null;
  countryId: number;
  country?: ICountry;
  movies?: IMovie[];
}

export interface ICountry {
  id: number;
  name: string;
  movies?: IMovieBase[];
  actors?: IActor[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatarUrl: string | null;
  password: string;

  createdAt: Date;
  updatedAt: Date;
  reviews: IReview[];
}
