import React, { useState, useEffect } from "react";
import { FacebookIcon, Instagram, Sparkles, Linkedin, Copyright } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { db } from "../firebase"; 
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Plasma } from "../components/Plasma"; 

const PreLaunchHeader = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const [dbCount, setDbCount] = useState(0);
  const startCount = 100; 
  const motionCount = useMotionValue(startCount);
  const displayCount = useTransform(motionCount, (val) => Math.floor(val).toLocaleString());

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, "waitlist"));
        setDbCount(snapshot.size);
        animate(motionCount, startCount + snapshot.size, { duration: 1.2 });
      } catch (err) {
        console.error("Firestore fetch error:", err.message);
      }
    };
    fetchCount();
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const q = query(collection(db, "waitlist"), where("email", "==", email));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setError("Email already on the waitlist");
        return;
      }

      await addDoc(collection(db, "waitlist"), { email, timestamp: new Date() });
      setDbCount((prev) => prev + 1);
      animate(motionCount, startCount + dbCount + 1, { duration: 1.2 });
      setSubscribed(true);
      setEmail("");
      setError("");
    } catch (err) {
      console.error("Firestore add error:", err.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  const iconsContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const iconItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <Helmet>
        <title>Free AI Chatbot Waitlist | Webaurix</title>
        <meta
          name="description"
          content="Join Webaurix free AI chatbot waitlist. Get early access to an intelligent chatbot solution for your business, automate customer support and boost engagement."
        />
      </Helmet>

      {/* Background Grid + Radial Glow */}
      <div
        className="absolute inset-0 z-0 grid-pattern pointer-events-none"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(3,105,136,0.35) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full gap-6 px-4 sm:px-20 text-center">

        {/* Waitlist Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 px-5 py-2 border border-white/30 text-white rounded-2xl backdrop-blur-sm bg-white/10 text-sm uppercase tracking-wide font-medium"
        >
          <Sparkles size={16} className="text-white shrink-0" />
          <motion.span>{displayCount}</motion.span> on the waitlist
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.3] bg-gradient-to-b from-[#f0fcff] via-[#f0fcff] to-[#0393a7] bg-clip-text text-transparent"
        >
          Coming Soon!
        </motion.h2>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl p-6 sm:p-10 w-full max-w-3xl flex flex-col items-center justify-center gap-4 shadow-lg"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center">
            Join the waitlist to get a free chatbot
          </h1>
          <p className="text-sm sm:text-base text-white/80 text-center leading-relaxed">
            Build your own AI chatbot easily. Subscribe to get early access and updates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 mt-4">
            <input
              type="email"
              placeholder={subscribed ? "Thank you for joining!" : "Enter your email"}
              value={email}
              disabled={subscribed}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 w-full sm:w-auto px-6 py-3 rounded-xl border border-white/40 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-[#7ebad1] focus:border-[#7ebad1] transition-all duration-200"
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribed}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/40 text-white text-sm font-semibold bg-white/10 hover:bg-white/20 hover:scale-101 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {subscribed ? "Joined!" : "Join The Waitlist"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex gap-3 mt-4 justify-center"
          variants={iconsContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: <Instagram size={18} />, link: "https://www.instagram.com/webaurix.official/" },
            { icon: <FacebookIcon size={18} />, link: "https://www.facebook.com/profile.php?id=61579826004264" },
            { icon: <Linkedin size={18} />, link: "https://www.linkedin.com/company/webnaurix-official/?viewAsMember=true" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconItem}
              className="flex items-center justify-center gap-2 px-6 py-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm text-white font-medium transition-all"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="fixed bottom-0 left-0 w-full overflow-hidden pointer-events-none z-30"
      >
        <div className="w-full flex justify-center relative">
          <h1
            className="text-transparent font-extrabold tracking-[0.2em] leading-none text-[22vw] sm:text-[12vw] md:text-[16vw] lg:text-[16vw] xl:text-[14vw] 2xl:text-[17vw] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] pointer-events-none select-none opacity-20 relative -mb-5 sm:-mb-2 md:-mb-9 lg:-mb-10 xl:-mb-16 2xl:-mb-20"
            style={{ WebkitTextStroke: "3px rgba(255,255,255,0.3)" }}
          >
            Waitlist
          </h1>
        </div>

        <div className="fixed bottom-4 left-0 w-full flex justify-center z-30 pointer-events-none">
          <p className="text-white/60 text-sm select-none flex items-center gap-1">
            <Copyright size={15} /> {new Date().getFullYear()} Webaurix. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PreLaunchHeader;
