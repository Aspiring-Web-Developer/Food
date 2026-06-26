import { useNavigate, Navigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";  // ← your existing file, no change needed

export default function AdminLoginPage() {
  const navigate = useNavigate();

  if (localStorage.getItem("admin_access_token")) {
    return <Navigate to="/admin/orders" replace />;
  }

  return (
    <AdminLogin
      onLoginSuccess={() => navigate("/admin/orders", { replace: true })}
    />
  );
}