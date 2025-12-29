import React, { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { label: "Average Growth Increase", value: 200, suffix: "%" },
  { label: "Average Response Time", value: 24, suffix: "hrs" },
  { label: "Client Satisfaction Rate", value: 100, suffix: "%" },
];

const StatsSection = () => {
  const [viewed, setViewed] = useState(Array(stats.length).fill(false));

  return (
    <section className="relative bg-black text-white overflow-hidden py-24 px-6 sm:px-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(99deg,rgba(20,79,102,1)_0%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(20,79,102,1)_100%)] opacity-50"></div>

      <div className="relative z-10 max-w-8xl mx-auto flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-16">
        {/* LEFT SIDE — Heading & Description */}
        <div className="text-center lg:text-left w-full lg:w-1/2 xl:w-1/1 ">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.2] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent uppercase"
          >
            Performance that Speaks for Itself
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-gray-400 max-w-md md:text-lg mx-auto lg:mx-0"
          >
            Numbers that define our commitment measurable, meaningful, and driven by innovation.
            Every project we take on is built on excellence and backed by results that matter.
          </motion.p>
        </div>

        {/* RIGHT SIDE — Stats Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-10 justify-center text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.3 }}
              onViewportEnter={() => {
                setViewed((prev) => {
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
              }}
              className="bg-[#151b1d]/80 border border-[#2a2a2a] rounded-2xl shadow-lg p-8 hover:border-[#7ebad1] hover:shadow-[#7ebad1]/30 transition-all duration-500 cursor-pointer"
            >
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0d8499] ">
                {viewed[i] ? <CountUp end={stat.value} duration={2} /> : 0}
                {stat.suffix}
              </h2>
              <p className="mt-3 text-lg font-medium text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
