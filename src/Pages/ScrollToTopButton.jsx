import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button as soon as user scrolls even a little
  const toggleVisibility = () => {
    if (window.scrollY > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-[#036988] text-white  p-3 md:bottom-6 md:right-22 md:py-4 sm:px-7 md:px-4 rounded-2xl shadow-lg hover:bg-[#19bbec] transition duration-300 z-50 cursor-pointer" 
        >
          <ArrowUp size={38} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
