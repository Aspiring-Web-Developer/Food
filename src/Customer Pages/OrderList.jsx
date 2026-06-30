// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Package, ChevronRight, ShoppingBag, Loader2,
//   AlertCircle, RotateCcw, Clock, Truck,
//   PackageCheck, CheckCircle, ShieldCheck, XCircle,
//   Search, Filter,
// } from "lucide-react";

// const API = import.meta.env.VITE_API_BASE;

// function authHeaders() {
//   const token = localStorage.getItem("access_token");
//   return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
// }

// // ─── Status config ────────────────────────────────────────────────────────────
// const STATUS_CFG = {
//   pending:   { bg: "#FFF8E1", color: "#B45309", label: "Pending",   icon: Clock        },
//   confirmed: { bg: "#E8F5E9", color: "#1E5C2A", label: "Confirmed", icon: PackageCheck },
//   packed:    { bg: "#E3F2FD", color: "#1565C0", label: "Packed",    icon: ShieldCheck  },
//   shipped:   { bg: "#F3E5F5", color: "#7B1FA2", label: "Shipped",   icon: Truck        },
//   delivered: { bg: "#E8F5E9", color: "#1E5C2A", label: "Delivered", icon: CheckCircle  },
//   cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled", icon: XCircle      },
// };

// const ALL_STATUSES = ["all", "pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

// function StatusBadge({ status }) {
//   const cfg = STATUS_CFG[status] || { bg: "#f0f0f0", color: "#888", label: status };
//   const Icon = cfg.icon || Package;
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 4,
//       fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700,
//       letterSpacing: 1, textTransform: "uppercase",
//       background: cfg.bg, color: cfg.color,
//       borderRadius: 20, padding: "4px 10px",
//     }}>
//       <Icon size={10} strokeWidth={2.5} />
//       {cfg.label}
//     </span>
//   );
// }

// function fmtDate(iso) {
//   if (!iso) return "—";
//   return new Date(iso).toLocaleDateString("en-IN", {
//     day: "2-digit", month: "short", year: "numeric",
//   });
// }

// // ─── Single order row card ────────────────────────────────────────────────────
// function OrderCard({ order, index, onClick }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-30px" });

//   const itemsPreview = order.items
//     .slice(0, 2)
//     .map(i => `${i.product_name} (${i.weight})`)
//     .join(", ");
//   const extraCount = order.items.length - 2;

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
//       onClick={onClick}
//       style={{
//         background: "#fff", borderRadius: 16, padding: "18px 20px",
//         boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//         cursor: "pointer", transition: "box-shadow 0.2s",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         gap: 16, borderLeft: `4px solid ${STATUS_CFG[order.status]?.color || "#ddd"}`,
//       }}
//     >
//       {/* Left — icon + main info */}
//       <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
//         {/* Status icon bubble */}
//         <div style={{
//           width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
//           background: STATUS_CFG[order.status]?.bg || "#f5f5f5",
//           display: "flex", alignItems: "center", justifyContent: "center",
//         }}>
//           {(() => {
//             const Icon = STATUS_CFG[order.status]?.icon || Package;
//             return <Icon size={18} color={STATUS_CFG[order.status]?.color || "#888"} strokeWidth={2} />;
//           })()}
//         </div>

//         {/* Text block */}
//         <div style={{ flex: 1, minWidth: 0 }}>
//           {/* Top row — order number + date */}
//           <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//             <p style={{
//               fontFamily: "var(--font-heading)", fontSize: 15, color: "#111",
//               margin: 0, letterSpacing: 0.2,
//             }}>
//               {order.order_number}
//             </p>
//             <StatusBadge status={order.status} />
//           </div>

//           {/* Items preview */}
//           <p style={{
//             fontFamily: "var(--font-body)", fontSize: 12, color: "#888",
//             margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}>
//             {itemsPreview}
//             {extraCount > 0 && ` +${extraCount} more`}
//           </p>

