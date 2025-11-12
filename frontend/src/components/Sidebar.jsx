import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import logo from "../images/logo.png";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };

  const menuItems = [
    { name: "Profile", path: "/userprofile" },
    { name: "Plans", path: "/plans" },
    { name: "BMI", path: "/bmi" },
  ];

  return (
    <div className="h-screen w-64 bg-[#cc2405] border-r border-[#cc2405]/30 flex flex-col justify-between fixed top-0 left-0 z-40">
      {/* --- Top Section --- */}
      <div>
        <div className="flex items-center gap-3 px-6 py-5">
          <img src={logo} alt="Fit Dish Logo" className="w-[40px] h-[40px]" />
          <h1 className="text-2xl font-semibold text-[#fef1e1]">Fit Dish</h1>
        </div>
        <hr className="border-t border-[#fef1e1]/80 mx-2" />

        {/* --- Menu Items --- */}
        <nav className="flex flex-col mt-6 space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className=" w-full px-24 py-2 text-lg  text-[#fef1e1] hover:bg-[#fef1e1] hover:text-[#cc2405] rounded-l-md ml-2  transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>


      <div className="p-6 border-t border-[#cc2405]/30">
        <hr className="border-t border-[#fef1e1]/80 " />
        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-[#cc2405] text-[#fef1e1] py-2 rounded-full font-medium hover:bg-[#fef1e1] hover:text-[#cc2405] transition-all duration-200"
        >
            <FiLogOut className="text-lg"/>
            Logout
          
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
