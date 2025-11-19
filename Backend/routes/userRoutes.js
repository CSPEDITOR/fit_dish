import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/cloudinaryConfig.js";
// import upload from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile",protect, getProfile);
// router.put("/profile",protect, updateProfile);
// router.put("/profile", protect, updateProfile);

router.put("/profile", protect, upload.single("profileImage"), updateProfile);
export default router;
