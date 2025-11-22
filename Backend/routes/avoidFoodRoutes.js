// import express from "express";
// import { getAvoidFoods } from "../controllers/avoidFoodController.js";



// const router = express.Router();

// router.get("/", getAvoidFoods); // getinng
// //creteing 
// export default router;





import express from "express";
import { addAvoidFoods, getbyidUserAvoidFoods, getUserAvoidFoods } from "../controllers/avoidFoodController.js";

const router = express.Router();

// user adds avoid foods
router.post("/", addAvoidFoods);
router.get("/", getUserAvoidFoods);

// get avoid foods for user
router.get("/:userId", getbyidUserAvoidFoods);

export default router;
