import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import avoidFoodRoutes from "./routes/avoidFoodRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running Backend");
});

app.use("/api/users", userRoutes);
app.use("/api/avoid-food", avoidFoodRoutes);
app.use("/api/diseases", diseaseRoutes);

app.listen(port, () => console.log(`App running on port ${port}`));
