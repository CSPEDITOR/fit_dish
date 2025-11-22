// import express from "express";
// import { getAvoidFoods } from "../controllers/avoidFoodController.js";



// const router = express.Router();

// router.get("/", getAvoidFoods); // getinng
// //creteing 
// export default router;





import express from "express";
import { addAvoidFoods, getUserAvoidFoods } from "../controllers/avoidFoodController.js";

const router = express.Router();

// user adds avoid foods
router.post("/", addAvoidFoods);

// get avoid foods for user
router.get("/:userId", getUserAvoidFoods);

export default router;
