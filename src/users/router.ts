import { Router } from "express";
import { container } from "./container";

const router = Router();

router.post("/register", container.handlers.registrationUser);
router.get("/register", container.handlers.registration);
router.post("/login", container.handlers.loginUser);
router.get("/login", container.handlers.login);



export default router;
