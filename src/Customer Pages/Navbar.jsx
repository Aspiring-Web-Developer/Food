
// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, Package, LogOut, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Login from "../Customer Pages/Login";

// const API = import.meta.env.VITE_API_BASE;
// const NAV_LINKS = ["Home", "Products", "About", "Contact"];

// // ─── Token helpers ────────────────────────────────────────────────────────────
// async function refreshAccessToken() {
//   const refresh = localStorage.getItem("refresh_token");
//   if (!refresh) return false;
//   try {
//     const res = await fetch(`${API}/api/auth/refresh/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh }),
//     });
//     if (!res.ok) throw new Error("refresh failed");
//     const data = await res.json();
//     if (data.access) {
//       localStorage.setItem("access_token", data.access);
//       return true;
//     }
//     return false;
//   } catch {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     return false;
//   }
// }

// function getStoredUser() {
//   const id = localStorage.getItem("user_id");
//   if (!id) return null;
//   return {
//     id,
//     email:     localStorage.getItem("user_email") || "",
//     full_name: localStorage.getItem("user_name")  || "",
//   };
// }

// // ─── Curved spinning rays (unchanged) ─────────────────────────────────────────
// function SpinnerSticks() {
//   const count = 22;
//   const cx = 500, cy = 500, innerR = 60, outerR = 500;
//   const rays = Array.from({ length: count });

//   return (
//     <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
//       <motion.div
//         style={{ position: "absolute", width: "160%", height: "160%", top: "50%", left: "50%",
//           translateX: "-50%", translateY: "-50%", transformOrigin: "center center" }}
//         animate={{ rotate: [0, 360], scale: [1, 1.09, 1] }}
//         transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" },
//           scale: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } }}
//       >
//         <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
//           {rays.map((_, i) => {
//             const angle = (i / count) * 360;
//             const rad = (angle * Math.PI) / 180;
//             const x1 = cx + Math.cos(rad) * innerR, y1 = cy + Math.sin(rad) * innerR;
//             const x2 = cx + Math.cos(rad) * outerR, y2 = cy + Math.sin(rad) * outerR;
//             const perpRad = rad + Math.PI / 2;
//             const curveMag = 55 + (i % 4) * 20;
//             const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
//             const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
//             const isAccent = i % 4 === 0;
//             return (
//               <path key={i} d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
//                 stroke={i % 2 === 0 ? "#C98F00" : "#E6A800"}
//                 strokeWidth={isAccent ? 2.6 : 1.2} strokeLinecap="round" fill="none"
//                 opacity={isAccent ? 0.55 : 0.28} />
//             );
//           })}
//         </svg>
//       </motion.div>

//       <motion.div
//         style={{ position: "absolute", width: "160%", height: "160%", top: "50%", left: "50%",
//           translateX: "-50%", translateY: "-50%", transformOrigin: "center center" }}
//         animate={{ rotate: [0, -360], scale: [1, 1.06, 1] }}
//         transition={{ rotate: { duration: 22, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 1.5 } }}
//       >
//         <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
//           {rays.map((_, i) => {
//             const angle = ((i + 0.5) / count) * 360;
//             const rad = (angle * Math.PI) / 180;
//             const x1 = cx + Math.cos(rad) * (innerR + 40), y1 = cy + Math.sin(rad) * (innerR + 40);
//             const x2 = cx + Math.cos(rad) * (outerR * 0.72), y2 = cy + Math.sin(rad) * (outerR * 0.72);
//             const perpRad = rad - Math.PI / 2;
//             const curveMag = 40 + (i % 3) * 18;
//             const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
//             const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
//             return (
//               <path key={`b-${i}`} d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
//                 stroke={i % 2 === 0 ? "#F5C400" : "#D4A000"}
//                 strokeWidth={0.8} strokeLinecap="round" fill="none" opacity={0.18} />
//             );
//           })}
//         </svg>
//       </motion.div>
//     </div>
//   );
// }

