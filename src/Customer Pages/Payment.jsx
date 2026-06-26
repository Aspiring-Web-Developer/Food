



// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import {
//   CreditCard, Lock, Phone, User, Mail,
//   ChevronLeft, ShieldCheck,
//   ArrowRight, Building2, Hash, X
// } from "lucide-react";

// // ─── helpers ────────────────────────────────────────────────────────────────
// function formatCard(v) {
//   return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
// }
// function formatExpiry(v) {
//   const d = v.replace(/\D/g, "").slice(0, 4);
//   return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
// }

// // ─── Cartoon Thumbs-Up Character (Success) ───────────────────────────────────
// // Uses a classic flat emoji-style thumbs-up: closed fist facing right, thumb
// // pointing straight UP — zero ambiguity, clearly positive.
// function CartoonSuccess() {
//   return (
//     <svg width="150" height="150" viewBox="0 0 150 150" fill="none">

//       {/* ── Pulsing outer ring ── */}
//       <motion.circle
//         cx="75" cy="75" r="52"
//         stroke="#5F259F" strokeWidth="2.5" fill="none"
//         initial={{ scale: 0.7, opacity: 0.6 }}
//         animate={{ scale: [0.7, 1.35], opacity: [0.6, 0] }}
//         transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
//         style={{ transformOrigin: "75px 75px" }}
//       />

//       {/* ── Main badge (bounce-in wrapper, same as before) ── */}
//       <motion.g
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
//         style={{ transformOrigin: "75px 75px" }}
//       >
//         {/* purple circle */}
//         <circle cx="75" cy="75" r="48" fill="#5F259F" />

//         {/* lighter inner ring accent */}
//         <circle cx="75" cy="75" r="48" fill="none" stroke="#7C3FB5" strokeWidth="2" opacity="0.5" />

//         {/* checkmark draw-in */}
//         <motion.path
//           d="M53 77 L68 92 L99 58"
//           stroke="#fff" strokeWidth="8"
//           strokeLinecap="round" strokeLinejoin="round" fill="none"
//           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
//           transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
//         />
//       </motion.g>

//       {/* ── Sparkles (pop in after badge, same timing as original) ── */}
//       {[
//         { x: 122, y: 24, delay: 0.7,  size: 7 },
//         { x: 16,  y: 32, delay: 0.8,  size: 6 },
//         { x: 130, y: 74, delay: 0.75, size: 5 },
//         { x: 28,  y: 102, delay: 0.85, size: 5 },
//         { x: 108, y: 110, delay: 0.9, size: 6 },
//       ].map((s, i) => (
//         <motion.g key={i}
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }}
//           transition={{ delay: s.delay, duration: 0.35 }}
//           style={{ transformOrigin: `${s.x}px ${s.y}px` }}
//         >
//           <line x1={s.x} y1={s.y - s.size} x2={s.x} y2={s.y + s.size}
//             stroke="#5F259F" strokeWidth="2.5" strokeLinecap="round" />
//           <line x1={s.x - s.size} y1={s.y} x2={s.x + s.size} y2={s.y}
//             stroke="#5F259F" strokeWidth="2.5" strokeLinecap="round" />
//           <line x1={s.x - s.size * 0.65} y1={s.y - s.size * 0.65}
//                 x2={s.x + s.size * 0.65} y2={s.y + s.size * 0.65}
//             stroke="#A06CD5" strokeWidth="1.5" strokeLinecap="round" />
//           <line x1={s.x + s.size * 0.65} y1={s.y - s.size * 0.65}
//                 x2={s.x - s.size * 0.65} y2={s.y + s.size * 0.65}
//             stroke="#A06CD5" strokeWidth="1.5" strokeLinecap="round" />
//         </motion.g>
//       ))}

//       {/* ── Floating bounce (same as original) ── */}
//       <motion.g
//         animate={{ y: [0, -6, 0] }}
//         transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.9 }}
//       />
//     </svg>
//   );
// }

