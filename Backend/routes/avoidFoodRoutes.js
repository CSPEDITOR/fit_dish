import express from "express";
import { getAvoidFoods } from "../controllers/avoidFoodController.js";



const router = express.Router();

router.get("/", getAvoidFoods); // getinng
//creteing 
export default router;