// const SOCIALS = [
//   { label: "Facebook",  color: "#1877F2", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
//   { label: "X",         color: "#000000", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
//   { label: "YouTube",   color: "#FF0000", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg> },
//   { label: "TikTok",    color: "#010101", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" /></svg> },
//   { label: "Instagram", color: "#E1306C", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
// ];

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// export default function Navbar({ onCartOpen }) {
//   const [showLogin, setShowLogin] = useState(false);
//   const [open, setOpen]           = useState(false);
//   const [user, setUser]           = useState(null);
//   const [authReady, setAuthReady] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   // ── FIX 1: plain React state for logout button hover (no onHoverStart/End) ──
//   const [logoutHovered, setLogoutHovered] = useState(false);

//   const navigate = useNavigate();

//   // ── Boot: refresh token ───────────────────────────────────────────────────
//   useEffect(() => {
//     (async () => {
//       try {
//         const stored = getStoredUser();
//         if (!stored) { setUser(null); setAuthReady(true); return; }

//         const refreshed = await refreshAccessToken();
//         if (refreshed) {
//           const currentUser = getStoredUser();
//           if (currentUser) {
//             setUser(currentUser);
//             window.dispatchEvent(new CustomEvent("auth-change", {
//               detail: { loggedIn: true, user: currentUser },
//             }));
//           } else {
//             setUser(null);
//           }
//         } else {
//           localStorage.removeItem("user_email");
//           localStorage.removeItem("user_id");
//           localStorage.removeItem("user_name");
//           setUser(null);
//         }
//       } catch {
//         setUser(null);
//       } finally {
//         setAuthReady(true);
//       }
//     })();
//   }, []);

//   // ── Listen for auth-change ────────────────────────────────────────────────
//   useEffect(() => {
//     const onAuthChange = (e) => {
//       if (e.detail?.loggedIn) setUser(e.detail.user);
//       else { setUser(null); setCartCount(0); }
//     };
//     window.addEventListener("auth-change", onAuthChange);
//     return () => window.removeEventListener("auth-change", onAuthChange);
//   }, []);

//   // ── FIX 2: fetch cart count, refresh on cart-added event ─────────────────
//   const fetchCartCount = useCallback(async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token) { setCartCount(0); return; }
//     try {
//       const res = await fetch(`${API}/api/cart/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 401) { setCartCount(0); return; }
//       if (!res.ok) return;
//       const data = await res.json();
//       // data.total_items = sum of all quantities
//       setCartCount(data.total_items ?? 0);
//     } catch {
//       setCartCount(0);
//     }
//   }, []);

//   // Fetch on mount + whenever auth changes
//   useEffect(() => {
//     if (authReady) fetchCartCount();
//   }, [authReady, user, fetchCartCount]);

//   // Refresh count on add OR any cart change (remove, qty update)
//   useEffect(() => {
//     const refresh = () => fetchCartCount();
//     window.addEventListener("cart-added",   refresh);
//     window.addEventListener("cart-updated", refresh);
//     return () => {
//       window.removeEventListener("cart-added",   refresh);
//       window.removeEventListener("cart-updated", refresh);
//     };
//   }, [fetchCartCount]);

//   // Also listen for cart-cleared (after checkout success)
//   useEffect(() => {
//     const onCartCleared = () => setCartCount(0);
//     window.addEventListener("cart-cleared", onCartCleared);
//     return () => window.removeEventListener("cart-cleared", onCartCleared);
//   }, []);

//   // ── Logout ────────────────────────────────────────────────────────────────
//   const handleLogout = useCallback(() => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_email");
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("user_name");
//     setUser(null);
//     setCartCount(0);
//     setOpen(false);
//     setLogoutHovered(false);
//     window.dispatchEvent(new CustomEvent("auth-change", { detail: { loggedIn: false } }));
//   }, []);

