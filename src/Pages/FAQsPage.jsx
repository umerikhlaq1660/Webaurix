import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown, Search, MessageSquare, Building2, Settings, Workflow,
  Linkedin, Instagram, Facebook, Mail, ArrowUpRight, CheckCircle2,
  Loader2, Zap, X,
} from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import faqSections from "../data/FaqPageData";

/* ── theme tokens ─────────────────────────── */
const tk = (isDark) => ({
  bg: isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)",
  P:    isDark ? "#f0eeec" : "#0c0c10",
  M:    isDark ? "rgba(240,238,236,0.44)" : "rgba(12,12,16,0.46)",
  A:    isDark ? "#68b5cc" : "#0e7490",
  Br:   isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
  Cd:   isDark ? "rgba(255,255,255,0.032)" : "rgba(0,0,0,0.022)",
  Cd2:  isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.038)",
  inp:  isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.04)",
  inpB: isDark ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)",
});

const TABS = [
  { id: "all",     label: "All Topics",  icon: <MessageSquare size={14} /> },
  { id: "company", label: "Company",     icon: <Building2     size={14} /> },
  { id: "services",label: "Services",    icon: <Settings      size={14} /> },
  { id: "process", label: "Process",     icon: <Workflow      size={14} /> },
];

const TAB_MAP = { company: 0, services: 1, process: 2 };

const SOCIALS = [
  { Icon: Linkedin,  href: "https://linkedin.com/company/webaurix",  label: "LinkedIn"  },
  { Icon: Instagram, href: "https://instagram.com/webaurix",         label: "Instagram" },
  { Icon: Facebook,  href: "https://facebook.com/webaurix",          label: "Facebook"  },
  { Icon: Mail,      href: "mailto:contact@webaurix.com",            label: "Email"     },
];

