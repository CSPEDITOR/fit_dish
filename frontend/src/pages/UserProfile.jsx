
import React from "react";
import { useSelector } from "react-redux"; 
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import profileImg from "../images/default_profile_image.png";
import Sidebar from "../components/Sidebar";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
    <Sidebar/>
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
       
       
       
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          <img
            src={profileImg}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {userInfo?.name || "Guest User"}
          </h2>
          <p className="text-gray-500 text-sm">Frontend React Developer</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <span>{userInfo?.email || "No email available"}</span>
          </div>

          {/* <div className="flex items-center gap-3">
            <FaPhone className="text-green-500" />
            <span>+91 12345 67890</span>
          </div> */}

          {/* <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Bhubaneswar, India</span>
          </div> */}

        </div>

        <div className="mt-6 flex justify-center gap-4 ">
          <button className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition">
            Edit Profile
          </button>

           <button className="bg-[#cc2405] hover:bg-[#fef1e1] hover:text-[#cc2405] text-[#fef1e1] font-medium py-2 px-4 rounded-full transition">
            Profile Setup
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
