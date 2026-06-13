import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Code2,
  Handshake,
  Target,
  Eye,
  Star,
  TrendingUp,
  Plus,
  Minus,
} from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

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

/* ── fade-up helper ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

/* ════════════════════════════════
   ACCORDION ITEM
═══════════════════════════════════ */
const AccordionItem = ({ number, title, content, isOpen, onToggle, tok }) => (
  <div
    className="py-7"
    style={{ borderBottom: `1px solid ${tok.Br}` }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 text-left"
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <span
          className="text-[13px] font-bold tabular-nums flex-shrink-0"
          style={{ color: `${tok.A}70` }}
        >
          {number}
        </span>
        <span
          className="text-[18px] sm:text-[22px] font-bold tracking-tight"
          style={{ color: isOpen ? tok.A : tok.P, transition: "color 0.2s ease" }}
        >
          {title}
        </span>
      </div>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: isOpen ? `${tok.A}15` : `${tok.Br}`,
          color: isOpen ? tok.A : tok.M,
          transition: "background 0.2s ease",
        }}
      >
        <Plus size={16} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p
            className="mt-5 pl-[52px] text-[14px] sm:text-[15px] leading-[1.82]"
            style={{ color: tok.M }}
          >
            {content}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
const AboutUs = () => {
  const { isDark } = useTheme();
  const t = tk(isDark);
  const [openSection, setOpenSection] = useState("mission");

  const toggle = (key) => setOpenSection(openSection === key ? null : key);

  const pillars = [
    {
      icon: <Zap size={20} />,
      title: "Speed & Performance",
      desc: "Blazing-fast builds optimised for every device - Core Web Vitals first, always.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure & Reliable",
      desc: "Security isn't an afterthought. Every layer is reviewed, tested, and hardened.",
    },
    {
      icon: <Code2 size={20} />,
      title: "Modern Tech Stack",
      desc: "React, Node, cloud-native - we pick the right tools, not the trendy ones.",
    },
    {
      icon: <Handshake size={20} />,
      title: "Long-Term Partnership",
      desc: "We're in it for the journey. Post-launch support, iteration, and growth - together.",
    },
  ];

  const mvvg = [
    {
      key: "mission",
      number: "01",
      title: "Our Mission",
      icon: <Target size={18} />,
      content:
        "At Webaurix, our mission is to empower businesses with cutting-edge digital solutions that drive growth, spark innovation, and deliver measurable results. We craft websites, apps, and digital experiences that are not only beautifully designed but strategically built to perform - turning ideas into scalable realities for startups and enterprises alike.",
    },
    {
      key: "vision",
      number: "02",
      title: "Our Vision",
      icon: <Eye size={18} />,
      content:
        "To become a globally recognized digital innovation hub that transforms the way businesses connect, operate, and grow online. We aim to lead the future of web development by blending creativity with technology - delivering solutions that are intuitive, scalable, and future-ready. Every brand deserves powerful tools to elevate their presence.",
    },
    {
      key: "values",
      number: "03",
      title: "Our Values",
      icon: <Star size={18} />,
      content:
        "Innovation, integrity, and passion guide everything we do. We create digital experiences that exceed expectations with creativity and purpose. Honesty and transparency shape every client interaction; quality ensures every project reflects our best work. Collaboration is our culture - we grow through teamwork, learning from each other and from every challenge.",
    },
    {
      key: "goals",
      number: "04",
      title: "Our Goals",
      icon: <TrendingUp size={18} />,
      content:
        "To build digital solutions that truly matter. We help startups and businesses grow online through smart design, modern technologies, and powerful user experiences. We strive to stay ahead in innovation, build long-term client partnerships, and create a name that stands for quality, creativity, and reliability in the digital world.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "6", label: "Core Services" },
    { value: "24h", label: "Avg. Response Time" },
  ];

  return (
    <div className="w-full min-h-screen" style={{ background: t.bg }}>
      <Helmet>
        <title>About Webaurix | Our Story, Team & Digital Mission</title>
        <meta
          name="description"
          content="Learn who we are, what drives us, and why businesses trust Webaurix - a digital agency designing and building web, app, and AI products."
        />
        <meta name="keywords" content="about Webaurix, digital agency, software company, web development team, our story, Webaurix mission" />
        <link rel="canonical" href="https://www.webaurix.com/about" />
      </Helmet>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24 px-5 sm:px-10 lg:px-16">
        {/* ambient glow */}
        <div
          className="absolute inset-x-0 top-0 h-[70%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${t.A}16, transparent)`,
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p
            {...fadeUp(0)}
            className="text-[11px] font-extrabold tracking-[0.26em] uppercase mb-5"
            style={{ color: t.A }}
          >
            Who We Are
          </motion.p>

          <motion.h1
            {...fadeUp(0.07)}
            className="text-[36px] sm:text-[58px] lg:text-[78px] font-bold leading-[1.04] tracking-[-0.03em] mb-6 max-w-[900px]"
            style={{ color: t.P }}
          >
            We build digital products
            <br className="hidden sm:block" />{" "}
            that{" "}
            <span style={{ color: t.A }}>grow businesses.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.14)}
            className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[500px] mb-10"
            style={{ color: t.M }}
          >
            Webaurix is a full-service digital studio crafting web apps, mobile
            products, and custom software for brands that want to stand out and scale.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-wrap items-center gap-3"
          >
            <Link to="/start-project">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer"
                style={{ background: t.A, color: isDark ? "#0b0b0e" : "#fff" }}
              >
                <Zap size={14} /> Start a Project
              </motion.span>
            </Link>
            <Link to="/book-consultation">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer"
                style={{
                  border: `1px solid ${t.Br}`,
                  color: t.M,
                  transition: "color 0.18s ease, border-color 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = t.P;
                  e.currentTarget.style.borderColor = `${t.A}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = t.M;
                  e.currentTarget.style.borderColor = t.Br;
                }}
              >
                Book a Consultation <ArrowUpRight size={14} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${t.A}22,transparent)` }}
        />
      </section>

      {/* ══════════════════════════════
          STATS
      ══════════════════════════════ */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className="flex flex-col gap-1"
              >
                <span
                  className="text-[2.4rem] sm:text-[3rem] font-black leading-none tracking-tight"
                  style={{ color: t.P }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: t.M }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHO WE ARE (two-column)
      ══════════════════════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* text */}
          <div>
            <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-4" style={{ color: t.A }}>
              Our Story
            </motion.p>
            <motion.h2 {...fadeUp(0.06)} className="text-[28px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-tight mb-6" style={{ color: t.P }}>
              Built on craft,{" "}
              <span style={{ color: t.A }}>driven by results.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="text-[14px] sm:text-[15px] leading-[1.85] mb-5" style={{ color: t.M }}>
              Webaurix was founded with a simple belief: great digital products
              come from the intersection of thoughtful design, clean engineering,
              and genuine care for the client's goals. We're a team of designers,
              developers, and strategists who've worked across industries -
              from funded startups to established enterprises.
            </motion.p>
            <motion.p {...fadeUp(0.17)} className="text-[14px] sm:text-[15px] leading-[1.85]" style={{ color: t.M }}>
              Every project we take on is treated as our own. We ask the hard
              questions, push back when needed, and show up as long-term partners
              - not one-time vendors. That's the Webaurix way.
            </motion.p>
          </div>

          {/* visual card grid */}
          <motion.div
            {...fadeUp(0.1)}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { label: "Founded", value: "2022" },
              { label: "Team Size", value: "12+" },
              { label: "Countries Served", value: "8+" },
              { label: "Industries", value: "10+" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={{ background: t.Cd, border: `1px solid ${t.Br}` }}
              >
                <span
                  className="text-[2rem] sm:text-[2.4rem] font-black leading-none tracking-tight"
                  style={{ color: t.A }}
                >
                  {item.value}
                </span>
                <span className="text-[12px] font-semibold" style={{ color: t.M }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          MISSION / VISION / VALUES / GOALS
      ══════════════════════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                What Drives Us
              </motion.p>
              <motion.h2 {...fadeUp(0.06)} className="text-[28px] sm:text-[42px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                Purpose, principles,{" "}
                <span style={{ color: t.A }}>and progress.</span>
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.1)} className="text-[13.5px] leading-[1.75] max-w-[260px] sm:text-right shrink-0" style={{ color: t.M }}>
              The beliefs and commitments that shape how we work every day.
            </motion.p>
          </div>

          {/* accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ borderTop: `1px solid ${t.Br}` }}
          >
            {mvvg.map((item) => (
              <AccordionItem
                key={item.key}
                number={item.number}
                title={item.title}
                content={item.content}
                isOpen={openSection === item.key}
                onToggle={() => toggle(item.key)}
                tok={t}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          VALUES / PILLARS (4-col grid)
      ══════════════════════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-16 sm:py-24"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3" style={{ color: t.A }}>
                Why Choose Us
              </motion.p>
              <motion.h2 {...fadeUp(0.06)} className="text-[28px] sm:text-[42px] font-bold leading-[1.1] tracking-tight" style={{ color: t.P }}>
                What every{" "}
                <span style={{ color: t.A }}>Webaurix project</span> includes.
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-6 flex flex-col gap-4 cursor-default"
                style={{
                  background: t.Cd,
                  border: `1px solid ${t.Br}`,
                  transition: "border-color 0.2s ease, background 0.2s ease",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.A}38`;
                  e.currentTarget.style.background = isDark
                    ? "rgba(104,181,204,0.05)"
                    : "rgba(14,116,144,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.Br;
                  e.currentTarget.style.background = t.Cd;
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${t.A}14`, color: t.A, border: `1px solid ${t.A}22` }}
                >
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-bold leading-snug" style={{ color: t.P }}>
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.75]" style={{ color: t.M }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section
        className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20"
        style={{ borderTop: `1px solid ${t.Br}` }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{
              background: t.Cd,
              border: `1px solid ${t.Br}`,
            }}
          >
            {/* radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 80% at 0% 50%, ${t.A}10, transparent)`,
              }}
            />

            <div className="relative z-10 max-w-[560px]">
              <p
                className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-3"
                style={{ color: t.A }}
              >
                Ready to build something great?
              </p>
              <h2
                className="text-[24px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-tight"
                style={{ color: t.P }}
              >
                Let's turn your idea into a{" "}
                <span style={{ color: t.A }}>real product.</span>
              </h2>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/start-project">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer whitespace-nowrap"
                  style={{
                    background: t.A,
                    color: isDark ? "#0b0b0e" : "#ffffff",
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
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[13.5px] font-semibold cursor-pointer whitespace-nowrap"
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

export default AboutUs;
