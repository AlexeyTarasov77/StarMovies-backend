import { Router } from "express"
import { container } from "./container"


const router = Router()

router.get('/genres', container.handlers.getAllGenres)

export default router