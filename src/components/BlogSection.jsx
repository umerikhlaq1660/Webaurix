import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    image: "/Blog/Webdev.jpg",
    excerpt:
      "AI is reshaping the digital landscape. Learn how intelligent automation and generative tools are transforming how websites are built and optimized.",
    link: "/blog/web-development-trends-2025",
  },
  {
    id: 2,
    title: "Cybersecurity Practices Every Business Should Follow",
    image: "/Blog/Cybersecurity.jpg",
    excerpt:
      "Every business should follow strong cybersecurity practices like using strong passwords, updates, backups, and employee training to prevent data breaches.",
    link: "/blog/cybersecurity-practices-2025",
  },
  {
    id: 3,
    title: "How AI is Transforming the Future of Business",
    image: "/Blog/Artificial Intelligence.jpg",
    excerpt:
      "AI is reshaping industries and redefining how businesses operate. Discover how artificial intelligence is driving innovation, efficiency, and growth in the future.",
    link: "/blog/Artificial Intelligence",
  },
  {
    id: 4,
    title: "A Deep Dive into Shopify Plus and Its Advanced Features",
    image: "/Blog/Shopify.jpg",
    excerpt:
      "Shopify Plus offers powerful features designed for high-growth businesses. Explore the advanced tools that make it the ultimate platform for scaling online stores.",
    link: "/blog/Shopify",
  },
];

const BlogsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-black text-white overflow-hidden py-24 px-4 sm:px-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(99deg,rgba(20,79,102,1)_0%,rgba(0,0,0,1)_25%,rgba(0,0,0,1)_75%,rgba(20,79,102,1)_100%)] opacity-50"></div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-between items-center"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent uppercase">
              Latest Insights & Articles
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl md:text-lg">
              Stay up-to-date with trends, strategies, and ideas shaping the
              digital world powered by Webaurix expertise.
            </p>
          </div>

          {/* Arrows — visible only on large screens */}
          <div className="hidden lg:flex space-x-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-transparent border-3 border-gray-600 hover:bg-gray-900 hover:border-white transition cursor-pointer"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-transparent border-3  border-gray-600 hover:bg-gray-900 hover:border-white transition cursor-pointer"
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>
        </motion.div>

        {/* Scrollable blog cards */}
        <div className="relative z-10">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%] 2xl:min-w-[23%]"
              >
                <Link
                  to={blog.link}
                  className="block border border-[#2a2a2a] rounded-2xl shadow-lg overflow-hidden hover:border-[#7ebad1] hover:shadow-[#7ebad1]/30 transition-all duration-500 cursor-pointer group h-[480px] flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05445e]/70 via-black/30 to-transparent"></div>
                  </div>

                  {/* Text */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-[#0d8499] bg-clip-text text-transparent mb-3 group-hover:text-[#7ebad1] transition line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                    <span className="text-[#7ebad1] font-medium hover:text-white transition mt-auto">
                      Read More →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All button */}
        <div className="flex justify-center mt-20">
          <Link to="/blogs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-3 bg-gradient-to-r from-[#7ebad1] to-[#036988] rounded-xl font-medium shadow-lg hover:shadow-[#7ebad1]/50 transition cursor-pointer"
            >
              View All Blogs
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
