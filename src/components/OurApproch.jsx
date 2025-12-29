import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const OurApproach = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const stepRefs = useRef([]);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We begin by understanding your goals, audience, and vision — forming a strong foundation for the entire project.",
      color: "from-[#036988] to-[#124559]",
    },
    {
      num: "02",
      title: "Design",
      desc: "Our design team crafts user-centric layouts and visual systems that express your brand’s voice perfectly.",
      color: "from-[#124559] to-[#0a2b3d]",
    },
    {
      num: "03",
      title: "Development",
      desc: "We bring everything to life using scalable, high-performing technologies and clean coding practices.",
      color: "from-[#0a2b3d] to-[#001d2b]",
    },
    {
      num: "04",
      title: "Testing",
      desc: "Rigorous testing ensures flawless performance and a seamless user experience across devices.",
      color: "from-[#001d2b] to-[#000f1a]",
    },
    {
      num: "05",
      title: "Launch",
      desc: "We deploy your project with precision, ensuring a smooth launch and ongoing performance monitoring.",
      color: "from-[#000f1a] to-[#000000]",
    },
  ];

  // Scroll-based activation for small devices
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setActiveIndex(0); // default first open

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = stepRefs.current.findIndex((ref) => ref === entry.target);
              if (index !== -1) setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.6, // Panel 60% visible to activate
        }
      );

      stepRefs.current.forEach((ref) => ref && observer.observe(ref));

      return () => {
        stepRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      };
    }
  }, []);

  const handleClick = (i) => {
    // small devices toggle
    if (window.innerWidth < 1024) {
      setActiveIndex(activeIndex === i ? null : i);
    }
  };

  return (
    <section className="relative w-full bg-black py-24 px-4 sm:px-10 lg:px-24 overflow-hidden">
      {/*  Heading */}
      <div className="mb-16 max-w-8xl">
        <motion.h2
          className="text-5xl font-bold leading-[1.5] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent  mb-2 text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Webaurix Way
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg text-left leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          From concept to completion, every step is guided by strategy, creativity, and precision.
        </motion.p>
      </div>

      {/*  Expanding Panels  */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[550px] rounded-2xl overflow-hidden">
        {steps.map((step, i) => {
          const isActive = activeIndex === i;

          return (
            <motion.div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className={`group relative flex-1 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-800 last:border-none ${
                isActive ? "flex-[3]" : "flex-[1]"
              }`}
              initial={{ flex: 1 }}
              whileHover={window.innerWidth >= 1024 ? { flex: 3 } : {}}
              onClick={() => handleClick(i)}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-90 transition-all duration-700 group-hover:opacity-100`}
              />

              {/* Step Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-[100px] sm:text-[140px] lg:text-[180px] font-bold text-gray-700 group-hover:text-gray-500 tracking-tighter select-none transition-all duration-700"
                >
                  {step.num}
                </motion.span>
              </div>

              {/* Content */}
              <div
                className={`relative z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full p-10 lg:p-12 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 transition-all duration-700 group-hover:text-[#7ebad1]">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg max-w-md">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurApproach;