//           {/* Bottom row — date + amount */}
//           <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, flexWrap: "wrap" }}>
//             <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa" }}>
//               {fmtDate(order.created_at)}
//             </span>
//             <span style={{
//               fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa",
//               display: "flex", alignItems: "center", gap: 3,
//             }}>
//               <Package size={10} />
//               {order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Right — amount + chevron */}
//       <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//         <div style={{ textAlign: "right" }}>
//           <p style={{
//             fontFamily: "var(--font-heading)", fontSize: 17,
//             color: "#1E5C2A", margin: 0,
//           }}>
//             ₹{parseFloat(order.total_amount).toFixed(0)}
//           </p>
//           <p style={{
//             fontFamily: "var(--font-body)", fontSize: 10, color: "#aaa",
//             margin: "2px 0 0", textAlign: "right",
//             textTransform: "uppercase", letterSpacing: 0.5,
//           }}>
//             {order.payment_status === "paid" ? "Paid" : order.payment_status}
//           </p>
//         </div>
//         <ChevronRight size={16} color="#bbb" />
//       </div>
//     </motion.div>
//   );
// }

// // ─── Empty state ──────────────────────────────────────────────────────────────
// function EmptyState({ filtered, onReset, onShop }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.96 }}
//       animate={{ opacity: 1, scale: 1 }}
//       style={{
//         display: "flex", flexDirection: "column", alignItems: "center",
//         justifyContent: "center", gap: 16, padding: "60px 20px", textAlign: "center",
//       }}
//     >
//       <div style={{
//         width: 72, height: 72, borderRadius: "50%",
//         background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <ShoppingBag size={32} color="#111" strokeWidth={2} />
//       </div>
//       <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: 0 }}>
//         {filtered ? "No orders match" : "No orders yet"}
//       </p>
//       <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", margin: 0 }}>
//         {filtered ? "Try a different status filter" : "Your order history will appear here"}
//       </p>
//       {filtered ? (
//         <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//           onClick={onReset}
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1.5,
//             background: "transparent", color: "#111", border: "2px solid #111",
//             borderRadius: 50, padding: "12px 24px", cursor: "pointer",
//             display: "flex", alignItems: "center", gap: 6,
//           }}>
//           <RotateCcw size={13} /> RESET FILTER
//         </motion.button>
//       ) : (
//         <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//           onClick={onShop}
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1.5,
//             background: "#E8192C", color: "#fff", border: "none",
//             borderRadius: 50, padding: "12px 28px", cursor: "pointer",
//             boxShadow: "0 4px 16px rgba(232,25,44,0.28)",
//           }}>
//           SHOP NOW
//         </motion.button>
//       )}
//     </motion.div>
//   );
// }

// // ─── Main OrderList page ──────────────────────────────────────────────────────
// export default function OrderList() {
//   const navigate = useNavigate();

//   const [orders,  setOrders]  = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState("");
//   const [filter,  setFilter]  = useState("all");
//   const [search,  setSearch]  = useState("");

//   const titleRef   = useRef(null);
//   const titleInView = useInView(titleRef, { once: true });

//   // ── Fetch orders ──────────────────────────────────────────────────────
//   useEffect(() => {
//     fetch(`${API}/api/orders/`, { headers: authHeaders() })
//       .then(r => {
//         if (r.status === 401) { window.dispatchEvent(new CustomEvent("require-login")); return null; }
//         if (!r.ok) throw new Error("Failed to load orders");
//         return r.json();
//       })
//       .then(data => { if (data) setOrders(data); })
//       .catch(e => setError(e.message))
//       .finally(() => setLoading(false));
//   }, []);

//   // ── Filter + search ───────────────────────────────────────────────────
//   const filtered = orders.filter(o => {
//     const matchStatus = filter === "all" || o.status === filter;
//     const q = search.trim().toLowerCase();
//     const matchSearch = !q
//       || o.order_number.toLowerCase().includes(q)
//       || o.items.some(i => i.product_name.toLowerCase().includes(q));
//     return matchStatus && matchSearch;
//   });

