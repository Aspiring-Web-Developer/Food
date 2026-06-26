import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";


const NAV_ITEMS = [
  // { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Orders",    icon: ShoppingCart,    path: "/admin/orders" },
  { label: "Products",  icon: Package,         path: "/admin/products" },
  // { label: "Customers", icon: Users,           path: "/admin/customers" },
  // { label: "Analytics", icon: BarChart2,       path: "/admin/analytics" },
  // { label: "Settings",  icon: Settings,        path: "/admin/settings" },
];

export default function AdminSidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

const logout = () => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_user");
  navigate("/admin/login", { replace: true });
};
  // Track viewport width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(false); // auto-close drawer state when going back to desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setOpen(false);
  }, [location.pathname, isMobile]);

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const sidebarVisible = !isMobile || open;

  return (
    <>
      {/* ── Mobile hamburger button ── */}
      {isMobile && (
        <button
          onClick={() => setOpen((v) => !v)}
          style={styles.hamburger}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} color="#111" /> : <Menu size={22} color="#111" />}
        </button>
      )}

      {/* ── Backdrop (mobile only) ── */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={styles.backdrop}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          ...styles.sidebar,
          transform: sidebarVisible ? "translateX(0)" : "translateX(-100%)",
          // Desktop: always visible, no shadow; Mobile: slide in with shadow
          boxShadow: isMobile && open ? "4px 0 24px rgba(0,0,0,0.10)" : "none",
        }}
      >
        {/* Nav items — padded below navbar height */}
        <nav style={styles.nav}>
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Red left indicator strip */}
                  <span
                    style={{
                      ...styles.activeBar,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <Icon
                    size={20}
                    style={{
                      color: isActive ? "#E8472A" : "#6b7280",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      ...styles.navLabel,
                      color: isActive ? "#111" : "#4b5563",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout pinned to bottom */}
        <button onClick={logout} style={styles.logoutBtn}>
          <LogOut size={20} style={{ color: "#6b7280" }} />
          <span style={styles.navLabel}>Logout</span>
        </button>
      </aside>
    </>
  );
}

const styles = {
  hamburger: {
    position: "fixed",
    top: 18,
    left: 16,
    zIndex: 300,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 150,
  },
  sidebar: {
    width: 220,
    backgroundColor: "#ffffff",
    // Only right border — no top border line
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 24,
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 200,
    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingTop: 80, // clears the 64px navbar
    overflowY: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 24px",
    textDecoration: "none",
    position: "relative",
    transition: "background 0.15s",
    backgroundColor: "transparent",
  },
  navItemActive: {
    backgroundColor: "#fdf4f2",
  },
  activeBar: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 4,
    height: 28,
    backgroundColor: "#E8472A",
    borderRadius: "0 4px 4px 0",
    transition: "opacity 0.15s",
  },
  navLabel: {
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    transition: "color 0.15s",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
};