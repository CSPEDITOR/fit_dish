import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MainLayout from "./Layout/MainLayout";
import Categories from "./pages/Categories/Categories";
import Food from "./pages/Food/Food";
import AboutUs from "./pages/Aboutus/AboutUs";
// 👈 new layout

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/food" element={<Food />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
