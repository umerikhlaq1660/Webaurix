import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ChatBot from "./components/ChatBot";
import Seo from "./components/Seo";

/* ── lazy-loaded pages ── */
const AboutUs               = lazy(() => import("./Pages/About"));
const BusinessTalk          = lazy(() => import("./Pages/BusinessTalk"));
const CorePhilosophy        = lazy(() => import("./Pages/CorePhilosophy"));
const NotFound              = lazy(() => import("./Pages/404NotFound"));
const ServicePage           = lazy(() => import("./Pages/ServicePage"));
const FAQSection            = lazy(() => import("./components/faqs"));
const BlogPage              = lazy(() => import("./Pages/BlogPage"));
const BlogDetail            = lazy(() => import("./Pages/BlogDetail"));
const FaqPage               = lazy(() => import("./Pages/FAQsPage"));
const PreLaunchHeader       = lazy(() => import("./Pages/PreLaunchHeader"));
const AdminPanel            = lazy(() => import("./Pages/AdminPanel"));
const WebaurixChat          = lazy(() => import("./Pages/WebaurixChat"));
const BookConsultation      = lazy(() => import("./Pages/BookConsultation"));
const Careers               = lazy(() => import("./Pages/Careers"));
const CaseStudies           = lazy(() => import("./Pages/CaseStudies"));
const ContactUs             = lazy(() => import("./Pages/ContactUs"));
const GenerativeAI          = lazy(() => import("./Pages/GenerativeAI"));
const AIWebDev              = lazy(() => import("./Pages/AIWebDev"));
const AIDataConsulting      = lazy(() => import("./Pages/AIDataConsulting"));
const AIChatbot             = lazy(() => import("./Pages/AIChatbot"));
const ITStrategyConsulting  = lazy(() => import("./Pages/ITStrategyConsulting"));
const DigitalTransformation = lazy(() => import("./Pages/DigitalTransformation"));
const CybersecurityConsulting = lazy(() => import("./Pages/CybersecurityConsulting"));
const CloudConsulting       = lazy(() => import("./Pages/CloudConsulting"));
const StartupITConsulting   = lazy(() => import("./Pages/StartupITConsulting"));
const Footer                = lazy(() => import("./components/Footer"));

const App = () => {
  const location = useLocation();

  const hideOnRoutes = ["/start-project", "/services/ai-chatbot", "/admin", "/not-found"];
  const isHiddenRoute = hideOnRoutes.some(
    (path) => location?.pathname?.startsWith(path)
  );

  return (
    <ThemeProvider>
      <ScrollToTop />
      {!isHiddenRoute && <Navbar />}

      <Seo path={location?.pathname || "/"} />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location?.pathname || "root"}>
            <Route path="/" element={<Home />} />
            <Route path="/start-project" element={<BusinessTalk standalone />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/core" element={<CorePhilosophy standalone />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/chat" element={<WebaurixChat />} />
            <Route path="/admin" element={<AdminPanel />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <ScrollToTopButton />
      {!isHiddenRoute && <ChatBot />}
    </ThemeProvider>
  );
};

export default App;
