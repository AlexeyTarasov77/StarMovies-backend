

export class MoviesRepository {
    async list(): Promise<IMovie[]> {}
    async getOne(movieID: number): Promise<IMovie> {}
}

export class GenresRepository {
    async list(): Promise<IGenre[]> {}
}