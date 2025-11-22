


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../redux/foodSlice";
import FoodCards from "../Food/FoodCards";

const Food = () => {
  const dispatch = useDispatch();

  const { list: foods, loading, error } = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-2 px-4">
      {/* HEADER SECTION — unchanged */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-16 py-6 md:py-8 space-y-4 md:space-y-0">
        <div className="text-6xl t-1 md:text-5xl font-bold text-red-600 text-center md:text-left">
          Healthy Food
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="flex justify-center w-full">
            <div className="relative w-full sm:w-64 md:w-72">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>

          <button className="hidden sm:block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            Filter
          </button>
        </div>
      </div>

      {/* FOOD LIST */}
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && (
        <p className="text-center text-red-600 text-lg">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {foods.map((item) => (
          <FoodCards
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            description={item.description}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Food;
