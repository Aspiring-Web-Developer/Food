

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package, Truck, CheckCircle, MapPin, ChevronRight,
  PackageCheck, ShieldCheck, Clock, Copy,
  RotateCcw, Navigation, Home, AlertCircle,
  Phone, Hash, ArrowLeft, Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE;

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

// ─── Status → step index map ─────────────────────────────────────────────────
const STATUS_TO_STEP = {
  pending:   0,
  confirmed: 1,
  packed:    2,
  shipped:   3,
  delivered: 4,
  cancelled: -1,
};

// ─── Step definitions (icon, label) ──────────────────────────────────────────
const STEP_DEFS = [
  { id: "pending",   label: "Order Placed",      sub: "We've received your order",          icon: Package      },
  { id: "confirmed", label: "Order Confirmed",    sub: "Payment verified, packing started",  icon: PackageCheck },
  { id: "packed",    label: "Packed",             sub: "Your order is packed and ready",     icon: ShieldCheck  },
  { id: "shipped",   label: "Shipped",            sub: "Your package left our warehouse",    icon: Truck        },
  { id: "delivered", label: "Delivered",          sub: "Package delivered successfully",     icon: CheckCircle  },
];

// ─── Build steps array from live order status ─────────────────────────────────
function buildSteps(orderStatus) {
  const currentIdx = STATUS_TO_STEP[orderStatus] ?? 0;
  return STEP_DEFS.map((def, i) => ({
    ...def,
    done:   i < currentIdx,
    active: i === currentIdx,
  }));
}

// ─── Format date from ISO ─────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}
function fmtDateShort(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    pending:   { bg: "#FFF8E1", color: "#B45309", label: "Pending"   },
    confirmed: { bg: "#E8F5E9", color: "#1E5C2A", label: "Confirmed" },
    packed:    { bg: "#E3F2FD", color: "#1565C0", label: "Packed"    },
    shipped:   { bg: "#F3E5F5", color: "#7B1FA2", label: "Shipped"   },
    delivered: { bg: "#E8F5E9", color: "#1E5C2A", label: "Delivered" },
    cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled" },
  }[status] || { bg: "#f0f0f0", color: "#888", label: status };

  return (
    <span style={{
      fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
      letterSpacing: 1, textTransform: "uppercase",
      background: cfg.bg, color: cfg.color,
      borderRadius: 20, padding: "4px 12px",
    }}>
      {cfg.label}
    </span>
  );
}

