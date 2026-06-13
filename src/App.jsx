import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/About";
import BusinessTalk from "./Pages/BusinessTalk";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CorePhilosophy from "./Pages/CorePhilosophy";
import NotFound from "./Pages/404NotFound";
import ServicePage from "./Pages/ServicePage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import FAQSection from "./components/faqs";
import BlogPage from "./Pages/BlogPage";
import BlogDetail from "./Pages/BlogDetail";
import ChatBot from "./components/ChatBot";
import FaqPage from "./Pages/FAQsPage";
import PreLaunchHeader from "./Pages/PreLaunchHeader";
import AdminPanel from "./Pages/AdminPanel";
import WebaurixChat from "./Pages/WebaurixChat";
import Seo from "./components/Seo";
import BookConsultation from "./Pages/BookConsultation";
import Careers from "./Pages/Careers";
import CaseStudies from "./Pages/CaseStudies";
import ContactUs from "./Pages/ContactUs";
import GenerativeAI from "./Pages/GenerativeAI";
import AIWebDev from "./Pages/AIWebDev";
import AIDataConsulting from "./Pages/AIDataConsulting";
import AIChatbot from "./Pages/AIChatbot";
import ITStrategyConsulting from "./Pages/ITStrategyConsulting";
import DigitalTransformation from "./Pages/DigitalTransformation";
import CybersecurityConsulting from "./Pages/CybersecurityConsulting";
import CloudConsulting from "./Pages/CloudConsulting";
import StartupITConsulting from "./Pages/StartupITConsulting";

const App = () => {
  const location = useLocation();

  // Routes where Navbar and ChatBot should be hidden
  const hideOnRoutes = ["/start-project", "/services/ai-chatbot", "/admin", "/not-found"];
  const isHiddenRoute = hideOnRoutes.some(
    (path) => location?.pathname?.startsWith(path)
  );

  return (
    <ThemeProvider>
      <ScrollToTop />
      {/* Navbar */}
      {!isHiddenRoute && <Navbar />}

      <Seo path={location?.pathname || "/"} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location?.pathname || "root"}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/start-project" element={<BusinessTalk />} />
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
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services/ai/gen-ai" element={<GenerativeAI />} />
          <Route path="/services/ai/web" element={<AIWebDev />} />
          <Route path="/services/ai-data-consulting" element={<AIDataConsulting />} />
          <Route path="/services/ai/chatbot" element={<AIChatbot />} />
          <Route path="/consultancy/it-strategy" element={<ITStrategyConsulting />} />
          <Route path="/consultancy/digital-transformation" element={<DigitalTransformation />} />
          <Route path="/consultancy/cybersecurity" element={<CybersecurityConsulting />} />
          <Route path="/consultancy/cloud" element={<CloudConsulting />} />
          <Route path="/consultancy/startup-it" element={<StartupITConsulting />} />
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
    </ThemeProvider>
  );
};

export default App;
