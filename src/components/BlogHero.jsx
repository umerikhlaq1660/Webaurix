import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BlogHero = ({ heroData }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden cursor-pointer">
      {/* Background Image - parallax effect */}
      <motion.img
        src={heroData.image}
        style={{
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
        }}
        className="absolute inset-0 w-full h-full object-cover z-0 blur-[1px] opacity-70"
      />

      {/* Overlay & Content - slow parallax */}
      <div
        className="relative z-20 h-full w-full flex items-end justify-center px-4 sm:px-8 md:px-12 lg:px-24 py-[100px]"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl px-6 md:px-10 py-10 w-full max-w-full text-left"
        >
          <p className="uppercase text-sm text-[#EFF6E0] tracking-widest mb-3">
            {heroData.subtitle || "Latest Blogs"}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            {heroData.title || "Insights & Stories"}
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
