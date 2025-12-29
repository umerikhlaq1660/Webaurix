import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import Footer from "./Footer";
import faqSections from "../data/FaqPageData"; // ✅ import your data file

const FaqPage = () => {
  const [openQuestion, setOpenQuestion] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenQuestion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your question has been submitted!");
    setFormData({ name: "", email: "", question: "" });
  };

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-16 lg:px-32">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 grid-pattern pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 10%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        {/* Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top center, rgba(104,181,204,0.2) 0%, rgba(0,0,0,0) 80%)",
            filter: "blur(60px)",
          }}
        />

        {/* Hero Text */}
        <motion.div
          className="relative z-20 max-w-3xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-[#68b5cc] font-bold text-md md:text-lg mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Webaurix
          </motion.h3>

          <motion.h1
            className="text-5xl md:text-7xl 2xl:text-[100px] font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Ask & Learn
          </motion.h1>

          <motion.p
            className="text-gray-400 text-md md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Find quick answers about our company, services, and work process.
          </motion.p>
        </motion.div>
      </div>

      {/* ===== FAQ SECTIONS (Dark Glassmorphic Cards) ===== */}
      <div className="relative z-20 bg-black px-6 sm:px-16 lg:px-32 py-20 space-y-16">
        {faqSections.map((section, sIndex) => (
          <motion.div
            key={sIndex}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0d0d0d]/80 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl hover:shadow-[0_0_35px_rgba(104,181,204,0.15)] transition-all duration-300"
          >
            <h2 className="text-2xl 2xl:text-4xl font-semibold text-[#68b5cc] mb-8 border-b border-gray-700 pb-3">
              {section.title}
            </h2>

            <div className="space-y-6">
              {section.items.map((item, qIndex) => {
                const key = `${sIndex}-${qIndex}`;
                const isOpen = openQuestion[key];
                return (
                  <div
                    key={key}
                    className="border-b border-gray-800 pb-4 last:border-none"
                  >
                    <button
                      onClick={() => toggleQuestion(sIndex, qIndex)}
                      className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-200 hover:text-[#68b5cc] transition cursor-pointer"
                    >
                      {item.question}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#68b5cc]" : "text-gray-400"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-gray-400 leading-relaxed space-y-2"
                        >
                          {Array.isArray(item.answer)
                            ? item.answer.map((line, i) =>
                                line.trim().startsWith("-") ? (
                                  <li
                                    key={i}
                                    className="list-disc list-inside text-gray-400"
                                  >
                                    {line.replace("-", "").trim()}
                                  </li>
                                ) : (
                                  <p key={i}>{line}</p>
                                )
                              )
                            : item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== STILL WONDERING SECTION ===== */}
      <motion.div
        className="relative z-20 bg-black py-24 px-6 sm:px-16 lg:px-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-8xl mx-auto bg-[#0d0d0d]/80 backdrop-blur-md rounded-3xl border border-white/10 p-10 shadow-2xl hover:shadow-[0_0_40px_rgba(104,181,204,0.15)] transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE — TEXT + SOCIAL LINKS */}
          <div className="text-left">
            <h2 className="text-4xl 2xl:text-6xl font-semibold text-white mb-5">
              Still Wondering?
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Didn’t find what you were looking for? Reach out to us directly —
              we’re here to help you understand everything better.
            </p>

            <div className="flex space-x-6 mt-6">
              {[Linkedin, Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-white/10 rounded-full hover:bg-[#68b5cc] hover:text-black transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 text-left"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="bg-transparent border-b border-gray-600 focus:border-[#68b5cc] text-white py-3 outline-none transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="bg-transparent border-b border-gray-600 focus:border-[#68b5cc] text-white py-3 outline-none transition"
            />
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Your Question"
              required
              rows="4"
              className="bg-transparent border-b border-gray-600 focus:border-[#68b5cc] text-white py-3 outline-none transition resize-none custom-scrollbar"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#68b5cc] text-black font-semibold py-3 rounded-xl shadow-lg hover:bg-[#56a2b8] transition cursor-pointer"
            >
              Submit Question
            </motion.button>
          </form>
        </div>
      </motion.div>

      <Footer />
    </section>
  );
};

export default FaqPage;
