
import { IMovie, IGenre } from './interfaces'
import { Pool } from 'pg' // Для работы с PostgreSQL

export class MoviesRepository {
    async list(): Promise<IMovie[]> {}
    async getOne(movieID: number): Promise<IMovie> {}
}

export class GenresRepository{
    // private защищает данные от доступа к базе данных извне
    private db: Pool 

    constructor(db: Pool) {
        this.db = db // Инициализация db через конструктор
    }

    async list(): Promise<IGenre[]> {
        // query выполняет SQL-запросов к базе данных и возвращает результат 
        const result = await this.db.query('SELECT id, name FROM genres')
        return result.rows
    }
}
