// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const ManageFoods = () => {
//   const [foods, setFoods] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState("all");
//   const [sortBy, setSortBy] = useState("name");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeFood, setActiveFood] = useState(null);
//   const itemsPerPage = 8;

//   // Mock data with more details for premium UI
//   const mockFoods = [
//     {
//       _id: "1",
//       name: "Truffle Pasta",
//       type: "veg",
//       image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop",
//       description: "Creamy pasta with black truffle and parmesan",
//       price: 24.99,
//       available: true,
//       category: "Italian",
//       rating: 4.8,
//       prepTime: "25 min"
//     },
//     {
//       _id: "2",
//       name: "Grilled Salmon",
//       type: "non-veg",
//       image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w-400&h=400&fit=crop",
//       description: "Atlantic salmon with lemon butter sauce",
//       price: 32.50,
//       available: true,
//       category: "Seafood",
//       rating: 4.9,
//       prepTime: "20 min"
//     },
//     {
//       _id: "3",
//       name: "Mushroom Risotto",
//       type: "veg",
//       image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop",
//       description: "Arborio rice with wild mushrooms",
//       price: 18.75,
//       available: true,
//       category: "Italian",
//       rating: 4.5,
//       prepTime: "30 min"
//     },
//     {
//       _id: "4",
//       name: "Beef Wellington",
//       type: "non-veg",
//       image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop",
//       description: "Premium beef wrapped in puff pastry",
//       price: 45.00,
//       available: false,
//       category: "French",
//       rating: 4.9,
//       prepTime: "45 min"
//     },
//     {
//       _id: "5",
//       name: "Caesar Salad",
//       type: "veg",
//       image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop",
//       description: "Fresh romaine with caesar dressing",
//       price: 14.50,
//       available: true,
//       category: "Salads",
//       rating: 4.3,
//       prepTime: "15 min"
//     },
//     {
//       _id: "6",
//       name: "Lamb Chops",
//       type: "non-veg",
//       image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop",
//       description: "Herb crusted lamb with mint sauce",
//       price: 38.75,
//       available: true,
//       category: "Mediterranean",
//       rating: 4.7,
//       prepTime: "35 min"
//     },
//     {
//       _id: "7",
//       name: "Vegetable Curry",
//       type: "veg",
//       image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=400&fit=crop",
//       description: "Spicy Indian vegetable curry",
//       price: 16.99,
//       available: true,
//       category: "Indian",
//       rating: 4.6,
//       prepTime: "25 min"
//     },
//     {
//       _id: "8",
//       name: "Chicken Tikka",
//       type: "non-veg",
//       image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop",
//       description: "Tandoori grilled chicken",
//       price: 22.50,
//       available: true,
//       category: "Indian",
//       rating: 4.8,
//       prepTime: "30 min"
//     }
//   ];

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setFoods(mockFoods);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   // Filter and sort foods
//   const filteredFoods = foods.filter(food => {
//     const matchesSearch = food.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           food.description?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = selectedType === "all" || food.type === selectedType;
//     return matchesSearch && matchesType;
//   }).sort((a, b) => {
//     if (sortBy === "name") return a.name?.localeCompare(b.name);
//     if (sortBy === "price") return b.price - a.price;
//     if (sortBy === "rating") return b.rating - a.rating;
//     return 0;
//   });

//   // Pagination calculations
//   const indexLast = currentPage * itemsPerPage;
//   const indexFirst = indexLast - itemsPerPage;
//   const currentFoods = Array.isArray(filteredFoods) ? filteredFoods.slice(indexFirst, indexLast) : [];
//   const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

//   const handleDelete = async (id) => {
//     setFoods((prev) => prev.filter((f) => f._id !== id));
//     setShowDeleteConfirm(null);
//   };

//   const handleDeleteClick = (id, name) => {
//     setShowDeleteConfirm({ id, name });
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const getPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }
    
//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(i);
//     }
    
//     return buttons;
//   };

