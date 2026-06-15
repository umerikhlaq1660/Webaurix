import React from "react";
import {
  Sparkles, FileText, ImageIcon, MessagesSquare, Bot, Wand2,
  Search, Layers, Cpu, Workflow, Database, ShieldCheck,
} from "lucide-react";
import AIServiceLayout from "../components/AIServiceLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  sceneVariant: "core",
  path: "/services/ai/gen-ai",
  metaTitle: "Custom Generative AI Development Services | Webaurix",
  metaDesc:
    "Build production-grade generative AI, RAG pipelines, AI assistants, content engines & agentic workflows. Powered by OpenAI, Claude & Gemini. Webaurix, Lahore, Pakistan.",
  keywords:
    "generative AI development, custom AI solutions, RAG pipeline development, LLM integration, AI content generation, AI assistants, agentic workflows, OpenAI development, Webaurix",

  eyebrow: "Generative AI Development",
  title: "Generative AI, engineered",
  titleHighlight: "for real business results.",
  description:
    "Webaurix designs and ships production-grade generative AI, from RAG-powered assistants trained on your proprietary data to agentic workflows that automate complex operations. Built on OpenAI GPT-4o, Claude 3.5, and Google Gemini, deployed for clients across Pakistan, the US, the UK, and South Korea.",

  stats: [
    { value: "50+", label: "AI solutions delivered" },
    { value: "10x", label: "Faster content output" },
    { value: "24/7", label: "Always-on AI assistants" },
  ],

  capabilitiesHeading: "Production-grade generative AI, from prototype to deployment.",
  capabilities: [
    { icon: MessagesSquare, title: "Custom AI Assistants", desc: "Branded chat assistants trained on your proprietary docs, products, and tone using RAG, embedded in your site or app with sub-second response times and full conversation memory." },
    { icon: FileText,       title: "Content Generation",   desc: "AI content engines that draft SEO articles, product copy, emails, and social posts on-brand and at scale, reducing content production time by 10+ hours per week." },
    { icon: Search,         title: "RAG Pipelines",        desc: "Retrieval-Augmented Generation with Pinecone or Weaviate vector search, answers grounded in your real knowledge base with zero hallucinations and full source attribution." },
    { icon: ImageIcon,      title: "Image & Media AI",     desc: "Generate, edit, and upscale product shots, thumbnails, and creative assets using DALL-E 3, Stable Diffusion, and Midjourney APIs, on demand and on-brand." },
    { icon: Wand2,          title: "Workflow Automation",  desc: "AI agents that classify, summarise, route, and trigger actions, automating repetitive operations and cutting processing time by 70%+ with LangChain and n8n." },
    { icon: Bot,            title: "Agentic Systems",      desc: "Multi-step LLM agents built on LangChain and AutoGen that plan, call external APIs, and complete real multi-step tasks autonomously without human intervention." },
  ],

  process: [
    { title: "Discovery (Week 1)", desc: "We map your data sources, business goals, and the highest-ROI AI opportunities, delivering a clear implementation brief and model selection rationale." },
    { title: "Design (Week 1–2)",  desc: "We architect the model selection, prompt engineering strategy, retrieval pipeline, and safety guardrails tailored specifically to your use case and data." },
    { title: "Build (Week 2–5)",   desc: "We engineer the full pipeline, data ingestion, vector indexing, model integration, and API layer, with accuracy and hallucination testing at every stage." },
    { title: "Deploy & Improve",   desc: "We ship to production, monitor resolution rates and hallucination frequency, and continuously fine-tune based on real user interactions and feedback." },
  ],

  useCasesHeading: "Where generative AI creates measurable business advantage.",
  useCases: [
    { title: "Customer support automation", desc: "Resolve 70%+ of support queries instantly while routing edge cases to humans, reducing support cost by up to 60% with no sacrifice in CSAT." },
    { title: "Knowledge base assistants",   desc: "Let teams query thousands of internal documents in plain language, accurate answers from your real knowledge base in under 2 seconds." },
    { title: "Marketing content at scale",  desc: "Generate 50+ on-brand blog posts, ads, and email variants per month, reviewed by your team, not written from scratch each time." },
    { title: "Document processing",         desc: "Extract, classify, and summarise contracts, invoices, and reports automatically, cutting manual document review time by 80%." },
  ],

  tech: [
    "OpenAI", "Anthropic Claude", "Google Gemini", "LangChain",
    "Vector DBs", "Pinecone", "Hugging Face", "Python", "Node.js", "RAG",
  ],

  highlight: {
    title: "Your data. Your accuracy. No hallucinations.",
    desc: "Every solution we build uses retrieval-augmented generation (RAG) to ground AI answers in your actual content, so users get accurate, on-brand responses backed by your real knowledge base, not generic model outputs.",
  },

  ctaTitle: "Let's turn your data into a",
  ctaHighlight: "generative AI advantage.",
};

const GenerativeAI = () => <AIServiceLayout data={data} />;
export default GenerativeAI;
