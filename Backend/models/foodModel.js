import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },

    image: { type: String}, // image path

    nutrients: {
      calories: Number,
      protein: Number,
      carbohydrates: Number,
      fats: Number,
      fiber: Number,
      sugar: Number,
      vitamins_total: Number,
      minerals_total: Number,
    },

    vitamins: [
      {
        name: String,
        value: Number,
        unit: String,
      },
    ],

    minerals: [
      {
        name: String,
        value: Number,
        unit: String,
      },
    ],

    best_time: [String],

    // ⭐ References to other collections
    diseases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disease",
      },
    ],
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
