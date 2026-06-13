import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import logoLight from "../assets/logo-light.png";
import logoDark  from "../assets/logo-dark.png";
import logoIcon  from "../assets/logo-icon.png";

const NAV = [
  {
    title: "Services",
    links: [
      { label: "Web Development",   to: "/services/web-development" },
      { label: "Mobile Apps",       to: "/services/app-development" },
      { label: "UI/UX Design",      to: "/services/ui-ux-design" },
      { label: "Custom Software",   to: "/services/custom-software-development" },
      { label: "Digital Marketing", to: "/services/digital-marketing" },
      { label: "Generative AI",     to: "/services/ai/gen-ai" },
      { label: "AI Chatbot",        to: "/services/ai/chatbot" },
    ],
  },
  {
    title: "Consultancy",
    links: [
      { label: "IT Strategy",            to: "/consultancy/it-strategy" },
      { label: "Digital Transformation", to: "/consultancy/digital-transformation" },
      { label: "Cybersecurity",          to: "/consultancy/cybersecurity" },
      { label: "Cloud Consulting",       to: "/consultancy/cloud" },
      { label: "Startup IT",             to: "/consultancy/startup-it" },
      { label: "AI & Data Consulting",   to: "/services/ai-data-consulting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",          to: "/about" },
      { label: "Careers",           to: "/careers" },
      { label: "Case Studies",      to: "/case-studies" },
      { label: "Blog",              to: "/blogs" },
      { label: "FAQs",              to: "/resources/webaurix-faqs" },
      { label: "Contact Us",        to: "/contact" },
      { label: "Book Consultation", to: "/book-consultation" },
    ],
  },
];

const SOCIALS = [
  { icon: FaFacebookF,  href: "https://www.facebook.com/profile.php?id=61579826004264", label: "Facebook" },
  { icon: FaInstagram,  href: "https://www.instagram.com/webaurix.official/",           label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/webnaurix-official/?viewAsMember=true", label: "LinkedIn" },
];

export default function Footer() {
  const { isDark } = useTheme();

  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <footer style={{ background: bg }} className="relative overflow-hidden">

      {/* top accent line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── MAIN ROW ── */}
        <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16"
          style={{ borderBottom: `1px solid ${border}` }}>

          {/* LEFT - brand */}
          <div className="flex flex-col gap-7">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <img src={logoIcon}  alt="" className="h-10 w-auto" />
              <img src={isDark ? logoLight : logoDark} alt="Webaurix" className="h-7 w-auto" />
            </Link>

            <p className="text-[13.5px] leading-[1.8] max-w-[280px]" style={{ color: muted }}>
              A full-service digital studio building web apps, mobile products, and custom software for businesses that want to grow.
            </p>

            {/* newsletter */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: accent }}>
                Stay in the loop
              </p>
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: `1px solid ${border}` }}>
                <input
                  type="email"
                  placeholder="Business email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-[13px] outline-none"
                  style={{ color: primary }}
                  onFocus={(e) => e.currentTarget.parentElement.style.borderColor = `${accent}50`}
                  onBlur={(e)  => e.currentTarget.parentElement.style.borderColor = border}
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2.5 text-[12px] font-semibold cursor-pointer flex-shrink-0 transition-colors duration-200 flex items-center gap-1"
                  style={{ background: accent, color: isDark ? "#0b0b0e" : "#ffffff" }}
                >
                  Subscribe <ArrowUpRight size={11} />
                </motion.button>
              </div>
              <p className="text-[10.5px] leading-relaxed" style={{ color: `${muted}` }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ border: `1px solid ${border}`, color: muted }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.color = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
                >
                  <Icon size={12} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT - nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-6">
            {NAV.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
                  style={{ color: accent }}>
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-[13px] transition-colors duration-150"
                        style={{ color: muted }}
                        onMouseEnter={(e) => e.currentTarget.style.color = primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = muted}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: muted }}>
            © {new Date().getFullYear()} Webaurix. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[{ label: "Privacy Policy", to: "/privacy-policy" }, { label: "Cookie Preferences", to: "/cookie-preferences" }].map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-[12px] transition-colors duration-150"
                style={{ color: muted }}
                onMouseEnter={(e) => e.currentTarget.style.color = primary}
                onMouseLeave={(e) => e.currentTarget.style.color = muted}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
