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
import faqData from "../data/faqData";

const SITE = "https://www.webaurix.com";

/* FAQ schema is generated from the same data the page renders,
   so structured data always matches the visible content. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}/#service`,
  name: "Webaurix",
  url: SITE,
  image: `${SITE}/logo-light.png`,
  description:
    "Webaurix is a web development and AI agency offering custom websites, mobile apps, AI chatbots, UI/UX design, and digital marketing to clients in Pakistan, South Korea, the United States, and the United Kingdom.",
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "South Korea" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webaurix Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbot Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generative AI Solutions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing & SEO" } },
    ],
  },
};

const Home = () => {
  return (
    <>
      <Seo
        title="Webaurix | Web Development, AI Chatbots & Digital Marketing Agency"
        description="Webaurix is a web development and AI agency building fast websites, mobile apps, AI chatbots, UI/UX design, and digital marketing for brands in Pakistan, South Korea, the US, and the UK."
        keywords="web development agency, AI chatbot development, mobile app development, UI UX design agency, digital marketing agency, generative AI solutions, custom software development, web design Pakistan, software company Lahore"
        url={`${SITE}/`}
        schema={[serviceSchema, faqSchema]}
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
