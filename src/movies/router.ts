import { Router } from 'express'
import { Container } from './container'
import router from "../core/router"

export const createRouter = (container: Container): Router => {
    router.get('/genres', (req, res) => container.genresHandler.getGenres(req, res))
    return router
}