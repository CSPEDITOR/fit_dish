// import { useNavigate } from "react-router-dom";
// import API from "../api/admin";
// import { useEffect } from "react";
// import { useState } from "react";
// export default function AdminDashboard() {

//   const [foodsCount,setFoodCount] = useState(0);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

// const fetchFood = async () => {
//   try {
//     const res = await API.get("/api/foods");   // returns array of foods
//     // console.log(res.data.data.length)
//     const totalFoods = res.data.data.length; 
//     setFoodCount(totalFoods);      // count

//     // setFoodCount(totalFoods);  // if you want to store in state
//   } catch (error) {
//     console.log(error);
//   }
// };

//  useEffect(() => {
//     fetchFood();
//   }, []);



//   return (
//     <div className="min-h-screen bg-[#FEF1E1]">
//       {/* Navigation Header */}
//       <nav className="bg-[#CC2405] shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-white text-sm font-medium">Welcome, Admin</span>
//               <button
//                 className="px-6 py-2 bg-white text-[#CC2405] font-semibold rounded-lg hover:bg-gray-100 transition duration-200 shadow-md"
//                 onClick={logout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Dashboard Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405]">
//             <h3 className="text-lg font-semibold text-gray-700">Total Foods</h3>
//             <p className="text-3xl font-bold text-[#CC2405] mt-2">{foodsCount}</p>
//             <p className="text-sm text-gray-500 mt-1">Active items</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405]">
//             <h3 className="text-lg font-semibold text-gray-700">Diseases</h3>
//             <p className="text-3xl font-bold text-[#CC2405] mt-2">12</p>
//             <p className="text-sm text-gray-500 mt-1">In database</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405]">
//             <h3 className="text-lg font-semibold text-gray-700">Users</h3>
//             <p className="text-3xl font-bold text-[#CC2405] mt-2">156</p>
//             <p className="text-sm text-gray-500 mt-1">Registered users</p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <button
//               onClick={() => navigate("/add-food")}
//               className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
//             >
//               <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <span className="font-semibold text-lg">Add Food</span>
//               <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">Add new food items to the database</p>
//             </button>

//             <button
//               onClick={() => navigate("/add-disease")}
//               className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
//             >
//               <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <span className="font-semibold text-lg">Add Disease</span>
//               <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">Add new diseases and information</p>
//             </button>

