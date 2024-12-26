import { coreHandlers } from "./handlers";
import express from "express";
import moviesRouter from "../movies/router";

const router = express.Router();

router.get("/healthcheck", coreHandlers.healthcheckHandler);
router.use("/movies", moviesRouter);

export default router;
