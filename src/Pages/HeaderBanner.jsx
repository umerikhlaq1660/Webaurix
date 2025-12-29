import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeaderWithGrid = () => {
  // Smooth scroll to section by ID
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Hero Section"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 grid-pattern pointer-events-none"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* Soft Radial Glow from Bottom Center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(3,105,136,0.35) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white gap-5 px-4 sm:px-20 text-center">
        {/* Label Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm bg-white/10 text-sm uppercase tracking-wide font-medium"
        >
          <Sparkles size={16} className="text-white shrink-0" aria-hidden="true" />
          <span>IT Services For Everyone</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-normal leading-tight bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
        >
          Where intelligence meets innovation, We build the future with Vision.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
        >
          Discover how intelligent systems can transform your workflow and power
          new possibilities in your business.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <button
            onClick={() => scrollToSection("services")}
            className="px-16 sm:px-20 py-3 rounded-full border border-white/40 text-white text-sm tracking-wide font-semibold bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Learn More
          </button>

          <button
            onClick={() => scrollToSection("business")}
            className="px-16 sm:px-20 py-3 rounded-full border border-white/40 text-white text-sm tracking-wide font-semibold bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeaderWithGrid;
