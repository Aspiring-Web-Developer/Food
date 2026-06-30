import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

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
      if (!res.ok) { setError(data.detail ?? "Login failed. Check your credentials."); return; }
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        .al-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d1d5db;
          padding: 10px 0;
          font-size: 14px;
          color: #111827;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .al-input::placeholder { color: #9ca3af; font-size: 13px; }
        .al-input:focus { border-bottom-color: #E8472A; }
        .al-input[type="password"] { letter-spacing: 2px; }
        .al-input[type="password"]::placeholder { letter-spacing: 0; }
        .al-submit {
          width: 100%;
          background: #111827;
          color: #fff;
          border: none;
          padding: 14px 24px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s, opacity 0.2s;
        }
        .al-submit:hover:not(:disabled) { background: #E8472A; }
        .al-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .al-left-link {
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .al-left-link:hover { color: rgba(255,255,255,0.85); }
        @media (max-width: 768px) {
          .al-left { display: none !important; }
          .al-right { width: 100% !important; padding: 40px 28px !important; }
        }
      `}</style>

      <div style={s.page}>

        {/* ── LEFT PANEL ── */}
        <div className="al-left" style={s.left}>

          {/* Logo */}
          <div style={s.leftTop}>
            <img src="/Png-01.png" alt="Adhen Foods" style={{ height: 98, width: "auto", objectFit: "contain" }} />
          </div>

          {/* Hero text */}
          <div style={s.heroBlock}>
            <p style={s.eyebrow}>ADMIN ACCESS</p>
            <h1 style={s.headline}>
              The home of<br />
              <em>fresh operations.</em>
            </h1>
          </div>

          {/* Stats */}
          <div style={s.statsRow}>
            <div style={s.stat}>
              <span style={s.statNum}>100%</span>
              <span style={s.statLabel}>ORDER ACCURACY</span>
            </div>
            <div style={s.statDivider} />
            <div style={s.stat}>
              <span style={s.statNum}>LIVE</span>
              <span style={s.statLabel}>INVENTORY SYNC</span>
            </div>
          </div>

          {/* Footer links */}
          <div style={s.leftFooter}>
            <a href="#" className="al-left-link">Privacy</a>
            <a href="#" className="al-left-link">Support</a>
            <a href="#" className="al-left-link">© 2026 Adhen Foods</a>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="al-right" style={s.right}>
          <div style={s.formContainer}>

            {/* Header */}
            <div style={s.formHeader}>
              <p style={s.formEyebrow}>MANAGEMENT PORTAL</p>
              <p style={s.formSub}>Verification required for administrative access.</p>
            </div>

            {/* Error */}
            {error && (
              <div style={s.errorBox}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={s.form}>

              <div style={s.fieldWrap}>
                <label style={s.label}>EMAIL ADDRESS</label>
                <input
                  className="al-input"
                  type="email"
                  placeholder="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div style={s.fieldWrap}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={s.label}>PASSWORD</label>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    className="al-input"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: 32 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                    style={s.eyeBtn}
                  >
                    {showPass
                      ? <EyeOff size={15} color="#9ca3af" />
                      : <Eye size={15} color="#9ca3af" />}
                  </button>
                </div>
              </div>

              {/* <div style={s.checkRow}>
                <label style={s.checkLabel}>
                  <input type="checkbox" style={{ accentColor: "#E8472A", width: 13, height: 13 }} />
                  <span>Maintain session</span>
                </label>
              </div> */}

              <button
                type="submit"
                className="al-submit"
                disabled={loading}
                style={{ marginTop: 8 }}
              >
                <span>{loading ? "Signing in…" : "SECURE SIGN IN"}</span>
                {!loading && <span style={{ fontSize: 18, fontWeight: 300 }}>›</span>}
              </button>

            </form>

            {/* Status */}
            <div style={s.statusRow}>
              <span style={s.statusDot} />
              <span style={s.statusText}>SYSTEM STATUS: OPERATIONAL</span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Inter', sans-serif",
  },

  /* ── Left ── */
  left: {
    width: "52%",
    background: "#111111",
    display: "flex",
    flexDirection: "column",
    padding: "36px 48px",
    position: "relative",
    overflow: "hidden",
  },
  leftTop: {
    display: "flex",
    alignItems: "center",
  },
  heroBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.38)",
    fontWeight: 500,
    marginBottom: 20,
  },
  headline: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(36px, 4vw, 56px)",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.18,
    letterSpacing: "-0.5px",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    marginBottom: 48,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statNum: {
    fontSize: 22,
    fontWeight: 600,
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 500,
  },
  statDivider: {
    width: 1,
    height: 36,
    background: "rgba(255,255,255,0.12)",
  },
  leftFooter: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },

  /* ── Right ── */
  right: {
    flex: 1,
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 56px",
  },
  formContainer: {
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  formHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  formEyebrow: {
    fontSize: 11,
    letterSpacing: "0.16em",
    color: "#9ca3af",
    fontWeight: 500,
  },
  formSub: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.5,
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fee2e2",
    color: "#dc2626",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 12,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    color: "#9ca3af",
  },
  eyeBtn: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  checkRow: {
    marginTop: -8,
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#6b7280",
    cursor: "pointer",
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    borderTop: "1px solid #f3f4f6",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
    boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
  },
  statusText: {
    fontSize: 10,
    letterSpacing: "0.12em",
    color: "#9ca3af",
    fontWeight: 500,
  },
};