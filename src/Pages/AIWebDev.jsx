import React from "react";
import {
  Code2, Zap, Search, Gauge, Sparkles, MessageSquare,
  LayoutGrid, Repeat, ShieldCheck, Smartphone, Bot, Boxes,
} from "lucide-react";
import AIServiceLayout from "../components/AIServiceLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  sceneVariant: "knot",
  path: "/services/ai/web",
  metaTitle: "AI-Powered Web & App Development | Webaurix",
  metaDesc:
    "AI-powered web and mobile apps with intelligent search, real-time personalization & in-app copilots. Built on React, Next.js & OpenAI API by Webaurix, Lahore.",
  keywords:
    "AI web development, AI app development, intelligent search, AI personalization, in-app AI assistant, OpenAI integration, React AI development, smart automation, Webaurix",

  eyebrow: "AI-Powered Web & App Development",
  title: "Modern products with",
  titleHighlight: "AI built into the core.",
  description:
    "Webaurix builds web and mobile products where AI is infrastructure, not a feature. Semantic search that understands intent, personalization engines that adapt in real time, in-app copilots that guide every user action. Built on React, Next.js, and OpenAI API for clients in Pakistan, South Korea, the US, and the UK.",

  stats: [
    { value: "50+", label: "Products shipped" },
    { value: "<1s", label: "AI response time" },
    { value: "3x", label: "Higher user engagement" },
  ],

  capabilitiesHeading: "AI features that make products smarter, faster, and stickier.",
  capabilities: [
    { icon: Search,        title: "Intelligent Search", desc: "Semantic vector search with typo tolerance and intent understanding, users find exactly what they need in under 1 second, even with imperfect or incomplete queries." },
    { icon: Sparkles,      title: "Personalization",    desc: "Real-time recommendation engines that update on each interaction, boosting conversion rates by 20–40% in e-commerce and SaaS products without manual tuning." },
    { icon: MessageSquare, title: "In-App Assistants",  desc: "Embedded LLM-powered assistants (GPT-4o or Claude 3.5) that help users navigate, complete tasks, and get answers without leaving your app, response time under 1 second." },
    { icon: Repeat,        title: "Smart Automation",   desc: "Automate onboarding flows, content moderation, data tagging, and form enrichment, freeing your engineering team for higher-value product work." },
    { icon: Gauge,         title: "Predictive UX",      desc: "ML models that surface the next best action, predict churn risk, or pre-fill forms, making the product feel like it anticipates users' needs before they ask." },
    { icon: ShieldCheck,   title: "Safe & Reliable",    desc: "Rate limits, guardrails, cost controls, and fallback logic so AI features stay reliable, affordable, and production-safe at any traffic level." },
  ],

  process: [
    { title: "AI Opportunity Audit",   desc: "We analyse your product journey and data flows to identify where AI adds real, measurable value, not novelty features that don't move KPIs." },
    { title: "Architecture Design",    desc: "We define data flows, model choices, vector store configuration, and API integration points before a single line of code is written." },
    { title: "Full-Stack Development", desc: "We build AI features into a fast, type-safe codebase using React, TypeScript, Node.js, and your preferred cloud, with unit and integration tests for every AI component." },
    { title: "Measure & Optimise",     desc: "We instrument every AI feature with analytics, running A/B tests, measuring accuracy, and iterating until engagement and conversion metrics move." },
  ],

  useCasesHeading: "AI that upgrades the products people use daily.",
  useCases: [
    { title: "E-commerce recommendations", desc: "AI-powered semantic search and recommendations that lift average order value by 25–40%, proven on e-commerce products we've shipped." },
    { title: "SaaS copilots",              desc: "Help users accomplish core tasks 3x faster with contextual LLM-powered guidance embedded directly inside your SaaS platform." },
    { title: "Smart dashboards",           desc: "Ask questions in plain English and get live, charted answers from your database, natural language SQL on your business data." },
    { title: "Content moderation",         desc: "Detect and flag unsafe content across text, images, and user-generated video in real time, before it reaches other users." },
  ],

  tech: [
    "React", "Next.js", "Node.js", "TypeScript", "Vector Search",
    "OpenAI API", "Edge Functions", "WebSockets", "Tailwind", "PostgreSQL",
  ],

  highlight: {
    title: "AI as infrastructure, not an afterthought.",
    desc: "We wire intelligence directly into your data layer, API, and frontend, so features are fast, consistent, and secure. Users experience AI that feels native to the product, not a chatbot widget bolted to the corner of the page.",
  },

  ctaTitle: "Let's build a product that's",
  ctaHighlight: "genuinely intelligent.",
};

const AIWebDev = () => <AIServiceLayout data={data} />;
export default AIWebDev;
