import React, { useState, useEffect, useRef } from "react";
import logo from "../../src/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../images/default_profile_image.png";
import { fetchUserProfile } from "../redux/userProfileSlice";
import { clearProfile } from "../redux/userProfileSlice";

import { Menu, X } from "lucide-react"; // 🧭 for icons (built into shadcn/lucide)
import { logout } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 🍔 mobile menu state
  const userInfo = useSelector((state) => state.profile.data);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!userInfo) {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (token) {
        dispatch(fetchUserProfile());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    dispatch(logout()); // clears auth + localStorage
    dispatch(clearProfile()); // clears profile Redux state
    setDropdownOpen(false);
    navigate("/", { replace: true });
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Food", path: "/food" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  console.log("Navbar profile:", userInfo);

  return (
    <nav className="sticky top-0 z-50 bg-[#fef1e1] md:shadow-none shadow sm:px-20">
      <div className="flex justify-between items-center w-full px-6 py-3">
        {/* --- Logo --- */}
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={logo} className="w-[45px] aspect-square" alt="logo" />
            <div className="text-[#cc2405] text-2xl font-semibold t-1">
              Fit Dish
            </div>
          </div>
        </Link>

        {/* --- Desktop Links --- */}
        <div className="hidden md:flex gap-8">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative text-2xl text-[#A69A82] font-medium transition-all duration-300 ease-in-out hover:text-[#cc2405] after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-[#cc2405] after:left-0 after:bottom-[-4px] after:transition-all after:duration-300 hover:after:w-full t-1"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* --- Right Side (Desktop) --- */}
        <div className="hidden md:block relative">
          {!userInfo ? (
            <Link
              to="/login"
              className="text-gray-700 font-medium px-4 py-2 rounded-full text-lg bg-white border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
            >
              Log In
            </Link>
          ) : (
            <div className="relative">
              <img
                src={userInfo?.profileImage || profileImg}
                alt="profile"
                className="w-[45px] h-[45px] rounded-full cursor-pointer border-2 border-blue-500 hover:border-[#cc2405] transition-all duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-50 transition-all duration-300"
                >
                  <Link
                    to="/userprofile"
                    className="px-4 py-2 text-gray-700 hover:bg-[#cc2405] hover:text-white transition-all duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 hover:bg-[#cc2405] hover:text-white text-left transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- Mobile Menu Button --- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg border border-[#cc2405] text-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {menuOpen && (
        <div className="md:hidden bg-[#fef1e1] flex flex-col items-center gap-4 py-4 border-t border-[#cc2405]/20 animate-slideDown">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-lg text-gray-700 hover:text-[#cc2405] font-medium transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!userInfo ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium px-4 py-2 rounded-full text-lg bg-white border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
            >
              Login 
            </Link>
          ) : (
            <>
              <Link
                to="/userprofile"
                className=" px-4 py-1 text-2xl border border-[#cc2405] bg-white rounded-full"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-white font-medium px-4 py-2 rounded-full text-lg bg-[#cc2405] border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
