import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile",protect, getProfile);
router.put("/profile",protect, updateProfile);
export default router;