//   // ── Summary counts ────────────────────────────────────────────────────
//   const totalSpent = orders
//     .filter(o => o.payment_status === "paid")
//     .reduce((s, o) => s + parseFloat(o.total_amount), 0);

//   const PERKS = [
//     { icon: PackageCheck, label: "100% Natural" },
//     { icon: Truck,        label: "Free above ₹299" },
//     { icon: ShieldCheck,  label: "Secure Checkout" },
//   ];

//   // ── Loading ───────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", background: "#F5EFD6",
//         display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Loader2 size={36} color="#1E5C2A" style={{ animation: "spin 0.8s linear infinite" }} />
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   // ── Error ─────────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div style={{ minHeight: "100vh", background: "#F5EFD6",
//         display: "flex", flexDirection: "column", alignItems: "center",
//         justifyContent: "center", gap: 16 }}>
//         <AlertCircle size={48} color="#E8192C" />
//         <p style={{ fontFamily: "var(--font-heading)", fontSize: 20, color: "#111" }}>
//           {error}
//         </p>
//         <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//           onClick={() => window.location.reload()}
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 2,
//             background: "#E8192C", color: "#fff", border: "none",
//             borderRadius: 50, padding: "12px 28px", cursor: "pointer",
//           }}>
//           RETRY
//         </motion.button>
//       </div>
//     );
//   }

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//       style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

//       {/* ── Yellow header ── */}
//       <div ref={titleRef} style={{
//         background: "#FFD700", padding: "0px 5% 4px",
//         position: "relative", overflow: "hidden",
//       }}>
//         {/* Decorative rays */}
//         <svg style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}
//           width={200} height={120} viewBox="0 0 200 120">
//           {Array.from({ length: 10 }).map((_, i) => {
//             const a = (i / 10) * 180 + 180;
//             const r = (a * Math.PI) / 180;
//             return (
//               <rect key={i}
//                 x={200 + Math.cos(r) * 20} y={0 + Math.sin(r) * 20}
//                 width={i % 2 === 0 ? 10 : 5} height={70} rx={3}
//                 fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.4}
//                 transform={`rotate(${a + 90}, ${200 + Math.cos(r) * 20}, ${0 + Math.sin(r) * 20})`}
//               />
//             );
//           })}
//         </svg>

