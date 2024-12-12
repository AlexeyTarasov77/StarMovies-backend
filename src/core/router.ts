import { coreHandlers } from "./handlers";
import express from "express";

const router = express.Router();

router.get("/healthcheck", coreHandlers.healthcheckHandler);

export default router;
