// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ShoppingBag,
//   CheckCircle2,
//   Truck,
//   Clock,
//   Eye,
//   Pencil,
//   Trash2,
//   ArrowUpRight,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";

// // ── Sample data ──────────────────────────────────────────────
// const SAMPLE_ORDERS = [
//   { id: "#ORD-1024", customer: "John Doe",     date: "12/1/2026", amount: "₹400", qty: 3, payment: "Paid",    status: "Pending"    },
//   { id: "#ORD-1023", customer: "Kabir Shing",  date: "12/1/2026", amount: "₹700", qty: 6, payment: "Failed",  status: "Processing" },
//   { id: "#ORD-1044", customer: "Nazmul Basu",  date: "12/1/2026", amount: "₹230", qty: 2, payment: "Pending", status: "Shipped"    },
//   { id: "#ORD-1230", customer: "Haque Bash",   date: "12/1/2026", amount: "₹120", qty: 1, payment: "Paid",    status: "Delivered"  },
//   { id: "#ORD-1390", customer: "Meher Kabir",  date: "12/1/2026", amount: "₹400", qty: 6, payment: "Paid",    status: "Shipped"    },
//   { id: "#ORD-1289", customer: "Christin",     date: "12/1/2026", amount: "₹670", qty: 3, payment: "Paid",    status: "Shipped"    },
//   { id: "#ORD-1290", customer: "Stan Kasti",   date: "12/1/2026", amount: "₹120", qty: 2, payment: "Failed",  status: "Processing" },
//   { id: "#ORD-1028", customer: "Katrina",      date: "12/1/2026", amount: "₹900", qty: 5, payment: "Pending", status: "Processing" },
// ];

// const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

// const STATUS_STYLE = {
//   Pending:    { bg: "#fff3e6", color: "#d97706" },
//   Processing: { bg: "#fef9c3", color: "#ca8a04" },
//   Shipped:    { bg: "#ede9fe", color: "#7c3aed" },
//   Delivered:  { bg: "#dcfce7", color: "#16a34a" },
//   Cancelled:  { bg: "#fee2e2", color: "#dc2626" },
// };

// const PAYMENT_COLOR = {
//   Paid:    "#16a34a",
//   Failed:  "#dc2626",
//   Pending: "#d97706",
// };

// const STATS = [
//   { label: "Total Orders", value: "128", change: "+12.4%", up: true,  icon: ShoppingBag,   color: "#6366f1" },
//   { label: "Completed",    value: "198", change: "+11.4%", up: true,  icon: CheckCircle2,  color: "#16a34a" },
//   { label: "In Transit",   value: "32",  change: "-15.4%", up: false, icon: Truck,         color: "#E8472A" },
//   { label: "Pending",      value: "32",  change: "+10.4%", up: true,  icon: Clock,         color: "#d97706" },
// ];

// // ── Component ────────────────────────────────────────────────
// export default function AdminOrders() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState(SAMPLE_ORDERS);
//   const [editingId, setEditingId] = useState(null);

//   const updateStatus = (orderId, newStatus) => {
//     setOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//     );
//     setEditingId(null);
//   };

//   const deleteOrder = (orderId) => {
//     setOrders((prev) => prev.filter((o) => o.id !== orderId));
//   };

//   return (
//     <div style={s.page}>
//       {/* ── Page header ── */}
//       <div style={s.pageHeader}>
//         <div>
//           <h1 style={s.pageTitle}>Orders</h1>
//           <p style={s.pageSubtitle}>Manage and track all customer orders in one place.</p>
//         </div>
//         <button style={s.addBtn} onClick={() => alert("Add New Order flow coming soon")}>
//           + Add New Order
//         </button>
//       </div>

//       {/* ── Mini stat cards ── */}
//       <div style={s.statsGrid}>
//         {STATS.map(({ label, value, change, up, icon: Icon, color }) => (
//           <div key={label} style={s.statCard}>
//             <div style={s.statTop}>
//               <div style={{ ...s.statIconWrap, backgroundColor: color + "18" }}>
//                 <Icon size={18} color={color} />
//               </div>
//               <span style={s.statLabel}>{label}</span>
//             </div>
//             <div style={s.statValue}>{value}</div>
//             <div style={{ ...s.statChange, color: up ? "#16a34a" : "#dc2626" }}>
//               {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
//               <span>{change} vs last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ── Recent Orders table card ── */}
//       <div style={s.card}>
//         <div style={s.cardHeader}>
//           <div>
//             <h2 style={s.cardTitle}>Recent Orders</h2>
//             <p style={s.cardSubtitle}>Latest 8 orders</p>
//           </div>
//           <button style={s.viewAllBtn} onClick={() => navigate("/admin/orders/all")}>
//             View All <ArrowUpRight size={14} style={{ marginLeft: 4 }} />
//           </button>
//         </div>

