

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Phone, User, Mail, MapPin, Home,
  ChevronLeft, ChevronRight, ShieldCheck, ArrowRight,
  CreditCard, Hash, Building2, X, Check, Plus,
  Navigation, FileText, Loader2, Star,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE;

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Step bar ─────────────────────────────────────────────────────────────────
function StepBar({ step, steps }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 24px 20px" }}>
      {steps.map((label, i) => {
        const active = i === step;
        const done   = i < step;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <motion.div
                animate={{ background: done ? "#1E5C2A" : active ? "#111" : "#e0e0e0", scale: active ? 1.12 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: 30, height: 30, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {done
                  ? <Check size={14} color="#fff" strokeWidth={2.5} />
                  : <span style={{ fontFamily: "var(--font-heading)", fontSize: 13,
                      color: active ? "#FFD700" : "#aaa" }}>{i + 1}</span>}
              </motion.div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10,
                color: active ? "#111" : done ? "#1E5C2A" : "#bbb",
                fontWeight: active || done ? 700 : 400, letterSpacing: 0.5 }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 6px", marginBottom: 18,
                background: done ? "#1E5C2A" : "#e0e0e0", borderRadius: 2, transition: "background 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, error, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
          letterSpacing: 0.8, textTransform: "uppercase", display: "block", marginBottom: 5 }}>
          {label}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        border: `1.5px solid ${error ? "#E8192C" : focused ? "#111" : "#e0e0e0"}`,
        borderRadius: 10, padding: "0 14px",
        background: "#fff", transition: "border-color 0.2s",
      }}>
        {Icon && <Icon size={15} color={focused ? "#111" : "#bbb"} />}
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-body)", fontSize: 14, color: "#111", padding: "13px 0" }}
          {...props}
        />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E8192C", margin: "4px 0 0" }}>
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Saved address card (Flipkart style) ──────────────────────────────────────
function AddressCard({ addr, selected, onSelect, onSetDefault }) {
  return (
    <motion.div whileTap={{ scale: 0.99 }} onClick={onSelect}
      style={{
        border: `1.5px solid ${selected ? "#111" : "#e0e0e0"}`,
        borderRadius: 12, padding: "14px 16px", cursor: "pointer", marginBottom: 10,
        background: selected ? "#fafafa" : "#fff",
        transition: "border-color 0.2s, background 0.2s",
        display: "flex", gap: 12, alignItems: "flex-start",
        position: "relative",
      }}>
      {/* Radio */}
      <div style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
        border: `2px solid ${selected ? "#111" : "#ccc"}`,
        background: selected ? "#111" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selected && <Check size={11} color="#FFD700" strokeWidth={3} />}
      </div>

      <div style={{ flex: 1 }}>
        {/* Label + type + default badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
          {addr.type === "Home" ? <Home size={12} color="#888" /> : <Building2 size={12} color="#888" />}
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, color: "#111" }}>
            {addr.label || addr.type}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#888",
            background: "#f0f0f0", borderRadius: 4, padding: "1px 6px" }}>
            {addr.type}
          </span>
          {addr.is_default && (
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#1E5C2A",
              background: "#E8F5E9", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>
              DEFAULT
            </span>
          )}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555",
          margin: 0, lineHeight: 1.5 }}>
          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: "2px 0 0" }}>
          {addr.city}, {addr.state} — {addr.pincode}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: "1px 0 0" }}>
          {addr.phone}
        </p>

        {/* Set as default */}
        {!addr.is_default && selected && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={(e) => { e.stopPropagation(); onSetDefault(addr.id); }}
            style={{
              marginTop: 8, fontFamily: "var(--font-body)", fontSize: 11,
              color: "#1E5C2A", background: "none", border: "1px solid #1E5C2A",
              borderRadius: 20, padding: "3px 10px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
            }}>
            <Star size={10} /> Set as default
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Success / Failed overlays ────────────────────────────────────────────────
function SuccessCheck() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <motion.circle cx="60" cy="60" r="46" stroke="#1E5C2A" strokeWidth="2" fill="none"
        initial={{ scale: 0.7, opacity: 0.5 }}
        animate={{ scale: [0.7, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
        style={{ transformOrigin: "60px 60px" }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.05 }}
        style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="60" r="44" fill="#1E5C2A" />
        <motion.path d="M40 62 L54 76 L82 46" stroke="#fff" strokeWidth="7"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }} />
      </motion.g>
    </svg>
  );
}
function FailedX() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="60" r="44" fill="#E8192C" />
        <motion.path d="M42 42 L78 78" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.3 }} />
        <motion.path d="M78 42 L42 78" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.45, duration: 0.3 }} />
      </motion.g>
    </svg>
  );
}