//   // ── Cart shake on add ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const shake = () => {
//       const btn = document.getElementById("nav-cart-btn");
//       if (!btn) return;
//       btn.animate(
//         [
//           { transform: "rotate(0deg)" },
//           { transform: "rotate(-18deg)" },
//           { transform: "rotate(18deg)" },
//           { transform: "rotate(-14deg)" },
//           { transform: "rotate(14deg)" },
//           { transform: "rotate(-8deg)" },
//           { transform: "rotate(0deg)" },
//         ],
//         { duration: 500, easing: "ease-out" }
//       );
//     };
//     window.addEventListener("cart-added", shake);
//     return () => window.removeEventListener("cart-added", shake);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   const scrollTo = (id) => {
//     if (id === "Home") { navigate("/"); setOpen(false); return; }
//     if (id === "Products") {
//       navigate("/");
//       setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 100);
//       setOpen(false);
//       return;
//     }
//     document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
//     setOpen(false);
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3">
//         {/* Logo */}
//         <div onClick={() => scrollTo("Home")} className="cursor-pointer" style={{ zIndex: 60, position: "relative" }}>
//           <img src="/Png-01.png" alt="Adhen Foods" style={{ height: 56, width: "auto", objectFit: "contain" }} />
//         </div>

//         {/* Right side */}
//         <div className="flex items-center gap-3" style={{ zIndex: 60, position: "relative" }}>

//           {/* Auth button — hidden until we know state */}
//          {authReady && (
//   <>
// {authReady && (
//   <>
//     {user ? null : (
//       <motion.button
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//         onClick={() => setShowLogin(true)}
//         className="hidden md:flex items-center border-2 border-white text-white font-black text-sm px-6 py-2.5 rounded-full tracking-wide bg-transparent cursor-pointer"
//         style={{ fontFamily: "var(--font-heading)" }}
//       >
//         Login
//       </motion.button>
//     )}
//   </>
// )}
//   </>
// )}

//           {/* Orders */}
//           <motion.button
//             onClick={() => navigate("/orders")}
//             whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
//             className="relative w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent cursor-pointer"
//           >
//             <Package size={20} className="text-white" />
//           </motion.button>

//           {/* Cart — FIX: shows real cartCount */}
//           <motion.button
//             id="nav-cart-btn"
//             onClick={onCartOpen}
//             whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
//             className="relative w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent cursor-pointer"
//           >
//             <ShoppingCart size={20} className="text-white" />
//             <AnimatePresence>
//               {cartCount > 0 && (
//                 <motion.span
//                   key={cartCount}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   transition={{ type: "spring", stiffness: 500, damping: 20 }}
//                   className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8192C] text-white flex items-center justify-center"
//                   style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 700 }}
//                 >
//                   {cartCount > 99 ? "99+" : cartCount}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//             {/* Show 0 badge when logged out or cart empty — subtle */}
//             {cartCount === 0 && (
//               <span
//                 className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8192C] text-white flex items-center justify-center"
//                 style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 700 }}
//               >
//                 0
//               </span>
//             )}
//           </motion.button>

//           {/* Hamburger */}
//           <motion.button
//             whileTap={{ scale: 0.92 }}
//             onClick={() => setOpen(!open)}
//             className="w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] shadow-lg border-none cursor-pointer"
//             style={{ background: "#E8192C" }}
//           >
//             <motion.span
//               animate={open ? { rotate: 45, y: 7, background: "#fff" } : { rotate: 0, y: 0, background: "#fff" }}
//               className="block w-5 h-[2.5px] rounded-full origin-center"
//             />
//             <motion.span
//               animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, background: "#fff" }}
//               className="block w-5 h-[2.5px] bg-white rounded-full"
//             />
//             <motion.span
//               animate={open ? { rotate: -45, y: -7, background: "#fff" } : { rotate: 0, y: 0, background: "#fff" }}
//               className="block w-5 h-[2.5px] rounded-full origin-center"
//             />
//           </motion.button>
//         </div>
//       </nav>

//       {/* ── FULL SCREEN MENU ── */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
//             style={{
//               position: "fixed", inset: 0, zIndex: 40, background: "#FFD700",
//               display: "flex", flexDirection: "column", alignItems: "center",
//               justifyContent: "center", overflow: "hidden",
//             }}
//           >
//             <SpinnerSticks />

