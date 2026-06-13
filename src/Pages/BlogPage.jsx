import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BlogCards from "../components/BlogCards";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const BlogPage = () => {
  const { isDark } = useTheme();

  const bg = isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 55%,#0b0c10 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 60%,#ffffff 100%)";
  const P  = isDark ? "#f0eeec"                : "#0c0c10";
  const M  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
  const A  = isDark ? "#68b5cc"                : "#0e7490";
  const Br = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const [blogs, setBlogs]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage]   = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(collection(db, "blogs"),
            where("published", "==", true),
            orderBy("createdAt", "desc"))
        );
        const fireBlogs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setBlogs(fireBlogs);
      } catch {
        setBlogs([]);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const categories   = ["All", ...new Set(blogs.map(b => b.label).filter(Boolean))];
  const filtered     = activeCategory === "All" ? blogs : blogs.filter(b => b.label === activeCategory);
  const totalPages   = Math.ceil(filtered.length / blogsPerPage);
  const currentBlogs = filtered.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handleCategory = (cat) => { setActiveCategory(cat); setCurrentPage(1); };

  return (
    <div className="w-full min-h-screen" style={{ background: bg }}>
      <Helmet>
        <title>Blog | Web, App, AI & Digital Insights – Webaurix</title>
        <meta name="description" content="Discover the latest insights, trends, and guides from Webaurix on web development, AI, design, and digital innovation." />
        <meta name="keywords" content="Webaurix blog, web development blog, AI insights, UI UX design articles, digital marketing tips, technology trends" />
        <link rel="canonical" href="https://www.webaurix.com/blogs" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-72 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${A}18, transparent)` }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
            className="text-[11px] font-extrabold tracking-[0.24em] uppercase mb-4" style={{ color:A }}>
            Webaurix Journal
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.07, duration:0.6, ease:[0.22,1,0.36,1] }}
            className="text-[36px] sm:text-[56px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] mb-5"
            style={{ color:P }}>
            Insights &{" "}<span style={{ color:A }}>Updates.</span>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.13, duration:0.55, ease:[0.22,1,0.36,1] }}
            className="text-[15px] sm:text-[17px] leading-[1.8] max-w-[520px]" style={{ color:M }}>
            Expert perspectives on tech, design, and digital innovation - written by the Webaurix team.
          </motion.p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background:`linear-gradient(to right,transparent,${A}22,transparent)` }} />
      </section>

      {/* CATEGORY FILTER */}
      <section className="sticky top-0 z-30 py-4 px-5 sm:px-10 lg:px-16"
        style={{ background: isDark?"rgba(11,11,14,0.9)":"rgba(255,255,255,0.9)",
          backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:`1px solid ${Br}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:"none" }}>
            {categories.map((cat, i) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button key={i} onClick={() => handleCategory(cat)} whileTap={{ scale:0.95 }}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer"
                  style={{ background: isActive?A:"transparent", color: isActive?(isDark?"#0b0b0e":"#fff"):M,
                    border:`1px solid ${isActive?A:Br}`, transition:"all 0.2s ease" }}
                  onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.borderColor=`${A}50`; e.currentTarget.style.color=P; }}}
                  onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.borderColor=Br; e.currentTarget.style.color=M; }}}>
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3" style={{ color:M }}>
              <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}>
                <Loader2 size={22} />
              </motion.div>
              <span className="text-[14px]">Loading posts…</span>
            </div>
          ) : (
            <>
              <motion.p key={activeCategory} initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ duration:0.3 }} className="text-[12px] mb-8" style={{ color:M }}>
                Showing <span style={{ color:P, fontWeight:600 }}>{filtered.length}</span> post{filtered.length!==1?"s":""}
                {activeCategory!=="All" && <> in <span style={{ color:A, fontWeight:600 }}>{activeCategory}</span></>}
              </motion.p>

              <AnimatePresence mode="wait">
                <motion.div key={`${activeCategory}-${currentPage}`}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
                  transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}>
                  <BlogCards blogs={currentBlogs} />
                </motion.div>
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-14">
                  <motion.button whileTap={{ scale:0.93 }}
                    onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                    disabled={currentPage===1}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-30"
                    style={{ border:`1px solid ${Br}`, color:P, transition:"all 0.2s ease" }}
                    onMouseEnter={e=>{ if(currentPage!==1){ e.currentTarget.style.borderColor=`${A}50`; e.currentTarget.style.background=`${A}10`; }}}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=Br; e.currentTarget.style.background="transparent"; }}>
                    <ChevronLeft size={16} />
                  </motion.button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length:totalPages }, (_,i) => i+1).map(page => (
                      <motion.button key={page} onClick={() => setCurrentPage(page)} whileTap={{ scale:0.93 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-semibold cursor-pointer"
                        style={{ background: page===currentPage?A:"transparent",
                          color: page===currentPage?(isDark?"#0b0b0e":"#fff"):M,
                          border:`1px solid ${page===currentPage?A:Br}`, transition:"all 0.2s ease" }}
                        onMouseEnter={e=>{ if(page!==currentPage){ e.currentTarget.style.borderColor=`${A}50`; e.currentTarget.style.color=P; }}}
                        onMouseLeave={e=>{ if(page!==currentPage){ e.currentTarget.style.borderColor=Br; e.currentTarget.style.color=M; }}}>
                        {page}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button whileTap={{ scale:0.93 }}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                    disabled={currentPage===totalPages}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-30"
                    style={{ border:`1px solid ${Br}`, color:P, transition:"all 0.2s ease" }}
                    onMouseEnter={e=>{ if(currentPage!==totalPages){ e.currentTarget.style.borderColor=`${A}50`; e.currentTarget.style.background=`${A}10`; }}}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=Br; e.currentTarget.style.background="transparent"; }}>
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
