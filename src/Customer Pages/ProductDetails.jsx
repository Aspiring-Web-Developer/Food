
// import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import { ChevronLeft, ChevronRight, ShoppingCart, ArrowLeft, Star } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";

// // ─── Shared product data ───────────────────────────────────────────────────────
// export const PRODUCTS = [
//   { id: 0, name: "Mint & Lime",    tagline: "Refreshing coolness in every bite", weight: "40g", price: "₹30", priceNum: 30, bg: "#1E5C2A", burstLight: "#2D7A3A", burstDark: "#144020", tag: "BESTSELLER",  imgSrc: "/Makan 1.PNG", desc: "A perfect balance of cool mint and zesty lime, these makhana puffs hit different. Light, airy, and dangerously addictive.", rating: 4.8, reviews: 312 },
//   { id: 1, name: "Cheese & Herbs", tagline: "Rich, creamy & irresistible",       weight: "40g", price: "₹30", priceNum: 30, bg: "#B8860B", burstLight: "#D4A017", burstDark: "#8A6008", tag: "POPULAR",      imgSrc: "/Makan 2.PNG", desc: "Real cheese goodness meets fragrant herbs. Every bite is rich, creamy, and totally irresistible. Premium snacking redefined.", rating: 4.7, reviews: 204 },
//   { id: 2, name: "Munch Masala",   tagline: "Bold Indian spice blend",           weight: "40g", price: "₹30", priceNum: 30, bg: "#1565A8", burstLight: "#1E90B0", burstDark: "#0D4580", tag: "SPICY",        imgSrc: "/Makan 3.PNG", desc: "An authentic Indian spice blend that packs a serious punch. Bold, fiery, and crafted for the true spice lover.", rating: 4.9, reviews: 458 },
//   { id: 3, name: "Magic Masala",   tagline: "Pure magic in every bite",          weight: "40g", price: "₹30", priceNum: 30, bg: "#6B2490", burstLight: "#8B30B0", burstDark: "#4A1870", tag: "ZESTY",        imgSrc: "/Makan 4.PNG", desc: "A mysterious blend of tangy spices that creates pure magic. Once you start, you simply cannot stop.", rating: 4.6, reviews: 187 },
//   { id: 4, name: "Mint & Lime",    tagline: "Double the refreshment",            weight: "80g", price: "₹55", priceNum: 55, bg: "#1E5C2A", burstLight: "#2D7A3A", burstDark: "#144020", tag: "FAMILY PACK",  imgSrc: "/Makan 1.PNG", desc: "All the cool mint-lime magic you love, now in a bigger pack for sharing (or not — we won't judge).", rating: 4.8, reviews: 96  },
//   { id: 5, name: "Cheese & Herbs", tagline: "More cheesy goodness",              weight: "80g", price: "₹55", priceNum: 55, bg: "#B8860B", burstLight: "#D4A017", burstDark: "#8A6008", tag: "FAMILY PACK",  imgSrc: "/Makan 2.PNG", desc: "Family-sized cheesy bliss. Perfect for movie nights, road trips, or any occasion that calls for serious snacking.", rating: 4.7, reviews: 72  },
//   { id: 6, name: "Munch Masala",   tagline: "Extra spicy, extra bold",           weight: "80g", price: "₹55", priceNum: 55, bg: "#1565A8", burstLight: "#1E90B0", burstDark: "#0D4580", tag: "FAMILY PACK",  imgSrc: "/Makan 3.PNG", desc: "Extra bold. Extra spicy. Extra satisfying. The 80g family pack of Munch Masala hits harder than ever.", rating: 4.9, reviews: 134 },
//   { id: 7, name: "Magic Masala",   tagline: "Double the magic",                  weight: "80g", price: "₹55", priceNum: 55, bg: "#6B2490", burstLight: "#8B30B0", burstDark: "#4A1870", tag: "FAMILY PACK",  imgSrc: "/Makan 4.PNG", desc: "The magic doesn't end — now with double the quantity. Perfect for those who know what's good.", rating: 4.6, reviews: 61  },
// ];

// // ─── Burst rays ───────────────────────────────────────────────────────────────
// function BurstRays({ light, dark }) {
//   const count = 24;
//   return (
//     <svg
//       viewBox="0 0 1000 1000"
//       xmlns="http://www.w3.org/2000/svg"
//       className="absolute pointer-events-none"
//       style={{ width: "200%", height: "200%", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
//     >
//       {Array.from({ length: count }).map((_, i) => {
//         const angle = (i / count) * 360;
//         const rad   = (angle * Math.PI) / 180;
//         const x1 = 500 + Math.cos(rad) * 60,  y1 = 500 + Math.sin(rad) * 60;
//         const x2 = 500 + Math.cos(rad) * 520, y2 = 500 + Math.sin(rad) * 520;
//         const len  = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
//         const wide = i % 3 === 0;
//         return (
//           <rect key={i} x={-(wide?14:7)} y={0} width={wide?28:14} height={len} rx={6}
//             fill={i%2===0 ? light : dark} opacity={wide?0.55:0.28}
//             transform={`translate(${x1},${y1}) rotate(${angle+90})`}
//           />
//         );
//       })}
//     </svg>
//   );
// }