//   // Calculate food stats
//   const totalFoods = filteredFoods.length;
//   const vegCount = filteredFoods.filter(f => f.type === "veg").length;
//   const nonVegCount = filteredFoods.filter(f => f.type === "non-veg").length;
//   const totalValue = filteredFoods.reduce((sum, food) => sum + (food.price || 0), 0);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, selectedType, sortBy]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FEF1E1]/30 p-4 md:p-6">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#CC2405]/10 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FEF1E1] to-transparent rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//             <div className="mb-6 md:mb-0">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-10 h-10 bg-gradient-to-br from-[#CC2405] to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-xl">F</span>
//                 </div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#CC2405] bg-clip-text text-transparent">
//                   Food Management
//                 </h1>
//               </div>
//               <p className="text-gray-600 ml-14">Manage your restaurant's menu with elegance</p>
//             </div>
            
//             <Link
//               to="/add-food"
//               className="group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-[#CC2405] to-orange-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-lg hover:-translate-y-1"
//             >
//               <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//               <div className="relative flex items-center gap-3">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 <span className="font-semibold">Add New Food</span>
//               </div>
//             </Link>
//           </div>

//           {/* Enhanced Stats Cards with Glass Morphism */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
//             <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
//               <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#CC2405]/20 to-transparent rounded-full"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-gray-500 text-sm font-medium">Total Foods</p>
//                   <div className="p-3 bg-gradient-to-br from-[#CC2405]/10 to-[#FEF1E1] rounded-2xl">
//                     <div className="w-8 h-8 bg-gradient-to-br from-[#CC2405] to-orange-600 rounded-xl flex items-center justify-center">
//                       <span className="text-white font-bold">F</span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-4xl font-bold text-gray-900 mb-2">{totalFoods}</p>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-[#CC2405] to-orange-600 rounded-full" style={{width: '100%'}}></div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
//               <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-gray-500 text-sm font-medium">Vegetarian</p>
//                   <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-100 rounded-2xl">
//                     <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-4xl font-bold text-emerald-600 mb-2">{vegCount}</p>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" 
//                        style={{width: `${(vegCount/totalFoods)*100 || 0}%`}}></div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
//               <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-gray-500 text-sm font-medium">Non-Vegetarian</p>
//                   <div className="p-3 bg-gradient-to-br from-rose-500/10 to-rose-100 rounded-2xl">
//                     <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-4xl font-bold text-rose-600 mb-2">{nonVegCount}</p>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full" 
//                        style={{width: `${(nonVegCount/totalFoods)*100 || 0}%`}}></div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
//               <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full"></div>
//               <div className="relative">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-gray-500 text-sm font-medium">Total Value</p>
//                   <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-100 rounded-2xl">
//                     <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
//                       <span className="text-white font-bold">$</span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-4xl font-bold text-amber-600 mb-2">${totalValue.toFixed(2)}</p>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{width: '100%'}}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls Card with Premium Design */}
//         <div className="mb-8">
//           <div className="bg-gradient-to-r from-white via-white to-[#FEF1E1]/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60 mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//               <div className="w-2 h-8 bg-gradient-to-b from-[#CC2405] to-orange-500 rounded-full"></div>
//               Filter & Search
//             </h2>
            
//             <div className="flex flex-col lg:flex-row gap-6">
//               <div className="flex-1">
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#CC2405]/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                   <div className="relative">
//                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search by food name, description, or category..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-14 pr-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 text-gray-700 placeholder-gray-400"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="relative group">
//                   <select 
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className="w-full px-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 appearance-none text-gray-700 font-medium"
//                   >
//                     <option value="all">All Types</option>
//                     <option value="veg">Vegetarian Only</option>
//                     <option value="non-veg">Non-Vegetarian Only</option>
//                   </select>
//                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
                
//                 <div className="relative group">
//                   <select 
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full px-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 appearance-none text-gray-700 font-medium"
//                   >
//                     <option value="name">Sort by Name</option>
//                     <option value="price">Sort by Price</option>
//                     <option value="rating">Sort by Rating</option>
//                   </select>
//                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Table Container */}
//         <div className="bg-gradient-to-br from-white via-white to-[#FEF1E1]/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
//           <div className="px-8 pt-8 pb-4">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                 <div className="w-2 h-8 bg-gradient-to-b from-[#CC2405] to-orange-500 rounded-full"></div>
//                 Menu Items ({filteredFoods.length})
//               </h2>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                 Available
//                 <div className="w-2 h-2 bg-gray-300 rounded-full ml-4"></div>
//                 Unavailable
//               </div>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-[#FEF1E1] via-[#FEF1E1]/80 to-[#FEF1E1]/60 backdrop-blur-sm">
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Food Details</th>
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Category</th>
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Price</th>
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Rating</th>
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Status</th>
//                   <th className="text-left p-6 font-bold text-gray-700 text-lg">Actions</th>
//                 </tr>
//               </thead>
              
