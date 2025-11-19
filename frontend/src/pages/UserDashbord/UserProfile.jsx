// import React from "react";
// import { useSelector } from "react-redux";
// import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
// import profileImg from "../images/default_profile_image.png";
// import Sidebar from "../components/Sidebar";

// const UserProfile = () => {
//   const { userInfo } = useSelector((state) => state.user);

//   return (
//     <>
//       <Sidebar />
//       <div className="flex flex-col items-center justify-center min-h-screen p-6">
//         <div class:
// ="flex flex-col bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
//           {/* Main profile layout - now in flex-row */}
//           <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
//             {/* Left side - user info */}
//             <div className="flex-1 mt-6 space-y-3 text-gray-700">
//               <div className="flex items-center gap-3">
//                 <h2 className="text-2xl font-semibold mt-4 text-center md:text-right">
//                   {userInfo?.name || "Guest User"}
//                 </h2>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Mail ID:</span>
//                 <span>{userInfo.email || "No email available"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Phone:</span>
//                 <span>{userInfo.phone || "No phone available"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Gender:</span>
//                 <span>{userInfo.gender || "Not specified"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Age:</span>
//                 <span>
//                   {userInfo.age ? `${userInfo.age} years` : "Not available"}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Weight:</span>
//                 <span>{userInfo.weight || "Not available"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Height:</span>
//                 <span>{userInfo.height || "Not available"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Food Preference:</span>
//                 <span>{userInfo.food || "Not available"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Avoid Food:</span>
//                 <span>{userInfo.avoidFood || "Not specified"}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Disease:</span>
//                 <span>{userInfo.disease || "None"}</span>
//               </div>
//             </div>

//             {/* Right side - profile image and name */}
//             <div className="flex justify-center items-center md:justify-end mr-26 mt-30">
//               <img
//                 src={profileImg}
//                 alt="User Avatar"
//                 className="w-40 h-40 rounded-full border-4 border-blue-500 hover:border-[#cc2405] shadow-md"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex justify-center gap-4">
//             <button className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition">
//               Edit Profile
//             </button>

//             <button className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition">
//               Profile Setup
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserProfile;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Modal from "react-modal";
// import Sidebar from "../../components/Sidebar";
// import profileImg from "../../images/default_profile_image.png";
// import { X } from "lucide-react";
// import {
//   fetchUserProfile,
//   updateUserProfile,
// } from "../../redux/userProfileSlice";
// import { useEffect } from "react";

// const UserProfile = () => {
//   const userInfo = useSelector((state) => state.profile.data) || {};
//   const dispatch = useDispatch();

//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     gender: "",
//     age: "",
//     weight: "",
//     height: "",
//     food: "",
//     avoidFood: "",
//     disease: "",
//   });

//   const resetForm = () => {
//     setFormData({
//       name: userInfo?.name || "",
//       email: userInfo?.email || "",
//       gender: userInfo?.gender || "",
//       age: userInfo?.age || "",
//       weight: userInfo?.weight || "",
//       height: userInfo?.height || "",
//       food: userInfo?.foodType || "",
//       avoidFood: userInfo?.avoidFood?.map((item) => item.name) || [],
//       disease: userInfo?.disease?.map((item) => item.name) || [],
//     });
//   };

//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, []);

