import { Router } from "express";
import { container } from "./container";

const router = Router();

router.post("/signup", container.handlers.signUp);
router.post("/signin", container.handlers.signIn);
router.get("/me", container.handlers.getUser)
router.get("/all", container.handlers.listUsers);
router.get("/:id", container.handlers.getUser);

router.post("/user/new", container.handlers.createUser)
router.post("/user/updated/:id", container.handlers.updateUser)

export default router;
