import React from "react";
import Seo from "../components/Seo";
import HeaderBanner from "../components/HeaderBanner";
import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";
import CorePhilosophy from "./CorePhilosophy";
import FAQSection from "../components/FAQsSection";
import BusinessTalk from "./BusinessTalk";
import StatsSection from "../components/StatsSection";
import BlogsSection from "../components/BlogSection";
import OurApproach from "../components/OurApproch";
const Home = () => {
  return (
    <>
      <Seo
        title="Webaurix | Aura That Redefines Tech"
        description="Webaurix builds high performance websites, AI chatbots, and digital solutions that scale businesses globally."
        url="https://www.webaurix.com/"
      />

      <HeaderBanner />
      <CorePhilosophy />
      <ServicesSection />
      <OurApproach />
      <StatsSection />
      <FAQSection />
      <BlogsSection />
      <BusinessTalk />
      <Footer />
    </>
  );
};

export default Home;
