import express from "express";
import { createFood, getFoods, getFoodById, updateFood } from "../controllers/foodController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { upload } from "../middlewares/cloudinaryConfig.js";

const router = express.Router();

// ⭐ ONLY ADMIN CAN UPLOAD FOOD
router.post("/create", protect, adminOnly, upload.single("image"), createFood);
router.put("/:id", protect, adminOnly, upload.single("image"), updateFood);
// ⭐ All users can view food
router.get("/", getFoods);

// ⭐ Single food
router.get("/:id",protect, getFoodById);

export default router;
