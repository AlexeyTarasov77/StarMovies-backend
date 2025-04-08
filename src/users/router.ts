import { Router } from "express";
import { container } from "./container";

const router = Router();


router.get("/all", container.handlers.listUsers);
router.get("/:id", container.handlers.getUser);

router.post("/delete", container.handlers.deleteUser)
router.post("/user/new", container.handlers.createUser)
router.post("/user/updated/:id", container.handlers.updateUser)

export default router;