// // ─── Yellow grunge speckle background — FIXED with more speckles & proper fill ─
// // ─── Yellow grunge speckle background — FIXED with transparent base ─
// function GrungeBackground() {
//   const speckles = Array.from({ length: 220 }).map((_, i) => {
//     const x = ((i * 137.508) % 100);
//     const y = ((i * 97.333) % 100);
//     const s = 3 + (i % 7);
//     const o = 0.18 + (i % 5) * 0.09;
//     const r = i * 23;
//     return { x, y, s, o, r };
//   });

//   return (
//     <div
//       className="absolute inset-0 pointer-events-none overflow-hidden"
//       style={{ background: "transparent" }} // ← REMOVED yellow background
//     >
//       {/* Grunge noise layer - keep for texture */}
//       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
//         <filter id="grunge2">
//           <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" stitchTiles="stitch"/>
//           <feColorMatrix type="saturate" values="0"/>
//           <feBlend in="SourceGraphic" mode="multiply"/>
//         </filter>
//         <rect width="100%" height="100%" fill="#ffdf51" filter="url(#grunge2)" opacity="0.3"/> {/* ← Reduced opacity */}
//       </svg>

//       {/* White speckles */}
//       {speckles.map((sp, i) => (
//         <div key={i} className="absolute rounded-full bg-white" style={{
//           left: `${sp.x}%`, top: `${sp.y}%`,
//           width: sp.s,
//           height: i % 4 === 0 ? sp.s : sp.s * 0.45,
//           opacity: sp.o,
//           transform: `rotate(${sp.r}deg)`,
//         }}/>
//       ))}

//       {/* Extra large scattered blobs */}
//       {Array.from({ length: 18 }).map((_, i) => (
//         <div key={`blob-${i}`} className="absolute rounded-full bg-white" style={{
//           left: `${(i * 53) % 100}%`,
//           top:  `${(i * 71) % 100}%`,
//           width:  12 + (i % 8) * 4,
//           height: 5  + (i % 5) * 2,
//           opacity: 0.06 + (i % 3) * 0.04, // ← Reduced opacity
//           transform: `rotate(${i * 37}deg)`,
//         }}/>
//       ))}
//     </div>
//   );
// }

// // ─── Flying cart animation ────────────────────────────────────────────────────
// function fireCartFly(e) {
//   const btn = e.currentTarget;
//   const rect = btn.getBoundingClientRect();
//   const navCart = document.getElementById("nav-cart-btn");
//   const navRect = navCart?.getBoundingClientRect();

//   const fly = document.createElement("div");
//   fly.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
//   fly.style.cssText = `
//     position:fixed; left:${rect.left+rect.width/2-14}px; top:${rect.top+rect.height/2-14}px;
//     width:56px; height:56px; background:white; border-radius:50%;
//     display:flex; align-items:center; justify-content:center;
//     z-index:9999; pointer-events:none; box-shadow:0 4px 20px rgba(0,0,0,0.25);
//   `;
//   document.body.appendChild(fly);

//   fly.animate([
//     { transform:"scale(0)", opacity:0 },
//     { transform:"scale(1.25)", opacity:1, offset:0.4 },
//     { transform:"scale(1)", opacity:1 },
//   ], { duration:350, easing:"cubic-bezier(0.34,1.56,0.64,1)", fill:"forwards" });

//   setTimeout(() => {
//     const tx = navRect ? navRect.left+navRect.width/2-14 : window.innerWidth-80;
//     const ty = navRect ? navRect.top+navRect.height/2-14 : 20;
//     fly.animate([
//       { left:`${rect.left+rect.width/2-14}px`, top:`${rect.top+rect.height/2-14}px`, transform:"scale(1)", opacity:1 },
//       { left:`${tx}px`, top:`${ty}px`, transform:"scale(0.4)", opacity:0.7 },
//     ], { duration:600, easing:"cubic-bezier(0.25,0.46,0.45,0.94)", fill:"forwards" });
//     setTimeout(() => { fly.remove(); window.dispatchEvent(new CustomEvent("cart-added")); }, 620);
//   }, 350);
// }

// // ─── Related Product mini-card ────────────────────────────────────────────────
// function RelatedCard({ product, onNavigate }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <motion.div
//       initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
//       viewport={{ once:true }} transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
//       className="relative flex flex-col items-center overflow-hidden cursor-pointer flex-shrink-0"
//       style={{ width:200, minWidth:200, height:300, background:product.bg, borderRadius:16,
//         boxShadow:"0 8px 32px rgba(0,0,0,0.22)" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => onNavigate(product.id)}
//     >
//       <div className="absolute top-3 left-3 z-10 text-[9px] font-black tracking-[2px] px-2 py-1 rounded"
//         style={{ fontFamily:"var(--font-heading)", background:"#FFD700", color:"#111" }}>
//         {product.tag}
//       </div>

