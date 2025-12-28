import DailyIntake from "../models/dailyIntakeModel.js";
import Food from "../models/foodModel.js";
import MealPlan from "../models/mealPlanModel.js";
import { calculateDailyRequirements } from "./mealPlanController.js";
import User from "../models/userModel.js";

// Record or update daily intake
export const recordIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, mealType, foodId, quantity, consumed } = req.body;

    // Get or create daily intake record
    const intakeDate = date ? new Date(date) : new Date();
    intakeDate.setHours(0, 0, 0, 0);

    let dailyIntake = await DailyIntake.findOne({
      userId,
      date: intakeDate,
    });

    if (!dailyIntake) {
      // Get user's current meal plan to set targets
      const user = await User.findById(userId);
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
      weekStart.setHours(0, 0, 0, 0);

      // Try to find active meal plan
      let planType = "normal-diet";
      const mealPlan = await MealPlan.findOne({
        userId,
        weekStartDate: { $lte: weekStart },
      }).sort({ weekStartDate: -1 });

      if (mealPlan) {
        planType = mealPlan.planType;
      }

      const targets = calculateDailyRequirements(user, planType);

      dailyIntake = await DailyIntake.create({
        userId,
        date: intakeDate,
        targets: {
          calories: targets.calories,
          protein: targets.protein,
          carbohydrates: targets.carbs,
          fats: targets.fats,
        },
        planType,
      });
    }

    // Update meal
    if (mealType && foodId) {
      const mealArray = dailyIntake.meals[mealType];
      const existingIndex = mealArray.findIndex(
        (item) => item.foodId.toString() === foodId
      );

      if (existingIndex >= 0) {
        // Update existing
        mealArray[existingIndex].quantity = quantity || mealArray[existingIndex].quantity;
        mealArray[existingIndex].consumed = consumed !== undefined ? consumed : mealArray[existingIndex].consumed;
      } else {
        // Add new
        mealArray.push({
          foodId,
          quantity: quantity || 1,
          consumed: consumed !== undefined ? consumed : true,
        });
      }
    }

    // Recalculate totals
    await calculateDailyTotals(dailyIntake);

    await dailyIntake.save();

    // Populate food details
    const populated = await DailyIntake.findById(dailyIntake._id)
      .populate({
        path: "meals.breakfast.foodId meals.lunch.foodId meals.snack.foodId meals.dinner.foodId",
        model: "Food",
        populate: {
          path: "diseases",
          select: "name",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    console.error("Error recording intake:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get daily intake
export const getDailyIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    const intakeDate = date ? new Date(date) : new Date();
    intakeDate.setHours(0, 0, 0, 0);

    let dailyIntake = await DailyIntake.findOne({
      userId,
      date: intakeDate,
    })
      .populate({
        path: "meals.breakfast.foodId meals.lunch.foodId meals.snack.foodId meals.dinner.foodId",
        model: "Food",
        populate: {
          path: "diseases",
          select: "name",
        },
      });

    if (!dailyIntake) {
      // Create empty record with targets
      const user = await User.findById(userId);
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
      weekStart.setHours(0, 0, 0, 0);

      let planType = "normal-diet";
      const mealPlan = await MealPlan.findOne({
        userId,
        weekStartDate: { $lte: weekStart },
      }).sort({ weekStartDate: -1 });

      if (mealPlan) {
        planType = mealPlan.planType;
      }

      const targets = calculateDailyRequirements(user, planType);

      dailyIntake = await DailyIntake.create({
        userId,
        date: intakeDate,
        targets: {
          calories: targets.calories,
          protein: targets.protein,
          carbohydrates: targets.carbs,
          fats: targets.fats,
        },
        planType,
      });
    }

    res.status(200).json({
      success: true,
      data: dailyIntake,
    });
  } catch (error) {
    console.error("Error getting daily intake:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get weekly intake summary
export const getWeeklyIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { weekStartDate } = req.query;

    const startDate = weekStartDate
      ? new Date(weekStartDate)
      : new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Monday
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Sunday
    endDate.setHours(23, 59, 59, 999);

    const weeklyIntake = await DailyIntake.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    // Calculate weekly totals
    const weeklyTotals = weeklyIntake.reduce(
      (acc, day) => {
        acc.calories += day.totals.calories || 0;
        acc.protein += day.totals.protein || 0;
        acc.carbohydrates += day.totals.carbohydrates || 0;
        acc.fats += day.totals.fats || 0;
        acc.fiber += day.totals.fiber || 0;
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
        fiber: 0,
      }
    );

    // Calculate weekly averages
    const daysCount = weeklyIntake.length || 1;
    const weeklyAverages = {
      calories: Math.round(weeklyTotals.calories / daysCount),
      protein: Math.round(weeklyTotals.protein / daysCount),
      carbohydrates: Math.round(weeklyTotals.carbohydrates / daysCount),
      fats: Math.round(weeklyTotals.fats / daysCount),
      fiber: Math.round(weeklyTotals.fiber / daysCount),
    };

    res.status(200).json({
      success: true,
      data: {
        weeklyIntake,
        weeklyTotals,
        weeklyAverages,
        startDate,
        endDate,
      },
    });
  } catch (error) {
    console.error("Error getting weekly intake:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get dashboard stats (last 30 days)
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Get last 30 days of intake
    const recentIntake = await DailyIntake.find({
      userId,
      date: { $gte: thirtyDaysAgo },
    })
      .sort({ date: 1 })
      .populate({
        path: "meals.breakfast.foodId meals.lunch.foodId meals.snack.foodId meals.dinner.foodId",
        model: "Food",
      });

    // Calculate statistics
    const stats = {
      totalDays: recentIntake.length,
      averageDailyCalories: 0,
      averageDailyProtein: 0,
      averageDailyCarbs: 0,
      averageDailyFats: 0,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      dailyProgress: [],
      weeklyProgress: [],
    };

    if (recentIntake.length > 0) {
      recentIntake.forEach((day) => {
        stats.totalCalories += day.totals.calories || 0;
        stats.totalProtein += day.totals.protein || 0;
        stats.totalCarbs += day.totals.carbohydrates || 0;
        stats.totalFats += day.totals.fats || 0;

        // Daily progress
        const target = day.targets || {};
        stats.dailyProgress.push({
          date: day.date,
          calories: {
            consumed: day.totals.calories || 0,
            target: target.calories || 0,
            percentage: target.calories
              ? Math.round(((day.totals.calories || 0) / target.calories) * 100)
              : 0,
          },
          protein: {
            consumed: day.totals.protein || 0,
            target: target.protein || 0,
            percentage: target.protein
              ? Math.round(((day.totals.protein || 0) / target.protein) * 100)
              : 0,
          },
        });
      });

      stats.averageDailyCalories = Math.round(stats.totalCalories / recentIntake.length);
      stats.averageDailyProtein = Math.round(stats.totalProtein / recentIntake.length);
      stats.averageDailyCarbs = Math.round(stats.totalCarbs / recentIntake.length);
      stats.averageDailyFats = Math.round(stats.totalFats / recentIntake.length);

      // Weekly progress (last 4 weeks)
      const weeks = [];
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay() + 1);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const weekData = recentIntake.filter(
          (day) => day.date >= weekStart && day.date <= weekEnd
        );

        const weekTotal = weekData.reduce(
          (acc, day) => {
            acc.calories += day.totals.calories || 0;
            acc.protein += day.totals.protein || 0;
            return acc;
          },
          { calories: 0, protein: 0 }
        );

        weeks.push({
          weekStart,
          weekEnd,
          days: weekData.length,
          totalCalories: weekTotal.calories,
          totalProtein: weekTotal.protein,
          averageCalories: weekData.length > 0 ? Math.round(weekTotal.calories / weekData.length) : 0,
          averageProtein: weekData.length > 0 ? Math.round(weekTotal.protein / weekData.length) : 0,
        });
      }

      stats.weeklyProgress = weeks;
    }

    // Get current day's intake
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIntake = await DailyIntake.findOne({
      userId,
      date: today,
    })
      .populate({
        path: "meals.breakfast.foodId meals.lunch.foodId meals.snack.foodId meals.dinner.foodId",
        model: "Food",
      });

    res.status(200).json({
      success: true,
      data: {
        stats,
        todayIntake: todayIntake || null,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Helper function to calculate daily totals
const calculateDailyTotals = async (dailyIntake) => {
  const totals = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    fiber: 0,
  };

  const mealTypes = ["breakfast", "lunch", "snack", "dinner"];

  for (const mealType of mealTypes) {
    const meals = dailyIntake.meals[mealType] || [];
    for (const meal of meals) {
      if (meal.consumed && meal.foodId) {
        let food;
        // Check if foodId is already populated or needs to be fetched
        if (meal.foodId._id || meal.foodId.nutrients) {
          food = meal.foodId;
        } else {
          food = await Food.findById(meal.foodId);
        }
        
        if (food && food.nutrients) {
          const quantity = meal.quantity || 1;
          totals.calories += (food.nutrients.calories || 0) * quantity;
          totals.protein += (food.nutrients.protein || 0) * quantity;
          totals.carbohydrates += (food.nutrients.carbohydrates || 0) * quantity;
          totals.fats += (food.nutrients.fats || 0) * quantity;
          totals.fiber += (food.nutrients.fiber || 0) * quantity;
        }
      }
    }
  }

  dailyIntake.totals = {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein * 10) / 10,
    carbohydrates: Math.round(totals.carbohydrates * 10) / 10,
    fats: Math.round(totals.fats * 10) / 10,
    fiber: Math.round(totals.fiber * 10) / 10,
  };
};


