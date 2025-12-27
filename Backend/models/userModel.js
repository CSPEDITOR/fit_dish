import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile fields
    profileImage: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    foodType: { type: String, enum: ["veg", "non-veg", "eggetarian"] },
    avoidFood: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    disease: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disease" }],
    dailyBudget: { type: Number }, // Budget per day for 4 meals
    profileSetupComplete: { type: Boolean, default: false },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
