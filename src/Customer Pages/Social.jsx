


// import { useRef, useState } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { Share2, Play, Globe, MessageCircle, Camera, Star, X } from "lucide-react";

// const REVIEWS = [
//   {
//     reviewer: "James Mitchell",
//     country: "🇺🇸",
//     location: "New York, USA",
//     flavour: "Mint & Lime",
//     rating: 5,
//     quote: "Never tried makhana before — this thing is ADDICTIVE. Finished the whole bag in one sitting!",
//     duration: "2:34",
//     views: "128K",
//     bg: "#1E5C2A",
//     accent: "#FFD700",
//     textColor: "#fff",
//     rowSpan: 2,
//     imgSrc: "/Makan 1.PNG",
//     tag: "VIRAL REVIEW",
//     youtubeId: "dQw4w9WgXcQ",
//   },
//   {
//     reviewer: "Sophie Beaumont",
//     country: "🇫🇷",
//     location: "Paris, France",
//     flavour: "Cheese & Herbs",
//     rating: 5,
//     quote: "Mon dieu. Better than any French snack I've had.",
//     duration: "1:47",
//     views: "84K",
//     bg: "#B8860B",
//     accent: "#fff",
//     textColor: "#fff",
//     rowSpan: 1,
//     imgSrc: "/Makan 2.PNG",
//     tag: "TRENDING",
//     youtubeId: "9bZkp7q19f0",
//   },
//   {
//     reviewer: "Hiroshi Tanaka",
//     country: "🇯🇵",
//     location: "Tokyo, Japan",
//     flavour: "Magic Masala",
//     rating: 5,
//     quote: "This spice level is no joke. 10/10 would eat again.",
//     duration: "3:12",
//     views: "210K",
//     bg: "#6B2490",
//     accent: "#FFD700",
//     textColor: "#fff",
//     rowSpan: 1,
//     imgSrc: "/Makan 4.PNG",
//     tag: "TOP RATED",
//     youtubeId: "kJQP7kiw5Fk",
//   },
//   {
//     reviewer: "Amara Diallo",
//     country: "🇳🇬",
//     location: "Lagos, Nigeria",
//     flavour: "Munch Masala",
//     rating: 5,
//     quote: "Brought a bag to my office. Now everyone wants one. My colleagues are obsessed.",
//     duration: "4:05",
//     views: "97K",
//     bg: "#1565A8",
//     accent: "#FFD700",
//     textColor: "#fff",
//     rowSpan: 2,
//     imgSrc: "/Makan 3.PNG",
//     tag: "OFFICE REVIEW",
//     youtubeId: "RgKAFK5djSk",
//   },
//   {
//     reviewer: "Lena Müller",
//     country: "🇩🇪",
//     location: "Berlin, Germany",
//     flavour: "Mint & Lime",
//     rating: 4,
//     quote: "Healthier than chips and honestly more tasty.",
//     duration: "2:18",
//     views: "55K",
//     bg: "#E8192C",
//     accent: "#FFD700",
//     textColor: "#fff",
//     rowSpan: 1,
//     imgSrc: "/Makan 1.PNG",
//     tag: "HEALTH PICK",
//     youtubeId: "JGwWNGJdvx8",
//   },
//   {
//     reviewer: "Carlos Vega",
//     country: "🇲🇽",
//     location: "Mexico City",
//     flavour: "Magic Masala",
//     rating: 5,
//     quote: "Spicy? Yes. But the good kind. Like it fights back.",
//     duration: "1:58",
//     views: "143K",
//     bg: "#111111",
//     accent: "#FFD700",
//     textColor: "#fff",
//     rowSpan: 1,
//     imgSrc: "/Makan 4.PNG",
//     tag: "SPICE LOVER",
//     youtubeId: "fRh_vgS2dFE",
//   },
// ];

// function StarRow({ rating, color }) {
//   return (
//     <div style={{ display: "flex", gap: 2 }}>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <Star
//           key={i}
//           size={11}
//           fill={i < rating ? color : "transparent"}
//           color={color}
//           strokeWidth={1.5}
//         />
//       ))}
//     </div>
//   );
// }

