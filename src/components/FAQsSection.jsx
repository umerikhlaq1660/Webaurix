import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import faqData from "../data/faqData";
import { ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  style: { willChange: "transform, opacity" },
});

export default function FAQsSection() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  /* tokens */
  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const cardBg  = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)";

  const scrollToContact = () =>
    document.getElementById("business-talk")?.scrollIntoView({ behavior: "smooth" });

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-8">
            <div>
              <motion.p
                {...fadeUp(0)}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
                style={{ color: accent }}
              >
                FAQs
              </motion.p>
              <motion.h2
                {...fadeUp(0.07)}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                className="text-[30px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.1] tracking-[-0.02em] mb-5"
                style={{ color: primary }}
              >
                Questions we{" "}
                <span style={{ color: accent }}>answer.</span>
              </motion.h2>
              <motion.p
                {...fadeUp(0.14)}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                className="text-[14px] leading-[1.8]"
                style={{ color: muted }}
              >
                Everything you need to know before getting started. We've compiled answers to help you understand our process and services.
              </motion.p>
            </div>

            {/* still wondering card */}
            <motion.div
              {...fadeUp(0.22)}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              className="rounded-2xl p-7"
              style={{ background: cardBg, border: `1px solid ${border}` }}
            >
              <p
                className="text-[16px] font-bold mb-2"
                style={{ color: primary }}
              >
                Still wondering?
              </p>
              <p
                className="text-[13px] leading-[1.75] mb-5"
                style={{ color: muted }}
              >
                Can't find the answer you're looking for? Reach out and we'll get back to you within 24 hours.
              </p>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer"
                style={{ background: accent, color: isDark ? "#0b0b0e" : "#ffffff" }}
              >
                Get in touch
                <ArrowUpRight size={13} />
              </motion.button>
            </motion.div>
          </div>

          {/* ── RIGHT - ACCORDION ── */}
          <motion.div
            {...fadeUp(0.18)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            className="flex flex-col divide-y"
            style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, divideColor: border }}
          >
            {faqData.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ borderColor: border }}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
                  >
                    <span
                      className="text-[14.5px] sm:text-[15px] font-semibold leading-snug transition-colors duration-200"
                      style={{ color: isOpen ? accent : primary }}
                    >
                      {faq.question}
                    </span>

                    {/* chevron */}
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ color: isOpen ? accent : muted, flexShrink: 0, marginTop: 2, willChange: "transform" }}
                      width="15" height="15" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>

                  {/* smooth height accordion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden", willChange: "height, opacity" }}
                      >
                        <p
                          className="text-[13.5px] leading-[1.8] pb-5 pr-6"
                          style={{ color: muted }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
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
