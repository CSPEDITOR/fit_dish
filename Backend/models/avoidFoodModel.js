import mongoose from "mongoose";
const avoidFoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AvoidFood", avoidFoodSchema)
