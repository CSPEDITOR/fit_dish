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
dotenv.config();
connectDB();

const app = express();

// CORS should be first
app.use(cors({
  origin: "*",
  credentials: true,
}));


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



app.listen(port, () => console.log(`App running on port ${port}`));