//       <motion.img
//         src={product.imgSrc} alt={product.name}
//         animate={hovered ? { y:-12, scale:1.08, rotate:-5 } : { y:0, scale:1, rotate:0 }}
//         transition={{ type:"spring", stiffness:260, damping:18 }}
//         style={{ height:140, width:"auto", objectFit:"contain",
//           filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.4))", marginTop:40 }}
//       />

//       <div className="text-center px-3 mt-2">
//         <p className="text-white font-black text-sm uppercase leading-tight"
//           style={{ fontFamily:"var(--font-heading)" }}>{product.name}</p>
//         <p className="text-white/60 text-[10px] mt-0.5" style={{ fontFamily:"var(--font-body)" }}>
//           {product.weight}
//         </p>
//         <p className="font-black text-base mt-1" style={{ fontFamily:"var(--font-heading)", color:"#FFD700" }}>
//           {product.price}
//         </p>
//       </div>

//       <motion.div
//         animate={hovered ? { opacity:1, y:0 } : { opacity:0, y:10 }}
//         transition={{ duration:0.22 }}
//         className="absolute bottom-3 text-[11px] font-black tracking-widest px-4 py-2 rounded-full"
//         style={{ fontFamily:"var(--font-heading)", background:"#111", color:"#FFD700" }}
//       >
//         VIEW →
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─── Main ProductDetails component ───────────────────────────────────────────
// export default function ProductDetails({ onCartAdd }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const productId  = Math.min(Math.max(parseInt(id) || 0, 0), PRODUCTS.length - 1);
//   const [current, setCurrent] = useState(productId);
//   const [qty, setQty]         = useState(1);
//   const [addedFlash, setAddedFlash] = useState(false);
//   const [imgKey, setImgKey]   = useState(0);
//   const relatedRef = useRef(null);

//   const product = PRODUCTS[current];
//   const related = PRODUCTS.filter(p => p.id !== current).slice(0, 5);

//   useEffect(() => { setCurrent(productId); }, [productId]);
//   useEffect(() => {
//   const el = relatedRef.current;
//   if (!el) return;
//   const handleWheel = (e) => {
//     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//       e.preventDefault();
//       el.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
//     }
//   };
//   el.addEventListener("wheel", handleWheel, { passive: false });
//   return () => el.removeEventListener("wheel", handleWheel);
// }, []);
//   const goTo = (newId) => {
//     setImgKey(k => k+1);
//     setCurrent(newId);
//     navigate(`/product/${newId}`, { replace: true });
//     setQty(1);
//   };

//   const handleCartClick = (e) => {
//     fireCartFly(e);
//     setAddedFlash(true);
//     setTimeout(() => setAddedFlash(false), 1000);
//     onCartAdd && onCartAdd(product, qty);
//     window.dispatchEvent(new CustomEvent("cart-added"));
//   };

//   return (
//     <div style={{ background:"#111", minHeight:"100vh" }}>

//       {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
//       <motion.section
//         animate={{ backgroundColor: product.bg }}
//         transition={{ duration:0.5 }}
//         className="relative overflow-hidden"
//         style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}
//       >
//         {/* Burst */}
//         <div className="absolute inset-0 overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div key={`burst-${current}`}
//               initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
//               exit={{ opacity:0 }} transition={{ duration:0.5 }}
//               style={{ width:"100%", height:"100%", position:"absolute" }}
//             >
//               <BurstRays light={product.burstLight} dark={product.burstDark} />
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Back button */}
//         <motion.button
//           initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
//           transition={{ delay:0.3 }}
//           onClick={() => navigate(-1)}
//           className="absolute top-24 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full border-none cursor-pointer"
//           style={{ background:"rgba(0,0,0,0.45)", color:"#fff",
//             fontFamily:"var(--font-heading)", fontSize:13, letterSpacing:1 }}
//           whileHover={{ scale:1.05, background:"rgba(232,25,44,0.9)" }}
//           whileTap={{ scale:0.95 }}
//         >
//           <ArrowLeft size={16}/> BACK
//         </motion.button>

//         {/* Prev / Next arrow buttons */}
//         {[-1,1].map(dir => {
//           const target = current + dir;
//           const valid  = target >= 0 && target < PRODUCTS.length;
//           return (
//             <motion.button key={dir}
//               whileHover={{ scale:1.12, backgroundColor:"rgba(232,25,44,1)" }}
//               whileTap={{ scale:0.9 }}
//               onClick={() => valid && goTo(target)}
//               className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center border-none shadow-2xl"
//               style={{
//                 [dir===-1?"left":"right"]: 18,
//                 width:52, height:52, borderRadius:"50%",
//                 background: valid ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.2)",
//                 color: valid ? "#fff" : "rgba(255,255,255,0.3)",
//                 transition:"background 0.2s", cursor: valid?"pointer":"default"
//               }}
//             >
//               {dir===-1 ? <ChevronLeft size={26} strokeWidth={3}/> : <ChevronRight size={26} strokeWidth={3}/>}
//             </motion.button>
//           );
//         })}

//         {/* Main content — INCREASED image size */}
//         <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16
//           px-8 pt-28 pb-28 flex-1" style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>

