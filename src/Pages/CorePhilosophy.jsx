import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Lightbulb, Users, RefreshCw, Eye, Star, ArrowRight } from "lucide-react";
import Seo from "../components/Seo";

const CARDS = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Innovation First",
    short: "Pushing boundaries every day.",
    desc: "We push the boundaries of technology to create solutions that are both creative and practical - combining bold ideas with cutting-edge tools to deliver work that truly stands out.",
  },
  {
    num: "02",
    icon: Users,
    title: "Client Centric",
    short: "Your success is our success.",
    desc: "Every solution is tailored to our clients' goals through open communication, measurable results, and long-term trust. We don't just build - we partner.",
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Adaptability",
    short: "Change is our superpower.",
    desc: "We embrace change as a chance for growth, staying flexible to meet new challenges and ensuring our solutions remain relevant, creative, and future-ready.",
  },
  {
    num: "04",
    icon: Eye,
    title: "Transparency",
    short: "No surprises. Only results.",
    desc: "From kickoff to launch, we communicate openly - keeping you informed and involved at every step so decisions are made together, not in the dark.",
  },
  {
    num: "05",
    icon: Star,
    title: "Excellence",
    short: "Details make the difference.",
    desc: "We pursue excellence by focusing on creativity, precision, and quality. Every detail is refined to consistently exceed expectations and deliver real impact.",
  },
];

const AUTO_MS = 4500;

/* animated progress bar - scaleX instead of width (no layout trigger) */
const ProgBar = ({ accent, triggerKey }) => (
  <motion.div
    key={triggerKey}
    className="h-full w-full rounded-full"
    style={{ backgroundColor: accent, transformOrigin: "left", willChange: "transform" }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
  />
);

export default function CorePhilosophy({ standalone = false }) {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  const [progKey, setProgKey] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % CARDS.length);
      setProgKey((k) => k + 1);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, []);

  const select = (i) => { setActive(i); setProgKey((k) => k + 1); };

  /* tokens */
  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const panelBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";

  const up = (d = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay: d, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    style: { willChange: "transform, opacity" },
  });

  const Icon = CARDS[active].icon;

  return (
    <section ref={ref} style={{ background: bg }} className="relative overflow-hidden py-20 sm:py-28">

      {standalone && (
        <Seo
          title="Our Core Values & Philosophy | How Webaurix Works"
          description="The principles behind Webaurix: innovation, client-centric delivery, adaptability, transparency, and excellence in web development, mobile apps, and AI projects."
          keywords="Webaurix values, how we work, web development agency philosophy, client-centric digital agency, transparent software development"
          path="/core"
        />
      )}

      {/* top line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="mb-14 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p {...up(0)}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}>
              Our Principles
            </motion.p>
            <motion.h2 {...up(0.08)}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: primary }}>
              The values that{" "}
              <span style={{ color: accent }}>drive us.</span>
            </motion.h2>
          </div>
          <motion.p {...up(0.15)}
            className="max-w-[320px] text-[14px] leading-relaxed shrink-0"
            style={{ color: muted }}>
            The foundation behind our creativity, collaboration, and commitment to excellence.
          </motion.p>
        </div>

        {/* SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-start">

          {/* LEFT - list */}
          <motion.div {...up(0.2)} className="flex flex-col gap-1">
            {CARDS.map((card, i) => {
              const isActive = active === i;
              const CardIcon = card.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => select(i)}
                  className="relative text-left rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  style={{
                    padding: "16px 20px",
                    background: isActive ? panelBg : "transparent",
                    border: `1px solid ${isActive ? border : "transparent"}`,
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* progress bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden"
                      style={{ background: `${accent}22` }}>
                      <ProgBar accent={accent} triggerKey={`${progKey}-${i}`} />
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {/* icon box */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isActive ? `${accent}18` : `${accent}08`,
                        color: isActive ? accent : muted,
                      }}>
                      <CardIcon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest tabular-nums"
                          style={{ color: isActive ? accent : `${accent}55` }}>
                          {card.num}
                        </span>
                        <span className="text-[14.5px] sm:text-[15px] font-semibold transition-colors duration-200"
                          style={{ color: isActive ? primary : muted }}>
                          {card.title}
                        </span>
                      </div>
                      {!isActive && (
                        <p className="text-[12px] mt-0.5 truncate" style={{ color: `${muted}` }}>
                          {card.short}
                        </p>
                      )}
                    </div>

                    <motion.span
                      animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: accent }}
                      className="flex-shrink-0"
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </div>

                  {/* mobile expand - opacity+y only, no height animation */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:hidden text-[13px] leading-relaxed pl-[52px] mt-3"
                        style={{ color: muted, willChange: "transform, opacity" }}
                      >
                        {card.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT - detail panel (desktop) */}
          <motion.div {...up(0.28)} className="hidden lg:block sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="rounded-3xl p-10 relative overflow-hidden"
                style={{ background: panelBg, border: `1px solid ${border}` }}
              >
                {/* large faded number bg */}
                <span
                  className="absolute -top-4 -right-2 font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(100px, 14vw, 160px)",
                    color: `${accent}09`,
                    lineHeight: 1,
                  }}
                >
                  {CARDS[active].num}
                </span>

                {/* icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 22 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  <Icon size={26} />
                </motion.div>

                {/* content */}
                <p className="text-[11px] font-black tracking-[0.2em] uppercase mb-3"
                  style={{ color: `${accent}80` }}>
                  {CARDS[active].num} - Principle
                </p>

                <h3 className="text-[28px] lg:text-[32px] font-bold tracking-tight mb-4"
                  style={{ color: primary }}>
                  {CARDS[active].title}
                </h3>

                <p className="text-[15px] leading-[1.8]"
                  style={{ color: muted, minHeight: "7rem" }}>
                  {CARDS[active].desc}
                </p>

                {/* decorative line */}
                <div className="mt-10 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />

                {/* dots */}
                <div className="flex gap-2 mt-6">
                  {CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => select(i)}
                      className="rounded-full cursor-pointer transition-all duration-300"
                      style={{
                        width: i === active ? 22 : 6,
                        height: 6,
                        background: i === active ? accent : `${accent}30`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }} />
    </section>
  );
}
