import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ScrollToTopButton() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const accent  = isDark ? "#68b5cc" : "#0e7490";
  const bg      = isDark ? "rgba(13,16,23,0.85)" : "rgba(255,255,255,0.85)";
  const border  = isDark ? "rgba(104,181,204,0.25)" : "rgba(14,116,144,0.2)";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed bottom-[4.75rem] right-5 z-50 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
          style={{
            background: bg,
            border: `1px solid ${border}`,
            color: accent,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: `0 4px 20px rgba(0,0,0,0.15)`,
            willChange: "transform",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
