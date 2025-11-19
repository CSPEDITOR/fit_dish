// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import avoidFoodRoutes from "./routes/avoidFoodRoutes.js";
// import diseaseRoutes from "./routes/diseaseRoutes.js";
// import path from "path";
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({
//   origin:"http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // then your routes (with multer middleware)

// // app.use(express.json());
// // app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Running Backend");
// });

// app.use("/api/users", userRoutes);
// app.use("/api/avoid-food", avoidFoodRoutes);
// app.use("/api/diseases", diseaseRoutes);

// app.listen(port, () => console.log(`App running on port ${port}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import avoidFoodRoutes from "./routes/avoidFoodRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

// CORS should be first
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// These middleware parse regular JSON/urlencoded data
// Multer will handle multipart/form-data on specific routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running Backend");
});

app.use("/api/users", userRoutes);
app.use("/api/avoid-food", avoidFoodRoutes);
app.use("/api/diseases", diseaseRoutes);

app.listen(port, () => console.log(`App running on port ${port}`));