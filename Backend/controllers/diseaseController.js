
import Disease from "../models/diseaseModel.js";


//get the diseases

export const getDiseases = async (req, res) =>{
    try {
        const diseases = await Disease.find().sort({name:1});
        res.status(200).json(diseases);
    } catch (err) {
        res.status(500).json({message: "Server error", error : err.message});
    }
}


//create the desease

export const createDisease = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Disease name is required" });
    }

    // Prevent duplicate
    const exists = await Disease.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Disease already exists" });
    }

    const disease = await Disease.create({ name });

    res.status(201).json({
      message: "Disease created successfully",
      data: disease,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// export const createDisease = async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Disease name is required" });
//     }

//     // Check duplicate
//     const exists = await Disease.findOne({ name });
//     if (exists) {
//       return res.status(400).json({ message: "Disease already exists" });
//     }

//     const disease = await Disease.create({ name });

//     res.status(201).json({
//       message: "Disease created successfully",
//       data: disease,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
