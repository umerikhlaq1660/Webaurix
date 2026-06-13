import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";

const NotFound = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4"
      style={{
        background: "radial-gradient(circle at center, #1e293b, #0f172a)",
      }}
    >
      <Seo
        title="Page Not Found (404) | Webaurix"
        description="The page you're looking for doesn't exist. Head back to Webaurix to explore our web development, mobile app, and AI services."
        path="/not-found"
        noindex
      />
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-extrabold text-[#7ebad1]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xl sm:text-2xl text-gray-300"
      >
        Page Not Found
      </motion.p>

      <p className="text-sm text-gray-400 mt-2">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-[#7ebad1] text-[#0f172a] font-semibold px-6 py-2 rounded-lg hover:bg-white hover:text-black transition"
      >
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFound;
