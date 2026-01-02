import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Scale,
  Ruler,
  Heart,
  Utensils,
  Calendar,
  AlertCircle,
  Edit3,
  Settings,
  Camera,
  ChevronRight,
  Loader2,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/userProfileSlice";
import { fetchAvoidFoodList } from "../../redux/avoidFoodSlice";
import { fetchFoods } from "../../redux/foodSlice";
import { fetchDiseaseList } from "../../redux/diseaseSlice";
import ProfileSetup from "./ProfileSetup";

Modal.setAppElement("#root");

const UserProfile = () => {
  const {
    data: userInfo,
    loading,
    error,
  } = useSelector((state) => state.profile);

  const { list: foods } = useSelector((state) => state.foods);
  const { list: avoidFoodList } = useSelector((state) => state.avoidFood);
  const { list: diseaseList } = useSelector((state) => state.disease);

  const dispatch = useDispatch();

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localError, setLocalError] = useState("");
  const [foodSearch, setFoodSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    foodType: "",
    avoidFood: [],
    disease: [],
    profileImage: "",
    dailyBudget: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchFoods());
    dispatch(fetchDiseaseList());
    dispatch(fetchAvoidFoodList());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setPreviewImage(
        userInfo.profileImage
          ? `${import.meta.env.VITE_BASE_URL}/${userInfo.profileImage}`
          : ""
      );
    }
  }, [userInfo]);

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

  const resetForm = () => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        gender: userInfo?.gender || "",
        age: userInfo?.age || "",
        weight: userInfo?.weight || "",
        height: userInfo?.height || "",
        foodType: userInfo?.foodType || "",
        avoidFood: userInfo?.avoidFood?.map((f) => f._id) || [],
        disease: userInfo?.disease?.map((d) => d._id) || [],
        profileImage: "",
        dailyBudget: userInfo?.dailyBudget || "",
      });

      setPreviewImage("");
      setLocalError("");
    }
  };

  const isProfileFilled = () => {
    return userInfo?.profileSetupComplete === true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setImageUploading(false);
    }, 800);
  };

  const prepareSubmitData = () => {
    if (formData.profileImage instanceof File) {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          fd.append(key, JSON.stringify(formData[key]));
        } else {
          fd.append(key, formData[key]);
        }
      });
      return fd;
    }
    return formData;
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const submitData = prepareSubmitData();
      await dispatch(updateUserProfile(submitData)).unwrap();

      resetForm();
      setShowSetupModal(false);
      dispatch(fetchUserProfile());
    } catch (err) {
      console.error("Failed:", err);
      setLocalError(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const submitData = prepareSubmitData();
      await dispatch(updateUserProfile(submitData)).unwrap();

      resetForm();
      setShowEditModal(false);
      dispatch(fetchUserProfile());
    } catch (err) {
      console.error("Failed:", err);
      setLocalError(err);
    }
  };

  const openEditModal = () => {
    // Only allow edit if profile is complete
    if (userInfo?.profileSetupComplete !== true) {
      // If profile not complete, open setup instead
      openSetupModal();
      return;
    }
    resetForm();
    setShowEditModal(true);
  };

  const openSetupModal = () => {
    // Only allow setup if profile is not complete
    if (userInfo?.profileSetupComplete === true) {
      return; // Don't open setup if already completed
    }
    resetForm();
    setShowSetupModal(true);
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (!userInfo?.weight || !userInfo?.height) return null;
    const heightInMeters = userInfo.height / 100;
    const bmi = (userInfo.weight / (heightInMeters * heightInMeters)).toFixed(
      1
    );
    return bmi;
  };

  const bmi = calculateBMI();
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  const bmiCategory = bmi ? getBMICategory(bmi) : null;
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

  const ProfileInfoCard = ({
    icon: Icon,
    title,
    value,
    color = "text-gray-700",
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="min-h-screen p-0 md:p-8">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
            >
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading profile...</span>
              </div>
            </motion.div>
          )}

          {(error || localError) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Error: {error || localError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl ">
            {/* Header Section */}
            <div className="bg-[#cc2405] p-8 md:p-12 relative rounded-b-3xl sm:rounded-3xl ">
              <div className="absolute top-100 right-29 sm:top-6 sm:right-6">
                <div className="flex gap-3">
                  {isProfileFilled() ? (
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openEditModal}
                      className="bg-white/20 top-[-390px] sm:top-0 right-[-75px] sm:right-0 relative hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 sm:py-3 px-2 sm:px-6 rounded-xl transition-all duration-300 border border-white/30 flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4 " />
                      Edit
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openSetupModal}
                      className="bg-white text-[#cc2405] font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:bg-gray-50 flex items-center gap-2 shadow-lg"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Setup
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image with Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white/30 shadow-2xl overflow-hidden bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                    {userInfo?.profileImage ? (
                      <img
                        src={userInfo.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <User className="w-20 h-20 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-[#cc2405]" />
                  </motion.div>
                </motion.div>

                {/* User Info */}
                <div className="text-white space-y-4 flex-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold"
                  >
                    {userInfo?.name || "Guest User"}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3 text-white/90"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <span className="text-lg">{userInfo?.email}</span>
                    </div>
                    {userInfo?.dailyBudget && (
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 max-w-sm">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-base">
                          Daily Budget: ₹{userInfo.dailyBudget}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Health Stats */}
                  {bmi && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md"
                    >
                      <div>
                        <div className="text-sm text-white/80">BMI</div>
                        <div className="text-2xl font-bold">{bmi}</div>
                        <div className={`text-sm ${bmiCategory?.color}`}>
                          {bmiCategory?.label}
                        </div>
                      </div>
                      <div className="h-12 w-px bg-white/30"></div>
                      <div>
                        <div className="text-sm text-white/80">
                          Health Score
                        </div>
                        <div className="text-2xl font-bold">85%</div>
                        <div className="text-sm text-green-300">Excellent</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {isProfileFilled() ? (
              <div className="p-8 md:p-12 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {userInfo?.gender && (
                    <ProfileInfoCard
                      icon={User}
                      title="Gender"
                      value={
                        userInfo.gender.charAt(0).toUpperCase() +
                        userInfo.gender.slice(1)
                      }
                      color="text-blue-600"
                    />
                  )}

                  {userInfo?.age && (
                    <ProfileInfoCard
                      icon={Calendar}
                      title="Age"
                      value={`${userInfo.age} years`}
                      color="text-purple-600"
                    />
                  )}

                  {userInfo?.weight && (
                    <ProfileInfoCard
                      icon={Scale}
                      title="Weight"
                      value={`${userInfo.weight} kg`}
                      color="text-green-600"
                    />
                  )}

                  {userInfo?.height && (
                    <ProfileInfoCard
                      icon={Ruler}
                      title="Height"
                      value={`${userInfo.height} cm`}
                      color="text-yellow-600"
                    />
                  )}

                  {userInfo?.foodType && (
                    <ProfileInfoCard
                      icon={Utensils}
                      title="Food Type"
                      value={
                        userInfo.foodType.charAt(0).toUpperCase() +
                        userInfo.foodType.slice(1).replace("-", " ")
                      }
                      color="text-red-600"
                    />
                  )}

                  {userInfo?.dailyBudget && (
                    <ProfileInfoCard
                      icon={DollarSign}
                      title="Daily Budget"
                      value={`₹${userInfo.dailyBudget}`}
                      color="text-emerald-600"
                    />
                  )}

                  {bmi && (
                    <ProfileInfoCard
                      icon={Heart}
                      title="BMI"
                      value={`${bmi} (${bmiCategory?.label})`}
                      color={
                        bmiCategory?.color
                          .replace("text-", "text-")
                          .replace("-500", "-600") || "text-red-600"
                      }
                    />
                  )}
                </div>

                {/* Lists Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Avoid Food List */}
                  {userInfo?.avoidFood?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              Avoid Foods
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              Foods to avoid for better health
                            </p>
                          </div>
                        </div>
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                          {userInfo.avoidFood.length} items
                        </span>
                      </div>
                      <div className="space-y-3">
                        {userInfo.avoidFood.map((item, index) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-50 hover:border-red-200 transition-all duration-300"
                          >
                            <span className="font-medium text-gray-700">
                              {item.name}
                            </span>
                            <ChevronRight className="w-4 h-4 text-red-300" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Disease List */}
                  {userInfo?.disease?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-blue-500" />
                            Health Conditions
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            Manage your health conditions
                          </p>
                        </div>
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {userInfo.disease.length} conditions
                        </span>
                      </div>
                      <div className="space-y-3">
                        {userInfo.disease.map((item, index) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-blue-50 hover:border-blue-200 transition-all duration-300"
                          >
                            <span className="font-medium text-gray-700">
                              {item.name}
                            </span>
                            <ChevronRight className="w-4 h-4 text-blue-300" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {/* Profile Details Grid */}
          </div>
        </motion.div>
      </div>

      {/* Profile Setup Modal - Only show if profile is not complete */}
      {showSetupModal && !userInfo?.profileSetupComplete && (
        <ProfileSetup
          onComplete={() => {
            setShowSetupModal(false);
            dispatch(fetchUserProfile());
          }}
          onClose={() => setShowSetupModal(false)}
        />
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => {
          resetForm();
          setShowEditModal(false);
        }}
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl outline-none relative"
        style={{
          overlay: {
            animation: "fadeIn 0.3s ease-out",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white z-10 p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Edit Profile
                </h2>
                <p className="text-gray-500 mt-2">
                  Update your profile information
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  resetForm();
                  setShowEditModal(false);
                  setShowSetupModal(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </motion.button>
            </div>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
            {localError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{localError}</p>
              </motion.div>
            )}

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 md:col-span-2 flex justify-center">
                <div className="relative w-fit">
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group cursor-pointer transition-all hover:shadow-2xl hover:border-[#cc2405]"
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-20 h-20 text-gray-400" />
                      )}
                      {/* {console.log(userInfo.profileImage)} */}

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  </motion.label>

                  {/* Edit Button - Optional floating button */}
                  <motion.label
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-2 right-2 cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="bg-gradient-to-r from-[#cc2405] to-[#e6392b] rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
                      {imageUploading ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Camera className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </motion.label>
                </div>
              </div>
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500"
                  />
                </div>
              </div>
              {
                console.log(formData)
              }
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all"
                  placeholder="Enter your age"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all"
                  placeholder="Enter weight in kg"
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all"
                  placeholder="Enter height in cm"
                />
              </div>
              {/* Daily Budge */}
              {/* Daily Budget */}
              <div className="space-y-4 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Daily Budget (₹)
                </label>

                {/* Input (same edit modal design) */}
                <input
                  type="number"
                  name="dailyBudget"
                  value={formData.dailyBudget}
                  onChange={handleChange}
                  min={250}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all"
                  placeholder="Enter Daily Budget"
                />

                {/* Preset budget buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          dailyBudget: option.value,
                        }))
                      }
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        formData.dailyBudget == option.value
                          ? "bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {formData.dailyBudget && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Selected: ₹{formData.dailyBudget} per day
                  </p>
                )}
              </div>
            </div>

            {/* Food Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Food Type
              </label>
              <div className="flex gap-4">
                {["veg", "non-veg"].map((type) => (
                  <motion.label
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 cursor-pointer p-4 rounded-xl border-2 transition-all ${
                      formData.foodType === type
                        ? "border-[#cc2405] bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="foodType"
                      value={type}
                      checked={formData.foodType === type}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          formData.foodType === type
                            ? "bg-[#cc2405]"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="font-medium capitalize">{type}</span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Avoid Food Search */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Avoid Food
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Search for foods to avoid..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all pr-10"
                />
                <Utensils className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Selected Foods */}
              <div className="flex flex-wrap gap-2">
                {formData.avoidFood.map((id) => {
                  const item = foods.find((f) => f._id === id);
                  const displayName = item?.name || "Unknown";

                  return (
                    <motion.div
                      key={id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-sm"
                    >
                      <span className="text-sm">{displayName}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            avoidFood: p.avoidFood.filter((f) => f !== id),
                          }))
                        }
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {filteredFoods.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden"
                  >
                    {filteredFoods.map((f) => (
                      <motion.div
                        key={f._id}
                        whileHover={{ backgroundColor: "#fef2f2" }}
                        onClick={() => {
                          if (!formData.avoidFood.includes(f._id)) {
                            setFormData((p) => ({
                              ...p,
                              avoidFood: [...p.avoidFood, f._id],
                            }));
                          }
                          setFoodSearch("");
                          setFilteredFoods([]);
                        }}
                        className="px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                      >
                        <span className="font-medium">{f.name}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Disease Search */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Health Conditions
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  placeholder="Search for health conditions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition-all pr-10"
                />
                <Heart className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Selected Diseases */}
              <div className="flex flex-wrap gap-2">
                {formData.disease.map((id) => {
                  const item = diseaseList.find((d) => d._id === id);
                  const displayName = item?.name || "Unknown";

                  return (
                    <motion.div
                      key={id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full shadow-sm"
                    >
                      <span className="text-sm">{displayName}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            disease: p.disease.filter((d) => d !== id),
                          }))
                        }
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {filteredDiseases.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden"
                  >
                    {filteredDiseases.map((d) => (
                      <motion.div
                        key={d._id}
                        whileHover={{ backgroundColor: "#f0f9ff" }}
                        onClick={() => {
                          if (!formData.disease.includes(d.name)) {
                            setFormData((p) => ({
                              ...p,
                              disease: [...p.disease, d._id],
                            }));
                          }
                          setDiseaseSearch("");
                          setFilteredDiseases([]);
                        }}
                        className="px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                      >
                        <span className="font-medium">{d.name}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Image Upload */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="flex items-center gap-6">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#cc2405] transition-colors group">
                    <div className="flex flex-col items-center gap-3">
                      {imageUploading ? (
                        <Loader2 className="w-8 h-8 text-[#cc2405] animate-spin" />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400 group-hover:text-[#cc2405]" />
                      )}
                      <div>
                        <p className="font-medium text-gray-700">
                          {imageUploading ? "Uploading..." : "Upload Image"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.label>

                {previewImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg"
                  >
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
            </div> */}

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowEditModal(false);
                }}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-[#cc2405] to-[#e6392b] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </Modal>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default UserProfile;
