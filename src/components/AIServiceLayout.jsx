import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, Check, ChevronRight, Sparkles } from "lucide-react";
import Footer from "./Footer";
import AIScene from "./AIScene";
import { useTheme } from "../context/ThemeContext";

/* ── theme tokens (shared system) ── */
const tk = (isDark, accent) => ({
  bg: isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)",
  P:    isDark ? "#f0eeec"                 : "#0c0c10",
  M:    isDark ? "rgba(240,238,236,0.44)"  : "rgba(12,12,16,0.46)",
  A:    accent,
  Adim: `${accent}1f`,
  Aglow:`${accent}33`,
  Br:   isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.07)",
  Cd:   isDark ? "rgba(255,255,255,0.032)" : "rgba(0,0,0,0.022)",
  Cd2:  isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.038)",
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

const AIServiceLayout = ({ data }) => {
  const { isDark } = useTheme();
  const accent = isDark ? data.accent : data.accentLight || data.accent;
  const t = tk(isDark, accent);

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: t.bg }}>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDesc} />
        {data.keywords && <meta name="keywords" content={data.keywords} />}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="en" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="en-US" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="en-GB" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="en-PK" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="en-KR" href={`https://webaurix.com${data.path}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://webaurix.com${data.path}`} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDesc} />
        <meta property="og:url" content={`https://webaurix.com${data.path}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDesc} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: data.eyebrow,
            name: data.metaTitle,
            description: data.metaDesc,
            url: `https://webaurix.com${data.path}`,
            provider: { "@type": "Organization", name: "Webaurix", url: "https://webaurix.com/" },
            areaServed: [
              { "@type": "Country", name: "Pakistan" },
              { "@type": "Country", name: "South Korea" },
              { "@type": "Country", name: "United States" },
              { "@type": "Country", name: "United Kingdom" },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://webaurix.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://webaurix.com/#services" },
              { "@type": "ListItem", position: 3, name: data.eyebrow, item: `https://webaurix.com${data.path}` },
            ],
          })}
        </script>
      </Helmet>

      {/* ════════════ HERO ════════════ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-16 sm:pb-24 px-5 sm:px-10 lg:px-16 min-h-[88vh] flex items-start lg:items-center">
        {/* radial glow */}
        <div
          className="absolute inset-x-0 top-0 h-[70%] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 55% at 60% 10%, ${accent}1c, transparent)` }}
        />

        <div className="max-w-[1300px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center w-full">
          {/* ── left: copy ── */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: t.Adim, border: `1px solid ${t.Aglow}` }}
            >
              <Sparkles size={13} style={{ color: accent }} />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: accent }}>
                {data.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="text-[30px] sm:text-[48px] lg:text-[58px] font-bold leading-[1.06] tracking-[-0.03em] mb-5"
              style={{ color: t.P }}
            >
              {data.title}{" "}
              <span style={{ color: accent }}>{data.titleHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14px] sm:text-[16.5px] leading-[1.8] max-w-[520px] mb-8"
              style={{ color: t.M }}
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col xs:flex-row sm:flex-row gap-3"
            >
              <Link to="/start-project" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer w-full whitespace-nowrap"
                  style={{ background: accent, color: isDark ? "#0b0b0e" : "#fff", boxShadow: `0 8px 28px ${accent}40` }}
                >
                  <Zap size={14} /> Start a Project
                </motion.span>
              </Link>
              <Link to="/contact" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold cursor-pointer w-full whitespace-nowrap"
                  style={{ border: `1px solid ${t.Br}`, color: t.M, transition: "all 0.18s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.P; e.currentTarget.style.borderColor = `${accent}55`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.M; e.currentTarget.style.borderColor = t.Br; }}
                >
                  Talk to Us <ArrowUpRight size={14} />
                </motion.span>
              </Link>
            </motion.div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="flex flex-wrap gap-x-8 gap-y-4 mt-10"
            >
              {data.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-[22px] sm:text-[26px] font-black leading-none" style={{ color: accent }}>
                    {s.value}
                  </p>
                  <p className="text-[11.5px] font-medium mt-1.5" style={{ color: t.M }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── right: 3D scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 relative h-[300px] sm:h-[400px] lg:h-[520px]"
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, ${accent}22, transparent 65%)` }}
            />
            <AIScene accent={accent} isDark={isDark} variant={data.sceneVariant} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${accent}22,transparent)` }} />
      </section>

      {/* ════════════ CAPABILITIES ════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1300px] mx-auto">
          <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
            What We Build
          </motion.p>
          <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[38px] font-bold leading-[1.12] tracking-tight mb-12 max-w-[640px]" style={{ color: t.P }}>
            {data.capabilitiesHeading}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {data.capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-6 sm:p-7 flex flex-col gap-4 h-full"
                  style={{ background: t.Cd, border: `1px solid ${t.Br}`, transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}38`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 14px 40px ${accent}12`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.Br; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: t.Adim, border: `1px solid ${t.Aglow}` }}>
                    <Icon size={19} style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold mb-2 leading-snug" style={{ color: t.P }}>{c.title}</h3>
                    <p className="text-[13.5px] leading-[1.75]" style={{ color: t.M }}>{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1300px] mx-auto">
          <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
            How We Work
          </motion.p>
          <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[38px] font-bold leading-[1.12] tracking-tight mb-12 max-w-[600px]" style={{ color: t.P }}>
            A clear path from idea to <span style={{ color: accent }}>deployment.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {data.process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative rounded-2xl p-6 sm:p-7 h-full"
                style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
              >
                <span className="text-[40px] font-black leading-none block mb-4" style={{ color: `${accent}22` }}>
                  0{i + 1}
                </span>
                <h3 className="text-[15.5px] font-bold mb-2 leading-snug" style={{ color: t.P }}>{p.title}</h3>
                <p className="text-[13px] leading-[1.7]" style={{ color: t.M }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ USE CASES + TECH ════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-14">
          {/* use cases */}
          <div>
            <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
              Use Cases
            </motion.p>
            <motion.h2 {...fadeUp(0.06)} className="text-[24px] sm:text-[32px] font-bold leading-[1.12] tracking-tight mb-8" style={{ color: t.P }}>
              {data.useCasesHeading}
            </motion.h2>
            <div className="space-y-3">
              {data.useCases.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="flex items-start gap-3.5 p-4 rounded-xl"
                  style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: t.Adim }}>
                    <Check size={13} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold leading-snug" style={{ color: t.P }}>{u.title}</p>
                    {u.desc && <p className="text-[12.5px] mt-1 leading-relaxed" style={{ color: t.M }}>{u.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* tech stack */}
          <div>
            <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
              Tech & Tools
            </motion.p>
            <motion.h2 {...fadeUp(0.06)} className="text-[24px] sm:text-[32px] font-bold leading-[1.12] tracking-tight mb-8" style={{ color: t.P }}>
              Built on a modern <span style={{ color: accent }}>AI stack.</span>
            </motion.h2>
            <div className="flex flex-wrap gap-2.5">
              {data.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="px-4 py-2 rounded-xl text-[12.5px] font-semibold"
                  style={{ background: t.Cd2, border: `1px solid ${t.Br}`, color: t.M }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* mini highlight card */}
            <motion.div
              {...fadeUp(0.1)}
              className="mt-8 rounded-2xl p-6 relative overflow-hidden"
              style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 100% at 100% 0%, ${accent}12, transparent)` }} />
              <p className="text-[13px] font-bold mb-2 relative z-10" style={{ color: accent }}>
                {data.highlight.title}
              </p>
              <p className="text-[13.5px] leading-[1.75] relative z-10" style={{ color: t.M }}>
                {data.highlight.desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-6 sm:px-14 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8"
            style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 55% 90% at 0% 50%, ${accent}12, transparent)` }} />
            <div className="relative z-10 max-w-[560px]">
              <p className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
                Ready to build with AI?
              </p>
              <h2 className="text-[24px] sm:text-[38px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                {data.ctaTitle} <span style={{ color: accent }}>{data.ctaHighlight}</span>
              </h2>
            </div>
            <div className="relative z-10 flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <Link to="/start-project" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer w-full whitespace-nowrap"
                  style={{ background: accent, color: isDark ? "#0b0b0e" : "#fff", boxShadow: `0 6px 24px ${accent}35` }}
                >
                  <Zap size={14} /> Start a Project
                </motion.span>
              </Link>
              <Link to="/book-consultation" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold cursor-pointer w-full whitespace-nowrap"
                  style={{ border: `1px solid ${t.Br}`, color: t.M, transition: "all 0.18s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.P; e.currentTarget.style.borderColor = `${accent}45`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.M; e.currentTarget.style.borderColor = t.Br; }}
                >
                  Book a Call <ChevronRight size={15} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIServiceLayout;
