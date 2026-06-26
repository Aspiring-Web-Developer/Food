// import { motion } from "framer-motion";
// import { Share2, Play, Globe, MessageCircle, Camera, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

// const FOOTER_LINKS = {
//   Products: ["Mint & Lime", "Cheese & Herbs", "Munch Masala", "Magic Masala", "All Flavours"],
//   Company: ["About Us", "Our Story", "Careers", "Press"],
//   Support: ["FAQ", "Shipping", "Returns", "Contact Us"],
// };

// export default function Footer() {
//   const year = new Date().getFullYear();
//   const socials = [
//     { Icon: Share2, href: "#" },
//     { Icon: MessageCircle, href: "#" },
//     { Icon: Play, href: "#" },
//     { Icon: Camera, href: "#" },
//   ];

//   return (
//     <footer id="contact" style={{ background: "#111111"  }}>
//       <svg className="w-full block" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60, display: "block", marginBottom: -2 }}>
//         <path d="M0,0 Q360,60 720,30 Q1080,0 1440,40 L1440,0 L0,0 Z" fill="#F5EFD6" />
//       </svg>

//       <div className="px-8 md:px-14 pt-14 pb-10">
//         <div className="flex flex-col md:flex-row gap-12 justify-between">
//           {/* Brand */}
//           <div className="flex flex-col gap-5 max-w-[260px]">
//             <img src="/Png-01.png" alt="Amachoz" style={{ height: 56, width: "auto", objectFit: "contain" }} />
//             <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)"
//  }}>
//               Real makhana. Real ingredients. Bold flavours crafted for every occasion.
//             </p>
//             <div className="flex gap-4 mt-1">
//               {socials.map(({ Icon, href }, i) => (
//                 <motion.a key={i} href={href} whileHover={{ scale: 1.15 }} className="text-white/40 hover:text-[#FFD700] transition-colors cursor-pointer" style={{ display: "flex" }}>
//                   <Icon size={20} />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Links */}
//           {Object.entries(FOOTER_LINKS).map(([group, links]) => (
//             <div key={group} className="flex flex-col gap-4">
//               <p className="text-white font-black text-sm uppercase" style={{  fontFamily: "var(--font-heading)", letterSpacing: 2 }}>{group}</p>
//               <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
//                 {links.map((l) => (
//                   <li key={l}>
//                     <motion.a href="#" whileHover={{ x: 4 }}
//                       className="text-white/45 text-sm no-underline flex items-center gap-1 hover:text-[#FFD700] transition-colors"
//                       style={{ fontFamily: "var(--font-body)"
// , textDecoration: "none" }}>
//                       <ChevronRight size={11} className="opacity-50" />{l}
//                     </motion.a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Contact */}
//           <div className="flex flex-col gap-4">
//             <p className="text-white font-black text-sm uppercase" style={{ fontFamily: "var(--font-heading)", letterSpacing: 2 }}>Contact</p>
//             <div className="flex flex-col gap-3">
//               {[
//                 { Icon: Mail, text: "adhenfoodsin@gmail.com" },
//                 { Icon: Phone, text: " +91 81489 11559" },
//                 // { Icon: MapPin, text: "Mumbai, Maharashtra" },
//               ].map(({ Icon, text }) => (
//                 <div key={text} className="flex items-center gap-2.5 text-white/45 text-sm" style={{ fontFamily: "var(--font-body)"
// }}>
//                   <Icon size={15} style={{ color: "#FFD700", flexShrink: 0 }} />
//                   {text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
//           <p className="text-white/25 text-xs" style={{ fontFamily: "var(--font-body)" }}>© {year} Smackoz - Powered by Adhen Foods.</p>
//           <div className="flex gap-5">
//             {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
//               <a key={t} href="#" className="text-white/25 hover:text-white/60 text-xs no-underline transition-colors" style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}>{t}</a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }








