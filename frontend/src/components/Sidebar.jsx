import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearProfile } from "../redux/userProfileSlice";
import logo from "../images/logo.png";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Clear all user data
    dispatch(logout());
    dispatch(clearProfile());
    localStorage.removeItem("userInfo");
    
    // Close sidebar on mobile
    setOpen(false);
    
    // Force page reload to clear all state and redirect to home
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Profile", path: "/userprofile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Plans", path: "/plans" },
    { name: "Foods", path: "/foods" },
    { name: "BMI", path: "/bmi" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#cc2405] text-[#fef1e1] p-2 rounded-lg"
      >
        <FiMenu size={22} />
      </button>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#cc2405] z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Top */}
        <div>
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Fit Dish Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-semibold text-[#fef1e1]">
                Fit Dish
              </h1>
            </div>

            {/* Close button (Mobile) */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-[#fef1e1]"
            >
              <FiX size={22} />
            </button>
          </div>

          <hr className="border-[#fef1e1]/70 mx-3" />

          {/* Menu */}
          <nav className="flex flex-col mt-6 space-y-3">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-20 py-2 text-lg rounded-l-md ml-4 transition-all
                  ${
                    isActive
                      ? "bg-[#fef1e1] text-[#cc2405] font-semibold"
                      : "text-[#fef1e1] hover:bg-[#fef1e1] hover:text-[#cc2405]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 absolute bottom-0 w-full">
          <hr className="border-[#fef1e1]/70" />
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-full
            bg-[#cc2405] text-[#fef1e1]
            hover:bg-[#fef1e1] hover:text-[#cc2405] transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
