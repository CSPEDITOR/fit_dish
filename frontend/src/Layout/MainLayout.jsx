import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-4"> {/* Space for navbar height */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
