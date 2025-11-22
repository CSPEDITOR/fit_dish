import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Sidebar from "../../components/Sidebar";
import profileImg from "../../images/default_profile_image.png";
import { X } from "lucide-react";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/userProfileSlice";
import { fetchAvoidFoodList } from "../../redux/avoidFoodSlice";
import { fetchDiseaseList } from "../../redux/diseaseSlice";

Modal.setAppElement("#root");

const UserProfile = () => {
  const {
    data: userInfo,
    loading,
    error,
  } = useSelector((state) => state.profile);

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
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
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
      avoidFoodList.filter((food) =>
        food.name.toLowerCase().includes(foodSearch.toLowerCase())
      )
    );
  }, [foodSearch, avoidFoodList]);

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
      });

      setPreviewImage("");
      setLocalError("");
    }
  };

  const isProfileFilled = () => {
    return (
      userInfo &&
      (userInfo.gender ||
        userInfo.age ||
        userInfo.weight ||
        userInfo.height ||
        userInfo.foodType ||
        userInfo.avoidFood?.length > 0 ||
        userInfo.disease?.length > 0)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // ⭐ NEW: Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file, // store raw file for FormData
    }));

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
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
    resetForm();
    setShowEditModal(true);
  };

  const openSetupModal = () => {
    resetForm();
    setShowSetupModal(true);
  };

  return (
    <>
      

      <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
        {loading && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Loading...
          </div>
        )}

        {(error || localError) && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
            Error: {error || localError}
          </div>
        )}

        <div className="flex flex-col bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 relative">
            <div className="flex-1 mt-6 space-y-3 text-gray-700">
              <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">
                {userInfo?.name || "Guest User"}
              </h2>

              <div className="flex items-center gap-3">
                <span className="font-bold">Mail ID:</span>
                <span>{userInfo?.email}</span>
              </div>

              {userInfo?.gender && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Gender:</span>
                  <span>{userInfo.gender}</span>
                </div>
              )}

              {userInfo?.age && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Age:</span>
                  <span>{userInfo.age} years</span>
                </div>
              )}

              {userInfo?.weight && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Weight:</span>
                  <span>{userInfo.weight} kg</span>
                </div>
              )}

              {userInfo?.height && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Height:</span>
                  <span>{userInfo.height} cm</span>
                </div>
              )}

              {userInfo?.foodType && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Food Type:</span>
                  <span>{userInfo.foodType}</span>
                </div>
              )}

              {userInfo?.avoidFood?.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Avoid Food:</span>
                  <span>
                    {userInfo.avoidFood.map((item) => item.name).join(", ")}
                  </span>
                </div>
              )}

              {userInfo?.disease?.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Disease:</span>
                  <span>
                    {userInfo.disease.map((item) => item.name).join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-center md:justify-end items-center md:self-center w-full md:w-auto">
              <img
                src={userInfo?.profileImage || profileImg}
                alt="User Avatar"
                className="w-40 h-40 rounded-full border-4 border-blue-500 hover:border-[#cc2405] shadow-md object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={openEditModal}
              disabled={!isProfileFilled()}
              className={`${
                isProfileFilled()
                  ? "bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405]"
                  : "bg-gray-400 cursor-not-allowed"
              } text-[#fef1e1] font-medium py-2 px-4 rounded-full transition`}
            >
              Edit Profile
            </button>

            <button
              onClick={openSetupModal}
              className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition"
            >
              Profile Setup
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSetupModal || showEditModal}
        onRequestClose={() => {
          resetForm();
          setShowEditModal(false);
          setShowSetupModal(false);
        }}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto focus:outline-none scrollbar-hide"
      >
        <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {showSetupModal ? "Create Profile" : "Edit Profile"}
          </h2>

          <button
            onClick={() => {
              resetForm();
              setShowEditModal(false);
              setShowSetupModal(false);
            }}
            className="text-gray-500 hover:text-[#cc2405]"
          >
            <X size={30} />
          </button>
        </div>

        {localError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {localError}
          </div>
        )}

        <form
          onSubmit={showSetupModal ? handleSetupSubmit : handleEditSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Weight:</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Height:</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Food Type:
            </label>
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div> */}

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Food Type:
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodType"
                  value="veg"
                  checked={formData.foodType === "veg"}
                  onChange={handleChange}
                />
                <span>Veg</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodType"
                  value="non-veg"
                  checked={formData.foodType === "non-veg"}
                  onChange={handleChange}
                />
                <span>Non-Veg</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Avoid Food:
            </label>

            <input
              type="text"
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
              placeholder="Type food name..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.avoidFood.map((id) => {
                const item = avoidFoodList.find((f) => f._id === id);
                const displayName = item?.name || "Unknown";

                return (
                  <div
                    key={id}
                    className="flex items-center bg-[#cc2405] text-white px-3 py-1 rounded-full"
                  >
                    {displayName}

                    <button
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          avoidFood: p.avoidFood.filter((f) => f !== id),
                        }))
                      }
                      className="ml-2"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredFoods.length > 0 && (
              <div className="border border-gray-300 rounded-lg mt-2 bg-white shadow-md max-h-40 overflow-y-auto">
                {filteredFoods.map((f) => (
                  <div
                    key={f._id}
                    onClick={() => {
                      if (!formData.avoidFood.includes(f.name)) {
                        setFormData((p) => ({
                          ...p,
                          avoidFood: [...p.avoidFood, f._id],
                        }));
                      }
                      setFoodSearch("");
                      setFilteredFoods([]);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="font-semibold text-gray-700 mb-2">
              Disease (if any):
            </label>

            <input
              type="text"
              value={diseaseSearch}
              onChange={(e) => setDiseaseSearch(e.target.value)}
              placeholder="Type disease name..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.disease.map((id) => {
                const item = diseaseList.find((d) => d._id === id);
                const displayName = item?.name || "Unknown";

                return (
                  <div
                    key={id}
                    className="flex items-center bg-[#cc2405] text-white px-3 py-1 rounded-full"
                  >
                    {displayName}

                    <button
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          disease: p.disease.filter((d) => d !== id),
                        }))
                      }
                      className="ml-2"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredDiseases.length > 0 && (
              <div className="border border-gray-300 rounded-lg mt-2 bg-white shadow-md max-h-40 overflow-y-auto">
                {filteredDiseases.map((d) => (
                  <div
                    key={d._id}
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
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {d.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:col-span-2 mt-3">
            <label className="font-semibold text-gray-700 mb-1">
              Profile Image:
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 mt-3 rounded-full object-cover border border-gray-300"
              />
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-300">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowEditModal(false);
                setShowSetupModal(false);
              }}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#cc2405] text-white rounded-full hover:bg-[#fef1e1] hover:text-[#cc2405]"
            >
              {loading ? "Saving..." : showSetupModal ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;