// ─── Single tracker step ──────────────────────────────────────────────────────
function TrackStep({ step, index, isLast }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const Icon   = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 16, position: "relative" }}
    >
      {/* Vertical connector */}
      {!isLast && (
        <div style={{
          position: "absolute", left: 19, top: 42, bottom: -8, width: 2, zIndex: 0,
          background: step.done ? "linear-gradient(to bottom, #1E5C2A, #c8e6c9)" : "#eee",
        }} />
      )}

      {/* Icon bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.08 + 0.15, type: "spring", stiffness: 320, damping: 18 }}
        style={{
          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
          zIndex: 1, position: "relative",
          background: step.done ? "#1E5C2A" : step.active ? "#FFD700" : "#f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: step.active ? "0 0 0 6px rgba(255,215,0,0.2)"
                   : step.done   ? "0 0 0 4px rgba(30,92,42,0.12)" : "none",
        }}
      >
        {step.active && (
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ position: "absolute", inset: -6, borderRadius: "50%",
              border: "2px solid #FFD700" }}
          />
        )}
        <Icon size={18} color={step.done ? "#fff" : step.active ? "#111" : "#bbb"} strokeWidth={2.2} />
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: 15,
            color: step.done || step.active ? "#111" : "#bbb",
            margin: 0, letterSpacing: 0.2,
          }}>
            {step.label}
          </p>
          {step.active && (
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 10,
              color: "#E8192C", fontWeight: 700, letterSpacing: 1,
              textTransform: "uppercase",
            }}>
              CURRENT
            </span>
          )}
        </div>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 13,
          color: step.active ? "#555" : "#aaa", margin: "3px 0 0",
        }}>
          {step.sub}
        </p>

        {step.active && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8,
              background: "#FFF8E1", border: "1.5px solid #FFD700",
              borderRadius: 20, padding: "4px 12px",
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8192C" }}
            />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11,
              color: "#B45309", fontWeight: 700 }}>
              IN PROGRESS
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main OrderStatus page ────────────────────────────────────────────────────
export default function OrderStatus() {
  const { id }   = useParams();      // order UUID from URL
  const navigate = useNavigate();

  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);

  const titleRef   = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // ── Fetch order ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    fetch(`${API}/api/orders/${id}/`, { headers: authHeaders() })
      .then(r => {
        if (r.status === 401) { window.dispatchEvent(new CustomEvent("require-login")); return null; }
        if (!r.ok) throw new Error("Order not found");
        return r.json();
      })
      .then(data => { if (data) setOrder(data); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  function copyOrderNumber() {
    if (!order) return;
    navigator.clipboard.writeText(order.order_number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Loading ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5EFD6",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={36} color="#1E5C2A" style={{ animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────
  if (error || !order) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5EFD6",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 16 }}>
        <AlertCircle size={48} color="#E8192C" />
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 20, color: "#111" }}>
          {error || "Order not found"}
        </p>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/orders")}
          style={{ fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 2,
            background: "#E8192C", color: "#fff", border: "none",
            borderRadius: 50, padding: "12px 28px", cursor: "pointer" }}>
          BACK TO ORDERS
        </motion.button>
      </div>
    );
  }

  const steps       = buildSteps(order.status);
  const currentIdx  = STATUS_TO_STEP[order.status] ?? 0;
  const progressPct = order.status === "cancelled" ? 0
    : (currentIdx / (STEP_DEFS.length - 1)) * 100;

  // Build a readable items summary
  const itemsSummary = order.items
    .map(i => `${i.product_name} ${i.weight} × ${i.quantity}`)
    .join(" + ");

  const PERKS = [
    { icon: PackageCheck, label: "100% Natural" },
    { icon: Truck,        label: "Free above ₹299" },
    { icon: ShieldCheck,  label: "Secure Checkout" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

      {/* ── Yellow header ── */}
      <div ref={titleRef} style={{
        background: "#FFD700", padding: "32px 5% 24px",
        position: "relative", overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}
          width={200} height={120} viewBox="0 0 200 120">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * 180 + 180;
            const r = (a * Math.PI) / 180;
            return (
              <rect key={i}
                x={200 + Math.cos(r) * 20} y={0 + Math.sin(r) * 20}
                width={i % 2 === 0 ? 10 : 5} height={70} rx={3}
                fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.4}
                transform={`rotate(${a + 90}, ${200 + Math.cos(r) * 20}, ${0 + Math.sin(r) * 20})`}
              />
            );
          })}
        </svg>

        <motion.button
          initial={{ opacity: 0, x: -20 }} animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/orders")}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none",
            border: "none", cursor: "pointer", padding: 0, marginBottom: 10 }}>
          <ArrowLeft size={16} color="#555" />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
            All Orders
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <Truck size={36} color="#111" strokeWidth={2.5} />
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 6vw, 72px)",
            color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1,
          }}>
            Order Status
          </h1>
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          <span onClick={() => navigate("/")}
            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", cursor: "pointer" }}>
            Home
          </span>
          <ChevronRight size={13} color="#888" />
          <span onClick={() => navigate("/orders")}
            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", cursor: "pointer" }}>
            Orders
          </span>
          <ChevronRight size={13} color="#888" />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#111", fontWeight: 700 }}>
            {order.order_number}
          </span>
        </motion.div>
      </div>

      {/* ── Perks strip ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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

      {/* ── Order ID banner ── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ maxWidth: 1100, margin: "24px auto 0", padding: "0 5%" }}>
        <div style={{
          background: "#fff", borderRadius: 14, padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          borderLeft: "4px solid #FFD700",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
                margin: 0, letterSpacing: 1 }}>ORDER ID</p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "#111",
                margin: "2px 0 0" }}>
                {order.order_number}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888" }}>
              Placed: {fmtDate(order.created_at)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              onClick={copyOrderNumber}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: copied ? "#1E5C2A" : "#111",
                color: "#FFD700", border: "none", borderRadius: 20, padding: "6px 14px",
                fontFamily: "var(--font-body)", fontSize: 12,
                cursor: "pointer", transition: "background 0.2s",
              }}>
              <Copy size={12} />
              {copied ? "Copied!" : "Copy ID"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Main two-column grid ── */}
      <div className="status-grid"
        style={{
          maxWidth: 1100, margin: "24px auto 0", padding: "0 5%",
          display: "grid",
          gridTemplateColumns: "1fr minmax(300px, 400px)",
          gap: 28, alignItems: "start",
        }}>

        {/* ── LEFT — Tracking steps ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ETA / progress card */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 220 }}
            style={{
              background: "#111", borderRadius: 16, padding: "20px 22px",
              marginBottom: 20, position: "relative", overflow: "hidden",
            }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at top right, #1E5C2A33, transparent 65%)",
              pointerEvents: "none",
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Clock size={15} color="#FFD700" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12,
                color: "#aaa", letterSpacing: 1 }}>ORDER SUMMARY</span>
            </div>

            {/* Items summary */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
              color: "#ccc", margin: "0 0 14px", lineHeight: 1.5 }}>
              {itemsSummary || "—"}
            </p>

            {/* Progress bar */}
            <div style={{ background: "#2a2a2a", borderRadius: 50, height: 6, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: "100%",
                  background: order.status === "cancelled"
                    ? "#E8192C"
                    : "linear-gradient(90deg, #1E5C2A, #FFD700)",
                  borderRadius: 50,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555" }}>Ordered</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555" }}>Delivered</span>
            </div>

            {/* Amount row */}
            <div style={{ display: "flex", justifyContent: "space-between",
              marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", margin: 0 }}>
                  Subtotal
                </p>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 15, color: "#aaa", margin: "2px 0 0" }}>
                  ₹{parseFloat(order.subtotal).toFixed(0)}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", margin: 0 }}>
                  Delivery
                </p>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 15, color: "#aaa", margin: "2px 0 0" }}>
                  {parseFloat(order.delivery_charge) === 0 ? "FREE" : `₹${parseFloat(order.delivery_charge).toFixed(0)}`}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", margin: 0 }}>
                  Total Paid
                </p>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#FFD700", margin: "2px 0 0" }}>
                  ₹{parseFloat(order.total_amount).toFixed(0)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tracking steps card */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "22px 22px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Navigation size={15} color="#E8192C" />
              <p style={{ fontFamily: "var(--font-heading)", fontSize: 15,
                color: "#111", margin: 0, letterSpacing: 0.5 }}>
                TRACKING DETAILS
              </p>
            </div>

            {order.status === "cancelled" ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#FFEBEE", borderRadius: 12, padding: "16px 18px",
              }}>
                <AlertCircle size={22} color="#C62828" />
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 15,
                    color: "#C62828", margin: 0 }}>Order Cancelled</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
                    color: "#888", margin: "3px 0 0" }}>
                    This order was cancelled. Contact support if you have questions.
                  </p>
                </div>
              </div>
            ) : (
              steps.map((step, i) => (
                <TrackStep key={step.id} step={step} index={i} isLast={i === steps.length - 1} />
              ))
            )}
          </div>

          {/* Order items breakdown */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "18px 20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20,
          }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 14,
              color: "#111", margin: "0 0 14px", letterSpacing: 0.5 }}>
              ITEMS ORDERED
            </p>
            {order.items.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < order.items.length - 1 ? "1px solid #f0f0f0" : "none",
                }}>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
                    color: "#111", margin: 0, fontWeight: 600 }}>
                    {item.product_name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12,
                    color: "#888", margin: "2px 0 0" }}>
                    {item.weight} × {item.quantity}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 14,
                  color: "#1E5C2A", margin: 0 }}>
                  ₹{parseFloat(item.line_total).toFixed(0)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: "flex", gap: 10 }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              style={{
                flex: 1, fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 1.5,
                background: "#E8192C", color: "#fff", border: "none",
                borderRadius: 50, padding: "14px 0", cursor: "pointer",
                boxShadow: "0 4px 18px rgba(232,25,44,0.28)",
              }}>
              SHOP MORE
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/orders")}
              style={{
                flex: 1, fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 1.5,
                background: "transparent", color: "#111", border: "2px solid #111",
                borderRadius: 50, padding: "14px 0", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
              <RotateCcw size={14} /> ALL ORDERS
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Address + ETA + courier ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Delivery address */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <MapPin size={15} color="#E8192C" />
              <p style={{ fontFamily: "var(--font-heading)", fontSize: 14,
                color: "#111", margin: 0, letterSpacing: 0.5 }}>
                DELIVERY ADDRESS
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "#FFF8E1", border: "1.5px solid #FFD700",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Home size={16} color="#B45309" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
                  color: "#333", margin: 0, fontWeight: 600 }}>
                  {order.customer_name}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
                  color: "#555", margin: "4px 0 0", lineHeight: 1.5 }}>
                  {order.address_line1}
                  {order.address_line2 && `, ${order.address_line2}`}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13,
                  color: "#555", margin: "2px 0 0" }}>
                  {order.city}, {order.state} – {order.pincode}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                  <Phone size={12} color="#888" />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888" }}>
                    {order.phone}
                    {order.alt_phone && ` / ${order.alt_phone}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div style={{
            background: "#111", borderRadius: 16, padding: "20px 22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at bottom left, #1E5C2A22, transparent 60%)",
              pointerEvents: "none",
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Clock size={15} color="#FFD700" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12,
                color: "#aaa", letterSpacing: 1 }}>DELIVERY INFO</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666" }}>
                  Zone
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff",
                  fontWeight: 600, textTransform: "capitalize" }}>
                  {order.delivery_zone || "—"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666" }}>
                  Payment
                </span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
                  color: order.payment_status === "paid" ? "#4ADE80"
                       : order.payment_status === "failed" ? "#f87171" : "#FFD700",
                  textTransform: "uppercase", letterSpacing: 1,
                }}>
                  {order.payment_status}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666" }}>
                  Order Date
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#ccc" }}>
                  {fmtDateShort(order.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Courier info (shown only if tracking number set by admin) */}
          {order.courier_name && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: "#fff", borderRadius: 16, padding: "18px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                borderLeft: "4px solid #1E5C2A",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Truck size={15} color="#1E5C2A" />
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 14,
                  color: "#111", margin: 0, letterSpacing: 0.5 }}>
                  COURIER DETAILS
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888" }}>
                    Courier
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13,
                    color: "#111", fontWeight: 600 }}>
                    {order.courier_name}
                  </span>
                </div>
                {order.tracking_number && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888" }}>
                      Tracking #
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13,
                      color: "#111", fontWeight: 600 }}>
                      {order.tracking_number}
                    </span>
                  </div>
                )}
                {order.tracking_link && (
                  <a href={order.tracking_link} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1,
                      color: "#1E5C2A", textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 5, marginTop: 4,
                    }}>
                    TRACK SHIPMENT →
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* Support note */}
          <div style={{
            background: "#F5EFD6", borderRadius: 14, padding: "14px 16px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12,
              color: "#888", margin: 0, lineHeight: 1.6 }}>
              Need help? Write to us at{" "}
              <span style={{ color: "#1E5C2A", fontWeight: 700 }}>support@adhenfoods.com</span>
              {" "}or call{" "}
              <span style={{ color: "#1E5C2A", fontWeight: 700 }}>+91 99999 99999</span>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .status-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}