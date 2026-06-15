import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin, Clock, ArrowUpRight, Zap,
  CheckCircle2, Loader2, Send, MessageSquare, ChevronRight, ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ── theme tokens ─────────────────────────────── */
const tk = (isDark) => ({
  bg:     isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)",
  P:      isDark ? "#f0eeec"                   : "#0c0c10",
  M:      isDark ? "rgba(240,238,236,0.44)"    : "rgba(12,12,16,0.46)",
  A:      isDark ? "#68b5cc"                   : "#0e7490",
  Adim:   isDark ? "rgba(104,181,204,0.12)"    : "rgba(14,116,144,0.09)",
  Aglow:  isDark ? "rgba(104,181,204,0.22)"    : "rgba(14,116,144,0.18)",
  Br:     isDark ? "rgba(255,255,255,0.07)"    : "rgba(0,0,0,0.07)",
  Cd:     isDark ? "rgba(255,255,255,0.032)"   : "rgba(0,0,0,0.022)",
  Cd2:    isDark ? "rgba(255,255,255,0.055)"   : "rgba(0,0,0,0.038)",
  inp:    isDark ? "rgba(255,255,255,0.05)"    : "rgba(0,0,0,0.04)",
  inpB:   isDark ? "rgba(255,255,255,0.1)"     : "rgba(0,0,0,0.12)",
  amber:  isDark ? "#fbbf24"                   : "#d97706",
  green:  isDark ? "#34d399"                   : "#059669",
});

/* ── contact info cards ───────────────────────── */
const INFO_CARDS = [
  {
    icon:  Mail,
    label: "Email Us",
    value: "contact@webaurix.com",
    sub:   "We reply within 24 hours",
    href:  "mailto:contact@webaurix.com",
    color: "#68b5cc",
  },
  {
    icon:  Phone,
    label: "Call Us",
    value: "0332-4835793",
    sub:   "Mon – Fri, 9 AM – 6 PM PKT",
    href:  "tel:+923324835793",
    color: "#10b981",
  },
  {
    icon:  MapPin,
    label: "Our Office",
    value: "Lahore, Pakistan",
    sub:   "Serving clients globally",
    href:  null,
    color: "#f59e0b",
  },
  {
    icon:  Clock,
    label: "Response Time",
    value: "< 24 Hours",
    sub:   "Average first response",
    href:  null,
    color: "#c084fc",
  },
];

