import React, { useState, useRef } from "react";
import Seo from "../components/Seo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Mail, Phone, CheckCircle2, Clock, Users, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const initialForm = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
  companyUrl: "",
  budget: "",
  categories: [],
  otherCategoryDetail: "",
  projectDetails: "",
};

const categoryOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-commerce",
  "SaaS Product",
  "Other",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  style: { willChange: "transform, opacity" },
});

/* ── clean input ── */
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold tracking-wide" style={{ color: "var(--bt-muted)" }}>
        {label}{required && <span style={{ color: "var(--bt-accent)" }}> *</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11.5px]" style={{ color: "#f87171" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ name, type = "text", value, onChange, placeholder, autoComplete }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="bt-input w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200"
      style={{ background: "var(--bt-input-bg)", border: "1px solid var(--bt-input-border)", color: "var(--bt-primary)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--bt-accent)"; e.currentTarget.style.background = "var(--bt-input-focus-bg)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bt-input-border)"; e.currentTarget.style.background = "var(--bt-input-bg)"; }}
    />
  );
}

function Textarea({ name, value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="bt-input w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-all duration-200 resize-none"
      style={{ background: "var(--bt-input-bg)", border: "1px solid var(--bt-input-border)", color: "var(--bt-primary)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--bt-accent)"; e.currentTarget.style.background = "var(--bt-input-focus-bg)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--bt-input-border)"; e.currentTarget.style.background = "var(--bt-input-bg)"; }}
    />
  );
}

