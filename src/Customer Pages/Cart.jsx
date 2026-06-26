


import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight,
  PackageCheck, Truck, ShieldCheck, ChevronRight, Sparkles, LogIn
} from "lucide-react";
import { CheckoutModal } from "./Checkout";
import Login from "../Customer Pages/Login";

const API = import.meta.env.VITE_API_BASE;

const PERKS = [
  { icon: PackageCheck, label: "100% Natural" },
  { icon: Truck,        label: "Free delivery available" },
  { icon: ShieldCheck,  label: "Secure Checkout" },
];

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}

function isAuthenticated() {
  return !!localStorage.getItem("access_token");
}

function CounterBadge({ count }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span key={count}
        initial={{ scale: 0.4, opacity: 0, y: -6 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.4, opacity: 0, y: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          display: "inline-block", minWidth: 22, height: 22, borderRadius: "50%",
          background: "#E8192C", color: "#fff", fontSize: 11, fontWeight: 700,
          textAlign: "center", lineHeight: "22px", marginLeft: 8,
          fontFamily: "var(--font-body)",
        }}>
        {count}
      </motion.span>
    </AnimatePresence>
  );
}

function CartRow({ item, onQty, onRemove, index }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true });
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 320);
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? (removing ? { opacity: 0, x: 80, scale: 0.85 } : { opacity: 1, x: 0 }) : {}}
      transition={{ duration: removing ? 0.3 : 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
        borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#fff",
        position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: item.bg, borderRadius: "4px 0 0 4px" }} />

      <motion.div whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ width: 72, height: 72, borderRadius: 12, background: item.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, overflow: "hidden" }}>
        <img src={item.imgSrc} alt={item.name}
          style={{ height: "90%", width: "auto", objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }} />
      </motion.div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 15,
          color: "#111", margin: 0, letterSpacing: 0.3 }}>{item.name}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12,
          color: "#888", margin: "2px 0 6px" }}>
          {item.weight} · {item.tag}
        </p>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 17,
          color: "#1E5C2A", margin: 0 }}>
          ₹{(item.priceNum * item.quantity).toFixed(0)}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center",
        border: "1.5px solid #eee", borderRadius: 50, overflow: "hidden" }}>
        <motion.button whileTap={{ scale: 0.85 }}
          onClick={() => onQty(item.id, -1)}
          style={{ width: 34, height: 34, border: "none", background: "transparent",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#555" }}>
          <Minus size={14} strokeWidth={2.5} />
        </motion.button>
        <AnimatePresence mode="wait">
          <motion.span key={item.quantity}
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}
            style={{ fontFamily: "var(--font-heading)", fontSize: 15,
              color: "#111", minWidth: 28, textAlign: "center" }}>
            {item.quantity}
          </motion.span>
        </AnimatePresence>
        <motion.button whileTap={{ scale: 0.85 }}
          onClick={() => onQty(item.id, 1)}
          style={{ width: 34, height: 34, border: "none", background: "transparent",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#555" }}>
          <Plus size={14} strokeWidth={2.5} />
        </motion.button>
      </div>

      <motion.button whileHover={{ scale: 1.15, color: "#E8192C" }} whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        style={{ border: "none", background: "transparent", cursor: "pointer",
          color: "#bbb", padding: 6, display: "flex", alignItems: "center",
          transition: "color 0.2s" }}>
        <Trash2 size={17} />
      </motion.button>
    </motion.div>
  );
}

function EmptyCart({ onShop }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
      <motion.div animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}>
        <ShoppingCart size={64} color="#ddd" strokeWidth={1.5} />
      </motion.div>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: 22,
        color: "#111", margin: "20px 0 8px" }}>Your cart is empty!</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14,
        color: "#888", margin: "0 0 24px" }}>Add some makhana magic to get started</p>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onShop}
        style={{ fontFamily: "var(--font-heading)", fontSize: 14, letterSpacing: 2,
          background: "#E8192C", color: "#fff", border: "none",
          padding: "14px 32px", borderRadius: 50, cursor: "pointer",
          boxShadow: "0 6px 24px rgba(232,25,44,0.3)" }}>
        SHOP NOW
      </motion.button>
    </motion.div>
  );
}

