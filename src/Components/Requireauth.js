import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
