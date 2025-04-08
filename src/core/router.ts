import { coreHandlers } from "./handlers";
import express from "express";
import moviesRouter from "../movies/router";
import usersRouter from "../users/router";
import actorsRouter from "../actors/router";


const router = express.Router();

router.get("/healthcheck", coreHandlers.healthcheckHandler);
router.use("/movies", moviesRouter);
router.use("/actors", actorsRouter);
router.use("/users", usersRouter);

export default router;
