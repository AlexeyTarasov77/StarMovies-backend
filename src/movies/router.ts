import { Router } from "express";
import { container } from "./container";


const router = Router();

router.get("/all", container.handlers.listMovies)
router.get("/:id", container.handlers.getOne)
router.get('/genres/all', container.handlers.listGenres)

export default router
