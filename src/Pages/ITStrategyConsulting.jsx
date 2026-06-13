import React from "react";
import {
  ChartNoAxesCombined, Target, Map, GitBranch, Layers, Gauge,
  Compass, ClipboardCheck, TrendingUp, Network, Users, ShieldCheck,
} from "lucide-react";
import ConsultingLayout from "../components/ConsultingLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  path: "/consultancy/it-strategy",
  icon: ChartNoAxesCombined,
  orbitIcons: [Target, Map, GitBranch, Gauge, Network, Compass],

  metaTitle: "IT Strategy Consulting Services | Webaurix",
  metaDesc:
    "Align your technology with business goals. Webaurix IT strategy consulting delivers roadmaps, governance, and architecture that drive measurable growth.",
  keywords:
    "IT strategy consulting, technology roadmap, IT governance, digital strategy, enterprise architecture, IT alignment, Webaurix",

  eyebrow: "IT Strategy Consulting",
  title: "Align technology with your",
  titleHighlight: "business goals.",
  description:
    "We help you turn technology from a cost centre into a growth engine - with clear roadmaps, governance, and architecture decisions that move the business forward.",

  stats: [
    { value: "30%", label: "Lower IT waste" },
    { value: "3x", label: "Faster decisions" },
    { value: "100%", label: "Goal-aligned" },
  ],

  capabilitiesHeading: "Strategy that connects every tech decision to outcomes.",
  capabilities: [
    { icon: Map,           title: "Technology Roadmaps", desc: "Clear, prioritised plans that sequence your tech investments around business value." },
    { icon: Target,        title: "IT–Business Alignment", desc: "Make sure every system and team is pulling toward the same measurable goals." },
    { icon: Layers,        title: "Architecture Planning", desc: "Future-proof architecture decisions that scale without costly rework." },
    { icon: ShieldCheck,   title: "IT Governance",        desc: "Policies, standards, and controls that keep your tech secure and accountable." },
    { icon: TrendingUp,    title: "Cost Optimization",    desc: "Find and cut waste - licensing, infrastructure, and redundant tooling." },
    { icon: Gauge,         title: "Performance KPIs",     desc: "Define the metrics that prove your technology is delivering ROI." },
  ],

  process: [
    { title: "Assess",  desc: "We audit your systems, teams, and goals to find gaps and opportunities." },
    { title: "Strategize", desc: "We craft a prioritised roadmap aligned to business outcomes." },
    { title: "Plan",    desc: "We define architecture, governance, and the path to execution." },
    { title: "Guide",   desc: "We support delivery and adjust the strategy as you grow." },
  ],

  outcomesHeading: "Clarity, control, and confident tech decisions.",
  outcomes: [
    { title: "A clear technology roadmap", desc: "Everyone knows what to build, when, and why." },
    { title: "Lower IT spend",             desc: "Cut waste and redirect budget to what matters." },
    { title: "Reduced risk",               desc: "Governance and standards that keep you safe." },
    { title: "Faster execution",           desc: "Aligned teams move quickly and confidently." },
  ],

  tools: [
    "TOGAF", "ITIL", "Enterprise Architecture", "OKRs", "Roadmapping",
    "Cloud Strategy", "Risk Frameworks", "Cost Modeling",
  ],

  highlight: {
    title: "Strategy you can actually execute.",
    desc: "We don't hand you a 90-page deck and disappear. Our roadmaps are practical, prioritised, and built for your team to deliver.",
  },

  ctaTitle: "Ready to make technology your",
  ctaHighlight: "competitive edge?",
};

const ITStrategyConsulting = () => <ConsultingLayout data={data} />;
export default ITStrategyConsulting;
