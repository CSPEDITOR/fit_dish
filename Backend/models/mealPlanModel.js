import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planType: {
      type: String,
      enum: ["weight-loss", "weight-gain", "normal-diet", "custom"],
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    meals: {
      monday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      tuesday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      wednesday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      thursday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      friday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      saturday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
      sunday: {
        breakfast: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        lunch: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        snack: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
        dinner: [
          {
            foodId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Food",
            },
            quantity: { type: Number, default: 1 },
          },
        ],
      },
    },
    // Store only specific foods if user wants only those foods
    onlySpecificFoods: {
      type: Boolean,
      default: false,
    },
    specificFoodIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MealPlan", mealPlanSchema);