//             <button
//               onClick={() => navigate("/manage-content")}
//               className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
//             >
//               <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
//                 <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </div>
//               <span className="font-semibold text-lg">Manage Content</span>
//               <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">View and edit existing content</p>
//             </button>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4 p-4 bg-[#FEF1E1] rounded-lg">
//               <div className="w-3 h-3 bg-[#CC2405] rounded-full"></div>
//               <div>
//                 <p className="font-medium">New food item added</p>
//                 <p className="text-sm text-gray-600">"Organic Quinoa" was added to the database</p>
//                 <p className="text-xs text-gray-500">2 hours ago</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4 p-4 bg-[#FEF1E1] rounded-lg">
//               <div className="w-3 h-3 bg-[#CC2405] rounded-full"></div>
//               <div>
//                 <p className="font-medium">Disease information updated</p>
//                 <p className="text-sm text-gray-600">"Diabetes" information was modified</p>
//                 <p className="text-xs text-gray-500">5 hours ago</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import API from "../api/admin";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [foodsCount, setFoodCount] = useState(0);
  const [diseasesCount, setDiseasesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const fetchFoods = async () => {
    try {
      const res = await API.get("/api/foods");
      const totalFoods = res.data.data.length;
      setFoodCount(totalFoods);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiseases = async () => {
    try {
      const res = await API.get("/api/diseases");
      const totalDiseases = res.data.length;
      setDiseasesCount(totalDiseases);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users/alluser");
      const totalUsers = res.data.data.length;
      console.log(totalUsers)
      setUsersCount(totalUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentActivity = async () => {
    // Mock recent activity - you can replace with actual API calls
    const activities = [
      {
        id: 1,
        type: "food",
        action: "added",
        item: "Organic Quinoa Salad",
        time: "2 hours ago"
      },
      {
        id: 2,
        type: "disease",
        action: "updated",
        item: "Diabetes information",
        time: "5 hours ago"
      },
      {
        id: 3,
        type: "user",
        action: "registered",
        item: "New user signup",
        time: "1 day ago"
      }
    ];
    setRecentActivity(activities);
  };

  useEffect(() => {
    fetchFoods();
    fetchDiseases();
    fetchUsers();
    fetchRecentActivity();
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF1E1]">
      {/* Navigation Header */}
      <nav className="bg-[#CC2405] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="text-white bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
                >
                  Users
                </button>
                <button
                  onClick={() => navigate("/add-food")}
                  className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
                >
                  Add Food
                </button>
                <button
                  onClick={() => navigate("/add-disease")}
                  className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
                >
                  Add Disease
                </button>
              </div>
            </div>
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

      {/* Mobile Navigation */}
      <div className="md:hidden bg-[#CC2405] p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-white bg-[#B02004] px-3 py-2 rounded-md text-sm transition duration-200"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="text-white bg-[#B02004] px-3 py-2 rounded-md text-sm transition duration-200"
          >
            Users
          </button>
          <button
            onClick={() => navigate("/add-food")}
            className="text-white bg-[#B02004] px-3 py-2 rounded-md text-sm transition duration-200"
          >
            Add Food
          </button>
          <button
            onClick={() => navigate("/add-disease")}
            className="text-white bg-[#B02004] px-3 py-2 rounded-md text-sm transition duration-200"
          >
            Add Disease
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405] hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Foods</h3>
                <p className="text-3xl font-bold text-[#CC2405] mt-2">{foodsCount}</p>
                <p className="text-sm text-gray-500 mt-1">Active items</p>
              </div>
              <div className="w-12 h-12 bg-[#FEF1E1] rounded-full flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405] hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Diseases</h3>
                <p className="text-3xl font-bold text-[#CC2405] mt-2">{diseasesCount}</p>
                <p className="text-sm text-gray-500 mt-1">In database</p>
              </div>
              <div className="w-12 h-12 bg-[#FEF1E1] rounded-full flex items-center justify-center">
                <span className="text-2xl">💊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#CC2405] hover:shadow-lg transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Users</h3>
                <p className="text-3xl font-bold text-[#CC2405] mt-2">{usersCount}</p>
                <p className="text-sm text-gray-500 mt-1">Registered users</p>
              </div>
              <div className="w-12 h-12 bg-[#FEF1E1] rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-[#CC2405] rounded-full"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/add-food")}
              className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
            >
              <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition duration-200">
                <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Add Food</span>
              <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">Add new food items</p>
            </button>

            <button
              onClick={() => navigate("/add-disease")}
              className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
            >
              <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition duration-200">
                <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Add Disease</span>
              <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">Add new diseases</p>
            </button>

            <button
              onClick={() => navigate("/admin/users")}
              className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
            >
              <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition duration-200">
                <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Manage Users</span>
              <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">View all users</p>
            </button>

            <button
              onClick={() => navigate("/manage-foods")}
              className="flex flex-col items-center justify-center p-6 bg-[#FEF1E1] border-2 border-[#CC2405] rounded-xl hover:bg-[#CC2405] hover:text-white transition duration-200 group"
            >
              <div className="w-12 h-12 bg-[#CC2405] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition duration-200">
                <svg className="w-6 h-6 text-white group-hover:text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Manage Foods</span>
              <p className="text-sm text-gray-600 group-hover:text-white mt-1 text-center">Edit existing foods</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#CC2405] rounded-full"></div>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-[#FEF1E1] rounded-lg hover:bg-[#FBEBEB] transition duration-200">
                  <div className="w-3 h-3 bg-[#CC2405] rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.item}</p>
                    <p className="text-sm text-gray-600 capitalize">{activity.type} {activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#CC2405] rounded-full"></div>
              System Status
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-700">API Server</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Online</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-700">Database</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Connected</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-700">Last Backup</span>
                <span className="text-sm text-gray-600">Today, 02:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-700">Storage Used</span>
                <span className="text-sm text-gray-600">1.2 GB / 10 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}