import { motion } from "framer-motion";
import { Share2, Play, Globe, MessageCircle, Camera, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const FOOTER_LINKS = {
  Products: ["Mint & Lime", "Cheese & Herbs", "Munch Masala", "Magic Masala", "All Flavours"],
  Company: ["About Us", "Our Story", "Careers", "Press"],
  Support: ["FAQ", "Shipping", "Returns", "Contact Us"],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { Icon: Share2, href: "#" },
    { Icon: MessageCircle, href: "#" },
    { Icon: Play, href: "#" },
    { Icon: Camera, href: "#" },
  ];

  return (
    <footer id="contact" style={{ background: "#111111"  }}>
      <svg className="w-full block" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60, display: "block", marginBottom: -2 }}>
        <path d="M0,0 Q360,60 720,30 Q1080,0 1440,40 L1440,0 L0,0 Z" fill="#F5EFD6" />
      </svg>

      <div className="px-8 md:px-14 pt-14 pb-10">
        <div className="flex flex-col md:flex-row gap-12 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-[260px]">
            <img src="/Png-01.png" alt="Amachoz" style={{ height: 56, width: "auto", objectFit: "contain" }} />
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)"
 }}>
              Real makhana. Real ingredients. Bold flavours crafted for every occasion.
            </p>
            <div className="flex gap-4 mt-1">
              {socials.map(({ Icon, href }, i) => (
                <motion.a key={i} href={href} whileHover={{ scale: 1.15 }} className="text-white/40 hover:text-[#FFD700] transition-colors cursor-pointer" style={{ display: "flex" }}>
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <p className="text-white font-black text-sm uppercase" style={{  fontFamily: "var(--font-heading)", letterSpacing: 2 }}>{group}</p>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {links.map((l) => (
                  <li key={l}>
                    <motion.a href="#" whileHover={{ x: 4 }}
                      className="text-white/45 text-sm no-underline flex items-center gap-1 hover:text-[#FFD700] transition-colors"
                      style={{ fontFamily: "var(--font-body)"
, textDecoration: "none" }}>
                      <ChevronRight size={11} className="opacity-50" />{l}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-white font-black text-sm uppercase" style={{ fontFamily: "var(--font-heading)", letterSpacing: 2 }}>Contact</p>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Mail, text: "hello@amachoz.com" },
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: MapPin, text: "Mumbai, Maharashtra" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-white/45 text-sm" style={{ fontFamily: "var(--font-body)"
}}>
                  <Icon size={15} style={{ color: "#FFD700", flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs" style={{ fontFamily: "var(--font-body)" }}>© {year} Amachoz Foods. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="text-white/25 hover:text-white/60 text-xs no-underline transition-colors" style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}