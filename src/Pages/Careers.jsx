import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, MapPin, Clock, Briefcase, ChevronDown,
  Laptop, Heart, TrendingUp, Users, Coffee, Globe,
  CheckCircle2, Send, X,
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const tk = (isDark) => ({
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

const PERKS = [
  { icon: <Laptop size={18} />, title: "Remote-First", desc: "Work from anywhere. We trust our team to do great work on their own schedule." },
  { icon: <TrendingUp size={18} />, title: "Fast Growth", desc: "Real ownership, real impact. You'll grow faster here than anywhere else." },
  { icon: <Heart size={18} />, title: "Health Benefits", desc: "Comprehensive health coverage for you and your dependents." },
  { icon: <Globe size={18} />, title: "Global Projects", desc: "Work on products used by clients across 8+ countries." },
  { icon: <Coffee size={18} />, title: "Flexible Hours", desc: "Async-friendly culture. We care about output, not clock-in times." },
  { icon: <Users size={18} />, title: "Great Team", desc: "Work alongside talented people who care deeply about their craft." },
];

const PROCESS = [
  { step: "01", title: "Apply Online", desc: "Submit your application with your CV and portfolio. We review every application personally." },
  { step: "02", title: "Initial Call", desc: "A quick 20-minute intro call to get to know you and answer your questions." },
  { step: "03", title: "Skills Assessment", desc: "A practical task or portfolio review relevant to the role, nothing excessive." },
  { step: "04", title: "Final Interview", desc: "Meet the team, go deeper on the role, and decide together if it's a great fit." },
];

/* ── Apply Modal ── */
const ApplyModal = ({ job, onClose, isDark, t }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", portfolio: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await addDoc(collection(db, "job_applications"), {
        ...form,
        jobTitle: job.title,
        department: job.department,
        createdAt: serverTimestamp(),
      });
      setDone(true);
    } catch (_) {}
    setLoading(false);
  };

  const inputStyle = (err) => ({
    background: t.inputBg,
    border: `1px solid ${err ? "#f87171" : t.inputBorder}`,
    color: t.P,
    transition: "border-color 0.18s ease",
    outline: "none",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[560px] max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-3xl flex flex-col"
        style={{ background: isDark ? "#080f14" : "#ffffff", border: `1px solid ${t.Br}` }}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: `1px solid ${t.Br}` }}>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: t.A }}>{job.department}</p>
            <h3 className="text-[18px] font-bold" style={{ color: t.P }}>Apply for {job.title}</h3>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: t.Cd, color: t.M, border: `1px solid ${t.Br}` }}>
            <X size={15} />
          </motion.button>
        </div>

        <div className="px-6 py-5 flex-1">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${t.A}15`, color: t.A }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-[20px] font-bold" style={{ color: t.P }}>Application Sent!</h4>
                <p className="text-[13px] leading-[1.75] max-w-[320px]" style={{ color: t.M }}>
                  Thanks for applying. We'll review your application and get back to you within{" "}
                  <span style={{ color: t.A, fontWeight: 600 }}>3-5 business days.</span>
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-4">
                {[
                  { label: "Full Name", key: "name", placeholder: "Ahmed Raza", required: true },
                  { label: "Email Address", key: "email", placeholder: "you@example.com", required: true, type: "email" },
                  { label: "Phone Number", key: "phone", placeholder: "+92 300 0000000", type: "tel" },
                  { label: "Portfolio / LinkedIn / GitHub", key: "portfolio", placeholder: "https://..." },
                ].map(({ label, key, placeholder, required, type = "text" }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-semibold" style={{ color: t.M }}>
                      {label}{required && <span style={{ color: t.A }}> *</span>}
                    </label>
                    <input type={type} placeholder={placeholder} value={form[key]} onChange={set(key)}
                      className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                      style={inputStyle(errors[key])}
                      onFocus={(e) => { e.target.style.borderColor = t.A; }}
                      onBlur={(e) => { e.target.style.borderColor = errors[key] ? "#f87171" : t.inputBorder; }}
                    />
                    {errors[key] && <p className="text-[11px]" style={{ color: "#f87171" }}>{errors[key]}</p>}
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold" style={{ color: t.M }}>Why do you want to join Webaurix?</label>
                  <textarea rows={4} value={form.message} onChange={set("message")}
                    placeholder="Tell us a bit about yourself and why this role excites you..."
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] resize-none"
                    style={{ ...inputStyle(false), lineHeight: 1.7 }}
                    onFocus={(e) => { e.target.style.borderColor = t.A; }}
                    onBlur={(e) => { e.target.style.borderColor = t.inputBorder; }}
                  />
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[13.5px] font-bold mt-2 disabled:opacity-60"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}>
                  {loading
                    ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 rounded-full border-current border-t-transparent" />Submitting...</>
                    : <><Send size={14} /> Submit Application</>}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Job Card ── */
const JobCard = ({ job, t, isDark }) => {
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{ background: t.Cd, border: `1px solid ${t.Br}`, transition: "border-color 0.2s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${t.A}35`; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.Br; }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2.5 py-[3px] rounded-full text-[10.5px] font-bold tracking-wide mb-3"
                style={{ background: `${t.A}14`, color: t.A }}>
                {job.department}
              </span>
              <h3 className="text-[17px] sm:text-[19px] font-bold leading-snug mb-3" style={{ color: t.P }}>
                {job.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <MapPin size={11} />, label: job.location },
                  { icon: <Clock size={11} />, label: job.type },
                  { icon: <Briefcase size={11} />, label: job.experience },
                ].filter(m => m.label).map((m, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: t.M }}>
                    <span style={{ color: `${t.A}90` }}>{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setApplying(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-bold"
                style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}>
                Apply <ArrowUpRight size={13} />
              </motion.button>
              <button onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-[11.5px] font-semibold px-2 py-1"
                style={{ color: t.M, transition: "color 0.15s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = t.P; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = t.M; }}>
                {open ? "Less" : "Details"}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                  <ChevronDown size={13} />
                </motion.span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pt-2" style={{ borderTop: `1px solid ${t.Br}` }}>
                <p className="text-[13.5px] leading-[1.8] mb-6 mt-4" style={{ color: t.M }}>{job.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { heading: "Responsibilities", items: job.responsibilities },
                    { heading: "Requirements", items: job.requirements },
                  ].map(({ heading, items }) => (
                    <div key={heading}>
                      <p className="text-[12px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: t.A }}>{heading}</p>
                      <ul className="space-y-2">
                        {(items || []).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: t.M }}>
                            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[7px]" style={{ background: `${t.A}60` }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setApplying(true)}
                  className="mt-7 flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}>
                  Apply for This Role <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {applying && <ApplyModal job={job} onClose={() => setApplying(false)} isDark={isDark} t={t} />}
      </AnimatePresence>
    </>
  );
};

/* ════════════════════════════════
   MAIN PAGE
════════════════════════════════ */
const Careers = () => {
  const { isDark } = useTheme();
  const t = tk(isDark);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [activeDept, setActiveDept] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "job_postings"));
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((j) => j.active === true)
          .sort((a, b) => {
            const ao = a.order ?? 999;
            const bo = b.order ?? 999;
            if (ao !== bo) return ao - bo;
            const at = a.createdAt?.toDate?.() ?? new Date(0);
            const bt = b.createdAt?.toDate?.() ?? new Date(0);
            return at - bt;
          });
        setJobs(data);
      } catch (_) {}
      setJobsLoading(false);
    })();
  }, []);

  const departments = ["All", ...new Set(jobs.map((j) => j.department).filter(Boolean))];
  const filtered = activeDept === "All" ? jobs : jobs.filter((j) => j.department === activeDept);

  return (
    <div className="w-full min-h-screen" style={{ background: t.bg }}>
      <Helmet>
        <title>Careers at Webaurix | Jobs in Web, App &amp; AI Development</title>
        <meta name="description" content="Join the Webaurix team. We're hiring designers, developers, and marketers who love building great digital products. Explore open roles." />
        <meta name="keywords" content="Webaurix careers, tech jobs Pakistan, web developer jobs, designer jobs, remote tech jobs, hiring developers" />
        <link rel="canonical" href="https://www.webaurix.com/careers" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24 px-5 sm:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-[65%] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${t.A}16, transparent)` }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-extrabold tracking-[0.26em] uppercase mb-5" style={{ color: t.A }}>
            Join Our Team
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] sm:text-[58px] lg:text-[76px] font-bold leading-[1.04] tracking-[-0.03em] mb-6 max-w-[860px]"
            style={{ color: t.P }}>
            Build the future of{" "}
            <span style={{ color: t.A }}>digital.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[500px] mb-10" style={{ color: t.M }}>
            We're a small, ambitious team shipping world-class digital products.
            If you care deeply about your craft, you'll fit right in.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 items-center">
            <a href="#open-roles">
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer"
                style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}>
                <Briefcase size={14} /> View Open Roles
              </motion.span>
            </a>
            {!jobsLoading && (
              <span className="text-[13px] font-medium" style={{ color: t.M }}>
                {jobs.length} {jobs.length === 1 ? "position" : "positions"} open
              </span>
            )}
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${t.A}22,transparent)` }} />
      </section>

      {/* PERKS */}
      <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Life at Webaurix
              </motion.p>
              <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[40px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Why people <span style={{ color: t.A }}>love working here.</span>
              </motion.h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map((perk, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-6 flex items-start gap-4 cursor-default"
                style={{ background: t.Cd, border: `1px solid ${t.Br}`, willChange: "transform", transition: "border-color 0.2s ease, background 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${t.A}35`; e.currentTarget.style.background = isDark ? "rgba(104,181,204,0.05)" : "rgba(14,116,144,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.Br; e.currentTarget.style.background = t.Cd; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${t.A}14`, color: t.A, border: `1px solid ${t.A}22` }}>
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold mb-1.5" style={{ color: t.P }}>{perk.title}</h3>
                  <p className="text-[13px] leading-[1.75]" style={{ color: t.M }}>{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="open-roles" className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Open Positions
              </motion.p>
              <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[40px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Find your <span style={{ color: t.A }}>perfect role.</span>
              </motion.h2>
            </div>
            {!jobsLoading && departments.length > 1 && (
              <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2">
                {departments.map((dept) => {
                  const isActive = activeDept === dept;
                  return (
                    <button key={dept} onClick={() => setActiveDept(dept)}
                      className="px-4 py-1.5 rounded-full text-[12px] font-semibold flex-shrink-0"
                      style={{
                        background: isActive ? t.A : "transparent",
                        color: isActive ? (isDark ? "#0b0b0e" : "#fff") : t.M,
                        border: `1px solid ${isActive ? t.A : t.Br}`,
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = `${t.A}50`; e.currentTarget.style.color = t.P; } }}
                      onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = t.Br; e.currentTarget.style.color = t.M; } }}>
                      {dept}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {jobsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ background: t.Cd, border: `1px solid ${t.Br}` }}>
                  <div className="h-3 rounded-full w-1/4 mb-4" style={{ background: t.Br }} />
                  <div className="h-5 rounded-full w-1/2 mb-4" style={{ background: t.Br }} />
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => <div key={j} className="h-6 rounded-full w-24" style={{ background: t.Br }} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl py-20 text-center" style={{ border: `1px solid ${t.Br}`, background: t.Cd }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: `${t.A}12`, color: t.A }}>
                <Briefcase size={24} />
              </div>
              <p className="text-[16px] font-semibold mb-2" style={{ color: t.P }}>No open positions right now</p>
              <p className="text-[13px] max-w-[300px] mx-auto leading-[1.7]" style={{ color: t.M }}>
                Check back soon or send us an open application below.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeDept}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} t={t} isDark={isDark} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
              Our Process
            </motion.p>
            <motion.h2 {...fadeUp(0.06)} className="text-[26px] sm:text-[40px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
              Simple, transparent, <span style={{ color: t.A }}>respectful.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-[14px] sm:text-[15px] leading-[1.8] max-w-[460px] mx-auto mt-4" style={{ color: t.M }}>
              No ghosting. No trick questions. Just an honest conversation to see if we're a great match.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ background: t.Cd, border: `1px solid ${t.Br}` }}>
                <span className="text-[28px] font-black leading-none" style={{ color: `${t.A}50` }}>{step.step}</span>
                <h3 className="text-[15px] font-bold" style={{ color: t.P }}>{step.title}</h3>
                <p className="text-[13px] leading-[1.75]" style={{ color: t.M }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20" style={{ borderTop: `1px solid ${t.Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 55% 80% at 0% 50%, ${t.A}10, transparent)` }} />
            <div className="relative z-10 max-w-[520px]">
              <p className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Don't see a perfect fit?
              </p>
              <h2 className="text-[22px] sm:text-[34px] lg:text-[42px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Send us an open <span style={{ color: t.A }}>application.</span>
              </h2>
              <p className="text-[14px] leading-[1.8] mt-4" style={{ color: t.M }}>
                We're always looking for exceptional talent. If you think you'd be a great fit,
                drop us a message and we'd love to hear from you.
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0">
              <a href="mailto:careers@webaurix.com">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer whitespace-nowrap"
                  style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff", boxShadow: `0 6px 24px ${t.A}35` }}>
                  <Send size={14} /> Email Your CV
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
