// import mongoose from "mongoose";
// const avoidFoodSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       require: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("AvoidFood", avoidFoodSchema)


import mongoose from "mongoose";

const avoidFoodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food", // your food model name
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("AvoidFood", avoidFoodSchema);
