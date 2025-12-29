import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  const footerLinks = [
    {
      title: "Resources",
      links: [
        { label: "Help Center", to: "/help" },
        { label: "Blog", to: "/blog" },
        { label: "Case Studies", to: "/case-studies" },
        { label: "Developers", to: "/developers" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Why Webaurix", to: "/why-webaurix" },
        { label: "Cost Savings", to: "/cost-savings" },
        { label: "Sustainability", to: "/sustainability" },
        { label: "Fraud Prevention", to: "/fraud-prevention" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Customers", to: "/customers" },
        { label: "Careers", to: "/careers" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden w-full bg-black text-white">
      {/* Background Fade Grid */}
      <div
        className="absolute inset-0 z-0 grid-pattern pointer-events-none"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(255,255,255,1) 20%, rgba(255,255,255,0.1) 85%, transparent 100%)",
          opacity: 0.50,
        }}
      />

      {/* Subtle Top Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom center, rgba(3,105,136,0.25) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 px-6 sm:px-16 lg:px-32 py-16 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-[30%] flex flex-col justify-between">
          <div>
            <img src={logo} alt="Webaurix Logo" className="w-40 mb-4" />
            <p className="text-sm text-white/80 mb-6">
              Stay in the loop — subscribe for updates and insights.
            </p>

            {/* Newsletter Input */}
            <div className="flex items-center bg-white/10 rounded-full overflow-hidden w-full max-w-sm">
              <input
                type="email"
                placeholder="Business Email"
                className="bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none w-full"
              />
              <button className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-full hover:bg-white/90 transition">
                Submit
              </button>
            </div>

            <p className="text-[11px] text-white/50 mt-2 max-w-sm">
              By subscribing, you agree to receive emails from Webaurix. You can
              unsubscribe anytime.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61579826004264"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/webaurix.official/"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/webnaurix-official/?viewAsMember=true"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="w-full lg:w-[65%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20  border-white/10 py-4 px-6 sm:px-16 lg:px-32 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-2">
        {/* Left Links */}
        <div className="flex space-x-4">
          <Link to="/cookie-preferences" className="hover:text-white transition">
            Cookie Preferences
          </Link>
          <Link to="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </div>

        {/* Right Copyright */}
        <div className="text-center sm:text-right">
          © {new Date().getFullYear()} Webaurix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
