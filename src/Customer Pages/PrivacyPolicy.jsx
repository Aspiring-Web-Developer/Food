import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Shield } from "lucide-react";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as your name, email address, phone number, delivery address, and payment details when you place an order. We also collect basic usage data to improve our website experience.",
  },
  {
    title: "How We Use Your Information",
    content: "Your information is used to process orders, deliver products, communicate order updates, respond to support requests, and improve our products and services. We never sell your personal data to third parties.",
  },
  {
    title: "Payment Information",
    content: "All payments are processed securely through Razorpay. We do not store your card, UPI, or banking details on our servers. Razorpay is PCI DSS compliant and handles all sensitive payment data.",
  },
  {
    title: "Data Sharing",
    content: "We only share your information with trusted third parties necessary to fulfil your order — such as delivery partners and payment processors. These partners are obligated to keep your data secure.",
  },
  {
    title: "Cookies & Tracking",
    content: "We use cookies to keep you logged in, remember your cart, and understand how our website is used. You can disable cookies in your browser, though some features may not work as intended.",
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures including SSL encryption to protect your personal information from unauthorized access, alteration, or disclosure.",
  },
  {
    title: "Your Rights",
    content: "You may request access to, correction of, or deletion of your personal data at any time by contacting us at adhenfoodsin@gmail.com.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
  },
];

export default function PrivacyPolicy() {
  const navigate    = useNavigate();
  const titleRef     = useRef(null);
  const titleInView  = useInView(titleRef, { once: true });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ minHeight: "100vh", background: "#F5EFD6", paddingBottom: 60 }}>

      {/* ── Yellow header band ── */}
      <div ref={titleRef}
        style={{ background: "#FFD700", padding: "54px 5% 24px",
          position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}
          width={200} height={120} viewBox="0 0 200 120">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * 180 + 180;
            const r = (a * Math.PI) / 180;
            return (
              <rect key={i} x={200 + Math.cos(r) * 20} y={0 + Math.sin(r) * 20}
                width={i % 2 === 0 ? 10 : 5} height={70} rx={3}
                fill={i % 2 === 0 ? "#C9920A" : "#E6A800"} opacity={0.4}
                transform={`rotate(${a + 90}, ${200 + Math.cos(r) * 20}, ${0 + Math.sin(r) * 20})`} />
            );
          })}
        </svg>
        <motion.div initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(38px, 5vw, 48px)",
            color: "#111", margin: 0, letterSpacing: -2, lineHeight: 1 }}>Privacy Policy</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span onClick={() => navigate("/")}
            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", cursor: "pointer" }}>
            Home
          </span>
          <ChevronRight size={13} color="#888" />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#111", fontWeight: 700 }}>
            Privacy Policy
          </span>
        </motion.div>
      </div>

      {/* ── Black perk strip ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ display: "flex", justifyContent: "center", gap: "5%",
          background: "#111", padding: "12px 5%", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Shield size={15} color="#FFD700" strokeWidth={2} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 600 }}>
            Your data, protected
          </span>
        </div>
      </motion.div>

      {/* ── Content card ── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "36px 5% 0" }}>
        <motion.div style={{ background: "#fff", borderRadius: 16,
          overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

          <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#888", margin: 0 }}>
              Last updated: January 2026
            </p>
          </div>

          {SECTIONS.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ padding: "20px 24px", borderBottom: i < SECTIONS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "#111", margin: "0 0 8px" }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", margin: 0, lineHeight: 1.7 }}>
                {s.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          style={{ marginTop: 24, width: "100%", fontFamily: "var(--font-heading)", fontSize: 14,
            letterSpacing: 2, background: "#E8192C", color: "#fff",
            border: "none", borderRadius: 50, padding: "16px 0", cursor: "pointer",
            boxShadow: "0 6px 24px rgba(232,25,44,0.28)" }}>
          BACK TO HOME
        </motion.button>
      </div>
    </motion.div>
  );
}