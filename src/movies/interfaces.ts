export interface IReview {
  rating: number;
  comment: string;
  movieId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
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
  lastName: string;
  bio?: string;
  photoUrl?: string;
  bornDate?: Date;
  deathDate?: Date;
  countryId?: number;  
  country: {
      id: number;
      name: string;
  }
  movies: IMovieBase[]; 
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
  avatarUrl?: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
  reviews: IReview[];
}
