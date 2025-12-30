import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import avoidFoodRoutes from "./routes/avoidFoodRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import path from "path";
import foodRoutes from "./routes/foodRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";
import intakeRoutes from "./routes/intakeRoutes.js";
import fetch from "node-fetch";
dotenv.config();
connectDB();

const app = express();

// CORS should be first
// Configure CORS properly - cannot use origin: "*" with credentials: true
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or curl requests)
      if (!origin) return callback(null, true);
      
      // In development, allow all origins
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      
      // In production, check against allowed origins
      if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running Backend");
});

app.use("/api/users", userRoutes);
app.use("/api/avoid-food", avoidFoodRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/meal-plans", mealPlanRoutes);
app.use("/api/intake", intakeRoutes);



app.listen(port, () => console.log(`App running on port ${port}`));



const KEEP_ALIVE_URL = process.env.BACKEND_URL; // your render backend URL


  setInterval(async () => {
    try {
      await fetch(KEEP_ALIVE_URL);
      console.log("🔄 Keep-alive ping sent");
    } catch (error) {
      console.error("❌ Keep-alive failed", error.message);
    }
  }, 1 * 60 * 1000); // every 14 minutes