//             <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
//               {NAV_LINKS.map((link, i) => (
//                 <motion.button
//                   key={link}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ delay: i * 0.08 + 0.18, ease: [0.22, 1, 0.36, 1] }}
//                   onClick={() => scrollTo(link)}
//                   style={{
//                     display: "block", background: "transparent", border: "none",
//                     cursor: "pointer", fontFamily: "var(--font-heading)",
//                     fontSize: "clamp(42px, 8vw, 86px)", fontWeight: 900,
//                     color: "#111", letterSpacing: "-2px", lineHeight: 1.1,
//                     padding: "6px 0", width: "100%", transition: "color 0.2s",
//                   }}
//                   whileHover={{ color: "#E8192C", x: 8 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   {link}
//                 </motion.button>
//               ))}

//               {/* ── Auth row in menu ── */}
//               {authReady && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ delay: NAV_LINKS.length * 0.08 + 0.18 }}
//                   style={{ marginTop: 8 }}
//                 >
//                   {user ? (
//                     // ── FIX: plain button with React hover state — no onHoverStart/End ──
//                     <button
//                       onClick={handleLogout}
//                       onMouseEnter={() => setLogoutHovered(true)}
//                       onMouseLeave={() => setLogoutHovered(false)}
//                       style={{
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         border: "none", cursor: "pointer",
//                         width: 64, height: 64, borderRadius: "50%",
//                         margin: "0 auto",
//                         background: logoutHovered ? "rgba(232,25,44,0.18)" : "rgba(0,0,0,0.07)",
//                         transition: "background 0.22s, transform 0.15s",
//                         transform: logoutHovered ? "scale(1.12)" : "scale(1)",
//                       }}
//                     >
//                       <LogOut
//                         size={30}
//                         strokeWidth={2.5}
//                         color={logoutHovered ? "#E8192C" : "#111"}
//                         style={{ transition: "color 0.22s" }}
//                       />
//                     </button>
//                   ) : (
//                     <motion.button
//                       whileHover={{ color: "#E8192C", x: 8 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => { setOpen(false); setShowLogin(true); }}
//                       style={{
//                         display: "block", background: "transparent", border: "none",
//                         cursor: "pointer", fontFamily: "var(--font-heading)",
//                         fontSize: "clamp(42px, 8vw, 86px)", fontWeight: 900,
//                         color: "#111", letterSpacing: "-2px", lineHeight: 1.1,
//                         padding: "6px 0", width: "100%", transition: "color 0.2s",
//                       }}
//                     >
//                       Login
//                     </motion.button>
//                   )}
//                 </motion.div>
//               )}

//               {/* Social icons */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.6 }}
//                 style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}
//               >
//                 {SOCIALS.map((s) => (
//                   <motion.button
//                     key={s.label}
//                     whileHover={{ scale: 1.15, y: -3 }}
//                     whileTap={{ scale: 0.92 }}
//                     title={s.label}
//                     style={{
//                       width: 44, height: 44, borderRadius: "50%", background: s.color,
//                       border: "none", cursor: "pointer",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
//                     }}
//                   >
//                     {s.icon}
//                   </motion.button>
//                 ))}
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Login modal */}
//       <AnimatePresence>
//         {showLogin && (
//           <Login
//             onClose={() => setShowLogin(false)}
//             onLoginSuccess={(u) => { setUser(u); fetchCartCount(); }}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }















import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, LogOut, User, TrendingUp, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../Customer Pages/Login";
import { TruckFast } from "iconsax-react";

const API = import.meta.env.VITE_API_BASE;
const NAV_LINKS = ["Home", "Products", "About", "Contact"];

