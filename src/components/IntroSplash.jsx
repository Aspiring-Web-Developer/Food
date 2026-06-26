
// import { useState, useEffect, useRef } from "react";

// export default function IntroSplash({ onComplete }) {
//   const [visible, setVisible] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);
//   const [ready, setReady] = useState(false); // video buffered enough to play
//   const videoRef = useRef(null);

//   const handleEnd = () => {
//     setFadeOut(true);
//     setTimeout(() => {
//       setVisible(false);
//       onComplete?.();
//     }, 600);
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const tryPlay = () => {
//       setReady(true);
//       video.play().catch(() => handleEnd());
//     };

//     // canplaythrough = enough buffered to play without stopping
//     video.addEventListener("canplaythrough", tryPlay, { once: true });

//     // Fallback: if already ready
//     if (video.readyState >= 4) tryPlay();

//     return () => video.removeEventListener("canplaythrough", tryPlay);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         // Match the video's dark red background — no more black bars
//         backgroundColor: "#8B0000",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         opacity: fadeOut ? 0 : 1,
//         transition: "opacity 0.6s ease",
//       }}
//     >
//       {/* Loading spinner shown until video is ready */}
//       {!ready && (
//         <div
//           style={{
//             position: "absolute",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "16px",
//           }}
//         >
//           <div
//             style={{
//               width: "48px",
//               height: "48px",
//               border: "4px solid rgba(255,200,0,0.3)",
//               borderTop: "4px solid #FFC800",
//               borderRadius: "50%",
//               animation: "spin 0.8s linear infinite",
//             }}
//           />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//         </div>
//       )}

//       <video
//         ref={videoRef}
//         src="/videos/smackoz-intro.mp4"
//         muted
//         playsInline
//         preload="auto"           // start downloading immediately
//         onEnded={handleEnd}
//         style={{
//           // Portrait video: fill the full viewport height
//           height: "100vh",
//           width: "100vw",
//           objectFit: "cover",    // fills screen, crops sides slightly if needed
//           opacity: ready ? 1 : 0,
//           transition: "opacity 0.3s ease",
//         }}
//       />

//       {/* Skip button */}
//       {ready && (
//         <button
//           onClick={handleEnd}
//           style={{
//             position: "absolute",
//             bottom: "32px",
//             right: "24px",
//             background: "rgba(255,255,255,0.15)",
//             color: "#fff",
//             border: "1px solid rgba(255,255,255,0.4)",
//             borderRadius: "999px",
//             padding: "8px 20px",
//             fontSize: "14px",
//             cursor: "pointer",
//             backdropFilter: "blur(6px)",
//             letterSpacing: "0.5px",
//           }}
//         >
//           Skip ▶
//         </button>
//       )}
//     </div>
//   );
// }




















// import { useState, useEffect, useRef } from "react";

// export default function IntroSplash({ onComplete }) {
//   const [visible, setVisible] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);
//   const [ready, setReady] = useState(false);
//   const videoRef = useRef(null);

//   const handleEnd = () => {
//     setFadeOut(true);
//     setTimeout(() => {
//       setVisible(false);
//       onComplete?.();
//     }, 600);
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const tryPlay = () => {
//       setReady(true);
//       video.play().catch(() => handleEnd());
//     };

//     if (video.readyState >= 3) {
//       tryPlay();
//     } else {
//       video.addEventListener("canplay", tryPlay, { once: true });
//     }

//     // Fallback: force close after 8s if still stuck
//     const fallback = setTimeout(() => handleEnd(), 8000);

//     return () => {
//       video.removeEventListener("canplay", tryPlay);
//       clearTimeout(fallback);
//     };
//   }, []);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         backgroundColor: "#680000", // dark red matches video bg
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         opacity: fadeOut ? 0 : 1,
//         transition: "opacity 0.6s ease",
//         overflow: "hidden",
//       }}
//     >
//       {/* Loading spinner */}
//       {!ready && (
//         <div style={{
//           position: "absolute",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "16px",
//           zIndex: 2,
//         }}>
//           <div style={{
//             width: "44px",
//             height: "44px",
//             border: "4px solid rgba(255,200,0,0.25)",
//             borderTop: "4px solid #FFC800",
//             borderRadius: "50%",
//             animation: "spin 0.8s linear infinite",
//           }} />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           <span style={{ color: "#FFC800", fontSize: "13px", letterSpacing: "1px" }}>
//             Loading...
//           </span>
//         </div>
//       )}

//       {/* Video — portrait, natural size, centered, no zoom */}
//       <video
//         ref={videoRef}
//         src="/videos/smackoz-intro.mp4"
//         muted
//         playsInline
//         preload="auto"
//         onEnded={handleEnd}
//         style={{
//           // Natural size: contain keeps aspect ratio, no crop, no zoom
//           height: "100vh",
//           width: "auto",           // auto width = natural portrait ratio
//           maxWidth: "100vw",
//           objectFit: "contain",    // never crops or stretches
//           opacity: ready ? 1 : 0,
//           transition: "opacity 0.3s ease",
//           position: "relative",
//           zIndex: 1,
//         }}
//       />

//       {/* Skip button */}
//       {ready && (
//         <button
//           onClick={handleEnd}
//           style={{
//             position: "absolute",
//             bottom: "28px",
//             right: "20px",
//             background: "rgba(0,0,0,0.45)",
//             color: "#fff",
//             border: "1px solid rgba(255,255,255,0.35)",
//             borderRadius: "999px",
//             padding: "8px 20px",
//             fontSize: "13px",
//             cursor: "pointer",
//             backdropFilter: "blur(8px)",
//             letterSpacing: "0.5px",
//             zIndex: 3,
//           }}
//         >
//           Skip ▶
//         </button>
//       )}
//     </div>
//   );
// }























// import { useState, useEffect, useRef } from "react";

// export default function IntroSplash({ onComplete }) {
//   const [visible, setVisible] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);
//   const [ready, setReady] = useState(false);
//   const videoRef = useRef(null);

//   const handleEnd = () => {
//     setFadeOut(true);
//     setTimeout(() => {
//       setVisible(false);
//       onComplete?.();
//     }, 500);
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const tryPlay = () => {
//       setReady(true);
//       video.play().catch(() => handleEnd());
//     };

//     if (video.readyState >= 1) {
//       tryPlay();
//     } else {
//       video.addEventListener("loadedmetadata", tryPlay, { once: true });
//     }

//     const fallback = setTimeout(() => handleEnd(), 6000);

//     return () => {
//       video.removeEventListener("loadedmetadata", tryPlay);
//       clearTimeout(fallback);
//     };
//   }, []);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 9999,
//         backgroundColor: "#680000",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         opacity: fadeOut ? 0 : 1,
//         transition: "opacity 0.5s ease",
//         overflow: "hidden",
//       }}
//     >
//       {!ready && (
//         <div style={{
//           position: "absolute",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "14px",
//           zIndex: 2,
//         }}>
//           <div style={{
//             width: "44px",
//             height: "44px",
//             border: "4px solid rgba(255,200,0,0.2)",
//             borderTop: "4px solid #FFC800",
//             borderRadius: "50%",
//             animation: "spin 0.75s linear infinite",
//           }} />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           <span style={{ color: "#FFC800", fontSize: "12px", letterSpacing: "1px" }}>
//             Loading...
//           </span>
//         </div>
//       )}

//       <video
//         ref={videoRef}
//         muted
//         playsInline
//         preload="auto"
//         onEnded={handleEnd}
//         style={{
//           height: "100vh",
//           width: "auto",
//           maxWidth: "100vw",
//           objectFit: "contain",
//           opacity: ready ? 1 : 0,
//           transition: "opacity 0.3s ease",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* Cloudinary CDN — fast global delivery */}
//         <source
//           src="https://res.cloudinary.com/dmom3zzx7/video/upload/q_auto/f_auto/v1781717559/Smackoz_intro_nwrikb.mp4"
//           type="video/mp4"
//         />
//       </video>

//       {ready && (
//         <button
//           onClick={handleEnd}
//           style={{
//             position: "absolute",
//             bottom: "28px",
//             right: "20px",
//             background: "rgba(0,0,0,0.45)",
//             color: "#fff",
//             border: "1px solid rgba(255,255,255,0.35)",
//             borderRadius: "999px",
//             padding: "8px 20px",
//             fontSize: "13px",
//             cursor: "pointer",
//             backdropFilter: "blur(8px)",
//             letterSpacing: "0.5px",
//             zIndex: 3,
//           }}
//         >
//           Skip ▶
//         </button>
//       )}
//     </div>
//   );
// }







import { useState, useEffect } from "react";

export default function IntroSplash({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = black screen
  // phase 1 = red bg fades in
  // phase 2 = logo appears with glow
  // phase 3 = tagline appears
  // phase 4 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // red bg
      setTimeout(() => setPhase(2), 600),   // logo
      setTimeout(() => setPhase(3), 1400),  // tagline
      setTimeout(() => setPhase(4), 3000),  // fade out starts
      setTimeout(() => onComplete?.(), 3600), // done
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      backgroundColor: phase >= 1 ? "#680000" : "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: phase === 4
        ? "opacity 0.6s ease, background-color 0.5s ease"
        : "background-color 0.5s ease",
      opacity: phase === 4 ? 0 : 1,
      overflow: "hidden",
    }}>

      {/* Glow behind logo */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,150,0,0.25) 0%, transparent 70%)",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 0.8s ease",
      }} />

      {/* Logo SVG — Smackoz lightning bolt + text */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        filter: phase >= 2 ? "drop-shadow(0 0 18px rgba(255,180,0,0.7))" : "none",
      }}>
        <svg width="220" height="160" viewBox="0 0 220 160">
          {/* Black triangle background shape */}
          <polygon
            points="20,140 90,10 180,140"
            fill="#111"
          />
          {/* Yellow lightning bolt */}
          <polygon
            points="95,20 70,85 100,75 75,145 145,65 110,75 135,20"
            fill="#FFC800"
          />
          {/* SMACKOZ text */}
          <text
            x="110"
            y="155"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="900"
            fontFamily="Arial Black, Arial, sans-serif"
            letterSpacing="3"
          >
            SMACKOZ
          </text>
        </svg>
      </div>

      {/* Tagline */}
      <div style={{
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        color: "#FFC800",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "4px",
        textTransform: "uppercase",
        marginTop: "8px",
        fontFamily: "Arial, sans-serif",
      }}>
        The Taste of Joy
      </div>

    </div>
  );
}