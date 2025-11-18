import AvoidFood from "../models/avoidFoodModel.js";

// export const getAvoidFoods = async (req, res) => {
//   try {
//     const foods = await AvoidFood.find().sort({ name: 1 });
//     res.status(200).json(foods);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getAvoidFoods = async(req,res) =>{
    try{
        const foods = await AvoidFood.find().sort({name:1});
        res.status(200).json(foods);
    } catch(err){
        res.status(500).json({message: "server error",error: err.message });
    }
}