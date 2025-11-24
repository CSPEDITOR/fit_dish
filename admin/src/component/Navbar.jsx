import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  // Helper: check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#CC2405] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>

            <div className="hidden md:flex space-x-4">

              {/* Dashboard */}
              <button
                onClick={() => navigate("/admin/dashboard")}
                className={`px-3 py-2 rounded-md transition duration-200 
                  ${isActive("/admin/dashboard")
                    ? "bg-white text-[#CC2405] font-semibold shadow-md"
                    : "text-white hover:bg-[#B02004]"}
                `}
              >
                Dashboard
              </button>

              {/* Users */}
              <button
                onClick={() => navigate("/admin/users")}
                className={`px-3 py-2 rounded-md transition duration-200 
                  ${isActive("/admin/users")
                    ? "bg-white text-[#CC2405] font-semibold shadow-md"
                    : "text-white hover:bg-[#B02004]"}
                `}
              >
                Users
              </button>

              {/* Add Food */}
              <button
                onClick={() => navigate("/add-food")}
                className={`px-3 py-2 rounded-md transition duration-200 
                  ${isActive("/add-food")
                    ? "bg-white text-[#CC2405] font-semibold shadow-md"
                    : "text-white hover:bg-[#B02004]"}
                `}
              >
                Add Food
              </button>

              {/* Add Disease */}
              <button
                onClick={() => navigate("/add-disease")}
                className={`px-3 py-2 rounded-md transition duration-200 
                  ${isActive("/add-disease")
                    ? "bg-white text-[#CC2405] font-semibold shadow-md"
                    : "text-white hover:bg-[#B02004]"}
                `}
              >
                Add Disease
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm font-medium">Welcome, Admin</span>

            <button
              className="px-6 py-2 bg-white text-[#CC2405] font-semibold rounded-lg hover:bg-gray-100 transition duration-200 shadow-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
