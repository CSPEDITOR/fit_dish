import Food from "../models/foodModel.js";
import Disease from "../models/diseaseModel.js";
import AvoidFood from "../models/avoidFoodModel.js";

// ➤ CREATE FOOD
// import Food from "../models/foodModel.js";

export const createFood = async (req, res) => {
  try {
    // Extract raw values from form-data body
    const {
      name,
      type,
      category,
      price,
      description,
      nutrients: rawNutrients,
      vitamins: rawVitamins,
      minerals: rawMinerals,
      best_time: rawBestTime,
      // diseases may come as req.body.diseases (array) or req.body['diseases[]'] depending on client
      location,
    } = req.body;

    // file (image) if uploaded via multer
    const image = req.file ? req.file.path : null;

    // --- PARSE nutrients (we appended JSON.stringify(nutrients) in frontend)
    let nutrients = {};
    if (rawNutrients) {
      try {
        nutrients = typeof rawNutrients === "string" ? JSON.parse(rawNutrients) : rawNutrients;
      } catch (err) {
        return res.status(400).json({ success: false, msg: "Invalid nutrients format" });
      }
    }

    // --- PARSE vitamins/minerals (we expect JSON string -> array of objects)
    let vitamins = [];
    let minerals = [];
    if (rawVitamins) {
      try {
        vitamins = typeof rawVitamins === "string" ? JSON.parse(rawVitamins) : rawVitamins;
      } catch (err) {
        return res.status(400).json({ success: false, msg: "Invalid vitamins format" });
      }
    }

    if (rawMinerals) {
      try {
        minerals = typeof rawMinerals === "string" ? JSON.parse(rawMinerals) : rawMinerals;
      } catch (err) {
        return res.status(400).json({ success: false, msg: "Invalid minerals format" });
      }
    }

    // --- PARSE best_time (frontend sends JSON.stringify(array) already)
    let best_time = [];
    if (rawBestTime) {
      try {
        best_time = typeof rawBestTime === "string" ? JSON.parse(rawBestTime) : rawBestTime;
      } catch (err) {
        return res.status(400).json({ success: false, msg: "Invalid best_time format" });
      }
    }

    // --- PARSE diseases
    // If frontend appended selectedDiseases.forEach(id => fd.append("diseases[]", id))
    // express/multer often makes req.body.diseases an array OR sometimes req.body['diseases[]'].
    let diseases = [];
    if (req.body.diseases) {
      diseases = Array.isArray(req.body.diseases) ? req.body.diseases : [req.body.diseases];
    } else if (req.body["diseases[]"]) {
      diseases = Array.isArray(req.body["diseases[]"]) ? req.body["diseases[]"] : [req.body["diseases[]"]];
    }

    // --- Create the food document
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

    return res.status(201).json({ success: true, data: newFood });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};



// export const createFood = async (req, res) => {
  
//   try {
//     const {
//       name,
//       type,
//       category,
//       price,
//       description,
//       nutrients,
//       vitamins,
//       minerals,
//       best_time,
//       diseases,
//       location,
//     } = req.body;

//     const image = req.file ? req.file.path : null;


//     const newFood = await Food.create({
//       name,
//       type,
//       category,
//       price,
//       description,
//       nutrients,
//       vitamins,
//       minerals,
//       best_time,
//       diseases,
//       location,
//       image,
//     });

//     res.status(201).json({ success: true, data: newFood });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

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
