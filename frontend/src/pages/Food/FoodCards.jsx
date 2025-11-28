
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import vegIcon from "../../images/veg.png";
import nonVegIcon from "../../images/nveg.png";
import { FaArrowRight } from "react-icons/fa";

const FoodCards = ({ id, image, name, description, type }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-[#FBEBEB] rounded-2xl overflow-hidden shadow-lg hover:shadow-1xl transition duration-300 relative"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative transition duration-300 group hover:bg-[#CB3432] cursor-pointer"  onClick={() => navigate(`/food/${id}`)}>
        <img
          src={image}
          alt={name}
          className="w-auto h-40 mx-auto object-cover"
        />

        <div className="p-5 pb-14 h-52">
          <h2 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-white">
            {name}
          </h2>

          <p className="text-gray-600 mb-3 group-hover:text-white">
            {description}
          </p>
        </div>

        {/* VIEW BUTTON */}
        <motion.div
         whileHover={{ scale: 1.03 }}
        >

        <div className="absolute bottom-3 left-4">
          <button
            onClick={() => navigate(`/food/${id}`)}
            className="px-3 py-1 bg-white text-black rounded-full transition flex items-center space-x-3 cursor-pointer hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            >
            <span>View</span>
            <div className="rounded-full h-8 w-8 ps-2 pt-2 pb-1 bg-red-600">
              <FaArrowRight color="white" />
            </div>
          </button>
        </div>
            </motion.div>

        <div className="absolute bottom-3 right-4">
          <img
            src={type === "Veg" ? vegIcon : nonVegIcon}
            alt={type}
            className="w-6 h-6"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCards;

