// src/pages/BlogDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogData";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <div className="text-white p-10">Blog Not Found</div>;

  const relatedBlogs = blogs.filter(
    (b) => b.label === blog.label && b.slug !== blog.slug
  );

  // Parallax scroll for hero image
  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]); // moves -100px over 500px scroll

  return (
    <div className="w-full bg-black text-white">
      {/* ===== SEO ===== */}
      <Helmet>
        <title>{blog.title} | Webaurix Blog</title>
        <meta name="description" content={blog.snippet || blog.title} />
      </Helmet>

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Parallax Background Image */}
        <motion.img
          src={blog.image}
          className="absolute inset-0 w-full h-full object-cover z-0 blur-[1px] opacity-70"
          alt={blog.title}
          style={{ y: parallaxY }}
        />

        {/* Hero Content */}
        <div className="relative z-20 h-full w-full flex items-end justify-center px-4 sm:px-8 md:px-12 lg:px-24 py-[100px]">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl px-6 md:px-10 py-10 w-full max-w-full text-left"
          >
            <p className="uppercase text-sm text-[#EFF6E0] tracking-widest mb-3">
              {blog.label || "Latest Blog"}
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-300 text-sm mb-2">
              {blog.author ? `${blog.author} | ` : ""}
              {blog.date}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-20 px-4 sm:px-8 md:px-16 max-w-8xl mx-auto text-left">
        {blog.content.map((block, index) => (
          <div key={index} className="mb-12">
            {block.heading && (
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-white">
                {block.heading}
              </h2>
            )}
            {block.paragraph && (
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed mb-4">
                {block.paragraph}
              </p>
            )}
            {block.paragraphs &&
              block.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}
            {block.points && (
              <ul className="list-disc list-inside text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed space-y-2 mb-4">
                {block.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* ===== RELATED BLOGS SECTION ===== */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 px-4 sm:px-8 md:px-16 bg-black border-t border-white/10">
          <div className="max-w-8xl mx-auto text-left">
            <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-bold mb-10 leading-tight bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#0393a7] bg-clip-text text-transparent">
              Related Blogs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((related, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300"
                >
                  <Link to={`/blog/${related.slug}`}>
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <p className="text-sm text-[#7ebad1] font-semibold mb-2">
                        {related.label}
                      </p>
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {related.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                        {related.snippet}
                      </p>
                      <span className="text-[#68b5cc] text-sm font-semibold">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BACK BUTTON ===== */}
      <div className="text-center px-4 sm:px-8 md:px-16 max-w-4xl mx-auto py-12">
        <Link
          to="/blogs"
          className="bg-[#7ebad1] text-[#0d1321] font-bold px-6 py-3 rounded-full shadow-lg hover:bg-[#99cfd9] transition"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