//         {/* Table wrapper */}
//         <div style={s.tableWrap}>
//           <table style={s.table}>
//             <thead>
//               <tr>
//                 {["Order ID", "Customer", "Date", "Amount", "Qty", "Payment", "Status", "Action"].map((h) => (
//                   <th key={h} style={s.th}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} style={s.tr}>
//                   <td style={s.td}><span style={s.orderId}>{order.id}</span></td>
//                   <td style={s.td}>{order.customer}</td>
//                   <td style={s.td}>{order.date}</td>
//                   <td style={s.td}>{order.amount}</td>
//                   <td style={s.td}>{order.qty}</td>
//                   <td style={s.td}>
//                     <span style={{ color: PAYMENT_COLOR[order.payment], fontWeight: 500 }}>
//                       {order.payment}
//                     </span>
//                   </td>

//                   {/* Status — click to toggle dropdown */}
//                   <td style={s.td}>
//                     {editingId === order.id ? (
//                       <select
//                         autoFocus
//                         value={order.status}
//                         onChange={(e) => updateStatus(order.id, e.target.value)}
//                         onBlur={() => setEditingId(null)}
//                         style={s.statusSelect}
//                       >
//                         {STATUS_OPTIONS.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span
//                         onClick={() => setEditingId(order.id)}
//                         title="Click to change status"
//                         style={{
//                           ...s.statusBadge,
//                           backgroundColor: STATUS_STYLE[order.status]?.bg,
//                           color: STATUS_STYLE[order.status]?.color,
//                           cursor: "pointer",
//                         }}
//                       >
//                         {order.status}
//                       </span>
//                     )}
//                   </td>

//                   {/* Actions */}
//                   <td style={s.td}>
//                     <div style={s.actions}>
//                       <button style={{ ...s.actionBtn, color: "#16a34a" }} title="View">
//                         <Eye size={15} />
//                       </button>
//                       <button
//                         style={{ ...s.actionBtn, color: "#d97706" }}
//                         title="Edit status"
//                         onClick={() => setEditingId(order.id)}
//                       >
//                         <Pencil size={15} />
//                       </button>
//                       <button
//                         style={{ ...s.actionBtn, color: "#dc2626" }}
//                         title="Delete"
//                         onClick={() => deleteOrder(order.id)}
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Styles ───────────────────────────────────────────────────
// const s = {
//   page: { fontFamily: "Inter, sans-serif" },
//   pageHeader: {
//     display: "flex", alignItems: "flex-start", justifyContent: "space-between",
//     flexWrap: "wrap", gap: 12, marginBottom: 24,
//   },
//   pageTitle:    { fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 },
//   pageSubtitle: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
//   addBtn: {
//     backgroundColor: "#E8472A", color: "#fff", border: "none",
//     borderRadius: 8, padding: "10px 18px", fontSize: 13,
//     fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
//     display: "flex", alignItems: "center", gap: 6,
//   },

//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 16, marginBottom: 24,
//   },
//   statCard: {
//     backgroundColor: "#fff", borderRadius: 12, padding: "18px 20px",
//     border: "1px solid #f0f0f0",
//   },
//   statTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
//   statIconWrap: {
//     width: 36, height: 36, borderRadius: 8,
//     display: "flex", alignItems: "center", justifyContent: "center",
//   },
//   statLabel: { fontSize: 13, color: "#6b7280", fontWeight: 500 },
//   statValue: { fontSize: 26, fontWeight: 700, color: "#111827", marginBottom: 6 },
//   statChange: {
//     display: "flex", alignItems: "center", gap: 4,
//     fontSize: 12, fontWeight: 500,
//   },

//   card: {
//     backgroundColor: "#fff", borderRadius: 14,
//     border: "1px solid #f0f0f0", overflow: "hidden",
//   },
//   cardHeader: {
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     padding: "20px 24px 16px", borderBottom: "1px solid #f5f5f5",
//     flexWrap: "wrap", gap: 10,
//   },
//   cardTitle:    { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
//   cardSubtitle: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },
//   viewAllBtn: {
//     display: "flex", alignItems: "center",
//     backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
//     borderRadius: 8, padding: "7px 14px", fontSize: 13,
//     fontWeight: 500, color: "#374151", cursor: "pointer",
//     fontFamily: "Inter, sans-serif",
//   },

