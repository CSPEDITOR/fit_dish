// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/admin";

// export default function AdminUsers() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//  const fetchUsers = async () => {
//   try {
//     const response = await API.get("/api/users/alluser");
//     console.log("API Response:", response);
//     console.log("Response data:", response.data);
    
//     // Handle different response structures
//     if (Array.isArray(response.data)) {
//       setUsers(response.data);
//     } else if (response.data && Array.isArray(response.data.data)) {
//       setUsers(response.data.data);
//     } else if (response.data && Array.isArray(response.data.users)) {
//       setUsers(response.data.users);
//     } else {
//       console.error("Unexpected response format:", response.data);
//       setUsers([]); // Set empty array as fallback
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     setUsers([]); // Set empty array on error
//   } finally {
//     setLoading(false);
//   }
// };

//   const filteredUsers = users.filter(user =>
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const logout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   if (selectedUser) {
//     return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
//   }

//   return (
//     <div className="min-h-screen bg-[#FEF1E1]">
//       {/* Navigation Header */}
//       <nav className="bg-[#CC2405] shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center space-x-8">
//               <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => navigate("/admin/dashboard")}
//                   className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
//                 >
//                   Dashboard
//                 </button>
//                 <button className="text-white bg-[#B02004] px-3 py-2 rounded-md transition duration-200">
//                   Users
//                 </button>
//                 <button
//                   onClick={() => navigate("/add-food")}
//                   className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
//                 >
//                   Add Food
//                 </button>
//                 <button
//                   onClick={() => navigate("/add-disease")}
//                   className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
//                 >
//                   Add Disease
//                 </button>
//               </div>
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
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
//             <p className="text-gray-600 mt-2">Manage all registered users in the system</p>
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold text-[#CC2405]">{users.length}</p>
//             <p className="text-gray-600">Total Users</p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <div className="flex items-center space-x-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search users by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC2405] focus:border-transparent"
//               />
//             </div>
//             <button
//               onClick={fetchUsers}
//               className="px-6 py-3 bg-[#CC2405] text-white rounded-lg hover:bg-[#B02004] transition duration-200 flex items-center space-x-2"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC2405]"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Contact
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Profile
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => (
//                     <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             {user.profileImage ? (
//                               <img
//                                 className="h-10 w-10 rounded-full object-cover"
//                                 src={user.profileImage}
//                                 alt={user.name}
//                               />
//                             ) : (
//                               <div className="h-10 w-10 rounded-full bg-[#CC2405] flex items-center justify-center">
//                                 <span className="text-white font-medium text-sm">
//                                   {user.name?.charAt(0).toUpperCase() || 'U'}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {user.name || 'No Name'}
//                             </div>
//                             <div className="text-sm text-gray-500 capitalize">
//                               {user.role || 'user'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{user.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {user.age ? `${user.age} yrs` : "Not set"}
//                         </div>
//                         <div className="text-sm text-gray-500 capitalize">
//                           {user.gender || "Not specified"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           Active
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => setSelectedUser(user)}
//                           className="text-[#CC2405] hover:text-[#B02004] font-semibold mr-4"
//                         >
//                           View Details
//                         </button>
//                         <button className="text-red-600 hover:text-red-800 font-semibold">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {!loading && filteredUsers.length === 0 && (
//             <div className="text-center py-12">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {searchTerm ? "Try adjusting your search term" : "No users registered yet"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // User Details Component
// function UserDetails({ user, onBack }) {
//   return (
//     <div className="min-h-screen bg-[#FEF1E1]">
//       {/* Navigation Header */}
//       <nav className="bg-[#CC2405] shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center space-x-8">
//               <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//               <button
//                 onClick={onBack}
//                 className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200 flex items-center space-x-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span>Back to Users</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* User Profile Header */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
//           <div className="flex items-center space-x-6">
//             <div className="flex-shrink-0">
//               {user.profileImage ? (
//                 <img
//                   className="h-24 w-24 rounded-full object-cover border-4 border-[#FEF1E1] shadow-md"
//                   src={user.profileImage}
//                   alt={user.name}
//                 />
//               ) : (
//                 <div className="h-24 w-24 rounded-full bg-[#CC2405] flex items-center justify-center border-4 border-[#FEF1E1] shadow-md">
//                   <span className="text-white font-bold text-2xl">
//                     {user.name?.charAt(0).toUpperCase() || 'U'}
//                   </span>
//                 </div>
//               )}
//             </div>
//             <div className="flex-1">
//               <h1 className="text-3xl font-bold text-gray-800">{user.name || 'No Name'}</h1>
//               <p className="text-lg text-gray-600 mt-1">{user.email}</p>
//               <div className="flex items-center space-x-4 mt-3">
//                 <span className="px-3 py-1 bg-[#CC2405] text-white rounded-full text-sm font-medium capitalize">
//                   {user.role || 'user'}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   Joined {new Date(user.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Personal Information */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               Personal Information
//             </h2>
//             <div className="space-y-4">
//               <div className="flex justify-between py-2 border-b border-gray-100">
//                 <span className="font-medium text-gray-600">Gender</span>
//                 <span className="text-gray-900 capitalize">{user.gender || "Not specified"}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-100">
//                 <span className="font-medium text-gray-600">Age</span>
//                 <span className="text-gray-900">{user.age ? `${user.age} years` : "Not set"}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-100">
//                 <span className="font-medium text-gray-600">Weight</span>
//                 <span className="text-gray-900">{user.weight ? `${user.weight} kg` : "Not set"}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-100">
//                 <span className="font-medium text-gray-600">Height</span>
//                 <span className="text-gray-900">{user.height ? `${user.height} cm` : "Not set"}</span>
//               </div>
//               <div className="flex justify-between py-2">
//                 <span className="font-medium text-gray-600">Food Preference</span>
//                 <span className="text-gray-900 capitalize">{user.foodType || "Not specified"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Health Information */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//               Health Information
//             </h2>
            
//             {/* Diseases */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-700 mb-3">Diseases</h3>
//               {user.disease && user.disease.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {user.disease.map((disease, index) => (
//                     <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
//                       {disease.name}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-sm">No diseases recorded</p>
//               )}
//             </div>

//             {/* Avoid Foods */}
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-3">Foods to Avoid</h3>
//               {user.avoidFood && user.avoidFood.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {user.avoidFood.map((food, index) => (
//                     <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//                       {food.name}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-sm">No specific food restrictions</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Account Information */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             Account Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex justify-between py-2">
//               <span className="font-medium text-gray-600">Account Created</span>
//               <span className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
//             </div>
//             <div className="flex justify-between py-2">
//               <span className="font-medium text-gray-600">Last Updated</span>
//               <span className="text-gray-900">{new Date(user.updatedAt).toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/admin";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/api/users/alluser");
      console.log("Full API Response:", response);
      console.log("Response data:", response.data);
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = Array.isArray(users) 
    ? users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  if (selectedUser) {
    return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#FEF1E1]">
      {/* Navigation Header */}
      <nav className="bg-[#CC2405] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200"
                >
                  Dashboard
                </button>
                <button className="text-white bg-[#B02004] px-3 py-2 rounded-md transition duration-200">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
            <p className="text-gray-600 mt-2">Manage all registered users in the system</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#CC2405]">{Array.isArray(users) ? users.length : 0}</p>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC2405] focus:border-transparent"
              />
            </div>
            <button
              onClick={fetchUsers}
              className="px-6 py-3 bg-[#CC2405] text-white rounded-lg hover:bg-[#B02004] transition duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC2405]"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.profileImage ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={user.profileImage}
                                  alt={user.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-[#CC2405] flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name || 'No Name'}
                              </div>
                              <div className="text-sm text-gray-500 capitalize">
                                {user.role || 'user'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.age ? `${user.age} yrs` : "Not set"}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {user.gender || "Not specified"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-[#CC2405] hover:text-[#B02004] font-semibold mr-4"
                          >
                            View Details
                          </button>
                          <button className="text-red-600 hover:text-red-800 font-semibold">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search term" : "No users registered yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// User Details Component (keep this part the same)
function UserDetails({ user, onBack }) {
  return (
    <div className="min-h-screen bg-[#FEF1E1]">
      {/* Navigation Header */}
      <nav className="bg-[#CC2405] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <button
                onClick={onBack}
                className="text-white hover:bg-[#B02004] px-3 py-2 rounded-md transition duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Users</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* User Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {user.profileImage ? (
                <img
                  className="h-24 w-24 rounded-full object-cover border-4 border-[#FEF1E1] shadow-md"
                  src={user.profileImage}
                  alt={user.name}
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-[#CC2405] flex items-center justify-center border-4 border-[#FEF1E1] shadow-md">
                  <span className="text-white font-bold text-2xl">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{user.name || 'No Name'}</h1>
              <p className="text-lg text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="px-3 py-1 bg-[#CC2405] text-white rounded-full text-sm font-medium capitalize">
                  {user.role || 'user'}
                </span>
                <span className="text-sm text-gray-500">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Gender</span>
                <span className="text-gray-900 capitalize">{user.gender || "Not specified"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Age</span>
                <span className="text-gray-900">{user.age ? `${user.age} years` : "Not set"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Weight</span>
                <span className="text-gray-900">{user.weight ? `${user.weight} kg` : "Not set"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Height</span>
                <span className="text-gray-900">{user.height ? `${user.height} cm` : "Not set"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-600">Food Preference</span>
                <span className="text-gray-900 capitalize">{user.foodType || "Not specified"}</span>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Health Information
            </h2>
            
            {/* Diseases */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Diseases</h3>
              {user.disease && user.disease.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.disease.map((disease, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {disease.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No diseases recorded</p>
              )}
            </div>

            {/* Avoid Foods */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Foods to Avoid</h3>
              {user.avoidFood && user.avoidFood.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.avoidFood.map((food, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {food.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No specific food restrictions</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#CC2405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">Account Created</span>
              <span className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">Last Updated</span>
              <span className="text-gray-900">{new Date(user.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}