import React, { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const STATS = [
  { value: 50,  suffix: "+",   label: "Projects Delivered",     sub: "across web, mobile & AI" },
  { value: 98,  suffix: "%",   label: "Client Satisfaction",    sub: "based on project reviews" },
  { value: 200, suffix: "%",   label: "Avg. Growth Increase",   sub: "in traffic & conversions" },
  { value: 24,  suffix: "hrs", label: "Response Time",          sub: "guaranteed on every query" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  style: { willChange: "transform, opacity" },
});

export default function StatsSection() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <section
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
        <div className="mb-16 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p
              {...fadeUp(0)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}
            >
              By the Numbers
            </motion.p>
            <motion.h2
              {...fadeUp(0.07)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: primary }}
            >
              Performance that{" "}
              <span style={{ color: accent }}>speaks.</span>
            </motion.h2>
          </div>
          <motion.p
            {...fadeUp(0.14)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            className="max-w-[300px] text-[14px] leading-relaxed shrink-0"
            style={{ color: muted }}
          >
            Numbers that define our commitment - measurable, meaningful, and driven by results.
          </motion.p>
        </div>

        {/* ── STATS GRID ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${border}` }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(0.1 + i * 0.08)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="relative flex flex-col justify-between p-7 sm:p-9 group"
              style={{
                borderRight: i < STATS.length - 1 ? `1px solid ${border}` : "none",
                borderBottom: "none",
              }}
            >
              {/* separator for mobile 2-col grid */}
              {i === 2 && (
                <div
                  className="lg:hidden absolute top-0 left-0 right-0 h-px"
                  style={{ background: border }}
                />
              )}
              {i === 3 && (
                <div
                  className="lg:hidden absolute top-0 left-0 right-0 h-px"
                  style={{ background: border }}
                />
              )}

              {/* accent line top - animates in on hover */}
              <motion.div
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: accent,
                  transformOrigin: "left",
                  willChange: "transform, opacity",
                }}
              />

              {/* large number */}
              <div className="mb-4">
                <p
                  className="text-[42px] sm:text-[52px] lg:text-[58px] font-black leading-none tracking-tight tabular-nums"
                  style={{ color: accent }}
                >
                  {inView ? (
                    <CountUp end={stat.value} duration={2.2} delay={0.1 + i * 0.15} />
                  ) : (
                    0
                  )}
                  <span className="text-[0.65em]">{stat.suffix}</span>
                </p>
              </div>

              {/* label + sub */}
              <div>
                <p
                  className="text-[14px] sm:text-[15px] font-semibold leading-snug mb-1"
                  style={{ color: primary }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-[11.5px] leading-relaxed"
                  style={{ color: muted }}
                >
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }}
      />
    </section>
  );
}
