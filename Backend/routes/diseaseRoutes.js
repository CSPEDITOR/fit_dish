import express from "express";
import { getDiseases } from "../controllers/diseaseController.js";
import { createDisease } from "../controllers/diseaseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.get("/", getDiseases);
router.post("/",protect,adminOnly,createDisease); 
export default router;
