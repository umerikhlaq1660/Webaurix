import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration
    once: true,     // only animate once
  });
}, []);
