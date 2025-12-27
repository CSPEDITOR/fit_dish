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
import UserProfile from "./pages/UserDashbord/UserProfile";
import FoodDetail from "./pages/Food/FoodDetail";
// import Plans from "./pages/UserDashbord/Plans";
import BMI from "./pages/UserDashbord/BMI";
import Contact from "./pages/Contact/Contact";


import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import UserDashbordLayout from "./Layout/UserDashbordLayout";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import PlanCalendar from "./pages/UserDashbord/PlanCalendar";
import MealPlanCalendar from "./pages/UserDashbord/MealPlanCalendar";
import DayMealPlan from "./pages/UserDashbord/DayMealPlan";
import NutritionDashboard from "./pages/UserDashbord/NutritionDashboard";
import MyPlans from "./pages/UserDashbord/MyPlans";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/food" element={<Food />} />
          {/* <Route path="/food/:id" element={<FoodDetail />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* user dash bord */}

        {/* */}
        <Route
  element={
    <ProtectedRoute>
      <UserDashbordLayout />
    </ProtectedRoute>
  }
>
  <Route path="/userprofile" element={<UserProfile />} />
  <Route path="/plans" element={<MyPlans />} />
  <Route path="/plans/select" element={<PlanCalendar />} />
  <Route path="/plan/:planType" element={<MealPlanCalendar />} />
  <Route path="/plan/:planType/day/:day" element={<DayMealPlan />} />
  <Route path="/dashboard" element={<NutritionDashboard />} />
  <Route path="/foods" element={<Food />} />
  <Route path="/food/:id" element={<FoodDetail />} />
  <Route path="/bmi" element={<BMI />} />
</Route>






        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
