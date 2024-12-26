import { prisma } from "../client/prismaClient"
import { IGenre, IMovie } from './interfaces'

export class GenresRepository {
    async list(): Promise<IGenre[]> {
        return await prisma.genre.findMany({})
    }
}

const actorSelect = {
    id: true,
    firstName: true,
    lastName: true,
    bio: true,
    photoUrl: true,
    bornDate: true,
    deathDate: true,
    country: {
        select: {
            id: true,
            name: true,
        },
    },
    movies: {
        select: {
            id: true,
            name: true,
            releaseDate: true,
            runtime: true,
            coverUrl: true,
            countryOfOriginId: true,
            createdAt: true,
            updatedAt: true,
        },
    },
}

const countryOfOriginSelect = {
    id: true,
    name: true,
}

const reviewSelect = {
    createdAt: true,
    updatedAt: true,
    rating: true,
    comment: true,
    movieId: true,
    userId: true,
}

const genreSelect = {
    id: true,
    name: true,
}

const movieSelect = {
    genres: { select: genreSelect },
    actors: { select: actorSelect },
    countryOfOrigin: { select: countryOfOriginSelect },
    reviews: { select: reviewSelect },
};

export class MoviesRepository {
    async list(): Promise<IMovie[]> {
        return await prisma.movie.findMany({
            include: movieSelect
        })
    }
    async getOne(movieID: number): Promise<IMovie> {
        return await prisma.movie.findUnique({
            where: {
                id: movieID
            },
            include: movieSelect,
        })
    }
}