//           {/* Product Image — BIGGER */}
//           <AnimatePresence mode="wait">
//             <motion.div key={`img-${imgKey}-${current}`}
//               initial={{ opacity:0, x:-60, rotate:-8, scale:0.85 }}
//               animate={{ opacity:1, x:0, rotate:0, scale:1 }}
//               exit={{ opacity:0, x:60, scale:0.9 }}
//               transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
//               className="flex items-center justify-center"
//               style={{ flex:"0 0 auto" }}
//             >
//               <motion.img
//                 src={product.imgSrc} alt={product.name}
//                 whileHover={{ rotate:-6, scale:1.06, y:-10 }}
//                 transition={{ type:"spring", stiffness:220, damping:16 }}
//                 style={{
//                   /* INCREASED: was clamp(320px,45vh,520px) → now bigger */
//                   height:"clamp(400px,55vh,640px)",
//                   width:"auto", objectFit:"contain",
//                   filter:"drop-shadow(0 40px 80px rgba(0,0,0,0.55))",
//                 }}
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* Info panel */}
//           <AnimatePresence mode="wait">
//             <motion.div key={`info-${current}`}
//               initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
//               exit={{ opacity:0, y:-20 }}
//               transition={{ duration:0.5, delay:0.1, ease:[0.22,1,0.36,1] }}
//               className="flex flex-col gap-4"
//               style={{ maxWidth:440 }}
//             >
//               {/* Tag */}
//               <div className="inline-block self-start text-[10px] font-black tracking-[3px] px-3 py-1.5 rounded"
//                 style={{ fontFamily:"var(--font-heading)", background:"#FFD700", color:"#111" }}>
//                 {product.tag}
//               </div>

//               {/* Name */}
//               <h1 className="font-black leading-none text-white m-0"
//                 style={{ fontFamily:"var(--font-heading)",
//                   fontSize:"clamp(38px,6vw,72px)", letterSpacing:-1,
//                   textShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
//                 {product.name}
//               </h1>

//               {/* Tagline */}
//               <p className="text-white/70 text-sm tracking-[3px] uppercase m-0"
//                 style={{ fontFamily:"var(--font-body)" }}>
//                 {product.tagline}
//               </p>

//               {/* Stars */}
//               <div className="flex items-center gap-2">
//                 {[1,2,3,4,5].map(i => (
//                   <Star key={i} size={16}
//                     fill={i<=Math.round(product.rating)?"#FFD700":"none"}
//                     stroke={i<=Math.round(product.rating)?"#FFD700":"rgba(255,255,255,0.4)"}
//                   />
//                 ))}
//                 <span className="text-white/60 text-xs ml-1" style={{ fontFamily:"var(--font-body)" }}>
//                   {product.rating} · {product.reviews} reviews
//                 </span>
//               </div>

//               {/* Description */}
//               <p className="text-white/80 text-sm leading-relaxed m-0" style={{ fontFamily:"var(--font-body)" }}>
//                 {product.desc}
//               </p>

//               {/* Weight badge */}
//               <div className="flex items-center gap-3">
//                 <div className="px-4 py-1.5 rounded-full text-sm font-black"
//                   style={{ fontFamily:"var(--font-heading)", background:"rgba(255,255,255,0.15)",
//                     color:"#fff", border:"1px solid rgba(255,255,255,0.25)" }}>
//                   NET WT {product.weight}
//                 </div>
//               </div>

//               {/* Price + Qty */}
//               <div className="flex items-center gap-6">
//                 <motion.p
//                   key={`price-${current}`}
//                   initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
//                   transition={{ type:"spring", stiffness:300, damping:18, delay:0.2 }}
//                   className="font-black m-0"
//                   style={{ fontFamily:"var(--font-heading)", fontSize:48, color:"#FFD700",
//                     textShadow:"0 2px 16px rgba(0,0,0,0.2)" }}
//                 >
//                   {product.price}
//                 </motion.p>

//                 {/* Qty stepper */}
//                 <div className="flex items-center gap-3 px-3 py-2 rounded-full"
//                   style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.2)" }}>
//                   <motion.button whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}
//                     onClick={() => setQty(q => Math.max(1,q-1))}
//                     className="text-white font-black text-xl w-7 h-7 flex items-center justify-center
//                       rounded-full border-none cursor-pointer"
//                     style={{ background:"rgba(255,255,255,0.15)" }}>−</motion.button>
//                   <span className="text-white font-black text-lg w-6 text-center"
//                     style={{ fontFamily:"var(--font-heading)" }}>{qty}</span>
//                   <motion.button whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}
//                     onClick={() => setQty(q => q+1)}
//                     className="text-white font-black text-xl w-7 h-7 flex items-center justify-center
//                       rounded-full border-none cursor-pointer"
//                     style={{ background:"rgba(255,255,255,0.15)" }}>+</motion.button>
//                 </div>
//               </div>

