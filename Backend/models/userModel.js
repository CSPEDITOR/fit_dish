// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     resetToken: { type: String },
//     resetTokenExpire: { type: Date },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile fields
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    foodType: { type: String, enum: ["veg", "non-veg", "eggetarian"] },

    avoidFood: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AvoidFood" }
    ],

    disease: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Disease" }
    ],

    resetToken: { type: String },
    resetTokenExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
