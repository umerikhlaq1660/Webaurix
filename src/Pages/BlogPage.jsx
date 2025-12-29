import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import BlogCards from "../components/BlogCards";
import blogs from "../data/blogData";
import Footer from "./Footer";

const BlogPage = () => {
  const categories = ["All", ...new Set(blogs.map((b) => b.label))];

  const [activeCategory, setActiveCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 9;

  // Filter blogs by category
  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.label === activeCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Get current page’s blogs
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  // Handle category change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1); // reset to page 1 on category change
  };

  // Handle pagination
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full bg-black text-white">
      <Helmet>
        <title>Blogs | Webaurix</title>
        <meta
          name="description"
          content="Discover the latest insights, trends, and updates from Webaurix on technology, design, and digital innovation."
        />
      </Helmet>

      {/* ===== HEADER ===== */}
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 sm:px-16 lg:px-32 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 grid-pattern pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 10%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            opacity: 0.5,
          }}
        />

        {/* Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top center, rgba(3,105,136,0.35) 0%, rgba(0,0,0,0) 80%)",
            filter: "blur(40px)",
          }}
        />

        {/* Hero Text */}
        <motion.div
          className="relative z-20 max-w-3xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-[#68b5cc] font-bold text-md md:text-lg mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Webaurix
          </motion.h3>

          <motion.h1
            className="text-5xl md:text-7xl 2xl:text-[100px] font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Insights & Updates
          </motion.h1>

          <motion.p
            className="text-gray-300 text-md md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Dive into expert insights, tech trends, and stories that inspire
            innovation.
          </motion.p>
        </motion.div>
      </div>

      {/* ===== CATEGORY FILTER BAR ===== */}
      <div className="relative w-full bg-black py-8 px-4 sm:px-8 lg:px-16 border-t border-gray-800">
        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              onClick={() => handleCategoryChange(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#68b5cc] text-black border-[#68b5cc]"
                  : "border-gray-600 text-gray-300 hover:border-[#68b5cc] hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:border-[#68b5cc] hover:text-white transition-all"
          >
            <Filter size={18} />
            <span>{activeCategory}</span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute mt-2 left-0 right-0 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-lg z-20"
              >
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleCategoryChange(cat);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-5 py-3 text-sm border-b border-gray-800 last:border-none transition-all ${
                      activeCategory === cat
                        ? "bg-[#68b5cc] text-black font-semibold"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== BLOG CARDS SECTION ===== */}
      <div className="px-4 sm:px-8 lg:px-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <BlogCards blogs={currentBlogs} />
          </motion.div>
        </AnimatePresence>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed border-gray-600 text-gray-500"
                  : "border-[#68b5cc] text-[#68b5cc] hover:bg-[#68b5cc] hover:text-black"
              }`}
            >
              <ChevronLeft size={18} />
              Previous
            </motion.button>

            <p className="text-gray-400 text-sm">
              Page <span className="text-white">{currentPage}</span> of{" "}
              <span className="text-white">{totalPages}</span>
            </p>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed border-gray-600 text-gray-500"
                  : "border-[#68b5cc] text-[#68b5cc] hover:bg-[#68b5cc] hover:text-black"
              }`}
            >
              Next
              <ChevronRight size={18} />
            </motion.button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
