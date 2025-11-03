import { Router } from "express";
import { authController } from "../controllers/authController";

const router = Router();

// Public routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/refresh", authController.refreshToken);
router.post("/signout", authController.signout);

export default router;
