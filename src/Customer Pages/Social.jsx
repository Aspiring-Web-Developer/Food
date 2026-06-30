
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const POSTS = [
  { id: "DZhDmwGupOz", permalink: "https://www.instagram.com/reel/DZhDmwGupOz/" },
  { id: "DZwb_hkOtBZ", permalink: "https://www.instagram.com/reel/DZwb_hkOtBZ/" },
  { id: "DYo8TzFOh0p", permalink: "https://www.instagram.com/reel/DYo8TzFOh0p/" },
  { id: "DYW09S7OSFv", permalink: "https://www.instagram.com/reel/DYW09S7OSFv/" },
  // { id: "DXO4U2fDh-h", permalink: "https://www.instagram.com/reel/DXO4U2fDh-h/" },
  // { id: "DV0rYmYDsLQ", permalink: "https://www.instagram.com/reel/DV0rYmYDsLQ/" },
  // { id: "DUIlceejk-E", permalink: "https://www.instagram.com/reel/DUIlceejk-E/" },
  // { id: "DUaks5ADj1v", permalink: "https://www.instagram.com/reel/DUaks5ADj1v/" },
];

const SOCIAL_LINKS = [


  {
    label: "Instagram",
    href: "https://www.instagram.com/reel/DZhDmwGupOz/?igsh=MTk1Z3Vud2d3OXNyNQ%3D%3D",
    color: "#E1306C",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

// Instagram brand gradient colors for placeholder tiles
const IG_GRADIENTS = [
  ["#f09433", "#e6683c", "#dc2743", "#cc2366", "#bc1888"],
  ["#405de6", "#5851db", "#833ab4", "#c13584", "#e1306c"],
  ["#833ab4", "#fd1d1d", "#fcb045"],
  ["#e1306c", "#c13584", "#833ab4", "#405de6"],
  ["#fcb045", "#fd1d1d", "#e1306c"],
  ["#405de6", "#833ab4", "#c13584", "#e1306c", "#f56040"],
  ["#f56040", "#f77737", "#fcb045"],
  ["#e1306c", "#fd1d1d", "#fcb045"],
];

// Responsive grid columns via JS-driven CSS
const GRID_STYLE = `
  .ig-grid {
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    .ig-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .ig-grid {
      grid-template-columns: 1fr;
    }
  }
  .ig-header {
    padding: 0 48px;
  }
  @media (max-width: 768px) {
    .ig-header {
      padding: 0 20px;
      flex-direction: column;
      align-items: flex-start !important;
    }
    .ig-title {
      font-size: 52px !important;
    }
  }
  @media (max-width: 480px) {
    .ig-header {
      padding: 0 16px;
    }
    .ig-title {
      font-size: 40px !important;
    }
  }
`;

// Gradient placeholder thumbnail — no CORS issues, works everywhere
function IgThumb({ postId, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);

  const colors = IG_GRADIENTS[index % IG_GRADIENTS.length];
  const gradientId = `ig-grad-${index}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      whileHover={{ scale: 1.02, zIndex: 5 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "1 / 1",
        background: "#111",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
          opacity: hovered ? 0.85 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Dark overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Post number label (subtle) */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 12,
          color: "rgba(255,255,255,0.6)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1,
          fontFamily: "monospace",
        }}
      >
        #{String(index + 1).padStart(2, "0")}
      </div>

      {/* Play button center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </div>

      {/* Instagram icon — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          background: "rgba(0,0,0,0.45)",
          borderRadius: 6,
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span style={{ color: "white", fontSize: 10, fontWeight: 600 }}>Reel</span>
      </div>
    </motion.div>
  );
}

// Modal with real Instagram embed
function IgModal({ postIndex, posts, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(postIndex);
  const embedRef = useRef(null);
  const post = posts[currentIndex];

  useEffect(() => {
    if (!embedRef.current) return;
    embedRef.current.innerHTML = `
      <blockquote
        class="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink="${post.permalink}?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version="14"
        style="background:#FFF;border:0;border-radius:3px;margin:0;max-width:100%;min-width:300px;padding:0;width:100%;"
      ></blockquote>
    `;
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [currentIndex, post.permalink]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % posts.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + posts.length) % posts.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const goNext = (e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % posts.length); };
  const goPrev = (e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + posts.length) % posts.length); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Prev */}
      <button
        onClick={goPrev}
        style={{
          position: "fixed",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10001,
          background: "rgba(255,255,255,0.12)",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Modal box */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "auto",
          maxHeight: "90vh",
          width: "100%",
          maxWidth: 540,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Counter pill */}
        <div style={{
          position: "sticky",
          top: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
          zIndex: 10,
        }}>
          <span style={{
            background: "rgba(0,0,0,0.07)",
            borderRadius: 20,
            padding: "4px 10px",
            fontSize: 12,
            color: "#555",
            fontWeight: 600,
          }}>
            {currentIndex + 1} / {posts.length}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#111",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div ref={embedRef} style={{ padding: "4px 0 0", clear: "both" }} />
      </motion.div>

      {/* Next */}
      <button
        onClick={goNext}
        style={{
          position: "fixed",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10001,
          background: "rgba(255,255,255,0.12)",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
        }}
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
}

export default function Social() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      id="social"
      style={{
        background: "#F5EFD6",
        padding: "60px 0 80px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Inject responsive CSS */}
      <style>{GRID_STYLE}</style>

      {/* Header */}
      <div
        ref={headerRef}
        className="ig-header"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <motion.h2
          className="ig-title"
          initial={{ opacity: 0, x: -40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(40px, 8vw, 100px)",
            fontWeight: 900,
            color: "#111",
            letterSpacing: -3,
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          Get Social
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}
        >
          {SOCIAL_LINKS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.93 }}
              title={s.label}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: s.color,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 12px rgba(0,0,0,0.18)",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Responsive Grid */}
      <div className="ig-grid">
        {POSTS.map((post, i) => (
          <IgThumb
            key={post.id}
            postId={post.id}
            index={i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <IgModal
            postIndex={activeIndex}
            posts={POSTS}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}