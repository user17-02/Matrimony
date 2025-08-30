import React from "react";
import { Navigate } from "react-router-dom";

function Requireauth({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
}

export default Requireauth;
