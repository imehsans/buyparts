import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  // Check if cart exists and is not empty
  const hasItems = cart && cart.length !== 0;
  return hasItems && isAuthenticate() ? <Outlet /> : <Navigate to="/" />;
};

export default CartProtectedRoute;
