import { Router } from "express";
import { container } from "./container";

const router = Router();

router.get("/all", container.handlers.listMovies);
router.get("/recommendations", container.handlers.listRecommendedMovies);
router.get("/detail/:id", container.handlers.getMovie);
router.post("/add-favorite", container.handlers.addFavoriteMovie);
router.get("/list-favorites", container.handlers.listFavoriteMovies);
router.get("/genres/all", container.handlers.listGenres);
router.get("/genres/:id", container.handlers.getGenre);
router.get("/actors/all", container.handlers.listActors);
router.get("/actors/countries", container.handlers.listCountries);
router.get("/actors/:id", container.handlers.getActor);
router.get("/reviews/all", container.handlers.listReviews);

router.delete("/genres/delete", container.handlers.deleteGenre);
router.post("/genre/new", container.handlers.createGenre);
router.patch("/genre/updated/:id", container.handlers.updateGenre);

export default router;
