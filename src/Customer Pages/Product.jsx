// import { useRef, useState, useCallback,useEffect } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const PRODUCTS = [
//   { name: "Mint & Lime",    tagline: "Refreshing coolness in every bite", weight: "40g", price: "₹30", bg: "#1E5C2A", tag: "BESTSELLER",  imgSrc: "/Makan 1.PNG" },
//   { name: "Cheese & Herbs", tagline: "Rich, creamy & irresistible",       weight: "40g", price: "₹30", bg: "#B8860B", tag: "POPULAR",      imgSrc: "/Makan 2.PNG" },
//   { name: "Munch Masala",   tagline: "Bold Indian spice blend",           weight: "40g", price: "₹30", bg: "#1565A8", tag: "SPICY",        imgSrc: "/Makan 3.PNG" },
//   { name: "Magic Masala",   tagline: "Pure magic in every bite",          weight: "40g", price: "₹30", bg: "#6B2490", tag: "ZESTY",        imgSrc: "/Makan 4.PNG" },
//   { name: "Mint & Lime",    tagline: "Double the refreshment",            weight: "80g", price: "₹55", bg: "#1E5C2A", tag: "FAMILY PACK",  imgSrc: "/Makan 1.PNG" },
//   { name: "Cheese & Herbs", tagline: "More cheesy goodness",              weight: "80g", price: "₹55", bg: "#B8860B", tag: "FAMILY PACK",  imgSrc: "/Makan 2.PNG" },
//   { name: "Munch Masala",   tagline: "Extra spicy, extra bold",           weight: "80g", price: "₹55", bg: "#1565A8", tag: "FAMILY PACK",  imgSrc: "/Makan 3.PNG" },
//   { name: "Magic Masala",   tagline: "Double the magic",                  weight: "80g", price: "₹55", bg: "#6B2490", tag: "FAMILY PACK",  imgSrc: "/Makan 4.PNG" },
// ];

// // Fires a flying cart icon from click position → navbar cart button
// function fireCartFly(e) {
//   const btn = e.currentTarget;
//   const rect = btn.getBoundingClientRect();

//   // Find navbar cart button
//   const navCart = document.getElementById("nav-cart-btn");
//   const navRect = navCart?.getBoundingClientRect();

//   // Create flying element
//   const fly = document.createElement("div");
//   fly.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
//   fly.style.cssText = `
//     position: fixed;
//     left: ${rect.left + rect.width / 2 - 14}px;
//     top: ${rect.top + rect.height / 2 - 14}px;
//     width: 56px; height: 56px;
//     background: white;
//     border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     z-index: 9999;
//     pointer-events: none;
//     transition: none;
//     box-shadow: 0 4px 20px rgba(0,0,0,0.25);
//   `;
//   fly.style.display = "flex";
//   document.body.appendChild(fly);

//   // Phase 1: pop in (scale 0 → 1.2 → 1)
//   fly.animate([
//     { transform: "scale(0)", opacity: 0 },
//     { transform: "scale(1.25)", opacity: 1, offset: 0.4 },
//     { transform: "scale(1)", opacity: 1 },
//   ], { duration: 350, easing: "cubic-bezier(0.34,1.56,0.64,1)", fill: "forwards" });

//   // Phase 2: fly to navbar cart after 350ms
//   setTimeout(() => {
//     const targetX = navRect ? navRect.left + navRect.width / 2 - 14 : window.innerWidth - 80;
//     const targetY = navRect ? navRect.top + navRect.height / 2 - 14 : 20;

//     fly.animate([
//       {
//         left: `${rect.left + rect.width / 2 - 14}px`,
//         top: `${rect.top + rect.height / 2 - 14}px`,
//         transform: "scale(1)",
//         opacity: 1,
//       },
//       {
//         left: `${targetX}px`,
//         top: `${targetY}px`,
//         transform: "scale(0.4)",
//         opacity: 0.7,
//       },
//     ], {
//       duration: 600,
//       easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//       fill: "forwards",
//     });

