
import Disease from "../models/diseaseModel.js";


// export const getDiseases = async (req, res) => {
//   try {
//     const diseases = await Disease.find().sort({ name: 1 });
//     res.status(200).json(diseases);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getDiseases = async (req, res) =>{
    try {
        const diseases = await Disease.find().sort({name:1});
        res.status(200).json(diseases);
    } catch (err) {
        res.status(500).json({message: "Server error", error : err.message});
    }
}