//               <tbody>
//                 {isLoading ? (
//                   Array.from({ length: 4 }).map((_, index) => (
//                     <tr key={index} className="border-b border-gray-100/50">
//                       <td className="p-6">
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse"></div>
//                           <div className="space-y-2">
//                             <div className="h-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-32 animate-pulse"></div>
//                             <div className="h-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-48 animate-pulse"></div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-20 animate-pulse"></div></td>
//                       <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-16 animate-pulse"></div></td>
//                       <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-12 animate-pulse"></div></td>
//                       <td className="p-6"><div className="h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl w-24 animate-pulse"></div></td>
//                       <td className="p-6">
//                         <div className="flex gap-2">
//                           <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
//                           <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : currentFoods.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center p-12">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
//                           <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                           </svg>
//                         </div>
//                         <p className="text-2xl font-bold text-gray-400 mb-2">No food items found</p>
//                         <p className="text-gray-400">Try adjusting your search criteria</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentFoods.map((food) => (
//                     <tr 
//                       key={food._id} 
//                       className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/80 hover:to-[#FEF1E1]/30 transition-all duration-300"
//                       onMouseEnter={() => setActiveFood(food._id)}
//                       onMouseLeave={() => setActiveFood(null)}
//                     >
//                       <td className="p-6">
//                         <div className="flex items-center gap-4">
//                           <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-br from-[#CC2405]/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
//                             <img
//                               src={food.image}
//                               alt={food.name}
//                               className="relative w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
//                             />
//                             <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${food.type === "veg" ? "bg-emerald-500" : "bg-rose-500"}`}>
//                               {food.type === "veg" ? (
//                                 <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                 </svg>
//                               ) : (
//                                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                               )}
//                             </div>
//                           </div>
//                           <div>
//                             <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#CC2405] transition-colors duration-300">
//                               {food.name}
//                             </h3>
//                             <p className="text-gray-600 text-sm mb-2">{food.description}</p>
//                             <div className="flex items-center gap-2">
//                               <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                                 {food.prepTime}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
                      
//                       <td className="p-6">
//                         <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-medium">
//                           {food.category}
//                         </span>
//                       </td>
                      
//                       <td className="p-6">
//                         <div className="flex items-baseline gap-1">
//                           <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                             ${food.price.toFixed(2)}
//                           </span>
//                         </div>
//                       </td>
                      
//                       <td className="p-6">
//                         <div className="flex items-center gap-2">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <svg 
//                                 key={i} 
//                                 className={`w-5 h-5 ${i < Math.floor(food.rating) ? "text-amber-400" : "text-gray-300"}`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <span className="font-bold text-gray-700">{food.rating}</span>
//                         </div>
//                       </td>
                      
//                       <td className="p-6">
//                         <div className="relative group/status">
//                           <div className={`px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 ${food.available ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700" : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500"}`}>
//                             <div className={`w-2 h-2 rounded-full ${food.available ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`}></div>
//                             {food.available ? "Available" : "Unavailable"}
//                           </div>
//                         </div>
//                       </td>
                      
//                       <td className="p-6">
//                         <div className="flex items-center gap-3">
//                           <Link
//                             to={`/edit-food/${food._id}`}
//                             className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group/edit"
//                             title="Edit"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                           </Link>
                          
//                           <button
//                             onClick={() => handleDeleteClick(food._id, food.name)}
//                             className="p-3 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group/delete"
//                             title="Delete"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
                          
