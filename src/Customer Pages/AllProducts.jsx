import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, X, ChevronRight, ChevronLeft, PackageCheck, Truck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../Customer Pages/Login";

const API = import.meta.env.VITE_API_BASE;
const PER_PAGE = 18;

// ─── Flying cart animation (same behaviour as Product/ProductDetails pages) ──
function fireCartFly(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const navCart = document.getElementById("nav-cart-btn");
  const navRect = navCart?.getBoundingClientRect();

  const fly = document.createElement("div");
  fly.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
  fly.style.cssText = `
    position:fixed; left:${rect.left + rect.width / 2 - 14}px; top:${rect.top + rect.height / 2 - 14}px;
    width:56px; height:56px; background:white; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    z-index:9999; pointer-events:none; box-shadow:0 4px 20px rgba(0,0,0,0.25);
  `;
  document.body.appendChild(fly);
  fly.animate(
    [
      { transform: "scale(0)", opacity: 0 },
      { transform: "scale(1.25)", opacity: 1, offset: 0.4 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 350, easing: "cubic-bezier(0.34,1.56,0.64,1)", fill: "forwards" }
  );
  setTimeout(() => {
    const tx = navRect ? navRect.left + navRect.width / 2 - 14 : window.innerWidth - 80;
    const ty = navRect ? navRect.top + navRect.height / 2 -14 : 20;
    fly.animate(
      [
        { left: `${rect.left + rect.width / 2 - 14}px`, top: `${rect.top + rect.height / 2 - 14}px`, transform: "scale(1)", opacity: 1 },
        { left: `${tx}px`, top: `${ty}px`, transform: "scale(0.4)", opacity: 0.7 },
      ],
      { duration: 600, easing: "cubic-bezier(0.25,0.46,0.45,0.94)", fill: "forwards" }
    );
    setTimeout(() => {
      fly.remove();
      window.dispatchEvent(new CustomEvent("cart-added"));
    }, 620);
  }, 350);
}

// ─── Add to cart API call ─────────────────────────────────────────────────────
async function addToCartAPI(variantId, qty) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.dispatchEvent(new CustomEvent("require-login"));
    return false;
  }
  try {
    const res = await fetch(`${API}/api/cart/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ variant_id: variantId, quantity: qty }),
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

// ─── Product Card ──────────────────────────────────────────────────────────
function ProductCard({ product, index, qty, onQtyChange, onCartClick, onNavigate, addedId }) {
  const [hovered, setHovered] = useState(false);
  const isOutOfStock = product.stock_status === "out_of_stock";
  const isLowStock = product.stock_status === "low_stock";
  const justAdded = addedId === product.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: product.bg,
        boxShadow: hovered ? "0 20px 45px rgba(0,0,0,0.28)" : "0 8px 24px rgba(0,0,0,0.16)",
        transition: "box-shadow 0.3s ease",
      }}
      onClick={() => onNavigate(product.id)}
    >
      {/* Tag */}
      <div
        className="absolute top-3 left-3 z-10 text-[9px] font-black tracking-[2px] px-2.5 py-1 rounded"
        style={{ fontFamily: "var(--font-heading)", background: "#FFD700", color: "#111" }}
      >
        {product.tag}
      </div>

      {/* Low stock badge */}
      {isLowStock && (
        <div
          className="absolute top-3 right-3 z-10 text-[8px] font-black tracking-[1px] px-2 py-1 rounded"
          style={{ background: "#FF6B00", color: "#fff", fontFamily: "var(--font-heading)" }}
        >
          LOW STOCK
        </div>
      )}

      {/* Out of stock overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
          <div
            className="text-white font-black text-[11px] tracking-widest px-3 py-1.5 rounded-full"
            style={{ fontFamily: "var(--font-heading)", background: "rgba(232,25,44,0.9)", border: "2px solid #fff" }}
          >
            OUT OF STOCK
          </div>
        </div>
      )}

      {/* Image */}
      <div className="flex items-center justify-center pt-10 pb-2" style={{ height: 180 }}>
        <motion.img
          src={product.imgSrc}
          alt={product.name}
          animate={hovered && !isOutOfStock ? { y: -8, scale: 1.07, rotate: -4 } : { y: 0, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{ height: "100%", width: "auto", objectFit: "contain", filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.4))" }}
        />
      </div>

      {/* Info */}
      <div className="text-center px-4 mt-1">
        <p className="text-white font-black text-[13px] uppercase leading-tight truncate" style={{ fontFamily: "var(--font-heading)" }}>
          {product.name}
        </p>
        <p className="text-white/60 text-[10px] mt-0.5 truncate" style={{ fontFamily: "var(--font-body)" }}>
          {product.tagline || product.weight}
        </p>
        <p className="font-black text-lg mt-1" style={{ fontFamily: "var(--font-heading)", color: "#FFD700" }}>
          {product.price}
        </p>
      </div>

      {/* Qty + Add to cart */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-4 mt-auto" onClick={(e) => e.stopPropagation()}>
        <div
          className="flex items-center gap-2 px-2 py-1.5 rounded-full flex-shrink-0"
          style={{ background: "rgba(0,0,0,0.32)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={isOutOfStock}
            onClick={() => onQtyChange(product.id, Math.max(1, qty - 1))}
            className="text-white font-black text-sm w-6 h-6 flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            −
          </motion.button>
          <span className="text-white font-black text-xs w-4 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            {qty}
          </span>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={isOutOfStock}
            onClick={() => onQtyChange(product.id, qty + 1)}
            className="text-white font-black text-sm w-6 h-6 flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            +
          </motion.button>
        </div>

        <motion.button
          whileHover={!isOutOfStock ? { scale: 1.03 } : {}}
          whileTap={!isOutOfStock ? { scale: 0.96 } : {}}
          animate={justAdded ? { scale: [1, 1.05, 1] } : {}}
          disabled={isOutOfStock}
          onClick={(e) => onCartClick(product, qty, e)}
          className="flex-1 flex items-center justify-center gap-1.5 border-none rounded-full min-w-0"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 1,
            padding: "10px 0",
            cursor: isOutOfStock ? "not-allowed" : "pointer",
            background: isOutOfStock ? "#555" : justAdded ? "#22c55e" : "#111",
            color: isOutOfStock ? "#aaa" : "#FFD700",
            opacity: isOutOfStock ? 0.7 : 1,
            transition: "background 0.3s",
          }}
        >
          <ShoppingCart size={13} />
          {/* {justAdded ? "ADDED" : "ADD"} */}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Skeleton card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ height: 340, background: "#2a2a2a" }}>
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        style={{ width: "100%", height: "100%", background: "linear-gradient(180deg,#333 0%,#222 100%)" }}
      />
    </div>
  );
}

// ─── Main All Products page ────────────────────────────────────────────────
export default function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qtyMap, setQtyMap] = useState({});
  const [addedId, setAddedId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [page, setPage] = useState(1);
  const searchRef = useRef(null);
  const gridTopRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/products/`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.tag?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q)
    );
  }, [products, search]);

  // Reset to page 1 whenever the search results change
  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getQty = (id) => qtyMap[id] || 1;
  const setQty = (id, val) => setQtyMap((m) => ({ ...m, [id]: val }));

  const handleCartClick = async (product, qty, e) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setShowLogin(true);
      return;
    }
    fireCartFly(e);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
    await addToCartAPI(product.id, qty);
  };

  const handleNavigate = (id) => navigate(`/product/${id}`);

  return (
    <div style={{ background: "#F5EFD6", minHeight: "100vh" }}>
      {/* ── Header band ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-5 md:px-10"
        style={{ background: "#FFD700", paddingTop: 67, paddingBottom: 16 }}
      >
        <svg className="absolute top-0 right-0 pointer-events-none opacity-70" width={200} height={120} viewBox="0 0 200 120">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * 180 + 180;
            const r = (a * Math.PI) / 180;
            return (
              <rect
                key={i}
                x={200 + Math.cos(r) * 20}
                y={0 + Math.sin(r) * 20}
                width={i % 2 === 0 ? 10 : 5}
                height={70}
                rx={3}
                fill={i % 2 === 0 ? "#C9920A" : "#E6A800"}
                opacity={0.4}
                transform={`rotate(${a + 90}, ${200 + Math.cos(r) * 20}, ${0 + Math.sin(r) * 20})`}
              />
            );
          })}
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer"
                style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555" }}
              >
                Home
              </span>
              <ChevronRight size={12} color="#888" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#111", fontWeight: 700 }}>
                All Products
              </span>
            </motion.div>

            {/* Heading — short on mobile, full on desktop */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-none m-0"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 5vw, 48px)", color: "#111", letterSpacing: -1.5, marginTop: 6 }}
            >
              <span className="md:hidden">Products</span>
              <span className="hidden md:inline">All Products</span>
            </motion.h1>

            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm"
              style={{ fontFamily: "var(--font-body)", color: "rgba(17,17,17,0.7)", marginTop: 2 }}
            >
              {loading ? "Loading…" : `${filtered.length} snack${filtered.length === 1 ? "" : "s"} to choose from`}
            </motion.p> */}
          </div>

          {/* Search bar — full width on mobile, right-aligned on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 rounded-full px-4 py-2.5 w-full md:w-[300px] flex-shrink-0"
            style={{ background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
          >
            <Search size={16} color="#888" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search makhana, flavours…"
              className="flex-1 border-none outline-none bg-transparent text-sm min-w-0"
              style={{ fontFamily: "var(--font-body)", color: "#111" }}
            />
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearch("")}
                className="border-none bg-transparent cursor-pointer flex items-center justify-center flex-shrink-0"
              >
                <X size={16} color="#888" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Trust bar — matches Cart page, fills the wide desktop header row ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-8 md:gap-16 flex-wrap"
        style={{ background: "#111", padding: "10px 5%" }}
      >
        {[
          { Icon: PackageCheck, label: "100% Natural" },
          { Icon: Truck, label: "Pan-India Delivery" },
          { Icon: ShieldCheck, label: "Secure Checkout" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon size={14} color="#FFD700" strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#fff", fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div ref={gridTopRef} className="products-wrap px-4 md:px-10" style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        {/* Ambient floating shapes — fills empty desktop space, hidden on mobile */}
        <div className="hidden lg:block pointer-events-none" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          {[
            { size: 140, top: "4%", left: "-3%", color: "#FFD700", dur: 9 },
            { size: 90, top: "55%", left: "97%", color: "#E8192C", dur: 11 },
            { size: 60, top: "85%", left: "-2%", color: "#1E5C2A", dur: 7 },
          ].map((s, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
              transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              style={{
                position: "absolute", top: s.top, left: s.left,
                width: s.size, height: s.size, borderRadius: "50%",
                background: s.color, opacity: 0.06,
              }}
            />
          ))}
        </div>

        <div className="products-grid" style={{ position: "relative", zIndex: 1 }}>
          {loading &&
            Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}

          <AnimatePresence mode="popLayout">
            {!loading &&
              paginated.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  qty={getQty(product.id)}
                  onQtyChange={setQty}
                  onCartClick={handleCartClick}
                  onNavigate={handleNavigate}
                  addedId={addedId}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {!loading && filtered.length > PER_PAGE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-8 md:mt-10 flex-wrap"
          >
            <motion.button
              whileHover={page > 1 ? { scale: 1.08 } : {}}
              whileTap={page > 1 ? { scale: 0.92 } : {}}
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="flex items-center justify-center border-none rounded-full cursor-pointer"
              style={{
                width: 36, height: 36,
                background: page === 1 ? "#e0dcc8" : "#111",
                color: page === 1 ? "#aaa" : "#FFD700",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={16} />
            </motion.button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              // Show first, last, current, and neighbours — collapse the rest with "…"
              const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1;
              const prevShown = n > 1 && (n - 1 === 1 || n - 1 === totalPages || Math.abs(n - 1 - page) <= 1);
              if (!show) {
                if (prevShown) {
                  return (
                    <span key={`ellipsis-${n}`} className="text-sm px-1" style={{ fontFamily: "var(--font-body)", color: "#888" }}>
                      …
                    </span>
                  );
                }
                return null;
              }
              return (
                <motion.button
                  key={n}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => goToPage(n)}
                  className="flex items-center justify-center border-none rounded-full cursor-pointer"
                  style={{
                    width: 36, height: 36,
                    fontFamily: "var(--font-heading)", fontSize: 13,
                    background: n === page ? "#E8192C" : "#fff",
                    color: n === page ? "#fff" : "#111",
                    boxShadow: n === page ? "0 4px 14px rgba(232,25,44,0.35)" : "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {n}
                </motion.button>
              );
            })}

            <motion.button
              whileHover={page < totalPages ? { scale: 1.08 } : {}}
              whileTap={page < totalPages ? { scale: 0.92 } : {}}
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="flex items-center justify-center border-none rounded-full cursor-pointer"
              style={{
                width: 36, height: 36,
                background: page === totalPages ? "#e0dcc8" : "#111",
                color: page === totalPages ? "#aaa" : "#FFD700",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-24"
          >
            <p className="font-black text-xl" style={{ fontFamily: "var(--font-heading)", color: "#111" }}>
              No matches for "{search}"
            </p>
            <p className="text-sm mt-2" style={{ fontFamily: "var(--font-body)", color: "rgba(17,17,17,0.6)" }}>
              Try a different flavour or clear your search.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSearch("")}
              className="mt-6 font-black tracking-widest text-white px-8 py-3 rounded-full border-none cursor-pointer"
              style={{ fontFamily: "var(--font-heading)", fontSize: 12, background: "#E8192C", letterSpacing: 1.5 }}
            >
              CLEAR SEARCH
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={() => setShowLogin(false)} />}
      </AnimatePresence>

      <style>{`
        .products-wrap { padding-top: 20px; padding-bottom: 40px; }
        .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media (min-width: 480px) { .products-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
        @media (min-width: 768px) { .products-wrap { padding-top: 32px; padding-bottom: 60px; } .products-grid { grid-template-columns: repeat(4, 1fr); gap: 18px; } }
        @media (min-width: 1024px) { .products-grid { grid-template-columns: repeat(5, 1fr); gap: 20px; } }
        @media (min-width: 1280px) { .products-grid { grid-template-columns: repeat(6, 1fr); gap: 22px; } }
      `}</style>
    </div>
  );
}