//               {/* Add to Cart */}
//               <motion.button
//                 whileHover={{ scale:1.04, boxShadow:"0 12px 40px rgba(0,0,0,0.35)" }}
//                 whileTap={{ scale:0.97 }}
//                 animate={addedFlash ? { scale:[1,1.06,1] } : {}}
//                 onClick={handleCartClick}
//                 className="flex items-center justify-center gap-3 border-none cursor-pointer rounded-full"
//                 style={{
//                   fontFamily:"var(--font-heading)", fontSize:15, fontWeight:900,
//                   letterSpacing:2, padding:"18px 0", width:"100%",
//                   background: addedFlash ? "#22c55e" : "#111",
//                   color: addedFlash ? "#fff" : "#FFD700",
//                   boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
//                   transition:"background 0.3s",
//                 }}
//               >
//                 <ShoppingCart size={20}/>
//                 {addedFlash ? "ADDED! ✓" : `ADD TO CART · ${product.price}`}
//               </motion.button>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Bottom wave into yellow section — seamless, no gap */}
//         <svg
//           className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
//           viewBox="0 0 1440 100"
//           preserveAspectRatio="none"
//           style={{ height: 100, display:"block" }}
//         >
//           <path d="M0,20 Q360,100 720,50 Q1080,0 1440,70 L1440,100 L0,100 Z" fill="#FFD700"/>
//         </svg>

//         {/* Watermark */}
//         <AnimatePresence mode="wait">
//           <motion.p key={`wm-${current}`}
//             initial={{ opacity:0 }} animate={{ opacity:0.08 }} exit={{ opacity:0 }}
//             className="absolute bottom-20 left-6 z-10 font-black pointer-events-none select-none leading-none"
//             style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(40px,9vw,100px)",
//               color:"#fff", letterSpacing:-3 }}>
//             {product.name.toUpperCase()}
//           </motion.p>
//         </AnimatePresence>
//       </motion.section>

//       {/* ── YELLOW GRUNGE SECTION ─────────────────────────────────────────── */}
//       {/*  ORDER CHANGED: Product details info FIRST, then Related Products    */}
//       <div
//         className="relative"
//         style={{
//           background: "#FFD700",
//           /* No top padding — wave from hero bleeds directly into this */
//           paddingTop: 0,
//           paddingBottom: 0,
//           /* Make sure it stretches fully to bottom, no gap before footer */
//           marginBottom: 0,
//         }}
//       >
//         <GrungeBackground />

//         <div className="relative z-10" style={{ maxWidth:1100, margin:"0 auto", padding:"80px 24px 0" }}>

//           {/* ── 1. PRODUCT DETAILS (Description, Nutrition, etc.) FIRST ───── */}
//           <motion.h2
//             initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
//             viewport={{ once:true }} transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
//             className="font-black m-0 mb-8"
//             style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(36px,7vw,72px)",
//               color:"#111", letterSpacing:-2 }}
//           >
//             Product Details
//           </motion.h2>

//           <div className="grid md:grid-cols-2 gap-8">
//             {[
//               { title:"Description",    content: product.desc },
//               { title:"Nutrition Facts", content:"Each 40g serving contains approx. 190 kcal, 3g protein, 10g fat, and 22g carbohydrates. 100% natural flavours, no artificial colours." },
//               { title:"Ingredients",    content:"Lotus seeds (Makhana), Vegetable oil, Salt, Natural flavour extracts. Contains no preservatives, artificial colours or MSG." },
//               { title:"Why Makhana?",   content:"Lotus seeds are a superfood — high in protein, low in calories, and packed with antioxidants. The perfect guilt-free snack that's as nutritious as it is delicious." },
//             ].map((item, i) => (
//               <motion.div key={item.title}
//                 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
//                 className="rounded-2xl p-6"
//                 style={{ background:"rgba(0,0,0,0.07)", border:"1px solid rgba(0,0,0,0.12)" }}
//               >
//                 <h3 className="font-black text-lg m-0 mb-2"
//                   style={{ fontFamily:"var(--font-heading)", color:"#111" }}>
//                   {item.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed m-0"
//                   style={{ fontFamily:"var(--font-body)", color:"#333" }}>
//                   {item.content}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="my-14 h-px" style={{ background:"rgba(0,0,0,0.18)" }}/>

//           {/* ── 2. RELATED PRODUCTS SECOND ──────────────────────────────── */}
//           <motion.h2
//             initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
//             viewport={{ once:true }} transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
//             className="font-black m-0 mb-8"
//             style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(36px,7vw,72px)",
//               color:"#111", letterSpacing:-2 }}
//           >
//             Related Products
//           </motion.h2>

//           <div className="relative">
//             <div
//               ref={relatedRef}
//               className="flex gap-4 overflow-x-auto pb-4"
//               style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}
//             >
//               {related.map(p => (
//                 <RelatedCard key={p.id} product={p} onNavigate={goTo} />
//               ))}
//             </div>
//           </div>

//           {/* CTA — BACK TO ALL PRODUCTS, properly spaced before footer wave */}
//           <div className="flex justify-center" style={{ marginTop:72, paddingBottom:100 }}>
//             <motion.button
//               whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
//               onClick={() => navigate("/")}
//               className="font-black tracking-widest text-white px-14 py-4 rounded-full border-none cursor-pointer"
//               style={{ fontFamily:"var(--font-heading)", fontSize:14,
//                 background:"#E8192C", letterSpacing:2,
//                 boxShadow:"0 8px 32px rgba(232,25,44,0.32)" }}
//             >
//               ← BACK TO ALL PRODUCTS
//             </motion.button>
//           </div>
//         </div>

