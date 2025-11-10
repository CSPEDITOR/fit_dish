// // import React from 'react'
// // import logo from "../../src/images/logo.png"
// // import { Link } from 'react-router'

// // function Navbar() {

// //   let links = [
// //     {
// //       name: "Home",
// //       path: "/"
// //     },
// //     {
// //       name: "Categories",
// //       path: "/categories"
// //     },
// //     {
// //       name: "Food",
// //       path: "/food"
// //     },
// //     {
// //       name: "About",
// //       path: "/about"
// //     }
// //   ]

// //   return (
// //     <div className='navbar flex flex-row justify-between items-center mx-auto main-page' >
// //       <div className="logo flex flex-row items-center gap-2">
// //         <img src={logo} className='w-[50px] aspect-square' alt="" />
// //         <div className='t-1 t-red text-2xl'>Fit Dish</div>
// //       </div>
// //       <div className='links flex gap-5'>
// //         {
// //           links.map(
// //             (item, index) => {
// //               return (
// //                 <Link key={index+"Link"} to={item.path} className='t-1 t-gray text-2xl'>
// //                   {item.name}
// //                 </Link>
// //               )
// //             }
// //           )
// //         }
// //       </div>
// //       <div className='sign-up'>
// //         <Link to="/signup" className='t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white'>
// //           Sign Up
// //         </Link>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar

// // import React, { useState, useEffect } from "react";
// // import logo from "../../src/images/logo.png";
// // import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate for logout redirect
// // import profileImg from "../images/default_profile_image.png"; // ✅ default profile image

// // function Navbar() {
// //   const navigate = useNavigate();
// //   const [userInfo, setUserInfo] = useState(null);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);

// //   // ✅ On mount, check for token or user info in localStorage
// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("userInfo");
// //     if (storedUser) {
// //       setUserInfo(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("userInfo");
// //     setUserInfo(null);
// //     navigate("/login"); // redirect to login
// //   };

// //   const links = [
// //     { name: "Home", path: "/" },
// //     { name: "Categories", path: "/categories" },
// //     { name: "Food", path: "/food" },
// //     { name: "About", path: "/about" },
// //   ];

// //   return (
// //     <div className="navbar flex flex-row justify-between items-center mx-auto main-page z-100">
// //       {/* --- Logo --- */}
// //       <div className="logo flex flex-row items-center gap-2">
// //         <img src={logo} className="w-[50px] aspect-square" alt="logo" />
// //         <div className="t-1 t-red text-2xl">Fit Dish</div>
// //       </div>

// //       {/* --- Nav Links --- */}
// //       <div className="links flex gap-5">
// //         {links.map((item, index) => (
// //           <Link
// //             key={index + "Link"}
// //             to={item.path}
// //             className="t-1 t-gray text-2xl hover:text-red-500"
// //           >
// //             {item.name}
// //           </Link>
// //         ))}
// //       </div>

// //       {/* --- Right Section --- */}
// //       <div className="relative">
// //         {!userInfo ? (
// //           // ✅ Show Sign Up if no token
// //           <Link
// //             to="/signup"
// //             className="t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white"
// //           >
// //             Sign Up
// //           </Link>
// //         ) : (
// //           // ✅ Show profile dropdown
// //           <div className="relative">
// //             <img
// //               src={userInfo.image || profileImg}
// //               alt="profile"
// //               className="w-[50px] h-[50px] rounded-full cursor-pointer border-2 border-gray-300"
// //               onClick={() => setDropdownOpen(!dropdownOpen)}
// //             />
// //             {dropdownOpen && (
// //               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-100">
// //                 <Link
// //                   to="/profile"
// //                   className="px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                   onClick={() => setDropdownOpen(false)}
// //                 >
// //                   Profile
// //                 </Link>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Navbar;


// import React, { useState, useEffect } from "react";
// import logo from "../../src/images/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import profileImg from "../images/default_profile_image.png";

// function Navbar() {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");
//     if (storedUser) {
//       setUserInfo(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     // ✅ Clear user info
//     localStorage.removeItem("userInfo");
//     setUserInfo(null);
//     setDropdownOpen(false);

//     // ✅ Redirect safely after a short delay (so state updates first)
//     setTimeout(() => {
//       navigate("/signup", { replace: true });
//     }, 100);
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "Categories", path: "/categories" },
//     { name: "Food", path: "/food" },
//     { name: "About", path: "/about" },
//   ];

