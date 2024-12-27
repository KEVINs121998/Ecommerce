import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPw";
import ResetPassword from "./Pages/ResetPw";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Layout from "./Components/Layout";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/Checkout";
import CategoryPage from "./Components/CategoryPage";
import Logout from "./Components/Logout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the fixed ProtectedRoute
import PageNotFound from "./Components/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Routes with Header and Footer */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* Redirect unmatched routes to login */}
        <Route path="*" element={  <ProtectedRoute> <PageNotFound /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
