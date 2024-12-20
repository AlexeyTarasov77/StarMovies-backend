export interface IReview {
  rating: number;
  comment?: string;
  movieId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  movie: IMovie;
  user: IUser;
}

export interface IMovie {
  id: number;
  name: string;
  synopsis?: string;
  releaseDate: Date;
  runtime: number;
  minAge?: number;
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  actors: IActor[];
  genres: IGenre[];
  countryOfOriginId: number;
  countryOfOrigin: ICountry;
  reviews: IReview[];
}

export interface IGenre {
  id: number;
  name: string;
  movies: IMovie[];
}

export interface IActor {
  id: number;
  firstName: string;
  lastName?: string;
  bio?: string;
  photoUrl?: string;
  bornDate?: Date;
  deathDate?: Date;
  countryId: number;
  country: ICountry;
  movies: IMovie[];
}

export interface ICountry {
  id: number;
  name: string;
  movies: IMovie[];
  actors: IActor[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
  reviews: IReview[];
}
