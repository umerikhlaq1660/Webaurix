import React from "react";
import {
  BriefcaseBusiness, Workflow, RefreshCw, Cloud, Cpu, Bot,
  Layers, Gauge, TrendingUp, Database, Users, Zap,
} from "lucide-react";
import ConsultingLayout from "../components/ConsultingLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  path: "/consultancy/digital-transformation",
  icon: BriefcaseBusiness,
  orbitIcons: [Workflow, Cloud, Bot, RefreshCw, Database, Zap],

  metaTitle: "Digital Transformation Consulting Services | Webaurix",
  metaDesc:
    "Modernise operations, automate workflows, and unlock growth. Webaurix digital transformation consulting reimagines how your business runs.",
  keywords:
    "digital transformation consulting, business process automation, legacy modernization, workflow automation, digital adoption, change management, Webaurix",

  eyebrow: "Digital Transformation",
  title: "Reimagine how your",
  titleHighlight: "business runs.",
  description:
    "We help you modernise legacy processes, automate the repetitive, and adopt the right technology - transforming how your business operates, end to end.",

  stats: [
    { value: "50%", label: "Less manual work" },
    { value: "2.5x", label: "Faster operations" },
    { value: "40%", label: "Cost savings" },
  ],

  capabilitiesHeading: "Transformation that touches people, process, and technology.",
  capabilities: [
    { icon: Workflow,   title: "Process Automation",   desc: "Automate repetitive workflows so your team focuses on high-value work." },
    { icon: RefreshCw,  title: "Legacy Modernization", desc: "Replace ageing systems with modern, maintainable, scalable platforms." },
    { icon: Cloud,      title: "Cloud Adoption",       desc: "Move to the cloud the right way - secure, cost-efficient, and resilient." },
    { icon: Bot,        title: "AI & Automation",      desc: "Embed AI into operations to predict, classify, and act automatically." },
    { icon: Database,   title: "Data Unification",     desc: "Connect siloed data into a single source of truth for better decisions." },
    { icon: Users,      title: "Change Enablement",    desc: "Help your people adopt new tools with training and clear processes." },
  ],

  process: [
    { title: "Discover", desc: "We map your current operations, bottlenecks, and goals." },
    { title: "Design",   desc: "We blueprint the future-state processes and tech stack." },
    { title: "Transform",desc: "We implement automation, integrations, and new systems." },
    { title: "Adopt",    desc: "We drive adoption and measure the impact continuously." },
  ],

  outcomesHeading: "Leaner operations, happier teams, faster growth.",
  outcomes: [
    { title: "Automated workflows",     desc: "Hours of manual work eliminated every week." },
    { title: "Modern, scalable systems",desc: "No more fragile legacy holding you back." },
    { title: "Connected data",          desc: "One source of truth across the business." },
    { title: "Higher productivity",     desc: "Teams do more with the same resources." },
  ],

  tools: [
    "Cloud Migration", "RPA", "Workflow Automation", "API Integration",
    "Microservices", "AI Automation", "Data Pipelines", "Change Management",
  ],

  highlight: {
    title: "Transformation without the disruption.",
    desc: "We modernise in measured, low-risk phases - so you gain the benefits without halting day-to-day operations.",
  },

  ctaTitle: "Ready to transform how your",
  ctaHighlight: "business operates?",
};

const DigitalTransformation = () => <ConsultingLayout data={data} />;
export default DigitalTransformation;
