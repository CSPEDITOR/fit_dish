import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Scale,
  Ruler,
  Heart,
  Utensils,
  Calendar,
  DollarSign,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { updateUserProfile } from "../../redux/userProfileSlice";
import { fetchFoods } from "../../redux/foodSlice";
import { fetchDiseaseList } from "../../redux/diseaseSlice";
import axios from "axios";

const ProfileSetup = ({ onComplete, onClose }) => {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.profile);
  const { list: foods } = useSelector((state) => state.foods);
  const { list: diseaseList } = useSelector((state) => state.disease);

  const [currentStep, setCurrentStep] = useState(1);
  const [foodSearch, setFoodSearch] = useState("");
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    foodType: "",
    dailyBudget: "",
    avoidFood: [],
    disease: [],
  });

  const totalSteps = 4;

  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchDiseaseList());
  }, [dispatch]);

  useEffect(() => {
    if (!foodSearch.trim()) return setFilteredFoods([]);
    setFilteredFoods(
      foods.filter((food) =>
        food.name.toLowerCase().includes(foodSearch.toLowerCase())
      )
    );
  }, [foodSearch, foods]);

  useEffect(() => {
    if (!diseaseSearch.trim()) return setFilteredDiseases([]);
    setFilteredDiseases(
      diseaseList.filter((d) =>
        d.name.toLowerCase().includes(diseaseSearch.toLowerCase())
      )
    );
  }, [diseaseSearch, diseaseList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBudgetChange = (value) => {
    setFormData({ ...formData, dailyBudget: value });
  };

  const toggleAvoidFood = (foodId) => {
    setFormData((prev) => ({
      ...prev,
      avoidFood: prev.avoidFood.includes(foodId)
        ? prev.avoidFood.filter((id) => id !== foodId)
        : [...prev.avoidFood, foodId],
    }));
  };

  const toggleDisease = (diseaseId) => {
    setFormData((prev) => ({
      ...prev,
      disease: prev.disease.includes(diseaseId)
        ? prev.disease.filter((id) => id !== diseaseId)
        : [...prev.disease, diseaseId],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.gender && formData.age && formData.weight && formData.height && formData.foodType;
      case 2:
        return formData.dailyBudget && parseInt(formData.dailyBudget) >= 250;
      case 3:
        return true; // Optional
      case 4:
        return true; // Optional
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      
      const formDataToSend = new FormData();
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("height", formData.height);
      formDataToSend.append("foodType", formData.foodType);
      formDataToSend.append("dailyBudget", formData.dailyBudget);
      formDataToSend.append("avoidFood", JSON.stringify(formData.avoidFood));
      formDataToSend.append("disease", JSON.stringify(formData.disease));
      formDataToSend.append("profileSetupComplete", "true");

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(updateUserProfile(formData));
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const budgetOptions = [
    { label: "₹250", value: 250 },
    { label: "₹300", value: 300 },
    { label: "₹400", value: 400 },
    { label: "₹500", value: 500 },
    { label: "₹600", value: 600 },
    { label: "₹700", value: 700 },
    { label: "₹800", value: 800 },
    { label: "₹900", value: 900 },
    { label: "₹1000", value: 1000 },
    { label: "₹1000+", value: 1500 },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#CB3432] to-[#E74C3C] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-2">Profile Setup</h2>
          <p className="text-white/90">Step {currentStep} of {totalSteps}</p>
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] rounded-full mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Basic Information
                  </h3>
                  <p className="text-gray-600">
                    Tell us about yourself to personalize your meal plans
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Weight (kg) *
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Enter weight"
                        min="1"
                        step="0.1"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height (cm) *
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Enter height"
                        min="1"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Food Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Food Preference *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["veg", "non-veg", "eggetarian"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, foodType: type })}
                          className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                            formData.foodType === type
                              ? "bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white shadow-lg"
                              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#CB3432]"
                          }`}
                        >
                          {type === "veg" ? "Vegetarian" : type === "non-veg" ? "Non-Vegetarian" : "Eggetarian"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] rounded-full mb-4">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Daily Budget
                  </h3>
                  <p className="text-gray-600">
                    Set your daily budget for 4 meals (Breakfast, Lunch, Snack, Dinner)
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Budget per Day (₹) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                    {budgetOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleBudgetChange(option.value)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          formData.dailyBudget == option.value
                            ? "bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-[#CB3432]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {formData.dailyBudget && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Selected: ₹{formData.dailyBudget} per day for 4 meals
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-4">
                    * Minimum budget is ₹250 per day
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Avoid Foods */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] rounded-full mb-4">
                    <AlertCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Foods to Avoid
                  </h3>
                  <p className="text-gray-600">
                    Select foods you want to avoid (Optional)
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <input
                    type="text"
                    placeholder="Search foods to avoid..."
                    value={foodSearch}
                    onChange={(e) => setFoodSearch(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none mb-4"
                  />

                  {formData.avoidFood.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Selected Foods ({formData.avoidFood.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.avoidFood.map((foodId) => {
                          const food = foods.find((f) => f._id === foodId);
                          return food ? (
                            <span
                              key={foodId}
                              className="px-3 py-1 bg-[#CB3432] text-white rounded-full text-sm flex items-center gap-2"
                            >
                              {food.name}
                              <button
                                onClick={() => toggleAvoidFood(foodId)}
                                className="hover:text-gray-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {filteredFoods.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-gray-200 rounded-lg bg-white max-h-60 overflow-y-auto"
                      >
                        {filteredFoods.map((food) => (
                          <button
                            key={food._id}
                            type="button"
                            onClick={() => toggleAvoidFood(food._id)}
                            className={`w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                              formData.avoidFood.includes(food._id)
                                ? "bg-[#CB3432]/10 border-l-4 border-l-[#CB3432]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{food.name}</span>
                              {formData.avoidFood.includes(food._id) && (
                                <CheckCircle className="w-5 h-5 text-[#CB3432]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 4: Diseases */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] rounded-full mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Health Conditions
                  </h3>
                  <p className="text-gray-600">
                    Select any health conditions you have (Optional)
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <input
                    type="text"
                    placeholder="Search diseases..."
                    value={diseaseSearch}
                    onChange={(e) => setDiseaseSearch(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-[#CB3432] focus:outline-none mb-4"
                  />

                  {formData.disease.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Selected Conditions ({formData.disease.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.disease.map((diseaseId) => {
                          const disease = diseaseList.find((d) => d._id === diseaseId);
                          return disease ? (
                            <span
                              key={diseaseId}
                              className="px-3 py-1 bg-[#CB3432] text-white rounded-full text-sm flex items-center gap-2"
                            >
                              {disease.name}
                              <button
                                onClick={() => toggleDisease(diseaseId)}
                                className="hover:text-gray-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {filteredDiseases.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-gray-200 rounded-lg bg-white max-h-60 overflow-y-auto"
                      >
                        {filteredDiseases.map((disease) => (
                          <button
                            key={disease._id}
                            type="button"
                            onClick={() => toggleDisease(disease._id)}
                            className={`w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                              formData.disease.includes(disease._id)
                                ? "bg-[#CB3432]/10 border-l-4 border-l-[#CB3432]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{disease.name}</span>
                              {formData.disease.includes(disease._id) && (
                                <CheckCircle className="w-5 h-5 text-[#CB3432]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step === currentStep
                    ? "bg-[#CB3432] w-8"
                    : step < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                } transition-all`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white hover:shadow-lg"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={saving || !canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                canProceed() && !saving
                  ? "bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white hover:shadow-lg"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete Setup
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;

