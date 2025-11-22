import express from "express";
import { addAvoidFoods, getbyidUserAvoidFoods, getUserAvoidFoods } from "../controllers/avoidFoodController.js";

const router = express.Router();

// user adds avoid foods
router.post("/", addAvoidFoods);

//get all avoid food
router.get("/", getUserAvoidFoods);

// get avoid foods for user
router.get("/:userId", getbyidUserAvoidFoods);

export default router;
