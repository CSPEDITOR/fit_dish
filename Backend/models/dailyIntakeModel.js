import mongoose from "mongoose";

const dailyIntakeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // Meals consumed
    meals: {
      breakfast: [
        {
          foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: { type: Number, default: 1 },
          consumed: { type: Boolean, default: false },
        },
      ],
      lunch: [
        {
          foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: { type: Number, default: 1 },
          consumed: { type: Boolean, default: false },
        },
      ],
      snack: [
        {
          foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: { type: Number, default: 1 },
          consumed: { type: Boolean, default: false },
        },
      ],
      dinner: [
        {
          foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: { type: Number, default: 1 },
          consumed: { type: Boolean, default: false },
        },
      ],
    },
    // Calculated totals for the day
    totals: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
    },
    // Target values for comparison
    targets: {
      calories: { type: Number },
      protein: { type: Number },
      carbohydrates: { type: Number },
      fats: { type: Number },
    },
    planType: {
      type: String,
      enum: ["weight-loss", "weight-gain", "normal-diet"],
    },
  },
  { timestamps: true }
);

// Index for efficient queries
dailyIntakeSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyIntake", dailyIntakeSchema);

