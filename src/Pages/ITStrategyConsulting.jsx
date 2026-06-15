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

  metaTitle: "IT Strategy Consulting for Business Growth | Webaurix",
  metaDesc:
    "Technology roadmaps, IT governance & enterprise architecture aligned to your business goals. Webaurix IT strategy consulting, Pakistan, US, UK, South Korea.",
  keywords:
    "IT strategy consulting, technology roadmap, IT governance, enterprise architecture, TOGAF consulting, IT business alignment, digital strategy, IT cost optimisation, Webaurix",

  eyebrow: "IT Strategy Consulting",
  title: "Technology aligned to",
  titleHighlight: "your business outcomes.",
  description:
    "Webaurix helps leadership teams turn technology from a cost centre into a growth engine. We deliver prioritised technology roadmaps, TOGAF-informed architecture decisions, and IT governance frameworks grounded in your actual business goals, not generic best practices. Serving organisations in Pakistan, South Korea, the US, and the UK.",

  stats: [
    { value: "30%", label: "Average IT cost reduction" },
    { value: "3x", label: "Faster tech decisions" },
    { value: "100%", label: "Business-goal aligned" },
  ],

  capabilitiesHeading: "Strategy that connects every technology decision to measurable outcomes.",
  capabilities: [
    { icon: Map,         title: "Technology Roadmaps",  desc: "12–36 month plans that sequence your technology investments by ROI, so you build the right things in the right order with a clear, quantified business case for each initiative." },
    { icon: Target,      title: "IT–Business Alignment",desc: "We map every system, team, and initiative against measurable business objectives, ending the disconnect between IT delivery speed and strategic business goals." },
    { icon: Layers,      title: "Architecture Planning", desc: "TOGAF-informed architecture decisions that reduce technical debt, support seamless integration, and scale to 5x your current load without costly rework 18 months later." },
    { icon: ShieldCheck, title: "IT Governance",         desc: "ITIL-aligned policies, RACI matrices, and controls aligned to ISO 27001, so your technology investments are accountable, auditable, and secure at every level." },
    { icon: TrendingUp,  title: "Cost Optimization",     desc: "Licence audits, vendor rationalisation, and cloud right-sizing that typically reduce IT operating costs by 20–35% within the first 12 months of engagement." },
    { icon: Gauge,       title: "Performance KPIs",      desc: "Define the leading and lagging indicators that prove your technology is delivering, tracked in a live governance dashboard reviewed monthly with leadership." },
  ],

  process: [
    { title: "Current State Audit",    desc: "2-week assessment of your systems, vendors, spend, and team capabilities, with honest findings and a prioritised gap analysis, not a sales pitch for additional services." },
    { title: "Strategy Design",        desc: "We co-create a prioritised technology roadmap with your leadership team, every initiative mapped to a measurable business objective with an owner and timeline." },
    { title: "Architecture & Planning",desc: "We document the target architecture, governance model, and a phased execution plan with sequenced milestones, resource requirements, and risk mitigation steps." },
    { title: "Execution Support",      desc: "We join your programme reviews, unblock architectural decisions, and adjust the roadmap quarterly as market conditions and business priorities evolve." },
  ],

  outcomesHeading: "Clarity, control, and confident tech decisions.",
  outcomes: [
    { title: "A roadmap every team understands",   desc: "Executives, IT, and product teams aligned on what to build, when, and why, captured in one prioritised, living document." },
    { title: "20–35% lower IT operating costs",    desc: "Licence rationalisation and infrastructure right-sizing that delivers measurable savings within the first 12 months of engagement." },
    { title: "Reduced technology risk",            desc: "Governance and architecture decisions that prevent costly mistakes before they are built into production systems." },
    { title: "Faster, more confident decisions",   desc: "Frameworks and data that let leaders approve or reject technology investments in hours, not weeks of internal debate." },
  ],

  tools: [
    "TOGAF", "ITIL", "Enterprise Architecture", "OKRs", "Roadmapping",
    "Cloud Strategy", "Risk Frameworks", "Cost Modeling",
  ],

  highlight: {
    title: "Strategy you can actually execute next week.",
    desc: "We don't deliver 90-page slide decks and disappear. Every Webaurix IT strategy engagement ends with a prioritised, practical roadmap that your team can act on immediately, with us available to guide and adjust delivery as you execute.",
  },

  ctaTitle: "Ready to make technology your",
  ctaHighlight: "competitive edge?",
};

const ITStrategyConsulting = () => <ConsultingLayout data={data} />;
export default ITStrategyConsulting;