//         {/* Back to home */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }} animate={titleInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.4 }}
//           whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/")}
//           style={{
//             display: "flex", alignItems: "center", gap: 6, background: "none",
//             border: "none", cursor: "pointer", padding: 0, marginBottom: 10,
//           }}>
//           <ChevronRight size={16} color="#555" style={{ transform: "rotate(180deg)" }} />
//           <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
//             Home
//           </span>
//         </motion.button>

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={titleInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           style={{ display: "flex", alignItems: "center", gap: 12 }}
//         >
//           <ShoppingBag size={36} color="#111" strokeWidth={2.5} />
//           <h1 style={{
//             fontFamily: "var(--font-heading)",
//             fontSize: "clamp(32px, 6vw, 72px)",
//             color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1,
//           }}>
//             My Orders
//           </h1>
//         </motion.div>

//         {/* Stats row */}
//         {orders.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
//             style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
//             <div>
//               <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#7a6500", margin: 0, letterSpacing: 1 }}>
//                 TOTAL ORDERS
//               </p>
//               <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: "2px 0 0" }}>
//                 {orders.length}
//               </p>
//             </div>
//             {totalSpent > 0 && (
//               <div>
//                 <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#7a6500", margin: 0, letterSpacing: 1 }}>
//                   TOTAL SPENT
//                 </p>
//                 <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: "2px 0 0" }}>
//                   ₹{totalSpent.toFixed(0)}
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </div>

//       {/* ── Perks strip ── */}
//       <div style={{
//         display: "flex", justifyContent: "center", gap: "5%",
//         background: "#111", padding: "12px 5%", flexWrap: "wrap",
//       }}>
//         {PERKS.map(({ icon: Icon, label }) => (
//           <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
//             <Icon size={15} color="#FFD700" strokeWidth={2} />
//             <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 600 }}>
//               {label}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* ── Content ── */}
//       <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5% 0" }}>

//         {/* Search + filter bar */}
//         {orders.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>

//             {/* Search box */}
//             <div style={{
//               background: "#fff", borderRadius: 50, padding: "10px 18px",
//               display: "flex", alignItems: "center", gap: 10,
//               boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
//             }}>
//               <Search size={15} color="#888" />
//               <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search by order ID or product name..."
//                 style={{
//                   flex: 1, border: "none", outline: "none", background: "transparent",
//                   fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
//                 }}
//               />
//               {search && (
//                 <button onClick={() => setSearch("")}
//                   style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
//                   <XCircle size={15} color="#bbb" />
//                 </button>
//               )}
//             </div>

//             {/* Status filter pills */}
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
//               <Filter size={13} color="#888" />
//               {ALL_STATUSES.map(s => {
//                 const active = filter === s;
//                 const cfg = STATUS_CFG[s];
//                 return (
//                   <motion.button
//                     key={s}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setFilter(s)}
//                     style={{
//                       fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
//                       letterSpacing: 1, textTransform: "uppercase",
//                       padding: "5px 12px", borderRadius: 20, cursor: "pointer",
//                       border: active ? "none" : "1.5px solid #ddd",
//                       background: active ? (s === "all" ? "#111" : cfg?.bg || "#eee") : "#fff",
//                       color: active ? (s === "all" ? "#FFD700" : cfg?.color || "#333") : "#888",
//                       transition: "all 0.15s",
//                     }}>
//                     {s === "all" ? "All" : cfg?.label || s}
//                     {s !== "all" && (
//                       <span style={{ marginLeft: 5, opacity: 0.6 }}>
//                         {orders.filter(o => o.status === s).length}
//                       </span>
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}

//         {/* Orders list */}
//         <AnimatePresence mode="popLayout">
//           {filtered.length === 0 ? (
//             <EmptyState
//               filtered={filter !== "all" || search.trim() !== ""}
//               onReset={() => { setFilter("all"); setSearch(""); }}
//               onShop={() => navigate("/")}
//             />
//           ) : (
//             <motion.div
//               key="list"
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//               style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {filtered.map((order, i) => (
//                 <OrderCard
//                   key={order.id}
//                   order={order}
//                   index={i}
//                   onClick={() => navigate(`/orders/${order.id}`)}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bottom shop more */}
//         {orders.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
//             <motion.button
//               whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//               onClick={() => navigate("/")}
//               style={{
//                 fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 1.5,
//                 background: "#E8192C", color: "#fff", border: "none",
//                 borderRadius: 50, padding: "14px 36px", cursor: "pointer",
//                 boxShadow: "0 4px 18px rgba(232,25,44,0.28)",
//               }}>
//               SHOP MORE
//             </motion.button>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Package, ChevronRight, ShoppingBag, Loader2,
  AlertCircle, RotateCcw, Clock, Truck,
  PackageCheck, CheckCircle, ShieldCheck, XCircle,
  Search, Filter, LogIn,
} from "lucide-react";
import Login from "../Customer Pages/Login";