//                           <button
//                             className={`p-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${activeFood === food._id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"} group-hover:opacity-100 group-hover:translate-x-0`}
//                             title="View Details"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!isLoading && filteredFoods.length > 0 && (
//             <div className="px-8 py-6 border-t border-gray-100/50">
//               <div className="flex flex-col md:flex-row items-center justify-between">
//                 <div className="text-gray-600 mb-4 md:mb-0">
//                   Showing <span className="font-bold text-gray-900">{indexFirst + 1}</span> to{" "}
//                   <span className="font-bold text-gray-900">{Math.min(indexLast, filteredFoods.length)}</span> of{" "}
//                   <span className="font-bold text-gray-900">{filteredFoods.length}</span> items
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     disabled={currentPage === 1}
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
                  
//                   {getPaginationButtons().map(page => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${currentPage === page 
//                         ? "bg-gradient-to-br from-[#CC2405] to-orange-600 text-white shadow-lg" 
//                         : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:shadow-md"}`}
//                     >
//                       {page}
//                     </button>
//                   ))}
                  
//                   <button
//                     disabled={currentPage === totalPages || totalPages === 0}
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 <div className="mt-4 md:mt-0">
//                   <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-gray-700 font-medium">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer Info */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Last updated: Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
//         </div>
//       </div>

//       {/* Premium Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-gradient-to-br from-white via-white to-[#FEF1E1]/50 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 animate-scale-in">
//             <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500/10 to-rose-100 rounded-2xl mx-auto mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//             </div>
            
