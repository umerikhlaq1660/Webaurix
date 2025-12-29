import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Innovation First",
    img: "/images/Card-1.webp",
    desc: "We believe in pushing the boundaries of technology to create solutions that are both creative and practical. Combining ideas with cutting-edge tools, we deliver work that stands out, adapts to change, and meets the highest standards.",
  },
  {
    id: 2,
    title: "Client Centric",
    img: "/images/Card-2.webp",
    desc: "We put our clients at the heart of everything we do. Every solution is tailored to their goals through open communication, measurable results, and long-term trust.",
  },
  {
    id: 3,
    title: "Adaptability",
    img: "/images/Card-3.webp",
    desc: "We embrace change as a chance for growth, staying flexible to meet new challenges and ensuring our solutions remain relevant, creative, and future-ready.",
  },
  {
    id: 4,
    title: "Transparency",
    img: "/images/Card-4.webp",
    desc: "Transparency builds trust. From start to finish, we communicate openly, keeping clients informed and involved in every step of the process.",
  },
  {
    id: 5,
    title: "Excellence",
    img: "/images/Card-5.webp",
    desc: "We pursue excellence by focusing on creativity, precision, and quality. Every detail is refined to consistently exceed expectations and deliver real impact.",
  },
];

const CorePhilosophy = () => {
  const [active, setActive] = useState(2);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => setActive((prev) => (prev + 1) % cards.length);
  const prevCard = () => setActive((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="relative bg-black text-white overflow-hidden py-24 px-4">
      {/* Center Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(99deg,rgba(20,79,102,1)_0%,rgba(20,79,102,1)_0%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(20,79,102,1)_100%)] opacity-50"></div>

      {/* Section Header */}
      <div className="relative z-10 text-center">
        <motion.p
          className="text-white text-sm sm:text-base md:text-lg tracking-[4px] uppercase mb-3 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Principles
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl xl:text-6xl font-bold leading-[1.3] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Webaurix Core Philosophy
        </motion.h2>

        <motion.p
          className="text-gray-400 mt-4 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          The foundation that drives our creativity, collaboration, and commitment to excellence.
        </motion.p>
      </div>

      {/* Carousel Section */}
      <div className="relative flex justify-center items-center mt-20 overflow-hidden z-10">
        {/* Left Button (hidden on small devices) */}
        <button
          onClick={prevCard}
          className="hidden md:block absolute left-4 md:left-10 text-gray-400 hover:text-white z-20 text-5xl select-none cursor-pointer"
        >
          ‹
        </button>

        {/* Cards Display */}
        <div className="relative w-full flex justify-center items-center h-[400px] sm:h-[460px] md:h-[540px] lg:h-[600px] xl:h-[640px]">
          <AnimatePresence>
            {cards.map((card, index) => {
              const offset = (index - active + cards.length) % cards.length;
              let x = 0,
                scale = 1,
                zIndex = 0,
                opacity = 1;

              if (offset === 0) {
                x = 0;
                scale = 1;
                zIndex = 30;
              } else if (offset === 1 || offset === -4) {
                x = 250;
                scale = 0.8;
                zIndex = 20;
                opacity = 0.6;
              } else if (offset === 4 || offset === -1) {
                x = -250;
                scale = 0.8;
                zIndex = 20;
                opacity = 0.6;
              } else {
                x = 0;
                scale = 0.6;
                zIndex = 10;
                opacity = 0;
              }

              return (
                <motion.div
                  key={card.id}
                  className={`absolute bg-[#151b1d] bg-blur-3xl rounded-2xl shadow-lg overflow-hidden border-2 border-[#2a2a2a] cursor-grab hover:border-[#7ebad1] hover:delay-55 hover:shadow-[#7ebad1]/30
                    w-[260px] h-[360px]
                    sm:w-[300px] sm:h-[420px]
                    md:w-[340px] md:h-[480px]
                    lg:w-[380px] lg:h-[520px]
                    xl:w-[420px] xl:h-[460px]
                  `}
                  style={{ zIndex }}
                  animate={{ x, scale, opacity }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-60 object-cover"
                  />
                  <div className="p-4 sm:p-6 text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-[#0d8499] bg-clip-text text-transparent mb-2 sm:mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={nextCard}
          className="hidden md:block absolute right-4 md:right-10 text-gray-400 hover:text-white z-20 text-5xl select-none cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CorePhilosophy; 