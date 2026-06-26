
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Mail, ArrowLeft, ArrowRight,
  CheckCircle, Shield, Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE;

// ─── Spinning starburst background ────────────────────────────────────────────────
function StarBurst({ color = "#C98F00", opacity = 0.18 }) {
  const bars = Array.from({ length: 16 });
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}
    >
      {bars.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "50%", left: "50%",
            width: i % 3 === 0 ? 24 : 12,
            height: "60%",
            background: color,
            borderRadius: 6,
            opacity: i % 3 === 0 ? opacity * 1.4 : opacity,
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${(i / bars.length) * 360}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const inputs = useRef([]);
  const digits = value.split("");

  const handleKey = (e, idx) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      if (next[idx]) { next[idx] = ""; onChange(next.join("")); }
      else if (idx > 0) { inputs.current[idx - 1]?.focus(); }
    }
  };

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = val;
    onChange(next.join(""));
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
          whileFocus={{ scale: 1.1, borderColor: "#FFD700" }}
          style={{
            width: 44, height: 52, borderRadius: 12,
            border: `2px solid ${digits[i] ? "#FFD700" : "rgba(255,255,255,0.2)"}`,
            background: digits[i] ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.08)",
            color: "#fff", fontSize: 22, fontWeight: 700, textAlign: "center",
            outline: "none", transition: "border-color 0.2s, background 0.2s",
            caretColor: "#FFD700",
          }}
        />
      ))}
    </div>
  );
}

// ─── Timer hook ───────────────────────────────────────────────────────────────────
function useTimer(initial = 60) {
  const [t, setT] = useState(0);
  const startTimer = () => setT(initial);
  useEffect(() => {
    if (t <= 0) return;
    const id = setTimeout(() => setT(t - 1), 1000);
    return () => clearTimeout(id);
  }, [t]);
  return [t, startTimer];
}

