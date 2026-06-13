import React from "react";
import {
  MessagesSquare, Bot, Globe, Clock, Zap, Languages,
  PlugZap, BrainCog, ShieldCheck, TrendingUp, Headphones, Workflow,
} from "lucide-react";
import AIServiceLayout from "../components/AIServiceLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  sceneVariant: "nodes",
  path: "/services/ai/chatbot",
  metaTitle: "AI Chatbot Development Services | Webaurix",
  metaDesc:
    "Custom AI chatbots for your business - 24/7 support, lead capture, multilingual conversations, and seamless integrations that feel human.",
  keywords:
    "AI chatbot development, custom chatbot, customer support chatbot, WhatsApp chatbot, multilingual chatbot, conversational AI, lead generation bot, Webaurix",

  eyebrow: "AI Chatbots",
  title: "Chatbots that actually",
  titleHighlight: "talk like humans.",
  description:
    "We build intelligent AI chatbots that understand context, answer accurately from your data, capture leads, and support customers around the clock - across web, WhatsApp, and beyond.",

  stats: [
    { value: "24/7", label: "Instant support" },
    { value: "70%", label: "Queries auto-resolved" },
    { value: "50+", label: "Languages supported" },
  ],

  capabilitiesHeading: "Conversational AI engineered for real conversations.",
  capabilities: [
    { icon: BrainCog,      title: "Context-Aware Replies", desc: "Bots that remember the conversation and answer with real understanding - not scripts." },
    { icon: MessagesSquare,title: "Trained on Your Data",   desc: "Grounded in your docs, FAQs, and products so answers are always accurate and on-brand." },
    { icon: Languages,     title: "Multilingual",           desc: "Talk to every customer in their own language, automatically detected and switched." },
    { icon: TrendingUp,    title: "Lead Capture",           desc: "Qualify visitors, collect details, and book meetings right inside the chat." },
    { icon: PlugZap,       title: "Omnichannel",            desc: "Deploy on your website, WhatsApp, Messenger, and Instagram from one brain." },
    { icon: Headphones,    title: "Human Handoff",          desc: "Seamlessly escalate to a live agent when the conversation needs a person." },
  ],

  process: [
    { title: "Define",   desc: "We map your top use cases, tone, and the data the bot needs." },
    { title: "Train",    desc: "We connect your content and tune responses for accuracy." },
    { title: "Integrate",desc: "We embed the bot into your channels and tools." },
    { title: "Improve",  desc: "We monitor real chats and refine for better resolution." },
  ],

  useCasesHeading: "A tireless team member for every conversation.",
  useCases: [
    { title: "Customer support",     desc: "Answer FAQs and resolve issues instantly, 24/7." },
    { title: "Sales & lead gen",     desc: "Engage visitors and turn them into qualified leads." },
    { title: "Booking & scheduling", desc: "Let customers book appointments inside the chat." },
    { title: "Internal helpdesk",    desc: "Give staff instant answers from internal knowledge." },
  ],

  tech: [
    "OpenAI", "Anthropic Claude", "Dialogflow", "Rasa", "WhatsApp API",
    "Vector Search", "Node.js", "WebSockets", "RAG", "Webhooks",
  ],

  highlight: {
    title: "Always on. Always on-brand.",
    desc: "Our chatbots never sleep, never lose patience, and always speak in your brand's voice - turning support into a competitive advantage.",
  },

  ctaTitle: "Let's launch a chatbot that",
  ctaHighlight: "delights your customers.",
};

const AIChatbot = () => <AIServiceLayout data={data} />;
export default AIChatbot;
