import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { deleteUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.delete("/delete/:id",protect, adminOnly, deleteUser);

export default router;