//     // Phase 3: remove + vibrate navbar cart
//     setTimeout(() => {
//       fly.remove();
//       window.dispatchEvent(new CustomEvent("cart-added"));
//     }, 620);
//   }, 350);
// }

// function ProductColumn({ product, index, onCartClick, onProductClick }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 70 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
//       className="relative flex flex-col items-center justify-end flex-shrink-0 overflow-hidden"
//       onClick={() => onProductClick(product)} 
//       style={{ width: 240, minWidth: 240, height: 480, background: product.bg, scrollSnapAlign: "start" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Tag */}
//       <div
//         className="absolute top-4 left-4 z-10 text-[10px] font-black tracking-[2px] px-3 py-1.5 rounded"
//         style={{ fontFamily: "var(--font-heading)", background: "#d0b101", color: "#111" }}
//       >
//         {product.tag}
//       </div>

//       {/* Product image */}
//       <motion.div
//         animate={hovered ? { y: -20, rotate: -6, scale: 1.08 } : { y: 0, rotate: 0, scale: 1 }}
//         transition={{ type: "spring", stiffness: 260, damping: 18 }}
//         className="mb-4 z-10 flex items-center justify-center"
//         style={{ height: 220 }}
//       >
//         <img
//           src={product.imgSrc}
//           alt={product.name}
//           style={{
//             height: "100%", width: "auto", objectFit: "contain",
//             filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
//           }}
//         />
//       </motion.div>

//       {/* Text info */}
//       <div className="text-center px-4 z-10 pb-20">
//         <p className="text-white font-black text-[15px] leading-tight uppercase"
//           style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.5px" }}>
//           {product.name}
//         </p>
//         <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "var(--font-body)" }}>
//           {product.tagline}
//         </p>
//         <p className="text-[#FFD700] font-black text-xl mt-2" style={{ fontFamily: "var(--font-heading)" }}>
//           {product.price}
//         </p>
//       </div>

//       {/* ADD TO CART — slides from LEFT, black bg, yellow text */}
//       <motion.button
//         initial={false}
//         animate={hovered ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
//         transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
//         onClick={(e) => { e.stopPropagation(); fireCartFly(e); onCartClick(); }}
//         className="absolute bottom-0 left-0 right-0 z-20 w-full border-none cursor-pointer flex items-center justify-center gap-2"
//         style={{
//           fontFamily: "var(--font-heading)",
//           fontSize: 13,
//           fontWeight: 900,
//           letterSpacing: 2,
//           background: "#111111",
//           color: "#FFD700",
//           padding: "18px 0",
//         }}
//       >
//         <ShoppingCart size={16} />
//         ADD TO CART
//       </motion.button>
//     </motion.div>
//   );
// }

// export default function Products() {
  
//   const navigate = useNavigate();
//   const [activeBg, setActiveBg] = useState("#111111");
//   const [cartCount, setCartCount] = useState(0);
//   const scrollRef = useRef(null);
//   const titleRef  = useRef(null);
//   const titleInView = useInView(titleRef, { once: true });

//   const scrollBy = (dir) => {
//     scrollRef.current?.scrollBy({ left: dir * 250, behavior: "smooth" });
//   };
//    useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const handleWheel = (e) => {
//       if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//         e.preventDefault();
//         el.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
//       }
//     };
//     el.addEventListener("wheel", handleWheel, { passive: false });
//     return () => el.removeEventListener("wheel", handleWheel);
//   }, []);
//   return (
//     <section id="products" style={{ background: "#F5EFD6" }}>

