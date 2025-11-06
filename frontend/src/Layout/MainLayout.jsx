import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* <Navbar /> */}
        <div
          className={`sticky top-0 bg-[#fef1e1] w-screen z-50 transition-shadow duration-300 ${
            isScrolled ? "shadow-lg" : "shadow-none"
          }`}
        >
          <Navbar />
        </div>
        <div className="">
          {" "}
          {/* Space for navbar height */}
          <Outlet />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default MainLayout;
