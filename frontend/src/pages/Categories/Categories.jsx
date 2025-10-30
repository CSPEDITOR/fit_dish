import React from "react";
import { motion } from "framer-motion";
import veganfood from "../../images/veganfood.jpg"

const categories = [
  {
    title: "Weight Gain",
    image: veganfood,
    desc: "High-calorie healthy meal plans",
  },
  {
    title: "Weight Loss",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    desc: "Low-calorie, balanced diet ideas",
  },
  {
    title: "Normal Diet",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    desc: "Everyday healthy routines",
  },
  {
    title: "Vegetarian",
    image: "https://images.unsplash.com/photo-1604908176917-35c9fdfb08b8",
    desc: "Plant-based clean meals",
  },
  {
    title: "Non-Vegetarian",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36",
    desc: "Protein-rich food options",
  },
  {
    title: "Detox / Cleanse",
    image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1",
    desc: "Natural detox drinks & plans",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Explore Categories
        </h1>
        <p className="text-gray-500 text-lg">
          Choose your goal and discover tailored food & fitness routines
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {cat.title}
              </h2>
              <p className="text-gray-600 mb-3">{cat.desc}</p>
              <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                View Plans
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
