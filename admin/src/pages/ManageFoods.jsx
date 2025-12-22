import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      
      let foodData = response.data;
      
      // Handle different API response formats
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        foodData = response.data.data;
      } else if (response.data && response.data.foods && Array.isArray(response.data.foods)) {
        foodData = response.data.foods;
      } else if (foodData && !Array.isArray(foodData)) {
        foodData = [foodData];
      } else if (!foodData) {
        foodData = [];
      }
      
      // Format food data
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
      setFoods([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle food deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/foods/${id}`);
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

  // Filter foods
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
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  })();

  // Pagination calculations
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  // Get food image URL
  const getFoodImage = (food) => {
    if (food?.image) {
      return food.image;
    }
    return food?.type === "non-veg" 
      ? "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop"
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
  };

  // Handle image error
  const handleImageError = (e, foodType) => {
    e.target.onerror = null;
    e.target.src = foodType === "non-veg" 
      ? "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop"
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
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
              <h1 className="text-3xl font-bold text-gray-900">
                Food Management
              </h1>
              <p className="text-gray-600 mt-2">Manage your restaurant's menu</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={fetchFoods}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                title="Refresh Data"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <Link
                to="/add-food"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Food
              </Link>
            </div>
          </div>

          {/* Simple Search and Filter */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search foods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Food Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-gray-500 text-sm">Total Foods</p>
              <p className="text-2xl font-bold text-gray-900">{filteredFoods.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-gray-500 text-sm">Vegetarian</p>
              <p className="text-2xl font-bold text-emerald-600">{filteredFoods.filter(f => f.type === "Veg").length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-gray-500 text-sm">Non-Vegetarian</p>
              <p className="text-2xl font-bold text-red-600">{filteredFoods.filter(f => f.type === "non-veg").length}</p>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-700">Food Details</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                      <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                          <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : currentFoods.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="text-xl font-semibold text-gray-400 mb-2">No food items found</p>
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
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={getFoodImage(food)}
                              alt={food.name}
                              className="w-12 h-12 object-cover rounded-lg"
                              onError={(e) => handleImageError(e, food.type)}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {food.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                              {food.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                          {food.category}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <div className={`px-3 py-1 rounded-md text-sm font-medium inline-flex items-center gap-1 ${
                          food.type === "Veg" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${food.type === "Veg" ? "bg-emerald-500" : "bg-red-500"}`}></div>
                          {food.type === "Veg" ? "Veg" : "Non-Veg"}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/edit-food/${food._id}`}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          
                          <button
                            onClick={() => handleDeleteClick(food._id, food.name)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          
                          <Link
                            to={`/food-details/${food._id}`}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-gray-600 mb-4 md:mb-0">
                  Showing <span className="font-medium text-gray-900">{indexFirst + 1}</span> to{" "}
                  <span className="font-medium text-gray-900">{Math.min(indexLast, filteredFoods.length)}</span> of{" "}
                  <span className="font-medium text-gray-900">{filteredFoods.length}</span> items
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {getPaginationButtons().map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors duration-200 ${currentPage === page 
                        ? "bg-red-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Delete Food Item</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold text-red-600">"{showDeleteConfirm.name}"</span>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm.id)}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ManageFoods;