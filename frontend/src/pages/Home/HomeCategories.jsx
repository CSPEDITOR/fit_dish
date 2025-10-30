// Categories.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import cat from "../../images/cat.png"
import { Link } from "react-router";
import img1 from "../../images/1.png"
import img2 from "../../images/2.png"
import img3 from "../../images/3.png"
import img4 from "../../images/4.png"
import veg from "../../images/veg.png"
import nveg from "../../images/nveg.png"
import "./homeCategories.css"
import { FaArrowRight } from "react-icons/fa";

export const HomeCategories = () => {

  let categories = [
    {
      title: "Healthy Salad",
      time: "Breakfast",
      img_link: img1,
      veg: true,
      color: "#ED7B7E",
      link: ""
    },
    {
      title: "Oatsmeal",
      time: "Lunch",
      img_link: img2,
      veg: true,
      color: "#F98B3D",
      link: ""
    },
    {
      title: "Sprout Salad",
      time: "Breakfast",
      img_link: img3,
      veg: true,
      color: "#6EDA49",
      link: ""
    },
    {
      title: "Grilled Chicken",
      time: "Lunch",
      img_link: img4,
      veg: false,
      color: "#7B79F5",
      link: ""
    },
  ]

  let categoriesCards = categories.map(
    (item, index) => {
      return (
        <Link to={item.link} key={index + "kcfbwe"} className="relative rounded-2xl aspect-28/32 w-[25%]" style={{ backgroundColor: item.color }}>
          <img src={item.img_link} className="absolute category-card-img" alt="" />
          <div className="desc absolute bottom-0 h-[60%] bg-amgber-500 w-full">
            <h1 className="text-white text-center text-2xl">{item.title}</h1>
            <h2 className="text-white text-center ">{item.time}</h2>

            <div className="mt-4 w-[60%] mx-auto flex items-center justify-center flex-row gap-[15%]">
              <div className="view-category px-8 py-2 w-[70%] rounded-full bg-white flex items-center justify-center gap-[1vmin]">
                <p>View</p>
                <div className="aspect-square rounded-full p-[20%]" style={{backgroundColor:item.color}}><FaArrowRight color="white" /></div>
              </div>
              <img src={item.veg ? veg : nveg} className="w-[25%] aspect-square object-cover" alt="" />
            </div>
          </div>
        </Link>
      )
    }
  )

  return (
    <div className='main-page'>
      <div className="container-categories w-full aspect-[26/9] bg-contain bg-no-repeat mb-8 flex items-center justify-center" style={{ backgroundImage: `url("${cat}")` }}>
        <div className="categories w-[70%] mt-10 flex items-center justify-center gap-[5vmin]">
          {categoriesCards}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;