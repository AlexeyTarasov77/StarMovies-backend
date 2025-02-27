import { coreHandlers } from "./handlers";
import express from "express";
import moviesRouter from "../movies/router";
import usersRouter from "../users/router";

const router = express.Router();

router.get("/healthcheck", coreHandlers.healthcheckHandler);
router.use("/movies", moviesRouter);
router.use("/users", usersRouter)

export default router;

