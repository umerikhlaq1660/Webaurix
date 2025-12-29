// src/pages/AboutUs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaRocket, FaShieldAlt, FaCode, FaHandshake } from "react-icons/fa";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const sections = [
    {
      key: "mission",
      title: "Mission",
      content:
        "At Webaurix, our mission is to empower businesses with cutting-edge digital solutions that drive growth, spark innovation, and deliver measurable results. We are committed to crafting websites, apps, and digital experiences that are not only beautifully designed but strategically built to perform. We believe in turning ideas into scalable realities, helping startups and enterprises alike navigate the digital world with confidence. Through creativity, technology, and a deep understanding of our clients’ goals, we aim to be more than just developers—we strive to be digital partners in their journey toward success.",
    },
    {
      key: "vision",
      title: "Vision",
      content:
        "At Webaurix, our vision is to become a globally recognized digital innovation hub that transforms the way businesses connect, operate, and grow online. We aim to lead the future of web development by blending creativity with technology, delivering solutions that are intuitive, scalable, and future-ready. We envision a digital world where every brand, no matter how small or large, has access to powerful tools and platforms that elevate their presence and impact. Our goal is to shape that world one project, one partnership, and one breakthrough at a time.",
    },
    {
      key: "values",
      title: "Values",
      content:
        "At Webaurix, we believe in the power of innovation, integrity, and passion. We strive to create digital experiences that not only meet expectations but exceed them with creativity and purpose. Our commitment to honesty and transparency guides every client interaction, while our dedication to quality ensures that every project reflects our best work. Collaboration drives our culture, we grow through teamwork, learning from each other and from every challenge we face. Above all, we are driven by a desire to make a real difference through technology, building meaningful solutions that leave a lasting impact.",
    },
    {
      key: "goals",
      title: "Goals",
      content:
        "At Webaurix, our goal is to build digital solutions that truly matter. We aim to help startups and businesses grow online through smart design, modern technologies, and powerful user experiences. We strive to stay ahead in innovation, build long-term client partnerships, and create a name that stands for quality, creativity, and reliability in the digital world.",
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/images/About.webp"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-[1px] opacity-70"
        />
        <div className="relative z-20 h-full w-full flex items-end justify-center px-4 sm:px-8 md:px-12 lg:px-24 py-25">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl px-6 md:px-10 py-10 w-full max-w-full text-left"
          >
            <p className="uppercase text-sm text-[#EFF6E0] tracking-widest mb-3">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Crafting Digital Experiences That Matter
            </h1>
            <Link
              to="/contact"
              className="inline-block bg-[#7ebad1] text-[#0d1321] font-bold px-6 sm:px-8 py-3 rounded-full shadow-lg hover:bg-[#99cfd9] transition"
            >
              Connect With Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sections with Toggle */}
      <section className="relative w-full py-15 px-4 sm:px-6 lg:px-24 bg-black overflow-hidden">
        {/* Background Spots */}
        <div className="absolute top-[-100px] left-[-80px] w-72 h-72 bg-gradient-to-r from-blue-400 to-teal-300 rounded-full blur-3xl opacity-25 z-0" />
        <div className="absolute bottom-[-80px] right-[-60px] w-96 h-96 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full blur-2xl opacity-20 z-0" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tl from-[#124559] to-[#01080f] rounded-full blur-[100px] opacity-10 z-0" />

        {/* Main Heading with Scroll Animation */}
        <motion.div
          className="relative z-10 text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            <span className="relative">
              What{" "}
              <span className="relative inline-block text-transparent bg-gradient-to-r from-[#a3d9e6] to-[#dcecf1] bg-clip-text">
                Drives Us
              </span>
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            We believe in purpose, principles, and progress.
          </p>
        </motion.div>

        {/* Sections */}
        <LayoutGroup>
          {sections.map((section) => (
            <motion.div
              key={section.key}
              layout
              className="relative z-10 max-w-8xl mx-auto w-full mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center justify-between relative">
                <h2 className="text-3xl sm:text-6xl font-bold text-white">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#a3d9e6] to-[#dcecf1] bg-clip-text text-transparent">
                    {section.title}
                  </span>
                </h2>
                <button
                  onClick={() => toggleSection(section.key)}
                  className="text-white text-4xl sm:text-6xl font-light hover:scale-110 transition-transform duration-300"
                >
                  {openSection === section.key ? "−" : "+"}
                </button>
                <div className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-white/20" />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {openSection === section.key && (
                  <motion.div
                    layout
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 text-sm sm:text-base text-white leading-relaxed">
                      {section.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </LayoutGroup>
      </section>
    <section className="w-full bg-black text-white px-4 sm:px-6 lg:px-24 py-24">
     {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">Values We Provide</h2>
        <p className="text-white/70 max-w-xl mx-auto text-base sm:text-lg">
         We bring innovation, reliability, and creativity to every project.
        </p>
      </div>

     {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
      {
        icon: <FaRocket size={40} />,
        title: "Speed & Performance",
        desc: "We build blazing fast websites optimized for all devices.",
      },
      {
        icon: <FaShieldAlt size={40} />,
        title: "Secure & Reliable",
        desc: "Our solutions are secure, stable, and built to last.",
      },
      {
        icon: <FaCode size={40} />,
        title: "Modern Tech Stack",
        desc: "We use the latest frameworks and coding standards.",
      },
      {
        icon: <FaHandshake size={40} />,
        title: "Long-Term Support",
        desc: "We’re here to support you beyond launch day.",
      },
    ].map((card, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm group cursor-default flex flex-col items-center text-center min-h-[300px]"
      >
        <div className="text-[#7ebad1] mb-5 group-hover:rotate-6 transition-transform duration-300">
          {card.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
        <p className="text-white/70 text-sm">{card.desc}</p>
      </motion.div>
    ))}
  </div>
</section>
<Footer />
  </div>
  );
};

export default AboutUs;
