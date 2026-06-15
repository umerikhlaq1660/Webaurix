import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "../data/faqData";
import Seo from "./Seo";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSend = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      message.trim() === ""
    )
      return;

    setSent(true);
    setTimeout(() => {
      setShowPopup(false);
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 1500);
  };

  return (
    <section className="relative min-h-screen bg-[#050505] text-white py-20 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <Seo
        title="FAQs | Web Development, App & AI Questions Answered – Webaurix"
        description="Answers to common questions about Webaurix's web development, mobile app, and AI services, our process, pricing, timelines, and support."
        keywords="Webaurix FAQs, web development questions, app development pricing, AI services, digital agency process"
        url="https://webaurix.com/resources/webaurix-faqs"
      />

      {/* Gradient Backgrounds */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#7ebad1]/34 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#036988] blur-[120px] rounded-full" />

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-8xl mx-auto">
        {/* LEFT SIDE */}
        <div className="flex justify-between flex-col space-y-10">
          <div>
            <h2 className="text-4xl sm:text-5xl 2xl:text-6xl font-extrabold leading-[1.2] bg-gradient-to-r from-[#b9ecff] to-[#036988] bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Everything you need to know before getting started.  
              We’ve compiled answers to help you better understand our process and services.
            </p>
          </div>

          {/* Contact Box (Desktop) */}
          <div className="hidden mb-5 lg:block backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg hover:border-[#7ebad1]/60 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Still Wondering?
            </h3>
            <p className="text-gray-400 mb-6">
              Can’t find the answer you’re looking for? Send us a message and
              we’ll get back to you as soon as possible!
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#7ebad1] to-[#036988] rounded-xl font-medium shadow-md hover:shadow-[#7ebad1]/50 transition cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (FAQs + Mobile Contact Box) */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:border-[#7ebad1]/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-[#7ebad1] text-2xl"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 500 }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Contact Box for Mobile */}
          <div className="block lg:hidden backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg hover:border-[#7ebad1]/60 transition-all duration-300 mt-10">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6">
              Can’t find the answer you’re looking for? Send us a message and
              we’ll get back to you as soon as possible!
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#7ebad1] to-[#036988] rounded-xl font-medium shadow-md hover:shadow-indigo-700/50 transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl"
            >
              {!sent ? (
                <>
                  <h3 className="text-2xl font-semibold mb-4 text-[#7ebad1]">
                    Send us a Message
                  </h3>

                  {/* Name Input */}
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#7ebad1]"
                  />

                  {/* Email Input */}
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#7ebad1]"
                  />

                  {/* Message Textarea */}
                  <textarea
                    rows="5"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#7ebad1] mb-6 resize-none scroll-m-3"
                  />

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleSend}
                      className="px-6 py-3 bg-gradient-to-r from-[#7ebad1] to-[#036988] rounded-xl font-medium shadow-md hover:shadow-[#7ebad1]/40 transition cursor-pointer"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="px-6 py-3 bg-gray-700 rounded-xl font-medium hover:bg-gray-600 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[#7ebad1] text-lg font-medium"
                >
                  Message sent successfully!
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FAQSection;
