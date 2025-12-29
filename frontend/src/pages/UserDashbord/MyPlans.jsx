import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  Trash2,
  Plus,
  TrendingDown,
  TrendingUp,
  Apple,
  Loader2,
  ArrowRight,
} from "lucide-react";

const MyPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const API_URL = `${import.meta.env.VITE_BASE_URL}/api/meal-plans`;

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

  // ADD these states at top
  const [profileChecked, setProfileChecked] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  
  const USER_API = `${import.meta.env.VITE_BASE_URL}/api/users/profile`;
  
  // UPDATE useEffect
  useEffect(() => {
  checkUserProfile();
}, []);


const checkUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const res = await axios.get(USER_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfileComplete(res.data.profileSetupComplete === true);
  } catch (err) {
    console.error("Profile check failed", err);
  } finally {
    setProfileChecked(true);
  }
};


  const fetchAllPlans = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPlans(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId, planType, weekStartDate) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) {
      return;
    }

    try {
      setDeletingId(planId);
      const token = getToken();
      if (!token) return;

      const response = await axios.delete(`${API_URL}`, {
        data: {
          planType,
          weekStartDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setPlans(plans.filter((plan) => plan._id !== planId));
        alert("Plan deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleChoosePlan = (planType, weekStartDate) => {
    navigate(`/plan/${planType}`, {
      state: { weekStartDate },
    });
  };

  const handleCreateNewPlan = () => {
    navigate("/plans/select");
  };

  const getPlanIcon = (planType) => {
    switch (planType) {
      case "weight-loss":
        return <TrendingDown className="w-8 h-8" />;
      case "weight-gain":
        return <TrendingUp className="w-8 h-8" />;
      case "normal-diet":
        return <Apple className="w-8 h-8" />;
      default:
        return <Calendar className="w-8 h-8" />;
    }
  };

  const getPlanTitle = (planType) => {
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

  const getPlanColor = (planType) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] flex items-center justify-center">
  //       <Loader2 className="w-8 h-8 animate-spin text-[#CB3432]" />
  //     </div>
  //   );
  // }
  // ADD before loading return
if (!profileChecked) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0]">
      <Loader2 className="w-8 h-8 animate-spin text-[#CB3432]" />
    </div>
  );
}
// ADD this return BEFORE main page return
if (!profileComplete) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 mb-6">
          Please set up your profile to access meal plans.
        </p>
        <button
          onClick={() => navigate("/userprofile")}
          className="px-6 py-3 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Set Your Profile
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Meal Plans</h1>
          <p className="text-gray-600">Manage and continue your active meal plans</p>
        </div>

        {/* Create New Plan Button */}
        <div className="mb-8">
          <button
            onClick={handleCreateNewPlan}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create New Plan
          </button>
        </div>

        {/* Plans Grid */}
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Plan Header */}
                <div className={`bg-gradient-to-r ${getPlanColor(plan.planType)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getPlanIcon(plan.planType)}
                      <h2 className="text-2xl font-bold">{getPlanTitle(plan.planType)}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Week of {formatDate(plan.weekStartDate)}
                    </span>
                  </div>
                </div>

                {/* Plan Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Created</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(plan.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleChoosePlan(plan.planType, plan.weekStartDate)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#CB3432] text-white rounded-lg font-semibold hover:bg-[#E74C3C] transition-colors"
                    >
                      Continue Plan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(plan._id, plan.planType, plan.weekStartDate)
                      }
                      disabled={deletingId === plan._id}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      {deletingId === plan._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Plans Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first meal plan to get started on your nutrition journey
            </p>
            <button
              onClick={handleCreateNewPlan}
              className="px-6 py-3 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Create Your First Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlans;

