import express from "express";
import { createFood, getFoods, getFoodById } from "../controllers/foodController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { upload } from "../middlewares/cloudinaryConfig.js";

const router = express.Router();

// ⭐ ONLY ADMIN CAN UPLOAD FOOD
router.post("/create", protect, adminOnly, upload.single("image"), createFood);

// ⭐ All users can view food
router.get("/", getFoods);

// ⭐ Single food
router.get("/:id", getFoodById);

export default router;
