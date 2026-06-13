import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Zap, X, Clock, Calendar, Tag, ChevronRight, TrendingUp, Loader2, Layers,
} from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

/* ── theme tokens ── */
const tk = (isDark) => ({
  bg: isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)",
  P: isDark ? "#f0eeec" : "#0c0c10",
  M: isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)",
  A: isDark ? "#68b5cc" : "#0e7490",
  Br: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
  Cd: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

/* ══════════════════════════════════
   CASE STUDY DETAIL MODAL
══════════════════════════════════ */
const DetailModal = ({ study, onClose, isDark, t }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.22 }}
    className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-5"
    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 36 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full sm:max-w-[700px] max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-3xl flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        background: isDark ? "#07101a" : "#ffffff",
        border: `1px solid ${t.Br}`,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* modal header */}
      <div
        className="flex items-start justify-between px-6 sm:px-8 pt-7 pb-5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${t.Br}` }}
      >
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="px-2.5 py-[3px] rounded-full text-[10.5px] font-bold tracking-wide"
              style={{ background: `${study.accentColor}18`, color: study.accentColor }}
            >
              {study.industry}
            </span>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.M }}>
              <Calendar size={11} /> {study.year}
            </div>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.M }}>
              <Clock size={11} /> {study.duration}
            </div>
          </div>
          <h2 className="text-[20px] sm:text-[24px] font-bold leading-snug tracking-tight" style={{ color: t.P }}>
            {study.client}
          </h2>
          <p className="text-[13px] mt-1 leading-relaxed" style={{ color: t.M }}>
            {study.headline}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 mt-0.5"
          style={{ background: t.Cd, color: t.M, border: `1px solid ${t.Br}` }}
        >
          <X size={15} />
        </motion.button>
      </div>

      <div className="px-6 sm:px-8 py-7 space-y-8">
        {/* results grid */}
        <div>
          <p
            className="text-[10.5px] font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: study.accentColor }}
          >
            Results
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {study.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07 }}
                className="rounded-2xl p-3 sm:p-4 flex flex-col gap-1 min-w-0 overflow-hidden"
                style={{ background: `${study.accentColor}0d`, border: `1px solid ${study.accentColor}22` }}
              >
                <span
                  className="font-black leading-none tracking-tight break-all"
                  style={{
                    color: study.accentColor,
                    fontSize: "clamp(13px, 3.8vw, 20px)",
                  }}
                >
                  {r.metric}
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-semibold leading-snug" style={{ color: t.M }}>
                  {r.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* challenge */}
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: t.M }}>
            The Challenge
          </p>
          <p className="text-[14px] leading-[1.82]" style={{ color: t.M }}>
            {study.challenge}
          </p>
        </div>

        {/* solution */}
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: t.M }}>
            Our Solution
          </p>
          <p className="text-[14px] leading-[1.82]" style={{ color: t.M }}>
            {study.solution}
          </p>
        </div>

        {/* services */}
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: t.M }}>
            Services Delivered
          </p>
          <div className="flex flex-wrap gap-2">
            {study.services.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
                style={{ background: t.Cd, border: `1px solid ${t.Br}`, color: t.P }}
              >
                <Tag size={10} style={{ color: t.A }} /> {s}
              </span>
            ))}
          </div>
        </div>

        {/* cta */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
        >
          <p className="text-[14px] font-semibold" style={{ color: t.P }}>
            Want results like these for your business?
          </p>
          <Link to="/start-project" onClick={onClose}>
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer whitespace-nowrap"
              style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}
            >
              <Zap size={13} /> Start a Project
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ══════════════════════════════════
   CASE STUDY CARD
