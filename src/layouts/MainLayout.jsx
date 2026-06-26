import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Customer Pages/Navbar";
import Footer from "../Customer Pages/Footer";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif", overflowX: "hidden" }}>
      <Navbar onCartOpen={() => navigate("/cart")} />
      <Outlet />
      <Footer />
    </div>
  );
}     