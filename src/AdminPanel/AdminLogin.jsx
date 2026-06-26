import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

const BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE}/api/admin-auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail ?? "Login failed. Check your credentials.");
        return;
      }

      // Store token — admin token has role:"admin" baked in
      localStorage.setItem("admin_access_token", data.access);
      localStorage.setItem("admin_user", JSON.stringify(data.admin));

      onLoginSuccess?.(data.admin);

    } catch {
      setError("Could not reach server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Logo / brand */}
        <div style={s.brand}>
          <div style={s.logo}>A</div>
          <h1 style={s.title}>Adhen Foods</h1>
          <p style={s.subtitle}>Admin Panel</p>
        </div>

        {/* Error */}
        {error && (
          <div style={s.errorBox}>
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={s.form}>

          {/* Email */}
          <div style={s.fieldWrap}>
            <label style={s.label}>Email</label>
            <div style={s.inputWrap}>
              <Mail size={16} color="#9ca3af" style={s.inputIcon} />
              <input
                style={s.input}
                type="email"
                placeholder="admin@adhenfood.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div style={s.fieldWrap}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <Lock size={16} color="#9ca3af" style={s.inputIcon} />
              <input
                style={{ ...s.input, paddingRight: 40 }}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowPass((v) => !v)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

        </form>

        <p style={s.hint}>Only authorised admin accounts can log in here.</p>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "#f5f5f5",
    fontFamily: "Inter, sans-serif",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    border: "1px solid #f0f0f0",
    padding: "40px 36px",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },

  brand: { textAlign: "center", marginBottom: 32 },
  logo: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: "#E8472A", color: "#fff",
    fontSize: 24, fontWeight: 800,
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 12px",
  },
  title:    { fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 },
  subtitle: { fontSize: 13, color: "#9ca3af", margin: "4px 0 0" },

  errorBox: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#fee2e2", color: "#dc2626",
    borderRadius: 8, padding: "10px 14px",
    fontSize: 13, marginBottom: 20,
  },

  form:      { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label:     { fontSize: 13, fontWeight: 500, color: "#374151" },

  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: 12, pointerEvents: "none" },
  input: {
    width: "100%", boxSizing: "border-box",
    border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "11px 12px 11px 38px",
    fontSize: 14, color: "#111827",
    fontFamily: "Inter, sans-serif", outline: "none",
    backgroundColor: "#fff",
  },
  eyeBtn: {
    position: "absolute", right: 10,
    background: "none", border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", padding: 4,
  },

  submitBtn: {
    backgroundColor: "#E8472A", color: "#fff",
    border: "none", borderRadius: 8,
    padding: "12px", fontSize: 15, fontWeight: 600,
    cursor: "pointer", fontFamily: "Inter, sans-serif",
    marginTop: 4,
  },

  hint: { fontSize: 12, color: "#d1d5db", textAlign: "center", marginTop: 20 },
};