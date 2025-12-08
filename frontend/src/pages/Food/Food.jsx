

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../redux/foodSlice";
import FoodCards from "../Food/FoodCards";
import { motion, AnimatePresence } from "framer-motion";

const Food = () => {
  const dispatch = useDispatch();

  const { list: foods, loading, error } = useSelector((state) => state.foods);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filterType, setFilterType] = useState("all");
const [showFilterMenu, setShowFilterMenu] = useState(false);


  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.1
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const noResultsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  const applyFilters = (search, type) => {
  let filtered = foods;

  if (type !== "all") {
    filtered = filtered.filter((item) => item.type.toLowerCase() === type);
  }

  if (search.trim() !== "") {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  setFilteredFoods(filtered);
};


  return (
    <div className="min-h-screen min-w-screen py-8 px-4">
      {/* Header Section with Animations */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-16 py-6 md:py-8 space-y-4 md:space-y-0"
      >
        <motion.div 
          variants={headerVariants}
          className="text-6xl md:text-5xl font-bold text-red-600 text-center md:text-left"
        >
          Healthy Food
        </motion.div>

        <motion.div 
          variants={searchVariants}
          className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto"
        >
          <div className="flex justify-center w-full">
            <div className="relative w-full sm:w-64 md:w-72">
              <input
                type="text"
                placeholder="Search for healthy foods..."
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  const filtered = foods.filter((item) =>
                    item.name.toLowerCase().includes(val.toLowerCase())
                  );
                  setFilteredFoods(filtered);
                }}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow hover:shadow-lg w-full sm:w-auto font-medium"
          >
            Filter
          </motion.button> */}
          <motion.button 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setShowFilterMenu(!showFilterMenu)}
  className="hidden sm:block relative bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow hover:shadow-lg w-full sm:w-auto font-medium"
>
  Filter
</motion.button>

{showFilterMenu && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute bg-white shadow-lg border rounded-lg mt-57 ms-37 p-2 w-60 z-20"
  >
    <div className="flex justify-end mb-2">
      <button
        onClick={() => setShowFilterMenu(false)}
        className="text-gray-500 hover:text-red-600 text-xl leading-none"
      >
        ✕
      </button>
    </div>
    <button
      className={`w-full text-left px-3 py-2 rounded ${
        filterType === "all" ? "bg-red-100" : ""
      }`}
      onClick={() => {
        setFilterType("all");
        applyFilters(searchTerm, "all");
      }}
    >
      All
    </button>

    <button
      className={`w-full text-left px-3 py-2 rounded ${
        filterType === "veg" ? "bg-green-100" : ""
      }`}
      onClick={() => {
        setFilterType("veg");
        applyFilters(searchTerm, "veg");
      }}
    >
      Veg
    </button>

    <button
      className={`w-full text-left px-3 py-2 rounded ${
        filterType === "nonveg" ? "bg-yellow-100" : ""
      }`}
      onClick={() => {
        setFilterType("nonveg");
        applyFilters(searchTerm, "nonveg");
      }}
    >
      Non-Veg
    </button>
  </motion.div>
)}


        </motion.div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-20"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Loading delicious foods...</p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </motion.div>
      )}

      {/* No Results State */}
      {filteredFoods.length === 0 && !loading && (
        <AnimatePresence>
          <motion.div 
            variants={noResultsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 mb-6">
              <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No food found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchTerm 
                ? `No results found for "${searchTerm}". Try a different search term.`
                : "No food items available at the moment. Please check back later."}
            </p>
            {searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setFilteredFoods(foods);
                }}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Search
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Food Cards Grid with Animation */}
      {filteredFoods.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8"
        >
          <AnimatePresence>
            {filteredFoods.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="relative"
              >
                <FoodCards
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  type={item.type}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Floating Action Button for Filter on Mobile */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="sm:hidden fixed bottom-6 right-6 bg-red-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Food;