/* ── accordion item ───────────────────────── */
const AccordionItem = ({ item, isOpen, onToggle, t, accentColor }) => (
  <div style={{ borderBottom: `1px solid ${t.Br}` }} className="last:border-none">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-start gap-4 py-5 text-left"
    >
      <span
        className="text-[14.5px] sm:text-[15px] font-semibold leading-snug flex-1 transition-colors duration-150"
        style={{ color: isOpen ? accentColor : t.P }}
      >
        {item.question}
      </span>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
        style={{
          background: isOpen ? `${accentColor}18` : t.Cd2,
          border: `1px solid ${isOpen ? `${accentColor}35` : t.Br}`,
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <ChevronDown size={14} style={{ color: isOpen ? accentColor : t.M }} />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-5 space-y-2">
            {Array.isArray(item.answer)
              ? item.answer.map((line, i) => {
                  const isBullet =
                    line.trim().startsWith("-") || line.trim().startsWith("•");
                  const text = line.replace(/^[-•]\s*/, "").trim();
                  return isBullet ? (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                        style={{ background: accentColor }}
                      />
                      <span
                        className="text-[13.5px] leading-[1.75]"
                        style={{ color: t.M }}
                      >
                        {text}
                      </span>
                    </div>
                  ) : (
                    <p
                      key={i}
                      className="text-[13.5px] leading-[1.75]"
                      style={{ color: t.M }}
                    >
                      {line}
                    </p>
                  );
                })
              : (
                <p className="text-[13.5px] leading-[1.75]" style={{ color: t.M }}>
                  {item.answer}
                </p>
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ── main component ───────────────────────── */
const FaqPage = () => {
  const { isDark } = useTheme();
  const t = tk(isDark);

  const [openKey,    setOpenKey]    = useState(null);
  const [activeTab,  setActiveTab]  = useState("all");
  const [search,     setSearch]     = useState("");
  const [formData,   setFormData]   = useState({ name: "", email: "", question: "" });
  const [submitState,setSubmitState]= useState("idle"); // idle | loading | done | error

  /* filtered FAQ items */
  const filteredSections = useMemo(() => {
    const q = search.toLowerCase().trim();
    return faqSections
      .map((sec, sIdx) => {
        const tabKey = Object.keys(TAB_MAP).find(k => TAB_MAP[k] === sIdx);
        if (activeTab !== "all" && activeTab !== tabKey) return null;
        const items = q
          ? sec.items.filter(
              (it) =>
                it.question.toLowerCase().includes(q) ||
                (Array.isArray(it.answer)
                  ? it.answer.join(" ").toLowerCase().includes(q)
                  : it.answer.toLowerCase().includes(q))
            )
          : sec.items;
        if (!items.length) return null;
        return { ...sec, items, sIdx };
      })
      .filter(Boolean);
  }, [activeTab, search]);

  const totalResults = filteredSections.reduce((a, s) => a + s.items.length, 0);

  const toggleItem = (key) => setOpenKey((prev) => (prev === key ? null : key));

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("loading");
    try {
      await addDoc(collection(db, "faq_questions"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmitState("done");
      setFormData({ name: "", email: "", question: "" });
      setTimeout(() => setSubmitState("idle"), 4000);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  };

  const SECTION_ACCENTS = ["#68b5cc", "#f59e0b", "#10b981"];

  return (
    <div className="w-full min-h-screen" style={{ background: t.bg }}>
      <Helmet>
        <title>Help & FAQs | Webaurix Web, App & AI Services</title>
        <meta
          name="description"
          content="Find answers to common questions about Webaurix - our company, web & app development services, pricing, process, and how we work."
        />
        <meta
          name="keywords"
          content="Webaurix FAQs, web development questions, app development pricing, software agency process, digital agency help"
        />
        <link rel="canonical" href="https://www.webaurix.com/resources/webaurix-faqs" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSections.flatMap((sec) =>
              sec.items.map((it) => ({
                "@type": "Question",
                name: it.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: Array.isArray(it.answer)
                    ? it.answer.join(" ").replace(/^[-•]\s*/gm, "")
                    : it.answer,
                },
              }))
            ),
          })}
        </script>
      </Helmet>

      {/* ════════════ HERO ════════════ */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24 px-5 sm:px-10 lg:px-16">
        {/* radial glow */}
        <div
          className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 50% 0%, ${t.A}18, transparent)`,
          }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-extrabold tracking-[0.26em] uppercase mb-5"
            style={{ color: t.A }}
          >
            Help Center
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] mb-5"
            style={{ color: t.P }}
          >
            Ask &amp; <span style={{ color: t.A }}>Learn.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[480px] mx-auto mb-10"
            style={{ color: t.M }}
          >
            Quick answers about our company, services, and how we work - all in one place.
          </motion.p>

          {/* search bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[540px] mx-auto"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: t.M }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-[14px] outline-none"
              style={{
                background: t.inp,
                border: `1px solid ${t.inpB}`,
                color: t.P,
                caretColor: t.A,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: t.Cd2, color: t.M }}
              >
                <X size={12} />
              </button>
            )}
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${t.A}22,transparent)` }}
        />
      </section>

      {/* ════════════ TABS ════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-5 sticky top-0 z-30"
        style={{
          background: isDark ? "rgba(11,11,14,0.88)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${t.Br}`,
        }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-150"
                style={{
                  background: isActive ? t.A : "transparent",
                  color: isActive ? (isDark ? "#0b0b0e" : "#fff") : t.M,
                  border: `1px solid ${isActive ? t.A : t.Br}`,
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}

          <div className="ml-auto pl-4 flex-shrink-0">
            <span className="text-[12px]" style={{ color: t.M }}>
              <span style={{ color: t.P, fontWeight: 600 }}>{totalResults}</span>{" "}
              {totalResults === 1 ? "result" : "results"}
              {search && (
                <span> for &ldquo;<span style={{ color: t.A }}>{search}</span>&rdquo;</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ SECTIONS ════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {filteredSections.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl py-20 flex flex-col items-center justify-center gap-4 text-center"
                style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
              >
                <Search size={38} style={{ color: `${t.A}50` }} />
                <div>
                  <p className="text-[16px] font-bold mb-2" style={{ color: t.P }}>
                    No results found
                  </p>
                  <p className="text-[13px]" style={{ color: t.M }}>
                    Try a different search term or browse all topics
                  </p>
                </div>
                <button
                  onClick={() => { setSearch(""); setActiveTab("all"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}
                >
                  <X size={13} /> Clear Search
                </button>
              </motion.div>
            ) : (
              filteredSections.map((section, idx) => {
                const accent = SECTION_ACCENTS[section.sIdx] ?? t.A;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl overflow-hidden"
                    style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
                  >
                    {/* section header */}
                    <div
                      className="px-6 sm:px-8 py-5 flex items-center gap-3"
                      style={{ borderBottom: `1px solid ${t.Br}`, background: t.Cd2 }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: accent }}
                      />
                      <h2
                        className="text-[15px] sm:text-[16px] font-bold tracking-tight"
                        style={{ color: t.P }}
                      >
                        {section.title}
                      </h2>
                      <span
                        className="ml-auto text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: `${accent}15`, color: accent }}
                      >
                        {section.items.length}
                      </span>
                    </div>

                    {/* accordion items */}
                    <div className="px-6 sm:px-8">
                      {section.items.map((item, qIdx) => {
                        const key = `${section.sIdx}-${qIdx}`;
                        return (
                          <AccordionItem
                            key={key}
                            item={item}
                            isOpen={openKey === key}
                            onToggle={() => toggleItem(key)}
                            t={t}
                            accentColor={accent}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════ STILL WONDERING ════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0"
            style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
          >
            {/* LEFT */}
            <div
              className="p-8 sm:p-10 flex flex-col justify-between gap-10"
              style={{ borderRight: `1px solid ${t.Br}` }}
            >
              <div>
                <p
                  className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-4"
                  style={{ color: t.A }}
                >
                  Still Wondering?
                </p>
                <h2
                  className="text-[26px] sm:text-[36px] font-bold leading-[1.1] tracking-tight mb-4"
                  style={{ color: t.P }}
                >
                  Didn't find your{" "}
                  <span style={{ color: t.A }}>answer?</span>
                </h2>
                <p className="text-[14px] leading-[1.8]" style={{ color: t.M }}>
                  Send us your question directly - our team typically responds within
                  24 hours and we'll make sure you get what you need.
                </p>
              </div>

              <div>
                <p
                  className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
                  style={{ color: t.M }}
                >
                  Reach us on
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all duration-150"
                      style={{
                        background: t.Cd2,
                        border: `1px solid ${t.Br}`,
                        color: t.M,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${t.A}15`;
                        e.currentTarget.style.borderColor = `${t.A}40`;
                        e.currentTarget.style.color = t.A;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = t.Cd2;
                        e.currentTarget.style.borderColor = t.Br;
                        e.currentTarget.style.color = t.M;
                      }}
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT - form */}
            <div className="p-8 sm:p-10">
              <p
                className="text-[13px] font-bold mb-6"
                style={{ color: t.P }}
              >
                Submit your question
              </p>

              <AnimatePresence mode="wait">
                {submitState === "done" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${t.A}15`, border: `1px solid ${t.A}35` }}
                    >
                      <CheckCircle2 size={26} style={{ color: t.A }} />
                    </div>
                    <div>
                      <p className="text-[16px] font-bold mb-1" style={{ color: t.P }}>
                        Question received!
                      </p>
                      <p className="text-[13px]" style={{ color: t.M }}>
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {[
                      { name: "name",     type: "text",  placeholder: "Your Name"     },
                      { name: "email",    type: "email", placeholder: "Your Email"    },
                    ].map((field) => (
                      <div key={field.name}>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-150"
                          style={{
                            background: t.inp,
                            border: `1px solid ${t.inpB}`,
                            color: t.P,
                            caretColor: t.A,
                          }}
                          onFocus={(e) => { e.target.style.borderColor = `${t.A}60`; }}
                          onBlur={(e) => { e.target.style.borderColor = t.inpB; }}
                        />
                      </div>
                    ))}

                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      placeholder="Your Question"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-none transition-all duration-150"
                      style={{
                        background: t.inp,
                        border: `1px solid ${t.inpB}`,
                        color: t.P,
                        caretColor: t.A,
                        scrollbarWidth: "none",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = `${t.A}60`; }}
                      onBlur={(e) => { e.target.style.borderColor = t.inpB; }}
                    />

                    {submitState === "error" && (
                      <p className="text-[12.5px]" style={{ color: "#f87171" }}>
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitState === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold transition-opacity duration-150"
                      style={{
                        background: t.A,
                        color: isDark ? "#0b0b0e" : "#fff",
                        opacity: submitState === "loading" ? 0.7 : 1,
                        cursor: submitState === "loading" ? "not-allowed" : "pointer",
                      }}
                    >
                      {submitState === "loading" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 size={15} />
                          </motion.span>
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Zap size={14} /> Submit Question
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ CTA STRIP ════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-8 sm:px-12 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 50% 70% at 0% 50%, ${t.A}10, transparent)`,
              }}
            />
            <div className="relative z-10 max-w-[480px]">
              <p
                className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3"
                style={{ color: t.A }}
              >
                Ready to get started?
              </p>
              <h2
                className="text-[22px] sm:text-[32px] font-bold leading-[1.1] tracking-tight"
                style={{ color: t.P }}
              >
                Let's build something{" "}
                <span style={{ color: t.A }}>remarkable.</span>
              </h2>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/start-project">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer whitespace-nowrap"
                  style={{
                    background: t.A,
                    color: isDark ? "#0b0b0e" : "#fff",
                    boxShadow: `0 6px 24px ${t.A}35`,
                  }}
                >
                  <Zap size={14} /> Start a Project
                </motion.span>
              </Link>
              <Link to="/book-consultation">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer whitespace-nowrap"
                  style={{
                    border: `1px solid ${t.Br}`,
                    color: t.M,
                    transition: "color 0.18s ease, border-color 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = t.P;
                    e.currentTarget.style.borderColor = `${t.A}45`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = t.M;
                    e.currentTarget.style.borderColor = t.Br;
                  }}
                >
                  Book a Consultation <ArrowUpRight size={14} />
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

export default FaqPage;