// // ─── Cartoon Sad Character (Failed) ──────────────────────────────────────────
// function CartoonFailed() {
//   return (
//     <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
//       {/* Body */}
//       <ellipse cx="70" cy="108" rx="26" ry="16" fill="#E8192C" opacity="0.7" />
//       {/* Head */}
//       <motion.circle
//         cx="70" cy="64" r="34"
//         fill="#FF6B6B"
//         initial={{ scale: 0 }} animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 200, damping: 14 }}
//       />
//       {/* Sad eyes — X shape */}
//       {[55, 85].map((cx, i) => (
//         <motion.g key={i}
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 + i * 0.1 }}>
//           <line x1={cx - 5} y1="54" x2={cx + 5} y2="64" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" />
//           <line x1={cx + 5} y1="54" x2={cx - 5} y2="64" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" />
//         </motion.g>
//       ))}
//       {/* Sad mouth */}
//       <motion.path
//         d="M54 80 Q70 68 86 80"
//         stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" fill="none"
//         initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       />
//       {/* Tear drops */}
//       {[
//         { cx: 50, delay: 0.7, dur: 1.2 },
//         { cx: 90, delay: 0.9, dur: 1.5 },
//       ].map((t, i) => (
//         <motion.ellipse key={i}
//           cx={t.cx} cy="72" rx="3" ry="5" fill="#6BB5FF" opacity="0.85"
//           initial={{ y: 0, opacity: 0.9 }}
//           animate={{ y: [0, 18, 18], opacity: [0.9, 0.9, 0] }}
//           transition={{ delay: t.delay, duration: t.dur, repeat: Infinity, repeatDelay: 0.8 }}
//         />
//       ))}
//       {/* Arms drooping */}
//       <motion.rect x="22" y="90" width="14" height="22" rx="7" fill="#FF6B6B"
//         initial={{ rotate: 0 }} animate={{ rotate: 15 }}
//         transition={{ delay: 0.5, type: "spring" }}
//         style={{ transformOrigin: "29px 90px" }}
//       />
//       <motion.rect x="102" y="90" width="14" height="22" rx="7" fill="#FF6B6B"
//         initial={{ rotate: 0 }} animate={{ rotate: -15 }}
//         transition={{ delay: 0.5, type: "spring" }}
//         style={{ transformOrigin: "109px 90px" }}
//       />
//       {/* Sweat drop */}
//       <motion.ellipse cx="100" cy="44" rx="4" ry="6" fill="#6BB5FF" opacity="0.7"
//         initial={{ scale: 0 }} animate={{ scale: 1 }}
//         transition={{ delay: 0.8 }}
//       />
//     </svg>
//   );
// }

// // ─── Result Popup ─────────────────────────────────────────────────────────────
// function ResultPopup({ success, total, onClose, onRetry }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: "0 20px",
//       }}
//     >
//       <motion.div
//         initial={{ scale: 0.65, y: 80, opacity: 0 }}
//         animate={{ scale: 1, y: 0, opacity: 1 }}
//         exit={{ scale: 0.75, y: -40, opacity: 0 }}
//         transition={{ type: "spring", stiffness: 300, damping: 22 }}
//         style={{
//           background: "#fff", borderRadius: 28,
//           padding: "40px 36px 32px",
//           textAlign: "center", maxWidth: 360, width: "100%",
//           boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
//           position: "relative", overflow: "hidden",
//         }}
//       >
//         {/* Top strip */}
//         <div style={{
//           position: "absolute", top: 0, left: 0, right: 0, height: 6,
//           background: success
//             ? "linear-gradient(90deg,#FFD700,#1E5C2A,#FFD700)"
//             : "linear-gradient(90deg,#E8192C,#FF6B6B,#E8192C)",
//         }} />

//         {/* Character */}
//         <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
//           {success ? <CartoonSuccess /> : <CartoonFailed />}
//         </div>

//         <motion.h2
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 26,
//             color: success ? "#1E5C2A" : "#E8192C",
//             margin: "0 0 8px", letterSpacing: -0.5,
//           }}
//         >
//           {success ? "Woohoo! Order Placed! " : "Oops! Payment Failed"}
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           style={{
//             fontFamily: "var(--font-body)", fontSize: 14,
//             color: "#666", margin: "0 0 22px", lineHeight: 1.6,
//           }}
//         >
//           {success
//             ? "Your makhana is on its way! We've sent a confirmation to your email."
//             : "Something went wrong with your payment. Please check your details and try again."}
//         </motion.p>

//         {success && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.65 }}
//             style={{
//               background: "#F5EFD6", borderRadius: 14,
//               padding: "14px 20px", marginBottom: 22,
//             }}
//           >
//             <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: "0 0 4px" }}>
//               Amount paid
//             </p>
//             <p style={{ fontFamily: "var(--font-heading)", fontSize: 30, color: "#1E5C2A", margin: 0 }}>
//               ₹{total}
//             </p>
//           </motion.div>
//         )}

//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           <motion.button
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.75 }}
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={onClose}
//             style={{
//               width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
//               letterSpacing: 2,
//               background: success ? "#E8192C" : "#111",
//               color: "#fff", border: "none", borderRadius: 50,
//               padding: "15px 0", cursor: "pointer",
//               boxShadow: success
//                 ? "0 6px 24px rgba(232,25,44,0.3)"
//                 : "0 6px 24px rgba(0,0,0,0.2)",
//             }}
//           >
//             {success ? "CONTINUE SHOPPING" : "CLOSE"}
//           </motion.button>

