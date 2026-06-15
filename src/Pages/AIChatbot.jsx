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
  metaTitle: "Custom AI Chatbot Development Services | Webaurix",
  metaDesc:
    "Custom AI chatbots resolving 70%+ of queries 24/7. Multilingual, RAG-powered, omnichannel, web, WhatsApp & Instagram. Built by Webaurix, Lahore, Pakistan.",
  keywords:
    "AI chatbot development, custom chatbot, customer support chatbot, WhatsApp chatbot, multilingual chatbot, RAG chatbot, conversational AI, lead generation chatbot, Webaurix",

  eyebrow: "AI Chatbot Development",
  title: "AI chatbots that resolve,",
  titleHighlight: "not just respond.",
  description:
    "Webaurix engineers intelligent AI chatbots trained on your proprietary data, resolving 70%+ of customer queries around the clock without human intervention. Context-aware, multilingual, and deployable across web, WhatsApp, Instagram, and Messenger. Built on OpenAI GPT-4o, Claude 3.5, and Dialogflow for clients in Pakistan, the US, the UK, and South Korea.",

  stats: [
    { value: "24/7", label: "Always-on support" },
    { value: "70%+", label: "Queries auto-resolved" },
    { value: "50+", label: "Languages supported" },
  ],

  capabilitiesHeading: "Conversational AI engineered for real conversations, not scripts.",
  capabilities: [
    { icon: BrainCog,      title: "Context-Aware Replies", desc: "Bots that retain full conversation history and understand intent at a semantic level, not keyword matching, but genuine comprehension powered by GPT-4o or Claude 3.5 Sonnet." },
    { icon: MessagesSquare,title: "Trained on Your Data",   desc: "Connected to your product docs, FAQs, policies, and knowledge base via RAG with Pinecone vector search, every answer is accurate, current, and grounded in your real content." },
    { icon: Languages,     title: "Multilingual",           desc: "Auto-detect and respond in the user's language, Arabic, Urdu, Korean, Spanish, French, and 50+ more, with the same quality of understanding in every language." },
    { icon: TrendingUp,    title: "Lead Capture",           desc: "Qualify visitors against your ICP, collect contact details, and book calendar slots directly inside the chat, no form redirect, no friction, no drop-off." },
    { icon: PlugZap,       title: "Omnichannel",            desc: "One AI brain deployed simultaneously on your website widget, WhatsApp Business API, Facebook Messenger, and Instagram DMs, consistent experience everywhere." },
    { icon: Headphones,    title: "Human Handoff",          desc: "Intelligent escalation to a live agent via Intercom, Zendesk, or Freshdesk, with full conversation context, intent summary, and sentiment score passed instantly." },
  ],

  process: [
    { title: "Define (Week 1)",   desc: "We analyse your top 20 customer query types, map the bot's tone and guardrails, and identify every data source needed to answer accurately and safely." },
    { title: "Train (Week 2)",    desc: "We connect your knowledge base, configure RAG retrieval with Pinecone, and tune responses against real historical support tickets for maximum resolution accuracy." },
    { title: "Integrate (Week 3)",desc: "We deploy across your chosen channels, website widget, WhatsApp Business API, Messenger, and wire CRM, calendar, and helpdesk integrations." },
    { title: "Improve (Ongoing)", desc: "We review unresolved conversations weekly, refine responses, expand coverage, and deliver monthly reports on resolution rate, deflection %, and CSAT score." },
  ],

  useCasesHeading: "A tireless team member for every conversation.",
  useCases: [
    { title: "Customer support",     desc: "Instantly resolve FAQs, order status, and policy questions at any hour, reducing inbound support ticket volume by 60–70% within the first 90 days." },
    { title: "Sales & lead gen",     desc: "Engage every site visitor, qualify against your ideal customer profile, and book discovery calls, converting 20–35% more leads without adding headcount." },
    { title: "Booking & scheduling", desc: "Let customers book, reschedule, and cancel appointments directly inside the chat, synced to Google Calendar or Calendly in real time." },
    { title: "Internal helpdesk",    desc: "Give HR, IT, and ops teams an AI assistant that answers policy, process, and system questions from your internal knowledge base in under 2 seconds." },
  ],

  tech: [
    "OpenAI", "Anthropic Claude", "Dialogflow", "Rasa", "WhatsApp API",
    "Vector Search", "Node.js", "WebSockets", "RAG", "Webhooks",
  ],

  highlight: {
    title: "Always on. Always accurate. Always on-brand.",
    desc: "Our chatbots never sleep, never lose patience, and never go off-script. Trained on your real data via RAG retrieval, they deliver accurate answers in your brand's voice, turning customer support from a cost centre into a competitive advantage.",
  },

  ctaTitle: "Let's launch a chatbot that",
  ctaHighlight: "delights your customers.",
};

const AIChatbot = () => <AIServiceLayout data={data} />;
export default AIChatbot;
