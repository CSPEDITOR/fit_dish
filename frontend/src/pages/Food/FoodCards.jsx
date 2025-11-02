
import React from "react";
import { motion } from "framer-motion";
import vegIcon from "../../images/veg.png";
import nonVegIcon from "../../images/nveg.png";
import { FaArrowRight } from "react-icons/fa";

const FoodCards = ({ image, imgename, describe, type }) => {
  return (
    <motion.div
      className="bg-white  rounded-2xl overflow-hidden shadow-lg hover:shadow-1xl transition duration-300 relative"
      whileHover={{ scale: 1.03 }}
    >
      <div style={{backgroundColor:'#FBEBEB'}} >
        <img src={image} alt={imgename} className="w-auto h-40  mx-auto object-cover" />

        <div className="p-5 pb-14">
          <h2 className="text-1xl font-bold text-gray-800 mb-1">{imgename}</h2>
          <p className="text-gray-600 mb-3">{describe}</p>
        </div>

        <div className="absolute bottom-3 left-4 ">
          <button className="px-3 py-1 bg-white text-black rounded-full hover:bg-green-600 transition flex items-center space-x-3">
            <span>View</span>
            <div className="rounded-full h-8 w-8 ps-2 pt-2 pb-1 bg-red-600">
              <FaArrowRight color="white" />
            </div>
          </button>
        </div>

        <div className="absolute bottom-3 right-4">
          <img
            src={type === "veg" ? vegIcon : nonVegIcon}
            alt={type}
            className="w-6 h-6"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCards;
