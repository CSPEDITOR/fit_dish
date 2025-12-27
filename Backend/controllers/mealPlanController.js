import MealPlan from "../models/mealPlanModel.js";
import Food from "../models/foodModel.js";
import User from "../models/userModel.js";
import AvoidFood from "../models/avoidFoodModel.js";

// Helper function to calculate daily nutritional requirements
export const calculateDailyRequirements = (user, planType) => {
  // Use fixed ranges based on plan type
  let targetCalories, targetProtein, targetCarbs, targetFats;
  const userWeight = user.weight || 70; // Default weight if not provided

  if (planType === "weight-loss") {
    // Weight Loss: 1,600 – 1,900 kcal
    // Use average of range: 1,750 kcal
    targetCalories = 1750;
    
    // Protein: 1.6 – 2.2 g / kg body weight (use average: 1.9 g/kg)
    targetProtein = Math.round(1.9 * userWeight);
    
    // Carbs: 40 – 45% (use average: 42.5%)
    targetCarbs = Math.round((targetCalories * 0.425) / 4);
    
    // Fats: 20 – 25% (use average: 22.5%)
    targetFats = Math.round((targetCalories * 0.225) / 9);
    
  } else if (planType === "weight-gain") {
    // Weight Gain: 2,600 – 3,000+ kcal
    // Use average of range: 2,800 kcal
    targetCalories = 2800;
    
    // Protein: 1.8 – 2.5 g / kg (use average: 2.15 g/kg)
    targetProtein = Math.round(2.15 * userWeight);
    
    // Carbs: 50 – 60% (use average: 55%)
    targetCarbs = Math.round((targetCalories * 0.55) / 4);
    
    // Fats: 25 – 30% (use average: 27.5%)
    targetFats = Math.round((targetCalories * 0.275) / 9);
    
  } else {
    // Normal / Maintenance Diet: 2,100 – 2,400 kcal
    // Use average of range: 2,250 kcal
    targetCalories = 2250;
    
    // Protein: 1.2 – 1.6 g / kg (use average: 1.4 g/kg)
    targetProtein = Math.round(1.4 * userWeight);
    
    // Carbs: 45 – 55% (use average: 50%)
    targetCarbs = Math.round((targetCalories * 0.50) / 4);
    
    // Fats: 25 – 30% (use average: 27.5%)
    targetFats = Math.round((targetCalories * 0.275) / 9);
  }

  return {
    calories: Math.round(targetCalories),
    protein: Math.round(targetProtein),
    carbs: Math.round(targetCarbs),
    fats: Math.round(targetFats),
  };
};

// Helper function to populate meals with food details
const populateMeals = async (meals) => {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const populatedMeals = {};

  for (const day of daysOfWeek) {
    if (!meals[day]) continue;

    const dayMeals = { ...meals[day] };
    const mealTypes = ["breakfast", "lunch", "snack", "dinner"];

    for (const mealType of mealTypes) {
      if (dayMeals[mealType] && Array.isArray(dayMeals[mealType])) {
        dayMeals[mealType] = await Promise.all(
          dayMeals[mealType].map(async (item) => {
            if (item.foodId) {
              const food = await Food.findById(item.foodId).populate(
                "diseases",
                "name"
              );
              return {
                ...item,
                foodId: food,
              };
            }
            return item;
          })
        );
      }
    }

    populatedMeals[day] = dayMeals;
  }

  return populatedMeals;
};

// Helper function to filter foods based on user constraints
const filterFoodsForUser = async (foods, user, avoidFoodIds, diseaseIds) => {
  return foods.filter((food) => {
    // Check food type preference
    if (user.foodType === "veg" && food.type !== "veg") {
      return false;
    }
    if (user.foodType === "eggetarian" && food.type === "non-veg") {
      return false;
    }

    // Check if food is in avoid list
    if (avoidFoodIds.includes(food._id.toString())) {
      return false;
    }

    // NOTE: Disease filtering is commented out because:
    // - Foods with diseases might be foods that help with those diseases (not foods to avoid)
    // - The relationship between foods and diseases needs clarification
    // - This was causing all foods to be filtered out
    // If you want to filter by diseases, uncomment below and adjust logic:
    /*
    const foodDiseaseIds = food.diseases?.map((d) => {
      // Handle both populated and non-populated disease objects
      return d._id ? d._id.toString() : d.toString();
    }) || [];
    const hasConflictingDisease = diseaseIds.some((diseaseId) =>
      foodDiseaseIds.includes(diseaseId.toString())
    );
    if (hasConflictingDisease) {
      return false;
    }
    */

    return true;
  });
};

