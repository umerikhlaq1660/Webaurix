import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { RefreshCcwDot, Loader2, CheckCircle, ArrowUpRight, ChevronRight } from "lucide-react";
import emailjs from "emailjs-com";
import IndustrySection from "../components/IndustrySection";
import serviceData from "../data/servicesData";
import serviceAliases from "../data/serviceAliases";
import Footer from "../components/Footer";
import BusinessTalk from "../Pages/BusinessTalk";
import { useTheme } from "../context/ThemeContext";

// ======================= FLIP CARD COMPONENT =======================
const FlipCard = ({ offer, isMobile, index }) => {
  const [flipped, setFlipped] = useState(false);
  const { isDark } = useTheme();
  const Icon = offer.icon || null;

  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.45)" : "rgba(12,12,16,0.48)";
  const frontBg = isDark ? "rgba(255,255,255,0.04)"  : "#ffffff";
  const backBg  = isDark ? `rgba(104,181,204,0.07)`  : `rgba(14,116,144,0.05)`;
  const frontBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const backBorder  = isDark ? `rgba(104,181,204,0.22)` : `rgba(14,116,144,0.2)`;

  return (
    <motion.div
      className="group perspective cursor-pointer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22,1,0.36,1] }}
      viewport={{ once: true }}
      onClick={() => isMobile && setFlipped(!flipped)}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className={`relative preserve-3d w-full h-[300px] transition-transform duration-700 ${
          isMobile ? (flipped ? "[transform:rotateY(180deg)]" : "") : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between backface-hidden overflow-hidden"
          style={{ background: frontBg, border: `1px solid ${frontBorder}` }}
        >
          {/* icon */}
          <div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
            >
              {Icon && <Icon style={{ width:22, height:22, color: accent }} />}
            </div>
            <h3 className="text-[19px] font-bold leading-snug mb-2" style={{ color: primary }}>
              {offer.title}
            </h3>
            <p className="text-[13px] leading-[1.75]" style={{ color: muted }}>
              {offer.short || offer.subtitle}
            </p>
          </div>

          {/* flip hint */}
          <div className="flex items-center gap-2 self-end">
            <span className="text-[11px] font-semibold tracking-wide" style={{ color: `${accent}70` }}>
              {isMobile ? "Tap to flip" : "Hover to flip"}
            </span>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              style={{ color: accent }}
            >
              <RefreshCcwDot size={18} />
            </motion.div>
          </div>

          {/* decorative corner accent */}
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-bl-[60px] rounded-tr-2xl pointer-events-none"
            style={{ background: `${accent}08` }}
          />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-center rotate-y-180 backface-hidden"
          style={{ background: backBg, border: `1px solid ${backBorder}` }}
        >
          {/* accent line */}
          <div className="w-8 h-[2px] rounded-full mb-5" style={{ background: accent }} />
          <h4 className="text-[15px] font-bold mb-3" style={{ color: primary }}>{offer.title}</h4>
          <p className="text-[13px] leading-[1.8]" style={{ color: muted }}>
            {offer.descback}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ======================= FAQ ITEM COMPONENT =======================
const FAQItem = ({ faq, accent, primary, muted }) => {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const fA = accent  || (isDark ? "#68b5cc" : "#0e7490");
  const fP = primary || (isDark ? "#f0eeec" : "#0c0c10");
  const fM = muted   || (isDark ? "rgba(240,238,236,0.45)" : "rgba(12,12,16,0.48)");

  return (
    <div
      className="py-5 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-[15px] sm:text-[16px] font-semibold leading-snug" style={{ color: fP }}>
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[18px] font-bold mt-0.5"
          style={{ color: fA }}
        >+</motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
            style={{ overflow:"hidden" }}
          >
            <p className="pt-3 text-[13.5px] leading-[1.8]" style={{ color: fM }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ======================= MAIN SERVICE PAGE =======================
const ServicePage = () => {
  const { serviceSlug } = useParams();
  // Resolve aliases: a unique URL slug that reuses a parent service's body
  // but overrides the SEO-critical above-the-fold fields.
  const alias = serviceAliases[serviceSlug];
  const baseData = serviceData[alias ? alias.parent : serviceSlug];
  const data = baseData ? (alias ? { ...baseData, ...alias } : baseData) : null;
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Form / modal state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [showChatbotForm, setShowChatbotForm] = useState(false);
  const [chatbotFormData, setChatbotFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: ""
  });
  const [chatbotLoading, setChatbotLoading] = useState(false);
  const [chatbotSuccess, setChatbotSuccess] = useState("");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!data) return <div className="text-white p-10">Service Not Found</div>;

const handleChatbotChange = (e) => {
  setChatbotFormData({ ...chatbotFormData, [e.target.name]: e.target.value });
};
const handleChatbotSubmit = async (e) => {
  e.preventDefault();
  setChatbotLoading(true);
  setChatbotSuccess("");

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_dummy",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_dummy",
      {
        from_name: chatbotFormData.name,
        from_email: chatbotFormData.email,
        company_name: chatbotFormData.company,
        website_url: chatbotFormData.website,
        message: chatbotFormData.message
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "key_dummy"
    );

    setChatbotSuccess("✅ Our team will send your free chatbot shortly!");
    setChatbotFormData({ name: "", email: "", company: "", website: "", message: "" });
  } catch (error) {
    console.error("EmailJS Error:", error);
    setChatbotSuccess("❌ Something went wrong. Try again!");
  } finally {
    setChatbotLoading(false);
  }
};

  const {
    stagesHeading = "STAGES OF WORK",
    offersHeading = "Our Capabilities",
    techStackHeading = "Tech Stack",
    customSection,
    customChatbot,
    customTechStack,
  } = data;

  const steps = data.stages || [];
  const offers = data.offers || [];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Submit handler - EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      // ensure env variables exist
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID_CUSTOM_CARD;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOM_CARD;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_CUSTOM_CARD;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS keys missing. Make sure .env vars are set.");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        website_url: formData.website,
        message: formData.message,
        service: data.bannerTitle || serviceSlug,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSuccessMsg("Our team will analyze your site soon!");
      setFormData({ name: "", email: "", website: "", message: "" });

      // auto-close modal after a short delay
      setTimeout(() => {
        setShowForm(false);
      }, 1200);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSuccessMsg(" went wrong. Please try again later.");
    } finally {
      setLoading(false);
      // clear success message after some time
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };
 
  return (
    
    <div className="w-full bg-black text-white">
      <Helmet>
        <title>
          {data.seo?.title || data.bannerTitle}
        </title>
      
        <meta
          name="description"
          content={data.seo?.description || data.bannerSubtitle}
        />
      
        <link
          rel="canonical"
          href={`https://www.webaurix.com/services/${serviceSlug}`}
        />
      
        <meta property="og:title" content={data.seo?.title || data.bannerTitle} />
        <meta property="og:description" content={data.seo?.description || data.bannerSubtitle} />
        <meta property="og:type" content="website" />
      
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo?.title || data.bannerTitle} />
        <meta name="twitter:description" content={data.seo?.description || data.bannerSubtitle} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: data.bannerLabel,
            name: data.seo?.title || data.bannerTitle,
            description: data.seo?.description || data.bannerSubtitle,
            url: `https://www.webaurix.com/services/${serviceSlug}`,
            provider: {
              "@type": "Organization",
              name: "Webaurix",
              url: "https://www.webaurix.com/",
            },
            areaServed: { "@type": "Place", name: "Worldwide" },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.webaurix.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.webaurix.com/#services" },
              { "@type": "ListItem", position: 3, name: data.bannerLabel, item: `https://www.webaurix.com/services/${serviceSlug}` },
            ],
          })}
        </script>
      </Helmet>


      {/* ===== HERO SECTION ===== */}
      {(() => {
        const heroBg    = isDark
          ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
          : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
        const heroPrimary = isDark ? "#f0eeec" : "#0c0c10";
        const heroMuted   = isDark ? "rgba(240,238,236,0.4)" : "rgba(12,12,16,0.42)";
        const heroAccent  = isDark ? "#68b5cc" : "#0e7490";
        const heroBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
        const lineWrap    = { overflow: "hidden", paddingBottom: "0.45em", marginBottom: "-0.45em" };

        return (
          <div
            ref={heroRef}
            className="relative w-full min-h-screen flex flex-col overflow-hidden"
            style={{ background: heroBg }}
          >
            {/* shiny spots */}
            {[
              { top: "12%", left: "8%",  size: 14, delay: 0 },
              { top: "30%", right: "12%", size: 10, delay: 1.4 },
              { top: "65%", left: "55%", size: 8,  delay: 2.2 },
              { bottom: "20%", right: "6%", size: 12, delay: 0.8 },
            ].map((s, i) => (
              <motion.div key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: s.top, left: s.left, right: s.right, bottom: s.bottom,
                  width: s.size, height: s.size,
                  background: `radial-gradient(circle, ${heroAccent} 0%, transparent 70%)`,
                  opacity: isDark ? 0.5 : 0.3, filter: "blur(1px)",
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [isDark ? 0.5 : 0.3, isDark ? 0.9 : 0.5, isDark ? 0.5 : 0.3] }}
                transition={{ duration: 4, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {/* top radial tint */}
            <div className="absolute top-0 inset-x-0 h-[55%] pointer-events-none"
              style={{ background: isDark
                ? "radial-gradient(55% 40% at 30% 0%, rgba(104,181,204,0.08) 0%, transparent 100%)"
                : "radial-gradient(55% 40% at 30% 0%, rgba(14,116,144,0.05) 0%, transparent 100%)" }} />

            {/* content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-5 sm:px-10 lg:px-16 pt-28 pb-16">

              {/* breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 text-[11.5px] font-medium mb-8 flex-wrap"
                style={{ color: heroMuted }}
              >
                <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
                <ChevronRight size={11} />
                <span style={{ color: heroAccent }}>Services</span>
                <ChevronRight size={11} />
                <span style={{ color: heroPrimary }}>{data.bannerLabel}</span>
              </motion.div>

              {/* label */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] font-bold tracking-[0.22em] uppercase mb-5"
                style={{ color: heroAccent }}
              >
                {data.bannerLabel}
              </motion.p>

              {/* title - line reveal */}
              <div className="mb-6">
                {data.bannerTitle.split(" ").reduce((lines, word, i, arr) => {
                  const mid = Math.ceil(arr.length / 2);
                  if (i < mid) lines[0] = (lines[0] ? lines[0] + " " : "") + word;
                  else lines[1] = (lines[1] ? lines[1] + " " : "") + word;
                  return lines;
                }, ["", ""]).map((line, li) => (
                  <div key={li} style={lineWrap}>
                    <motion.h1
                      initial={{ y: "108%" }}
                      animate={heroInView ? { y: "0%" } : {}}
                      transition={{ delay: 0.18 + li * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[36px] sm:text-[52px] lg:text-[68px] xl:text-[80px] font-bold leading-[1.05] tracking-[-0.025em]"
                      style={{ color: li === 1 ? heroAccent : heroPrimary, willChange: "transform" }}
                    >
                      {line}
                    </motion.h1>
                  </div>
                ))}
              </div>

              {/* subtitle + CTAs */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.52, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[480px] text-[15px] sm:text-[16px] leading-[1.75]"
                  style={{ color: heroMuted }}
                >
                  {data.bannerSubtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.62, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0"
                >
                  <Link to="/start-project">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer w-full sm:w-auto"
                      style={{ background: heroAccent, color: isDark ? "#0b0b0e" : "#ffffff" }}
                    >
                      Start a Project <ArrowUpRight size={14} />
                    </motion.span>
                  </Link>
                  <Link to="/#services">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer w-full sm:w-auto"
                      style={{ border: `1px solid ${heroBorder}`, color: heroMuted, background: "transparent" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = heroPrimary; e.currentTarget.style.borderColor = `${heroAccent}40`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = heroMuted; e.currentTarget.style.borderColor = heroBorder; }}
                    >
                      View All Services
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              {/* bottom divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={heroInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 sm:mt-16 h-px"
                style={{ background: `linear-gradient(to right, ${heroAccent}40, transparent)`, transformOrigin: "left" }}
              />
            </div>
          </div>
        );
      })()}

      {/* ===== DEVELOPMENT LIFECYCLE ===== */}
      {steps.length > 0 && (() => {
        const sBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const sP  = isDark ? "#f0eeec"                : "#0c0c10";
        const sM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const sA  = isDark ? "#68b5cc"                : "#0e7490";
        const sBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

        return (
          <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: sBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${sA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

              {/* header */}
              <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <motion.p
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3"
                    style={{ color:sA }}
                  >How We Build</motion.p>
                  <motion.h2
                    initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ delay:0.06, duration:0.55, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[28px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
                    style={{ color:sP }}
                  >
                    Development <span style={{ color:sA }}>lifecycle.</span>
                  </motion.h2>
                </div>
                <motion.p
                  initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                  transition={{ delay:0.12, duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                  className="text-[14px] leading-relaxed max-w-[280px] sm:text-right"
                  style={{ color:sM }}
                >
                  Every step planned,<br />every decision purposeful.
                </motion.p>
              </div>

              {/* rows */}
              <div>
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, y:24 }}
                    whileInView={{ opacity:1, y:0 }}
                    transition={{ delay: i * 0.08, duration:0.55, ease:[0.22,1,0.36,1] }}
                    viewport={{ once:true }}
                    className="group relative"
                    style={{ willChange:"transform,opacity" }}
                  >
                    {/* animated top border */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px origin-left"
                      initial={{ scaleX:0 }}
                      whileInView={{ scaleX:1 }}
                      transition={{ delay: i * 0.08 + 0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
                      viewport={{ once:true }}
                      style={{ background: sBr, willChange:"transform" }}
                    />

                    {/* hover highlight */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{ background: isDark ? "rgba(104,181,204,0.03)" : "rgba(14,116,144,0.03)" }}
                    />

                    <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr_1.6fr] gap-x-6 lg:gap-x-12 py-8 sm:py-10 items-start">

                      {/* number */}
                      <span
                        className="text-[28px] sm:text-[32px] font-black tabular-nums leading-none pt-1"
                        style={{ color:`${sA}50`, transition:"color 0.2s ease" }}
                        onMouseEnter={e => e.currentTarget.style.color = sA}
                        onMouseLeave={e => e.currentTarget.style.color = `${sA}50`}
                      >
                        {String(i+1).padStart(2,"0")}
                      </span>

                      {/* title */}
                      <div>
                        <h3
                          className="text-[18px] sm:text-[22px] font-bold leading-snug transition-colors duration-200"
                          style={{ color:sP }}
                        >
                          {step.title}
                        </h3>
                        {/* desc on mobile / tablet */}
                        <p className="lg:hidden mt-2 text-[13.5px] leading-[1.8]" style={{ color:sM }}>
                          {step.desc}
                        </p>
                      </div>

                      {/* desc on desktop */}
                      <p className="hidden lg:block text-[14.5px] leading-[1.85] pt-1" style={{ color:sM }}>
                        {step.desc}
                      </p>
                    </div>

                    {/* last row bottom border */}
                    {i === steps.length - 1 && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px origin-left"
                        initial={{ scaleX:0 }}
                        whileInView={{ scaleX:1 }}
                        transition={{ delay: i * 0.08 + 0.2, duration:0.7, ease:[0.22,1,0.36,1] }}
                        viewport={{ once:true }}
                        style={{ background: sBr, willChange:"transform" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${sA}18,transparent)` }} />
          </section>
        );
      })()}

      {/* ===== CUSTOM SECTION (Performance Optimization CTA) ===== */}
      {customSection && (() => {
        const csBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const csP  = isDark ? "#f0eeec"                : "#0c0c10";
        const csM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const csA  = isDark ? "#68b5cc"                : "#0e7490";
        const csBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

        const bullets = [
          "Faster load times",
          "Better Core Web Vitals",
          "Higher search rankings",
          "Improved conversions",
        ];

        return (
          <section className="relative overflow-hidden py-20 sm:py-24" style={{ background: csBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${csA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
              <motion.div
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.6, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                className="relative rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                style={{ border:`1px solid ${csBr}`, background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)" }}
              >
                {/* decorative glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                  style={{ background:`radial-gradient(circle,${csA}0e 0%,transparent 70%)` }} />

                {/* left - text */}
                <div className="relative z-10">
                  <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3" style={{ color:csA }}>
                    Free Analysis
                  </p>
                  <h2
                    className="text-[26px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.12] tracking-[-0.02em] mb-4"
                    style={{ color:csP }}
                  >
                    {customSection.title}
                  </h2>
                  <p className="text-[14px] leading-[1.8] mb-7 max-w-md" style={{ color:csM }}>
                    {customSection.desc}
                  </p>

                  <motion.button
                    onClick={() => setShowForm(true)}
                    whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold cursor-pointer"
                    style={{ background:csA, color: isDark ? "#0b0b0e" : "#ffffff", boxShadow:`0 4px 20px ${csA}35` }}
                  >
                    {customSection.ctaText}
                    <ArrowUpRight size={15} />
                  </motion.button>
                </div>

                {/* right - bullet points */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }}
                      transition={{ delay:0.1 + i*0.08, duration:0.5, ease:[0.22,1,0.36,1] }}
                      viewport={{ once:true }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border:`1px solid ${csBr}` }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:csA }} />
                      <span className="text-[13px] font-medium" style={{ color:csP }}>{b}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${csA}18,transparent)` }} />
          </section>
        );
      })()}

      {/* ===== POPUP FORM ===== */}
      <AnimatePresence>
        {showForm && (() => {
          const fA  = isDark ? "#68b5cc" : "#0e7490";
          const fP  = isDark ? "#f0eeec" : "#0c0c10";
          const fMt = isDark ? "rgba(240,238,236,0.45)" : "rgba(12,12,16,0.48)";
          const fBg = isDark ? "#0d1117" : "#ffffff";
          const fBr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
          const fIB = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
          const inputSx = {
            background:fIB, border:`1px solid ${fBr}`, color:fP,
            borderRadius:10, padding:"11px 14px", fontSize:13.5, outline:"none", width:"100%",
          };

          return (
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50 px-4"
              style={{ background:"rgba(0,0,0,0.65)", backdropFilter:"blur(12px)" }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={e => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ y:40, opacity:0, scale:0.97 }}
                animate={{ y:0, opacity:1, scale:1 }}
                exit={{ y:40, opacity:0, scale:0.97 }}
                transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                className="relative w-full max-w-md rounded-2xl p-7 sm:p-9"
                style={{ background:fBg, border:`1px solid ${fBr}`, boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}
              >
                {/* close */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer text-[15px]"
                  style={{ background:fBr, color:fMt }}
                >✕</button>

                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-2" style={{ color:fA }}>
                  Free Audit
                </p>
                <h3 className="text-[20px] font-bold mb-1" style={{ color:fP }}>
                  Analyze Your Website
                </h3>
                <p className="text-[13px] mb-6" style={{ color:fMt }}>
                  Our experts will review your site and respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {[
                    { name:"name",    placeholder:"Your Name",    type:"text",  required:true },
                    { name:"email",   placeholder:"Your Email",   type:"email", required:true },
                    { name:"website", placeholder:"Website URL",  type:"url",   required:true },
                  ].map(f => (
                    <input
                      key={f.name} type={f.type} name={f.name}
                      value={formData[f.name]} onChange={handleChange}
                      placeholder={f.placeholder} required={f.required}
                      style={inputSx}
                      onFocus={e => e.target.style.borderColor = `${fA}60`}
                      onBlur={e  => e.target.style.borderColor = fBr}
                    />
                  ))}
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    placeholder="Describe issues or goals..." required rows={3}
                    style={{ ...inputSx, resize:"none" }}
                    onFocus={e => e.target.style.borderColor = `${fA}60`}
                    onBlur={e  => e.target.style.borderColor = fBr}
                  />
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    className="w-full py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-60"
                    style={{ background:fA, color: isDark ? "#0b0b0e" : "#ffffff", boxShadow:`0 4px 16px ${fA}30` }}
                  >
                    {loading
                      ? <><Loader2 size={15} className="animate-spin" /> Sending...</>
                      : <>"Analyze My Site" <ArrowUpRight size={15} /></>
                    }
                  </motion.button>
                </form>

                <AnimatePresence>
                  {successMsg && (
                    <motion.p
                      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      className="flex items-center gap-2 mt-4 text-[13px]"
                      style={{ color:"#4ade80" }}
                    >
                      <CheckCircle size={15} /> {successMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ===== WHAT WE OFFER ===== */}
      {offers.length > 0 && (() => {
        const oBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const oP  = isDark ? "#f0eeec"                : "#0c0c10";
        const oM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const oA  = isDark ? "#68b5cc"                : "#0e7490";
        const oBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

        return (
          <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: oBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${oA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

              {/* header */}
              <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <motion.p
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3"
                    style={{ color:oA }}
                  >What We Offer</motion.p>
                  <motion.h2
                    initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ delay:0.06, duration:0.55, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[28px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
                    style={{ color:oP }}
                  >
                    {offersHeading.split(" ").length > 2
                      ? <>{offersHeading.split(" ").slice(0,-1).join(" ")}{" "}<span style={{ color:oA }}>{offersHeading.split(" ").at(-1)}</span></>
                      : <>{offersHeading.split(" ")[0]}{" "}<span style={{ color:oA }}>{offersHeading.split(" ")[1]}</span></>
                    }
                  </motion.h2>
                </div>
                <motion.p
                  initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                  transition={{ delay:0.12, duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                  className="text-[14px] leading-relaxed max-w-[260px] sm:text-right"
                  style={{ color:oM }}
                >
                  Hover each card to see what's inside.
                </motion.p>
              </div>

              {/* flip cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {offers.map((offer, i) => (
                  <FlipCard key={i} offer={offer} isMobile={isMobile} index={i} />
                ))}
              </div>

            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${oA}18,transparent)` }} />
          </section>
        );
      })()}

      {/* ===== CUSTOM CHATBOT CTA ===== */}
      {customChatbot && (() => {
        const cBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const cP  = isDark ? "#f0eeec"                : "#0c0c10";
        const cM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const cA  = isDark ? "#68b5cc"                : "#0e7490";
        const cBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

        return (
          <section className="relative overflow-hidden py-20 sm:py-24" style={{ background: cBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${cA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
              <motion.div
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.6, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                className="relative rounded-2xl overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
                style={{ border:`1px solid ${cBr}`, background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)" }}
              >
                {/* accent glow */}
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background:`radial-gradient(circle,${cA}10 0%,transparent 70%)` }} />

                <div className="relative z-10 max-w-xl">
                  <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3" style={{ color:cA }}>
                    Custom AI Chatbot
                  </p>
                  <h2 className="text-[26px] sm:text-[34px] font-bold leading-[1.15] tracking-[-0.02em] mb-3" style={{ color:cP }}>
                    {customChatbot.title}
                  </h2>
                  <p className="text-[14px] leading-[1.8]" style={{ color:cM }}>
                    {customChatbot.desc}
                  </p>
                </div>

                <motion.button
                  onClick={() => setShowChatbotForm(true)}
                  whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  transition={{ duration:0.18 }}
                  className="relative z-10 flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold cursor-pointer"
                  style={{ background:cA, color: isDark ? "#0b0b0e" : "#ffffff", boxShadow:`0 4px 20px ${cA}35` }}
                >
                  {customChatbot.ctaText}
                  <ArrowUpRight size={16} />
                </motion.button>
              </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${cA}18,transparent)` }} />
          </section>
        );
      })()}

      {/* ===== CHATBOT FORM MODAL ===== */}
      <AnimatePresence>
        {showChatbotForm && (() => {
          const mA  = isDark ? "#68b5cc" : "#0e7490";
          const mP  = isDark ? "#f0eeec" : "#0c0c10";
          const mMt = isDark ? "rgba(240,238,236,0.45)" : "rgba(12,12,16,0.48)";
          const mBg = isDark ? "#0d1117" : "#ffffff";
          const mBr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
          const mIB = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
          const inputSx = {
            background: mIB, border: `1px solid ${mBr}`, color: mP,
            borderRadius:10, padding:"10px 14px", fontSize:13.5, outline:"none", width:"100%",
          };

          return (
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50 px-4"
              style={{ background:"rgba(0,0,0,0.65)", backdropFilter:"blur(12px)" }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={(e) => e.target === e.currentTarget && setShowChatbotForm(false)}
            >
              <motion.div
                initial={{ y:40, opacity:0, scale:0.97 }}
                animate={{ y:0, opacity:1, scale:1 }}
                exit={{ y:40, opacity:0, scale:0.97 }}
                transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                className="relative w-full max-w-lg rounded-2xl p-7 sm:p-9"
                style={{ background:mBg, border:`1px solid ${mBr}`, boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}
              >
                {/* close */}
                <button
                  onClick={() => setShowChatbotForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  style={{ background: mBr, color: mMt }}
                >✕</button>

                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-2" style={{ color:mA }}>
                  Free Chatbot
                </p>
                <h3 className="text-[20px] font-bold mb-1" style={{ color:mP }}>Get Your Custom Chatbot</h3>
                <p className="text-[13px] mb-6" style={{ color:mMt }}>Fill in your details and we'll build it for you.</p>

                <form onSubmit={handleChatbotSubmit} className="flex flex-col gap-3">
                  {[
                    { name:"name",    placeholder:"Your Name",    type:"text",  required:true },
                    { name:"email",   placeholder:"Your Email",   type:"email", required:true },
                    { name:"company", placeholder:"Company Name", type:"text" },
                    { name:"website", placeholder:"Website URL",  type:"url" },
                  ].map(f => (
                    <input
                      key={f.name} type={f.type} name={f.name}
                      value={chatbotFormData[f.name]} onChange={handleChatbotChange}
                      placeholder={f.placeholder} required={f.required}
                      style={inputSx}
                      onFocus={e => e.target.style.borderColor = `${mA}60`}
                      onBlur={e  => e.target.style.borderColor = mBr}
                    />
                  ))}
                  <textarea
                    name="message" value={chatbotFormData.message} onChange={handleChatbotChange}
                    placeholder="Additional details..." rows={3}
                    style={{ ...inputSx, resize:"none" }}
                    onFocus={e => e.target.style.borderColor = `${mA}60`}
                    onBlur={e  => e.target.style.borderColor = mBr}
                  />
                  <motion.button
                    type="submit" disabled={chatbotLoading}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    className="w-full py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-60"
                    style={{ background:mA, color: isDark ? "#0b0b0e" : "#ffffff", boxShadow:`0 4px 16px ${mA}30` }}
                  >
                    {chatbotLoading ? <Loader2 size={16} className="animate-spin" /> : <>{customChatbot.ctaText} <ArrowUpRight size={15} /></>}
                  </motion.button>
                </form>

                {chatbotSuccess && (
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
                    className="flex items-center gap-2 mt-4 text-[13px]"
                    style={{ color:"#4ade80" }}>
                    <CheckCircle size={15} /> {chatbotSuccess}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
      
       {data.customIndustries && (
       <IndustrySection
       data={data.customIndustries}
      />
      )}


      {/* ===== TECH STACK ===== */}
      {customTechStack && (() => {
        const tBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const tP  = isDark ? "#f0eeec"                : "#0c0c10";
        const tM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const tA  = isDark ? "#68b5cc"                : "#0e7490";
        const tBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
        const tCd = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";

        return (
          <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: tBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${tA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

              {/* header */}
              <div className="mb-14">
                <motion.p
                  initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                  transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                  className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3"
                  style={{ color:tA }}
                >Tech We Use</motion.p>
                <motion.h2
                  initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                  transition={{ delay:0.06, duration:0.55, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                  className="text-[28px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
                  style={{ color:tP }}
                >
                  {techStackHeading.split(" ").length >= 2
                    ? <>{techStackHeading.split(" ").slice(0,-1).join(" ")}{" "}<span style={{ color:tA }}>{techStackHeading.split(" ").at(-1)}</span></>
                    : <>{techStackHeading}</>
                  }
                </motion.h2>
              </div>

              {/* categories */}
              {Object.keys(customTechStack).map((cat, ci) => (
                <div key={ci} className="mb-12 last:mb-0">
                  {/* category label */}
                  <motion.div
                    initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
                    transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-1 h-5 rounded-full" style={{ background:tA }} />
                    <span className="text-[12px] font-extrabold tracking-[0.18em] uppercase" style={{ color:tA }}>
                      {cat}
                    </span>
                    <div className="flex-1 h-px" style={{ background:tBr }} />
                  </motion.div>

                  {/* tech items */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
                    {customTechStack[cat].map((tech, ti) => (
                      <motion.div
                        key={ti}
                        initial={{ opacity:0, y:20 }}
                        whileInView={{ opacity:1, y:0 }}
                        transition={{ delay: ti * 0.05, duration:0.45, ease:[0.22,1,0.36,1] }}
                        viewport={{ once:true }}
                        whileHover={{ y:-4, transition:{ duration:0.2 } }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = `${tA}40`;
                          e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2)`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = tBr;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl cursor-default"
                        style={{ background:tCd, border:`1px solid ${tBr}`, willChange:"transform" }}
                      >
                        <img src={tech.img} alt={tech.name} className="w-10 h-10 object-contain" />
                        <p className="text-[11.5px] font-medium text-center leading-snug" style={{ color:tM }}>
                          {tech.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${tA}18,transparent)` }} />
          </section>
        );
      })()}
      {/* ===== CUSTOM FAQ SECTION ===== */}
      {data.customFAQ && (() => {
        const fBg = isDark
          ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
          : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
        const fP  = isDark ? "#f0eeec"                : "#0c0c10";
        const fM  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
        const fA  = isDark ? "#68b5cc"                : "#0e7490";
        const fBr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

        return (
          <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: fBg }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${fA}28,transparent)` }} />

            <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">

                {/* left */}
                <div className="lg:sticky lg:top-28 self-start">
                  <motion.p
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-3"
                    style={{ color:fA }}
                  >FAQs</motion.p>
                  <motion.h2
                    initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ delay:0.06, duration:0.55, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] mb-4"
                    style={{ color:fP }}
                  >
                    {data.customFAQ.title || "Frequently Asked"}{" "}
                    <span style={{ color:fA }}>Questions.</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ delay:0.1, duration:0.5, ease:[0.22,1,0.36,1] }} viewport={{ once:true }}
                    className="text-[14px] leading-[1.8]"
                    style={{ color:fM }}
                  >
                    Everything you need to know. Can't find an answer?{" "}
                    <button
                      onClick={() => document.getElementById("business-talk")?.scrollIntoView({ behavior:"smooth" })}
                      className="font-semibold underline underline-offset-2 cursor-pointer"
                      style={{ color:fA }}
                    >Ask us directly.</button>
                  </motion.p>
                </div>

                {/* right - accordion */}
                <div className="flex flex-col">
                  {data.customFAQ.items.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity:0, y:16 }}
                      whileInView={{ opacity:1, y:0 }}
                      transition={{ delay: i * 0.07, duration:0.5, ease:[0.22,1,0.36,1] }}
                      viewport={{ once:true }}
                      style={{ borderBottom:`1px solid ${fBr}` }}
                    >
                      <FAQItem faq={faq} accent={fA} primary={fP} muted={fM} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px"
              style={{ background:`linear-gradient(to right,transparent,${fA}18,transparent)` }} />
          </section>
        );
      })()}
        
        {/* ===== BUSINESS TALK + FOOTER ===== */}
      <BusinessTalk />
      <Footer />
    </div>
  );
};

export default ServicePage;