//             <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">Delete Food Item</h3>
//             <p className="text-gray-600 text-center mb-8">
//               Are you sure you want to permanently delete <span className="font-bold text-[#CC2405]">"{showDeleteConfirm.name}"</span>? This action cannot be undone.
//             </p>
            
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowDeleteConfirm(null)}
//                 className="flex-1 py-4 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(showDeleteConfirm.id)}
//                 className="flex-1 py-4 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
//               >
//                 Delete Item
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scale-in {
//           0% {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.2s ease-out;
//         }
        
//         .group:hover .group-hover\\:opacity-100 {
//           opacity: 1;
//         }
        
//         .group:hover .group-hover\\:translate-x-0 {
//           transform: translateX(0);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ManageFoods;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFood, setActiveFood] = useState(null);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  // API base URL
  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch all foods from API
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/foods/`);
      
      // Check if response.data is an array, if not, try to extract data from it
      let foodData = response.data;
      
      // If response.data has a data property (common in REST APIs)
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        foodData = response.data.data;
      }
      // If response.data has a foods property
      else if (response.data && response.data.foods && Array.isArray(response.data.foods)) {
        foodData = response.data.foods;
      }
      // If it's not an array but an object, wrap it in array
      else if (foodData && !Array.isArray(foodData)) {
        console.warn("API response is not an array, converting to array:", foodData);
        foodData = [foodData];
      }
      // If it's undefined or null
      else if (!foodData) {
        console.warn("API response is empty, setting to empty array");
        foodData = [];
      }
      
      // Ensure each item has required properties
      foodData = foodData.map(item => ({
        _id: item._id || item.id || Math.random().toString(36).substr(2, 9),
        name: item.name || "Unnamed Food",
        type: item.type || "veg",
        image: item.image || "",
        description: item.description || "No description available",
        price: parseFloat(item.price || 0),
        available: item.available !== undefined ? item.available : true,
        category: item.category || "Uncategorized",
        rating: parseFloat(item.rating || 0),
        prepTime: item.prepTime || "Prep time not set"
      }));
      
      setFoods(foodData);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setError("Failed to fetch food items. Please try again.");
      setFoods([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle food deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/foods/${id}`);
      // Remove from local state
      setFoods((prev) => {
        if (!Array.isArray(prev)) return [];
        return prev.filter((f) => f._id !== id);
      });
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting food:", err);
      setError("Failed to delete food item. Please try again.");
    }
  };

  // Handle availability toggle
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/foods/${id}`, {
        available: !currentStatus
      });
      
      // Update local state
      setFoods((prev) => {
        if (!Array.isArray(prev)) return [];
        return prev.map((food) =>
          food._id === id ? { ...food, available: !currentStatus } : food
        );
      });
    } catch (err) {
      console.error("Error updating availability:", err);
      setError("Failed to update availability. Please try again.");
    }
  };

  // Filter and sort foods - Add safety checks
  const filteredFoods = (() => {
    if (!Array.isArray(foods)) {
      return [];
    }
    
    return foods
      .filter(food => {
        const matchesSearch = food.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              food.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              food.category?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === "all" || food.type === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
        if (sortBy === "price") return (b.price || 0) - (a.price || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  })();

  // Pagination calculations with safety checks
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentFoods = Array.isArray(filteredFoods) ? filteredFoods.slice(indexFirst, indexLast) : [];
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handleDeleteClick = (id, name) => {
    setShowDeleteConfirm({ id, name });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }
    
    return buttons;
  };

  // Calculate food stats with safety checks
  const totalFoods = filteredFoods.length;
  const vegCount = filteredFoods.filter(f => f.type === "veg").length;
  const nonVegCount = filteredFoods.filter(f => f.type === "non-veg").length;
  const totalValue = filteredFoods.reduce((sum, food) => sum + (food.price || 0), 0);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, sortBy]);

  // Format price
  const formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  // Get food image URL - fallback to a default image if none provided
  const getFoodImage = (food) => {
    if (food?.image) {
      return food.image;
    }
    // Default food images based on type
    if (food?.type === "non-veg") {
      return "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop";
    }
    // Default veg image
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
  };

  // Handle image error
  const handleImageError = (e, foodType) => {
    e.target.onerror = null;
    e.target.src = foodType === "non-veg" 
      ? "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop"
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FEF1E1]/30 p-4 md:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#CC2405]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FEF1E1] to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-rose-100 border-l-4 border-rose-500 rounded-r-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-rose-700 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-rose-600 hover:text-rose-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#CC2405] to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#CC2405] bg-clip-text text-transparent">
                  Food Management
                </h1>
              </div>
              <p className="text-gray-600 ml-14">Manage your restaurant's menu with real-time data</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={fetchFoods}
                className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                title="Refresh Data"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <Link
                to="/add-food"
                className="group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-[#CC2405] to-orange-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-semibold">Add New Food</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Enhanced Stats Cards with Glass Morphism */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#CC2405]/20 to-transparent rounded-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Total Foods</p>
                  <div className="p-3 bg-gradient-to-br from-[#CC2405]/10 to-[#FEF1E1] rounded-2xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#CC2405] to-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">F</span>
                    </div>
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{totalFoods}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#CC2405] to-orange-600 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Vegetarian</p>
                  <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-100 rounded-2xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-4xl font-bold text-emerald-600 mb-2">{vegCount}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" 
                       style={{width: `${(vegCount/totalFoods)*100 || 0}%`}}></div>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Non-Vegetarian</p>
                  <div className="p-3 bg-gradient-to-br from-rose-500/10 to-rose-100 rounded-2xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-4xl font-bold text-rose-600 mb-2">{nonVegCount}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full" 
                       style={{width: `${(nonVegCount/totalFoods)*100 || 0}%`}}></div>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Total Value</p>
                  <div className="p-3 bg-gradient-to-br from-amber-500/10 to-amber-100 rounded-2xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">$</span>
                    </div>
                  </div>
                </div>
                <p className="text-4xl font-bold text-amber-600 mb-2">${totalValue.toFixed(2)}</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Card with Premium Design */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white via-white to-[#FEF1E1]/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#CC2405] to-orange-500 rounded-full"></div>
              Filter & Search
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#CC2405]/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by food name, description, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 appearance-none text-gray-700 font-medium"
                  >
                    <option value="all">All Types</option>
                    <option value="veg">Vegetarian Only</option>
                    <option value="non-veg">Non-Vegetarian Only</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-6 py-4 bg-white/80 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#CC2405]/30 focus:ring-4 focus:ring-[#CC2405]/10 transition-all duration-300 appearance-none text-gray-700 font-medium"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price (High to Low)</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-gradient-to-br from-white via-white to-[#FEF1E1]/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-[#CC2405] to-orange-500 rounded-full"></div>
                Menu Items ({filteredFoods.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Available
                <div className="w-2 h-2 bg-gray-300 rounded-full ml-4"></div>
                Unavailable
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#FEF1E1] via-[#FEF1E1]/80 to-[#FEF1E1]/60 backdrop-blur-sm">
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Food Details</th>
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Category</th>
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Price</th>
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Rating</th>
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Status</th>
                  <th className="text-left p-6 font-bold text-gray-700 text-lg">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-100/50">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-48 animate-pulse"></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-20 animate-pulse"></div></td>
                      <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-16 animate-pulse"></div></td>
                      <td className="p-6"><div className="h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded w-12 animate-pulse"></div></td>
                      <td className="p-6"><div className="h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl w-24 animate-pulse"></div></td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
                          <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : currentFoods.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
                          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-400 mb-2">No food items found</p>
                        <p className="text-gray-400">
                          {foods.length === 0 ? 
                            "No food items in database. Add your first food item!" : 
                            "Try adjusting your search criteria"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentFoods.map((food) => (
                    <tr 
                      key={food._id} 
                      className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/80 hover:to-[#FEF1E1]/30 transition-all duration-300"
                      onMouseEnter={() => setActiveFood(food._id)}
                      onMouseLeave={() => setActiveFood(null)}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#CC2405]/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                            <img
                              src={getFoodImage(food)}
                              alt={food.name}
                              className="relative w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                              onError={(e) => handleImageError(e, food.type)}
                            />
                            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${food.type === "veg" ? "bg-emerald-500" : "bg-rose-500"}`}>
                              {food.type === "veg" ? (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#CC2405] transition-colors duration-300">
                              {food.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {food.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                {food.prepTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-medium">
                          {food.category}
                        </span>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            ${formatPrice(food.price)}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.floor(food.rating) ? "text-amber-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="font-bold text-gray-700">{food.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="relative group/status">
                          <button
                            onClick={() => toggleAvailability(food._id, food.available)}
                            className={`px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 w-full transition-all duration-300 ${
                              food.available 
                                ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 hover:from-emerald-100 hover:to-emerald-200" 
                                : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 hover:from-gray-100 hover:to-gray-200"
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${food.available ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`}></div>
                            {food.available ? "Available" : "Unavailable"}
                            <svg className="w-4 h-4 ml-1 opacity-0 group-hover/status:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/edit-food/${food._id}`}
                            className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group/edit"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          
                          <button
                            onClick={() => handleDeleteClick(food._id, food.name)}
                            className="p-3 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group/delete"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          
                          <Link
                            to={`/food-details/${food._id}`}
                            className={`p-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${activeFood === food._id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"} group-hover:opacity-100 group-hover:translate-x-0`}
                            title="View Details"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && filteredFoods.length > 0 && (
            <div className="px-8 py-6 border-t border-gray-100/50">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-gray-600 mb-4 md:mb-0">
                  Showing <span className="font-bold text-gray-900">{indexFirst + 1}</span> to{" "}
                  <span className="font-bold text-gray-900">{Math.min(indexLast, filteredFoods.length)}</span> of{" "}
                  <span className="font-bold text-gray-900">{filteredFoods.length}</span> items
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {getPaginationButtons().map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${currentPage === page 
                        ? "bg-gradient-to-br from-[#CC2405] to-orange-600 text-white shadow-lg" 
                        : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:shadow-md"}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Debug Info - Remove in production */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p>Debug Info:</p>
          <p>Foods data type: {Array.isArray(foods) ? 'Array' : typeof foods}</p>
          <p>Foods length: {Array.isArray(foods) ? foods.length : 'N/A'}</p>
          <p>API URL: {`${API_BASE_URL}/foods/`}</p>
        </div>
      </div>

      {/* Premium Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white via-white to-[#FEF1E1]/50 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 animate-scale-in">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500/10 to-rose-100 rounded-2xl mx-auto mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">Delete Food Item</h3>
            <p className="text-gray-600 text-center mb-8">
              Are you sure you want to permanently delete <span className="font-bold text-[#CC2405]">"{showDeleteConfirm.name}"</span>? This action cannot be undone.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-4 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm.id)}
                className="flex-1 py-4 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        .group:hover .group-hover-opacity-100 {
          opacity: 1;
        }
        
        .group:hover .group-hover-translate-x-0 {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export default ManageFoods;