//         {/* Wave into footer — sits INSIDE the yellow div so it's flush */}

//       </div>

//     </div>
//   );
// }































import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE;

// ─── Burst rays (unchanged) ───────────────────────────────────────────────────
function BurstRays({ light, dark }) {
  const count = 24;
  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"
      className="absolute pointer-events-none"
      style={{ width: "200%", height: "200%", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const rad   = (angle * Math.PI) / 180;
        const x1 = 500 + Math.cos(rad) * 60,  y1 = 500 + Math.sin(rad) * 60;
        const x2 = 500 + Math.cos(rad) * 520, y2 = 500 + Math.sin(rad) * 520;
        const len  = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        const wide = i % 3 === 0;
        return (
          <rect key={i} x={-(wide?14:7)} y={0} width={wide?28:14} height={len} rx={6}
            fill={i%2===0 ? light : dark} opacity={wide?0.55:0.28}
            transform={`translate(${x1},${y1}) rotate(${angle+90})`} />
        );
      })}
    </svg>
  );
}

// ─── Grunge background (unchanged) ───────────────────────────────────────────
function GrungeBackground() {
  const speckles = Array.from({ length: 220 }).map((_, i) => ({
    x: ((i * 137.508) % 100),
    y: ((i * 97.333) % 100),
    s: 3 + (i % 7),
    o: 0.18 + (i % 5) * 0.09,
    r: i * 23,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: "transparent" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
        <filter id="grunge2">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply"/>
        </filter>
        <rect width="100%" height="100%" fill="#ffdf51" filter="url(#grunge2)" opacity="0.3"/>
      </svg>
      {speckles.map((sp, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ left:`${sp.x}%`, top:`${sp.y}%`, width:sp.s,
            height: i%4===0 ? sp.s : sp.s*0.45, opacity:sp.o, transform:`rotate(${sp.r}deg)` }} />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={`blob-${i}`} className="absolute rounded-full bg-white"
          style={{ left:`${(i*53)%100}%`, top:`${(i*71)%100}%`,
            width:12+(i%8)*4, height:5+(i%5)*2,
            opacity:0.06+(i%3)*0.04, transform:`rotate(${i*37}deg)` }} />
      ))}
    </div>
  );
}

// ─── Flying cart (unchanged) ──────────────────────────────────────────────────
function fireCartFly(e) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const navCart = document.getElementById("nav-cart-btn");
  const navRect = navCart?.getBoundingClientRect();
  const fly = document.createElement("div");
  fly.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
  fly.style.cssText = `position:fixed;left:${rect.left+rect.width/2-14}px;top:${rect.top+rect.height/2-14}px;width:56px;height:56px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:9999;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,0.25);`;
  document.body.appendChild(fly);
  fly.animate([{transform:"scale(0)",opacity:0},{transform:"scale(1.25)",opacity:1,offset:0.4},{transform:"scale(1)",opacity:1}],
    {duration:350,easing:"cubic-bezier(0.34,1.56,0.64,1)",fill:"forwards"});
  setTimeout(() => {
    const tx = navRect ? navRect.left+navRect.width/2-14 : window.innerWidth-80;
    const ty = navRect ? navRect.top+navRect.height/2-14 : 20;
    fly.animate([
      {left:`${rect.left+rect.width/2-14}px`,top:`${rect.top+rect.height/2-14}px`,transform:"scale(1)",opacity:1},
      {left:`${tx}px`,top:`${ty}px`,transform:"scale(0.4)",opacity:0.7},
    ], {duration:600,easing:"cubic-bezier(0.25,0.46,0.45,0.94)",fill:"forwards"});
    setTimeout(() => { fly.remove(); window.dispatchEvent(new CustomEvent("cart-added")); }, 620);
  }, 350);
}