//   tableWrap: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: 700 },
//   th: {
//     padding: "10px 16px", textAlign: "left", fontSize: 12,
//     fontWeight: 600, color: "#6b7280", backgroundColor: "#fafafa",
//     borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
//   },
//   tr: { borderBottom: "1px solid #f9f9f9", transition: "background 0.1s" },
//   td: { padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" },
//   orderId: { fontWeight: 600, color: "#111827" },

//   statusBadge: {
//     display: "inline-block", padding: "4px 10px",
//     borderRadius: 20, fontSize: 12, fontWeight: 500,
//     userSelect: "none",
//   },
//   statusSelect: {
//     border: "1px solid #e5e7eb", borderRadius: 6,
//     padding: "4px 8px", fontSize: 12, fontFamily: "Inter, sans-serif",
//     outline: "none", cursor: "pointer",
//   },

//   actions: { display: "flex", alignItems: "center", gap: 8 },
//   actionBtn: {
//     background: "none", border: "none", cursor: "pointer",
//     padding: 4, borderRadius: 4, display: "flex",
//     alignItems: "center", justifyContent: "center",
//   },
// };





















import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag, CheckCircle2, Truck, Clock,
  Eye, Pencil, Trash2, ArrowUpRight,
  TrendingUp, TrendingDown, RefreshCw, AlertCircle, X,
} from "lucide-react";

const BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

// ── auth helpers ─────────────────────────────────────────────
const getToken = () =>
  localStorage.getItem("admin_access_token") ?? sessionStorage.getItem("access_token") ?? "";

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

// ── api helper ───────────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const res = await fetch(`${BASE}/api${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── constants ────────────────────────────────────────────────
const STATUS_OPTIONS = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

const STATUS_STYLE = {
  pending:    { bg: "#fff3e6", color: "#d97706",  label: "Pending"    },
  confirmed:  { bg: "#dbeafe", color: "#2563eb",  label: "Confirmed"  },
  packed:     { bg: "#fef9c3", color: "#ca8a04",  label: "Packed"     },
  shipped:    { bg: "#ede9fe", color: "#7c3aed",  label: "Shipped"    },
  delivered:  { bg: "#dcfce7", color: "#16a34a",  label: "Delivered"  },
  cancelled:  { bg: "#fee2e2", color: "#dc2626",  label: "Cancelled"  },
};

const PAYMENT_COLOR = {
  paid:     "#16a34a",
  failed:   "#dc2626",
  pending:  "#d97706",
  refunded: "#6b7280",
};

