
import {prisma} from "../client/prismaClient"
import { IGenre, IMovieDetails, IMovieBase } from './interfaces'

export class GenresRepository {
    async list(): Promise<IGenre[]>  {
        try{
            return await prisma.genre.findMany({})
        } catch(error){
            console.error(error)
            throw error
        }
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
    async list(): Promise<IMovieDetails[]> {
        try{
            return await prisma.movie.findMany({
            include: movieSelect,
        })
        } catch(error){
            console.error(error)
            throw error
        }
    }
    async getOne(movieID: number): Promise<IMovieDetails>{
        try{
            return await prisma.movie.findUnique({
                where: { 
                    id: movieID 
                },
                include: movieSelect,
            })
        } catch(error){
            console.error(error)
            throw error
        }
    }
}