// ─── Main CheckoutModal ───────────────────────────────────────────────────────
export function CheckoutModal({ cartSubtotal, onClose, onSuccess }) {
  // ── Profile (prefetched) ─────────────────────────────────────────────
  const [profile, setProfile]           = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // ── Contact state ────────────────────────────────────────────────────
  const [name,     setName]    = useState("");
  const [email,    setEmail]   = useState("");
  const [phone,    setPhone]   = useState("");
  const [altPhone, setAlt]     = useState("");

  // ── Addresses (from DB) ──────────────────────────────────────────────
  const [addresses,       setAddresses]      = useState([]);
  const [addrLoading,     setAddrLoading]    = useState(true);
  const [selectedAddrId,  setSelectedAddrId] = useState(null);
  const [addingNew,       setAddingNew]      = useState(false);
  const [savingAddr,      setSavingAddr]     = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: "", type: "Home", line1: "", line2: "", city: "", state: "", pincode: "", phone: "",
  });

  // ── Delivery charge ──────────────────────────────────────────────────
  const [deliveryInfo,    setDeliveryInfo]    = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  // ── Step ─────────────────────────────────────────────────────────────
  // Steps: 0=Contact, 1=Address, 2=Payment
  // If profile already has name+phone → skip step 0 automatically
  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);
  const STEPS = ["Contact", "Address", "Payment"];

  // ── Payment/order ────────────────────────────────────────────────────
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState(null);
  const [apiError,   setApiError]   = useState("");
  const [finalTotal, setFinalTotal] = useState(null);
  const [errors,     setErrors]     = useState({});

  // ── Fetch profile + addresses on mount ───────────────────────────────
  useEffect(() => {
    // Profile
    fetch(`${API}/api/auth/profile/`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setName(data.full_name  || "");
        setEmail(data.email     || "");
        setPhone(data.phone     || "");
        // If profile is complete → jump straight to address step
        if (data.full_name && data.phone) {
          setStep(1);
        }
      })
      .catch(() => {})
      .finally(() => setProfileLoading(false));

    // Addresses
    fetch(`${API}/api/auth/addresses/`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => {
        setAddresses(data);
        const def = data.find(a => a.is_default);
        if (def) setSelectedAddrId(def.id);
        else if (data.length > 0) setSelectedAddrId(data[0].id);
      })
      .catch(() => {})
      .finally(() => setAddrLoading(false));
  }, []);

  // ── Auto-fetch delivery charge when address selected ─────────────────
  useEffect(() => {
    const addr = addresses.find(a => a.id === selectedAddrId);
    if (addr && !addingNew) fetchDeliveryCharge(addr.pincode, addr.state);
  }, [selectedAddrId, addresses, addingNew]);

  async function fetchDeliveryCharge(pincode, state) {
    if (!pincode || pincode.length !== 6 || !state) return;
    setDeliveryLoading(true);
    try {
      const res  = await fetch(`${API}/api/checkout/delivery-charge/`, {
        method: "POST", headers: authHeaders(),
        body: JSON.stringify({ pincode, state }),
      });
      const data = await res.json();
      setDeliveryInfo(res.ok ? data : null);
    } catch { setDeliveryInfo(null); }
    finally { setDeliveryLoading(false); }
  }

  // ── Validation ────────────────────────────────────────────────────────
  function validateContact() {
    const e = {};
    if (!name.trim())  e.name  = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
    if (phone.replace(/\D/g, "").length !== 10) e.phone = "10-digit mobile number";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function validateNewAddr() {
    const e = {};
    if (!newAddr.line1.trim())  e.line1    = "Street address required";
    if (!newAddr.city.trim())   e.city     = "City required";
    if (!newAddr.state.trim())  e.state    = "State required";
    if (newAddr.pincode.replace(/\D/g, "").length !== 6) e.pincode   = "6-digit pincode";
    if (newAddr.phone.replace(/\D/g, "").length !== 10)  e.addrPhone = "10-digit mobile";
    setErrors(e);
    return !Object.keys(e).length;
  }

  // ── Save contact to DB then proceed ──────────────────────────────────
  async function handleContactNext() {
    if (!validateContact()) return;
    // PATCH profile to save name+phone — user never types it again
    try {
      await fetch(`${API}/api/auth/profile/`, {
        method: "PATCH", headers: authHeaders(),
        body: JSON.stringify({ full_name: name, phone }),
      });
    } catch {}
    setErrors({});
    setDirection(1);
    setStep(1);
  }

  // ── Save new address to DB ────────────────────────────────────────────
  async function handleSaveAddress() {
    if (!validateNewAddr()) return;
    setSavingAddr(true);
    try {
      const res  = await fetch(`${API}/api/auth/addresses/`, {
        method: "POST", headers: authHeaders(),
        body: JSON.stringify(newAddr),
      });
      const data = await res.json();
      if (res.ok) {
        setAddresses(prev => [...prev, data]);
        setSelectedAddrId(data.id);
        setAddingNew(false);
        setNewAddr({ label:"", type:"Home", line1:"", line2:"", city:"", state:"", pincode:"", phone:"" });
        fetchDeliveryCharge(data.pincode, data.state);
      } else {
        setApiError(data.detail || "Could not save address.");
      }
    } catch { setApiError("Network error."); }
    finally { setSavingAddr(false); }
  }

  // ── Set default address ───────────────────────────────────────────────
  async function handleSetDefault(addrId) {
    try {
      const res  = await fetch(`${API}/api/auth/addresses/${addrId}/set-default/`, {
        method: "POST", headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        setAddresses(prev => prev.map(a => ({ ...a, is_default: a.id === addrId })));
      }
    } catch {}
  }

  // ── Navigate steps ────────────────────────────────────────────────────
  function goNext() {
    if (step === 0) { handleContactNext(); return; }
    if (step === 1 && !selectedAddrId) { setApiError("Please select or add a delivery address."); return; }
    if (step === 1 && !deliveryInfo) { setApiError("Please wait — calculating delivery charge."); return; }
    setErrors({}); setApiError(""); setDirection(1); setStep(s => s + 1);
  }

  function goBack() {
    setErrors({}); setApiError(""); setDirection(-1); setStep(s => s - 1);
  }

  // ── Razorpay loader ───────────────────────────────────────────────────
  function loadRazorpay() {
    return new Promise(resolve => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }
  console.log(window.Razorpay)

  // ── PAY — real Razorpay flow ──────────────────────────────────────────
async function handlePay() {
  setLoading(true); setApiError("");

  const addr = addresses.find(a => a.id === selectedAddrId);
  if (!addr) { setApiError("No address selected."); setLoading(false); return; }

  // 1. Create order (Razorpay only — no DB write yet)
  let orderData;
  try {
    const res = await fetch(`${API}/api/checkout/create-order/`, {
      method: "POST", headers: authHeaders(),
      body: JSON.stringify({
        customer_name:  name,
        phone:          phone,
        alt_phone:      altPhone || "",
        address_line1:  addr.line1,
        address_line2:  addr.line2 || "",
        city:           addr.city,
        state:          addr.state,
        pincode:        addr.pincode,
      }),
    });
    orderData = await res.json();
    if (!res.ok) { setApiError(orderData.detail || "Could not create order."); setLoading(false); return; }
  } catch { setApiError("Network error."); setLoading(false); return; }

  // ✅ Store final total for success screen
  setFinalTotal(orderData.total_amount);

  // 2. Load Razorpay script
  const loaded = await loadRazorpay();
  if (!loaded) { setApiError("Could not load payment gateway."); setLoading(false); return; }

  // 3. Open Razorpay widget
  const rzp = new window.Razorpay({
    key:         orderData.razorpay_key_id,
    amount:      orderData.amount,
    currency:    orderData.currency,
    name:        "Adhen Foods",
    description: "Makhana Order",
    order_id:    orderData.razorpay_order_id,
    prefill:     { name: orderData.customer_name, email, contact: orderData.phone },
    theme:       { color: "#E8192C" },

    handler: async (response) => {
      try {
        const v = await fetch(`${API}/api/checkout/verify-payment/`, {
          method: "POST", headers: authHeaders(),
          body: JSON.stringify({
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
            address: orderData.address,   // ✅ pass address back from createOrder response
          }),
        });
        const vData = await v.json();
        if (v.ok) {
          setFinalTotal(vData.total_amount); // use confirmed amount from saved order
          setResult("success");
        } else {
          setResult("failed");
        }
      } catch {
        setResult("failed");
      } finally {
        setLoading(false);
      }
    },

    modal: {
      ondismiss: () => {
        // ✅ User cancelled — nothing in DB, nothing to worry about
        setLoading(false);
      }
    },
  });

  rzp.on("payment.failed", () => { setResult("failed"); setLoading(false); });
  setLoading(false);
  rzp.open();
}

  // ── Helpers ───────────────────────────────────────────────────────────
  const selectedAddr = addresses.find(a => a.id === selectedAddrId);

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const displayTotal = deliveryInfo
    ? deliveryInfo.total.toFixed(0)
    : cartSubtotal?.toFixed(0) ?? "—";

  // ── Loading initial data ──────────────────────────────────────────────
  if (profileLoading || addrLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={36} color="#FFD700" style={{ animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", overflowY: "auto" }}
      onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        style={{ width: "100%", maxWidth: 500, position: "relative" }}
      >
        {/* Close */}
        {!loading && (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={onClose}
            style={{ position: "absolute", top: -14, right: -14, zIndex: 20,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", backdropFilter: "blur(4px)" }}>
            <X size={15} />
          </motion.button>
        )}

        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
          maxHeight: "92vh", display: "flex", flexDirection: "column" }}>

          {/* Header */}
          <div style={{ background: "#111", padding: "18px 24px 16px",
            display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {step > 0 && !loading && (
              <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }} onClick={goBack}
                style={{ background: "rgba(255,255,255,0.1)", border: "none",
                  borderRadius: "50%", width: 30, height: 30,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff", flexShrink: 0 }}>
                <ChevronLeft size={16} />
              </motion.button>
            )}
            <Lock size={15} color="#FFD700" />
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 15,
              color: "#FFD700", margin: 0, letterSpacing: 1, flex: 1 }}>CHECKOUT</p>
            <ShieldCheck size={13} color="#aaa" />
            <div style={{ background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, color: "#FFD700" }}>
                ₹{displayTotal}
              </span>
            </div>
          </div>

          {/* Step bar */}
          <div style={{ padding: "18px 24px 0", flexShrink: 0 }}>
            <StepBar step={step} steps={STEPS} />
          </div>

          {/* API error */}
          <AnimatePresence>
            {apiError && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ margin: "0 24px 8px", background: "rgba(232,25,44,0.1)",
                  border: "1px solid rgba(232,25,44,0.3)", borderRadius: 10,
                  padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: 13, color: "#E8192C" }}>
                {apiError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sliding content */}
          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            <AnimatePresence mode="wait" custom={direction}>

              {/* STEP 0 — Contact (skipped if profile complete) */}
              {step === 0 && (
                <motion.div key="contact" custom={direction} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "0 24px 24px" }}>

                  {profile?.full_name && (
                    <div style={{ background: "#E8F5E9", borderRadius: 10,
                      padding: "10px 14px", marginBottom: 14,
                      fontFamily: "var(--font-body)", fontSize: 12, color: "#1E5C2A" }}>
                      ✓ Pre-filled from your profile — edit if needed
                    </div>
                  )}

                  <Field label="Full Name" icon={User} placeholder="Deepak Sadhasivam"
                    value={name} onChange={e => setName(e.target.value)} error={errors.name} />
                  <Field label="Email Address" icon={Mail} placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Mobile" icon={Phone} placeholder="9876543210"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      error={errors.phone} />
                    <Field label="Alt. Mobile (optional)" icon={Phone} placeholder="9876543210"
                      value={altPhone}
                      onChange={e => setAlt(e.target.value.replace(/\D/g, "").slice(0, 10))} />
                  </div>
                </motion.div>
              )}

              {/* STEP 1 — Address (Flipkart-style: saved list + Add New) */}
              {step === 1 && (
                <motion.div key="address" custom={direction} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "0 24px 24px" }}>

                  {!addingNew ? (
                    <>
                      <div style={{ display: "flex", alignItems: "center",
                        justifyContent: "space-between", marginBottom: 14 }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
                          letterSpacing: 0.8, textTransform: "uppercase", margin: 0 }}>
                          Saved Addresses
                        </p>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setAddingNew(true)}
                          style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#111",
                            background: "none", border: "1.5px solid #111", borderRadius: 20,
                            padding: "4px 12px", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 5 }}>
                          <Plus size={12} /> Add New
                        </motion.button>
                      </div>

                      {addresses.length === 0 && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#aaa",
                          textAlign: "center", padding: "16px 0" }}>
                          No saved addresses yet — add one below
                        </p>
                      )}

                      {addresses.map(addr => (
                        <AddressCard key={addr.id} addr={addr}
                          selected={selectedAddrId === addr.id}
                          onSelect={() => setSelectedAddrId(addr.id)}
                          onSetDefault={handleSetDefault} />
                      ))}

                      {/* Delivery charge preview */}
                      {selectedAddr && (
                        <div style={{ background: "#F5EFD6", borderRadius: 10,
                          padding: "10px 14px", marginTop: 8,
                          fontFamily: "var(--font-body)", fontSize: 13 }}>
                          {deliveryLoading ? (
                            <span style={{ color: "#888" }}>Calculating delivery…</span>
                          ) : deliveryInfo ? (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "#555" }}>
                                Delivery ({deliveryInfo.zone})
                              </span>
                              <span style={{ fontWeight: 700, color: "#1E5C2A" }}>
                                {deliveryInfo.delivery_charge === 0
                                  ? "FREE" : `₹${deliveryInfo.delivery_charge}`}
                              </span>
                            </div>
                          ) : (
                            <span style={{ color: "#E8192C" }}>
                              Delivery not available for this pincode
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Add new address form */
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <motion.button whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }}
                          onClick={() => { setAddingNew(false); setErrors({}); }}
                          style={{ background: "#f0f0f0", border: "none", borderRadius: "50%",
                            width: 28, height: 28, display: "flex", alignItems: "center",
                            justifyContent: "center", cursor: "pointer" }}>
                          <ChevronLeft size={14} color="#555" />
                        </motion.button>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
                          letterSpacing: 0.8, textTransform: "uppercase", margin: 0 }}>
                          New Address
                        </p>
                      </div>

                      {/* Type toggle */}
                      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        {["Home", "Work", "Other"].map(t => (
                          <motion.button key={t} whileTap={{ scale: 0.95 }}
                            onClick={() => setNewAddr(p => ({ ...p, type: t }))}
                            style={{
                              border: `1.5px solid ${newAddr.type === t ? "#111" : "#e0e0e0"}`,
                              borderRadius: 20, background: newAddr.type === t ? "#111" : "#fff",
                              padding: "6px 16px", cursor: "pointer",
                              fontFamily: "var(--font-body)", fontSize: 12,
                              color: newAddr.type === t ? "#FFD700" : "#666",
                              fontWeight: newAddr.type === t ? 700 : 400,
                              display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s",
                            }}>
                            {t === "Home" && <Home size={12} color={newAddr.type === t ? "#FFD700" : "#999"} />}
                            {t === "Work" && <Building2 size={12} color={newAddr.type === t ? "#FFD700" : "#999"} />}
                            {t === "Other" && <MapPin size={12} color={newAddr.type === t ? "#FFD700" : "#999"} />}
                            {t}
                          </motion.button>
                        ))}
                      </div>

                      <Field label="Address Label" icon={FileText} placeholder="e.g. Deepak's Home"
                        value={newAddr.label} onChange={e => setNewAddr(p => ({ ...p, label: e.target.value }))} />
                      <Field label="Flat / Street / Area" icon={MapPin}
                        placeholder="55b, 9th street Thottathu salai"
                        value={newAddr.line1}
                        onChange={e => setNewAddr(p => ({ ...p, line1: e.target.value }))}
                        error={errors.line1} />
                      <Field label="Landmark (optional)" icon={Navigation}
                        placeholder="Near Arun Urology Clinic"
                        value={newAddr.line2} onChange={e => setNewAddr(p => ({ ...p, line2: e.target.value }))} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <Field label="City" icon={Building2} placeholder="Coimbatore"
                          value={newAddr.city}
                          onChange={e => setNewAddr(p => ({ ...p, city: e.target.value }))}
                          error={errors.city} />
                        <Field label="Pincode" icon={Hash} placeholder="641011"
                          value={newAddr.pincode}
                          onChange={e => setNewAddr(p => ({ ...p, pincode: e.target.value.replace(/\D/g,"").slice(0,6) }))}
                          error={errors.pincode} />
                      </div>
                      <Field label="State" icon={MapPin} placeholder="Tamil Nadu"
                        value={newAddr.state}
                        onChange={e => setNewAddr(p => ({ ...p, state: e.target.value }))}
                        error={errors.state} />
                      <Field label="Mobile for delivery" icon={Phone} placeholder="7373155787"
                        value={newAddr.phone}
                        onChange={e => setNewAddr(p => ({ ...p, phone: e.target.value.replace(/\D/g,"").slice(0,10) }))}
                        error={errors.addrPhone} />

                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={handleSaveAddress} disabled={savingAddr}
                        style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 13,
                          letterSpacing: 1.5, background: savingAddr ? "#aaa" : "#111",
                          color: "#FFD700", border: "none", borderRadius: 50,
                          padding: "14px 0", cursor: savingAddr ? "not-allowed" : "pointer",
                          marginTop: 4, display: "flex", alignItems: "center",
                          justifyContent: "center", gap: 8 }}>
                        {savingAddr
                          ? <><Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} /> SAVING…</>
                          : "SAVE ADDRESS"}
                      </motion.button>
                    </>
                  )}
                </motion.div>
              )}

              {/* STEP 2 — Payment */}
              {step === 2 && (
                <motion.div key="payment" custom={direction} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "0 24px 24px" }}>

                  {/* Address summary */}
                  {selectedAddr && (
                    <div style={{ background: "#f9f9f9", borderRadius: 10,
                      padding: "12px 14px", marginBottom: 16,
                      border: "1px solid #eee", display: "flex", gap: 10 }}>
                      <MapPin size={14} color="#1E5C2A" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
                          margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Delivering to
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#111",
                          margin: 0, fontWeight: 600 }}>
                          {name} — {selectedAddr.line1}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: 0 }}>
                          {selectedAddr.city}, {selectedAddr.state} {selectedAddr.pincode}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: "1px 0 0" }}>
                          {selectedAddr.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Order summary */}
                  <div style={{ background: "#F5EFD6", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                    {[
                      { label: "Subtotal", value: `₹${cartSubtotal?.toFixed(0) ?? "—"}` },
                      { label: `Delivery${deliveryInfo ? ` (${deliveryInfo.zone})` : ""}`,
                        value: deliveryInfo
                          ? deliveryInfo.delivery_charge === 0 ? "FREE" : `₹${deliveryInfo.delivery_charge}`
                          : "—",
                        color: deliveryInfo?.delivery_charge === 0 ? "#1E5C2A" : "#333",
                      },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666" }}>{label}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 13,
                          color: color || "#333", fontWeight: 600 }}>{value}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 8,
                      display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, color: "#111" }}>
                        Total
                      </span>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#1E5C2A" }}>
                        ₹{displayTotal}
                      </span>
                    </div>
                  </div>

                  {/* Payment method card */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10,
                    background: "#f9f9f9", borderRadius: 10, padding: "12px 14px", border: "1px solid #eee" }}>
                    <CreditCard size={16} color="#555" />
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#333",
                        margin: 0, fontWeight: 600 }}>Pay via Razorpay</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888", margin: 0 }}>
                        Card · UPI · Net Banking · Wallets
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer CTA */}
          <div style={{ padding: "12px 24px 20px", borderTop: "1px solid #f0f0f0",
            flexShrink: 0, background: "#fff" }}>
            {step < 2 ? (
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={goNext}
                style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
                  letterSpacing: 2, background: "#111", color: "#FFD700",
                  border: "none", borderRadius: 50, padding: "15px 0", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}>
                {step === 0 ? "SAVE & CONTINUE" : "CONTINUE TO PAYMENT"}
                <ChevronRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 32px rgba(232,25,44,0.4)" }}
                whileTap={{ scale: 0.97 }} onClick={handlePay}
                disabled={loading || !deliveryInfo}
                style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
                  letterSpacing: 2,
                  background: loading || !deliveryInfo ? "#aaa" : "#E8192C",
                  color: "#fff", border: "none", borderRadius: 50,
                  padding: "15px 0",
                  cursor: loading || !deliveryInfo ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, boxShadow: "0 6px 24px rgba(232,25,44,0.28)", transition: "background 0.2s" }}>
                {loading
                  ? <><Loader2 size={17} style={{ animation: "spin 0.8s linear infinite" }} /> PREPARING ORDER…</>
                  : <><Lock size={15} /> PAY ₹{displayTotal} <ArrowRight size={15} /></>}
              </motion.button>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
              gap: 5, marginTop: 10 }}>
              <ShieldCheck size={11} color="#bbb" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#bbb" }}>
                256-bit SSL · Secured by Razorpay · PCI DSS Compliant
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Result overlay */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 1100,
              background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <motion.div
              initial={{ scale: 0.7, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ background: "#fff", borderRadius: 24, padding: "40px 32px 32px",
                textAlign: "center", maxWidth: 340, width: "100%",
                boxShadow: "0 30px 80px rgba(0,0,0,0.28)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5,
                background: result === "success"
                  ? "linear-gradient(90deg,#FFD700,#1E5C2A,#FFD700)"
                  : "linear-gradient(90deg,#E8192C,#FF6B6B,#E8192C)" }} />

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                {result === "success" ? <SuccessCheck /> : <FailedX />}
              </div>

              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24,
                color: result === "success" ? "#1E5C2A" : "#E8192C",
                margin: "0 0 8px", letterSpacing: -0.5 }}>
                {result === "success" ? "Order Placed!" : "Payment Failed"}
              </h2>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666",
                margin: "0 0 20px", lineHeight: 1.6 }}>
                {result === "success"
                  ? "Your makhana is on its way. Confirmation sent to your email."
                  : "Something went wrong. Please check your details and try again."}
              </p>

              {result === "success" && finalTotal && (
                <div style={{ background: "#F5EFD6", borderRadius: 12,
                  padding: "12px 20px", marginBottom: 20 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888", margin: "0 0 2px" }}>
                    Amount paid
                  </p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 28, color: "#1E5C2A", margin: 0 }}>
                    ₹{parseFloat(finalTotal).toFixed(0)}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setResult(null); if (result === "success") onSuccess?.(); else onClose(); }}
                  style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 13,
                    letterSpacing: 2,
                    background: result === "success" ? "#E8192C" : "#111",
                    color: "#fff", border: "none", borderRadius: 50,
                    padding: "14px 0", cursor: "pointer" }}>
                  {result === "success" ? "CONTINUE SHOPPING" : "CLOSE"}
                </motion.button>
                {result === "failed" && (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setResult(null); setApiError(""); }}
                    style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 13,
                      letterSpacing: 2, background: "transparent",
                      color: "#E8192C", border: "2px solid #E8192C",
                      borderRadius: 50, padding: "12px 0", cursor: "pointer" }}>
                    TRY AGAIN
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}