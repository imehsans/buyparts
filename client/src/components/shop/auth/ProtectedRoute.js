import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const ProtectedRoute = () => {
  return isAuthenticate() && !isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
