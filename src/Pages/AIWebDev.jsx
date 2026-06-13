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
  metaTitle: "AI-Powered Web & App Development Services | Webaurix",
  metaDesc:
    "AI-powered web and app development - intelligent search, personalization, AI assistants, and smart automation baked into modern products.",
  keywords:
    "AI web development, AI app development, intelligent search, AI personalization, in-app AI assistant, smart automation, AI integration, Webaurix",

  eyebrow: "AI-Powered Development",
  title: "Web & apps with",
  titleHighlight: "intelligence built in.",
  description:
    "We build modern web and mobile products with AI woven into the core - smart search, real-time personalization, in-app assistants, and automation that makes your product feel alive.",

  stats: [
    { value: "3x", label: "Higher engagement" },
    { value: "<1s", label: "AI response times" },
    { value: "∞", label: "Scalable by design" },
  ],

  capabilitiesHeading: "AI features that make products smarter, faster, and stickier.",
  capabilities: [
    { icon: Search,        title: "Intelligent Search", desc: "Semantic, typo-tolerant search that understands intent - not just keywords." },
    { icon: Sparkles,      title: "Personalization",    desc: "Real-time recommendations and adaptive UIs tuned to each user's behavior." },
    { icon: MessageSquare, title: "In-App Assistants",  desc: "Embedded copilots that help users navigate, act, and get answers instantly." },
    { icon: Repeat,        title: "Smart Automation",   desc: "Automate onboarding, moderation, tagging, and routine flows with AI." },
    { icon: Gauge,         title: "Predictive UX",      desc: "Anticipate user needs with models that surface the right action at the right time." },
    { icon: ShieldCheck,   title: "Safe & Reliable",    desc: "Guardrails, rate limits, and fallbacks so AI features stay robust in production." },
  ],

  process: [
    { title: "Audit",       desc: "We find where AI adds real value in your product journey." },
    { title: "Architect",   desc: "We design the data flow, models, and integration points." },
    { title: "Develop",     desc: "We build the features into a fast, modern, scalable codebase." },
    { title: "Optimize",    desc: "We measure, tune, and iterate on accuracy and performance." },
  ],

  useCasesHeading: "AI that upgrades the products people use daily.",
  useCases: [
    { title: "E-commerce recommendations", desc: "Boost AOV with AI-driven product discovery." },
    { title: "SaaS copilots",              desc: "Help users do more, faster, inside your platform." },
    { title: "Smart dashboards",           desc: "Natural-language queries over your live data." },
    { title: "Content moderation",         desc: "Auto-flag and filter unsafe content in real time." },
  ],

  tech: [
    "React", "Next.js", "Node.js", "TypeScript", "Vector Search",
    "OpenAI API", "Edge Functions", "WebSockets", "Tailwind", "PostgreSQL",
  ],

  highlight: {
    title: "AI as a feature, not a bolt-on.",
    desc: "We integrate intelligence directly into your architecture - so it's fast, secure, and feels like a natural part of the product, not a gimmick.",
  },

  ctaTitle: "Let's build a product that's",
  ctaHighlight: "genuinely intelligent.",
};

const AIWebDev = () => <AIServiceLayout data={data} />;
export default AIWebDev;