// ── Order Detail Modal ────────────────────────────────────────
function OrderDetailModal({ order, onClose, onStatusSave }) {
  const [status, setStatus]   = useState(order.status);
  const [courier, setCourier] = useState(order.courier_name ?? "");
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [trackLink, setTrackLink] = useState(order.tracking_link ?? "");
  const [saving, setSaving]   = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await apiFetch(`/admin/orders/${order.id}/`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          status,
          courier_name: courier,
          tracking_number: tracking,
          tracking_link: trackLink,
        }),
      });
      onStatusSave(updated);
      onClose();
    } catch (e) {
      alert(`Update failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const st = STATUS_STYLE[status] ?? STATUS_STYLE.pending;

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={m.header}>
          <div>
            <h2 style={m.title}>{order.order_number}</h2>
            <p style={m.sub}>Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <button style={m.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <div style={m.body}>
          {/* Left */}
          <div style={m.col}>

            {/* Customer */}
            <div style={m.section}>
              <p style={m.sLabel}>Customer</p>
              <p style={m.value}>{order.customer_name}</p>
              <p style={m.muted}>{order.user_email}</p>
              <p style={m.muted}>📞 {order.phone}{order.alt_phone ? ` / ${order.alt_phone}` : ""}</p>
            </div>

            {/* Address */}
            <div style={m.section}>
              <p style={m.sLabel}>Delivery Address</p>
              <p style={m.value}>
                {order.address_line1}{order.address_line2 ? `, ${order.address_line2}` : ""}
              </p>
              <p style={m.muted}>{order.city}, {order.state} – {order.pincode}</p>
              <p style={m.muted}>Zone: <strong>{order.delivery_zone}</strong></p>
            </div>

            {/* Items */}
            <div style={m.section}>
              <p style={m.sLabel}>Order Items</p>
              {order.items?.map((item) => (
                <div key={item.id} style={m.itemRow}>
                  <span style={m.itemName}>{item.product_name} ({item.weight})</span>
                  <span style={m.itemQty}>×{item.quantity}</span>
                  <span style={m.itemPrice}>₹{item.line_total}</span>
                </div>
              ))}
              <div style={m.divider} />
              <div style={m.itemRow}>
                <span style={m.muted}>Subtotal</span>
                <span style={m.value}>₹{order.subtotal}</span>
              </div>
              <div style={m.itemRow}>
                <span style={m.muted}>Delivery</span>
                <span style={m.value}>₹{order.delivery_charge}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div style={m.itemRow}>
                  <span style={m.muted}>Discount</span>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>−₹{order.discount}</span>
                </div>
              )}
              <div style={{ ...m.itemRow, marginTop: 8 }}>
                <span style={{ fontWeight: 700, color: "#111827" }}>Total</span>
                <span style={{ fontWeight: 700, color: "#E8472A", fontSize: 16 }}>₹{order.total_amount}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={m.col}>

            {/* Payment */}
            <div style={m.section}>
              <p style={m.sLabel}>Payment</p>
              <span style={{ ...m.badge, color: PAYMENT_COLOR[order.payment_status], backgroundColor: PAYMENT_COLOR[order.payment_status] + "18" }}>
                {order.payment_status?.toUpperCase()}
              </span>
              {order.razorpay_order_id && (
                <p style={{ ...m.muted, marginTop: 6 }}>Razorpay: {order.razorpay_order_id}</p>
              )}
            </div>

            {/* Status update */}
            <div style={m.section}>
              <p style={m.sLabel}>Order Status</p>
              <div style={m.selectWrap}>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ ...m.select, color: st.color, backgroundColor: st.bg, borderColor: st.color + "44" }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{STATUS_STYLE[s]?.label ?? s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tracking */}
            <div style={m.section}>
              <p style={m.sLabel}>Courier & Tracking</p>
              <input
                style={m.input}
                placeholder="Courier name (e.g. Delhivery)"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
              />
              <input
                style={{ ...m.input, marginTop: 8 }}
                placeholder="Tracking number"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
              />
              <input
                style={{ ...m.input, marginTop: 8 }}
                placeholder="Tracking URL"
                value={trackLink}
                onChange={(e) => setTrackLink(e.target.value)}
              />
            </div>

            <button
              style={{ ...m.saveBtn, opacity: saving ? 0.7 : 1 }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function AdminOrders() {
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [editingId, setEditing] = useState(null);   // inline status dropdown
  const [viewOrder, setView]    = useState(null);   // detail modal
  const [statusFilter, setStatusFilter] = useState("");

  // ── fetch ───────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const path = statusFilter
        ? `/admin/orders/?status=${statusFilter}`
        : "/admin/orders/";
      const data = await apiFetch(path, { headers: authHeaders() });
      setOrders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── inline status update ────────────────────────────────────
  const updateStatus = async (orderId, newStatus) => {
    try {
      const updated = await apiFetch(`/admin/orders/${orderId}/`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (e) {
      alert(`Status update failed: ${e.message}`);
    } finally {
      setEditing(null);
    }
  };

  // ── after detail modal save ─────────────────────────────────
  const handleDetailSave = (updated) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  // ── derived stats ───────────────────────────────────────────
  const stats = [
    { label: "Total Orders",  value: orders.length,                                                       icon: ShoppingBag,  color: "#6366f1" },
    { label: "Delivered",     value: orders.filter((o) => o.status === "delivered").length,               icon: CheckCircle2, color: "#16a34a" },
    { label: "In Transit",    value: orders.filter((o) => o.status === "shipped").length,                 icon: Truck,        color: "#E8472A" },
    { label: "Pending",       value: orders.filter((o) => o.status === "pending").length,                 icon: Clock,        color: "#d97706" },
  ];

  return (
    <div style={s.page}>

      {/* ── Page header ── */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Orders</h1>
          <p style={s.pageSubtitle}>Manage and track all customer orders in one place.</p>
        </div>
        <button style={s.refreshBtn} onClick={fetchOrders} title="Refresh">
          <RefreshCw size={15} />
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={s.errorBanner}>
          <AlertCircle size={15} /> {error}
          <button style={s.retryBtn} onClick={fetchOrders}>Retry</button>
        </div>
      )}

      {/* ── Mini stat cards ── */}
      <div style={s.statsGrid}>
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={s.statCard}>
            <div style={s.statTop}>
              <div style={{ ...s.statIconWrap, backgroundColor: color + "18" }}>
                <Icon size={18} color={color} />
              </div>
              <span style={s.statLabel}>{label}</span>
            </div>
            <div style={s.statValue}>{loading ? "—" : value}</div>
          </div>
        ))}
      </div>

      {/* ── Orders table card ── */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div>
            <h2 style={s.cardTitle}>All Orders</h2>
            <p style={s.cardSubtitle}>{loading ? "Loading…" : `${orders.length} orders`}</p>
          </div>

          {/* Status filter */}
          <div style={s.filterRow}>
            {["", "pending", "confirmed", "packed", "shipped", "delivered", "cancelled"].map((val) => (
              <button
                key={val}
                onClick={() => setStatusFilter(val)}
                style={{
                  ...s.filterBtn,
                  ...(statusFilter === val ? s.filterBtnActive : {}),
                }}
              >
                {val === "" ? "All" : STATUS_STYLE[val]?.label ?? val}
              </button>
            ))}
          </div>
        </div>

        <div style={s.tableWrap}>
          {loading ? (
            <div style={s.loadingRow}>Loading orders…</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["Order ID", "Customer", "Date", "Amount", "Items", "Payment", "Status", "Action"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#9ca3af", padding: 40 }}>
                      No orders found.
                    </td>
                  </tr>
                ) : orders.map((order) => {
                  const st = STATUS_STYLE[order.status] ?? STATUS_STYLE.pending;
                  return (
                    <tr key={order.id} style={s.tr}>
                      <td style={s.td}>
                        <span style={s.orderId}>{order.order_number}</span>
                      </td>
                      <td style={s.td}>
                        <div>
                          <span style={{ fontWeight: 500, color: "#111827" }}>{order.customer_name}</span>
                          {order.user_email && (
                            <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>{order.user_email}</p>
                          )}
                        </div>
                      </td>
                      <td style={s.td}>
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                      <td style={s.td}>
                        <span style={{ fontWeight: 600, color: "#111827" }}>₹{order.total_amount}</span>
                      </td>
                      <td style={s.td}>{order.items?.length ?? "—"}</td>
                      <td style={s.td}>
                        <span style={{ color: PAYMENT_COLOR[order.payment_status] ?? "#374151", fontWeight: 500 }}>
                          {order.payment_status
                            ? order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)
                            : "—"}
                        </span>
                      </td>

                      {/* Status — click to toggle inline dropdown */}
                      <td style={s.td}>
                        {editingId === order.id ? (
                          <select
                            autoFocus
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            onBlur={() => setEditing(null)}
                            style={s.statusSelect}
                          >
                            {STATUS_OPTIONS.map((sv) => (
                              <option key={sv} value={sv}>{STATUS_STYLE[sv]?.label ?? sv}</option>
                            ))}
                          </select>
                        ) : (
                          <span
                            onClick={() => setEditing(order.id)}
                            title="Click to change status"
                            style={{ ...s.statusBadge, backgroundColor: st.bg, color: st.color, cursor: "pointer" }}
                          >
                            {st.label}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={s.td}>
                        <div style={s.actions}>
                          <button
                            style={{ ...s.actionBtn, color: "#16a34a" }}
                            title="View details"
                            onClick={() => setView(order)}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            style={{ ...s.actionBtn, color: "#d97706" }}
                            title="Edit status"
                            onClick={() => setEditing(order.id)}
                          >
                            <Pencil size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Order detail modal ── */}
      {viewOrder && (
        <OrderDetailModal
          order={viewOrder}
          onClose={() => setView(null)}
          onStatusSave={handleDetailSave}
        />
      )}
    </div>
  );
}

// ── Page styles ──────────────────────────────────────────────
const s = {
  page: { fontFamily: "Inter, sans-serif" },
  pageHeader: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    flexWrap: "wrap", gap: 12, marginBottom: 24,
  },
  pageTitle:    { fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 },
  pageSubtitle: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
  refreshBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "10px 12px", cursor: "pointer", color: "#6b7280",
  },

  errorBanner: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#fee2e2", color: "#dc2626", borderRadius: 8,
    padding: "10px 16px", marginBottom: 16, fontSize: 13,
  },
  retryBtn: {
    marginLeft: "auto", background: "none", border: "1px solid #dc2626",
    color: "#dc2626", borderRadius: 6, padding: "4px 10px",
    fontSize: 12, cursor: "pointer",
  },
  loadingRow: {
    padding: "40px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14,
  },

  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16, marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#fff", borderRadius: 12, padding: "18px 20px",
    border: "1px solid #f0f0f0",
  },
  statTop:    { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  statIconWrap: {
    width: 36, height: 36, borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  statLabel: { fontSize: 13, color: "#6b7280", fontWeight: 500 },
  statValue: { fontSize: 26, fontWeight: 700, color: "#111827" },

  card: {
    backgroundColor: "#fff", borderRadius: 14,
    border: "1px solid #f0f0f0", overflow: "hidden",
  },
  cardHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 24px 16px", borderBottom: "1px solid #f5f5f5",
    flexWrap: "wrap", gap: 12,
  },
  cardTitle:    { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
  cardSubtitle: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },

  filterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  filterBtn: {
    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 20, padding: "5px 12px", fontSize: 12,
    fontWeight: 500, color: "#6b7280", cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  },
  filterBtnActive: {
    backgroundColor: "#E8472A", borderColor: "#E8472A", color: "#fff",
  },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 700 },
  th: {
    padding: "10px 16px", textAlign: "left", fontSize: 12,
    fontWeight: 600, color: "#6b7280", backgroundColor: "#fafafa",
    borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: { padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" },
  orderId: { fontWeight: 600, color: "#111827" },

  statusBadge: {
    display: "inline-block", padding: "4px 10px",
    borderRadius: 20, fontSize: 12, fontWeight: 500, userSelect: "none",
  },
  statusSelect: {
    border: "1px solid #e5e7eb", borderRadius: 6,
    padding: "4px 8px", fontSize: 12, fontFamily: "Inter, sans-serif",
    outline: "none", cursor: "pointer",
  },

  actions:   { display: "flex", alignItems: "center", gap: 8 },
  actionBtn: {
    background: "none", border: "none", cursor: "pointer",
    padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
  },
};

// ── Modal styles ─────────────────────────────────────────────
const m = {
  overlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
    padding: 16,
  },
  modal: {
    backgroundColor: "#fff", borderRadius: 16, width: "100%",
    maxWidth: 780, maxHeight: "90vh", overflowY: "auto",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    padding: "20px 24px", borderBottom: "1px solid #f0f0f0",
  },
  title:    { fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 },
  sub:      { fontSize: 12, color: "#9ca3af", margin: "4px 0 0" },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#6b7280", padding: 4, display: "flex", alignItems: "center",
  },
  body: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 0,
  },
  col: {
    padding: "20px 24px",
    borderRight: "1px solid #f0f0f0",
  },
  section:  { marginBottom: 20 },
  sLabel:   { fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" },
  value:    { fontSize: 14, fontWeight: 500, color: "#111827", margin: "0 0 2px" },
  muted:    { fontSize: 13, color: "#6b7280", margin: "2px 0 0" },
  badge: {
    display: "inline-block", padding: "4px 10px",
    borderRadius: 20, fontSize: 12, fontWeight: 600,
  },
  divider:  { borderTop: "1px solid #f0f0f0", margin: "10px 0" },
  itemRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName:  { fontSize: 13, color: "#374151", flex: 1 },
  itemQty:   { fontSize: 13, color: "#6b7280", margin: "0 12px" },
  itemPrice: { fontSize: 13, fontWeight: 600, color: "#111827" },

  selectWrap: { position: "relative" },
  select: {
    border: "1.5px solid", borderRadius: 8,
    padding: "8px 12px", fontSize: 13, fontWeight: 600,
    fontFamily: "Inter, sans-serif", outline: "none",
    width: "100%", cursor: "pointer", appearance: "none",
  },
  input: {
    border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "9px 12px", fontSize: 13, color: "#111827",
    fontFamily: "Inter, sans-serif", outline: "none",
    width: "100%", boxSizing: "border-box", backgroundColor: "#fff",
  },
  saveBtn: {
    display: "block", width: "100%",
    backgroundColor: "#E8472A", color: "#fff", border: "none",
    borderRadius: 8, padding: "11px", fontSize: 14,
    fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
    marginTop: 8,
  },
};