const SOCIALS = [
  { Icon: FaFacebookF,  href: "https://www.facebook.com/profile.php?id=61573331945230", label: "Facebook",  color: "#1877f2" },
  { Icon: FaInstagram,  href: "https://www.instagram.com/webaurix.official/",            label: "Instagram", color: "#e1306c" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/webnaurix-official/",    label: "LinkedIn",  color: "#0a66c2" },
];

const SERVICES = [
  "Web Development", "Mobile App Development", "UI/UX Design",
  "Generative AI / Chatbot", "Digital Marketing", "Cyber Security", "Other",
];

const BUDGETS = [
  "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000",
  "$15,000 – $50,000", "$50,000+", "Not sure yet",
];

/* ── budget select dropdown ──────────────────── */
const BudgetSelect = ({ value, onChange, t, isDark }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] text-left"
        style={{ background: t.inp, border: `1px solid ${open ? t.A : t.inpB}`, color: value ? t.P : t.M, transition: "border-color 0.18s ease", outline: "none" }}>
        <span>{value || "Select a range…"}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 28 }} style={{ color: t.M, flexShrink: 0 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-xl overflow-hidden py-1"
            style={{ background: isDark ? "#0d1520" : "#ffffff", border: `1px solid ${t.Br}`, boxShadow: isDark ? "0 16px 40px rgba(0,0,0,0.5)" : "0 12px 32px rgba(0,0,0,0.1)" }}>
            {BUDGETS.map((opt) => (
              <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px]"
                style={{ color: value === opt ? t.A : t.P, background: value === opt ? (isDark ? "rgba(104,181,204,0.08)" : "rgba(14,116,144,0.07)") : "transparent", transition: "background 0.12s ease, color 0.12s ease" }}
                onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; }}
                onMouseLeave={e => { if (value !== opt) e.currentTarget.style.background = "transparent"; }}>
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── input component ─────────────────────────── */
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold tracking-wide" style={{ color: "currentColor" }}>
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[11.5px]" style={{ color: "#f87171" }}>{error}</p>
    )}
  </div>
);

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const ContactUs = () => {
  const { isDark } = useTheme();
  const t = tk(isDark);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [errors,      setErrors]      = useState({});
  const [submitState, setSubmitState] = useState("idle"); // idle|loading|done|error

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitState("loading");
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitState("done");
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3500);
    }
  };

  const inputStyle = {
    background: t.inp,
    border: `1px solid ${t.inpB}`,
    color: t.P,
    caretColor: t.A,
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s ease",
  };

  const onFocus = (e) => { e.target.style.borderColor = `${t.A}65`; };
  const onBlur  = (e) => { e.target.style.borderColor = t.inpB; };

  return (
    <div className="w-full min-h-screen" style={{ background: t.bg }}>
      <Helmet>
        <title>Contact Webaurix | Get a Quote for Web, App & AI Projects</title>
        <meta
          name="description"
          content="Get in touch with Webaurix for web, app, and AI projects. Based in Lahore, serving clients in Pakistan, the US, the UK, and worldwide. We reply within 24 hours."
        />
        <meta name="keywords" content="contact Webaurix, get a quote, hire web developers, digital agency Lahore, web development Pakistan, AI agency, project enquiry" />
        <link rel="canonical" href="https://www.webaurix.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Webaurix",
            url: "https://www.webaurix.com/contact",
            description:
              "Contact Webaurix for web development, AI, and digital projects. Based in Lahore, Pakistan, serving clients worldwide.",
          })}
        </script>
      </Helmet>

      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-44 sm:pb-24 px-5 sm:px-10 lg:px-16">
        <div
          className="absolute inset-x-0 top-0 h-[65%] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 65% 55% at 50% 0%, ${t.A}18, transparent)` }}
        />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="max-w-[680px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-extrabold tracking-[0.26em] uppercase mb-5"
              style={{ color: t.A }}
            >
              Get in Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="text-[26px] sm:text-[48px] lg:text-[72px] font-bold leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ color: t.P }}
            >
              Let's build something{" "}
              <span style={{ color: t.A }}>remarkable.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14px] sm:text-[17px] leading-[1.8] max-w-[500px]"
              style={{ color: t.M }}
            >
              Tell us about your project - we'll get back to you within 24 hours
              with a thoughtful response.
            </motion.p>
          </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${t.A}22,transparent)` }}
        />
      </section>

      {/* ════════ INFO CARDS ════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-10"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {INFO_CARDS.map(({ icon: Icon, label, value, sub, href, color }, i) => {
            const inner = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3 h-full"
                style={{
                  background: t.Cd,
                  border: `1px solid ${t.Br}`,
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  cursor: href ? "pointer" : "default",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!href) return;
                  e.currentTarget.style.borderColor = `${color}35`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.Br;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon size={14} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase mb-1" style={{ color: t.M }}>
                    {label}
                  </p>
                  <p className="text-[12px] sm:text-[14px] font-bold leading-snug break-all" style={{ color: t.P }}>
                    {value}
                  </p>
                  <p className="text-[10.5px] sm:text-[11.5px] mt-1 leading-snug" style={{ color: t.M }}>{sub}</p>
                </div>
              </motion.div>
            );

            return href ? (
              <a key={i} href={href} style={{ textDecoration: "none" }}>
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* ════════ MAIN SPLIT ════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-start">

          {/* ── LEFT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
          >
            {/* form header */}
            <div
              className="px-5 sm:px-8 py-5 flex items-center gap-3"
              style={{ borderBottom: `1px solid ${t.Br}`, background: t.Cd2 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: t.Adim, border: `1px solid ${t.Aglow}` }}
              >
                <Send size={15} style={{ color: t.A }} />
              </div>
              <div>
                <p className="text-[15px] font-bold" style={{ color: t.P }}>
                  Send us a Message
                </p>
                <p className="text-[12px]" style={{ color: t.M }}>
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            {/* form body */}
            <div className="px-5 sm:px-8 py-6 sm:py-8">
              <AnimatePresence mode="wait">
                {submitState === "done" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: t.Adim, border: `1px solid ${t.Aglow}` }}
                    >
                      <CheckCircle2 size={30} style={{ color: t.A }} />
                    </motion.div>
                    <div>
                      <p className="text-[20px] font-bold mb-2" style={{ color: t.P }}>
                        Message Sent!
                      </p>
                      <p className="text-[14px] leading-relaxed max-w-[340px]" style={{ color: t.M }}>
                        Thanks for reaching out. We've received your message and
                        will get back to you within 24 hours.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setSubmitState("idle")}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold"
                      style={{ background: t.Adim, color: t.A, border: `1px solid ${t.Aglow}` }}
                    >
                      <MessageSquare size={14} /> Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    style={{ color: t.M }}
                  >
                    {/* name + email */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Field label="Full Name *" error={errors.name}>
                        <input
                          name="name" type="text" value={form.name}
                          onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                          placeholder="John Smith"
                          style={{ ...inputStyle, borderColor: errors.name ? "#f87171" : t.inpB }}
                        />
                      </Field>
                      <Field label="Email Address *" error={errors.email}>
                        <input
                          name="email" type="email" value={form.email}
                          onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                          placeholder="john@company.com"
                          style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : t.inpB }}
                        />
                      </Field>
                    </div>

                    {/* phone + service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Field label="Phone Number">
                        <input
                          name="phone" type="tel" value={form.phone}
                          onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                          placeholder="+1 555 000 0000"
                          style={inputStyle}
                        />
                      </Field>
                      <Field label="Service Interested In">
                        <select
                          name="service" value={form.service}
                          onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                          style={{
                            ...inputStyle,
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                            paddingRight: "38px",
                          }}
                        >
                          <option value="" style={{ background: isDark ? "#0d1017" : "#fff" }}>
                            Select a service…
                          </option>
                          {SERVICES.map(s => (
                            <option key={s} value={s} style={{ background: isDark ? "#0d1017" : "#fff" }}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* budget */}
                    <Field label="Estimated Budget">
                      <BudgetSelect
                        value={form.budget}
                        onChange={(v) => setForm(p => ({ ...p, budget: v }))}
                        t={t}
                        isDark={isDark}
                      />
                    </Field>

                    {/* message */}
                    <Field label="Your Message *" error={errors.message}>
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                        placeholder="Tell us about your project, goals, and timeline…"
                        rows={5}
                        style={{
                          ...inputStyle,
                          resize: "none",
                          scrollbarWidth: "none",
                          borderColor: errors.message ? "#f87171" : t.inpB,
                        }}
                      />
                    </Field>

                    {submitState === "error" && (
                      <p className="text-[12.5px]" style={{ color: "#f87171" }}>
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitState === "loading"}
                      whileHover={{ scale: submitState === "loading" ? 1 : 1.02 }}
                      whileTap={{ scale: submitState === "loading" ? 1 : 0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-[14px] font-bold"
                      style={{
                        background: t.A,
                        color: isDark ? "#0b0b0e" : "#fff",
                        opacity: submitState === "loading" ? 0.72 : 1,
                        cursor: submitState === "loading" ? "not-allowed" : "pointer",
                        boxShadow: `0 8px 28px ${t.A}30`,
                      }}
                    >
                      {submitState === "loading" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 size={16} />
                          </motion.span>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={15} /> Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── RIGHT SIDEBAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* follow us */}
            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
            >
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5" style={{ color: t.M }}>
                Follow Us
              </p>
              <div className="flex flex-col gap-3">
                {SOCIALS.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150"
                    style={{
                      background: t.Cd2,
                      border: `1px solid ${t.Br}`,
                      textDecoration: "none",
                      color: t.M,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${color}35`;
                      e.currentTarget.style.background   = `${color}0d`;
                      e.currentTarget.style.color        = t.P;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = t.Br;
                      e.currentTarget.style.background   = t.Cd2;
                      e.currentTarget.style.color        = t.M;
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span className="text-[13px] font-semibold">{label}</span>
                    <ArrowUpRight size={13} className="ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* quick links */}
            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
            >
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5" style={{ color: t.M }}>
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Start a Project",    to: "/start-project" },
                  { label: "Book a Consultation",to: "/book-consultation" },
                  { label: "Our Services",       to: "/services/web-development" },
                  { label: "Case Studies",       to: "/case-studies" },
                  { label: "Careers",            to: "/careers" },
                  { label: "Help & FAQs",        to: "/resources/webaurix-faqs" },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150"
                    style={{
                      color: t.M,
                      textDecoration: "none",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background    = t.Cd2;
                      e.currentTarget.style.borderColor   = t.Br;
                      e.currentTarget.style.color         = t.P;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background    = "transparent";
                      e.currentTarget.style.borderColor   = "transparent";
                      e.currentTarget.style.color         = t.M;
                    }}
                  >
                    <ChevronRight size={13} style={{ color: t.A }} />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* working hours */}
            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{ border: `1px solid ${t.Br}`, background: t.Cd }}
            >
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5" style={{ color: t.M }}>
                Working Hours
              </p>
              <div className="space-y-3">
                {[
                  { day: "Mon – Fri",  time: "9 AM – 6 PM",   active: true  },
                  { day: "Saturday",   time: "10 AM – 3 PM",  active: true  },
                  { day: "Sunday",     time: "Closed",        active: false },
                ].map(({ day, time, active }) => (
                  <div key={day} className="flex items-center justify-between gap-2">
                    <span className="text-[12.5px]" style={{ color: t.M }}>{day}</span>
                    <span
                      className="text-[11.5px] sm:text-[12px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        background: active ? `${t.A}14` : "transparent",
                        color: active ? t.A : t.M,
                      }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="mt-5 flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: t.Adim, border: `1px solid ${t.Aglow}` }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: t.A }} />
                <p className="text-[12.5px] font-semibold" style={{ color: t.A }}>
                  We're currently available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-6 sm:px-14 py-10 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8"
            style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 55% 80% at 0% 50%, ${t.A}10, transparent)` }}
            />
            <div className="relative z-10 max-w-[540px]">
              <p className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Not sure where to start?
              </p>
              <h2 className="text-[24px] sm:text-[36px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Book a free <span style={{ color: t.A }}>strategy call.</span>
              </h2>
              <p className="text-[14px] mt-3 leading-relaxed max-w-[400px]" style={{ color: t.M }}>
                30 minutes with our team - we'll map out what you need and give you a
                clear path forward. No commitment required.
              </p>
            </div>
            <div className="relative z-10 flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <Link to="/book-consultation" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl text-[13px] sm:text-[13.5px] font-bold cursor-pointer w-full"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff", boxShadow: `0 6px 24px ${t.A}35` }}
                >
                  <Zap size={14} /> Book Free Call
                </motion.span>
              </Link>
              <Link to="/case-studies" className="flex-1 sm:flex-none">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl text-[13px] sm:text-[13.5px] font-semibold cursor-pointer w-full"
                  style={{
                    border: `1px solid ${t.Br}`, color: t.M,
                    transition: "color 0.18s ease, border-color 0.18s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.P; e.currentTarget.style.borderColor = `${t.A}45`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.M; e.currentTarget.style.borderColor = t.Br; }}
                >
                  View Our Work <ArrowUpRight size={14} />
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

export default ContactUs;
