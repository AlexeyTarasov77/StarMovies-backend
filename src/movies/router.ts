import { Router } from "express";
import { container } from "./container";

const router = Router();

router.get("/all", container.handlers.listMovies);
router.get("/recommendations", container.handlers.listRecommendedMovies);
router.get("/:id", container.handlers.getOne);
router.get("/genres/all", container.handlers.listGenres);
router.get("/genres/:id", container.handlers.getGenre);
router.get("/actors/all", container.handlers.listActors);
router.get("/actors/:id", container.handlers.getActor);
router.get("/reviews/all", container.handlers.listReviews);

router.post("/genres/delete", container.handlers.deleteGenre)
router.post("/genre/new", container.handlers.createGenre);
router.post("/genre/updated/:id", container.handlers.updateGenre);

export default router;
