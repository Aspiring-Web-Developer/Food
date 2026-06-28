// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// const SLIDES = [
//   {
//     bg: "#1E5C2A",
//     burstLight: "#2D7A3A",
//     burstDark: "#144020",
//     label: "MINT & LIME",
//     sub: "REFRESHINGLY BOLD MAKHANA",
//     btnBg: "#FFD700",
//     imgSrc: "/Makan 1.PNG",
//   },
//   {
//     bg: "#B8860B",
//     burstLight: "#D4A017",
//     burstDark: "#8A6008",
//     label: "CHEESE & HERBS",
//     sub: "RICH, CREAMY & IRRESISTIBLE",
//     btnBg: "#E8192C",
//     imgSrc: "/Makan 2.PNG",
//   },
//   {
//     bg: "#1565A8",
//     burstLight: "#1E90B0",
//     burstDark: "#0D4580",
//     label: "MUNCH MASALA",
//     sub: "BOLD INDIAN SPICE BLAST",
//     btnBg: "#FFD700",
//     imgSrc: "/Makan 3.PNG",
//   },
//   {
//     bg: "#6B2490",
//     burstLight: "#8B30B0",
//     burstDark: "#4A1870",
//     label: "MAGIC MASALA",
//     sub: "PURE MAGIC IN EVERY BITE",
//     btnBg: "#FFD700",
//     imgSrc: "/Makan 4.PNG",
//   },
// ];

// // ─── Thin curved burst rays ───────────────────────────────────────────────────
// function BurstRays({ light, dark }) {
//   const count = 22;
//   const cx = 500, cy = 500;
//   const innerR = 70;
//   const outerR = 510;

//   return (
//     <svg
//       viewBox="0 0 1000 1000"
//       xmlns="http://www.w3.org/2000/svg"
//       className="absolute pointer-events-none"
//       style={{
//         width: "220%",
//         height: "220%",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//       }}
//     >
//       {/* Primary curved rays */}
//       {Array.from({ length: count }).map((_, i) => {
//         const angle = (i / count) * 360;
//         const rad = (angle * Math.PI) / 180;
//         const x1 = cx + Math.cos(rad) * innerR;
//         const y1 = cy + Math.sin(rad) * innerR;
//         const x2 = cx + Math.cos(rad) * outerR;
//         const y2 = cy + Math.sin(rad) * outerR;
//         const perpRad = rad + Math.PI / 2;
//         const curveMag = 60 + (i % 4) * 22;
//         const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
//         const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
//         const isAccent = i % 4 === 0;
//         return (
//           <path
//             key={i}
//             d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
//             stroke={i % 2 === 0 ? light : dark}
//             strokeWidth={isAccent ? 2.8 : 1.4}
//             strokeLinecap="round"
//             fill="none"
//             opacity={isAccent ? 0.55 : 0.28}
//           />
//         );
//       })}

//       {/* Secondary finer layer, opposite curve direction */}
//       {Array.from({ length: count }).map((_, i) => {
//         const angle = ((i + 0.5) / count) * 360;
//         const rad = (angle * Math.PI) / 180;
//         const x1 = cx + Math.cos(rad) * (innerR + 30);
//         const y1 = cy + Math.sin(rad) * (innerR + 30);
//         const x2 = cx + Math.cos(rad) * (outerR * 0.75);
//         const y2 = cy + Math.sin(rad) * (outerR * 0.75);
//         const perpRad = rad - Math.PI / 2;
//         const curveMag = 40 + (i % 3) * 18;
//         const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
//         const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
//         return (
//           <path
//             key={`b-${i}`}
//             d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
//             stroke={i % 2 === 0 ? light : dark}
//             strokeWidth={0.9}
//             strokeLinecap="round"
//             fill="none"
//             opacity={0.18}
//           />
//         );
//       })}
//     </svg>
//   );
// }

// export default function Home() {
//   const [current, setCurrent] = useState(0);
//   const containerRef = useRef(null);

//   const { scrollY } = useScroll();

//   // Scroll → rotate the burst slowly
//   const rawRotate = useTransform(scrollY, [0, 900], [0, 40]);
//   const burstRotate = useSpring(rawRotate, { stiffness: 15, damping: 14 });

//   // Scroll → zoom the burst in
//   const rawScale = useTransform(scrollY, [0, 600], [1, 1.3]);
//   const burstScrollScale = useSpring(rawScale, { stiffness: 18, damping: 16 });

//   const slide = SLIDES[current];
//   const changeSlide = (dir) => setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length);

//   useEffect(() => {
//     const t = setInterval(() => changeSlide(1), 5500);
//     return () => clearInterval(t);
//   }, [current]);

