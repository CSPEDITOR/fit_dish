import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, UtensilsCrossed, Loader2, X, Trash2 } from "lucide-react";

const MealPlanCalendar = () => {
  const { planType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Get weekStartDate from navigation state if available
  const initialWeek = location.state?.weekStartDate 
    ? new Date(location.state.weekStartDate)
    : new Date();
  const [currentWeek, setCurrentWeek] = useState(initialWeek);
  const [onlySpecificFoods, setOnlySpecificFoods] = useState(false);
  const [specificFoodIds, setSpecificFoodIds] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const daysOfWeekLower = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Calculate week start date (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Memoize weekStart to prevent infinite loops
  const weekStart = useMemo(() => {
    const start = getWeekStart(currentWeek);
    start.setHours(0, 0, 0, 0);
    return start;
  }, [currentWeek]);

  useEffect(() => {
    // Only fetch if we have a valid planType
    if (planType) {
      fetchMealPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planType, weekStart.toISOString()]);

  // Prevent navigation away from plan until exit is clicked
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const fetchMealPlan = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        console.error("No token found. Please login again.");
        setLoading(false);
        return;
      }
      
      const response = await axios.get(API_URL, {
        params: {
          planType,
          weekStartDate: weekStart.toISOString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setMealPlan(response.data.data);
      } else {
        setMealPlan(null);
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      // Don't show error if it's just "not found" (normal case)
      if (error.response?.status !== 404) {
        console.error("Error details:", error.response?.data);
      }
      setMealPlan(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteMealPlan = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to delete meal plan.");
        return;
      }

      const response = await axios.delete(`${API_URL}`, {
        data: {
          planType,
          weekStartDate: weekStart.toISOString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setMealPlan(null);
        setShowDeleteConfirm(false);
        alert("Meal plan deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      alert("Failed to delete meal plan. Please try again.");
    }
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit? You'll return to plan selection.")) {
      navigate("/plans");
    }
  };

  const generateMealPlan = async () => {
    try {
      setGenerating(true);
      const token = getToken();
      if (!token) {
        alert("Please login to generate meal plan.");
        setGenerating(false);
        return;
      }
      
      const response = await axios.post(
        `${API_URL}/generate`,
        {
          planType,
          weekStartDate: weekStart.toISOString(),
          onlySpecificFoods,
          specificFoodIds: specificFoodIds.length > 0 ? specificFoodIds : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMealPlan(response.data.data);
        // Refresh the page data
        await fetchMealPlan();
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
      const errorMessage = error.response?.data?.msg || 
                          error.response?.data?.message || 
                          "Failed to generate meal plan. Please try again.";
      
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(errorMessage);
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleDayClick = (day) => {
    navigate(`/plan/${planType}/day/${day.toLowerCase()}`, {
      state: {
        mealPlan,
        weekStartDate: weekStart.toISOString(),
      },
    });
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
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

  const getPlanColor = () => {
    switch (planType) {
      case "weight-loss":
        return "from-emerald-500 to-teal-600";
      case "weight-gain":
        return "from-amber-500 to-orange-600";
      case "normal-diet":
        return "from-blue-500 to-indigo-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CB3432]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleExit}
              className="text-gray-600 hover:text-[#CB3432] transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Exit Plan
            </button>
            {mealPlan && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Plan
              </button>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {getPlanTitle()}
          </h1>
          <p className="text-gray-600">
            Week of {weekStart.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">Delete Meal Plan?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this meal plan? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteMealPlan}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-md">
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={goToCurrentWeek}
              className="px-4 py-2 bg-[#CB3432] text-white rounded-lg hover:bg-[#E74C3C] transition-colors"
            >
              Today
            </button>
            <span className="font-semibold">
              {weekStart.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(
                weekStart.getTime() + 6 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Generate Plan Button */}
        {!mealPlan && (
          <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Generate Your Meal Plan</h3>
            <button
              onClick={generateMealPlan}
              disabled={generating}
              className={`w-full py-3 px-6 bg-gradient-to-r ${getPlanColor()} text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50`}
            >
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Meal Plan"
              )}
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        {mealPlan ? (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {daysOfWeekLower.map((day, index) => {
              const dayMeals = mealPlan.meals[day];
              const dayDate = new Date(weekStart);
              dayDate.setDate(dayDate.getDate() + index);
              const isToday =
                dayDate.toDateString() === new Date().toDateString();

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDayClick(day)}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-[#CB3432]"
                >
                  <div className="text-center mb-4">
                    <div
                      className={`text-sm font-semibold mb-1 ${
                        isToday ? "text-[#CB3432]" : "text-gray-600"
                      }`}
                    >
                      {daysOfWeek[index]}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        isToday ? "text-[#CB3432]" : "text-gray-900"
                      }`}
                    >
                      {dayDate.getDate()}
                    </div>
                    {isToday && (
                      <div className="text-xs text-[#CB3432] font-semibold mt-1">
                        Today
                      </div>
                    )}
                  </div>

                  {dayMeals && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <UtensilsCrossed className="w-4 h-4" />
                        <span>
                          {dayMeals.breakfast?.length || 0} meals
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Click to view details
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Meal Plan Yet</h3>
            <p className="text-gray-600 mb-6">
              Generate your personalized meal plan to get started
            </p>
            <button
              onClick={generateMealPlan}
              disabled={generating}
              className={`py-3 px-6 bg-gradient-to-r ${getPlanColor()} text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50`}
            >
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Meal Plan"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanCalendar;

