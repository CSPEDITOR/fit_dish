// import React from 'react'
// import logo from "../../src/images/logo.png"
// import { Link } from 'react-router'

// function Navbar() {

//   let links = [
//     {
//       name: "Home",
//       path: "/"
//     },
//     {
//       name: "Categories",
//       path: "/categories"
//     },
//     {
//       name: "Food",
//       path: "/food"
//     },
//     {
//       name: "About",
//       path: "/about"
//     }
//   ]

//   return (
//     <div className='navbar flex flex-row justify-between items-center mx-auto main-page' >
//       <div className="logo flex flex-row items-center gap-2">
//         <img src={logo} className='w-[50px] aspect-square' alt="" />
//         <div className='t-1 t-red text-2xl'>Fit Dish</div>
//       </div>
//       <div className='links flex gap-5'>
//         {
//           links.map(
//             (item, index) => {
//               return (
//                 <Link key={index+"Link"} to={item.path} className='t-1 t-gray text-2xl'>
//                   {item.name}
//                 </Link>
//               )
//             }
//           )
//         }
//       </div>
//       <div className='sign-up'>
//         <Link to="/signup" className='t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white'>
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// import React, { useState, useEffect } from "react";
// import logo from "../../src/images/logo.png";
// import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate for logout redirect
// import profileImg from "../images/default_profile_image.png"; // ✅ default profile image

// function Navbar() {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // ✅ On mount, check for token or user info in localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");
//     if (storedUser) {
//       setUserInfo(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUserInfo(null);
//     navigate("/login"); // redirect to login
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "Categories", path: "/categories" },
//     { name: "Food", path: "/food" },
//     { name: "About", path: "/about" },
//   ];

//   return (
//     <div className="navbar flex flex-row justify-between items-center mx-auto main-page z-100">
//       {/* --- Logo --- */}
//       <div className="logo flex flex-row items-center gap-2">
//         <img src={logo} className="w-[50px] aspect-square" alt="logo" />
//         <div className="t-1 t-red text-2xl">Fit Dish</div>
//       </div>

//       {/* --- Nav Links --- */}
//       <div className="links flex gap-5">
//         {links.map((item, index) => (
//           <Link
//             key={index + "Link"}
//             to={item.path}
//             className="t-1 t-gray text-2xl hover:text-red-500"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>

//       {/* --- Right Section --- */}
//       <div className="relative">
//         {!userInfo ? (
//           // ✅ Show Sign Up if no token
//           <Link
//             to="/signup"
//             className="t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white"
//           >
//             Sign Up
//           </Link>
//         ) : (
//           // ✅ Show profile dropdown
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


import React, { useState, useEffect } from "react";
import logo from "../../src/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../images/default_profile_image.png";

function Navbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // ✅ Clear user info
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setDropdownOpen(false);

    // ✅ Redirect safely after a short delay (so state updates first)
    setTimeout(() => {
      navigate("/signup", { replace: true });
    }, 100);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Food", path: "/food" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="navbar flex flex-row justify-between items-center mx-auto main-page">
      {/* --- Logo --- */}
      <div className="logo flex flex-row items-center gap-2">
        <img src={logo} className="w-[50px] aspect-square" alt="logo" />
        <div className="t-1 t-red text-2xl">Fit Dish</div>
      </div>

      {/* --- Links --- */}
      <div className="links flex gap-5">
        {links.map((item, index) => (
          <Link
            key={index + "Link"}
            to={item.path}
            className="t-1 t-gray text-2xl hover:text-red-500"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* --- Right Side (Sign Up or Profile) --- */}
      <div className="relative">
        {!userInfo ? (
          <Link
            to="/signup"
            className="t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white"
          >
            Sign Up
          </Link>
        ) : (
          <div className="relative">
            <img
              src={userInfo.image || profileImg}
              alt="profile"
              className="w-[50px] h-[50px] rounded-full cursor-pointer border-2 border-gray-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 flex flex-col z-100">
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
