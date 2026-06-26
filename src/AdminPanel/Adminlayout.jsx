import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.root}>
      {/* Fixed top navbar */}
      <AdminNavbar />

      {/* Fixed left sidebar (handles its own responsive open/close) */}
      <AdminSidebar />

      {/* Main content — full width on mobile, offset on desktop */}
      <main
        style={{
          ...styles.main,
          marginLeft: isMobile ? 0 : 220,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    fontFamily: "Inter, sans-serif",
  },
  main: {
    marginTop: 64,
    padding: "32px 28px",
    minHeight: "calc(100vh - 64px)",
    transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};