// ─── Slide transition ─────────────────────────────────────────────────────────────
const slide = {
  initial:    (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  animate:    { x: 0, opacity: 1 },
  exit:       (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Login({ onClose, onLoginSuccess }) {
  const [step, setStep]         = useState("email");
  const [dir, setDir]           = useState(1);
  const [email, setEmail]       = useState("");
  const [otp, setOtp]           = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [timer, startTimer]     = useTimer(60);

  const go   = (next) => { setDir(1);  setError(""); setStep(next); };
  const back = (prev) => { setDir(-1); setError(""); setStep(prev); };

  // ── Step 1: Send OTP ──────────────────────────────────────────────────────
  const handleSendOTP = async () => {
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/send-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to send OTP.");
      setIsNewUser(data.is_new_user);
      startTimer();
      go("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Verify OTP + get JWT ─────────────────────────────────────────
  const handleVerifyOTP = async () => {
    if (otp.length < 6 || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "OTP verification failed.");

      // ── Store tokens + user info ──────────────────────────────────────────
      localStorage.setItem("access_token",  data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_email",    data.user.email);
      localStorage.setItem("user_id",       data.user.id);
      if (data.user.full_name) {
        localStorage.setItem("user_name", data.user.full_name);
      }

      go("done");
      
      // Fire global event so Navbar + any listener can react immediately
      const userData = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name || ""
      };
      
      window.dispatchEvent(new CustomEvent("auth-change", { 
        detail: { 
          loggedIn: true, 
          user: userData 
        } 
      }));
      
      onLoginSuccess?.(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    setOtp("");
    await handleSendOTP();
  };

  // Close on Escape
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const stepLabel = { email: "01 / EMAIL", otp: "02 / VERIFY", done: "✓ WELCOME" }[step];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)",
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, pointerEvents: "none",
        }}
      >
        <div style={{
          width: "100%", maxWidth: 440,
          background: "#111", borderRadius: 24, overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.12)",
          pointerEvents: "all", position: "relative",
        }}>

          {/* ── Yellow top band ── */}
          <div style={{
            background: "#FFD700", padding: "28px 28px 24px",
            position: "relative", overflow: "hidden", minHeight: 140,
          }}>
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <AnimatePresence mode="wait">
                  {step === "otp" && (
                    <motion.button
                      key="back"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      onClick={() => back("email")}
                      style={{ background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 12, color: "#111", fontWeight: 700 }}
                    >
                      <ArrowLeft size={14} /> Back
                    </motion.button>
                  )}
                </AnimatePresence>
                <span style={{ fontSize: 11, letterSpacing: 2, color: "#6B4F00", fontWeight: 900,
                  marginLeft: "auto", marginRight: 12 }}>
                  {stepLabel}
                </span>
                <motion.button
                  whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{ background: "rgba(0,0,0,0.12)", border: "none", cursor: "pointer",
                    width: 32, height: 32, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={16} color="#111" />
                </motion.button>
              </div>

              <motion.div key={step + "-head"} {...slide} custom={dir}>
                {step === "email" && (
                  <>
                    <h2 style={{ fontSize: "clamp(28px,6vw,40px)", color: "#111", margin: 0,
                      letterSpacing: -1, lineHeight: 1 }}>Login</h2>
                    <p style={{ fontSize: 13, color: "#6B4F00", margin: "6px 0 0" }}>
                      Enter your email to get started
                    </p>
                  </>
                )}
                {step === "otp" && (
                  <>
                    <h2 style={{ fontSize: "clamp(26px,6vw,38px)", color: "#111", margin: 0,
                      letterSpacing: -1, lineHeight: 1 }}>Check Your Email</h2>
                    <p style={{ fontSize: 13, color: "#6B4F00", margin: "6px 0 0" }}>
                      OTP sent to {email}
                    </p>
                  </>
                )}
                {step === "done" && (
                  <>
                    <h2 style={{ fontSize: "clamp(26px,6vw,38px)", color: "#111", margin: 0,
                      letterSpacing: -1, lineHeight: 1 }}>
                      {isNewUser ? "Welcome!" : "Welcome Back!"}
                    </h2>
                    <p style={{ fontSize: 13, color: "#6B4F00", margin: "6px 0 0" }}>
                      {isNewUser ? "Your account is ready" : "Good to see you again"}
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* ── Dark body ── */}
          <div style={{ padding: "28px", position: "relative", overflow: "hidden" }}>
            <StarBurst color="#E8192C" opacity={0.04} />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    background: "rgba(232,25,44,0.15)", border: "1px solid rgba(232,25,44,0.35)",
                    borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                    fontSize: 13, color: "#FF6B7A", position: "relative", zIndex: 2,
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── EMAIL STEP ── */}
            {step === "email" && (
              <motion.div key="email" {...slide} custom={dir} style={{ position: "relative", zIndex: 2 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  border: "1.5px solid rgba(255,215,0,0.35)", borderRadius: 50,
                  padding: "0 18px", background: "rgba(255,215,0,0.06)", marginBottom: 20,
                }}>
                  <Mail size={15} color="#FFD700" style={{ flexShrink: 0 }} />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                    style={{
                      border: "none", outline: "none", background: "transparent",
                      fontSize: 14, color: "#fff", width: "100%", padding: "14px 0",
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 28px rgba(232,25,44,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendOTP}
                  disabled={!email || loading}
                  style={{
                    width: "100%", padding: "15px 0",
                    background: email ? "#E8192C" : "#333",
                    color: "#fff", border: "none", borderRadius: 50,
                    fontSize: 14, letterSpacing: 2, fontWeight: 700,
                    cursor: !email ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background 0.25s, box-shadow 0.2s",
                    boxShadow: email ? "0 6px 20px rgba(232,25,44,0.28)" : "none",
                  }}
                >
                  {loading
                    ? <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} />
                    : <>SEND OTP <ArrowRight size={16} /></>}
                </motion.button>

                <p style={{ fontSize: 11, color: "#555", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                  By continuing, you agree to our{" "}
                  <span style={{ color: "#FFD700", cursor: "pointer" }}>Terms of Service</span> &{" "}
                  <span style={{ color: "#FFD700", cursor: "pointer" }}>Privacy Policy</span>
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
                  {[{ icon: Shield, label: "100% Secure" }, { icon: CheckCircle, label: "Quick Login" }].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon size={13} color="#FFD700" />
                      <span style={{ fontSize: 11, color: "#666" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── OTP STEP ── */}
            {step === "otp" && (
              <motion.div key="otp" {...slide} custom={dir} style={{ position: "relative", zIndex: 2 }}>
                <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 20 }}>
                  Enter the 6-digit code we sent to your email
                </p>

                <OtpInput value={otp} onChange={setOtp} />

                <div style={{ textAlign: "center", marginTop: 18, marginBottom: 20 }}>
                  {timer > 0 ? (
                    <motion.p
                      key={timer} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                      style={{ fontSize: 22, fontWeight: 700, color: "#FFD700", margin: 0 }}
                    >
                      00:{String(timer).padStart(2, "0")}
                    </motion.p>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      onClick={handleResend} disabled={loading}
                      style={{ background: "none", border: "none", cursor: "pointer",
                        fontSize: 13, color: "#FFD700", textDecoration: "underline" }}
                    >
                      Resend OTP
                    </motion.button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 28px rgba(232,25,44,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleVerifyOTP}
                  disabled={otp.length < 6 || loading}
                  style={{
                    width: "100%", padding: "15px 0",
                    background: otp.length === 6 ? "#E8192C" : "#333",
                    color: "#fff", border: "none", borderRadius: 50,
                    fontSize: 14, letterSpacing: 2, fontWeight: 700,
                    cursor: otp.length < 6 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background 0.25s",
                    boxShadow: otp.length === 6 ? "0 6px 20px rgba(232,25,44,0.28)" : "none",
                  }}
                >
                  {loading
                    ? <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} />
                    : <>VERIFY <CheckCircle size={16} /></>}
                </motion.button>

                {timer > 0 && (
                  <p style={{ fontSize: 11, color: "#555", textAlign: "center", marginTop: 14 }}>
                    Didn't get it? Resend available in {timer}s
                  </p>
                )}
              </motion.div>
            )}

            {/* ── DONE STEP ── */}
            {step === "done" && (
              <motion.div key="done" {...slide} custom={dir}
                style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "12px 0 8px" }}>
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #FFD700, #E6A800)",
                    marginBottom: 16, boxShadow: "0 8px 28px rgba(255,215,0,0.4)",
                  }}
                >
                  <CheckCircle size={36} color="#111" strokeWidth={2.5} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}
                >
                  You're in!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 }}
                  style={{ fontSize: 13, color: "#888", margin: "0 0 24px" }}
                >
                  Start snacking on the best makhana around
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(232,25,44,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  style={{
                    width: "100%", padding: "15px 0",
                    background: "#E8192C", color: "#fff", border: "none", borderRadius: 50,
                    fontSize: 14, letterSpacing: 2, fontWeight: 700,
                    cursor: "pointer", boxShadow: "0 6px 20px rgba(232,25,44,0.28)",
                  }}
                >
                  LET'S SHOP
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}