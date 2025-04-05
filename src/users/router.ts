import { Router } from "express";
import { container } from "./container";

const router = Router();

router.post("/signup", container.handlers.signUp);
router.post("/signin", container.handlers.signIn);
router.get("/me", container.handlers.getUser)

export default router;