//   return (
//     <div className="navbar flex flex-row justify-between items-center mx-auto main-page sticky top-0 z-100 bg-[#fef1e1] h-17 ">
//       {/* --- Logo --- */}
//       <div className="logo flex flex-row items-center gap-2">
//         <img src={logo} className="w-[50px] aspect-square" alt="logo" />
//         <div className="t-1 t-red text-2xl">Fit Dish</div>
//       </div>

//       {/* --- Links --- */}
//       <div className="links flex gap-5">
//         {links.map((item, index) => (
//           <Link
//             key={index + "Link"}
//             to={item.path}
//             className="t-1 t-gray text-2xl hover:text-red-500 hover:border-b-4"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>

//       {/* --- Right Side (Sign Up or Profile) --- */}
//       <div className="relative">
//         {!userInfo ? (
//           <Link
//             to="/signup"
//             className="t-gray t-1 px-3 py-1 rounded-full text-2xl bg-white"
//           >
//             Sign Up
//           </Link>
//         ) : (
//           <div className="relative">
//             <img
//               src={userInfo.image || profileImg}
//               alt="profile"
//               className="w-[50px] h-[50px] rounded-full cursor-pointer border-2 border-gray-300"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             />

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-100">
//                 <Link
//                   to="/profile"
//                   className="px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import logo from "../../src/images/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import profileImg from "../images/default_profile_image.png";

// function Navbar() {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");
//     if (storedUser) {
//       setUserInfo(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUserInfo(null);
//     setDropdownOpen(false);
//     setTimeout(() => navigate("/signup", { replace: true }), 100);
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "Categories", path: "/categories" },
//     { name: "Food", path: "/food" },
//     { name: "About", path: "/about" },
//   ];

//   return (
//     <div className="navbar flex flex-row justify-between items-center mx-auto main-page sticky top-0 z-50 bg-[#fef1e1] h-17 px-10">
//       {/* --- Logo --- */}
//       <Link to={"/"}>
//       <div className="logo flex flex-row items-center gap-2">
//         <img src={logo} className="w-[50px] aspect-square" alt="logo" />
//         <div className="t-1 text-[#cc2405] text-2xl font-semibold">Fit Dish</div>
//       </div>
//       </Link>

//       {/* --- Links --- */}
//       <div className="links flex gap-8">
//         {links.map((item, index) => (
//           <Link
//             key={index}
//             to={item.path}
//             className="relative text-xl text-gray-700 font-medium transition-all duration-300 ease-in-out hover:text-[#cc2405] after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-[#cc2405] after:left-0 after:bottom-[-4px] after:transition-all after:duration-300 hover:after:w-full"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>

//       {/* --- Right Side (Sign Up or Profile) --- */}
//       <div className="relative">
//         {!userInfo ? (
//           <Link
//             to="/signup"
//             className="text-gray-700 font-medium px-4 py-2 rounded-full text-xl bg-white border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
//           >
//             Sign Up
//           </Link>
//         ) : (
//           <div className="relative">
//             <img
//               src={userInfo.image || profileImg}
//               alt="profile"
//               className="w-[50px] h-[50px] rounded-full cursor-pointer border-2 border-gray-300 hover:border-[#cc2405] transition-all duration-300"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             />

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-50 transition-all duration-300">
//                 <Link
//                   to="/profile"
//                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left transition-all duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../../src/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../images/default_profile_image.png";
import { Menu, X } from "lucide-react"; // 🧭 for icons (built into shadcn/lucide)

function Navbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 🍔 mobile menu state

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setDropdownOpen(false);
    setTimeout(() => navigate("/login", { replace: true }), 100);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Food", path: "/food" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#fef1e1] md:shadow-none shadow sm:px-20">
      <div className="flex justify-between items-center w-full px-6 py-3">
        {/* --- Logo --- */}
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={logo} className="w-[45px] aspect-square" alt="logo" />
            <div className="text-[#cc2405] text-2xl font-semibold t-1">Fit Dish</div>
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
                src={userInfo.image || profileImg}
                alt="profile"
                className="w-[45px] h-[45px] rounded-full cursor-pointer border-2 border-gray-300 hover:border-[#cc2405] transition-all duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-50 transition-all duration-300">
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
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium px-4 py-2 rounded-full text-lg bg-white border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-gray-700 font-medium px-4 py-2 rounded-full text-lg bg-white border border-[#cc2405] hover:bg-[#cc2405] hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
