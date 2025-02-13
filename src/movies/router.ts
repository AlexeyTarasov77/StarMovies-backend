import { Router } from "express";
import { container } from "./container";

const router = Router();

router.get("/all", container.handlers.listMovies);
router.get("/:id", container.handlers.getMovie);
router.get("/genres/all", container.handlers.listGenres);
router.get("/actors/all", container.handlers.listActors);
router.get("/actors/:id", container.handlers.getActor);
router.get("/reviews/all", container.handlers.listReviews);

export default router;
