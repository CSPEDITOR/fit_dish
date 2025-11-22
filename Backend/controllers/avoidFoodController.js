import AvoidFood from "../models/avoidFoodModel.js";
//add avoid foods

export const addAvoidFoods = async (req, res) => {
  try {
    const { userId, foodIds } = req.body; 
    // foodIds = array of multiple food ids

    let avoidDoc = await AvoidFood.findOne({ userId });

    if (!avoidDoc) {
      avoidDoc = new AvoidFood({ userId, foods: foodIds });
    } else {
      // push unique food ids
      avoidDoc.foods = [...new Set([...avoidDoc.foods, ...foodIds])];
    }

    await avoidDoc.save();

    res.status(200).json({
      message: "Avoid foods updated",
      avoid: avoidDoc
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// GET AVOIDED FOOD FOR A SPECIFIC USER

export const getbyidUserAvoidFoods = async (req, res) => {
  try {
    const { userId } = req.params;

    const avoidDoc = await AvoidFood.findOne({ userId }).populate("foods");

    if (!avoidDoc) {
      return res.json([]);
    }

    res.status(200).json(avoidDoc.foods);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getUserAvoidFoods = async(req,res) =>{
    try{
        const foods = await AvoidFood.find().sort({name:1});
        res.status(200).json(foods);
    } catch(err){
        res.status(500).json({message: "server error",error: err.message });
    }
}