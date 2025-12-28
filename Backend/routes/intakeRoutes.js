import express from "express";
import {
  recordIntake,
  getDailyIntake,
  getWeeklyIntake,
  getDashboardStats,
} from "../controllers/intakeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Record daily intake
router.post("/record", protect, recordIntake);

// Get daily intake
router.get("/daily", protect, getDailyIntake);

// Get weekly intake
router.get("/weekly", protect, getWeeklyIntake);

// Get dashboard stats
router.get("/dashboard", protect, getDashboardStats);

export default router;

