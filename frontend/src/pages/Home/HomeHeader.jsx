import React from "react";
import dishImg from "../../images/dish1.png";
import { Link } from "react-router-dom";
import "./HomeHeader.css"; // custom styles

function HomeHeader() {
  return (
    <div className="home-header mt-8 relative w-[80%]">
      <div className="flex flex-col gap-20 sm:gap-10 sm:flex-row  items-center justify-center">
        {/* Text Section */}
        <div className="slogan w-[95vw] flex flex-col justify-center items-center sm:items-start">
          <h1 className="text-5xl md:text-5xl lg:text-8xl  text-nowrap t-2 w-fit">
            Healthy <span className="t-red">Eating is</span>
          </h1>
          <h1 className="text-5xl  md:text-5xl lg:text-8xl text-nowrap t-2 w-fit">
            <span className="t-red">an</span>{" "}
            <span className="t-orange">Important </span>Part
          </h1>
          <h1 className="text-5xl  md:text-6xl lg:text-8xl text-nowrap t-2 w-fit">of Lifestyle</h1>

          <h3 className="t-2 t-gray text-2xl my-8 text-center sm:text-start">
            We prepare delicious food for <br /> you we are always
          </h3>

          <Link to="/login">
            <button className="bg-[#cc2405] rounded-full text-white px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#cc2405] hover:border">
              Explore Now
            </button>
          </Link>
        </div>

        {/* Image + Arrows + Labels */}
        <div className="relative left-[20px] sm:left-0 w-[60%] sm:w-[40%] h-fit scale-150 flex justify-center items-center">
          <img
            src={dishImg}
            alt="Dish"
            className="w-full aspect-square rounded-full"
          />

          {/* Animated Arrows */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 400"
          >
            {/* Vitamin C */}
            <path
              d="M 150 70 L 100 20 L 20 20 L 20 18 L 17 20 L 20 22 L 20 20"
              className="animated-arrow"
              style={{ animationDelay: "0s" }}
            />
            {/* Antioxidants */}
            <path
              d="M 213 90 L 317 88 L 317 41 L 319 41 L 317 38 L 315 41 L 317 41"
              className="animated-arrow"
              style={{ animationDelay: "0.3s" }}
            />
            {/* Protein */}
            <path
              d="M 114 279 L 52 336 L 19 336 L 19 338 L 16 336 L 19 334 L 19 336"
              className="animated-arrow"
              style={{ animationDelay: "0.6s" }}
            />
            {/* Fiber */}
            <path
              d="M 274 214 L 316 337 L 344 339 L 344 341 L 347 339 L 344 337 L 344 339"
              className="animated-arrow"
              style={{ animationDelay: "0.9s" }}
            />
          </svg>

          {/* Fade-Up Labels */}
          <div
            className="absolute  top-[-10px] sm:top-[7px] left-[-40px] sm:left-[-60px] text-[12px] sm:text-sm fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Vitamin C
          </div>

          <div
            className="absolute top-[-10px] right-[-10px] sm:top-[10px] sm:right-[0px]  text-[12px] sm:text-sm  fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Antioxidants
          </div>

          <div
            className="absolute bottom-[20px] left-[-40px] sm:bottom-[50px] sm:left-[-40px] text-[12px] sm:text-sm fade-up"
            style={{ animationDelay: "1s" }}
          >
            Protein
          </div>

          <div
            className="absolute bottom-[15px] right-[-10px] sm:bottom-[45px] sm:right-[10px] text-[12px] sm:text-sm fade-up"
            style={{ animationDelay: "1.4s" }}
          >
            Fiber
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
