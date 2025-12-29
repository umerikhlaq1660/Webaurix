import React from "react";
import { motion } from "framer-motion";

const IndustrySection = ({ data, onCTA }) => {
  if (!data) return null;

  const rows = [];
  for (let i = 0; i < data.industries.length; i += 4) {
    rows.push(data.industries.slice(i, i + 4));
  }

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,rgba(0,0,0,1)_39%,rgba(0,67,79,1)_100%)] py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.h2
          className="text-left text-4xl md:text-5xl 2xl:text-6xl leading-[1.3] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent font-medium mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {data.title}
        </motion.h2>

        <p className="text-gray-400 text-md md:text-lg max-w-2xl mb-12">
          {data.desc}
        </p>

        {/* Rows */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative mb-16">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
              {row.map((industry, index) => {
                const Icon = industry.icon;

                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center justify-start text-gray-300 pt-10 relative px-4 border-t border-gray-700"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Icon */}
                    {Icon && (
                      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-[#68b5cc]/20 text-[#68b5cc] text-2xl z-10">
                        <Icon />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {industry.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-left">
                      {industry.desc}
                    </p>

                    {/* Vertical line for all items including last */}
                    <div className="hidden lg:block absolute right-0 top-0 h-full w-[1px] bg-gray-800"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Centered CTA Button */}
        {data.btnText && (
          <div className="flex justify-center mt-8">
            <button
              onClick={onCTA}
              className="px-6 py-3 bg-[#68b5cc] text-black font-semibold rounded-xl hover:bg-[#5aa0b3] transition"
            >
              {data.btnText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustrySection;
