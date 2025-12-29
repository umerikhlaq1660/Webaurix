import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import navItems from "./Navlinks.jsx";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (index) => setDropdown(dropdown === index ? null : index);

  useEffect(() => {
    const disable = mobileMenuOpen || (dropdown !== null && screenWidth >= 1024);
    document.body.style.overflow = disable ? "hidden" : "auto";
  }, [mobileMenuOpen, dropdown, screenWidth]);

  const handleLinkClick = () => {
    setDropdown(null);
    setExpandedService(null);
    setMobileMenuOpen(false);
  };

  const isLarge = screenWidth >= 1024;

  return (
    <nav
      className={`fixed top-0 bg-black left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isLarge
          ? " border-b border-"
          : scrolled
          ? " bg-blackshadow-lg"
          : "w-full"
      }`}
    >
      <div className="max-w-full mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="w-40 sm:w-36 md:w-40 lg:w-44 cursor-pointer" />
        </Link>

        {/* Center Nav (visible only on large screens) */}
        {isLarge && (
          <div className="hidden xl:flex flex-grow justify-center space-x-8">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative">
                {item.sections ? (
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="flex gap-1 text-[#fff] font-light cursor-pointer hover:text-[#68b5cc] transition-all"
                  >
                    {item.title}
                    <ChevronDown
                      className={`size-5 mt-0.5 transition-transform duration-200 ${
                        dropdown === idx ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    onClick={handleLinkClick}
                    className="text-[#fff] font-light hover:text-[#68b5cc] transition-all"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Right Button */}
        {isLarge && (
          <div className="hidden xl:flex items-center space-x-4">
            <a
              href="/services/ai-chatbot"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative overflow-hidden px-4 py-2 rounded-md text-sm md:text-base font-semibold
                border border-[#3e5c76] text-[#68b5cc] 
                bg-gradient-to-r from-[#034558] via-[#00151f] to-[#68b5cc] 
                bg-[length:200%_200%] bg-left-top
                animate-gradient-shine
                shadow-lg shadow-[#68b5cc]/40
                transition-all duration-500
                hover:text-white hover:scale-105
              "
            >
              Join The Waitlist
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="text-white block xl:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Desktop Dropdown */}
      {isLarge && dropdown !== null && navItems[dropdown].sections && (
        <div className="absolute w-full left-0 backdrop-blur-lg bg-black/95 border-t border-white/10 shadow-lg z-40 transition-all duration-300 rounded-b-2xl max-h-[90vh] overflow-y-auto">
          {navItems[dropdown].title === "CONSULTANCY" ? (
            <div className="px-8 md:px-16 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                {navItems[dropdown].sections.map((section, index) => {
                  const firstLink = section.links && section.links[0] ? section.links[0].to || "#" : "#";
                  return (
                    <Link
                      key={index}
                      to={firstLink}
                      onClick={handleLinkClick}
                      className="group block rounded-2xl p-6 bg-white/3 hover:bg-white/5 transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl flex items-center justify-center text-[#68b5cc] bg-[#68b5cc]/10">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                            {section.heading}
                            <ChevronRight className="size-5 text-gray-400 group-hover:text-[#68b5cc] transition" />
                          </h3>
                          <p className="text-gray-400 text-sm mt-1 leading-snug">{section.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16 py-10">
              {navItems[dropdown].sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-5 transition-all duration-300 cursor-pointer group relative hover:bg-white/5"
                  onMouseEnter={() => setExpandedService(index)}
                  onMouseLeave={() => setExpandedService(null)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl flex items-center justify-center text-[#68b5cc] bg-[#68b5cc]/10">
                      {section.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                        {section.heading}
                        <ChevronRight
                          className={`size-5 text-gray-400 transition-transform duration-300 ${
                            expandedService === index ? "rotate-90 text-[#68b5cc]" : ""
                          }`}
                        />
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 leading-snug">
                        {section.subtitle || "Explore our services in this category."}
                      </p>
                    </div>
                  </div>

                  {/* Links for each section */}
                  {expandedService === index && section.links && (
                    <div className="mt-4 border-t border-white/10 pt-3 space-y-2 animate-fadeIn">
                      {section.links.map((link, i) => (
                        <Link
                          key={i}
                          to={link.to}
                          onClick={handleLinkClick}
                          className="block text-gray-300 text-sm hover:text-[#68b5cc] transition-all"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-white/10 shadow-lg z-40 overflow-y-auto max-h-[85vh] rounded-b-3xl scrollbar-thin scrollbar-thumb-[#68b5cc]/30 scrollbar-track-transparent"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item, idx) => (
                <div key={idx} className="border-b border-white/10 pb-4">
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="flex justify-between items-center w-full text-white text-lg font-medium hover:text-[#68b5cc] transition-all cursor-pointer"
                  >
                    {item.icon}
                    {item.title}
                    {item.sections && (
                      <motion.div animate={{ rotate: dropdown === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className={`size-5 ${dropdown === idx ? "text-[#68b5cc]" : ""}`} />
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {dropdown === idx && item.sections && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="mt-3 pl-3 space-y-3 overflow-hidden"
                      >
                        {item.sections.map((section, index) => (
                          <div key={index}>
                            <button
                              onClick={() => setExpandedService(expandedService === index ? null : index)}
                              className="text-[#68b5cc] font-semibold text-base mb-1 flex justify-between w-full cursor-pointer"
                            >
                              {section.heading}
                              <motion.div animate={{ rotate: expandedService === index ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronRight className="size-4 text-gray-400" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {expandedService === index && section.links && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.28, ease: "easeInOut" }}
                                  className="pl-3 space-y-1"
                                >
                                  {section.links.map((link, i) => (
                                    <Link
                                      key={i}
                                      to={link.to}
                                      onClick={handleLinkClick}
                                      className="block text-gray-300 text-sm hover:text-[#68b5cc] transition-all cursor-pointer py-1"
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="/services/ai-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative overflow-hidden px-4 py-2 rounded-md text-sm md:text-base text-center font-semibold
                    border border-[#3e5c76] text-[#68b5cc] 
                    bg-gradient-to-r from-[#034558] via-[#00151f] to-[#68b5cc] 
                    bg-[length:200%_200%] bg-left-top
                    animate-gradient-shine
                    shadow-lg shadow-[#68b5cc]/40
                    transition-all duration-500
                    hover:text-white hover:scale-105
                  "
                >
                  Join The Waitlist
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