//   return (
//     <section
//       id="home"
//       ref={containerRef}
//       className="relative w-full overflow-hidden flex flex-col items-center justify-center"
//       style={{ minHeight: "100vh", backgroundColor: slide.bg, transition: "background-color 0.65s ease" }}
//     >
//       {/* ── Burst rays: ambient pulse zoom-in/out + spin + scroll rotate ── */}
//       <div className="absolute inset-0 overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`burst-${current}`}
//             initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.1 }}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             style={{
//               rotate: burstRotate,      // scroll-driven rotation
//               scale: burstScrollScale,  // scroll-driven zoom
//               width: "100%",
//               height: "100%",
//               position: "absolute",
//               transformOrigin: "center center",
//             }}
//           >
//             {/* Inner wrapper: continuous slow spin + pulse zoom-in/out */}
//             <motion.div
//               style={{ width: "100%", height: "100%", position: "absolute" }}
//               animate={{
//                 rotate: [0, 360],           // full continuous spin
//                 scale: [1, 1.08, 1],        // breathe: zoom in → out → in
//               }}
//               transition={{
//                 rotate: {
//                   duration: 28,             // slow spin — 28s per full rotation
//                   repeat: Infinity,
//                   ease: "linear",
//                 },
//                 scale: {
//                   duration: 5,              // zoom pulse every 5s
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   repeatType: "mirror",
//                 },
//               }}
//             >
//               <BurstRays light={slide.burstLight} dark={slide.burstDark} />
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
// <svg className="absolute bottom-0 left-0 w-full z-10 pointer-events-none" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: 80 }}>
//   <path
//     d="M0,100 L0,52 Q180,22 360,52 Q540,77 720,42 Q900,12 1080,47 Q1260,77 1440,36 L1440,100 Z"
//     fill="rgba(0,0,0,0.5)"
//   />
//   <path d="M0,100 L0,55 Q180,25 360,55 Q540,80 720,45 Q900,15 1080,50 Q1260,80 1440,40 L1440,100 Z" fill="#e6c401"/>
// </svg>

//       {/* Main content */}
//       <div className="relative z-20 flex flex-col items-center gap-6 pt-28 pb-28">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={current}
//             initial={{ opacity: 0, y: 60, scale: 0.86 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -30, scale: 0.94 }}
//             transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
//             className="flex flex-col items-center gap-4"
//           >
//             <img
//               src={slide.imgSrc}
//               alt={slide.label}
//               style={{
//                 height: "clamp(410px, 50vh, 550px)",
//                 width: "auto",
//                 objectFit: "contain",
//                 filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.4))",
//               }}
//             />
//             <div className="text-center mt-1">
//               <p
//                 className="font-black uppercase text-white"
//                 style={{
//                   fontFamily: "var(--font-heading)",
//                   fontSize: "clamp(22px, 4vw, 40px)",
//                   letterSpacing: 1,
//                   textShadow: "0 2px 12px rgba(0,0,0,0.3)",
//                 }}
//               >
//                 {slide.label}
//               </p>
//               <p
//                 className="text-white/70 text-sm tracking-[3px] mt-1 uppercase"
//                 style={{ fontFamily: "var(--font-body)" }}
//               >
//                 {slide.sub}
//               </p>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         <motion.button
//           key={`btn-${current}`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           whileHover={{ scale: 1.06 }}
//           whileTap={{ scale: 0.96 }}
//           onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
//           className="font-black tracking-widest px-12 py-4 rounded-full shadow-2xl border-none cursor-pointer"
//           style={{
//             fontFamily: "var(--font-heading)",
//             fontSize: 15,
//             background: slide.btnBg,
//             color: slide.btnBg === "#FFD700" ? "#111" : "#fff",
//             letterSpacing: 2,
//             boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
//           }}
//         >
//           Discover More
//         </motion.button>
//       </div>

//       {/* Watermark */}
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={`wm-${current}`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.09 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7 }}
//           className="absolute bottom-20 left-6 z-10 font-black leading-none pointer-events-none select-none"
//           style={{
//             fontFamily: "var(--font-heading)",
//             fontSize: "clamp(44px, 10vw, 110px)",
//             color: "#fff",
//             letterSpacing: -4,
//           }}
//         >
//           {slide.label}
//         </motion.p>
//       </AnimatePresence>