══════════════════════════════════ */
const CaseCard = ({ study, t, isDark, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    onClick={onClick}
    className="rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
    style={{
      background: t.Cd,
      border: `1px solid ${t.Br}`,
      transition: "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${study.accentColor}40`;
      e.currentTarget.style.boxShadow = isDark
        ? `0 16px 48px rgba(0,0,0,0.38)`
        : `0 16px 48px rgba(0,0,0,0.08)`;
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = t.Br;
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {/* colored top bar */}
    <div className="h-[3px] w-full flex-shrink-0" style={{ background: study.accentColor }} />

    <div className="p-6 sm:p-7 flex flex-col flex-1 gap-5">
      {/* top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2.5 py-[3px] rounded-full text-[10.5px] font-bold tracking-wide"
            style={{ background: `${study.accentColor}15`, color: study.accentColor }}
          >
            {study.industry}
          </span>
          <span
            className="px-2.5 py-[3px] rounded-full text-[10.5px] font-medium"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: t.M }}
          >
            {study.year}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${study.accentColor}12`, color: study.accentColor, transition: "background 0.2s ease" }}
        >
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* client + headline */}
      <div>
        <p className="text-[11.5px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: `${t.A}80` }}>
          {study.client}
        </p>
        <h3
          className="text-[16px] sm:text-[17px] font-bold leading-snug"
          style={{ color: t.P, transition: "color 0.2s ease" }}
        >
          {study.headline}
        </h3>
      </div>

      {/* key metrics strip */}
      <div
        className="grid grid-cols-2 gap-3 pt-4"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        {study.results.slice(0, 2).map((r, i) => (
          <div key={i} className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
            <span
              className="font-black leading-none tracking-tight break-all"
              style={{
                color: study.accentColor,
                fontSize: "clamp(14px, 4vw, 22px)",
              }}
            >
              {r.metric}
            </span>
            <span className="text-[11px] font-medium leading-snug mt-0.5" style={{ color: t.M }}>{r.label}</span>
          </div>
        ))}
      </div>

      {/* services */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {study.services.slice(0, 2).map((s, i) => (
          <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: t.M }}>
            {s}
          </span>
        ))}
        {study.services.length > 2 && (
          <span className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: t.M }}>
            +{study.services.length - 2} more
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

/* ══════════════════════════════════
   FEATURED CARD (first item, full-width)
══════════════════════════════════ */
const FeaturedCard = ({ study, t, isDark, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    onClick={onClick}
    className="rounded-3xl overflow-hidden cursor-pointer"
    style={{
      background: t.Cd,
      border: `1px solid ${t.Br}`,
      transition: "border-color 0.22s ease, box-shadow 0.22s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${study.accentColor}40`;
      e.currentTarget.style.boxShadow = isDark
        ? `0 24px 60px rgba(0,0,0,0.4)`
        : `0 24px 60px rgba(0,0,0,0.09)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = t.Br;
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* top accent bar */}
    <div className="h-[3px]" style={{ background: `linear-gradient(to right, ${study.accentColor}, ${study.accentColor}60)` }} />

    <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-14 items-center">
      {/* left */}
      <div>
        <div className="flex items-center gap-2.5 mb-5 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide"
            style={{ background: `${study.accentColor}15`, color: study.accentColor }}
          >
            ★ Featured
          </span>
          <span
            className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: t.M }}
          >
            {study.industry}
          </span>
          <span className="text-[11px]" style={{ color: t.M }}>
            {study.duration} · {study.year}
          </span>
        </div>

        <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: `${t.A}80` }}>
          {study.client}
        </p>
        <h3 className="text-[22px] sm:text-[30px] lg:text-[36px] font-bold leading-[1.12] tracking-tight mb-5" style={{ color: t.P }}>
          {study.headline}
        </h3>
        <p className="text-[14px] leading-[1.8] max-w-[520px] mb-7" style={{ color: t.M }}>
          {study.challenge}
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {study.services.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium"
              style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: t.P, border: `1px solid ${t.Br}` }}>
              <Tag size={10} style={{ color: t.A }} /> {s}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold"
          style={{ background: study.accentColor, color: "#fff" }}
        >
          Read Case Study <ChevronRight size={15} />
        </motion.button>
      </div>

      {/* right - results */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {study.results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            className="rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col gap-1.5 min-w-0 overflow-hidden"
            style={{ background: `${study.accentColor}0e`, border: `1px solid ${study.accentColor}25` }}
          >
            <span
              className="font-black leading-none tracking-tight break-all"
              style={{
                color: study.accentColor,
                fontSize: "clamp(15px, 3.5vw, 28px)",
              }}
            >
              {r.metric}
            </span>
            <span className="text-[10.5px] sm:text-[11.5px] font-semibold leading-tight" style={{ color: t.M }}>
              {r.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ════════════════════════════════════
   MAIN PAGE
════════════════════════════════════ */
const CaseStudies = () => {
  const { isDark } = useTheme();
  const t = tk(isDark);

  const [studies,      setStudies]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeStudy,  setActiveStudy]  = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "case_studies"));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const sorted = all
          .filter(s => s.published === true)
          .sort((a, b) => {
            const ta = a.createdAt?.seconds ?? 0;
            const tb = b.createdAt?.seconds ?? 0;
            return tb - ta;
          });
        setStudies(sorted);
      } catch {
        setStudies([]);
      }
      setLoading(false);
    };
    fetchStudies();
  }, []);

  const industries = ["All", ...new Set(studies.map((c) => c.industry).filter(Boolean))];

  const filtered = activeFilter === "All" ? studies : studies.filter((c) => c.industry === activeFilter);

  const featuredStudy = studies.find(s => s.featured) || studies[0];
  const rest = filtered.filter((c) => c.id !== featuredStudy?.id);
  const showFeatured = activeFilter === "All" && !!featuredStudy;

  return (
    <div className="w-full min-h-screen" style={{ background: t.bg }}>
      <Helmet>
        <title>Case Studies | Webaurix Client Success Stories & Results</title>
        <meta
          name="description"
          content="Real results for real clients. See how Webaurix helps businesses across Pakistan, South Korea, the US, and the UK grow through web development, mobile apps, and AI engineering."
        />
        <meta name="keywords" content="Webaurix case studies, client success stories, web development portfolio, mobile app projects, AI projects, digital agency results" />
        <link rel="canonical" href="https://www.webaurix.com/case-studies" />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24 px-5 sm:px-10 lg:px-16">
        <div
          className="absolute inset-x-0 top-0 h-[65%] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${t.A}16, transparent)` }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-extrabold tracking-[0.26em] uppercase mb-5"
            style={{ color: t.A }}
          >
            Proof Over Promise
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] sm:text-[58px] lg:text-[76px] font-bold leading-[1.04] tracking-[-0.03em] mb-6 max-w-[860px]"
            style={{ color: t.P }}
          >
            Real work.{" "}
            <span style={{ color: t.A }}>Real results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[500px] mb-10"
            style={{ color: t.M }}
          >
            We don't just build products - we solve problems. Here's a look at
            the challenges we've tackled and the outcomes we've delivered.
          </motion.p>

          {/* stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            {[
              { value: loading ? "…" : `${studies.length}`, label: "Case Studies" },
              { value: "6+", label: "Industries" },
              { value: "50+", label: "Projects Shipped" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{ background: t.Cd, border: `1px solid ${t.Br}` }}>
                <span className="text-[18px] font-black leading-none" style={{ color: t.A }}>{s.value}</span>
                <span className="text-[12px] font-semibold" style={{ color: t.M }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${t.A}22,transparent)` }} />
      </section>

      {/* ══════════════ LOADING ══════════════ */}
      {loading && (
        <section className="px-5 sm:px-10 lg:px-16 py-20 flex items-center justify-center gap-3" style={{ borderTop:`1px solid ${t.Br}` }}>
          <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}>
            <Loader2 size={22} style={{ color:t.A }} />
          </motion.div>
          <span className="text-[14px]" style={{ color:t.M }}>Loading case studies…</span>
        </section>
      )}

      {/* ══════════════ FEATURED ══════════════ */}
      {!loading && showFeatured && featuredStudy && (
        <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16" style={{ borderTop: `1px solid ${t.Br}` }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-6" style={{ color: t.M }}>
              Featured Study
            </motion.p>
            <FeaturedCard study={featuredStudy} t={t} isDark={isDark} onClick={() => setActiveStudy(featuredStudy)} />
          </div>
        </section>
      )}

      {/* ══════════════ GRID ══════════════ */}
      {!loading && <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">

          {/* header + filter */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                {activeFilter === "All" ? "All Case Studies" : activeFilter}
              </motion.p>
              <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[38px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                {activeFilter === "All"
                  ? <>Browse our <span style={{ color: t.A }}>work.</span></>
                  : <>{activeFilter} <span style={{ color: t.A }}>projects.</span></>}
              </motion.h2>
            </div>

            {/* industry filter */}
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2">
              {industries.map((ind) => {
                const isActive = activeFilter === ind;
                return (
                  <button key={ind} onClick={() => setActiveFilter(ind)}
                    className="px-4 py-1.5 rounded-full text-[12px] font-semibold flex-shrink-0"
                    style={{
                      background: isActive ? t.A : "transparent",
                      color: isActive ? (isDark ? "#0b0b0e" : "#fff") : t.M,
                      border: `1px solid ${isActive ? t.A : t.Br}`,
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = `${t.A}50`; e.currentTarget.style.color = t.P; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = t.Br; e.currentTarget.style.color = t.M; } }}
                  >
                    {ind}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* result count */}
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="text-[12px] mb-8"
            style={{ color: t.M }}
          >
            Showing{" "}
            <span style={{ color: t.P, fontWeight: 600 }}>
              {showFeatured ? filtered.length : filtered.length}
            </span>{" "}
            {activeFilter !== "All" && (
              <>{activeFilter} </>
            )}
            case {filtered.length === 1 ? "study" : "studies"}
          </motion.p>

          <AnimatePresence mode="wait">
            {(showFeatured ? rest : filtered).length === 0 ? (
              <motion.div key="empty"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                transition={{ duration:0.35 }}
                className="rounded-3xl py-24 flex flex-col items-center justify-center gap-5 text-center"
                style={{ border:`1px solid ${t.Br}`, background:t.Cd }}>
                <Layers size={40} style={{ color:`${t.A}50` }} />
                <div>
                  <p className="text-[16px] font-bold mb-2" style={{ color:t.P }}>
                    {activeFilter === "All" ? "No case studies yet" : `No ${activeFilter} studies yet`}
                  </p>
                  <p className="text-[13px]" style={{ color:t.M }}>
                    Case studies added from the admin panel will appear here.
                  </p>
                </div>
                <Link to="/start-project">
                  <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer"
                    style={{ background:t.A, color: isDark?"#0b0b0e":"#fff" }}>
                    <Zap size={13}/> Start a Project
                  </motion.span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {(showFeatured ? rest : filtered).map((study, i) => (
                  <CaseCard
                    key={study.id}
                    study={study}
                    t={t}
                    isDark={isDark}
                    index={i}
                    onClick={() => setActiveStudy(study)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>}

      {/* ══════════════ INDUSTRIES STRIP ══════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-6 text-center" style={{ color: t.M }}>
            Industries We've Worked In
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {["E-Commerce", "Healthcare", "SaaS / Fintech", "Food & Beverage", "Real Estate", "Education", "Retail", "Logistics", "Travel"].map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-xl text-[12.5px] font-semibold"
                style={{ background: t.Cd, border: `1px solid ${t.Br}`, color: t.M }}
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 55% 80% at 0% 50%, ${t.A}10, transparent)` }} />

            <div className="relative z-10 max-w-[540px]">
              <p className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Your story could be next
              </p>
              <h2 className="text-[24px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Let's build something{" "}
                <span style={{ color: t.A }}>remarkable together.</span>
              </h2>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/start-project">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer whitespace-nowrap"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff", boxShadow: `0 6px 24px ${t.A}35` }}
                >
                  <Zap size={14} /> Start a Project
                </motion.span>
              </Link>
              <Link to="/book-consultation">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold cursor-pointer whitespace-nowrap"
                  style={{ border: `1px solid ${t.Br}`, color: t.M, transition: "color 0.18s ease, border-color 0.18s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.P; e.currentTarget.style.borderColor = `${t.A}45`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.M; e.currentTarget.style.borderColor = t.Br; }}
                >
                  Book a Consultation <ArrowUpRight size={14} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ══════════════ DETAIL MODAL ══════════════ */}
      <AnimatePresence>
        {activeStudy && (
          <DetailModal
            study={activeStudy}
            onClose={() => setActiveStudy(null)}
            isDark={isDark}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudies;
