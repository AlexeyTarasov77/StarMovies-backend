import { Router } from "express";
import { container } from "./container";

const router = Router();

// router.get("/register", container.handlers.authRegister)
router.get("/all", container.handlers.listUsers);
router.get("/:id", container.handlers.getUser);

export default router;