//       {/* Arrow buttons */}
//       {[-1, 1].map((dir) => (
//         <motion.button
//           key={dir}
//           whileHover={{ scale: 1.12, backgroundColor: "rgba(232,25,44,1)" }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => changeSlide(dir)}
//           className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center border-none cursor-pointer shadow-2xl"
//           style={{
//             [dir === -1 ? "left" : "right"]: 18,
//             width: 52,
//             height: 52,
//             borderRadius: "50%",
//             background: "rgba(0,0,0,0.72)",
//             color: "#fff",
//             fontSize: 28,
//             fontWeight: 900,
//             transition: "background 0.2s",
//             lineHeight: 1,
//           }}
//         >
//           {dir === -1 ? "‹" : "›"}
//         </motion.button>
//       ))}

//       {/* Dots */}
//       <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//         {SLIDES.map((_, i) => (
//           <motion.button
//             key={i}
//             onClick={() => setCurrent(i)}
//             animate={{ width: i === current ? 28 : 10, opacity: i === current ? 1 : 0.4 }}
//             transition={{ type: "spring", stiffness: 400, damping: 30 }}
//             className="h-2.5 rounded-full bg-white border-none cursor-pointer p-0"
//           />
//         ))}
//       </div>
//     </section>
//   );
// }












import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_API_BASE;

function BurstRays({ light, dark }) {
  const count = 22;
  const cx = 500, cy = 500;
  const innerR = 70;
  const outerR = 510;

  return (
    <svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute pointer-events-none"
      style={{ width: "220%", height: "220%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * innerR;
        const y1 = cy + Math.sin(rad) * innerR;
        const x2 = cx + Math.cos(rad) * outerR;
        const y2 = cy + Math.sin(rad) * outerR;
        const perpRad = rad + Math.PI / 2;
        const curveMag = 60 + (i % 4) * 22;
        const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
        const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
        const isAccent = i % 4 === 0;
        return (
          <path key={i}
            d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
            stroke={i % 2 === 0 ? light : dark}
            strokeWidth={isAccent ? 2.8 : 1.4}
            strokeLinecap="round" fill="none"
            opacity={isAccent ? 0.55 : 0.28}
          />
        );
      })}
      {Array.from({ length: count }).map((_, i) => {
        const angle = ((i + 0.5) / count) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * (innerR + 30);
        const y1 = cy + Math.sin(rad) * (innerR + 30);
        const x2 = cx + Math.cos(rad) * (outerR * 0.75);
        const y2 = cy + Math.sin(rad) * (outerR * 0.75);
        const perpRad = rad - Math.PI / 2;
        const curveMag = 40 + (i % 3) * 18;
        const cpX = (x1 + x2) / 2 + Math.cos(perpRad) * curveMag;
        const cpY = (y1 + y2) / 2 + Math.sin(perpRad) * curveMag;
        return (
          <path key={`b-${i}`}
            d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
            stroke={i % 2 === 0 ? light : dark}
            strokeWidth={0.9} strokeLinecap="round" fill="none" opacity={0.18}
          />
        );
      })}
    </svg>
  );
}