//           {!success && (
//             <motion.button
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.85 }}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={onRetry}
//               style={{
//                 width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
//                 letterSpacing: 2, background: "transparent",
//                 color: "#E8192C", border: "2px solid #E8192C",
//                 borderRadius: 50, padding: "13px 0", cursor: "pointer",
//               }}
//             >
//               TRY AGAIN
//             </motion.button>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─── Input Field ──────────────────────────────────────────────────────────────
// function Field({ label, icon: Icon, error, ...props }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div style={{ marginBottom: 14 }}>
//       {label && (
//         <label style={{
//           fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
//           letterSpacing: 1, textTransform: "uppercase",
//           display: "block", marginBottom: 5,
//         }}>
//           {label}
//         </label>
//       )}
//       <div style={{
//         display: "flex", alignItems: "center", gap: 10,
//         border: `1.5px solid ${error ? "#E8192C" : focused ? "#111" : "#e0e0e0"}`,
//         borderRadius: 10, padding: "0 14px",
//         background: "#fff", transition: "border-color 0.2s",
//       }}>
//         {Icon && <Icon size={15} color={focused ? "#111" : "#bbb"} />}
//         <input
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           style={{
//             flex: 1, border: "none", outline: "none", background: "transparent",
//             fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
//             padding: "13px 0",
//           }}
//           {...props}
//         />
//       </div>
//       {error && (
//         <motion.p
//           initial={{ opacity: 0, y: -3 }}
//           animate={{ opacity: 1, y: 0 }}
//           style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E8192C", margin: "4px 0 0" }}
//         >
//           {error}
//         </motion.p>
//       )}
//     </div>
//   );
// }

// // ─── Payment Modal Wrapper ────────────────────────────────────────────────────
// /**
//  * Renders a full-screen overlay with the payment panel as a popup.
//  * Props:
//  *   total      – number
//  *   onClose    – fn  called when user closes (back or success)
//  *   onSuccess  – fn  called after success popup is dismissed
//  */
// export function PaymentModal({ total, onClose, onSuccess }) {
//   return (
//     <AnimatePresence>
//       <motion.div
//         key="payment-overlay"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         style={{
//           position: "fixed", inset: 0, zIndex: 1000,
//           background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           padding: "20px",
//           overflowY: "auto",
//         }}
//         onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
//       >
//         <motion.div
//           initial={{ scale: 0.82, y: 60, opacity: 0 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.85, y: 40, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 340, damping: 26 }}
//           style={{ width: "100%", maxWidth: 520, position: "relative" }}
//         >
//           {/* Close X button */}
//           <motion.button
//             whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.18)" }}
//             whileTap={{ scale: 0.92 }}
//             onClick={onClose}
//             style={{
//               position: "absolute", top: -14, right: -14, zIndex: 10,
//               width: 36, height: 36, borderRadius: "50%",
//               background: "rgba(255,255,255,0.12)",
//               border: "1.5px solid rgba(255,255,255,0.3)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               cursor: "pointer", color: "#fff", backdropFilter: "blur(4px)",
//             }}
//           >
//             <X size={16} />
//           </motion.button>

//           <PaymentPanel
//             total={total}
//             onBack={onClose}
//             onSuccess={onSuccess}
//             isModal
//           />
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ─── Payment Panel (inner content) ───────────────────────────────────────────
// export function PaymentPanel({ total, onBack, onSuccess, isModal = false }) {
//   const [tab, setTab]             = useState("card");
//   const [cardNum, setCardNum]     = useState("");
//   const [expiry, setExpiry]       = useState("");
//   const [cvv, setCvv]             = useState("");
//   const [name, setName]           = useState("");
//   const [email, setEmail]         = useState("");
//   const [phone, setPhone]         = useState("");
//   const [upiId, setUpiId]         = useState("");
//   const [bank, setBank]           = useState("");
//   const [errors, setErrors]       = useState({});
//   const [loading, setLoading]     = useState(false);
//   const [result, setResult]       = useState(null); // "success" | "failed" | null

//   const panelAnim = useAnimation();
//   useEffect(() => {
//     // vibrate on mount
//     panelAnim.start({
//       x: [0, -10, 10, -7, 7, -3, 3, 0],
//       transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
//     });
//   }, []);

//   function validate() {
//     const e = {};
//     if (!name.trim())  e.name  = "Name is required";
//     if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
//     if (!phone.trim() || phone.replace(/\D/g,"").length !== 10) e.phone = "10-digit number required";
//     if (tab === "card") {
//       if (cardNum.replace(/\s/g,"").length !== 16) e.cardNum = "16-digit card number required";
//       if (expiry.length < 5)  e.expiry = "MM/YY required";
//       if (cvv.length < 3)     e.cvv    = "3-digit CVV required";
//     }
//     if (tab === "upi")        { if (!upiId.includes("@")) e.upiId = "Enter valid UPI ID"; }
//     if (tab === "netbanking") { if (!bank) e.bank = "Select a bank"; }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   function handlePay() {
//     if (!validate()) return;
//     setLoading(true);
//     // Demo: simulate success (swap to real Razorpay SDK here)
//     setTimeout(() => {
//       setLoading(false);
//       // To simulate failure, change "success" to "failed"
//       setResult("success");
//     }, 1800);
//   }

//   const TABS = [
//     { id: "card",       label: "Card",       Icon: CreditCard },
//     { id: "upi",        label: "UPI",        Icon: Phone },
//     { id: "netbanking", label: "Net Banking", Icon: Building2 },
//   ];

//   const BANKS = ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Bank", "Yes Bank"];

//   return (
//     <>
//       <motion.div
//         animate={panelAnim}
//         style={{
//           background: "#fff",
//           borderRadius: isModal ? 20 : 16,
//           overflow: "hidden",
//           boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
//           maxHeight: isModal ? "90vh" : "none",
//           overflowY: isModal ? "auto" : "visible",
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           background: "#111", padding: "16px 20px",
//           display: "flex", alignItems: "center", gap: 10,
//           position: "sticky", top: 0, zIndex: 5,
//         }}>
//           {!isModal && (
//             <motion.button
//               whileHover={{ x: -3 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onBack}
//               style={{
//                 background: "rgba(255,255,255,0.12)", border: "none",
//                 borderRadius: "50%", width: 32, height: 32,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 cursor: "pointer", color: "#fff",
//               }}
//             >
//               <ChevronLeft size={18} />
//             </motion.button>
//           )}
//           <Lock size={16} color="#FFD700" />
//           <p style={{
//             fontFamily: "var(--font-heading)", fontSize: 16,
//             color: "#FFD700", margin: 0, letterSpacing: 1,
//           }}>
//             SECURE PAYMENT
//           </p>
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
//             <ShieldCheck size={14} color="#aaa" />
//             <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa" }}>
//               256-bit SSL
//             </span>
//           </div>
//         </div>

//         <div style={{ padding: "22px 22px 8px" }}>
//           {/* Amount display */}
//           <div style={{
//             background: "#F5EFD6", borderRadius: 12,
//             padding: "12px 16px", marginBottom: 20,
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//           }}>
//             <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666" }}>Paying</span>
//             <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, color: "#1E5C2A" }}>
//               ₹{total}
//             </span>
//           </div>

//           {/* Contact info */}
//           <p style={{
//             fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
//             letterSpacing: 1, textTransform: "uppercase", marginBottom: 12,
//           }}>Contact Details</p>
//           <Field label="Full Name" icon={User} placeholder="Rahul Sharma"
//             value={name}  onChange={e => setName(e.target.value)} error={errors.name} />
//           <Field label="Email" icon={Mail} placeholder="rahul@example.com"
//             value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
//           <Field label="Phone" icon={Phone} placeholder="9876543210"
//             value={phone}
//             onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))}
//             error={errors.phone} />

//           {/* Payment tabs */}
//           <p style={{
//             fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
//             letterSpacing: 1, textTransform: "uppercase", margin: "18px 0 10px",
//           }}>Payment Method</p>
//           <div style={{
//             display: "grid", gridTemplateColumns: "repeat(3,1fr)",
//             gap: 8, marginBottom: 18,
//           }}>
//             {TABS.map(({ id, label, Icon }) => (
//               <motion.button
//                 key={id}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => { setTab(id); setErrors({}); }}
//                 style={{
//                   border: `1.5px solid ${tab === id ? "#111" : "#e0e0e0"}`,
//                   borderRadius: 10, background: tab === id ? "#111" : "transparent",
//                   padding: "10px 4px", cursor: "pointer",
//                   display: "flex", flexDirection: "column",
//                   alignItems: "center", gap: 4, transition: "all 0.2s",
//                 }}
//               >
//                 <Icon size={16} color={tab === id ? "#FFD700" : "#999"} />
//                 <span style={{
//                   fontFamily: "var(--font-body)", fontSize: 11,
//                   color: tab === id ? "#FFD700" : "#888",
//                   fontWeight: tab === id ? 700 : 400,
//                 }}>
//                   {label}
//                 </span>
//               </motion.button>
//             ))}
//           </div>

//           <AnimatePresence mode="wait">
//             {tab === "card" && (
//               <motion.div key="card"
//                 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
//                 <Field label="Card Number" icon={CreditCard}
//                   placeholder="4111 1111 1111 1111"
//                   value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))}
//                   error={errors.cardNum} />
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                   <Field label="Expiry" icon={Hash} placeholder="MM/YY"
//                     value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
//                     error={errors.expiry} />
//                   <Field label="CVV" icon={Lock} placeholder="•••" type="password" maxLength={4}
//                     value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))}
//                     error={errors.cvv} />
//                 </div>
//                 <Field label="Name on Card" icon={User} placeholder="As on card"
//                   value={name} onChange={e => setName(e.target.value)} />
//                 <div style={{ display: "flex", gap: 8, marginBottom: 6, marginTop: 2 }}>
//                   {["VISA", "MC", "AMEX", "RuPay"].map(b => (
//                     <div key={b} style={{
//                       border: "1px solid #e0e0e0", borderRadius: 6, padding: "3px 8px",
//                       fontFamily: "var(--font-body)", fontSize: 10, color: "#aaa", fontWeight: 700,
//                     }}>{b}</div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {tab === "upi" && (
//               <motion.div key="upi"
//                 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
//                 <Field label="UPI ID" icon={Hash} placeholder="yourname@upi"
//                   value={upiId} onChange={e => setUpiId(e.target.value)} error={errors.upiId} />
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
//                   {["@okaxis","@ybl","@paytm","@ibl"].map(suffix => (
//                     <motion.button key={suffix} whileTap={{ scale: 0.93 }}
//                       onClick={() => setUpiId(prev => prev.split("@")[0] + suffix)}
//                       style={{
//                         border: "1px solid #e0e0e0", borderRadius: 20,
//                         padding: "5px 12px", background: "#F5EFD6",
//                         fontFamily: "var(--font-body)", fontSize: 11, color: "#555", cursor: "pointer",
//                       }}>
//                       {suffix}
//                     </motion.button>
//                   ))}
//                 </div>
//                 <p style={{
//                   fontFamily: "var(--font-body)", fontSize: 12, color: "#888",
//                   background: "#f9f9f9", borderRadius: 8, padding: "10px 14px",
//                 }}>
//                   You'll receive a collect request on your UPI app. Open your app and approve to complete payment.
//                 </p>
//               </motion.div>
//             )}

//             {tab === "netbanking" && (
//               <motion.div key="netbanking"
//                 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
//                 <p style={{
//                   fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
//                   letterSpacing: 1, textTransform: "uppercase", marginBottom: 10,
//                 }}>Select Bank</p>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
//                   {BANKS.map(b => (
//                     <motion.button key={b} whileTap={{ scale: 0.95 }}
//                       onClick={() => { setBank(b); setErrors({}); }}
//                       style={{
//                         border: `1.5px solid ${bank === b ? "#111" : "#e0e0e0"}`,
//                         borderRadius: 10, background: bank === b ? "#111" : "#fff",
//                         padding: "10px 8px", cursor: "pointer",
//                         fontFamily: "var(--font-body)", fontSize: 12,
//                         color: bank === b ? "#FFD700" : "#555",
//                         fontWeight: bank === b ? 700 : 400, transition: "all 0.2s",
//                       }}>
//                       {b}
//                     </motion.button>
//                   ))}
//                 </div>
//                 {errors.bank && (
//                   <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                     style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E8192C", margin: "-4px 0 10px" }}>
//                     {errors.bank}
//                   </motion.p>
//                 )}
//                 {bank && (
//                   <p style={{
//                     fontFamily: "var(--font-body)", fontSize: 12, color: "#888",
//                     background: "#f9f9f9", borderRadius: 8, padding: "10px 14px",
//                   }}>
//                     You'll be redirected to {bank}'s secure portal to complete payment.
//                   </p>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Pay button */}
//         <div style={{ padding: "8px 22px 22px" }}>
//           <motion.button
//             whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(232,25,44,0.4)" }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handlePay}
//             disabled={loading}
//             style={{
//               width: "100%", fontFamily: "var(--font-heading)", fontSize: 15,
//               letterSpacing: 2, background: loading ? "#aaa" : "#E8192C",
//               color: "#fff", border: "none", borderRadius: 50,
//               padding: "16px 0", cursor: loading ? "not-allowed" : "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               gap: 10, boxShadow: "0 6px 24px rgba(232,25,44,0.28)",
//               transition: "background 0.2s, box-shadow 0.2s",
//             }}
//           >
//             {loading ? (
//               <>
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
//                   style={{
//                     width: 18, height: 18, borderRadius: "50%",
//                     border: "2.5px solid rgba(255,255,255,0.3)",
//                     borderTopColor: "#fff",
//                   }}
//                 />
//                 PROCESSING…
//               </>
//             ) : (
//               <>
//                 <Lock size={16} />
//                 PAY ₹{total} <ArrowRight size={16} />
//               </>
//             )}
//           </motion.button>

//           <div style={{
//             display: "flex", alignItems: "center", justifyContent: "center",
//             gap: 6, marginTop: 12,
//           }}>
//             <ShieldCheck size={12} color="#bbb" />
//             <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb" }}>
//               Powered by Razorpay · PCI DSS Compliant
//             </span>
//           </div>
//         </div>
//       </motion.div>

//       {/* Result popup */}
//       <AnimatePresence>
//         {result && (
//           <ResultPopup
//             success={result === "success"}
//             total={total}
//             onClose={() => {
//               if (result === "success") {
//                 setResult(null);
//                 onSuccess?.();
//               } else {
//                 setResult(null);
//               }
//             }}
//             onRetry={() => setResult(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }





















import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  CreditCard, Lock, Phone, User, Mail,
  ChevronLeft, ShieldCheck,
  ArrowRight, Building2, Hash, X, Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE;

// ─── helpers ─────────────────────────────────────────────────────────────────
function authHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function formatCard(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

// ─── Cartoon Thumbs-Up Character (Success) — unchanged ───────────────────────
function CartoonSuccess() {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <motion.circle
        cx="75" cy="75" r="52"
        stroke="#5F259F" strokeWidth="2.5" fill="none"
        initial={{ scale: 0.7, opacity: 0.6 }}
        animate={{ scale: [0.7, 1.35], opacity: [0.6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        style={{ transformOrigin: "75px 75px" }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
        style={{ transformOrigin: "75px 75px" }}
      >
        <circle cx="75" cy="75" r="48" fill="#5F259F" />
        <circle cx="75" cy="75" r="48" fill="none" stroke="#7C3FB5" strokeWidth="2" opacity="0.5" />
        <motion.path
          d="M53 77 L68 92 L99 58"
          stroke="#fff" strokeWidth="8"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        />
      </motion.g>
      {[
        { x: 122, y: 24, delay: 0.7,  size: 7 },
        { x: 16,  y: 32, delay: 0.8,  size: 6 },
        { x: 130, y: 74, delay: 0.75, size: 5 },
        { x: 28,  y: 102, delay: 0.85, size: 5 },
        { x: 108, y: 110, delay: 0.9, size: 6 },
      ].map((s, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }}
          transition={{ delay: s.delay, duration: 0.35 }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        >
          <line x1={s.x} y1={s.y - s.size} x2={s.x} y2={s.y + s.size}
            stroke="#5F259F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={s.x - s.size} y1={s.y} x2={s.x + s.size} y2={s.y}
            stroke="#5F259F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={s.x - s.size * 0.65} y1={s.y - s.size * 0.65}
                x2={s.x + s.size * 0.65} y2={s.y + s.size * 0.65}
            stroke="#A06CD5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={s.x + s.size * 0.65} y1={s.y - s.size * 0.65}
                x2={s.x - s.size * 0.65} y2={s.y + s.size * 0.65}
            stroke="#A06CD5" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      ))}
    </svg>
  );
}

// ─── Cartoon Sad Character (Failed) — unchanged ───────────────────────────────
function CartoonFailed() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <ellipse cx="70" cy="108" rx="26" ry="16" fill="#E8192C" opacity="0.7" />
      <motion.circle
        cx="70" cy="64" r="34" fill="#FF6B6B"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      />
      {[55, 85].map((cx, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}>
          <line x1={cx - 5} y1="54" x2={cx + 5} y2="64" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" />
          <line x1={cx + 5} y1="54" x2={cx - 5} y2="64" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" />
        </motion.g>
      ))}
      <motion.path
        d="M54 80 Q70 68 86 80"
        stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
      {[
        { cx: 50, delay: 0.7, dur: 1.2 },
        { cx: 90, delay: 0.9, dur: 1.5 },
      ].map((t, i) => (
        <motion.ellipse key={i}
          cx={t.cx} cy="72" rx="3" ry="5" fill="#6BB5FF" opacity="0.85"
          initial={{ y: 0, opacity: 0.9 }}
          animate={{ y: [0, 18, 18], opacity: [0.9, 0.9, 0] }}
          transition={{ delay: t.delay, duration: t.dur, repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}
      <motion.rect x="22" y="90" width="14" height="22" rx="7" fill="#FF6B6B"
        initial={{ rotate: 0 }} animate={{ rotate: 15 }}
        transition={{ delay: 0.5, type: "spring" }}
        style={{ transformOrigin: "29px 90px" }}
      />
      <motion.rect x="102" y="90" width="14" height="22" rx="7" fill="#FF6B6B"
        initial={{ rotate: 0 }} animate={{ rotate: -15 }}
        transition={{ delay: 0.5, type: "spring" }}
        style={{ transformOrigin: "109px 90px" }}
      />
      <motion.ellipse cx="100" cy="44" rx="4" ry="6" fill="#6BB5FF" opacity="0.7"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  );
}

// ─── Result Popup (unchanged UI) ──────────────────────────────────────────────
function ResultPopup({ success, total, onClose, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.65, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.75, y: -40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          background: "#fff", borderRadius: 28,
          padding: "40px 36px 32px",
          textAlign: "center", maxWidth: 360, width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: success
            ? "linear-gradient(90deg,#FFD700,#1E5C2A,#FFD700)"
            : "linear-gradient(90deg,#E8192C,#FF6B6B,#E8192C)",
        }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          {success ? <CartoonSuccess /> : <CartoonFailed />}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "var(--font-heading)", fontSize: 26,
            color: success ? "#1E5C2A" : "#E8192C",
            margin: "0 0 8px", letterSpacing: -0.5,
          }}
        >
          {success ? "Woohoo! Order Placed! " : "Oops! Payment Failed"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "var(--font-body)", fontSize: 14,
            color: "#666", margin: "0 0 22px", lineHeight: 1.6,
          }}
        >
          {success
            ? "Your makhana is on its way! We've sent a confirmation to your email."
            : "Something went wrong with your payment. Please check your details and try again."}
        </motion.p>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65 }}
            style={{
              background: "#F5EFD6", borderRadius: 14,
              padding: "14px 20px", marginBottom: 22,
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", margin: "0 0 4px" }}>
              Amount paid
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: 30, color: "#1E5C2A", margin: 0 }}>
              ₹{total}
            </p>
          </motion.div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            style={{
              width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
              letterSpacing: 2,
              background: success ? "#E8192C" : "#111",
              color: "#fff", border: "none", borderRadius: 50,
              padding: "15px 0", cursor: "pointer",
              boxShadow: success
                ? "0 6px 24px rgba(232,25,44,0.3)"
                : "0 6px 24px rgba(0,0,0,0.2)",
            }}
          >
            {success ? "CONTINUE SHOPPING" : "CLOSE"}
          </motion.button>

          {!success && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRetry}
              style={{
                width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
                letterSpacing: 2, background: "transparent",
                color: "#E8192C", border: "2px solid #E8192C",
                borderRadius: 50, padding: "13px 0", cursor: "pointer",
              }}
            >
              TRY AGAIN
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Input Field (unchanged UI) ───────────────────────────────────────────────
function Field({ label, icon: Icon, error, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
          letterSpacing: 1, textTransform: "uppercase",
          display: "block", marginBottom: 5,
        }}>
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
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-body)", fontSize: 14, color: "#111",
            padding: "13px 0",
          }}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E8192C", margin: "4px 0 0" }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Payment Modal Wrapper (unchanged UI) ─────────────────────────────────────