//   const isProfileFilled = () => {
//     return (
//       userInfo.gender ||
//       userInfo.age ||
//       userInfo.weight ||
//       userInfo.height ||
//       (userInfo.avoidFood && userInfo.avoidFood.length > 0) ||
//       (userInfo.disease && userInfo.disease.length > 0)
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone") {
//       if (!/^\d*$/.test(value)) return;
//     }
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSetupSubmit = (e) => {
//     e.preventDefault();
//     console.log("Profile Created:", formData);
//     resetForm();
//     setShowSetupModal(false);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     console.log("Profile Updated:", formData);
//     resetForm();
//     setShowEditModal(false);
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className="flex flex-col items-center justify-center min-h-screen p-6 ms-60">
//         <div className="flex flex-col bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
//           {/* Main profile layout */}
//           <div className="flex flex-col md:flex-row justify-between gap-8 relative">
//             {/* Left side - user info */}
//             <div className="flex-1 mt-6 space-y-3 text-gray-700">
//               <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">
//                 {userInfo?.name || "Guest User"}
//               </h2>

//               <div className="flex items-center gap-3">
//                 <span className="font-bold">Mail ID:</span>
//                 <span>{userInfo.email || "No email available"}</span>
//               </div>

//               {userInfo.phone && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Phone:</span>
//                   <span>{userInfo.phone || "No phone available"}</span>
//                 </div>
//               )}

//               {userInfo.gender && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Gender:</span>
//                   <span>{userInfo.gender || "Not specified"}</span>
//                 </div>
//               )}

//               {userInfo.age && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Age:</span>
//                   <span>
//                     {userInfo.age ? `${userInfo.age} years` : "Not available"}
//                   </span>
//                 </div>
//               )}

//               {userInfo.weight && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Weight:</span>
//                   <span>{userInfo.weight || "Not available"}</span>
//                 </div>
//               )}

//               {userInfo.height && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Height:</span>
//                   <span>{userInfo.height || "Not available"}</span>
//                 </div>
//               )}

//               {userInfo.food && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Food Type:</span>
//                   <span>{userInfo.food || "Not available"}</span>
//                 </div>
//               )}

//               {userInfo.avoidFood?.length > 0 && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Avoid Food:</span>
//                   <span>
//                     {userInfo.avoidFood.map((item) => item.name).join(", ")}
//                   </span>
//                 </div>
//               )}

//               {userInfo.disease?.length > 0 && (
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold">Disease:</span>
//                   <span>
//                     {userInfo.disease.map((item) => item.name).join(", ")}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-center md:justify-end items-center md:self-center w-full md:w-auto">
//               <img
//                 src={profileImg}
//                 alt="User Avatar"
//                 className="w-40 h-40 rounded-full border-4 border-blue-500 hover:border-[#cc2405] shadow-md"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex justify-center gap-4">
//             <button
//               onClick={() => {
//                 setFormData({
//                   name: userInfo?.name || "",
//                   email: userInfo?.email || "",
//                   gender: userInfo?.gender || "",
//                   age: userInfo?.age || "",
//                   weight: userInfo?.weight || "",
//                   height: userInfo?.height || "",
//                   food: userInfo?.foodType || "",
//                   avoidFood:
//                     userInfo?.avoidFood?.map((item) => item.name) || [],
//                   disease: userInfo?.disease?.map((item) => item.name) || [],
//                 });
//                 setShowEditModal(true);
//               }}
//               disabled={!isProfileFilled()}
//               className={`${
//                 isProfileFilled()
//                   ? "bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405]"
//                   : "bg-gray-400 cursor-not-allowed"
//               } text-[#fef1e1] font-medium py-2 px-4 rounded-full transition`}
//             >
//               Edit Profile
//             </button>

//             <button
//               onClick={() => {
//                 resetForm();
//                 setShowSetupModal(true);
//               }}
//               className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition"
//             >
//               Profile Setup
//             </button>
//           </div>
//         </div>
//       </div>

//       <Modal
//         isOpen={showSetupModal || showEditModal}
//         onRequestClose={() => {
//           resetForm();
//           setShowEditModal(false);
//           setShowSetupModal(false);
//         }}
//         appElement={document.getElementById("root")}
//         overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300"
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto scrollbar-hide focus:outline-none"
//       >
//         <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {showSetupModal ? "Create Profile" : "Edit Profile"}
//           </h2>

//           <button
//             onClick={() => {
//               resetForm();
//               setShowEditModal(false);
//               setShowSetupModal(false);
//             }}
//             className="text-gray-500 hover:text-[#cc2405] transition"
//           >
//             <X size={30} />
//           </button>
//         </div>

//         <form
//           onSubmit={showSetupModal ? handleSetupSubmit : handleEditSubmit}
//           className="grid grid-cols-1 sm:grid-cols-2 gap-5"
//         >
//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//               disabled={showEditModal || showSetupModal}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//               disabled={showEditModal || showSetupModal}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">Gender:</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30 bg-white"
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">Age:</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">
//               Weight (kg):
//             </label>
//             <input
//               type="number"
//               name="weight"
//               value={formData.weight}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">
//               Height (cm):
//             </label>
//             <input
//               type="number"
//               name="height"
//               value={formData.height}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">
//               Food Type:
//             </label>
//             <input
//               type="text"
//               name="food"
//               value={formData.food}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-gray-700 mb-1">
//               Avoid Food:
//             </label>
//             <input
//               type="text"
//               name="avoidFood"
//               value={formData.avoidFood}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
//             />
//           </div>

//           <div className="flex flex-col sm:col-span-2">
//             <label className="font-semibold text-gray-700 mb-2">
//               Disease (if any):
//             </label>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {[
//                 "Diabetes",
//                 "Hypertension",
//                 "Heart Disease",
//                 "Asthma",
//                 "Thyroid",
//                 "Arthritis",
//                 "Other",
//               ].map((disease) => (
//                 <label
//                   key={disease}
//                   className="flex items-center space-x-2 text-gray-700 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     value={disease}
//                     checked={formData.disease.includes(disease)}
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setFormData({
//                           ...formData,
//                           disease: [...formData.disease, disease],
//                         });
//                       } else {
//                         setFormData({
//                           ...formData,
//                           disease: formData.disease.filter(
//                             (d) => d !== disease
//                           ),
//                         });
//                       }
//                     }}
//                     className="w-4 h-4 text-[#cc2405] border-gray-300 focus:ring-[#cc2405]"
//                   />
//                   <span>{disease}</span>
//                 </label>
//               ))}
//             </div>

//             <p className="text-xs text-gray-500 mt-2">
//               You can select multiple diseases if applicable.
//             </p>
//           </div>

//           <div className="col-span-2 flex justify-end gap-3 pt-4 mt-2 border-t border-gray-300">
//             <button
//               type="button"
//               onClick={() => {
//                 resetForm();
//                 setShowEditModal(false);
//                 setShowSetupModal(false);
//               }}
//               className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#cc2405] text-white rounded-full hover:bg-[#fef1e1] hover:text-[#cc2405] transition"
//             >
//               {showSetupModal ? "Create" : "Update"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default UserProfile;

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

const UserProfile = () => {
  const {
    data: userInfo,
    loading,
    error,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localError, setLocalError] = useState("");

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
  });

  // Debug: Log userInfo to check data structure
  useEffect(() => {
    console.log("User Info from Redux:", userInfo);
  }, [userInfo]);

  // Fix useEffect dependency
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Improved resetForm function
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
        avoidFood: userInfo?.avoidFood?.map((item) => item.name) || [],
        disease: userInfo?.disease?.map((item) => item.name) || [],
      });
    }
    setLocalError("");
  };

  const isProfileFilled = () => {
    return (
      userInfo &&
      (userInfo.gender ||
        userInfo.age ||
        userInfo.weight ||
        userInfo.height ||
        userInfo.foodType ||
        (userInfo.avoidFood && userInfo.avoidFood.length > 0) ||
        (userInfo.disease && userInfo.disease.length > 0))
    );
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "phone") {
  //     if (!/^\d*$/.test(value)) return;
  //   }
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "avoidFood") {
      setFormData({
        ...formData,
        avoidFood: value.split(",").map((v) => v.trim()),
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Actual API call for setup
  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      // Transform data for backend - convert arrays to objects
      const submitData = {
  ...formData,
  avoidFood: formData.avoidFood.map(name => ({ name })),
  disease: formData.disease.map(name => ({ name }))
};

      console.log("Submitting profile data:", submitData);
      const result = await dispatch(updateUserProfile(submitData)).unwrap();
      console.log("Profile created successfully:", result);

      resetForm();
      setShowSetupModal(false);
      // Refresh profile data
      dispatch(fetchUserProfile());
    } catch (err) {
      console.error("Failed to create profile:", err);
      setLocalError(err);
    }
  };

  // Actual API call for edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      // Transform data for backend
      const submitData = {
        ...formData,
        avoidFood: formData.avoidFood.map((name) => ({ name })),
        disease: formData.disease.map((name) => ({ name })),
      };

      console.log("Updating profile data:", submitData);
      const result = await dispatch(updateUserProfile(submitData)).unwrap();
      console.log("Profile updated successfully:", result);

      resetForm();
      setShowEditModal(false);
      // Refresh profile data
      dispatch(fetchUserProfile());
    } catch (err) {
      console.error("Failed to update profile:", err);
      setLocalError(err);
    }
  };

  // Open modals with proper data
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
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen p-6 ms-60">
        {/* Add loading and error states */}
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
          {/* Debug info - remove in production */}
          {/* <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
            <strong>Debug Info:</strong> Profile filled: {isProfileFilled() ? 'Yes' : 'No'} | 
            Data: {userInfo ? 'Loaded' : 'Not loaded'}
          </div> */}

          {/* Main profile layout */}
          <div className="flex flex-col md:flex-row justify-between gap-8 relative">
            {/* Left side - user info */}
            <div className="flex-1 mt-6 space-y-3 text-gray-700">
              <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">
                {userInfo?.name || "Guest User"}
              </h2>

              <div className="flex items-center gap-3">
                <span className="font-bold">Mail ID:</span>
                <span>{userInfo?.email || "No email available"}</span>
              </div>

              {userInfo?.phone && (
                <div className="flex items-center gap-3">
                  <span className="font-bold">Phone:</span>
                  <span>{userInfo.phone}</span>
                </div>
              )}

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
                src={profileImg}
                alt="User Avatar"
                className="w-40 h-40 rounded-full border-4 border-blue-500 hover:border-[#cc2405] shadow-md"
              />
            </div>
          </div>

          {/* Buttons */}
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
        appElement={document.getElementById("root")}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto scrollbar-hide focus:outline-none"
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
            className="text-gray-500 hover:text-[#cc2405] transition"
          >
            <X size={30} />
          </button>
        </div>

        {/* Show submission error */}
        {localError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
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
              disabled={true} // ← ALWAYS disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled={true} // ← ALWAYS disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30 bg-white"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Weight (kg):
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Height (cm):
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Food Type:
            </label>
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              Avoid Food:
            </label>
            <input
              type="text"
              name="avoidFood"
              value={formData.avoidFood.join(", ")} // show comma string
              onChange={(e) =>
                setFormData({
                  ...formData,
                  avoidFood: e.target.value.split(",").map((v) => v.trim()),
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter foods separated by commas"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="font-semibold text-gray-700 mb-2">
              Disease (if any):
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "Diabetes",
                "Hypertension",
                "Heart Disease",
                "Asthma",
                "Thyroid",
                "Arthritis",
                "Other",
              ].map((disease) => (
                <label
                  key={disease}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={disease}
                    checked={formData.disease.includes(disease)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          disease: [...formData.disease, disease],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          disease: formData.disease.filter(
                            (d) => d !== disease
                          ),
                        });
                      }
                    }}
                    className="w-4 h-4 text-[#cc2405] border-gray-300 focus:ring-[#cc2405]"
                  />
                  <span>{disease}</span>
                </label>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              You can select multiple diseases if applicable.
            </p>
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4 mt-2 border-t border-gray-300">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowEditModal(false);
                setShowSetupModal(false);
              }}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#cc2405] text-white rounded-full hover:bg-[#fef1e1] hover:text-[#cc2405] transition disabled:opacity-50"
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