function buildSlides(data) {
  console.log("[buildSlides] raw data sample:", JSON.stringify(data[0], null, 2));
  console.log("[buildSlides] total items from API:", data.length);

  // Dedupe by `id` (not name) — name-based dedup was killing all slides
  const seen = new Set();
  const result = data
    .filter(v => {
      const key = v.id ?? v.name; // use id if available, fall back to name
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(v => ({
      bg:         v.bg         || "#1E5C2A",
      burstLight: v.burstLight || "#2D7A3A",
      burstDark:  v.burstDark  || "#144020",
      label:      (v.name      || v.title || "PRODUCT").toUpperCase(),
      sub:        (v.tagline   || v.subtitle || "DELICIOUS MAKHANA").toUpperCase(),
      btnBg:      v.btnBg      || "#FFD700",
      imgSrc:     v.imgSrc     || v.image || v.image_url || "",
    }));

  console.log("[buildSlides] built slides:", result.length, result.map(s => s.label));
  return result;
}

export default function Home() {
  const [slides, setSlides]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const rawRotate        = useTransform(scrollY, [0, 900], [0, 40]);
  const burstRotate      = useSpring(rawRotate, { stiffness: 15, damping: 14 });
  const rawScale         = useTransform(scrollY, [0, 600], [1, 1.3]);
  const burstScrollScale = useSpring(rawScale, { stiffness: 18, damping: 16 });

  const slidesLenRef = useRef(0);
  slidesLenRef.current = slides.length;

  // changeSlide always reads from ref — zero stale closure risk
  const changeSlide = (dir) => {
    const len = slidesLenRef.current;
    if (len === 0) return;
    setCurrent(c => (c + dir + len) % len);
  };

  // Auto-slide: restarts when current changes (resets timer after manual click)
  useEffect(() => {
    if (slidesLenRef.current <= 1) return;
    const t = setInterval(() => {
      const len = slidesLenRef.current;
      setCurrent(c => (c + 1) % len);
    }, 5500);
    return () => clearInterval(t);
  }, [current]);

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let retryTimer = null;

    const fetchProducts = async (attempt = 1) => {
      try {
        const res = await fetch(`${API}/api/products/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const built = buildSlides(data);
        if (built.length > 0) {
          setSlides(built);
          setLoading(false);
        } else {
          throw new Error("Empty products after dedup");
        }
      } catch (err) {
        if (cancelled) return;
        if (attempt < 5) {
          retryTimer = setTimeout(() => fetchProducts(attempt + 1), attempt * 4000);
        } else {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  if (loading || slides.length === 0) {
    return (
      <section
        className="relative w-full flex flex-col items-center justify-center gap-4"
        style={{ minHeight: "100vh", background: "#1E5C2A" }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }}
        />
        <LoadingHint />
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: "100vh", backgroundColor: slide.bg, transition: "background-color 0.65s ease" }}
    >
      {/* Burst */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`burst-${current}`}
            initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotate: burstRotate, scale: burstScrollScale,
              width: "100%", height: "100%", position: "absolute", transformOrigin: "center center",
            }}
          >
            <motion.div
              style={{ width: "100%", height: "100%", position: "absolute" }}
              animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
              transition={{
                rotate: { duration: 28, repeat: Infinity, ease: "linear" },
                scale:  { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
              }}
            >
              <BurstRays light={slide.burstLight} dark={slide.burstDark} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
        viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: 80 }}
      >
        <path d="M0,100 L0,52 Q180,22 360,52 Q540,77 720,42 Q900,12 1080,47 Q1260,77 1440,36 L1440,100 Z"
          fill="rgba(0,0,0,0.5)" />
        <path d="M0,100 L0,55 Q180,25 360,55 Q540,80 720,45 Q900,15 1080,50 Q1260,80 1440,40 L1440,100 Z"
          fill="#e6c401" />
      </svg>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center gap-6 pt-28 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 60, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.94 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <img
              src={slide.imgSrc}
              alt={slide.label}
              style={{
                height: "clamp(410px, 50vh, 550px)", width: "auto",
                objectFit: "contain", filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.4))",
              }}
            />
            <div className="text-center mt-1">
              <p
                className="font-black uppercase text-white"
                style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(22px, 4vw, 40px)",
                  letterSpacing: 1, textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}
              >
                {slide.label}
              </p>
              <p
                className="text-white/70 text-sm tracking-[3px] mt-1 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {slide.sub}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          key={`btn-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="font-black tracking-widest px-12 py-4 rounded-full shadow-2xl border-none cursor-pointer"
          style={{
            fontFamily: "var(--font-heading)", fontSize: 15,
            background: slide.btnBg, color: slide.btnBg === "#FFD700" ? "#111" : "#fff",
            letterSpacing: 2, boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
          }}
        >
          Discover More
        </motion.button>
      </div>

      {/* Watermark */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`wm-${current}`}
          initial={{ opacity: 0 }} animate={{ opacity: 0.09 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-20 left-6 z-10 font-black leading-none pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(44px, 10vw, 110px)",
            color: "#fff", letterSpacing: -4,
          }}
        >
          {slide.label}
        </motion.p>
      </AnimatePresence>

      {/* Arrows */}
      {[-1, 1].map((dir) => (
        <motion.button
          key={dir}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(232,25,44,1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeSlide(dir)}
          className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center border-none cursor-pointer shadow-2xl"
          style={{
            [dir === -1 ? "left" : "right"]: 18,
            width: 52, height: 52,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.72)",
            color: "#fff",
            fontSize: 28, fontWeight: 900,
            transition: "background 0.2s",
            lineHeight: 1,
            pointerEvents: "all",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",
          }}
        >
          {dir === -1 ? "‹" : "›"}
        </motion.button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: i === current ? 28 : 10, opacity: i === current ? 1 : 0.4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="h-2.5 rounded-full bg-white border-none cursor-pointer p-0"
            style={{ touchAction: "manipulation" }}
          />
        ))}
      </div>
    </section>
  );
}

function LoadingHint() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        color: "rgba(255,255,255,0.5)", fontSize: 13,
        fontFamily: "var(--font-body)", textAlign: "center", marginTop: 8,
      }}
    >
      Server is waking up, hang tight...
    </motion.p>
  );
}