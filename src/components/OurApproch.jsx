import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Search, Paintbrush, Code2, FlaskConical, Rocket } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Discovery",
    short: "Understand your vision.",
    desc: "We begin by understanding your goals, audience, and vision - forming a strong foundation for the entire project.",
  },
  {
    num: "02",
    icon: Paintbrush,
    title: "Design",
    short: "Craft the experience.",
    desc: "Our design team crafts user-centric layouts and visual systems that express your brand's voice perfectly.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Development",
    short: "Build with precision.",
    desc: "We bring everything to life using scalable, high-performing technologies and clean coding practices.",
  },
  {
    num: "04",
    icon: FlaskConical,
    title: "Testing",
    short: "Ensure flawless quality.",
    desc: "Rigorous testing ensures flawless performance and a seamless user experience across all devices.",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch",
    short: "Go live with confidence.",
    desc: "We deploy your project with precision, ensuring a smooth launch and ongoing performance monitoring.",
  },
];

/* ─── entrance animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  style: { willChange: "transform, opacity" },
});

export default function OurApproach() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* tokens */
  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const panelBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";
  const activeBg= isDark ? "rgba(104,181,204,0.06)" : "rgba(14,116,144,0.05)";

  const ActiveIcon = STEPS[active].icon;

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
        <div className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p
              {...fadeUp(0)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}
            >
              How We Work
            </motion.p>
            <motion.h2
              {...fadeUp(0.07)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: primary }}
            >
              The Webaurix{" "}
              <span style={{ color: accent }}>way.</span>
            </motion.h2>
          </div>
          <motion.p
            {...fadeUp(0.14)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            className="max-w-[300px] text-[14px] leading-relaxed shrink-0"
            style={{ color: muted }}
          >
            From concept to completion, every step is guided by strategy, creativity, and precision.
          </motion.p>
        </div>

        {/* ── DESKTOP EXPANDING PANELS ── */}
        <motion.div
          {...fadeUp(0.2)}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          className="hidden lg:flex h-[480px] rounded-2xl overflow-hidden gap-[2px]"
          style={{ background: border }}
        >
          {STEPS.map((step, i) => {
            const isActive = active === i;
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="relative overflow-hidden cursor-pointer flex flex-col"
                animate={{ flex: isActive ? 4 : 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: isActive ? activeBg : panelBg,
                  minWidth: 0,
                  willChange: "flex",
                }}
                onHoverStart={() => setActive(i)}
              >
                {/* large watermark number */}
                <motion.span
                  className="absolute bottom-0 right-0 font-black leading-none select-none pointer-events-none"
                  animate={{ opacity: isActive ? 0.07 : 0.04 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontSize: "clamp(80px, 10vw, 140px)",
                    color: accent,
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </motion.span>

                {/* COLLAPSED CONTENT */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-between h-full py-8 px-4 relative z-10"
                    >
                      <span
                        className="text-[10px] font-black tracking-[0.18em]"
                        style={{ color: `${accent}60` }}
                      >
                        {step.num}
                      </span>
                      <span
                        className="text-[12px] font-semibold tracking-wide"
                        style={{
                          color: muted,
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {step.title}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${accent}10`, color: `${accent}60` }}
                      >
                        <StepIcon size={13} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EXPANDED CONTENT */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 z-10 flex flex-col justify-between p-9"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* top */}
                      <div>
                        <div className="flex items-center gap-3 mb-7">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ background: `${accent}18`, color: accent }}
                          >
                            <ActiveIcon size={20} />
                          </div>
                          <span
                            className="text-[10px] font-black tracking-[0.2em] uppercase"
                            style={{ color: `${accent}70` }}
                          >
                            {step.num} - Step
                          </span>
                        </div>

                        <h3
                          className="text-[32px] font-bold tracking-tight mb-4 leading-tight"
                          style={{ color: primary }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-[14.5px] leading-[1.8] max-w-[320px]"
                          style={{ color: muted }}
                        >
                          {step.desc}
                        </p>
                      </div>

                      {/* bottom dots */}
                      <div className="flex gap-1.5">
                        {STEPS.map((_, di) => (
                          <motion.div
                            key={di}
                            className="rounded-full"
                            animate={{
                              width: di === i ? 20 : 5,
                              background: di === i ? accent : `${accent}30`,
                            }}
                            transition={{ duration: 0.35 }}
                            style={{ height: 5 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* right separator */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[1px]"
                    style={{ background: border }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MOBILE ACCORDION ── */}
        <motion.div
          {...fadeUp(0.2)}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          className="lg:hidden flex flex-col gap-3"
        >
          {STEPS.map((step, i) => {
            const isActive = active === i;
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="rounded-2xl cursor-pointer"
                style={{
                  background: isActive ? activeBg : panelBg,
                  border: `1px solid ${isActive ? accent + "30" : border}`,
                  overflow: "hidden",
                }}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18 }}
              >
                {/* header row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive ? `${accent}18` : `${accent}08`,
                      color: isActive ? accent : muted,
                      transition: "background 0.3s, color 0.3s",
                    }}
                  >
                    <StepIcon size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-black tracking-widest"
                        style={{
                          color: isActive ? accent : `${accent}55`,
                          transition: "color 0.3s",
                        }}
                      >
                        {step.num}
                      </span>
                      <span
                        className="text-[15px] font-semibold"
                        style={{
                          color: isActive ? primary : muted,
                          transition: "color 0.3s",
                        }}
                      >
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[12px] mt-0.5" style={{ color: muted }}>
                      {step.short}
                    </p>
                  </div>

                  {/* chevron */}
                  <motion.svg
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ color: isActive ? accent : muted, flexShrink: 0, willChange: "transform" }}
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </div>

                {/* smooth height + fade accordion */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden", willChange: "height, opacity" }}
                    >
                      <div className="px-5 pb-5">
                        <div className="h-px mb-4" style={{ background: `${accent}18` }} />
                        <p
                          className="text-[13.5px] leading-[1.75] pl-[52px]"
                          style={{ color: muted }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── STEP COUNTER (below panels) ── */}
        <motion.div
          {...fadeUp(0.3)}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          className="mt-7 flex items-center justify-between"
        >
          <p className="text-[12px] font-medium" style={{ color: muted }}>
            Step{" "}
            <span style={{ color: primary, fontWeight: 700 }}>{active + 1}</span>
            {" "}of {STEPS.length}
          </p>

          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full cursor-pointer transition-all duration-300"
                style={{
                  width: i === active ? 22 : 6,
                  height: 6,
                  background: i === active ? accent : `${accent}28`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }}
      />
    </section>
  );
}
