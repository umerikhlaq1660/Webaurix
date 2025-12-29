import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/About";
import BusinessTalk from "./Pages/BusinessTalk";
import Footer from "./Pages/Footer";
import ScrollToTop from "./Pages/ScrollToTop";
import CorePhilosophy from "./Pages/CorePhilosophy";
import NotFound from "./Pages/404NotFound";
import ServicePage from "./components/ServicePage";
import ScrollToTopButton from "./Pages/ScrollToTopButton";
import FAQSection from "./Pages/faqs";
import BlogPage from "./Pages/BlogPage";
import BlogDetail from "./Pages/BlogDetail";
import ChatBot from "./components/ChatBot";
import FaqPage from "./Pages/FAQsPage";
import PreLaunchHeader from "./Pages/PreLaunchHeader";
import AdminPanel from "./Pages/AdminPanel";
import WebaurixChat from "./components/WebaurixChat";
import Seo from "./components/Seo";

const App = () => {
  const location = useLocation();

  // Routes where Navbar and ChatBot should be hidden
  const hideOnRoutes = ["/order", "/services/ai-chatbot", "/admin", "/not-found"];
  const isHiddenRoute = hideOnRoutes.some(
    (path) => location?.pathname?.startsWith(path)
  );

  return (
    <>
  
      <ScrollToTop />
      {/* Navbar */}
      {!isHiddenRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <Seo/>
        <Routes location={location} key={location?.pathname || "root"}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<BusinessTalk />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/core" element={<CorePhilosophy />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/chat" element={<WebaurixChat/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/services/ai-chatbot" element={<PreLaunchHeader />} />
          <Route path="/resources/webaurix-faqs" element={<FaqPage />} />
          <Route path="/faqs" element={<FAQSection />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />

      {/* ChatBot */}
      {!isHiddenRoute && <ChatBot />}
    </>
  );
};

export default App;
