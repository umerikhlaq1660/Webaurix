// ServicesSection.jsx
import React, { useState } from "react";
import services from "./ServicesData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// custom hook to detect media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const ServicesSection = () => {
  const [showAll, setShowAll] = useState(false);

  // Responsive breakpoints
  const isLarge = useMediaQuery("(min-width:1024px) and (max-width:1279px)"); // lg
  const isXL = useMediaQuery("(min-width:1280px) and (max-width:1536px)"); // xl
  const is2XL = useMediaQuery("(min-width:1536px)"); // 2xl and above

  let visibleServices = services;

  if (!showAll) {
    if (isLarge) {
      visibleServices = services.slice(0, 3);
    } else if (isXL) {
      visibleServices = services.slice(0, 3);
    } else if (is2XL) {
      visibleServices = services.slice(0, 4);
    } else {
      visibleServices = services.slice(0, 4);
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08 },
    }),
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -8, 8, -4, 4, 0],
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="services"
      className="w-full bg-[radial-gradient(circle_at_center,_#124559,_#0a0f1a_60%,_#002f4b)] text-white py-24 px-4 sm:px-8 lg:px-16"
    >
      {/* Heading */}
      <div className="mb-12 text-left">
        <p className="bg-gradient-to-r from-[#b8eefd] via-[#0393a7] to-[#094550] bg-clip-text text-transparent font-bold text-4xl lg:text-7xl mt-2">
          Code the Future of Your Brand
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {visibleServices.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              className="group rounded-2xl border-3 border-[#3e5c76] hover:border-[#7ebad1] transition-all duration-300 shadow-lg hover:shadow-[#7ebad1]/30 bg-transparent px-5 py-20 lg:py-7 xl:py-20 flex flex-col justify-between cursor-pointer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                initial="initial"
                className="flex justify-center mb-4 text-[#7ebad1]"
              >
                <Icon size={50} />
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl lg:text-3xl 2xl:text-4xl font-bold text-center mb-3 text-white group-hover:text-[#7ebad1] transition-all">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-center text-sm leading-relaxed mb-6">
                {service.description ||
                  "We deliver powerful and creative digital solutions tailored to your business goals."}
              </p>

              {/* Learn More Button */}
              <div className="flex justify-center sm:mt-5 mt-5">
                <Link
                  to={service.link}
                  className="border-2 border-[#7ebad1] text-[#7ebad1] px-10 py-2 rounded-lg font-medium hover:bg-[#99cfd9] hover:text-[#0d1321] transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All / View Less Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="border-2 border-[#7ebad1] hover:text-black px-10 py-3 rounded-xl font-semibold hover:bg-[#99cfd9] transition cursor-pointer"
        >
          {showAll ? "View Less" : "View All Services"}
        </button>
      </div>
    </section>
  );
};

export default ServicesSection;