//       {/* Yellow header band */}
//       <div className="relative overflow-hidden px-8 pt-10 pb-4" style={{ background: "#e4c409" }}>
//         <svg className="absolute top-0 right-0 pointer-events-none" width={300} height={160} viewBox="0 0 300 160">
//           {Array.from({ length: 12 }).map((_, i) => {
//             const a = (i / 12) * 180 + 180;
//             const r = (a * Math.PI) / 180;
//             const cx = 300, cy = 0;
//             return (
//               <rect key={i}
//                 x={cx + Math.cos(r) * 25} y={cy + Math.sin(r) * 25}
//                 width={i % 2 === 0 ? 12 : 7} height={90} rx={4}
//                 fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.45}
//                 transform={`rotate(${a + 90}, ${cx + Math.cos(r) * 25}, ${cy + Math.sin(r) * 25})`}
//               />
//             );
//           })}
//         </svg>
//         <motion.h2
//           ref={titleRef}
//           initial={{ opacity: 0, x: -50 }}
//           animate={titleInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           className="relative z-10 font-black leading-none m-0"
//           style={{
//             fontFamily: "var(--font-heading)",
//             fontSize: "clamp(32px, 4vw, 90px)",
//             color: "#111", letterSpacing: -3,
//           }}
//         >
//           Products
//         </motion.h2>
//       </div>

//       {/* Scrollable strip */}
//       <motion.div
//         animate={{ backgroundColor: activeBg }}
//         transition={{ duration: 0.3 }}
//         className="relative"
//       >
//         {/* Arrow buttons */}
//         {[-1, 1].map((dir) => (
//           <motion.button
//             key={dir}
//             whileHover={{ scale: 1.1, backgroundColor: "rgba(232,25,44,1)" }}
//             whileTap={{ scale: 0.92 }}
//             onClick={() => scrollBy(dir)}
//             className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center border-none cursor-pointer shadow-xl"
//             style={{
//               [dir === -1 ? "left" : "right"]: 10,
//               width: 48, height: 48, borderRadius: "50%",
//               background: "rgba(0,0,0,0.75)", color: "#fff",
//               transition: "background 0.2s",
//             }}
//           >
//             {dir === -1 ? <ChevronLeft size={24} strokeWidth={3} /> : <ChevronRight size={24} strokeWidth={3} />}
//           </motion.button>
//         ))}

//         {/* Product columns — onMouseEnter/Leave only on each card, NOT blocking scroll on container */}
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none", gap: 0, scrollSnapType: "x mandatory" }}
//         >
//           {PRODUCTS.map((p, i) => (
//             <ProductColumn
//               key={i}
//               product={p}
//               index={i}
//               onProductClick={() => navigate(`/product/${i}`)} 
//               onCartClick={() => {
//                 setCartCount((c) => c + 1);
//                 setActiveBg(p.bg);
//                 setTimeout(() => setActiveBg("#111111"), 1200);
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* CTA */}
//       <div className="flex justify-center py-14" style={{ background: "#F5EFD6" }}>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//          onClick={() => navigate("/product/0")}
    
//           className="font-black tracking-widest text-white px-14 py-4 rounded-full border-none cursor-pointer"
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 14,
//             background: "#E8192C", letterSpacing: 2,
//             boxShadow: "0 8px 32px rgba(232,25,44,0.32)",

//           }}
//         >
//           VIEW ALL PRODUCTS
//         </motion.button>
//       </div>
//     </section>
//   );
// }











import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../Customer Pages/Login";

const API = import.meta.env.VITE_API_BASE;

// ─── Flying cart animation (unchanged) ───────────────────────────────────────
function fireCartFly(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const navCart = document.getElementById("nav-cart-btn");
  const navRect = navCart?.getBoundingClientRect();

  const fly = document.createElement("div");
  fly.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
  fly.style.cssText = `
    position:fixed; left:${rect.left+rect.width/2-14}px; top:${rect.top+rect.height/2-14}px;
    width:56px; height:56px; background:white; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    z-index:9999; pointer-events:none; box-shadow:0 4px 20px rgba(0,0,0,0.25);
  `;
  document.body.appendChild(fly);
  fly.animate([
    { transform:"scale(0)", opacity:0 },
    { transform:"scale(1.25)", opacity:1, offset:0.4 },
    { transform:"scale(1)", opacity:1 },
  ], { duration:350, easing:"cubic-bezier(0.34,1.56,0.64,1)", fill:"forwards" });
  setTimeout(() => {
    const tx = navRect ? navRect.left+navRect.width/2-14 : window.innerWidth-80;
    const ty = navRect ? navRect.top+navRect.height/2-14 : 20;
    fly.animate([
      { left:`${rect.left+rect.width/2-14}px`, top:`${rect.top+rect.height/2-14}px`, transform:"scale(1)", opacity:1 },
      { left:`${tx}px`, top:`${ty}px`, transform:"scale(0.4)", opacity:0.7 },
    ], { duration:600, easing:"cubic-bezier(0.25,0.46,0.45,0.94)", fill:"forwards" });
    setTimeout(() => { fly.remove(); window.dispatchEvent(new CustomEvent("cart-added")); }, 620);
  }, 350);
}

