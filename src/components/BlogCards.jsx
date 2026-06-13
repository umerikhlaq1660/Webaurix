import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const BlogCards = ({ blogs }) => {
  const { isDark } = useTheme();

  const P  = isDark ? "#f0eeec"                : "#0c0c10";
  const M  = isDark ? "rgba(240,238,236,0.42)" : "rgba(12,12,16,0.44)";
  const A  = isDark ? "#68b5cc"                : "#0e7490";
  const Br = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const Cd = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";

  if (!blogs.length) {
    return (
      <div className="py-24 text-center" style={{ color: M }}>
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {blogs.map((blog, i) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <Link to={`/blog/${blog.slug}`} className="group block h-full">
            <div
              className="h-full rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: Cd,
                border: `1px solid ${Br}`,
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${A}40`;
                e.currentTarget.style.boxShadow = isDark
                  ? `0 12px 40px rgba(0,0,0,0.4)`
                  : `0 12px 40px rgba(0,0,0,0.08)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = Br;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* image */}
              {blog.image && (
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {/* category pill */}
                  {blog.label && (
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wide"
                      style={{ background: A, color: isDark ? "#0b0b0e" : "#fff" }}
                    >
                      {blog.label}
                    </div>
                  )}
                </div>
              )}

              {/* content */}
              <div className="flex flex-col flex-1 p-5">
                <h3
                  className="text-[15px] sm:text-[16px] font-bold leading-snug mb-2"
                  style={{ color: P, transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = A}
                  onMouseLeave={e => e.currentTarget.style.color = P}
                >
                  {blog.title}
                </h3>

                {blog.snippet && (
                  <p
                    className="text-[13px] leading-[1.75] mb-4 flex-1 line-clamp-3"
                    style={{ color: M }}
                  >
                    {blog.snippet}
                  </p>
                )}

                {/* meta + link */}
                <div className="flex items-center justify-between mt-auto pt-4"
                  style={{ borderTop: `1px solid ${Br}` }}>
                  <div className="flex flex-col gap-0.5">
                    {blog.author && (
                      <span className="text-[11.5px] font-semibold" style={{ color: P }}>
                        {blog.author}
                      </span>
                    )}
                    {blog.date && (
                      <span className="text-[11px]" style={{ color: M }}>
                        {blog.date}
                      </span>
                    )}
                  </div>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${A}15`,
                      color: A,
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = A}
                    onMouseLeave={e => e.currentTarget.style.background = `${A}15`}
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogCards;
