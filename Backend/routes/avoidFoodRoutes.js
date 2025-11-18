import express from "express";
import { getAvoidFoods } from "../controllers/avoidFoodController.js";

const router = express.Router();

router.get("/", getAvoidFoods);

export default router;
