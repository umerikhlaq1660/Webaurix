import React, { useState, useRef } from "react";
import services from "./ServicesData";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ─── stagger helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  style: { willChange: "transform, opacity" },
});

/* ─── single card ─── */
function ServiceCard({ service, index, inView, primary, muted, accent, border, isDark }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const cardBg     = isDark ? "rgba(255,255,255,0.028)" : "rgba(0,0,0,0.022)";
  const cardHoverBg= isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.04)";
  const accentGlow = isDark ? `rgba(104,181,204,0.14)` : `rgba(14,116,144,0.12)`;

  return (
    <motion.div
      {...fadeUp(0.08 + (index % 3) * 0.07 + Math.floor(index / 3) * 0.06)}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
    >
      <Link to={service.link} className="block h-full group" tabIndex={-1}>
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden flex flex-col cursor-pointer"
          style={{
            background: hovered ? cardHoverBg : cardBg,
            border: `1px solid ${hovered ? accent + "40" : border}`,
            boxShadow: hovered
              ? `0 20px 50px -12px ${accentGlow}, 0 0 0 1px ${accent}22`
              : "0 0 0 0 transparent",
            padding: "28px 28px 24px",
            gap: 0,
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            willChange: "transform",
          }}
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {/* large watermark icon */}
          <motion.div
            className="absolute -bottom-3 -right-3 pointer-events-none select-none"
            animate={{ opacity: hovered ? 0.08 : 0.04, scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ color: accent, willChange: "transform, opacity" }}
          >
            <Icon size={110} strokeWidth={1} />
          </motion.div>

          {/* top row: icon + number */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{
                background: hovered ? `${accent}22` : `${accent}10`,
                color: accent,
                willChange: "transform",
                transition: "background 0.28s ease",
              }}
            >
              <Icon size={19} />
            </motion.div>

          </div>

          {/* content */}
          <h3
            className="text-[16.5px] sm:text-[17.5px] font-bold tracking-tight mb-2.5 leading-snug"
            style={{ color: primary }}
          >
            {service.title}
          </h3>
          <p
            className="text-[13px] leading-[1.75] flex-1 mb-6"
            style={{ color: muted }}
          >
            {service.description}
          </p>

          {/* footer link */}
          <div className="flex items-center gap-1.5 mt-auto">
            <span
              className="text-[12px] font-semibold"
              style={{ color: hovered ? accent : `${accent}80`, transition: "color 0.2s ease" }}
            >
              Learn more
            </span>
            <motion.span
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.55 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ color: accent, willChange: "transform, opacity" }}
            >
              <ArrowUpRight size={13} />
            </motion.span>
          </div>

          {/* accent bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              transformOrigin: "center",
              willChange: "transform, opacity",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ════════════════════════════════════
   MAIN
════════════════════════════════════ */
export default function ServicesSection() {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const LIMIT   = 6;
  const visible = showAll ? services : services.slice(0, LIMIT);
  const hidden  = services.length - LIMIT;

  /* tokens - same as hero */
  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <section
      id="services"
      ref={ref}
      style={{ background: bg }}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }}
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── HEADER ── */}
        <div className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p
              {...fadeUp(0)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}
            >
              What We Do
            </motion.p>
            <motion.h2
              {...fadeUp(0.07)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: primary }}
            >
              Services built to{" "}
              <span style={{ color: accent }}>deliver.</span>
            </motion.h2>
          </div>

          <motion.p
            {...fadeUp(0.14)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            className="max-w-[300px] text-[14px] leading-relaxed shrink-0"
            style={{ color: muted }}
          >
            End-to-end digital solutions - from design and development to AI and marketing.
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              inView={inView}
              primary={primary}
              muted={muted}
              accent={accent}
              border={border}
              isDark={isDark}
            />
          ))}
        </div>

        {/* ── HIDDEN CARDS (animated expand) ── */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-5"
            >
              {services.slice(LIMIT).map((service, i) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={LIMIT + i}
                  inView={true}
                  primary={primary}
                  muted={muted}
                  accent={accent}
                  border={border}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOGGLE BUTTON ── */}
        {hidden > 0 && (
          <motion.div
            {...fadeUp(0.45)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            className="mt-10 sm:mt-12 flex justify-center"
          >
            <motion.button
              onClick={() => setShowAll((p) => !p)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer"
              style={{
                border: `1px solid ${border}`,
                color: muted,
                background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
            >
              {showAll ? "Show less" : `View all ${services.length} services`}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform" }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }}
      />
    </section>
  );
}
