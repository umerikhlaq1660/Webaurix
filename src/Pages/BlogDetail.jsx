import React, { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Loader2, Calendar, User, Tag, Clock, List } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

/* slugify a heading into a stable anchor id */
const slugify = (str = "") =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const BlogDetail = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { scrollY, scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -90]);
  const progress  = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [blog,     setBlog]     = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activeId, setActiveId] = useState("");

  const bg = isDark
    ? "linear-gradient(155deg,#0b0b0e 0%,#0d1017 100%)"
    : "linear-gradient(155deg,#ffffff 0%,#f4f7ff 100%)";
  const P  = isDark ? "#f0eeec"                : "#0c0c10";
  const M  = isDark ? "rgba(240,238,236,0.5)"  : "rgba(12,12,16,0.5)";
  const A  = isDark ? "#68b5cc"                : "#0e7490";
  const Br = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const Cd = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(query(collection(db, "blogs"), where("slug", "==", slug), limit(1)));
        if (!snap.empty) {
          const docData = { id: snap.docs[0].id, ...snap.docs[0].data() };
          setBlog(docData);
          const relSnap = await getDocs(
            query(collection(db, "blogs"),
              where("label",     "==", docData.label),
              where("published", "==", true))
          );
          const relBlogs = relSnap.docs
            .map(d => ({ id:d.id, ...d.data() }))
            .filter(b => b.slug !== slug)
            .sort((a, b) => {
              const ta = a.createdAt?.toDate?.() || new Date(a.date || 0);
              const tb = b.createdAt?.toDate?.() || new Date(b.date || 0);
              return tb - ta;
            })
            .slice(0, 3);
          setRelated(relBlogs);
        } else {
          setBlog(null); setRelated([]);
        }
      } catch {
        setBlog(null); setRelated([]);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  /* table-of-contents — markdown headings or legacy block headings */
  const toc = useMemo(() => {
    if (blog?.markdown) {
      return [...blog.markdown.matchAll(/^##\s+(.+)$/gm)]
        .map(m => ({ id: slugify(m[1].trim()), title: m[1].trim() }));
    }
    return (blog?.content || [])
      .filter(b => b.heading)
      .map(b => ({ id: slugify(b.heading), title: b.heading }));
  }, [blog]);

  /* reading time estimate */
  const readTime = useMemo(() => {
    if (blog?.markdown) return Math.max(1, Math.round(blog.markdown.split(/\s+/).length / 200));
    const words = (blog?.content || []).reduce((n, b) => {
      let w = 0;
      if (b.paragraph)  w += b.paragraph.split(/\s+/).length;
      if (b.paragraphs) w += b.paragraphs.join(" ").split(/\s+/).length;
      if (b.points)     w += b.points.join(" ").split(/\s+/).length;
      return n + w;
    }, blog?.snippet ? blog.snippet.split(/\s+/).length : 0);
    return Math.max(1, Math.round(words / 200));
  }, [blog]);

  /* scroll-spy: highlight the section currently in view */
  useEffect(() => {
    if (!blog || toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [blog, toc]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) { setActiveId(id); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: isDark ? "#0b0b0e" : "#fff" }}>
      <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}>
        <Loader2 size={28} style={{ color: A }} />
      </motion.div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: isDark?"#0b0b0e":"#fff" }}>
      <p className="text-[18px] font-bold" style={{ color: P }}>Blog post not found.</p>
      <Link to="/blogs" className="text-[14px] font-semibold" style={{ color: A }}>← Back to Blog</Link>
    </div>
  );

  return (
    <div className="w-full min-h-screen" style={{ background: bg }}>
      <Helmet>
        <title>{blog.title} | Webaurix Blog</title>
        <meta name="description" content={blog.snippet || blog.title} />
        {blog.tags && <meta name="keywords" content={Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags} />}
        <link rel="canonical" href={`https://www.webaurix.com/blog/${slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://www.webaurix.com/blog/${slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://www.webaurix.com/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blog.title} | Webaurix Blog`} />
        <meta property="og:description" content={blog.snippet || blog.title} />
        <meta property="og:url" content={`https://www.webaurix.com/blog/${slug}`} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.snippet || blog.title} />
        {blog.image && <meta name="twitter:image" content={blog.image} />}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.snippet || blog.title,
            image: blog.image || "https://www.webaurix.com/og-image.png",
            author: { "@type": "Organization", name: blog.author || "Webaurix" },
            publisher: {
              "@type": "Organization",
              name: "Webaurix",
              logo: { "@type": "ImageObject", url: "https://www.webaurix.com/logo-light.png" },
            },
            datePublished: blog.date || undefined,
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.webaurix.com/blog/${slug}` },
            keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags,
          })}
        </script>
      </Helmet>

      {/* ── READING PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{ scaleX: progress, background: A }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[68vh] min-h-[460px] w-full overflow-hidden">
        {blog.image && (
          <motion.img src={blog.image} alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: parallaxY, scale: 1.08 }} />
        )}
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.12) 100%)" }} />

        <div className="absolute top-24 left-5 sm:left-10 z-20">
          <Link to="/blogs">
            <motion.div initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.2, duration:0.45 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold backdrop-blur-md"
              style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"#f0eeec",
                transition:"background 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.18)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}>
              <ArrowLeft size={14} /> All Posts
            </motion.div>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-10 lg:px-16 pb-10 sm:pb-14">
          <div className="max-w-[860px]">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.15, duration:0.5, ease:[0.22,1,0.36,1] }}
              className="flex items-center gap-2 mb-3 flex-wrap">
              {blog.label && (
                <span className="px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide"
                  style={{ background: A, color:"#060c10" }}>{blog.label}</span>
              )}
              {blog.date && (
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color:"rgba(240,238,236,0.65)" }}>
                  <Calendar size={11} />{blog.date}
                </span>
              )}
              {blog.author && (
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color:"rgba(240,238,236,0.65)" }}>
                  <User size={11} />{blog.author}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-[12px]" style={{ color:"rgba(240,238,236,0.65)" }}>
                <Clock size={11} />{readTime} min read
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.22, duration:0.6, ease:[0.22,1,0.36,1] }}
              className="text-[28px] sm:text-[42px] lg:text-[52px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color:"#f0eeec" }}>
              {blog.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── ARTICLE + TOC ── */}
      <section className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-12 lg:gap-16">

          {/* ─── MAIN ARTICLE ─── */}
          <article className="min-w-0 max-w-[760px]">
            {/* lead / snippet */}
            {blog.snippet && (
              <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.1, duration:0.5 }}
                className="text-[17px] sm:text-[19px] leading-[1.8] mb-12 pb-10 font-medium"
                style={{ color: M, borderBottom:`1px solid ${Br}` }}>
                {blog.snippet}
              </motion.p>
            )}

            {/* ── MARKDOWN content (new posts) ── */}
            {blog.markdown ? (
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.15, duration:0.5 }}
                className="blog-md-body">
                <style>{`
                  .blog-md-body h1,.blog-md-body h2,.blog-md-body h3{color:${P};font-weight:700;line-height:1.2;margin-top:2rem;margin-bottom:.75rem;letter-spacing:-.01em}
                  .blog-md-body h1{font-size:clamp(1.5rem,3vw,2rem)}
                  .blog-md-body h2{font-size:clamp(1.25rem,2.5vw,1.7rem)}
                  .blog-md-body h3{font-size:1.1rem}
                  .blog-md-body p{color:${M};font-size:15px;line-height:1.85;margin-bottom:1.1rem}
                  .blog-md-body a{color:${A};font-weight:600;text-decoration:underline;text-underline-offset:3px}
                  .blog-md-body ul{margin:1rem 0 1.25rem 0;padding-left:0;list-style:none}
                  .blog-md-body ul li{display:flex;align-items:flex-start;gap:10px;color:${M};font-size:15px;line-height:1.8;margin-bottom:.55rem}
                  .blog-md-body ul li::before{content:'';width:6px;height:6px;border-radius:50%;background:${A};flex-shrink:0;margin-top:9px}
                  .blog-md-body ol{margin:1rem 0 1.25rem 1.25rem;color:${M};font-size:15px;line-height:1.85}
                  .blog-md-body ol li{margin-bottom:.55rem}
                  .blog-md-body strong{color:${P};font-weight:700}
                  .blog-md-body em{font-style:italic;color:${M}}
                  .blog-md-body code{background:${Br};color:${A};padding:2px 7px;border-radius:6px;font-size:13px;font-family:monospace}
                  .blog-md-body pre{background:rgba(0,0,0,0.3);border:1px solid ${Br};border-radius:12px;padding:1.25rem;overflow-x:auto;margin:1.25rem 0}
                  .blog-md-body pre code{background:none;padding:0;font-size:13px;color:${M}}
                  .blog-md-body blockquote{border-left:3px solid ${A};padding-left:1rem;margin:1.25rem 0;color:${M};font-style:italic}
                  .blog-md-body hr{border:none;border-top:1px solid ${Br};margin:2rem 0}
                  .blog-md-body table{width:100%;border-collapse:collapse;font-size:14px;margin:1.25rem 0}
                  .blog-md-body th{color:${P};font-weight:700;padding:.6rem .75rem;border-bottom:2px solid ${Br};text-align:left}
                  .blog-md-body td{color:${M};padding:.55rem .75rem;border-bottom:1px solid ${Br}}
                `}</style>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {blog.markdown}
                </ReactMarkdown>
              </motion.div>
            ) : (
            /* ── legacy block content (old posts) ── */
            (blog.content || []).map((block, i) => {
              const id = block.heading ? slugify(block.heading) : undefined;
              return (
                <motion.div key={i} id={id}
                  initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-40px" }}
                  transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
                  className="mb-10" style={{ scrollMarginTop: "100px" }}>
                  {block.heading && (
                    <h2 className="text-[22px] sm:text-[28px] lg:text-[31px] font-bold mb-4 leading-[1.2] tracking-[-0.01em]"
                      style={{ color: P }}>{block.heading}</h2>
                  )}
                  {block.paragraph && (
                    <p className="text-[15px] sm:text-[16px] leading-[1.85] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
                      style={{ color: M }}
                      dangerouslySetInnerHTML={{ __html: block.paragraph.replace(/<a /g, `<a style="color:${A}" target="_blank" rel="noopener noreferrer" `) }} />
                  )}
                  {block.paragraphs && block.paragraphs.map((para, j) => (
                    <p key={j} className="text-[15px] sm:text-[16px] leading-[1.85] mb-4 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
                      style={{ color: M }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/<a /g, `<a style="color:${A}" target="_blank" rel="noopener noreferrer" `) }} />
                  ))}
                  {block.points && (
                    <ul className="space-y-2.5 mt-3">
                      {block.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-3 text-[15px] sm:text-[16px] leading-[1.8] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
                          style={{ color: M }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-[10px] flex-shrink-0" style={{ background: A }} />
                          <span dangerouslySetInnerHTML={{ __html: pt.replace(/<a /g, `<a style="color:${A}" target="_blank" rel="noopener noreferrer" `) }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })
            )}

            {/* tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-8 mt-8" style={{ borderTop:`1px solid ${Br}` }}>
                <Tag size={13} style={{ color:M }} />
                {blog.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold"
                    style={{ background:`${A}12`, color:A, border:`1px solid ${A}25` }}>{t}</span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-2xl p-7 sm:p-8" style={{ background: Cd, border:`1px solid ${Br}` }}>
              <p className="text-[17px] sm:text-[19px] font-bold mb-2" style={{ color:P }}>
                Ready to build something like this?
              </p>
              <p className="text-[14px] leading-[1.7] mb-5" style={{ color:M }}>
                Webaurix designs and builds websites, mobile apps, and AI solutions for businesses
                across Pakistan, South Korea, the US, and the UK. Get a free consultation and a quote within 24 hours.
              </p>
              <Link to="/start-project">
                <motion.span whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer"
                  style={{ background:A, color: isDark?"#0b0b0e":"#fff" }}>
                  Start a Project →
                </motion.span>
              </Link>
            </div>
          </article>

          {/* ─── ON THIS PAGE (TOC) ─── */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
                  style={{ color: M }}>
                  <List size={13} /> On this page
                </p>
                <nav className="flex flex-col gap-1 border-l" style={{ borderColor: Br }}>
                  {toc.map(({ id, title }) => {
                    const active = activeId === id;
                    return (
                      <button key={id} onClick={() => scrollToSection(id)}
                        className="text-left text-[13px] leading-[1.5] py-1.5 pl-4 -ml-px border-l-2 transition-colors"
                        style={{
                          borderColor: active ? A : "transparent",
                          color: active ? A : M,
                          fontWeight: active ? 600 : 400,
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.color = P; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.color = M; }}>
                        {title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-16 py-16 sm:py-20" style={{ borderTop:`1px solid ${Br}` }}>
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-10 tracking-tight" style={{ color:P }}>
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.slice(0,3).map((rel, i) => (
                <motion.div key={rel.id || rel.slug} initial={{ opacity:0, y:20 }}
                  whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ delay: i*0.08, duration:0.5, ease:[0.22,1,0.36,1] }}>
                  <Link to={`/blog/${rel.slug}`} className="group block h-full">
                    <div className="h-full rounded-2xl overflow-hidden flex flex-col"
                      style={{ background:Cd, border:`1px solid ${Br}`, transition:"border-color 0.2s ease" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${A}40`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor=Br; }}>
                      {rel.image && (
                        <div className="relative overflow-hidden" style={{ aspectRatio:"16/9" }}>
                          <img src={rel.image} alt={rel.title}
                            className="w-full h-full object-cover"
                            style={{ transition:"transform 0.5s ease" }}
                            onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.05)"; }}
                            onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }} />
                          {rel.label && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-bold"
                              style={{ background:A, color: isDark?"#0b0b0e":"#fff" }}>{rel.label}</div>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-[14px] font-bold leading-snug mb-2 line-clamp-2"
                          style={{ color:P }}>{rel.title}</h3>
                        {rel.snippet && (
                          <p className="text-[12.5px] leading-[1.7] line-clamp-2 flex-1" style={{ color:M }}>
                            {rel.snippet}
                          </p>
                        )}
                        <p className="text-[11px] mt-3 font-semibold" style={{ color:A }}>Read More →</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
