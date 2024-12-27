import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

const Layout = () => {
  return (
    <div>
      <Header /> {/* This will display on pages with this layout */}
      
      <main>
        <Outlet /> {/* This will render the child routes (like Home) */}
      </main>
      
      <Footer /> {/* This will display on pages with this layout */}
    </div>
  );
};

export default Layout;