// ─── Add to cart API ──────────────────────────────────────────────────────────
async function addToCartAPI(variantId, qty) {
  const token = localStorage.getItem("access_token");
  if (!token) { window.dispatchEvent(new CustomEvent("require-login")); return false; }
  try {
    const res = await fetch(`${API}/api/cart/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ variant_id: variantId, quantity: qty }),
    });
    if (res.status === 401) { window.dispatchEvent(new CustomEvent("require-login")); return false; }
    return res.ok;
  } catch { return false; }
}

// ─── Related card (unchanged UI) ─────────────────────────────────────────────
function RelatedCard({ product, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
      className="relative flex flex-col items-center overflow-hidden cursor-pointer flex-shrink-0"
      style={{ width:200, minWidth:200, height:300, background:product.bg,
        borderRadius:16, boxShadow:"0 8px 32px rgba(0,0,0,0.22)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(product.id)}
    >
      <div className="absolute top-3 left-3 z-10 text-[9px] font-black tracking-[2px] px-2 py-1 rounded"
        style={{ fontFamily:"var(--font-heading)", background:"#FFD700", color:"#111" }}>
        {product.tag}
      </div>
      <motion.img src={product.imgSrc} alt={product.name}
        animate={hovered ? {y:-12,scale:1.08,rotate:-5} : {y:0,scale:1,rotate:0}}
        transition={{ type:"spring", stiffness:260, damping:18 }}
        style={{ height:140, width:"auto", objectFit:"contain",
          filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.4))", marginTop:40 }} />
      <div className="text-center px-3 mt-2">
        <p className="text-white font-black text-sm uppercase leading-tight"
          style={{ fontFamily:"var(--font-heading)" }}>{product.name}</p>
        <p className="text-white/60 text-[10px] mt-0.5" style={{ fontFamily:"var(--font-body)" }}>
          {product.weight}
        </p>
        <p className="font-black text-base mt-1" style={{ fontFamily:"var(--font-heading)", color:"#FFD700" }}>
          {product.price}
        </p>
      </div>
      <motion.div
        animate={hovered ? {opacity:1,y:0} : {opacity:0,y:10}}
        transition={{ duration:0.22 }}
        className="absolute bottom-3 text-[11px] font-black tracking-widest px-4 py-2 rounded-full"
        style={{ fontFamily:"var(--font-heading)", background:"#111", color:"#FFD700" }}>
        VIEW →
      </motion.div>
    </motion.div>
  );
}

// ─── Main ProductDetails ──────────────────────────────────────────────────────
export default function ProductDetails({ onCartAdd }) {
  const { id }     = useParams();  // now a variant UUID from the URL
  const navigate   = useNavigate();

  const [product, setProduct]       = useState(null);
  const [related, setRelated]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [qty, setQty]               = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);
  const [imgKey, setImgKey]         = useState(0);
  const relatedRef = useRef(null);

  // ── Fetch this variant + related from backend ─────────────────────────
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setQty(1);
    fetch(`${API}/api/products/${id}/`)
      .then(r => r.json())
      .then(data => {
        setProduct(data);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const el = relatedRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const goTo = (variantId) => {
    setImgKey(k => k + 1);
    navigate(`/product/${variantId}`, { replace: true });
  };

  const handleCartClick = async (e) => {
    fireCartFly(e);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1000);
    await addToCartAPI(product.id, qty);
    onCartAdd && onCartAdd(product, qty);
    window.dispatchEvent(new CustomEvent("cart-added"));
  };

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading || !product) {
    return (
      <div style={{ background: "#1E5C2A", minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)" }} />
      </div>
    );
  }

  return (
    <div style={{ background: "#111", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        animate={{ backgroundColor: product.bg }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Burst */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`burst-${product.id}`}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              style={{ width: "100%", height: "100%", position: "absolute" }}>
              <BurstRays light={product.burstLight} dark={product.burstDark} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button */}
        <motion.button initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full border-none cursor-pointer"
          style={{ background: "rgba(0,0,0,0.45)", color: "#fff",
            fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 1 }}
          whileHover={{ scale: 1.05, background: "rgba(232,25,44,0.9)" }}
          whileTap={{ scale: 0.95 }}>
          <ArrowLeft size={16} /> BACK
        </motion.button>

        {/* Prev / Next using related array */}
        {related.length > 0 && [-1, 1].map(dir => {
          const target = dir === -1 ? related[related.length - 1] : related[0];
          return (
            <motion.button key={dir}
              whileHover={{ scale: 1.12, backgroundColor: "rgba(232,25,44,1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(target.id)}
              className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center border-none shadow-2xl cursor-pointer"
              style={{ [dir===-1?"left":"right"]: 18, width: 52, height: 52,
                borderRadius: "50%", background: "rgba(0,0,0,0.72)", color: "#fff",
                transition: "background 0.2s" }}>
              {dir===-1 ? <ChevronLeft size={26} strokeWidth={3}/> : <ChevronRight size={26} strokeWidth={3}/>}
            </motion.button>
          );
        })}

        {/* Main content */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8 pt-28 pb-28 flex-1"
          style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div key={`img-${imgKey}-${product.id}`}
              initial={{ opacity: 0, x: -60, rotate: -8, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center" style={{ flex: "0 0 auto" }}>
              <motion.img src={product.imgSrc} alt={product.name}
                whileHover={{ rotate: -6, scale: 1.06, y: -10 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                style={{ height: "clamp(400px,55vh,640px)", width: "auto",
                  objectFit: "contain", filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.55))" }} />
            </motion.div>
          </AnimatePresence>

          {/* Info panel */}
          <AnimatePresence mode="wait">
            <motion.div key={`info-${product.id}`}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4" style={{ maxWidth: 440 }}>

              <div className="inline-block self-start text-[10px] font-black tracking-[3px] px-3 py-1.5 rounded"
                style={{ fontFamily: "var(--font-heading)", background: "#FFD700", color: "#111" }}>
                {product.tag}
              </div>

              <h1 className="font-black leading-none text-white m-0"
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(38px,6vw,72px)",
                  letterSpacing: -1, textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                {product.name}
              </h1>

              <p className="text-white/70 text-sm tracking-[3px] uppercase m-0"
                style={{ fontFamily: "var(--font-body)" }}>{product.tagline}</p>

              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16}
                    fill={i<=Math.round(product.rating)?"#FFD700":"none"}
                    stroke={i<=Math.round(product.rating)?"#FFD700":"rgba(255,255,255,0.4)"} />
                ))}
                <span className="text-white/60 text-xs ml-1" style={{ fontFamily: "var(--font-body)" }}>
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              <p className="text-white/80 text-sm leading-relaxed m-0"
                style={{ fontFamily: "var(--font-body)" }}>{product.desc}</p>

              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 rounded-full text-sm font-black"
                  style={{ fontFamily: "var(--font-heading)", background: "rgba(255,255,255,0.15)",
                    color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
                  NET WT {product.weight}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <motion.p key={`price-${product.id}`}
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                  className="font-black m-0"
                  style={{ fontFamily: "var(--font-heading)", fontSize: 48, color: "#FFD700",
                    textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                  {product.price}
                </motion.p>

                <div className="flex items-center gap-3 px-3 py-2 rounded-full"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setQty(q => Math.max(1, q-1))}
                    className="text-white font-black text-xl w-7 h-7 flex items-center justify-center rounded-full border-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.15)" }}>−</motion.button>
                  <span className="text-white font-black text-lg w-6 text-center"
                    style={{ fontFamily: "var(--font-heading)" }}>{qty}</span>
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setQty(q => q+1)}
                    className="text-white font-black text-xl w-7 h-7 flex items-center justify-center rounded-full border-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.15)" }}>+</motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}
                whileTap={{ scale: 0.97 }}
                animate={addedFlash ? { scale: [1, 1.06, 1] } : {}}
                onClick={handleCartClick}
                className="flex items-center justify-center gap-3 border-none cursor-pointer rounded-full"
                style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 900,
                  letterSpacing: 2, padding: "18px 0", width: "100%",
                  background: addedFlash ? "#22c55e" : "#111",
                  color: addedFlash ? "#fff" : "#FFD700",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "background 0.3s" }}>
                <ShoppingCart size={20} />
                {addedFlash ? "ADDED! ✓" : `ADD TO CART · ${product.price}`}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
          viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: 100, display: "block" }}>
          <path d="M0,20 Q360,100 720,50 Q1080,0 1440,70 L1440,100 L0,100 Z" fill="#FFD700"/>
        </svg>

        {/* Watermark */}
        <AnimatePresence mode="wait">
          <motion.p key={`wm-${product.id}`}
            initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} exit={{ opacity: 0 }}
            className="absolute bottom-20 left-6 z-10 font-black pointer-events-none select-none leading-none"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(40px,9vw,100px)",
              color: "#fff", letterSpacing: -3 }}>
            {product.name.toUpperCase()}
          </motion.p>
        </AnimatePresence>
      </motion.section>

      {/* ── YELLOW GRUNGE SECTION ─────────────────────────────────────────── */}
      <div className="relative" style={{ background: "#FFD700", paddingTop: 0, paddingBottom: 0 }}>
        <GrungeBackground />

        <div className="relative z-10" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 0" }}>

          <motion.h2 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-black m-0 mb-8"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px,7vw,72px)",
              color: "#111", letterSpacing: -2 }}>
            Product Details
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Description",    content: product.desc },
              { title: "Nutrition Facts", content: "Each 40g serving contains approx. 190 kcal, 3g protein, 10g fat, and 22g carbohydrates. 100% natural flavours, no artificial colours." },
              { title: "Ingredients",    content: "Lotus seeds (Makhana), Vegetable oil, Salt, Natural flavour extracts. Contains no preservatives, artificial colours or MSG." },
              { title: "Why Makhana?",   content: "Lotus seeds are a superfood — high in protein, low in calories, and packed with antioxidants. The perfect guilt-free snack that's as nutritious as it is delicious." },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: "rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.12)" }}>
                <h3 className="font-black text-lg m-0 mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "#111" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed m-0"
                  style={{ fontFamily: "var(--font-body)", color: "#333" }}>{item.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="my-14 h-px" style={{ background: "rgba(0,0,0,0.18)" }} />

          <motion.h2 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-black m-0 mb-8"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px,7vw,72px)",
              color: "#111", letterSpacing: -2 }}>
            Related Products
          </motion.h2>

          <div className="relative">
            <div ref={relatedRef} className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {related.map(p => (
                <RelatedCard key={p.id} product={p} onNavigate={goTo} />
              ))}
            </div>
          </div>

          <div className="flex justify-center" style={{ marginTop: 72, paddingBottom: 100 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              className="font-black tracking-widest text-white px-14 py-4 rounded-full border-none cursor-pointer"
              style={{ fontFamily: "var(--font-heading)", fontSize: 14,
                background: "#E8192C", letterSpacing: 2,
                boxShadow: "0 8px 32px rgba(232,25,44,0.32)" }}>
              ← BACK TO ALL PRODUCTS
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}