import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
   const token = JSON.parse(localStorage.getItem("userInfo"))?.token; // or userToken

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
