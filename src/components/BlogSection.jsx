import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

/* ── tag pill ── */
function Tag({ label, accent }) {
  return (
    <span
      className="text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
      style={{
        background: "rgba(0,0,0,0.35)",
        color: "#fff",
        border: `1px solid rgba(255,255,255,0.2)`,
        backdropFilter: "blur(6px)",
      }}
    >
      {label}
    </span>
  );
}

/* ── FEATURED card (left, large) ── */
function FeaturedCard({ blog, accent, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="relative rounded-2xl overflow-hidden cursor-pointer h-[320px] sm:h-[400px] lg:h-full min-h-[320px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={blog.link} className="block w-full h-full">
        {/* image */}
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
        />

        {/* gradient overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0.88 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* tag */}
        <div className="absolute top-4 left-4">
          <Tag label={blog.tag} accent={accent} />
        </div>

        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
          <h3 className="text-[20px] sm:text-[24px] font-bold text-white leading-snug tracking-tight mb-2.5 line-clamp-2">
            {blog.title}
          </h3>
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-[13px] leading-[1.7] text-white/65 mb-4 line-clamp-2"
            style={{ willChange: "transform, opacity" }}
          >
            {blog.excerpt}
          </motion.p>
          <div
            className="flex items-center gap-1.5 text-[12.5px] font-semibold"
            style={{ color: hovered ? accent : "rgba(255,255,255,0.55)", transition: "color 0.2s ease" }}
          >
            Read article
            <motion.span
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.22 }}
              style={{ willChange: "transform" }}
            >
              <ArrowUpRight size={13} />
            </motion.span>
          </div>
        </div>

        {/* hover accent border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ border: `1px solid ${accent}40` }}
        />
      </Link>
    </motion.div>
  );
}

/* ── SMALL card (right column) ── */
function SmallCard({ blog, accent, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="relative rounded-2xl overflow-hidden cursor-pointer h-[160px] sm:h-[180px] lg:h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={blog.link} className="block w-full h-full">
        {/* image */}
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
        />

        {/* overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35 }}
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* tag */}
        <div className="absolute top-3 left-3">
          <Tag label={blog.tag} accent={accent} />
        </div>

        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3">
          <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-white leading-snug line-clamp-2 flex-1">
            {blog.title}
          </h3>
          <motion.div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
            animate={{
              background: hovered ? accent : "rgba(255,255,255,0.12)",
              scale: hovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.25 }}
            style={{ willChange: "transform" }}
          >
            <ArrowUpRight size={12} color={hovered ? "#0b0b0e" : "#fff"} />
          </motion.div>
        </div>

        {/* hover border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ border: `1px solid ${accent}40` }}
        />
      </Link>
    </motion.div>
  );
}

/* ════════════════════════════════════
   MAIN
════════════════════════════════════ */
export default function BlogsSection() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "blogs"), where("published", "==", true), orderBy("createdAt", "desc"), limit(4))
        );
        const data = snap.docs.map(d => {
          const b = { id: d.id, ...d.data() };
          return { id: b.id, title: b.title, image: b.image, excerpt: b.snippet, link: `/blog/${b.slug}`, tag: b.label };
        });
        setBlogs(data);
      } catch { setBlogs([]); }
    })();
  }, []);

  if (blogs.length === 0) return null;

  const bg      = isDark
    ? "linear-gradient(155deg, #0b0b0e 0%, #0d1017 55%, #0b0c10 100%)"
    : "linear-gradient(155deg, #ffffff 0%, #f4f7ff 60%, #ffffff 100%)";
  const primary = isDark ? "#f0eeec" : "#0c0c10";
  const muted   = isDark ? "rgba(240,238,236,0.38)" : "rgba(12,12,16,0.4)";
  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <section
      ref={ref}
      style={{ background: bg }}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }}
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── HEADER ── */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}
            >
              Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: primary }}
            >
              Latest articles &{" "}
              <span style={{ color: accent }}>ideas.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 shrink-0"
          >
            <p className="text-[14px] leading-relaxed hidden sm:block max-w-[220px] sm:text-right" style={{ color: muted }}>
              Trends and ideas shaping the digital world.
            </p>
            <Link to="/blogs">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer shrink-0"
                style={{ border: `1px solid ${border}`, color: muted }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.color = primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
              >
                All articles <ArrowUpRight size={13} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-3 lg:h-[600px]">

          {/* featured - left */}
          <FeaturedCard blog={blogs[0]} accent={accent} inView={inView} />

          {/* right column - 3 small */}
          <div className="grid grid-rows-1 sm:grid-rows-3 grid-cols-1 gap-3 sm:h-[600px] lg:h-full">
            {blogs.slice(1).map((blog, i) => (
              <SmallCard
                key={blog.id}
                blog={blog}
                accent={accent}
                inView={inView}
                delay={0.12 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${accent}20, transparent)` }}
      />
    </section>
  );
}
