// ── Add this logout function anywhere in your AdminLayout or AdminSidebar ──
//
// When the admin clicks "Logout":
//   1. Clears the token from localStorage
//   2. Navigates to /admin/login

import { useNavigate } from "react-router-dom";

// Inside your AdminLayout or AdminSidebar component:
function useAdminLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login", { replace: true });
  };

  return logout;
}

// ── Usage in AdminSidebar (add a logout button at the bottom) ──
//
// const logout = useAdminLogout();
//
// <button onClick={logout} style={{ ... }}>
//   <LogOut size={16} /> Logout
// </button>


// ── Bonus: get the logged-in admin's name in any admin component ──
export function getAdminUser() {
  try {
    return JSON.parse(localStorage.getItem("admin_user")) ?? null;
  } catch {
    return null;
  }
}
// Usage: const admin = getAdminUser();  → { id, email, full_name, is_active }