export default function BusinessTalk({ standalone = false }) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* css vars for input theming */
  const cssVars = {
    "--bt-primary":         isDark ? "#f0eeec" : "#0c0c10",
    "--bt-muted":           isDark ? "rgba(240,238,236,0.45)" : "rgba(12,12,16,0.45)",
    "--bt-accent":          isDark ? "#68b5cc" : "#0e7490",
    "--bt-input-bg":        isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    "--bt-input-focus-bg":  isDark ? "rgba(104,181,204,0.05)" : "rgba(14,116,144,0.04)",
    "--bt-input-border":    isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)",
  };

  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const cardBg  = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)";

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim())  e.firstName  = "Required";
    if (!formData.lastName.trim())   e.lastName   = "Required";
    if (!formData.companyName.trim()) e.companyName = "Required";
    if (!formData.email.trim())      e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phoneNumber.trim()) e.phoneNumber = "Required";
    else if (formData.phoneNumber.replace(/\D/g, "").length < 10) e.phoneNumber = "Invalid number";
    if (formData.categories.length === 0) e.categories = "Select at least one";
    if (formData.categories.includes("Other") && !formData.otherCategoryDetail.trim())
      e.otherCategoryDetail = "Required";
    if (!formData.projectDetails.trim()) e.projectDetails = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "categories") {
      setFormData((p) => ({
        ...p,
        categories: checked ? [...p.categories, value] : p.categories.filter((c) => c !== value),
      }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const ref = await addDoc(collection(db, "businessInquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSuccess(true);
      setFormData(initialForm);
      setTimeout(() => setSuccess(false), 5000);

      /* Fire-and-forget AI auto-reply (drafts AND sends via Gmail, no
         approval) — never affects the visitor's success state if it fails
         (e.g. daily AI quota exhausted or Gmail secrets not configured). */
      (async () => {
        try {
          const res = await fetch("/api/ai-manager/auto-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              collection: "businessInquiries",
              docId: ref.id,
              name: `${formData.firstName} ${formData.lastName}`.trim(),
              email: formData.email,
              service: Array.isArray(formData.categories) ? formData.categories.join(", ") : formData.categories,
              budget: formData.budget,
              message: formData.projectDetails,
            }),
          });
          if (!res.ok) return;
          const { draft, sent } = await res.json();
          if (draft) {
            await updateDoc(ref, {
              aiDraft: draft,
              aiDraftStatus: sent ? "sent" : "failed",
              aiDraftSentAt: sent ? serverTimestamp() : null,
            });
          }
        } catch {
          /* silent — admin can still click "Generate AI Draft" / "Send Now" manually */
        }
      })();
    } catch (_) {
      setSubmitError("Something went wrong. Please try again.");
      setTimeout(() => setSubmitError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (cat) => {
    setFormData((p) => ({
      ...p,
      categories: p.categories.includes(cat)
        ? p.categories.filter((c) => c !== cat)
        : [...p.categories, cat],
    }));
    setErrors((p) => ({ ...p, categories: "" }));
  };

  return (
    <section
      id="business-talk"
      ref={ref}
      style={{ background: bg, ...cssVars }}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {standalone && (
        <Seo
          title="Start a Project | Get a Custom Web, App & AI Quote – Webaurix"
          description="Tell Webaurix about your web development, mobile app, or AI project and get a tailored quote within 24 hours. Serving clients in Pakistan, South Korea, the US, and the UK."
          keywords="start a project, web development quote, app development quote, hire web developers, AI project quote, Webaurix"
          path="/start-project"
          noindex
        />
      )}

      {/* top accent line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── HEADER ── */}
        <div className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p {...fadeUp(0)} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: accent }}>
              Let's Talk
            </motion.p>
            <motion.h2 {...fadeUp(0.07)} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]" style={{ color: primary }}>
              Ready to build{" "}
              <span style={{ color: accent }}>something?</span>
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.14)} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="max-w-[300px] text-[14px] leading-relaxed shrink-0" style={{ color: muted }}>
            Fill in the form and we'll get back to you within 24 hours to discuss your project.
          </motion.p>
        </div>

        {/* ── BODY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-8 lg:gap-12 items-start">

          {/* ── LEFT ── */}
          <motion.div {...fadeUp(0.18)} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="order-2 lg:order-1 lg:sticky lg:top-28 flex flex-col gap-6">

            {/* what to expect */}
            <div className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: cardBg, border: `1px solid ${border}` }}>
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase" style={{ color: accent }}>
                What to expect
              </p>
              {[
                { icon: Clock,  text: "Response within 24 hours" },
                { icon: Users,  text: "Free 30-min discovery call" },
                { icon: CheckCircle2, text: "No commitment required" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}12`, color: accent }}>
                    <Icon size={14} />
                  </div>
                  <span className="text-[13.5px]" style={{ color: muted }}>{text}</span>
                </div>
              ))}
            </div>

            {/* contact info */}
            <div className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: cardBg, border: `1px solid ${border}` }}>
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase" style={{ color: accent }}>
                Contact directly
              </p>
              {[
                { icon: Mail,  label: "contact@webaurix.com" },
                { icon: Phone, label: "+92 322 7831753" },
                { icon: Phone, label: "+92 332 4835793" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}12`, color: accent }}>
                    <Icon size={14} />
                  </div>
                  <span className="text-[13.5px]" style={{ color: muted }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT - FORM ── */}
          <motion.div {...fadeUp(0.24)} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            className="order-1 lg:order-2 rounded-2xl p-7 sm:p-9"
            style={{ background: cardBg, border: `1px solid ${border}` }}>

            {/* success toast */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-[13.5px] font-medium"
                  style={{ background: `${accent}14`, border: `1px solid ${accent}30`, color: accent }}
                >
                  <CheckCircle2 size={16} />
                  Inquiry submitted - we'll be in touch shortly!
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl px-4 py-3 mb-6 text-[13.5px]"
                  style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171" }}
                >
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name" required error={errors.firstName}>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" autoComplete="given-name" />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" autoComplete="family-name" />
                </Field>
              </div>

              {/* company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Company Name" required error={errors.companyName}>
                  <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Inc." autoComplete="organization" />
                </Field>
                <Field label="Company URL">
                  <Input name="companyUrl" value={formData.companyUrl} onChange={handleChange} placeholder="https://example.com" />
                </Field>
              </div>

              {/* email + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Email Address" required error={errors.email}>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" autoComplete="email" />
                </Field>
                <Field label="Phone Number" required error={errors.phoneNumber}>
                  <PhoneInput
                    country="pk"
                    value={formData.phoneNumber}
                    onChange={(val) => setFormData((p) => ({ ...p, phoneNumber: val }))}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{
                      width: "100%",
                      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)"}`,
                      borderRadius: "12px",
                      color: primary,
                      fontSize: "14px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      height: "auto",
                    }}
                    buttonStyle={{
                      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)"}`,
                      borderRight: "none",
                      borderRadius: "12px 0 0 12px",
                    }}
                    dropdownStyle={{
                      background: isDark ? "#0d1017" : "#ffffff",
                      border: `1px solid ${border}`,
                      borderRadius: "12px",
                      color: primary,
                    }}
                  />
                </Field>
              </div>

              {/* budget */}
              <Field label="Budget (Optional)">
                <Input name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. $2,000 – $5,000" />
              </Field>

              {/* categories - pill chips */}
              <Field label="Project Category" required error={errors.categories}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {categoryOptions.map((cat) => {
                    const active = formData.categories.includes(cat);
                    return (
                      <motion.button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer transition-all duration-200"
                        style={{
                          background: active ? accent : "transparent",
                          color: active ? (isDark ? "#0b0b0e" : "#ffffff") : muted,
                          border: `1px solid ${active ? accent : border}`,
                        }}
                      >
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              </Field>

              {/* "Other" detail */}
              <AnimatePresence initial={false}>
                {formData.categories.includes("Other") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden", willChange: "height, opacity" }}
                  >
                    <Field label="Please specify" required error={errors.otherCategoryDetail}>
                      <Input name="otherCategoryDetail" value={formData.otherCategoryDetail} onChange={handleChange} placeholder="Describe your project type" />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* project details */}
              <Field label="Project Details" required error={errors.projectDetails}>
                <Textarea name="projectDetails" value={formData.projectDetails} onChange={handleChange}
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..." rows={4} />
              </Field>

              {/* submit */}
              <div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer transition-opacity duration-200"
                  style={{
                    background: accent,
                    color: isDark ? "#0b0b0e" : "#ffffff",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"
                        style={{ willChange: "transform" }}
                      />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }} />
    </section>
  );
}
