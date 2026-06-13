import React, { useState, useEffect, useRef, useCallback } from "react";
import logoLight from "../assets/logo-light.png";
import logoDark  from "../assets/logo-dark.png";
import logoIcon  from "../assets/logo-icon.png";
import navItems from "./Navlinks.jsx";
import { useTheme } from "../context/ThemeContext";
import { ChevronDown, ArrowUpRight, Menu, X, Moon, Sun, Zap, MoveRight, Phone, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   SLIDING THEME TOGGLE
───────────────────────────────────────────── */
const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle theme"
      className={`relative flex items-center rounded-full p-[3px] cursor-pointer border transition-colors duration-500 ${
        isDark ? "bg-[#0c1a20] border-[#68b5cc]/20" : "bg-slate-100 border-slate-200"
      }`}
    >
      {/* sliding pill indicator */}
      <motion.span
        className={`absolute top-[3px] bottom-[3px] w-8 rounded-full ${
          isDark
            ? "bg-[#68b5cc]/18 shadow-[0_0_10px_rgba(104,181,204,0.25)]"
            : "bg-white shadow-md shadow-slate-200"
        }`}
        animate={{ x: isDark ? 2 : 34 }}
        transition={{ type: "spring", stiffness: 520, damping: 38 }}
      />
      <span className="relative z-10 w-8 h-7 flex items-center justify-center">
        <Moon size={13} className={`transition-colors duration-300 ${isDark ? "text-[#68b5cc]" : "text-slate-300"}`} />
      </span>
      <span className="relative z-10 w-8 h-7 flex items-center justify-center">
        <Sun size={13} className={`transition-colors duration-300 ${!isDark ? "text-amber-500" : "text-white/18"}`} />
      </span>
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   MENU CARD (dropdown)
───────────────────────────────────────────── */
const MenuCard = ({ section, onClose, isDark }) => {
  const mainLink = section.links?.[0]?.to || "#";
  const hasSubLinks = section.links && section.links.length > 1;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 34 } },
      }}
    >
      <div className={`group rounded-xl p-4 h-full border transition-all duration-250 cursor-pointer hover:-translate-y-[2px] ${
        isDark
          ? "border-white/[0.06] bg-white/[0.02] hover:border-[#68b5cc]/22 hover:bg-white/[0.045]"
          : "border-slate-100 bg-white hover:border-[#0e7490]/18 hover:bg-slate-50/80 shadow-sm hover:shadow-md"
      }`}>
        {/* icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-250 ${
          isDark
            ? "bg-white/[0.05] text-white/40 group-hover:bg-[#68b5cc]/12 group-hover:text-[#68b5cc]"
            : "bg-slate-100 text-slate-400 group-hover:bg-[#0e7490]/8 group-hover:text-[#0e7490]"
        }`}>
          {section.icon}
        </div>

        <h4 className={`text-[13px] font-semibold mb-1.5 transition-colors duration-200 ${
          isDark ? "text-white/78 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"
        }`}>
          {section.heading}
        </h4>

        {section.subtitle && (
          <p className={`text-[11.5px] leading-relaxed mb-3 line-clamp-2 ${
            isDark ? "text-white/32" : "text-slate-400"
          }`}>
            {section.subtitle}
          </p>
        )}

        {hasSubLinks ? (
          <div className={`space-y-[2px] pt-2.5 border-t ${isDark ? "border-white/[0.05]" : "border-slate-100"}`}>
            {section.links.map((link, i) => (
              <Link key={i} to={link.to} onClick={onClose}
                className={`flex items-center gap-2 text-[11.5px] py-[5px] px-1.5 rounded-lg transition-colors ${
                  isDark ? "text-white/36 hover:text-[#68b5cc]" : "text-slate-400 hover:text-[#0e7490]"
                }`}>
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isDark ? "bg-[#68b5cc]/35" : "bg-[#0e7490]/35"}`} />
                {link.label}
              </Link>
            ))}
          </div>
        ) : (
          <Link to={mainLink} onClick={onClose}
            className={`flex items-center gap-1 text-[11.5px] font-medium transition-colors ${
              isDark ? "text-white/28 group-hover:text-[#68b5cc]" : "text-slate-400 group-hover:text-[#0e7490]"
            }`}>
            Learn more <MoveRight size={11} />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  const { isDark } = useTheme();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSub, setMobileSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMenu = (idx) => { clearTimeout(closeTimer.current); setActiveMenu(idx); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 140); };
  const closeAll = () => { setActiveMenu(null); setMobileOpen(false); setMobileExpanded(null); setMobileSub(null); };

  const accentColor = isDark ? "#68b5cc" : "#0e7490";

  /* pill surface */
  const pillBg = scrolled
    ? isDark
      ? "bg-[#070e12]/90 border-white/[0.08] shadow-2xl shadow-black/50"
      : "bg-white/94 border-slate-200 shadow-xl shadow-slate-200/50"
    : isDark
    ? "bg-[#070e12]/65 border-white/[0.06]"
    : "bg-white/72 border-slate-200/70";

  return (
    <>
      {/* ── OUTER NAV WRAPPER ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.05 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        {/* ── FLOATING PILL ── */}
        <div className="px-4 pt-3">
          <div className={`max-w-screen-xl mx-auto rounded-2xl border backdrop-blur-2xl transition-all duration-500 ${pillBg}`}>
            <div className="px-5 h-[58px] flex items-center justify-between gap-4">

              {/* Logo */}
              {(() => {
                const [logoHovered, setLogoHovered] = React.useState(false);
                const showText = !isDesktop || !scrolled || logoHovered;
                return (
                  <Link
                    to="/"
                    onClick={closeAll}
                    onMouseEnter={() => setLogoHovered(true)}
                    onMouseLeave={() => setLogoHovered(false)}
                    className="flex-shrink-0 flex items-center justify-center gap-0 overflow-hidden"
                  >
                    <img src={logoIcon} alt="" className="h-11 w-auto block flex-shrink-0" />
                    <motion.img
                      src={isDark ? logoLight : logoDark}
                      alt="Webaurix"
                      className="h-9 w-auto block flex-shrink-0 self-center"
                      animate={showText
                        ? { opacity: 1, x: 0,   maxWidth: 160 }
                        : { opacity: 0, x: -14, maxWidth: 0  }
                      }
                      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </Link>
                );
              })()}

              {/* Desktop Nav Links */}
              <motion.div
                initial="hidden" animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                className="hidden lg:flex items-center"
              >
                {navItems.map((item, idx) => {
                  const isActive = activeMenu === idx;
                  return (
                    <motion.div
                      key={idx}
                      variants={{ hidden: { opacity: 0, y: -12 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } } }}
                      onMouseEnter={() => openMenu(idx)}
                      onMouseLeave={scheduleClose}
                    >
                      <button className={`relative flex items-center gap-1.5 px-4 py-2 text-[13px] tracking-wide font-medium cursor-pointer transition-colors duration-200 ${
                        isActive
                          ? isDark ? "text-[#68b5cc]" : "text-[#0e7490]"
                          : isDark ? "text-white/55 hover:text-white/85" : "text-slate-500 hover:text-slate-800"
                      }`}>
                        {item.title}
                        <motion.span
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        >
                          <ChevronDown size={12} className={isActive ? "" : "opacity-40"} />
                        </motion.span>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Desktop Right */}
              <motion.div
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.44, type: "spring", stiffness: 300 }}
                className="hidden lg:flex items-center gap-3"
              >
                <ThemeToggle />

                <div className={`w-px h-4 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

                <Link to="/start-project" onClick={closeAll}>
                  <motion.span
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all duration-300 cursor-pointer ${
                      isDark
                        ? "bg-[#68b5cc]/9 border-[#68b5cc]/28 text-[#68b5cc] hover:bg-[#68b5cc]/15 hover:border-[#68b5cc]/50 hover:shadow-[0_0_18px_rgba(104,181,204,0.14)]"
                        : "bg-[#0e7490] border-transparent text-white hover:bg-[#0c6780] hover:shadow-lg hover:shadow-[#0e7490]/22"
                    }`}
                  >
                    <Zap size={13} />
                    Start a Project
                  </motion.span>
                </Link>
              </motion.div>

              {/* Mobile buttons - only hamburger, no toggle here */}
              <div className="lg:hidden flex items-center">
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`p-2.5 rounded-xl transition-colors ${
                    isDark
                      ? "text-white/65 hover:bg-white/8 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen
                      ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={21} /></motion.div>
                      : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={21} /></motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP MEGA MENU (full width, below pill) ── */}
        <AnimatePresence>
          {activeMenu !== null && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.14 } }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              onMouseEnter={() => clearTimeout(closeTimer.current)}
              onMouseLeave={scheduleClose}
              className="hidden lg:block px-4 pt-2"
            >
              <div className={`max-w-screen-xl mx-auto rounded-2xl border overflow-hidden ${
                isDark
                  ? "bg-[#070e12]/98 backdrop-blur-2xl border-white/[0.07] shadow-2xl shadow-black/50"
                  : "bg-white/98 backdrop-blur-2xl border-slate-200 shadow-xl shadow-slate-200/60"
              }`}>

                {navItems[activeMenu]?.title === "SERVICES" ? (
                  /* ── SERVICES layout ── */
                  <div className="flex">
                    {/* Left editorial panel */}
                    <div className={`w-[240px] flex-shrink-0 p-8 border-r flex flex-col justify-between ${
                      isDark ? "border-white/[0.05]" : "border-slate-100"
                    }`}>
                      <div>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                          isDark ? "text-[#68b5cc]/50" : "text-[#0e7490]/50"
                        }`}>What we build</span>
                        <h2 className={`text-[26px] font-bold leading-[1.2] mt-3 mb-3 ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}>
                          End-to-end<br />
                          <span style={{ color: accentColor }}>digital</span><br />
                          solutions
                        </h2>
                        <p className={`text-[12px] leading-relaxed ${isDark ? "text-white/35" : "text-slate-400"}`}>
                          From idea to launch - we design, build, and scale.
                        </p>
                      </div>
                      <div className="space-y-2.5 mt-6">
                        <Link to="/start-project" onClick={closeAll}
                          className={`flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors ${
                            isDark ? "text-[#68b5cc] hover:text-white" : "text-[#0e7490] hover:text-slate-900"
                          }`}>
                          Start a project <ArrowUpRight size={12} />
                        </Link>
                        <Link to="/contact`" onClick={closeAll}
                          className={`block text-[12px] transition-colors ${
                            isDark ? "text-white/32 hover:text-white/65" : "text-slate-400 hover:text-slate-600"
                          }`}>
                          Talk to us →
                        </Link>
                      </div>
                    </div>

                    {/* Right grid */}
                    <div className="flex-1 p-6">
                      <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                        initial="hidden" animate="visible"
                        className="grid grid-cols-3 gap-3"
                      >
                        {navItems[activeMenu].sections.map((section, i) => (
                          <MenuCard key={i} section={section} onClose={closeAll} isDark={isDark} />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* ── OTHER MENUS ── */
                  <div className="p-6">
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-5 ${
                      isDark ? "text-[#68b5cc]/50" : "text-[#0e7490]/50"
                    }`}>
                      {navItems[activeMenu]?.title}
                    </p>
                    <motion.div
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                      initial="hidden" animate="visible"
                      className="grid grid-cols-2 lg:grid-cols-3 gap-3"
                    >
                      {navItems[activeMenu]?.sections.map((section, i) => (
                        <MenuCard key={i} section={section} onClose={closeAll} isDark={isDark} />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Desktop dropdown backdrop */}
      <AnimatePresence>
        {activeMenu !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 hidden lg:block"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE: BOTTOM SHEET ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeAll}
              className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            />

            {/* bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 38 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 400) {
                  closeAll();
                }
              }}
              className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-[28px] flex flex-col max-h-[88vh] ${
                isDark
                  ? "bg-[#080f14] border-t border-white/[0.08]"
                  : "bg-white border-t border-slate-200"
              }`}
            >
              {/* top glow accent */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] ${
                isDark
                  ? "bg-gradient-to-r from-transparent via-[#68b5cc]/40 to-transparent"
                  : "bg-gradient-to-r from-transparent via-[#0e7490]/25 to-transparent"
              }`} />

              {/* drag handle - swipe down to close */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing">
                <motion.div
                  whileHover={{ scaleX: 1.3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-10 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`}
                />
              </div>

              {/* sheet header - no X button */}
              <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
                <Link to="/" onClick={closeAll} className="flex items-center gap-1">
                  <img src={logoIcon} alt="" className="h-8 w-auto" />
                  <img src={isDark ? logoLight : logoDark} alt="Webaurix" className="h-6 w-auto" />
                </Link>
                <ThemeToggle />
              </div>

              {/* divider */}
              <div className={`mx-5 h-px ${isDark ? "bg-white/[0.06]" : "bg-slate-100"}`} />

              {/* scrollable nav items - stopPropagation prevents swipe-close while scrolling */}
              <div
                className="flex-1 overflow-y-auto px-4 py-3"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {navItems.map((item, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + idx * 0.07, type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <button
                      onClick={() => { setMobileExpanded(mobileExpanded === idx ? null : idx); setMobileSub(null); }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold tracking-[0.1em] mb-1 transition-colors ${
                        mobileExpanded === idx
                          ? isDark ? "bg-white/[0.05] text-[#68b5cc]" : "bg-[#0e7490]/[0.07] text-[#0e7490]"
                          : isDark ? "text-white/55 hover:bg-white/[0.03] hover:text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {item.title}
                      <motion.span animate={{ rotate: mobileExpanded === idx ? 180 : 0 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                        <ChevronDown size={15} className="opacity-50" />
                      </motion.span>
                    </button>

                  <AnimatePresence>
                    {mobileExpanded === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-2 pb-3 space-y-0.5">
                          {item.sections.map((section, si) => {
                            const key = `${idx}-${si}`;
                            const isSubOpen = mobileSub === key;
                            return (
                              <div key={si}>
                                <button
                                  onClick={() => setMobileSub(isSubOpen ? null : key)}
                                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                                    isSubOpen
                                      ? isDark ? "bg-white/[0.04]" : "bg-slate-50"
                                      : isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/70"
                                  }`}
                                >
                                  <span className={`flex-shrink-0 transition-colors ${
                                    isSubOpen
                                      ? isDark ? "text-[#68b5cc]" : "text-[#0e7490]"
                                      : isDark ? "text-white/35" : "text-slate-400"
                                  }`}>{section.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-[13px] font-semibold ${
                                      isSubOpen
                                        ? isDark ? "text-white" : "text-slate-900"
                                        : isDark ? "text-white/70" : "text-slate-600"
                                    }`}>{section.heading}</p>
                                    {section.subtitle && (
                                      <p className={`text-[11px] truncate mt-0.5 ${isDark ? "text-white/28" : "text-slate-400"}`}>{section.subtitle}</p>
                                    )}
                                  </div>
                                  <motion.span animate={{ rotate: isSubOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 420 }}
                                    className={isDark ? "text-white/20" : "text-slate-300"}>
                                    <ChevronDown size={13} />
                                  </motion.span>
                                </button>

                                <AnimatePresence>
                                  {isSubOpen && section.links && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.18 }} className="overflow-hidden"
                                    >
                                      <div className="pl-12 pb-2 space-y-0.5">
                                        {section.links.map((link, li) => (
                                          <motion.div key={li} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: li * 0.04 }}>
                                            <Link to={link.to} onClick={closeAll}
                                              className={`flex items-center gap-2 py-2 px-2 text-[12px] rounded-lg transition-colors ${
                                                isDark ? "text-white/38 hover:text-[#68b5cc] hover:bg-white/[0.03]" : "text-slate-400 hover:text-[#0e7490] hover:bg-[#0e7490]/5"
                                              }`}>
                                              <span className={`w-1 h-1 rounded-full ${isDark ? "bg-[#68b5cc]/35" : "bg-[#0e7490]/35"}`} />
                                              {link.label}
                                            </Link>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* sheet footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className={`px-4 pt-4 pb-2 border-t space-y-2.5 flex-shrink-0 ${isDark ? "border-white/[0.06]" : "border-slate-100"}`}
            >
              <Link to="/start-project" onClick={closeAll}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                  isDark
                    ? "bg-[#68b5cc]/10 border border-[#68b5cc]/28 text-[#68b5cc]"
                    : "bg-[#0e7490] text-white"
                }`}>
                <Zap size={14} /> Start a Project
              </Link>
              <Link to="/book-consultation" onClick={closeAll}
                className={`flex items-center justify-center w-full py-3.5 rounded-2xl text-[13px] font-medium border transition-all ${
                  isDark
                    ? "border-white/[0.07] text-white/40 hover:text-white/65 hover:border-white/14"
                    : "border-slate-200 text-slate-500 hover:text-slate-800"
                }`}>
                Book a Consultation
              </Link>
            </motion.div>

            {/* safe area for phones with home bar */}
            <div className="h-5 flex-shrink-0" />

          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
