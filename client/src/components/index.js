import React from "react";
import {
  Home,
  WishList,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  ContactUs,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./shop/auth/ProtectedRoute";
import AdminProtectedRoute from "./shop/auth/AdminProtectedRoute";
import CartProtectedRoute from "./shop/auth/CartProtectedRoute";

/* Routing */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/products/category/:catId"
          element={<ProductByCategory />}
        />

        {/* Cart Protected */}
        <Route element={<CartProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Admin Protected */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/dashboard/categories" element={<Categories />} />
          <Route path="/admin/dashboard/products" element={<Products />} />
          <Route path="/admin/dashboard/orders" element={<Orders />} />
        </Route>

        {/* User Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/user/setting" element={<SettingUser />} />
        </Route>

        {/* 404 - path="*" matches anything left */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
