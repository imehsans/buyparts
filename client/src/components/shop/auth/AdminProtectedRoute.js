import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const AdminProtectedRoute = () => {
  return isAdmin() && isAuthenticate() ? <Outlet /> : <Navigate to="/user/profile" />;
};

export default AdminProtectedRoute;
