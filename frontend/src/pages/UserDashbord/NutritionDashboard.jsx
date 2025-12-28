import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Activity,
  Loader2,
  ArrowLeft,
  Flame,
  Zap,
  Apple,
} from "lucide-react";

const NutritionDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("today"); // today, week, month

  const API_URL = `${import.meta.env.VITE_BASE_URL}/api/intake`;

  // Get token from userInfo
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

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = (consumed, target) => {
    if (!target || target === 0) return 0;
    return Math.min(Math.round((consumed / target) * 100), 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90 && percentage <= 110) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CB3432]" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <Activity className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
            <p className="text-gray-600">
              Start tracking your meals to see your nutrition dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { stats, todayIntake } = dashboardData;
  const today = todayIntake || { totals: {}, targets: {} };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/userprofile")}
            className="mb-4 text-gray-600 hover:text-[#CB3432] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nutrition Dashboard
          </h1>
          <p className="text-gray-600">Track your daily nutritional intake and progress</p>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {["today", "week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPeriod === period
                  ? "bg-[#CB3432] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Today's Intake Cards */}
        {selectedPeriod === "today" && todayIntake && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Calories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {today.totals.calories || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Target: {today.targets?.calories || 0} kcal</span>
                  <span>
                    {calculatePercentage(
                      today.totals.calories || 0,
                      today.targets?.calories || 1
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(
                      calculatePercentage(
                        today.totals.calories || 0,
                        today.targets?.calories || 1
                      )
                    )}`}
                    style={{
                      width: `${Math.min(
                        calculatePercentage(
                          today.totals.calories || 0,
                          today.targets?.calories || 1
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Protein */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Protein</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {today.totals.protein?.toFixed(1) || 0}g
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Target: {today.targets?.protein || 0}g</span>
                  <span>
                    {calculatePercentage(
                      today.totals.protein || 0,
                      today.targets?.protein || 1
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(
                      calculatePercentage(
                        today.totals.protein || 0,
                        today.targets?.protein || 1
                      )
                    )}`}
                    style={{
                      width: `${Math.min(
                        calculatePercentage(
                          today.totals.protein || 0,
                          today.targets?.protein || 1
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Carbs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Apple className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carbs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {today.totals.carbohydrates?.toFixed(1) || 0}g
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Target: {today.targets?.carbohydrates || 0}g</span>
                  <span>
                    {calculatePercentage(
                      today.totals.carbohydrates || 0,
                      today.targets?.carbohydrates || 1
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(
                      calculatePercentage(
                        today.totals.carbohydrates || 0,
                        today.targets?.carbohydrates || 1
                      )
                    )}`}
                    style={{
                      width: `${Math.min(
                        calculatePercentage(
                          today.totals.carbohydrates || 0,
                          today.targets?.carbohydrates || 1
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Fats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fats</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {today.totals.fats?.toFixed(1) || 0}g
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Target: {today.targets?.fats || 0}g</span>
                  <span>
                    {calculatePercentage(
                      today.totals.fats || 0,
                      today.targets?.fats || 1
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getProgressColor(
                      calculatePercentage(
                        today.totals.fats || 0,
                        today.targets?.fats || 1
                      )
                    )}`}
                    style={{
                      width: `${Math.min(
                        calculatePercentage(
                          today.totals.fats || 0,
                          today.targets?.fats || 1
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Daily Calories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.averageDailyCalories || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Last {stats.totalDays || 0} days
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Daily Protein</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.averageDailyProtein?.toFixed(1) || 0}g
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Last {stats.totalDays || 0} days
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Days Tracked</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalDays || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Progress Chart */}
        {stats.weeklyProgress && stats.weeklyProgress.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
            <div className="space-y-4">
              {stats.weeklyProgress.map((week, index) => (
                <div key={index} className="border-l-4 border-[#CB3432] pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Week {stats.weeklyProgress.length - index}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(week.weekStart).toLocaleDateString()} -{" "}
                        {new Date(week.weekEnd).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {week.averageCalories} kcal/day
                      </p>
                      <p className="text-xs text-gray-600">
                        {week.averageProtein}g protein/day
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#CB3432] h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((week.averageCalories / 2500) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Protein Intake Graph */}
        {stats.dailyProgress && stats.dailyProgress.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Protein Intake Trend (Last 7 Days)</h2>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="50"
                    y1={40 + (y * 1.2)}
                    x2="750"
                    y2={40 + (y * 1.2)}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                {/* Protein line */}
                <polyline
                  points={stats.dailyProgress.slice(-7).map((day, i) => {
                    const proteinPct = Math.min(day.protein.percentage || 0, 100);
                    return `${50 + (i * 100)},${40 + (100 - proteinPct) * 1.2}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                {/* Protein points */}
                {stats.dailyProgress.slice(-7).map((day, i) => {
                  const proteinPct = Math.min(day.protein.percentage || 0, 100);
                  return (
                    <circle
                      key={i}
                      cx={50 + (i * 100)}
                      cy={40 + (100 - proteinPct) * 1.2}
                      r="5"
                      fill="#3b82f6"
                    />
                  );
                })}
                {/* Labels */}
                {stats.dailyProgress.slice(-7).map((day, i) => (
                  <text
                    key={i}
                    x={50 + (i * 100)}
                    y="190"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </text>
                ))}
                {/* Y-axis labels */}
                {[0, 50, 100].map((y) => (
                  <text
                    key={y}
                    x="45"
                    y={40 + (100 - y) * 1.2}
                    textAnchor="end"
                    className="text-xs fill-gray-600"
                  >
                    {y}%
                  </text>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Protein Intake %</span>
              </div>
            </div>
          </div>
        )}

        {/* Calories Intake Graph */}
        {stats.dailyProgress && stats.dailyProgress.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calories Intake Trend (Last 7 Days)</h2>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="50"
                    y1={40 + (y * 1.2)}
                    x2="750"
                    y2={40 + (y * 1.2)}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                {/* Calories line */}
                <polyline
                  points={stats.dailyProgress.slice(-7).map((day, i) => {
                    const calPct = Math.min(day.calories.percentage || 0, 100);
                    return `${50 + (i * 100)},${40 + (100 - calPct) * 1.2}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                />
                {/* Calories points */}
                {stats.dailyProgress.slice(-7).map((day, i) => {
                  const calPct = Math.min(day.calories.percentage || 0, 100);
                  return (
                    <circle
                      key={i}
                      cx={50 + (i * 100)}
                      cy={40 + (100 - calPct) * 1.2}
                      r="5"
                      fill="#f97316"
                    />
                  );
                })}
                {/* Labels */}
                {stats.dailyProgress.slice(-7).map((day, i) => (
                  <text
                    key={i}
                    x={50 + (i * 100)}
                    y="190"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </text>
                ))}
                {/* Y-axis labels */}
                {[0, 50, 100].map((y) => (
                  <text
                    key={y}
                    x="45"
                    y={40 + (100 - y) * 1.2}
                    textAnchor="end"
                    className="text-xs fill-gray-600"
                  >
                    {y}%
                  </text>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-600">Calories Intake %</span>
              </div>
            </div>
          </div>
        )}

        {/* Nutrients Comparison Chart */}
        {todayIntake && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Nutrients Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "Protein", value: today.totals.protein || 0, target: today.targets?.protein || 0, color: "blue" },
                { name: "Carbs", value: today.totals.carbohydrates || 0, target: today.targets?.carbohydrates || 0, color: "green" },
                { name: "Fats", value: today.totals.fats || 0, target: today.targets?.fats || 0, color: "purple" },
                { name: "Fiber", value: today.totals.fiber || 0, target: 25, color: "amber" },
              ].map((nutrient, index) => {
                const percentage = nutrient.target > 0 
                  ? Math.min((nutrient.value / nutrient.target) * 100, 100) 
                  : 0;
                const colorClasses = {
                  blue: "bg-blue-500",
                  green: "bg-green-500",
                  purple: "bg-purple-500",
                  amber: "bg-amber-500",
                };
                return (
                  <div key={index} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke={nutrient.color === "blue" ? "#3b82f6" : nutrient.color === "green" ? "#10b981" : nutrient.color === "purple" ? "#8b5cf6" : "#f59e0b"}
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</p>
                          <p className="text-xs text-gray-600">{nutrient.name}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {nutrient.value.toFixed(1)}g
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: {nutrient.target}g
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily Progress Bars */}
        {stats.dailyProgress && stats.dailyProgress.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Progress (Last 7 Days)</h2>
            <div className="grid grid-cols-7 gap-2">
              {stats.dailyProgress.slice(-7).map((day, index) => {
                const calPercentage = day.calories.percentage || 0;
                return (
                  <div key={index} className="text-center">
                    <p className="text-xs text-gray-600 mb-2">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <div className="space-y-1">
                      <div className="relative h-20 bg-gray-100 rounded">
                        <div
                          className={`absolute bottom-0 w-full rounded ${
                            calPercentage >= 90 && calPercentage <= 110
                              ? "bg-green-500"
                              : calPercentage >= 70
                              ? "bg-blue-500"
                              : calPercentage >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ height: `${Math.min(calPercentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-gray-900">
                        {calPercentage}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionDashboard;