// ─── Add to cart API call ─────────────────────────────────────────────────────
async function addToCartAPI(variantId) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.dispatchEvent(new CustomEvent("require-login"));
    return false;
  }
  try {
    const res = await fetch(`${API}/api/cart/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ variant_id: variantId, quantity: 1 }),
    });
    if (res.status === 401) {
      window.dispatchEvent(new CustomEvent("require-login"));
      return false;
    }
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Product card (unchanged UI) ─────────────────────────────────────────────
function ProductColumn({ product, index, onCartClick, onProductClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  const isOutOfStock = product.stock_status === "out_of_stock";
  const isLowStock   = product.stock_status === "low_stock";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-end flex-shrink-0 overflow-hidden"
      onClick={() => !isOutOfStock && onProductClick(product)}
      style={{ width: 240, minWidth: 240, height: 480, background: product.bg, 
        scrollSnapAlign: "start",
        opacity: isOutOfStock ? 0.7 : 1  // dim out of stock
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10 text-[10px] font-black tracking-[2px] px-3 py-1.5 rounded"
        style={{ fontFamily: "var(--font-heading)", background: "#d0b101", color: "#111" }}>
        {product.tag}
      </div>

      {/* ── Low Stock badge ── */}
      {isLowStock && (
        <div className="absolute top-4 right-4 z-10 text-[9px] font-black tracking-[1px] px-2 py-1 rounded"
          style={{ background: "#FF6B00", color: "#fff", fontFamily: "var(--font-heading)" }}>
          LOW STOCK
        </div>
      )}

      {/* ── Out of Stock overlay ── */}
      {isOutOfStock && (
        <div className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="text-white font-black text-sm tracking-widest px-4 py-2 rounded-full"
            style={{ fontFamily: "var(--font-heading)", background: "rgba(232,25,44,0.9)",
              border: "2px solid #fff" }}>
            OUT OF STOCK
          </div>
        </div>
      )}

      <motion.div
        animate={hovered ? { y: -20, rotate: -6, scale: 1.08 } : { y: 0, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mb-4 z-10 flex items-center justify-center"
        style={{ height: 220 }}
      >
        <img src={product.imgSrc} alt={product.name}
          style={{ height: "100%", width: "auto", objectFit: "contain",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))" }} />
      </motion.div>

      <div className="text-center px-4 z-10 pb-20">
        <p className="text-white font-black text-[15px] leading-tight uppercase"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.5px" }}>
          {product.name}
        </p>
        <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "var(--font-body)" }}>
          {product.tagline}
        </p>
        <p className="text-[#FFD700] font-black text-xl mt-2" style={{ fontFamily: "var(--font-heading)" }}>
          {product.price}
        </p>
      </div>

      {/* ── Add to Cart button — hidden if out of stock ── */}
      {!isOutOfStock && (
        <motion.button
          initial={false}
          animate={hovered ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => { e.stopPropagation(); onCartClick(product, e); }}
          className="absolute bottom-0 left-0 right-0 z-20 w-full border-none cursor-pointer flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 900,
            letterSpacing: 2, background: "#111111", color: "#FFD700", padding: "18px 0" }}
        >
          <ShoppingCart size={16} />
          ADD TO CART
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Skeleton card while loading ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ width: 240, minWidth: 240, height: 480, background: "#2a2a2a",
      flexShrink: 0, scrollSnapAlign: "start" }}>
      <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        style={{ width: "100%", height: "100%", background: "linear-gradient(180deg,#333 0%,#222 100%)" }} />
    </div>
  );
}

export default function Products() {
  const navigate  = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeBg, setActiveBg] = useState("#e7c400");
  const scrollRef  = useRef(null);
  const titleRef   = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
const [showLogin, setShowLogin] = useState(false);
  // ── Fetch products ────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${API}/api/products/`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const scrollBy = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 250, behavior: "smooth" });

  useEffect(() => {
    const el = scrollRef.current;
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

const handleCartClick = async (product, e) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    setShowLogin(true);
    return; // fireCartFly never runs
  }
  fireCartFly(e); // only runs if logged in
  setActiveBg(product.bg);
  setTimeout(() => setActiveBg("#e7c400"), 1200);
  await addToCartAPI(product.id);
};

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const productCount = products.length;

  return (
    <section id="products" style={{ background: "#F5EFD6" }}>

      {/* Yellow header band */}
      <div className="relative overflow-hidden px-8 pt-10 pb-4" style={{ background: "#e4c409" }}>
        <svg className="absolute top-0 right-0 pointer-events-none" width={300} height={160} viewBox="0 0 300 160">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * 180 + 180;
            const r = (a * Math.PI) / 180;
            const cx = 300, cy = 0;
            return (
              <rect key={i}
                x={cx + Math.cos(r) * 25} y={cy + Math.sin(r) * 25}
                width={i % 2 === 0 ? 12 : 7} height={90} rx={4}
                fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.45}
                transform={`rotate(${a + 90}, ${cx + Math.cos(r) * 25}, ${cy + Math.sin(r) * 25})`}
              />
            );
          })}
        </svg>
        <motion.h2 ref={titleRef}
          initial={{ opacity: 0, x: -50 }}
          animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-black leading-none m-0"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4vw, 90px)",
            color: "#111", letterSpacing: -3 }}>
          Products
        </motion.h2>
      </div>

      {/* Scrollable strip */}
      <motion.div animate={{ backgroundColor: activeBg }} transition={{ duration: 0.3 }} className="relative">
        {/* Show scroll buttons only if more than 3 products */}
        {!loading && productCount > 3 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(232,25,44,1)" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(-1)}
              className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center border-none cursor-pointer shadow-xl"
              style={{ left: 10, width: 48, height: 48,
                borderRadius: "50%", background: "rgba(0,0,0,0.75)", color: "#fff",
                transition: "background 0.2s" }}
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(232,25,44,1)" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollBy(1)}
              className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center border-none cursor-pointer shadow-xl"
              style={{ right: 10, width: 48, height: 48,
                borderRadius: "50%", background: "rgba(0,0,0,0.75)", color: "#fff",
                transition: "background 0.2s" }}
            >
              <ChevronRight size={24} strokeWidth={3} />
            </motion.button>
          </>
        )}

        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none", 
            gap: 0, 
            scrollSnapType: "x mandatory",
            justifyContent: loading ? "flex-start" : productCount <= 3 ? "center" : "flex-start"
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p, i) => (
                <ProductColumn key={p.id} product={p} index={i}
                  onProductClick={handleProductClick}
                  onCartClick={handleCartClick} />
              ))
          }
        </div>
      </motion.div>

      {/* CTA - only show if products exist */}
      {!loading && productCount > 0 && (
        <div className="flex justify-center py-14" style={{ background: "#F5EFD6" }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => products[0] && navigate(`/product/${products[0].id}`)}
            className="font-black tracking-widest text-white px-14 py-4 rounded-full border-none cursor-pointer"
            style={{ fontFamily: "var(--font-heading)", fontSize: 14, background: "#E8192C",
              letterSpacing: 2, boxShadow: "0 8px 32px rgba(232,25,44,0.32)" }}>
            VIEW ALL PRODUCTS
          </motion.button>
        </div>
      )}

      <AnimatePresence>
  {showLogin && (
    <Login
      onClose={() => setShowLogin(false)}
      onLoginSuccess={() => setShowLogin(false)}
    />
  )}
</AnimatePresence>
    </section>
  );
}