import React, { useState } from "react";
import FoodCards from "../Food/FoodCards";
import veganfood from "../../images/veganfood.jpg";
import foodItems from "../../assets/Assests"

// const foodItems = [
//   {
//     imgename: "Grilled Chicken Salad",

//     describe: "High protein, low carb, fiber rich",
//     type: "nonveg",
//   },
//   {
//     imgename: "Apple",
//     image: Apple,
//     describe: "High fiber, immune boost",
//     type: "veg",
//   },
//   {
//     imgename: "Boiled Egg",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
//     describe: "Everyday healthy routines",
//     type: "nonveg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1604908176917-35c9fdfb08b8",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36",
//     describe: "Description",
//     type: "nonveg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
//   {
//     imgename: "Item Name",
//     image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
//     describe: "Description",
//     type: "veg",
//   },
// ];



const Food = () => {
  return (
    <div className="min-h-screen py-2 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-16 py-6 md:py-8 space-y-4 md:space-y-0">
        <div className="text-6xl t-1 md:text-5xl font-bold text-red-600 text-center md:text-left">
          Healthy Food
        </div>

        <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="flex justify-center w-full">
          <div className="relative w-full sm:w-64 md:w-72">
            <input
              type="text"
              placeholder="Search..."
              class="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button class="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              Search
            </button>
          </div>
          </div>
          

          <button class="hidden sm:block  bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        {foodItems.map((item, index) => (
          <FoodCards
            key={index}
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