export function PaymentModal({ total, checkoutData, onClose, onSuccess }) {
  return (
    <AnimatePresence>
      <motion.div
        key="payment-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px", overflowY: "auto",
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.82, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          style={{ width: "100%", maxWidth: 520, position: "relative" }}
        >
          <motion.button
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.18)" }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            style={{
              position: "absolute", top: -14, right: -14, zIndex: 10,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", backdropFilter: "blur(4px)",
            }}
          >
            <X size={16} />
          </motion.button>

          <PaymentPanel
            total={total}
            checkoutData={checkoutData}
            onBack={onClose}
            onSuccess={onSuccess}
            isModal
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Payment Panel ────────────────────────────────────────────────────────────
/**
 * Props:
 *   total         – display total (number)
 *   checkoutData  – { customer_name, phone, alt_phone, address_line1,
 *                     address_line2, city, state, pincode }
 *                   Pass this if you already went through the Checkout flow
 *                   and just want the standalone payment panel.
 *                   If not passed, the user fills name/email/phone here
 *                   and you need to provide address data separately.
 *   onBack        – fn
 *   onSuccess     – fn
 *   isModal       – bool
 */
export function PaymentPanel({ total, checkoutData, onBack, onSuccess, isModal = false }) {
  // Contact fields (only shown when no checkoutData — standalone use)
  const [name,  setName]   = useState(checkoutData?.customer_name || "");
  const [email, setEmail]  = useState(() => localStorage.getItem("user_email") || "");
  const [phone, setPhone]  = useState(checkoutData?.phone || "");

  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [result, setResult]   = useState(null); // "success" | "failed"
  const [paidTotal, setPaidTotal] = useState(total);

  const panelAnim = useAnimation();

  useEffect(() => {
    panelAnim.start({
      x: [0, -10, 10, -7, 7, -3, 3, 0],
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
    });
  }, []);

  function validate() {
    const e = {};
    if (!checkoutData) {
      // Standalone mode: require contact info here
      if (!name.trim())  e.name  = "Name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
      if (!phone.trim() || phone.replace(/\D/g, "").length !== 10) e.phone = "10-digit number required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Load Razorpay script ──────────────────────────────────────────────
  function loadRazorpay() {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // ── handlePay ─────────────────────────────────────────────────────────
  async function handlePay() {
    if (!validate()) return;
    setLoading(true);
    setApiError("");

    // Build the payload for create-order
    const payload = checkoutData
      ? { ...checkoutData }
      : {
          customer_name:  name,
          phone:          phone.replace(/\D/g, ""),
          address_line1:  "",   // minimal — standalone PaymentPanel doesn't have address
          city:           "",
          state:          "",
          pincode:        "000000",
        };

    // 1. Create order on backend
    let orderData;
    try {
      const res = await fetch(`${API}/api/checkout/create-order/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      orderData = await res.json();
      if (!res.ok) {
        setApiError(orderData.detail || "Could not create order.");
        setLoading(false);
        return;
      }
    } catch {
      setApiError("Network error. Please try again.");
      setLoading(false);
      return;
    }

    setPaidTotal(parseFloat(orderData.total_amount).toFixed(0));

    // 2. Load Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      setApiError("Could not load payment gateway. Please refresh.");
      setLoading(false);
      return;
    }

    // 3. Open Razorpay widget
    const options = {
      key:         orderData.razorpay_key_id,
      amount:      orderData.amount,
      currency:    orderData.currency,
      name:        "Adhen Foods",
      description: "Makhana Order",
      order_id:    orderData.razorpay_order_id,
      prefill: {
        name:    orderData.customer_name,
        email:   orderData.email || email,
        contact: orderData.phone,
      },
      theme: { color: "#E8192C" },

      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${API}/api/checkout/verify-payment/`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            }),
          });
          setResult(verifyRes.ok ? "success" : "failed");
        } catch {
          setResult("failed");
        } finally {
          setLoading(false);
        }
      },

      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      setResult("failed");
      setLoading(false);
    });

    setLoading(false);
    rzp.open();
  }

  const TABS = [
    { id: "card",       label: "Card",       Icon: CreditCard },
    { id: "upi",        label: "UPI",        Icon: Phone },
    { id: "netbanking", label: "Net Banking", Icon: Building2 },
  ];

  return (
    <>
      <motion.div
        animate={panelAnim}
        style={{
          background: "#fff",
          borderRadius: isModal ? 20 : 16,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          maxHeight: isModal ? "90vh" : "none",
          overflowY: isModal ? "auto" : "visible",
        }}
      >
        {/* Header */}
        <div style={{
          background: "#111", padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 10,
          position: "sticky", top: 0, zIndex: 5,
        }}>
          {!isModal && (
            <motion.button
              whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.12)", border: "none",
                borderRadius: "50%", width: 32, height: 32,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff",
              }}
            >
              <ChevronLeft size={18} />
            </motion.button>
          )}
          <Lock size={16} color="#FFD700" />
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: 16,
            color: "#FFD700", margin: 0, letterSpacing: 1,
          }}>
            SECURE PAYMENT
          </p>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
            <ShieldCheck size={14} color="#aaa" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa" }}>
              256-bit SSL
            </span>
          </div>
        </div>

        <div style={{ padding: "22px 22px 8px" }}>
          {/* Amount display */}
          <div style={{
            background: "#F5EFD6", borderRadius: 12,
            padding: "12px 16px", marginBottom: 20,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666" }}>Paying</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, color: "#1E5C2A" }}>
              ₹{total}
            </span>
          </div>

          {/* API error */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{
                  background: "rgba(232,25,44,0.1)", border: "1px solid rgba(232,25,44,0.3)",
                  borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                  fontFamily: "var(--font-body)", fontSize: 13, color: "#E8192C",
                }}
              >
                {apiError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact fields (standalone only — hidden if checkoutData passed) */}
          {!checkoutData && (
            <>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
                letterSpacing: 1, textTransform: "uppercase", marginBottom: 12,
              }}>Contact Details</p>
              <Field label="Full Name" icon={User} placeholder="Rahul Sharma"
                value={name} onChange={e => setName(e.target.value)} error={errors.name} />
              <Field label="Email" icon={Mail} placeholder="rahul@example.com"
                value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
              <Field label="Phone" icon={Phone} placeholder="9876543210"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                error={errors.phone} />
            </>
          )}

          {/* Payment method info — Razorpay handles everything inside its widget */}
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 11, color: "#888",
            letterSpacing: 1, textTransform: "uppercase", margin: "18px 0 10px",
          }}>Payment Method</p>

          {/* Show the 3 tab icons (visual only — Razorpay widget opens all options) */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 8, marginBottom: 18,
          }}>
            {TABS.map(({ id, label, Icon }) => (
              <div
                key={id}
                style={{
                  border: "1.5px solid #e0e0e0",
                  borderRadius: 10, background: "transparent",
                  padding: "10px 4px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 4,
                }}
              >
                <Icon size={16} color="#999" />
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 11,
                  color: "#888",
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "var(--font-body)", fontSize: 12, color: "#888",
            background: "#f9f9f9", borderRadius: 8, padding: "10px 14px", margin: 0,
          }}>
            Select your preferred method in the Razorpay checkout window.
          </p>
        </div>

        {/* Pay button */}
        <div style={{ padding: "8px 22px 22px" }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(232,25,44,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePay}
            disabled={loading}
            style={{
              width: "100%", fontFamily: "var(--font-heading)", fontSize: 15,
              letterSpacing: 2, background: loading ? "#aaa" : "#E8192C",
              color: "#fff", border: "none", borderRadius: 50,
              padding: "16px 0", cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, boxShadow: "0 6px 24px rgba(232,25,44,0.28)",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} />
                PREPARING…
              </>
            ) : (
              <>
                <Lock size={16} />
                PAY ₹{total} <ArrowRight size={16} />
              </>
            )}
          </motion.button>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, marginTop: 12,
          }}>
            <ShieldCheck size={12} color="#bbb" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb" }}>
              Powered by Razorpay · PCI DSS Compliant
            </span>
          </div>
        </div>
      </motion.div>

      {/* Result popup */}
      <AnimatePresence>
        {result && (
          <ResultPopup
            success={result === "success"}
            total={paidTotal}
            onClose={() => {
              setResult(null);
              if (result === "success") onSuccess?.();
            }}
            onRetry={() => { setResult(null); setApiError(""); }}
          />
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}