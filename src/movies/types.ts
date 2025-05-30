import { Country, Prisma } from "@prisma/client";
import { SortOrder } from "../core/types";
import { listMoviesQuerySchema } from "./schemas";
import { z } from "zod";

export type Movie = Prisma.MovieUncheckedCreateInput;

export interface IReview {
    rating: number;
    comment: string | null;
    movieId: number;
    userId?: number;
    createdAt: Date;
    updatedAt: Date;
    movie?: IMovie;
    user?: IUser;
}

export interface IMovieBanner {
    id: number;
    coverUrl: string | null;
}
export interface IMovie extends IMovieBanner {
    name: string;
    synopsis: string | null;
    releaseDate: Date;
    runtime: number;
    minAge: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    //   rating: number;
    genres?: IGenre[];
    actors?: IActor[];
    countryOfOriginId?: number;
    countryOfOrigin: ICountry;
    reviews?: IReview[];
}

export interface IGenre {
    id: number;
    name: string;
    description?: string | null;
    movies?: IMovie[];
}

export interface IActor {
    id: number;
    firstName: string;
    lastName: string | null;
    bio?: string | null;
    photoUrl?: string | null;
    bornDate?: Date | null;
    deathDate?: Date | null;
    countryId?: number;
    country?: ICountry;
    movies?: IMovie[];
}

export interface ICountry {
    id: number;
    name: string;
    movies?: IMovie[];
    actors?: IActor[];
}

export interface IUsersRepo {
    listFavoriteMovies(userId: number): Promise<Movie[]>;
}

export interface ICountriesRepo {
    list(): Promise<Country[]>;
}

export interface IMoviesRepo {
    list(limit?: number): Promise<IMovie[]>;
    getOne(movieID: number): Promise<IMovie>;
    listByGenresExcludeByIds(
        genresIds: number[],
        excludeMoviesIds: number[],
    ): Promise<IMovieBanner[]>;
    listOrderedByPopulatiry(
        direction: SortOrder,
        limit?: number,
    ): Promise<IMovieBanner[]>;
    makeFavoriteForUser(movieId: number, userId: number): Promise<void>;
}

export interface IGenresRepo {
    listIdsForMovies(moviesIds: number[]): Promise<number[]>;
    list(): Promise<IGenre[]>;
    getOne(genreId: number): Promise<IGenre>;
    createOne(data: Prisma.GenreCreateInput): Promise<IGenre>;
    deleteOne(genreId: number): Promise<IGenre>;
    updateOne(genreId: number, data: Prisma.GenreUpdateInput): Promise<IGenre>;
}

export interface IActorsRepo {
    list(): Promise<IActor[]>;
    getOne(actorID: number): Promise<IActor>;
}

export interface IReviewsRepo {
    list(): Promise<IReview[]>;
}
export type ListMoviesQuery = z.infer<typeof listMoviesQuerySchema>;
