import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { RefreshCcwDot, Loader2, CheckCircle } from "lucide-react";
import emailjs from "emailjs-com";
import IndustrySection from "../components/IndustrySection";
import serviceData from "../data/servicesData";
import Footer from "../Pages/Footer";
import BusinessTalk from "../Pages/BusinessTalk";

// ======================= FLIP CARD COMPONENT =======================
const FlipCard = ({ offer, isMobile, index }) => {
  const [flipped, setFlipped] = useState(false);

  // If offer.icon is a component reference, render it as a component
  const Icon = offer.icon || null;

  return (
    <motion.div
      key={index}
      className="group perspective cursor-pointer"
      initial={{ opacity: 0, rotateY: 180 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true }}
      onClick={() => isMobile && setFlipped(!flipped)}
    >
      <div
        className={`relative preserve-3d w-full h-[320px] transition-transform duration-700 ${
          isMobile ? (flipped ? "[transform:rotateY(180deg)]" : "") : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-black rounded-tr-[50px] p-8 flex flex-col items-start justify-between shadow-lg backface-hidden border border-gray-800">
          <div>
            <div className="mb-4">
              {Icon && <Icon className="w-10 h-10 text-[#68b5cc]" />}
            </div>
            <h3 className="text-3xl 2xl:text-4xl font-semibold mb-3 text-white">
              {offer.title}
            </h3>
            <p className="text-gray-400 text-sm max-w-md">{offer.short || offer.subtitle}</p>
          </div>
          <div className="self-end mt-4">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.6 }} className="text-[#68b5cc]">
              <RefreshCcwDot size={40} />
            </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 bg-[#111] rounded-tl-[50px] p-8 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden border border-gray-700">
          <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-sm">
            {offer.descback}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ======================= FAQ ITEM COMPONENT =======================
const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 cursor-pointer select-none" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-white">{faq.question}</h3>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-[#68b5cc] text-3xl font-bold">
          +
        </motion.span>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed">{faq.answer}</p>
      </motion.div>
    </div>
  );
};

// ======================= MAIN SERVICE PAGE =======================
const ServicePage = () => {
  const { serviceSlug } = useParams();
  const data = serviceData[serviceSlug];
  const [isMobile, setIsMobile] = useState(false);

  // Form / modal state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!data) return <div className="text-white p-10">Service Not Found</div>;
const [showChatbotForm, setShowChatbotForm] = useState(false);
const [chatbotFormData, setChatbotFormData] = useState({
  name: "",
  email: "",
  company: "",
  website: "",
  message: ""
});
const [chatbotLoading, setChatbotLoading] = useState(false);
const [chatbotSuccess, setChatbotSuccess] = useState("");
const handleChatbotChange = (e) => {
  setChatbotFormData({ ...chatbotFormData, [e.target.name]: e.target.value });
};
const handleChatbotSubmit = async (e) => {
  e.preventDefault();
  setChatbotLoading(true);
  setChatbotSuccess("");

  try {
    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: chatbotFormData.name,
        from_email: chatbotFormData.email,
        company_name: chatbotFormData.company,
        website_url: chatbotFormData.website,
        message: chatbotFormData.message
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );

    setChatbotSuccess("✅ Our team will send your free chatbot shortly!");
    setChatbotFormData({ name: "", email: "", company: "", website: "", message: "" });
  } catch (error) {
    console.error("EmailJS Error:", error);
    setChatbotSuccess("❌ Something went wrong. Try again!");
  } finally {
    setChatbotLoading(false);
  }
};

  const {
    stagesHeading = "STAGES OF WORK",
    offersHeading = "Our Capabilities",
    techStackHeading = "Tech Stack",
    customSection,
    customChatbot,
    customTechStack,
  } = data;

  const steps = data.stages || [];
  const offers = data.offers || [];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // Submit handler - EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      // ensure env variables exist
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID_CUSTOM_CARD;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOM_CARD;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_CUSTOM_CARD;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS keys missing. Make sure .env vars are set.");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        website_url: formData.website,
        message: formData.message,
        service: data.bannerTitle || serviceSlug,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSuccessMsg("Our team will analyze your site soon!");
      setFormData({ name: "", email: "", website: "", message: "" });

      // auto-close modal after a short delay
      setTimeout(() => {
        setShowForm(false);
      }, 1200);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSuccessMsg(" went wrong. Please try again later.");
    } finally {
      setLoading(false);
      // clear success message after some time
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };
 
  return (
    
    <div className="w-full bg-black text-white">
      <Helmet>
        <title>
          {data.seo?.title || data.bannerTitle}
        </title>
      
        <meta
          name="description"
          content={data.seo?.description || data.bannerSubtitle}
        />
      
        <link
          rel="canonical"
          href={`https://www.webaurix.com/services/${serviceSlug}`}
        />
      
        <meta property="og:title" content={data.seo?.title || data.bannerTitle} />
        <meta property="og:description" content={data.seo?.description || data.bannerSubtitle} />
        <meta property="og:type" content="website" />
      
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo?.title || data.bannerTitle} />
        <meta name="twitter:description" content={data.seo?.description || data.bannerSubtitle} />
      </Helmet>


      {/* ===== HERO SECTION ===== */}
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 sm:px-16 lg:px-32 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 grid-pattern pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
            opacity: 0.5,
          }}
        />
        {/* Soft Radial Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top center, rgba(3,105,136,0.35) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Hero Content */}
        <motion.h3
          className="text-[#68b5cc] mt-23 font-bold text-md md:text-lg mb-2 z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          {data.bannerLabel}
        </motion.h3>

        <motion.h1
          className="text-4xl md:text-5xl 2xl:text-6xl font-semibold mb-6 z-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          {data.bannerTitle}
        </motion.h1>

        <motion.p
          className="text-gray-300 text-md md:text-xl max-w-2xl mx-auto z-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
        >
          {data.bannerSubtitle}
        </motion.p>

        <motion.div
          className="mt-8 z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link to="/start-project" className="px-6 py-3 border border-[#68b5cc] text-[#68b5cc] rounded-xl hover:bg-[#68b5cc] hover:text-black transition">
            Start Your Project
          </Link>
        </motion.div>
      </div>

      {/* ===== STAGES OF WORK ===== */}
      <section className="relative w-full bg-[linear-gradient(180deg,rgba(0,0,0,1)_39%,rgba(0,67,79,1)_100%)] py-24 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-left text-4xl md:text-5xl 2xl:text-6xl leading-[1.3] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent font-medium mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {stagesHeading}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-start text-gray-300 border-t border-gray-700 pt-10 relative px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-6xl font-extrabold text-[#68b5cc] mb-6 leading-none">{index + 1}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                {(index + 1) % 4 !== 0 && index < steps.length - 1 && <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[1px] h-24 bg-gray-800"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOM SECTION ===== */}
      {customSection && (
        <section className="relative w-full bg-[#000000] py-24 px-6 md:px-16 overflow-hidden">
          <motion.div
            className="max-w-7xl mx-auto bg-[#0f1a1d] border border-[#68b5cc]/40 rounded-3xl p-10 md:p-16 shadow-lg hover:shadow-[#68b5cc]/20 transition-all duration-500"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">{customSection.title}</h2>
            <p className="text-gray-400 text-md md:text-lg max-w-2xl mb-8">{customSection.desc}</p>

            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-[#68b5cc] text-black font-semibold rounded-xl hover:bg-[#5aa0b3] transition cursor-pointer">
              {customSection.ctaText}
            </button>
          </motion.div>
        </section>
      )}

      {/* ===================== POPUP FORM ===================== */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="relative bg-[#0f1a1d] border border-[#68b5cc]/40 rounded-2xl p-8 md:p-10 w-[90%] max-w-lg shadow-2xl" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <h3 className="text-2xl font-semibold text-white mb-2 text-center">Analyze Your Website</h3>
              <p className="text-gray-400 text-center mb-6">Fill the details below — our experts will review your site soon.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-3 text-white focus:border-[#68b5cc] outline-none" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-3 text-white focus:border-[#68b5cc] outline-none" />
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website URL" required className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-3 text-white focus:border-[#68b5cc] outline-none" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe issues or goals..." required rows="3" className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-3 text-white focus:border-[#68b5cc] outline-none resize-none" />

                <button type="submit" disabled={loading} className="w-full bg-[#68b5cc] text-black font-semibold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#5aa0b3] transition cursor-pointer">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Sending...
                    </>
                  ) : (
                    "Analyze My Site"
                  )}
                </button>
              </form>

              {successMsg && (
                <motion.p className="text-center text-green-400 mt-4 flex justify-center items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <CheckCircle size={18} /> {successMsg}
                </motion.p>
              )}

              <button onClick={() => setShowForm(false)} className="absolute top-4 right-5 text-gray-400 hover:text-white text-xl cursor-pointer">
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== WHAT WE OFFER ===== */}
      <section className="py-24 px-6 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-medium  text-transparent bg-clip-text leading-[1.5] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] mb-16">
            {offersHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {offers.map((offer, i) => (
              <FlipCard key={i} offer={offer} isMobile={isMobile} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOM CHATBOT ===== */}
      {customChatbot && (
        <section className="relative w-full bg-[#000000] py-24 px-6 md:px-16 overflow-hidden">
          <motion.div
            className="max-w-7xl mx-auto bg-[#0f1a1d] border border-[#68b5cc]/40 rounded-3xl p-10 md:p-16 shadow-lg hover:shadow-[#68b5cc]/20 transition-all duration-500"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
              {customChatbot.title}
            </h2>
            <p className="text-gray-400 text-md md:text-lg max-w-2xl mb-8">
              {customChatbot.desc}
            </p>
            <button
        onClick={() => setShowChatbotForm(true)}
        className="px-6 py-3 bg-[#68b5cc] text-black font-semibold rounded-xl hover:bg-[#5aa0b3] transition"
      >
        {customChatbot.ctaText}
      </button>
      
          </motion.div>
        </section>
      )}
      <AnimatePresence>
  {showChatbotForm && (
    <motion.div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0f1a1d] border border-[#68b5cc]/40 rounded-2xl p-6 md:p-10 w-[95%] max-w-3xl shadow-2xl grid md:grid-cols-2 gap-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        {/* ===== Form ===== */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-white mb-2">Get Your Free Chatbot</h3>
          <p className="text-gray-400 mb-4">Fill details below & we will send your chatbot.</p>

          <form onSubmit={handleChatbotSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={chatbotFormData.name}
              onChange={handleChatbotChange}
              placeholder="Your Name"
              required
              className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-2 text-white focus:border-[#68b5cc] outline-none"
            />
            <input
              type="email"
              name="email"
              value={chatbotFormData.email}
              onChange={handleChatbotChange}
              placeholder="Your Email"
              required
              className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-2 text-white focus:border-[#68b5cc] outline-none"
            />
            <input
              type="text"
              name="company"
              value={chatbotFormData.company}
              onChange={handleChatbotChange}
              placeholder="Company Name"
              className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-2 text-white focus:border-[#68b5cc] outline-none"
            />
            <input
              type="url"
              name="website"
              value={chatbotFormData.website}
              onChange={handleChatbotChange}
              placeholder="Website URL"
              className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-2 text-white focus:border-[#68b5cc] outline-none"
            />
            <textarea
              name="message"
              value={chatbotFormData.message}
              onChange={handleChatbotChange}
              placeholder="Additional Details..."
              rows="3"
              className="w-full bg-[#101b1e] border border-[#68b5cc]/30 rounded-lg px-4 py-2 text-white focus:border-[#68b5cc] outline-none resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={chatbotLoading}
              className="w-full bg-[#68b5cc] text-black font-semibold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#5aa0b3] transition"
            >
              {chatbotLoading ? (
                <>Sending...</>
              ) : (
                "Get Chatbot"
              )}
            </button>
          </form>

          {chatbotSuccess && (
            <motion.p
              className="text-center text-green-400 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {chatbotSuccess}
            </motion.p>
          )}
        </div>

        {/* ===== Close Button ===== */}
        <button
          onClick={() => setShowChatbotForm(false)}
          className="absolute top-4 right-5 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </motion.div>
       </motion.div>
       )}
      </AnimatePresence>
      
       {data.customIndustries && (
       <IndustrySection
       data={data.customIndustries}
      />
      )}


      {/* ===== TECH STACK ===== */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-black to-[#00434f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-medium  text-transparent bg-clip-text bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] mb-16">
            {techStackHeading}
          </h2>
          {customTechStack ? (
            Object.keys(customTechStack).map((section, i) => (
              <div key={i} className="mb-16">
                <h3 className="text-3xl font-semibold text-[#68b5cc] mb-8 border-l-4 border-[#68b5cc] pl-4 uppercase">
                  {section}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {customTechStack[section].map((tech, idx) => (
                    <motion.div
                      key={idx}
                      className="border border-[#68b5cc]/40 rounded-xl p-6 flex flex-col items-center justify-center bg-[#0e1b1f] hover:border-[#68b5cc] transition-all duration-300 shadow-md hover:shadow-[#68b5cc]/20"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <img
                        src={tech.img}
                        alt={tech.name}
                        className="w-16 h-16 object-contain mb-3"
                      />
                      <p className="text-gray-300 text-sm font-medium">
                        {tech.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Default stack content...</p>
          )}
        </div>
      </section>
      {/* ===== CUSTOM FAQ SECTION (ABOVE BUSINESS TALK) ===== */}
      {data.customFAQ && (
        <section className="relative w-full bg-[#000000] py-24 px-6 md:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <motion.h2
              className="text-4xl md:text-5xl font-medium leading-[1.2] bg-gradient-to-r from-[#f0fcff] via-[#0393a7] to-[#f0fcff] bg-clip-text text-transparent mb-12 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {data.customFAQ.title || "Frequently Asked Questions"}
            </motion.h2>
      
            {/* FAQ Items */}
            <div className="space-y-6">
              {data.customFAQ.items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-[#68b5cc]/30 rounded-2xl bg-[#0f1a1d]/50 hover:border-[#68b5cc]/70 transition-all duration-300 overflow-hidden"
                >
                  <FAQItem faq={faq} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}
        
        {/* ===== BUSINESS TALK + FOOTER ===== */}
      <BusinessTalk />
      <Footer />
    </div>
  );
};

export default ServicePage;