function CheckoutLoginPrompt({ onLoginClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        style={{
          background: "#fff", borderRadius: 24, padding: "40px 32px",
          maxWidth: 420, width: "90%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#FFD700", display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 20px",
        }}>
          <LogIn size={32} color="#111" strokeWidth={2} />
        </div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 24, color: "#111", margin: 0 }}>
          Login to Checkout
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", margin: "8px 0 24px" }}>
          Please login to complete your purchase
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
          style={{
            fontFamily: "var(--font-heading)", fontSize: 14, letterSpacing: 1.5,
            background: "#E8192C", color: "#fff", border: "none",
            borderRadius: 50, padding: "14px 40px", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(232,25,44,0.32)",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}
        >
          <LogIn size={18} /> LOGIN
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
          onClick={() => window.dispatchEvent(new CustomEvent("close-checkout-login"))}
          style={{
            fontFamily: "var(--font-body)", fontSize: 13, color: "#888",
            background: "none", border: "none", cursor: "pointer",
            marginTop: 16, display: "block", width: "100%",
          }}
        >
          Continue shopping
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── helper to notify navbar instantly ───────────────────────────────────────
function notifyCartChanged() {
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems]             = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [promoCode, setPromoCode]             = useState("");
  const [promoApplied, setPromoApplied]       = useState(false);
  const [promoError, setPromoError]           = useState(false);
  const [showCheckout, setShowCheckout]       = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLogin, setShowLogin]             = useState(false);

  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/cart/`, { headers: authHeaders() });
      if (res.status === 401) {
        window.dispatchEvent(new CustomEvent("require-login"));
        return;
      }
      const data = await res.json();
      setCartItems(data.items || []);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  useEffect(() => {
    const handleClose = () => setShowLoginPrompt(false);
    window.addEventListener("close-checkout-login", handleClose);
    return () => window.removeEventListener("close-checkout-login", handleClose);
  }, []);

  useEffect(() => {
    const handleAuthChange = (e) => {
      if (e.detail?.loggedIn) {
        fetchCart();
        if (showLoginPrompt) {
          setShowLoginPrompt(false);
          setShowCheckout(true);
        }
      }
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, [fetchCart, showLoginPrompt]);

  // ── Qty change — optimistic UI + notify navbar immediately ───────────────
  const handleQty = async (cartItemId, delta) => {
    setCartItems(prev => prev.map(i =>
      i.id === cartItemId
        ? { ...i,
            quantity:  Math.max(1, i.quantity + delta),
            lineTotal: i.priceNum * Math.max(1, i.quantity + delta),
          }
        : i
    ));
    // ▼ tell Navbar to refresh count right now
    notifyCartChanged();

    await fetch(`${API}/api/cart/item/${cartItemId}/`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ delta }),
    });
  };

  // ── Remove item — optimistic UI + notify navbar immediately ─────────────
  const handleRemove = async (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
    // ▼ tell Navbar to refresh count right now
    notifyCartChanged();

    await fetch(`${API}/api/cart/item/${cartItemId}/`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  };

  // ── Clear all — notify navbar immediately ────────────────────────────────
  const handleClearAll = async () => {
    setCartItems([]);
    // ▼ tell Navbar to refresh count right now
    notifyCartChanged();

    await fetch(`${API}/api/cart/clear/`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    if (isAuthenticated()) setShowCheckout(true);
    else setShowLoginPrompt(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowLoginPrompt(false);
    fetchCart();
    setShowCheckout(true);
  };

  const subtotal     = cartItems.reduce((s, i) => s + i.priceNum * i.quantity, 0);
  const discount     = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const totalItems   = cartItems.reduce((s, i) => s + i.quantity, 0);
  const displayTotal = subtotal - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "MACHOZ10") { setPromoApplied(true); setPromoError(false); }
    else { setPromoError(true); setPromoApplied(false); }
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setShowCheckout(false);
    setPromoApplied(false);
    setPromoCode("");
    window.dispatchEvent(new CustomEvent("cart-cleared"));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5EFD6",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ width: 60, height: 60, borderRadius: "50%", background: "#FFD700" }} />
      </div>
    );
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

        <div ref={titleRef}
          style={{ background: "#FFD700", padding: "32px 5% 24px",
            position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}
            width={200} height={120} viewBox="0 0 200 120">
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * 180 + 180;
              const r = (a * Math.PI) / 180;
              return (
                <rect key={i} x={200 + Math.cos(r) * 20} y={0 + Math.sin(r) * 20}
                  width={i % 2 === 0 ? 10 : 5} height={70} rx={3}
                  fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.4}
                  transform={`rotate(${a + 90}, ${200 + Math.cos(r) * 20}, ${0 + Math.sin(r) * 20})`} />
              );
            })}
          </svg>
          <motion.div initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(38px, 5vw, 48px)",
              color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1 }}>Your Cart</h1>
            {totalItems > 0 && <CounterBadge count={totalItems} />}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <span onClick={() => navigate("/")}
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", cursor: "pointer" }}>
              Home
            </span>
            <ChevronRight size={13} color="#888" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#111", fontWeight: 700 }}>
              Cart
            </span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ display: "flex", justifyContent: "center", gap: "5%",
            background: "#111", padding: "12px 5%", flexWrap: "wrap" }}>
          {PERKS.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon size={15} color="#FFD700" strokeWidth={2} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 600 }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="cart-grid"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 5% 0",
            display: "grid", gridTemplateColumns: "1fr minmax(280px, 360px)",
            gap: 28, alignItems: "start" }}>

          <div>
            {cartItems.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                <EmptyCart onShop={() => navigate("/")} />
              </div>
            ) : (
              <motion.div style={{ background: "#fff", borderRadius: 16,
                overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #f0f0f0",
                  display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "#111", margin: 0 }}>
                    {totalItems} Item{totalItems !== 1 ? "s" : ""}
                  </p>
                  <motion.button whileHover={{ color: "#E8192C" }} onClick={handleClearAll}
                    style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#aaa",
                      background: "none", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4 }}>
                    <Trash2 size={13} /> Clear all
                  </motion.button>
                </div>
                <AnimatePresence>
                  {cartItems.map((item, i) => (
                    <CartRow key={item.id} item={item} index={i}
                      onQty={handleQty} onRemove={handleRemove} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {cartItems.length > 0 && (
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, borderColor: "#FFD700" }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                style={{ marginTop: 16, width: "100%", padding: "16px 20px",
                  border: "2px dashed #ccc", borderRadius: 14, background: "transparent",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, transition: "border-color 0.2s" }}>
                <Plus size={18} color="#888" />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14,
                  color: "#888", fontWeight: 600 }}>Add more products</span>
              </motion.button>
            )}
          </div>

          <div style={{ alignSelf: "start" }}>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

              <div style={{ background: "#111", padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={16} color="#FFD700" />
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 16,
                  color: "#FFD700", margin: 0, letterSpacing: 1 }}>ORDER SUMMARY</p>
              </div>

              <div style={{ padding: "20px 20px 0" }}>
                {[
                  { label: "Subtotal", value: `₹${subtotal.toFixed(0)}`, color: "#111" },
                  { label: `Discount${promoApplied ? " (MACHOZ10)" : ""}`,
                    value: promoApplied ? `-₹${discount}` : "—",
                    color: promoApplied ? "#1E5C2A" : "#aaa" },
                  { label: "Delivery", value: "Calculated at checkout", color: "#888" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color }}>{value}</span>
                  </div>
                ))}

                <div style={{ borderTop: "1.5px solid #f0f0f0", margin: "4px 0 16px" }} />

                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, color: "#111" }}>Subtotal</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={displayTotal}
                      initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }}
                      style={{ fontFamily: "var(--font-heading)", fontSize: 26, color: "#111" }}>
                      ₹{displayTotal.toFixed(0)}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8,
                    border: `1.5px solid ${promoError ? "#E8192C" : promoApplied ? "#1E5C2A" : "#ddd"}`,
                    borderRadius: 50, padding: "0 14px", transition: "border-color 0.2s" }}>
                    <Tag size={14} color={promoApplied ? "#1E5C2A" : "#aaa"} />
                    <input value={promoCode}
                      onChange={e => { setPromoCode(e.target.value); setPromoError(false); }}
                      placeholder="Promo code" disabled={promoApplied}
                      style={{ border: "none", outline: "none", background: "transparent",
                        fontFamily: "var(--font-body)", fontSize: 13, color: "#111",
                        width: "100%", padding: "11px 0" }} />
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    onClick={applyPromo} disabled={promoApplied}
                    style={{ fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1,
                      background: promoApplied ? "#1E5C2A" : "#111", color: "#fff",
                      border: "none", borderRadius: 50, padding: "0 18px",
                      cursor: "pointer", whiteSpace: "nowrap", opacity: promoApplied ? 0.7 : 1 }}>
                    {promoApplied ? "APPLIED ✓" : "APPLY"}
                  </motion.button>
                </div>

                {promoError && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#E8192C",
                      margin: "-8px 0 12px", textAlign: "center" }}>
                    Invalid code. Try MACHOZ10
                  </motion.p>
                )}
              </div>

              <div style={{ padding: "0 20px 20px" }}>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 32px rgba(232,25,44,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckoutClick}
                  disabled={cartItems.length === 0}
                  style={{ width: "100%", fontFamily: "var(--font-heading)", fontSize: 15,
                    letterSpacing: 2, background: "#E8192C", color: "#fff",
                    border: "none", borderRadius: 50, padding: "16px 0",
                    cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                    opacity: cartItems.length === 0 ? 0.5 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 6px 24px rgba(232,25,44,0.28)", transition: "box-shadow 0.2s" }}>
                  GO TO CHECKOUT <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 20 }}>
              {PERKS.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 4 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                    <Icon size={18} color="#1E5C2A" />
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 10,
                    color: "#888", textAlign: "center", maxWidth: 60 }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showLoginPrompt && <CheckoutLoginPrompt onLoginClick={() => setShowLogin(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <Login
            onClose={() => { setShowLogin(false); setShowLoginPrompt(false); }}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal
            cartSubtotal={displayTotal} 
            discount={discount}
            onClose={() => setShowCheckout(false)}
            onSuccess={handleCheckoutSuccess}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 700px) { .cart-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}