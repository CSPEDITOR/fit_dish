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
//         <div className="flex flex-col bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
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









import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import profileImg from "../images/default_profile_image.png";
import { X } from "lucide-react";


const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    food: "",
    avoidFood: "",
    disease: "",
  });

  const resetForm = () => {
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: "",
      gender: "",
      age: "",
      weight: "",
      height: "",
      food: "",
      avoidFood: "",
      disease: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Created:", formData);
    resetForm();
    setShowSetupModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    resetForm();
    setShowEditModal(false);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
          {/* Main profile layout */}
          <div className="flex flex-col md:flex-row justify-between gap-8 relative">
            {/* Left side - user info */}
            <div className="flex-1 mt-6 space-y-3 text-gray-700">
              <h2 className="text-2xl font-semibold mt-4 text-center md:text-left">
                {userInfo?.name || "Guest User"}
              </h2>

              <div className="flex items-center gap-3">
                <span className="font-bold">Mail ID:</span>
                <span>{userInfo.email || "No email available"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Phone:</span>
                <span>{userInfo.phone || "No phone available"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Gender:</span>
                <span>{userInfo.gender || "Not specified"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Age:</span>
                <span>
                  {userInfo.age ? `${userInfo.age} years` : "Not available"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Weight:</span>
                <span>{userInfo.weight || "Not available"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Height:</span>
                <span>{userInfo.height || "Not available"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Food Preference:</span>
                <span>{userInfo.food || "Not available"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Avoid Food:</span>
                <span>{userInfo.avoidFood || "Not specified"}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">Disease:</span>
                <span>{userInfo.disease || "None"}</span>
              </div>
            </div>

            {/* Right side - profile image */}
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
              onClick={() => {
                setFormData({
                  name: userInfo?.name || "",
                  email: userInfo?.email || "",
                  phone: userInfo?.phone || "",
                  gender: userInfo?.gender || "",
                  age: userInfo?.age || "",
                  weight: userInfo?.weight || "",
                  height: userInfo?.height || "",
                  food: userInfo?.food || "",
                  avoidFood: userInfo?.avoidFood || "",
                  disease: userInfo?.disease || "",
                });
                setShowEditModal(true);
              }}
              className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                resetForm();
                setShowSetupModal(true);
              }}
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
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
              disabled={showEditModal || showSetupModal}
            />
          </div>

         
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
              disabled={showEditModal || showSetupModal}
            />
          </div>

          
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
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
              Food Preference:
            </label>
            <input
              type="text"
              name="food"
              value={formData.food}
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
              value={formData.avoidFood}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc2405]/30"
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
              className="px-4 py-2 bg-[#cc2405] text-white rounded-full hover:bg-[#fef1e1] hover:text-[#cc2405] transition"
            >
              {showSetupModal ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;