import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Play, MessageCircle, Camera, Mail, Phone, ChevronRight, ChevronDown } from "lucide-react";

const FOOTER_LINKS = {
  Products: ["Mint & Lime", "Cheese & Herbs", "Munch Masala", "Magic Masala", "All Flavours"],
  Company: ["About Us", "Our Story", "Careers", "Press"],
  Support: ["FAQ", "Shipping", "Returns", "Contact Us"],
};

// Desktop link group — no accordion, plain list
function DesktopGroup({ group, links }) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-white font-black text-sm uppercase"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: 2 }}
      >
        {group}
      </p>
      <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
        {links.map((l) => (
          <li key={l}>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="text-white/45 text-sm no-underline flex items-center gap-1 hover:text-[#FFD700] transition-colors"
              style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}
            >
              <ChevronRight size={11} className="opacity-50" />
              {l}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mobile accordion group — header tappable, content animates open/close
function MobileGroup({ group, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left bg-transparent border-0 cursor-pointer"
        style={{ outline: "none" }}
      >
        <span
          className="text-white font-black text-sm uppercase"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: 2 }}
        >
          {group}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", color: open ? "#FFD700" : "rgba(255,255,255,0.4)" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <ul className="flex flex-col gap-0 list-none p-0 m-0 pb-4">
              {links.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <a
                    href="#"
                    className="text-white/45 text-sm flex items-center gap-1.5 py-2 hover:text-[#FFD700] transition-colors"
                    style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}
                  >
                    <ChevronRight size={11} className="opacity-40" />
                    {l}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { Icon: Share2, href: "#" },
    { Icon: MessageCircle, href: "#" },
    { Icon: Play, href: "#" },
    { Icon: Camera, href: "#" },
  ];

  return (
    <footer id="contact" style={{ background: "#111111" }}>
      {/* Wave divider */}
      <svg
        className="w-full block"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: 60, display: "block", marginBottom: -2 }}
      >
        <path d="M0,0 Q360,60 720,30 Q1080,0 1440,40 L1440,0 L0,0 Z" fill="#F5EFD6" />
      </svg>

      <div className="px-8 md:px-14 pt-14 pb-10">

        {/* ── Top section ── */}
        <div className="flex flex-col md:flex-row gap-12 justify-between">

          {/* Brand block — always visible */}
          <div className="flex flex-col gap-5 max-w-[260px]">
            <img
              src="/Png-01.png"
              alt="Amachoz"
              style={{ height: 56, width: "auto", objectFit: "contain" }}
            />
            <p
              className="text-white/50 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Real makhana. Real ingredients. Bold flavours crafted for every occasion.
            </p>
            <div className="flex gap-4 mt-1">
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.15 }}
                  className="text-white/40 hover:text-[#FFD700] transition-colors cursor-pointer"
                  style={{ display: "flex" }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── DESKTOP: side-by-side columns (hidden on mobile) ── */}
          <div className="hidden md:flex gap-12">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <DesktopGroup key={group} group={group} links={links} />
            ))}
          </div>

          {/* Contact — always visible on desktop */}
          <div className="hidden md:flex flex-col gap-4">
            <p
              className="text-white font-black text-sm uppercase"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: 2 }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Mail, text: "adhenfoodsin@gmail.com" },
                { Icon: Phone, text: "+91 81489 11559" },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-white/45 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Icon size={15} style={{ color: "#FFD700", flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: accordion section (hidden on md+) ── */}
        <div className="md:hidden mt-8 border-t border-white/10">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <MobileGroup key={group} group={group} links={links} />
          ))}

          {/* Contact as accordion too */}
          <MobileGroup
            group="Contact"
            links={["adhenfoodsin@gmail.com", "+91 81489 11559"]}
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-white/25 text-xs"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {year} Smackoz - Powered by Adhen Foods.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-white/25 hover:text-white/60 text-xs no-underline transition-colors"
                style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}