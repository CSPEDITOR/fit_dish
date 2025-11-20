import Food from "../models/foodModel.js";
import Disease from "../models/diseaseModel.js";
import AvoidFood from "../models/avoidFoodModel.js";

// ➤ CREATE FOOD
export const createFood = async (req, res) => {
  
  try {
    const {
      name,
      type,
      category,
      price,
      description,
      nutrients,
      vitamins,
      minerals,
      best_time,
      diseases,
      location,
    } = req.body;

    const image = req.file ? req.file.path : null;


    const newFood = await Food.create({
      name,
      type,
      category,
      price,
      description,
      nutrients,
      vitamins,
      minerals,
      best_time,
      diseases,
      location,
      image,
    });

    res.status(201).json({ success: true, data: newFood });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ➤ GET ALL FOODS (with populated diseases + avoidFood + image access)
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("diseases", "name");

    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ➤ GET SINGLE FOOD
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate("diseases", "name");

    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
