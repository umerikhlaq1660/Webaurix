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
  metaTitle: "Generative AI Solutions & Development Services | Webaurix",
  metaDesc:
    "Custom generative AI solutions - content generation, intelligent assistants, RAG pipelines, and automation built around your business data.",
  keywords:
    "generative AI solutions, custom AI development, RAG pipelines, AI assistants, content generation AI, AI automation, enterprise AI, Webaurix",

  eyebrow: "Generative AI",
  title: "Generative AI that",
  titleHighlight: "works for your business.",
  description:
    "We design and ship production-grade generative AI - from custom assistants and content engines to retrieval-augmented pipelines that turn your data into an unfair advantage.",

  stats: [
    { value: "10x", label: "Faster content output" },
    { value: "24/7", label: "Always-on assistants" },
    { value: "100%", label: "Tailored to your data" },
  ],

  capabilitiesHeading: "From prompt to product - generative AI engineered end to end.",
  capabilities: [
    { icon: MessagesSquare, title: "Custom AI Assistants", desc: "Branded chat assistants trained on your docs, products, and tone - embedded right into your site or app." },
    { icon: FileText,       title: "Content Generation",   desc: "Engines that draft blogs, product copy, emails, and social posts on-brand and at scale." },
    { icon: Search,         title: "RAG Pipelines",        desc: "Retrieval-augmented generation that grounds answers in your real data - no hallucinations." },
    { icon: ImageIcon,      title: "Image & Media AI",     desc: "Generate, edit, and upscale visuals - product shots, thumbnails, and creative assets on demand." },
    { icon: Wand2,          title: "Workflow Automation",  desc: "Let AI summarize, classify, and route - automating the repetitive parts of your operations." },
    { icon: Bot,            title: "Agentic Systems",      desc: "Multi-step AI agents that plan, call tools, and complete real tasks autonomously." },
  ],

  process: [
    { title: "Discovery", desc: "We map your data, goals, and the highest-ROI AI opportunities." },
    { title: "Design",    desc: "We architect the model, prompts, and guardrails around your use case." },
    { title: "Build",     desc: "We engineer the pipeline, integrate your data, and test for accuracy." },
    { title: "Deploy",    desc: "We ship, monitor, and continuously fine-tune in production." },
  ],

  useCasesHeading: "Where generative AI moves the needle.",
  useCases: [
    { title: "Customer support automation", desc: "Resolve common queries instantly while routing complex ones to humans." },
    { title: "Knowledge base assistants",   desc: "Let teams query internal docs in plain language." },
    { title: "Marketing content at scale",  desc: "Generate campaign copy, SEO articles, and variants in minutes." },
    { title: "Document processing",         desc: "Summarize contracts, extract data, and classify files automatically." },
  ],

  tech: [
    "OpenAI", "Anthropic Claude", "Google Gemini", "LangChain",
    "Vector DBs", "Pinecone", "Hugging Face", "Python", "Node.js", "RAG",
  ],

  highlight: {
    title: "Grounded in your data - not guesswork.",
    desc: "Every solution we build is connected to your real content through retrieval pipelines, so answers stay accurate, on-brand, and trustworthy.",
  },

  ctaTitle: "Let's turn your data into a",
  ctaHighlight: "generative AI advantage.",
};

const GenerativeAI = () => <AIServiceLayout data={data} />;
export default GenerativeAI;
