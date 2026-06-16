import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  MessageSquare,
  Zap,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/* ── theme tokens ── */
const tokens = (isDark) => ({
  bg: isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)",
  P: isDark ? "#f0eeec" : "#0c0c10",
  M: isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)",
  A: isDark ? "#68b5cc" : "#0e7490",
  Br: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
  Cd: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
  inputBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
  inputBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
});

const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Generative AI / Chatbot",
  "Digital Marketing",
  "Cyber Security",
  "E-commerce",
  "Custom Software",
  "Other",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

/* ── Field wrapper ── */
const Field = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold tracking-wide" style={{ color: "var(--c-muted)" }}>
      {label}
      {required && <span style={{ color: "var(--c-accent)" }}> *</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="text-[11.5px]"
          style={{ color: "#f87171" }}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ── Select component ── */
const Select = ({ value, onChange, options, placeholder, isDark, tok }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] text-left"
        style={{
          background: tok.inputBg,
          border: `1px solid ${open ? tok.A : tok.inputBorder}`,
          color: value ? tok.P : tok.M,
          transition: "border-color 0.18s ease",
          outline: "none",
        }}
      >
        <span>{value || placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          style={{ color: tok.M, flexShrink: 0 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-xl overflow-hidden py-1"
            style={{
              background: isDark ? "#0d1520" : "#ffffff",
              border: `1px solid ${tok.Br}`,
              boxShadow: isDark
                ? "0 16px 40px rgba(0,0,0,0.5)"
                : "0 12px 32px rgba(0,0,0,0.1)",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px]"
                style={{
                  color: value === opt ? tok.A : tok.P,
                  background:
                    value === opt
                      ? isDark ? "rgba(104,181,204,0.08)" : "rgba(14,116,144,0.07)"
                      : "transparent",
                  transition: "background 0.12s ease, color 0.12s ease",
                }}
                onMouseEnter={(e) => {
                  if (value !== opt) {
                    e.currentTarget.style.background = isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== opt) e.currentTarget.style.background = "transparent";
                }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* close on outside click */}
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

/* ════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
const BookConsultation = () => {
  const { isDark } = useTheme();
  const tok = tokens(isDark);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const ref = await addDoc(collection(db, "consultations"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);

      /* Fire-and-forget AI draft reply — never affects the visitor's
         success state if it fails (e.g. daily AI quota exhausted). */
      (async () => {
        try {
          const res = await fetch("/api/ai-manager/draft-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              collection: "consultations",
              docId: ref.id,
              name: form.name,
              email: form.email,
              service: form.service,
              budget: form.budget,
              message: form.message,
            }),
          });
          if (!res.ok) return;
          const { draft } = await res.json();
          if (draft) {
            await updateDoc(ref, { aiDraft: draft, aiDraftStatus: "pending", aiDraftCreatedAt: serverTimestamp() });
          }
        } catch {
          /* silent — admin can still click "Generate AI Draft" manually */
        }
      })();
    } catch (_) {
      setSubmitError("Something went wrong. Please try again.");
      setTimeout(() => setSubmitError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  /* css vars for this page */
  const cssVars = {
    "--c-primary": tok.P,
    "--c-muted": tok.M,
    "--c-accent": tok.A,
    "--c-border": tok.Br,
  };

  return (
    <div className="w-full min-h-screen" style={{ background: tok.bg, ...cssVars }}>
      <Helmet>
        <title>Book a Free Consultation | Webaurix Digital Agency</title>
        <meta
          name="description"
          content="Book a free consultation with Webaurix to plan your web, mobile, or AI project. Serving founders and teams in Pakistan, the US, and the UK."
        />
        <meta name="keywords" content="book consultation, free strategy call, web development consultation, AI project consultation, hire web development agency, Webaurix" />
        <link rel="canonical" href="https://webaurix.com/book-consultation" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-18 px-5 sm:px-10 lg:px-16">
        <div
          className="absolute inset-x-0 top-0 h-80 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 48% at 50% 0%, ${tok.A}18, transparent)`,
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-4"
            style={{ color: tok.A }}
          >
            Free · No Commitment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="text-[34px] sm:text-[54px] lg:text-[68px] font-bold leading-[1.06] tracking-[-0.03em] mb-5"
            style={{ color: tok.P }}
          >
            Let's talk about
            <br />
            <span style={{ color: tok.A }}>your project.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] sm:text-[17px] leading-[1.78] max-w-[480px] mx-auto"
            style={{ color: tok.M }}
          >
            Book a free 30-minute strategy session. We'll listen, ask the right questions, and
            map out a clear path forward - zero pressure.
          </motion.p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{
            background: `linear-gradient(to right,transparent,${tok.A}22,transparent)`,
          }}
        />
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-start">

            {/* ── LEFT: FORM ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl p-10 sm:p-14 flex flex-col items-center text-center"
                    style={{
                      background: tok.Cd,
                      border: `1px solid ${tok.Br}`,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 360, damping: 22 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${tok.A}18`, color: tok.A }}
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h2
                      className="text-[26px] sm:text-[32px] font-bold leading-snug tracking-tight mb-3"
                      style={{ color: tok.P }}
                    >
                      You're all set!
                    </h2>
                    <p
                      className="text-[14px] sm:text-[15px] leading-[1.8] max-w-[380px]"
                      style={{ color: tok.M }}
                    >
                      We've received your consultation request. Our team will reach out within{" "}
                      <span style={{ color: tok.A, fontWeight: 600 }}>24 hours</span> to confirm
                      your session time.
                    </p>
                    <div
                      className="mt-8 px-5 py-3 rounded-xl text-[12.5px] font-semibold"
                      style={{
                        background: `${tok.A}12`,
                        color: tok.A,
                        border: `1px solid ${tok.A}28`,
                      }}
                    >
                      Check your inbox - we'll send a confirmation email shortly.
                    </div>
                  </motion.div>
                ) : (
                  /* ── FORM ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-3xl p-6 sm:p-10"
                    style={{
                      background: tok.Cd,
                      border: `1px solid ${tok.Br}`,
                    }}
                  >
                    <h2
                      className="text-[20px] sm:text-[24px] font-bold tracking-tight mb-1"
                      style={{ color: tok.P }}
                    >
                      Tell us about yourself
                    </h2>
                    <p
                      className="text-[13px] mb-8 leading-relaxed"
                      style={{ color: tok.M }}
                    >
                      Fill in the details below and we'll get back to you within 24 hours.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="sm:col-span-2">
                        <Field label="Full Name" required error={errors.name}>
                          <input
                            type="text"
                            placeholder="Ahmed Raza"
                            value={form.name}
                            onChange={set("name")}
                            className="w-full px-4 py-3 rounded-xl text-[13px] outline-none"
                            style={{
                              background: tok.inputBg,
                              border: `1px solid ${errors.name ? "#f87171" : tok.inputBorder}`,
                              color: tok.P,
                              transition: "border-color 0.18s ease",
                            }}
                            onFocus={(e) => { e.target.style.borderColor = tok.A; }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.name ? "#f87171" : tok.inputBorder;
                            }}
                          />
                        </Field>
                      </div>

                      {/* Email */}
                      <Field label="Email Address" required error={errors.email}>
                        <input
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={set("email")}
                          className="w-full px-4 py-3 rounded-xl text-[13px] outline-none"
                          style={{
                            background: tok.inputBg,
                            border: `1px solid ${errors.email ? "#f87171" : tok.inputBorder}`,
                            color: tok.P,
                            transition: "border-color 0.18s ease",
                          }}
                          onFocus={(e) => { e.target.style.borderColor = tok.A; }}
                          onBlur={(e) => {
                            e.target.style.borderColor = errors.email ? "#f87171" : tok.inputBorder;
                          }}
                        />
                      </Field>

                      {/* Phone */}
                      <Field label="Phone Number" error={errors.phone}>
                        <input
                          type="tel"
                          placeholder="+92 300 0000000"
                          value={form.phone}
                          onChange={set("phone")}
                          className="w-full px-4 py-3 rounded-xl text-[13px] outline-none"
                          style={{
                            background: tok.inputBg,
                            border: `1px solid ${tok.inputBorder}`,
                            color: tok.P,
                            transition: "border-color 0.18s ease",
                          }}
                          onFocus={(e) => { e.target.style.borderColor = tok.A; }}
                          onBlur={(e) => { e.target.style.borderColor = tok.inputBorder; }}
                        />
                      </Field>

                      {/* Company */}
                      <div className="sm:col-span-2">
                        <Field label="Company / Business Name" error={errors.company}>
                          <input
                            type="text"
                            placeholder="Acme Inc. (optional)"
                            value={form.company}
                            onChange={set("company")}
                            className="w-full px-4 py-3 rounded-xl text-[13px] outline-none"
                            style={{
                              background: tok.inputBg,
                              border: `1px solid ${tok.inputBorder}`,
                              color: tok.P,
                              transition: "border-color 0.18s ease",
                            }}
                            onFocus={(e) => { e.target.style.borderColor = tok.A; }}
                            onBlur={(e) => { e.target.style.borderColor = tok.inputBorder; }}
                          />
                        </Field>
                      </div>

                      {/* Service */}
                      <Field label="Service You're Interested In" required error={errors.service}>
                        <Select
                          value={form.service}
                          onChange={(v) => setForm((p) => ({ ...p, service: v }))}
                          options={SERVICES}
                          placeholder="Select a service…"
                          isDark={isDark}
                          tok={tok}
                        />
                      </Field>

                      {/* Budget */}
                      <Field label="Estimated Budget" error={errors.budget}>
                        <Select
                          value={form.budget}
                          onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
                          options={BUDGETS}
                          placeholder="Select a range…"
                          isDark={isDark}
                          tok={tok}
                        />
                      </Field>

                      {/* Message */}
                      <div className="sm:col-span-2">
                        <Field label="What would you like to discuss?" required error={errors.message}>
                          <textarea
                            rows={5}
                            placeholder="Briefly describe your project, goals, or any specific questions you have for the consultation…"
                            value={form.message}
                            onChange={set("message")}
                            className="w-full px-4 py-3 rounded-xl text-[13px] outline-none resize-none"
                            style={{
                              background: tok.inputBg,
                              border: `1px solid ${errors.message ? "#f87171" : tok.inputBorder}`,
                              color: tok.P,
                              transition: "border-color 0.18s ease",
                              lineHeight: 1.7,
                            }}
                            onFocus={(e) => { e.target.style.borderColor = tok.A; }}
                            onBlur={(e) => {
                              e.target.style.borderColor = errors.message
                                ? "#f87171"
                                : tok.inputBorder;
                            }}
                          />
                        </Field>
                      </div>
                    </div>

                    {/* Submit error */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-5 px-4 py-3 rounded-xl text-[12.5px]"
                          style={{
                            background: "rgba(248,113,113,0.08)",
                            border: "1px solid rgba(248,113,113,0.25)",
                            color: "#f87171",
                          }}
                        >
                          {submitError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="mt-7 w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[14px] font-bold cursor-pointer disabled:opacity-60"
                      style={{
                        background: tok.A,
                        color: isDark ? "#0b0b0e" : "#ffffff",
                        boxShadow: `0 6px 24px ${tok.A}35`,
                      }}
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 rounded-full border-current border-t-transparent"
                          />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Calendar size={15} />
                          Book My Free Consultation
                          <ArrowRight size={15} />
                        </>
                      )}
                    </motion.button>

                    <p
                      className="text-[11.5px] text-center mt-4"
                      style={{ color: tok.M }}
                    >
                      No spam, ever. We respect your privacy.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── RIGHT: INFO PANEL ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28 space-y-4"
            >
              {/* What to expect */}
              <div
                className="rounded-3xl p-6 sm:p-7"
                style={{ background: tok.Cd, border: `1px solid ${tok.Br}` }}
              >
                <p
                  className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-4"
                  style={{ color: tok.A }}
                >
                  What to expect
                </p>
                <div className="space-y-5">
                  {[
                    {
                      icon: <MessageSquare size={15} />,
                      title: "We listen first",
                      desc: "You talk, we take notes. No sales pitch - just genuine curiosity about your goals.",
                    },
                    {
                      icon: <Zap size={15} />,
                      title: "Actionable insights",
                      desc: "You'll leave with clarity on approach, tech stack, and realistic timelines.",
                    },
                    {
                      icon: <Clock size={15} />,
                      title: "30 minutes, no fluff",
                      desc: "Focused, structured, and respectful of your time. We come prepared.",
                    },
                    {
                      icon: <CheckCircle2 size={15} />,
                      title: "Zero obligation",
                      desc: "This is a conversation - not a contract. Move forward only if it feels right.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.38 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${tok.A}14`, color: tok.A }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p
                          className="text-[13px] font-semibold leading-snug mb-[3px]"
                          style={{ color: tok.P }}
                        >
                          {item.title}
                        </p>
                        <p className="text-[12px] leading-[1.7]" style={{ color: tok.M }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Response time badge */}
              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: `${tok.A}10`,
                  border: `1px solid ${tok.A}28`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${tok.A}20`, color: tok.A }}
                >
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: tok.P }}>
                    We reply within 24 hours
                  </p>
                  <p className="text-[11.5px] mt-[2px]" style={{ color: tok.M }}>
                    Usually much sooner - weekdays 9am–7pm PKT
                  </p>
                </div>
              </div>

              {/* Direct contact */}
              <div
                className="rounded-2xl px-5 py-5 space-y-3"
                style={{ background: tok.Cd, border: `1px solid ${tok.Br}` }}
              >
                <p
                  className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-3"
                  style={{ color: tok.M }}
                >
                  Prefer to reach out directly?
                </p>
                {[
                  { icon: <Mail size={13} />, label: "hello@webaurix.com", href: "mailto:hello@webaurix.com" },
                  { icon: <Phone size={13} />, label: "+92 300 000 0000", href: "tel:+923000000000" },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-2.5 text-[13px] font-medium w-fit"
                    style={{
                      color: tok.M,
                      transition: "color 0.18s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = tok.A; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = tok.M; }}
                  >
                    <span style={{ color: tok.A }}>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookConsultation;
