import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sunrise,
  Sun,
  Moon,
  Coffee,
  UtensilsCrossed,
  Loader2,
  X,
} from "lucide-react";

const DayMealPlan = () => {
  const { planType, day } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dayMeals, setDayMeals] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_BASE_URL}/api/meal-plans`;
  
  // Get token from userInfo (same way as other components)
  const getToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        return JSON.parse(userInfo)?.token;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const mealTypes = [
    {
      key: "breakfast",
      label: "Breakfast",
      icon: <Sunrise className="w-6 h-6" />,
      color: "from-orange-400 to-amber-500",
      bgColor: "bg-orange-50",
      time: "8:00 AM",
    },
    {
      key: "lunch",
      label: "Lunch",
      icon: <Sun className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      time: "1:00 PM",
    },
    {
      key: "snack",
      label: "Snack",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50",
      time: "4:00 PM",
    },
    {
      key: "dinner",
      label: "Dinner",
      icon: <Moon className="w-6 h-6" />,
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-50",
      time: "7:00 PM",
    },
  ];

  useEffect(() => {
    if (location.state?.mealPlan) {
      // Use meal plan from navigation state
      const mealPlan = location.state.mealPlan;
      const meals = mealPlan.meals[day.toLowerCase()];
      if (meals) {
        setDayMeals(meals);
        setLoading(false);
      } else {
        fetchDayMealPlan();
      }
    } else {
      fetchDayMealPlan();
    }
  }, [day, planType]);

  const fetchDayMealPlan = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error("No token found. Please login again.");
        setLoading(false);
        return;
      }
      
      const weekStartDate = location.state?.weekStartDate || new Date().toISOString();
      const response = await axios.get(`${API_URL}/day`, {
        params: {
          planType,
          day: day.toLowerCase(),
          weekStartDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDayMeals(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching day meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = () => {
    const dayNames = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };
    return dayNames[day.toLowerCase()] || day;
  };

  const getPlanTitle = () => {
    switch (planType) {
      case "weight-loss":
        return "Weight Loss Plan";
      case "weight-gain":
        return "Weight Gain Plan";
      case "normal-diet":
        return "Normal Diet Plan";
      default:
        return "Meal Plan";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CB3432]" />
      </div>
    );
  }

  if (!dayMeals) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(`/plan/${planType}`)}
            className="mb-4 text-gray-600 hover:text-[#CB3432] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Calendar
          </button>
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Meals Found</h3>
            <p className="text-gray-600">
              No meal plan found for this day. Please generate a meal plan first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/plan/${planType}`)}
            className="mb-4 text-gray-600 hover:text-[#CB3432] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Calendar
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit? You'll return to plan selection.")) {
                navigate("/plans");
              }
            }}
            className="mb-4 ml-4 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Exit Plan
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {getDayName()} - {getPlanTitle()}
          </h1>
          <p className="text-gray-600">Your complete meal plan for the day</p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealTypes.map((mealType, index) => {
            const foods = dayMeals[mealType.key] || [];
            const totalCalories = foods.reduce((sum, item) => {
              return sum + (item.foodId?.nutrients?.calories || 0) * (item.quantity || 1);
            }, 0);
            const totalProtein = foods.reduce((sum, item) => {
              return sum + (item.foodId?.nutrients?.protein || 0) * (item.quantity || 1);
            }, 0);

            return (
              <motion.div
                key={mealType.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Meal Header */}
                <div
                  className={`bg-gradient-to-r ${mealType.color} p-6 text-white`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {mealType.icon}
                    <h2 className="text-2xl font-bold">{mealType.label}</h2>
                  </div>
                  <p className="text-white/90">{mealType.time}</p>
                </div>

                {/* Meal Content */}
                <div className="p-6">
                  {foods.length > 0 ? (
                    <div className="space-y-4">
                      {foods.map((item, idx) => {
                        const food = item.foodId;
                        if (!food) return null;

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {/* Food Image */}
                            <div className="flex-shrink-0">
                              {food.image ? (
                                <img
                                  src={food.image}
                                  alt={food.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <UtensilsCrossed className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Food Details */}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {food.name}
                              </h3>
                              {food.description && (
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {food.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-3 text-xs">
                                {food.nutrients?.calories && (
                                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                    {food.nutrients.calories * (item.quantity || 1)} cal
                                  </span>
                                )}
                                {food.nutrients?.protein && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {food.nutrients.protein * (item.quantity || 1)}g protein
                                  </span>
                                )}
                                {food.nutrients?.carbohydrates && (
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                    {food.nutrients.carbohydrates * (item.quantity || 1)}g carbs
                                  </span>
                                )}
                              </div>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Quantity: {item.quantity}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Meal Summary */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">
                            Total Calories:
                          </span>
                          <span className="text-lg font-bold text-[#CB3432]">
                            {Math.round(totalCalories)} cal
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Total Protein:
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            {Math.round(totalProtein)}g
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No foods assigned for this meal</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayMealPlan;