const API = import.meta.env.VITE_API_BASE;

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG = {
  pending:   { bg: "#FFF8E1", color: "#B45309", label: "Pending",   icon: Clock        },
  confirmed: { bg: "#E8F5E9", color: "#1E5C2A", label: "Confirmed", icon: PackageCheck },
  packed:    { bg: "#E3F2FD", color: "#1565C0", label: "Packed",    icon: ShieldCheck  },
  shipped:   { bg: "#F3E5F5", color: "#7B1FA2", label: "Shipped",   icon: Truck        },
  delivered: { bg: "#E8F5E9", color: "#1E5C2A", label: "Delivered", icon: CheckCircle  },
  cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled", icon: XCircle      },
};

const ALL_STATUSES = ["all", "pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { bg: "#f0f0f0", color: "#888", label: status };
  const Icon = cfg.icon || Package;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700,
      letterSpacing: 1, textTransform: "uppercase",
      background: cfg.bg, color: cfg.color,
      borderRadius: 20, padding: "4px 10px",
    }}>
      <Icon size={10} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Single order row card ────────────────────────────────────────────────────
function OrderCard({ order, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const itemsPreview = order.items
    .slice(0, 2)
    .map(i => `${i.product_name} (${i.weight})`)
    .join(", ");
  const extraCount = order.items.length - 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
      onClick={onClick}
      style={{
        background: "#fff", borderRadius: 16, padding: "18px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer", transition: "box-shadow 0.2s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, borderLeft: `4px solid ${STATUS_CFG[order.status]?.color || "#ddd"}`,
      }}
    >
      {/* Left — icon + main info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
        {/* Status icon bubble */}
        <div style={{
          width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
          background: STATUS_CFG[order.status]?.bg || "#f5f5f5",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {(() => {
            const Icon = STATUS_CFG[order.status]?.icon || Package;
            return <Icon size={18} color={STATUS_CFG[order.status]?.color || "#888"} strokeWidth={2} />;
          })()}
        </div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Top row — order number + date */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <p style={{
              fontFamily: "var(--font-heading)", fontSize: 15, color: "#111",
              margin: 0, letterSpacing: 0.2,
            }}>
              {order.order_number}
            </p>
            <StatusBadge status={order.status} />
          </div>

          {/* Items preview */}
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 12, color: "#888",
            margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {itemsPreview}
            {extraCount > 0 && ` +${extraCount} more`}
          </p>

          {/* Bottom row — date + amount */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa" }}>
              {fmtDate(order.created_at)}
            </span>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa",
              display: "flex", alignItems: "center", gap: 3,
            }}>
              <Package size={10} />
              {order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Right — amount + chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: 17,
            color: "#1E5C2A", margin: 0,
          }}>
            ₹{parseFloat(order.total_amount).toFixed(0)}
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 10, color: "#aaa",
            margin: "2px 0 0", textAlign: "right",
            textTransform: "uppercase", letterSpacing: 0.5,
          }}>
            {order.payment_status === "paid" ? "Paid" : order.payment_status}
          </p>
        </div>
        <ChevronRight size={16} color="#bbb" />
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ filtered, onReset, onShop }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 16, padding: "60px 20px", textAlign: "center",
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <ShoppingBag size={32} color="#111" strokeWidth={2} />
      </div>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: 0 }}>
        {filtered ? "No orders match" : "No orders yet"}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", margin: 0 }}>
        {filtered ? "Try a different status filter" : "Your order history will appear here"}
      </p>
      {filtered ? (
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={onReset}
          style={{
            fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1.5,
            background: "transparent", color: "#111", border: "2px solid #111",
            borderRadius: 50, padding: "12px 24px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
          <RotateCcw size={13} /> RESET FILTER
        </motion.button>
      ) : (
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={onShop}
          style={{
            fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: 1.5,
            background: "#E8192C", color: "#fff", border: "none",
            borderRadius: 50, padding: "12px 28px", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(232,25,44,0.28)",
          }}>
          SHOP NOW
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Login Prompt Component ──────────────────────────────────────────────────
function LoginPrompt({ onLoginClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 20, padding: "60px 20px", textAlign: "center",
      }}
    >
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <LogIn size={36} color="#111" strokeWidth={2} />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 26, color: "#111", margin: 0 }}>
          Login to View Orders
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", margin: "8px 0 0" }}>
          Sign in to see your order history and track your deliveries
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoginClick}
        style={{
          fontFamily: "var(--font-heading)", fontSize: 14, letterSpacing: 1.5,
          background: "#E8192C", color: "#fff", border: "none",
          borderRadius: 50, padding: "14px 40px", cursor: "pointer",
          boxShadow: "0 4px 20px rgba(232,25,44,0.32)",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <LogIn size={18} />
        LOGIN
      </motion.button>
    </motion.div>
  );
}

// ─── Main OrderList page ──────────────────────────────────────────────────────
export default function OrderList() {
  const navigate = useNavigate();

  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [filter,  setFilter]  = useState("all");
  const [search,  setSearch]  = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const titleRef   = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // ── Check authentication ──────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  // ── Fetch orders ──────────────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    // If not authenticated, don't fetch
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/api/orders/`, { headers: authHeaders() })
      .then(r => {
        if (r.status === 401) {
          // Token expired - clear storage and show login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_name");
          setIsAuthenticated(false);
          setLoading(false);
          return null;
        }
        if (!r.ok) throw new Error("Failed to load orders");
        return r.json();
      })
      .then(data => { 
        if (data) {
          setOrders(data);
          setIsAuthenticated(true);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Listen for login events ──────────────────────────────────────────
  useEffect(() => {
    const handleAuthChange = (e) => {
      if (e.detail?.loggedIn) {
        setIsAuthenticated(true);
        // Refresh orders after login
        setLoading(true);
        fetch(`${API}/api/orders/`, { headers: authHeaders() })
          .then(r => r.json())
          .then(data => {
            setOrders(data);
            setError("");
          })
          .catch(e => setError(e.message))
          .finally(() => setLoading(false));
      } else {
        setIsAuthenticated(false);
        setOrders([]);
      }
    };
    
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  // ── Filter + search ───────────────────────────────────────────────────
  const filtered = orders.filter(o => {
    const matchStatus = filter === "all" || o.status === filter;
    const q = search.trim().toLowerCase();
    const matchSearch = !q
      || o.order_number.toLowerCase().includes(q)
      || o.items.some(i => i.product_name.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  // ── Summary counts ────────────────────────────────────────────────────
  const totalSpent = orders
    .filter(o => o.payment_status === "paid")
    .reduce((s, o) => s + parseFloat(o.total_amount), 0);

  const PERKS = [
    { icon: PackageCheck, label: "100% Natural" },
    { icon: Truck,        label: "Fast" },
    { icon: ShieldCheck,  label: "Secure Checkout" },
  ];

  // ── Handle Login Success ─────────────────────────────────────────────
  const handleLoginSuccess = (user) => {
    setShowLogin(false);
    setIsAuthenticated(true);
    // Reload orders
    setLoading(true);
    fetch(`${API}/api/orders/`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => {
        setOrders(data);
        setError("");
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

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

  // ── Not authenticated - Show login prompt ────────────────────────────
  if (!isAuthenticated && !loading) {
    return (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

          {/* ── Yellow header ── */}
          <div ref={titleRef} style={{
            background: "#FFD700", padding: "0px 5% 4px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Decorative rays */}
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

            {/* Back to home */}
            <motion.button
              initial={{ opacity: 0, x: -20 }} animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                display: "flex", alignItems: "center", gap: 6, background: "none",
                border: "none", cursor: "pointer", padding: 0, marginBottom: 10,
              }}>
              <ChevronRight size={16} color="#555" style={{ transform: "rotate(180deg)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
                Home
              </span>
            </motion.button>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <ShoppingBag size={36} color="#111" strokeWidth={2.5} />
              <h1 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 6vw, 72px)",
                color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1,
              }}>
                My Orders
              </h1>
            </motion.div>
          </div>

          {/* ── Perks strip ── */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "5%",
            background: "#111", padding: "12px 5%", flexWrap: "wrap",
          }}>
            {PERKS.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={15} color="#FFD700" strokeWidth={2} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 600 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Content ── */}
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5% 0" }}>
            <LoginPrompt onLoginClick={() => setShowLogin(true)} />
          </div>
        </motion.div>

        {/* Login Modal */}
        <AnimatePresence>
          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5EFD6",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 16 }}>
        <AlertCircle size={48} color="#E8192C" />
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 20, color: "#111" }}>
          {error}
        </p>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => window.location.reload()}
          style={{
            fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 2,
            background: "#E8192C", color: "#fff", border: "none",
            borderRadius: 50, padding: "12px 28px", cursor: "pointer",
          }}>
          RETRY
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

        {/* ── Yellow header ── */}
        <div ref={titleRef} style={{
          background: "#FFD700", padding: "0px 5% 4px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative rays */}
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

          {/* Back to home */}
          <motion.button
            initial={{ opacity: 0, x: -20 }} animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "none",
              border: "none", cursor: "pointer", padding: 0, marginBottom: 10,
            }}>
            <ChevronRight size={16} color="#555" style={{ transform: "rotate(180deg)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
              Home
            </span>
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <ShoppingBag size={36} color="#111" strokeWidth={2.5} />
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 72px)",
              color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1,
            }}>
              My Orders
            </h1>
          </motion.div>

          {/* Stats row */}
          {orders.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#7a6500", margin: 0, letterSpacing: 1 }}>
                  TOTAL ORDERS
                </p>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: "2px 0 0" }}>
                  {orders.length}
                </p>
              </div>
              {totalSpent > 0 && (
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#7a6500", margin: 0, letterSpacing: 1 }}>
                    TOTAL SPENT
                  </p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "#111", margin: "2px 0 0" }}>
                    ₹{totalSpent.toFixed(0)}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Perks strip ── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "5%",
          background: "#111", padding: "12px 5%", flexWrap: "wrap",
        }}>
          {PERKS.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon size={15} color="#FFD700" strokeWidth={2} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 600 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 5% 0" }}>

          {/* Search + filter bar */}
          {orders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Search box */}
              <div style={{
                background: "#fff", borderRadius: 50, padding: "10px 18px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                <Search size={15} color="#888" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by order ID or product name..."
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
                  }}
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <XCircle size={15} color="#bbb" />
                  </button>
                )}
              </div>

              {/* Status filter pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <Filter size={13} color="#888" />
                {ALL_STATUSES.map(s => {
                  const active = filter === s;
                  const cfg = STATUS_CFG[s];
                  return (
                    <motion.button
                      key={s}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(s)}
                      style={{
                        fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
                        letterSpacing: 1, textTransform: "uppercase",
                        padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                        border: active ? "none" : "1.5px solid #ddd",
                        background: active ? (s === "all" ? "#111" : cfg?.bg || "#eee") : "#fff",
                        color: active ? (s === "all" ? "#FFD700" : cfg?.color || "#333") : "#888",
                        transition: "all 0.15s",
                      }}>
                      {s === "all" ? "All" : cfg?.label || s}
                      {s !== "all" && (
                        <span style={{ marginLeft: 5, opacity: 0.6 }}>
                          {orders.filter(o => o.status === s).length}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Orders list */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState
                filtered={filter !== "all" || search.trim() !== ""}
                onReset={() => { setFilter("all"); setSearch(""); }}
                onShop={() => navigate("/")}
              />
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map((order, i) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    index={i}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom shop more */}
          {orders.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/")}
                style={{
                  fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 1.5,
                  background: "#E8192C", color: "#fff", border: "none",
                  borderRadius: 50, padding: "14px 36px", cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(232,25,44,0.28)",
                }}>
                SHOP MORE
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <Login
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}