// Helper function to select foods for a meal based on nutritional goals
const selectFoodsForMeal = (
  availableFoods,
  mealType,
  remainingCalories,
  remainingProtein,
  remainingCarbs,
  remainingFats,
  planType
) => {
  const selectedFoods = [];
  let currentCalories = 0;
  let currentProtein = 0;
  let currentCarbs = 0;
  let currentFats = 0;

  // Filter foods by best_time
  const mealTimeMap = {
    breakfast: ["breakfast", "morning"],
    lunch: ["lunch", "afternoon"],
    snack: ["snack", "evening"],
    dinner: ["dinner", "night"],
  };

  const timeKeywords = mealTimeMap[mealType] || [];
  let mealFoods = availableFoods.filter((food) => {
    if (!food.best_time || food.best_time.length === 0) return true;
    return food.best_time.some((time) =>
      timeKeywords.some((keyword) =>
        time.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  });

  // If no foods match the time, use all available foods
  if (mealFoods.length === 0) {
    mealFoods = availableFoods;
  }

  // Shuffle for variety
  mealFoods = mealFoods.sort(() => Math.random() - 0.5);

  // Calculate target for this meal (distribute daily requirements across 4 meals)
  let mealCalorieTarget, mealProteinTarget, mealCarbTarget, mealFatTarget;

  // Adjust for meal type
  if (mealType === "breakfast") {
    // Breakfast: higher carbs, moderate protein
    mealCalorieTarget = remainingCalories * 0.25;
    mealProteinTarget = remainingProtein * 0.2;
    mealCarbTarget = remainingCarbs * 0.3;
    mealFatTarget = remainingFats * 0.2;
  } else if (mealType === "lunch") {
    // Lunch: balanced
    mealCalorieTarget = remainingCalories * 0.35;
    mealProteinTarget = remainingProtein * 0.35;
    mealCarbTarget = remainingCarbs * 0.35;
    mealFatTarget = remainingFats * 0.35;
  } else if (mealType === "snack") {
    // Snack: lighter
    mealCalorieTarget = remainingCalories * 0.15;
    mealProteinTarget = remainingProtein * 0.15;
    mealCarbTarget = remainingCarbs * 0.15;
    mealFatTarget = remainingFats * 0.15;
  } else if (mealType === "dinner") {
    // Dinner: higher protein, lower carbs
    mealCalorieTarget = remainingCalories * 0.25;
    mealProteinTarget = remainingProtein * 0.3;
    mealCarbTarget = remainingCarbs * 0.2;
    mealFatTarget = remainingFats * 0.3;
  } else {
    // Default: equal distribution
    mealCalorieTarget = remainingCalories * 0.25;
    mealProteinTarget = remainingProtein * 0.25;
    mealCarbTarget = remainingCarbs * 0.25;
    mealFatTarget = remainingFats * 0.25;
  }

  // Select foods
  for (const food of mealFoods) {
    if (selectedFoods.length >= 3) break; // Max 3 foods per meal

    const foodCalories = food.nutrients?.calories || 0;
    const foodProtein = food.nutrients?.protein || 0;
    const foodCarbs = food.nutrients?.carbohydrates || 0;
    const foodFats = food.nutrients?.fats || 0;

    // Check if adding this food would exceed targets
    if (
      currentCalories + foodCalories <= mealCalorieTarget * 1.2 &&
      currentProtein + foodProtein <= mealProteinTarget * 1.3
    ) {
      selectedFoods.push({
        foodId: food._id,
        quantity: 1,
      });
      currentCalories += foodCalories;
      currentProtein += foodProtein;
      currentCarbs += foodCarbs;
      currentFats += foodFats;
    }
  }

  // If no foods selected, add at least one food to ensure meal is not empty
  if (selectedFoods.length === 0 && mealFoods.length > 0) {
    selectedFoods.push({
      foodId: mealFoods[0]._id,
      quantity: 1,
    });
  }

  return selectedFoods;
};

// Generate meal plan for a week
export const generateMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType, weekStartDate, onlySpecificFoods, specificFoodIds } =
      req.body;

    // Validate plan type
    if (
      !["weight-loss", "weight-gain", "normal-diet"].includes(planType)
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid plan type" });
    }

    // Get user with populated data
    const user = await User.findById(userId)
      .populate("avoidFood", "_id")
      .populate("disease", "_id");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Get user's avoid foods
    const avoidFoodDoc = await AvoidFood.findOne({ userId }).populate(
      "foods",
      "_id"
    );
    const avoidFoodIds =
      avoidFoodDoc?.foods?.map((f) => f._id.toString()) ||
      user.avoidFood?.map((f) => f._id.toString()) ||
      [];
    const diseaseIds = user.disease?.map((d) => d._id.toString()) || [];

    // Calculate daily nutritional requirements
    const dailyRequirements = calculateDailyRequirements(user, planType);

    // Get all foods
    const totalFoodsCount = await Food.countDocuments();
    let allFoods = await Food.find().populate("diseases", "_id name");

    console.log(`Total foods in database: ${totalFoodsCount}`);
    console.log(`User foodType: ${user.foodType || "not set"}`);
    console.log(`Avoid foods count: ${avoidFoodIds.length}`);
    console.log(`Diseases count: ${diseaseIds.length}`);

    // Filter foods based on user constraints
    allFoods = await filterFoodsForUser(
      allFoods,
      user,
      avoidFoodIds,
      diseaseIds
    );

    console.log(`Foods after initial filtering: ${allFoods.length}`);

    // If user wants only specific foods, filter to those
    if (onlySpecificFoods && specificFoodIds && specificFoodIds.length > 0) {
      allFoods = allFoods.filter((food) =>
        specificFoodIds.includes(food._id.toString())
      );
      console.log(`Foods after specific foods filter: ${allFoods.length}`);
    }

    // If no foods after filtering, try with less strict filters
    if (allFoods.length === 0) {
      console.log("No foods found with strict filtering, trying relaxed approach...");
      
      // Try again without disease filtering (diseases might be informational, not restrictions)
      let relaxedFoods = await Food.find().populate("diseases", "_id name");
      const beforeRelaxed = relaxedFoods.length;
      
      relaxedFoods = relaxedFoods.filter((food) => {
        // Only check food type and avoid foods
        if (user.foodType === "veg" && food.type !== "veg") {
          return false;
        }
        if (user.foodType === "eggetarian" && food.type === "non-veg") {
          return false;
        }
        if (avoidFoodIds.includes(food._id.toString())) {
          return false;
        }
        return true;
      });

      console.log(`Foods after relaxed filtering (no disease check): ${relaxedFoods.length} out of ${beforeRelaxed}`);

      if (relaxedFoods.length === 0 && user.foodType) {
        // Last resort: ignore food type, only check avoid foods
        console.log("Trying with food type restriction removed...");
        relaxedFoods = await Food.find().populate("diseases", "_id name");
        relaxedFoods = relaxedFoods.filter((food) => {
          return !avoidFoodIds.includes(food._id.toString());
        });
        console.log(`Foods after removing food type restriction: ${relaxedFoods.length}`);
      }

      if (relaxedFoods.length === 0) {
        return res.status(400).json({
          success: false,
          msg: "No foods available. Please reduce your avoid foods list or update your food preferences in your profile.",
          details: {
            totalFoods: totalFoodsCount,
            avoidFoodCount: avoidFoodIds.length,
            diseaseCount: diseaseIds.length,
            foodType: user.foodType || "not set",
            suggestion: avoidFoodIds.length > 0 
              ? "Try removing some foods from your avoid list" 
              : "Make sure you have foods in the database",
          },
        });
      }

      // Use relaxed foods
      allFoods = relaxedFoods;
      console.log(`Using relaxed filtering: ${allFoods.length} foods available`);
    }

    // Calculate week start date
    const startDate = weekStartDate
      ? new Date(weekStartDate)
      : new Date();
    startDate.setHours(0, 0, 0, 0);

    // Generate meals for 7 days
    const meals = {};
    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    for (let i = 0; i < 7; i++) {
      const dayName = daysOfWeek[i];
      const dayMeals = {
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: [],
      };

      // Shuffle foods for variety each day
      const shuffledFoods = [...allFoods].sort(() => Math.random() - 0.5);

      // Generate each meal
      dayMeals.breakfast = selectFoodsForMeal(
        shuffledFoods,
        "breakfast",
        dailyRequirements.calories,
        dailyRequirements.protein,
        dailyRequirements.carbs,
        dailyRequirements.fats,
        planType
      );

      dayMeals.lunch = selectFoodsForMeal(
        shuffledFoods,
        "lunch",
        dailyRequirements.calories,
        dailyRequirements.protein,
        dailyRequirements.carbs,
        dailyRequirements.fats,
        planType
      );

      dayMeals.snack = selectFoodsForMeal(
        shuffledFoods,
        "snack",
        dailyRequirements.calories,
        dailyRequirements.protein,
        dailyRequirements.carbs,
        dailyRequirements.fats,
        planType
      );

      dayMeals.dinner = selectFoodsForMeal(
        shuffledFoods,
        "dinner",
        dailyRequirements.calories,
        dailyRequirements.protein,
        dailyRequirements.carbs,
        dailyRequirements.fats,
        planType
      );

      meals[dayName] = dayMeals;
    }

    // Check if meal plan already exists for this week
    const existingPlan = await MealPlan.findOne({
      userId,
      planType,
      weekStartDate: startDate,
    });

    let mealPlan;
    if (existingPlan) {
      // Update existing plan
      existingPlan.meals = meals;
      existingPlan.onlySpecificFoods = onlySpecificFoods || false;
      existingPlan.specificFoodIds = specificFoodIds || [];
      mealPlan = await existingPlan.save();
    } else {
      // Create new plan
      mealPlan = await MealPlan.create({
        userId,
        planType,
        weekStartDate: startDate,
        meals,
        onlySpecificFoods: onlySpecificFoods || false,
        specificFoodIds: specificFoodIds || [],
      });
    }

    // Populate food details manually
    const populatedMeals = await populateMeals(mealPlan.meals);
    mealPlan.meals = populatedMeals;

    // Populate specificFoodIds if they exist
    if (mealPlan.specificFoodIds && mealPlan.specificFoodIds.length > 0) {
      mealPlan.specificFoodIds = await Food.find({
        _id: { $in: mealPlan.specificFoodIds },
      }).select("name image nutrients");
    }

    res.status(200).json({
      success: true,
      data: mealPlan,
      dailyRequirements,
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get all meal plans for a user
export const getAllMealPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    const mealPlans = await MealPlan.find({ userId })
      .sort({ weekStartDate: -1 })
      .select("planType weekStartDate createdAt");

    res.status(200).json({
      success: true,
      data: mealPlans,
    });
  } catch (error) {
    console.error("Error getting all meal plans:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get meal plan for a user
export const getMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType, weekStartDate } = req.query;

    const startDate = weekStartDate
      ? new Date(weekStartDate)
      : new Date();
    startDate.setHours(0, 0, 0, 0);

    const mealPlan = await MealPlan.findOne({
      userId,
      planType,
      weekStartDate: startDate,
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        msg: "Meal plan not found. Please generate one first.",
      });
    }

    // Populate food details manually
    const populatedMeals = await populateMeals(mealPlan.meals);
    mealPlan.meals = populatedMeals;

    // Populate specificFoodIds if they exist
    if (mealPlan.specificFoodIds && mealPlan.specificFoodIds.length > 0) {
      mealPlan.specificFoodIds = await Food.find({
        _id: { $in: mealPlan.specificFoodIds },
      }).select("name image nutrients");
    }

    res.status(200).json({ success: true, data: mealPlan });
  } catch (error) {
    console.error("Error getting meal plan:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete meal plan
export const deleteMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType, weekStartDate } = req.body;

    const startDate = weekStartDate
      ? new Date(weekStartDate)
      : new Date();
    startDate.setHours(0, 0, 0, 0);

    const mealPlan = await MealPlan.findOneAndDelete({
      userId,
      planType,
      weekStartDate: startDate,
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        msg: "Meal plan not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Meal plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get meal plan for a specific day
export const getDayMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType, day, weekStartDate } = req.query;

    const startDate = weekStartDate
      ? new Date(weekStartDate)
      : new Date();
    startDate.setHours(0, 0, 0, 0);

    const mealPlan = await MealPlan.findOne({
      userId,
      planType,
      weekStartDate: startDate,
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        msg: "Meal plan not found. Please generate one first.",
      });
    }

    const dayMeals = mealPlan.meals[day.toLowerCase()];
    if (!dayMeals) {
      return res.status(404).json({
        success: false,
        msg: "Day not found in meal plan",
      });
    }

    // Populate food details for this day
    const mealTypes = ["breakfast", "lunch", "snack", "dinner"];
    const populatedDayMeals = { ...dayMeals };

    for (const mealType of mealTypes) {
      if (populatedDayMeals[mealType] && Array.isArray(populatedDayMeals[mealType])) {
        populatedDayMeals[mealType] = await Promise.all(
          populatedDayMeals[mealType].map(async (item) => {
            if (item.foodId) {
              const food = await Food.findById(item.foodId).populate(
                "diseases",
                "name"
              );
              return {
                ...item,
                foodId: food,
              };
            }
            return item;
          })
        );
      }
    }

    res.status(200).json({ success: true, data: populatedDayMeals });
  } catch (error) {
    console.error("Error getting day meal plan:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

