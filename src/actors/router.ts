import { Router } from "express";
import { container } from "./container";

const router = Router();

router.get("/all", container.handlers.listActors);
router.get("/:id", container.handlers.getOneActor);

export default router;