// // Full-screen YouTube modal
// function YoutubeModal({ youtubeId, onClose }) {
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         style={{
//           position: "fixed",
//           inset: 0,
//           background: "rgba(0,0,0,0.92)",
//           zIndex: 9999,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "20px",
//         }}
//       >
//         <motion.div
//           initial={{ scale: 0.85, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.85, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 28 }}
//           onClick={(e) => e.stopPropagation()}
//           style={{
//             position: "relative",
//             width: "100%",
//             maxWidth: 860,
//             borderRadius: 16,
//             overflow: "hidden",
//             background: "#000",
//             boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
//           }}
//         >
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             style={{
//               position: "absolute",
//               top: 12,
//               right: 12,
//               zIndex: 10,
//               background: "rgba(0,0,0,0.7)",
//               border: "none",
//               borderRadius: "50%",
//               width: 36,
//               height: 36,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: "#fff",
//             }}
//           >
//             <X size={18} />
//           </button>

//           {/* 16:9 iframe */}
//           <div style={{ position: "relative", paddingTop: "56.25%" }}>
//             <iframe
//               src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
//               title="Review video"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{
//                 position: "absolute",
//                 top: 0, left: 0,
//                 width: "100%",
//                 height: "100%",
//                 border: "none",
//               }}
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function ReviewCard({ review, index, onPlay }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, scale: 0.92, y: 20 }}
//       animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ zIndex: 10, scale: 1.03 }}
//       style={{
//         background: review.bg,
//         gridRow: `span ${review.rowSpan}`,
//         minHeight: review.rowSpan === 2 ? 300 : 145,
//         position: "relative",
//         overflow: "hidden",
//         cursor: "pointer",
//         borderRadius: 2,
//       }}
//       onClick={() => onPlay(review.youtubeId)}
//     >
//       {/* YouTube thumbnail as background */}
//       <img
//         src={`https://img.youtube.com/vi/${review.youtubeId}/mqdefault.jpg`}
//         alt=""
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           opacity: 0.22,
//           pointerEvents: "none",
//         }}
//       />

//       {/* Product image — faded */}
//       <img
//         src={review.imgSrc}
//         alt=""
//         style={{
//           position: "absolute",
//           right: -10, bottom: -10,
//           height: review.rowSpan === 2 ? 160 : 90,
//           width: "auto", objectFit: "contain",
//           opacity: 0.15,
//           transform: "rotate(12deg)",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Top bar — tag + duration */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0,
//         display: "flex", justifyContent: "space-between", alignItems: "center",
//         padding: "8px 10px",
//         background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
//       }}>
//         <span style={{
//           fontFamily: "var(--font-heading)", fontSize: 9, letterSpacing: 1.5,
//           background: review.accent, color: review.accent === "#FFD700" ? "#111" : "#fff",
//           padding: "3px 8px", borderRadius: 4,
//         }}>
//           {review.tag}
//         </span>
//         <span style={{
//           fontFamily: "var(--font-body)", fontSize: 10, color: "#fff",
//           background: "rgba(0,0,0,0.6)", padding: "2px 7px", borderRadius: 4,
//           display: "flex", alignItems: "center", gap: 4,
//         }}>
//           <Play size={8} fill="#fff" color="#fff" />
//           {review.duration}
//         </span>
//       </div>

//       {/* Play button */}
//       <motion.div
//         whileHover={{ scale: 1.12 }}
//         whileTap={{ scale: 0.92 }}
//         style={{
//           position: "absolute",
//           top: "50%", left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: review.rowSpan === 2 ? 52 : 38,
//           height: review.rowSpan === 2 ? 52 : 38,
//           borderRadius: "50%",
//           background: "rgba(255,255,255,0.95)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           zIndex: 10,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         }}
//       >
//         {/* YouTube red play */}
//         <svg width={review.rowSpan === 2 ? 22 : 16} height={review.rowSpan === 2 ? 22 : 16} viewBox="0 0 24 24">
//           <path d="M8 5v14l11-7z" fill="#FF0000" />
//         </svg>
//       </motion.div>

//       {/* Bottom content */}
//       <div style={{
//         position: "absolute", bottom: 0, left: 0, right: 0,
//         padding: review.rowSpan === 2 ? "12px 12px 14px" : "8px 10px 10px",
//         background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
//       }}>
//         {/* Reviewer info */}
//         <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
//           <div style={{
//             width: review.rowSpan === 2 ? 30 : 22,
//             height: review.rowSpan === 2 ? 30 : 22,
//             borderRadius: "50%",
//             background: review.accent,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             flexShrink: 0,
//           }}>
//             <span style={{
//               fontFamily: "var(--font-heading)",
//               fontSize: review.rowSpan === 2 ? 10 : 7,
//               color: review.accent === "#FFD700" ? "#111" : "#fff",
//               fontWeight: 900,
//             }}>
//               {review.reviewer.split(" ").map(w => w[0]).join("")}
//             </span>
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <p style={{
//               fontFamily: "var(--font-heading)",
//               fontSize: review.rowSpan === 2 ? 13 : 10,
//               color: "#fff", margin: 0, lineHeight: 1.1,
//               whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//             }}>
//               {review.country} {review.reviewer}
//             </p>
//             <p style={{
//               fontFamily: "var(--font-body)",
//               fontSize: review.rowSpan === 2 ? 10 : 8,
//               color: "rgba(255,255,255,0.6)", margin: 0,
//             }}>
//               {review.location}
//             </p>
//           </div>
//         </div>

//         <StarRow rating={review.rating} color={review.accent} />

//         {review.rowSpan === 2 && (
//           <p style={{
//             fontFamily: "var(--font-body)", fontSize: 12,
//             color: "rgba(255,255,255,0.88)", margin: "6px 0 8px",
//             lineHeight: 1.4, fontStyle: "italic",
//           }}>
//             "{review.quote}"
//           </p>
//         )}

//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 5 }}>
//           <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(255,255,255,0.55)" }}>
//             {review.views} views
//           </span>
//           <span style={{
//             fontFamily: "var(--font-heading)", fontSize: 8, letterSpacing: 1,
//             background: "rgba(255,255,255,0.15)", color: "#fff",
//             padding: "2px 7px", borderRadius: 20,
//           }}>
//             {review.flavour.toUpperCase()}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function Social() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const [activeVideo, setActiveVideo] = useState(null);

//   const socials = [
//     { Icon: Play,          label: "YouTube",   href: "https://youtube.com" },
//     { Icon: Camera,        label: "Instagram", href: "https://instagram.com" },
//     { Icon: MessageCircle, label: "TikTok",    href: "https://tiktok.com" },
//     { Icon: Share2,        label: "Twitter",   href: "https://twitter.com" },
//     { Icon: Globe,         label: "Website",   href: "#" },
//   ];

//   return (
//     <section id="social" className="py-14 px-6 md:px-10" style={{ background: "#F5EFD6" }}>

//       {/* YouTube Modal */}
//       {activeVideo && (
//         <YoutubeModal
//           youtubeId={activeVideo}
//           onClose={() => setActiveVideo(null)}
//         />
//       )}

//       {/* Header */}
//       <div ref={ref} className="flex items-end justify-between mb-8 gap-4 flex-wrap">
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.55 }}
//         >
//           <h2
//             className="font-black leading-none m-0"
//             style={{
//               fontFamily: "var(--font-heading)",
//               fontSize: "clamp(40px, 7vw, 88px)",
//               color: "#111", letterSpacing: -2,
//             }}
//           >
//             Reviews
//           </h2>
//           <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#888", margin: "4px 0 0" }}>
//             Real people. Real reactions. From around the world.
//           </p>
//         </motion.div>

//         {/* Social pill buttons */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.55, delay: 0.12 }}
//           className="flex gap-2.5 flex-wrap justify-end"
//         >
//           {socials.map(({ Icon, label, href }) => (
//             <motion.a
//               key={label}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.1, y: -2, background: "#E8192C" }}
//               className="flex items-center gap-1.5 text-white no-underline px-4 py-2 rounded-full font-black text-xs cursor-pointer"
//               style={{
//                 fontFamily: "var(--font-heading)",
//                 background: "#111",
//                 letterSpacing: 1,
//                 textDecoration: "none",
//                 transition: "background 0.2s",
//               }}
//             >
//               <Icon size={13} />
//               <span style={{ fontSize: 10 }}>{label}</span>
//             </motion.a>
//           ))}
//         </motion.div>
//       </div>

//       {/* Review grid */}
//       <div
//         className="grid gap-1.5"
//         style={{ gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "145px" }}
//       >
//         {REVIEWS.map((review, i) => (
//           <ReviewCard
//             key={i}
//             review={review}
//             index={i}
//             onPlay={(id) => setActiveVideo(id)}
//           />
//         ))}
//       </div>

//       {/* Bottom CTA */}
//       <div className="flex justify-center mt-10 gap-4 flex-wrap">
//         <motion.a
//           href="https://www.youtube.com/@amachoz"
//           target="_blank"
//           rel="noopener noreferrer"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           className="font-black tracking-widest text-[#FFD700] px-10 py-3.5 rounded-full border-none cursor-pointer"
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 13,
//             background: "#111", letterSpacing: 2,
//             textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
//           }}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000">
//             <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
//           </svg>
//           WATCH ALL REVIEWS
//         </motion.a>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           className="font-black tracking-widest px-10 py-3.5 rounded-full cursor-pointer"
//           style={{
//             fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: 2,
//             background: "transparent", color: "#111",
//             border: "2px solid #111",
//           }}
//         >
//           SUBMIT YOUR REVIEW
//         </motion.button>
//       </div>
//     </section>
//   );
// }












import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const POSTS = [
  { id: "DZhDmwGupOz", permalink: "https://www.instagram.com/reel/DZhDmwGupOz/" },
  { id: "DZwb_hkOtBZ", permalink: "https://www.instagram.com/reel/DZwb_hkOtBZ/" },
  { id: "DYo8TzFOh0p", permalink: "https://www.instagram.com/reel/DYo8TzFOh0p/" },
  { id: "DYW09S7OSFv", permalink: "https://www.instagram.com/reel/DYW09S7OSFv/" },
  { id: "DXO4U2fDh-h", permalink: "https://www.instagram.com/reel/DXO4U2fDh-h/" },
  { id: "DV0rYmYDsLQ", permalink: "https://www.instagram.com/reel/DV0rYmYDsLQ/" },
  { id: "DUIlceejk-E", permalink: "https://www.instagram.com/reel/DUIlceejk-E/" },
  { id: "DUaks5ADj1v", permalink: "https://www.instagram.com/reel/DUaks5ADj1v/" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    color: "#1877F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    color: "#000",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    color: "#FF0000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
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