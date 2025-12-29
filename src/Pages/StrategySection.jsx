import React from "react";
import { motion } from "framer-motion";

const StrategySection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[#0b1315] text-center overflow-hidden">
      {/* ===== Animated Background Glow ===== */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,147,167,0.15)_0%,transparent_40%)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]" />
      </motion.div>

      {/* ===== Content ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[33px] sm:text-[32px] md:text-5xl lg:text-6xl 2xl:text-7xl font-medium leading-tight"
        >
          <span className="text-[#ffffff]">Grow sales</span>{" "}
          <span className="text-[#0393a7]">with our strategy</span>
          <br className="hidden sm:block" />
          <span className="text-[#ffffff]"> first approach</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Our strategy-driven sales and marketing solutions are designed to adapt quickly
          and help your business achieve measurable growth.
        </motion.p>

        <motion.a
          href="https://calendly.com/info-webaurix/30min"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-5 sm:mt-6 md:mt-7 inline-block bg-gradient-to-r from-[#0393a7] to-[#f0fcff] text-[#0b1315] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-md shadow-[0_0_15px_#0393a780] hover:shadow-[0_0_25px_#0393a7b0] transition-all duration-300 cursor-pointer"
        >
          Book a Free Consultation
        </motion.a>
      </motion.div>
    </section>
  );
};

export default StrategySection;