// ─── Token helpers ─────────────────────────────────────────────────────────────
async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return false;
  try {
    const res = await fetch(`${API}/api/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) throw new Error("refresh failed");
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      return true;
    }
    return false;
  } catch {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return false;
  }
}

function getStoredUser() {
  const id = localStorage.getItem("user_id");
  if (!id) return null;
  return {
    id,
    email:     localStorage.getItem("user_email") || "",
    full_name: localStorage.getItem("user_name")  || "",
  };
}

// ─── Curved spinning rays ──────────────────────────────────────────────────────
function SpinnerSticks() {
  const count = 22;
  const cx = 500, cy = 500, innerR = 60, outerR = 500;
  const rays = Array.from({ length: count });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        style={{ position: "absolute", width: "160%", height: "160%", top: "50%", left: "50%",
          translateX: "-50%", translateY: "-50%", transformOrigin: "center center" }}
        animate={{ rotate: [0, 360], scale: [1, 1.09, 1] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } }}
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {rays.map((_, i) => {
            const angle = (i / count) * 360;
            const rad = (angle * Math.PI) / 180;
            const x1 = cx + Math.cos(rad) * innerR, y1 = cy + Math.sin(rad) * innerR;
            const x2 = cx + Math.cos(rad) * outerR, y2 = cy + Math.sin(rad) * outerR;
            const perpRad = rad + Math.PI / 2;
            const curveMag = 55 + (i % 4) * 20;
            const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
            const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
            const isAccent = i % 4 === 0;
            return (
              <path key={i} d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
                stroke={i % 2 === 0 ? "#C98F00" : "#E6A800"}
                strokeWidth={isAccent ? 2.6 : 1.2} strokeLinecap="round" fill="none"
                opacity={isAccent ? 0.55 : 0.28} />
            );
          })}
        </svg>
      </motion.div>

      <motion.div
        style={{ position: "absolute", width: "160%", height: "160%", top: "50%", left: "50%",
          translateX: "-50%", translateY: "-50%", transformOrigin: "center center" }}
        animate={{ rotate: [0, -360], scale: [1, 1.06, 1] }}
        transition={{ rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 1.5 } }}
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {rays.map((_, i) => {
            const angle = ((i + 0.5) / count) * 360;
            const rad = (angle * Math.PI) / 180;
            const x1 = cx + Math.cos(rad) * (innerR + 40), y1 = cy + Math.sin(rad) * (innerR + 40);
            const x2 = cx + Math.cos(rad) * (outerR * 0.72), y2 = cy + Math.sin(rad) * (outerR * 0.72);
            const perpRad = rad - Math.PI / 2;
            const curveMag = 40 + (i % 3) * 18;
            const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
            const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
            return (
              <path key={`b-${i}`} d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
                stroke={i % 2 === 0 ? "#F5C400" : "#D4A000"}
                strokeWidth={0.8} strokeLinecap="round" fill="none" opacity={0.18} />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

const SOCIALS = [
  // { label: "Facebook",  color: "#1877F2", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  // { label: "X",         color: "#000000", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  // { label: "YouTube",   color: "#FF0000", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg> },
  // { label: "TikTok",    color: "#010101", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" /></svg> },
  { label: "Instagram", color: "#E1306C", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Navbar({ onCartOpen }) {
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen]           = useState(false);
  const [user, setUser]           = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  // ── Boot: refresh token ────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const stored = getStoredUser();
        if (!stored) { setUser(null); setAuthReady(true); return; }

        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const currentUser = getStoredUser();
          if (currentUser) {
            setUser(currentUser);
            window.dispatchEvent(new CustomEvent("auth-change", {
              detail: { loggedIn: true, user: currentUser },
            }));
          } else {
            setUser(null);
          }
        } else {
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_name");
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setAuthReady(true);
      }
    })();
  }, []);

  // ── Listen for auth-change ─────────────────────────────────────────────────
  useEffect(() => {
    const onAuthChange = (e) => {
      if (e.detail?.loggedIn) setUser(e.detail.user);
      else { setUser(null); setCartCount(0); }
    };
    window.addEventListener("auth-change", onAuthChange);
    return () => window.removeEventListener("auth-change", onAuthChange);
  }, []);

  // ── Fetch real cart count from API (only on mount / auth change) ───────────
  const fetchCartCount = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) { setCartCount(0); return; }
    try {
      const res = await fetch(`${API}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { setCartCount(0); return; }
      if (!res.ok) return;
      const data = await res.json();
      setCartCount(data.total_items ?? 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (authReady) fetchCartCount();
  }, [authReady, user, fetchCartCount]);

  // ── cart-delta: INSTANT badge update — no API call at all ─────────────────
  // Cart.jsx fires this with the exact +1 / -1 / -N delta so navbar
  // updates in the same JS frame as the UI change.
  // useEffect(() => {
  //   const onDelta = (e) => {
  //     const delta = e.detail?.delta ?? 0;
  //     setCartCount(prev => Math.max(0, prev + delta));
  //   };
  //   window.addEventListener("cart-delta", onDelta);
  //   return () => window.removeEventListener("cart-delta", onDelta);
  // }, []);

  // ── cart-sync: authoritative count from server (on load / refetch) ─────────
  useEffect(() => {
    const onSync = (e) => {
      const count = e.detail?.count ?? 0;
      setCartCount(count);
    };
    window.addEventListener("cart-sync", onSync);
    return () => window.removeEventListener("cart-sync", onSync);
  }, []);

  // ── cart-added (from product pages): refetch for accuracy ─────────────────
  useEffect(() => {
    const onAdded = () => fetchCartCount();
    window.addEventListener("cart-added", onAdded);
    return () => window.removeEventListener("cart-added", onAdded);
  }, [fetchCartCount]);

  // ── cart-cleared (after checkout success) ─────────────────────────────────
  useEffect(() => {
    const onCartCleared = () => setCartCount(0);
    window.addEventListener("cart-cleared", onCartCleared);
    return () => window.removeEventListener("cart-cleared", onCartCleared);
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    setUser(null);
    setCartCount(0);
    setOpen(false);
    setLogoutHovered(false);
    window.dispatchEvent(new CustomEvent("auth-change", { detail: { loggedIn: false } }));
  }, []);

  // ── Cart shake on add ──────────────────────────────────────────────────────
  useEffect(() => {
    const shake = () => {
      const btn = document.getElementById("nav-cart-btn");
      if (!btn) return;
      btn.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-18deg)" },
          { transform: "rotate(18deg)" },
          { transform: "rotate(-14deg)" },
          { transform: "rotate(14deg)" },
          { transform: "rotate(-8deg)" },
          { transform: "rotate(0deg)" },
        ],
        { duration: 500, easing: "ease-out" }
      );
    };
    window.addEventListener("cart-added", shake);
    return () => window.removeEventListener("cart-added", shake);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id) => {
    if (id === "Home") { navigate("/"); setOpen(false); return; }
    if (id === "Products") {
      navigate("/");
      setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 100);
      setOpen(false);
      return;
    }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div onClick={() => scrollTo("Home")} className="cursor-pointer" style={{ zIndex: 60, position: "relative" }}>
          <img src="/Png-01.png" alt="Adhen Foods" style={{ height: 56, width: "auto", objectFit: "contain" }} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3" style={{ zIndex: 60, position: "relative"}}>

          {/* Auth button */}
          {authReady && !user && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowLogin(true)}
              className="hidden md:flex items-center border-2 border-white text-white font-black text-sm px-6 py-2.5 rounded-full tracking-wide bg-transparent cursor-pointer"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Login
            </motion.button>
          )}

          {/* Orders */}
          <motion.button
            onClick={() => navigate("/orders")}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent cursor-pointer"
          >
             <TruckFast size={20} color="#fff" className="text-white" />
          </motion.button>

          {/* Cart — badge updates instantly via cart-delta event */}
          <motion.button
            id="nav-cart-btn"
            onClick={onCartOpen}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent cursor-pointer"
          >
            <ShoppingCart size={20} className="text-white" />
            <AnimatePresence mode="wait">
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8192C] text-white flex items-center justify-center"
                style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 700 }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] shadow-lg border-none cursor-pointer"
            style={{ background: "#E8192C" }}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7, background: "#fff" } : { rotate: 0, y: 0, background: "#fff" }}
              className="block w-5 h-[2.5px] rounded-full origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, background: "#fff" }}
              className="block w-5 h-[2.5px] bg-white rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7, background: "#fff" } : { rotate: 0, y: 0, background: "#fff" }}
              className="block w-5 h-[2.5px] rounded-full origin-center"
            />
          </motion.button>
        </div>
      </nav>

      {/* ── FULL SCREEN MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40, background: "#FFD700",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", overflow: "hidden",
            }}
          >
            <SpinnerSticks />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08 + 0.18, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link)}
                  style={{
                    display: "block", background: "transparent", border: "none",
                    cursor: "pointer", fontFamily: "var(--font-heading)",
                    fontSize: "clamp(42px, 8vw, 86px)", fontWeight: 900,
                    color: "#111", letterSpacing: "-2px", lineHeight: 1.1,
                    padding: "6px 0", width: "100%", transition: "color 0.2s",
                  }}
                  whileHover={{ color: "#E8192C", x: 8 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link}
                </motion.button>
              ))}

              {/* Auth row in menu */}
              {authReady && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.08 + 0.18 }}
                  style={{ marginTop: 8 }}
                >
                  {user ? (
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      onMouseEnter={() => setLogoutHovered(true)}
                      onMouseLeave={() => setLogoutHovered(false)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "none", cursor: "pointer",
                        width: 64, height: 64, borderRadius: "50%",
                        margin: "0 auto",
                        background: logoutHovered ? "rgba(232,25,44,0.18)" : "rgba(0,0,0,0.07)",
                        transition: "background 0.22s, transform 0.15s",
                        transform: logoutHovered ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      <LogOut
                        size={30}
                        strokeWidth={2.5}
                        color={logoutHovered ? "#E8192C" : "#111"}
                        style={{ transition: "color 0.22s" }}
                      />
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ color: "#E8192C", x: 8 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setOpen(false); setShowLogin(true); }}
                      style={{
                        display: "block", background: "transparent", border: "none",
                        cursor: "pointer", fontFamily: "var(--font-heading)",
                        fontSize: "clamp(42px, 8vw, 86px)", fontWeight: 900,
                        color: "#111", letterSpacing: "-2px", lineHeight: 1.1,
                        padding: "6px 0", width: "100%", transition: "color 0.2s",
                      }}
                    >
                      Login
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}
              >
                {SOCIALS.map((s) => (
                  <motion.button
                    key={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    title={s.label}
                    style={{
                      width: 44, height: 44, borderRadius: "50%", background: s.color,
                      border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                    }}
                  >
                    <a href="https://www.instagram.com/reel/DZhDmwGupOz/?igsh=MTk1Z3Vud2d3OXNyNQ%3D%3D">
                    {s.icon}
                    </a>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login modal */}
      <AnimatePresence>
        {showLogin && (
          <Login
            onClose={() => setShowLogin(false)}
            onLoginSuccess={(u) => { setUser(u); fetchCartCount(); }}
          />
        )}
      </AnimatePresence>




      {/* Logout confirm popup */}
<AnimatePresence>
  {showLogoutConfirm && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setShowLogoutConfirm(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{
          position: "relative", overflow: "hidden",
          background: "#FFD700", borderRadius: 28,
          padding: "40px 32px 32px", maxWidth: 380, width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "4px solid #111",
        }}
      >
        {/* decorative bursts */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
          <SpinnerSticks />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* Icon row: order + trending */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 18 }}>
            <motion.div
              initial={{ rotate: -15, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#111", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Package size={26} color="#FFD700" />
            </motion.div>
            <motion.div
              initial={{ rotate: 15, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 300 }}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#E8192C", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <TrendingUp size={26} color="#fff" />
            </motion.div>
          </div>

          <h3 style={{
            fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 900,
            color: "#111", margin: "0 0 8px", letterSpacing: -0.5,
          }}>
            Leaving so soon?
          </h3>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14, color: "#333",
            margin: "0 0 28px", lineHeight: 1.5,
          }}>
            Your orders and cart will be waiting right here when you're back. Sure you want to log out?
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowLogoutConfirm(false)}
              style={{
                flex: 1, padding: "13px 0", borderRadius: 999,
                border: "2px solid #111", background: "transparent",
                color: "#111", fontFamily: "var(--font-heading)",
                fontWeight: 900, fontSize: 14, cursor: "pointer",
              }}
            >
              Stay
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setShowLogoutConfirm(false); handleLogout(); }}
              style={{
                flex: 1, padding: "13px 0", borderRadius: 999,
                border: "none", background: "#E8192C",
                color: "#fff", fontFamily: "var(--font-heading)",
                fontWeight: 900, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}