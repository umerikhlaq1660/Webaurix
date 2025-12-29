import React from "react";
import Seo from "../components/Seo";
import HeaderBanner from "./HeaderBanner";
import ServicesSection from "./ServicesSection";
import Footer from "./Footer";
import CorePhilosophy from "./CorePhilosophy";
import FAQSection from "./faqs";
import BusinessTalk from "./BusinessTalk";
import StatsSection from "./StatsSection";
import BlogsSection from "../components/BlogSection";
import OurApproach from "../components/OurApproch";
import StrategySection from "./StrategySection";

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
      <StrategySection />
      <StatsSection />
      <FAQSection />
      <BlogsSection />
      <BusinessTalk />
      <Footer />
    </>
  );
};

export default Home;
