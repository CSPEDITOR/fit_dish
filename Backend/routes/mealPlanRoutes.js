import express from "express";
import {
  generateMealPlan,
  getMealPlan,
  getDayMealPlan,
  deleteMealPlan,
  getAllMealPlans,
} from "../controllers/mealPlanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generate meal plan
router.post("/generate", protect, generateMealPlan);

// Get all meal plans for user
router.get("/all", protect, getAllMealPlans);

// Get meal plan for a week
router.get("/", protect, getMealPlan);

// Get meal plan for a specific day
router.get("/day", protect, getDayMealPlan);

// Delete meal plan
router.delete("/", protect, deleteMealPlan);

export default router;

