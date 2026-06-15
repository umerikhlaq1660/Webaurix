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

  metaTitle: "Digital Transformation Consulting | Webaurix",
  metaDesc:
    "Modernise legacy systems, automate workflows & embed AI with measurable ROI. Webaurix digital transformation consulting, Pakistan, US, UK, South Korea.",
  keywords:
    "digital transformation consulting, business process automation, legacy system modernisation, workflow automation, RPA, cloud adoption, AI transformation, change management, Webaurix",

  eyebrow: "Digital Transformation",
  title: "Operations modernised,",
  titleHighlight: "measurable ROI delivered.",
  description:
    "Webaurix guides businesses through end-to-end digital transformation, replacing legacy systems, automating manual workflows, unifying siloed data, and embedding AI where it creates real operational advantage. Low-risk, phased delivery for organisations in Pakistan, South Korea, the US, and the UK.",

  stats: [
    { value: "50%", label: "Reduction in manual work" },
    { value: "2.5x", label: "Faster operations" },
    { value: "40%", label: "Typical cost savings" },
  ],

  capabilitiesHeading: "Transformation that touches people, process, and technology, in that order.",
  capabilities: [
    { icon: Workflow,  title: "Process Automation",   desc: "Identify and automate the 20% of processes consuming 80% of manual effort, using RPA, workflow automation tools, and AI classification to eliminate repetitive tasks permanently." },
    { icon: RefreshCw, title: "Legacy Modernization", desc: "Replace fragile, unmaintainable legacy systems with cloud-native platforms, migrated using parallel-run strategy so business operations never stop during transition." },
    { icon: Cloud,     title: "Cloud Adoption",       desc: "Move to AWS, Azure, or Google Cloud with a migration plan, cost model, and security baseline defined before a single workload moves, no surprises, no hidden costs." },
    { icon: Bot,       title: "AI & Automation",      desc: "Embed ML models and generative AI into operations for document processing, intelligent routing, demand prediction, and content classification at scale." },
    { icon: Database,  title: "Data Unification",     desc: "Connect siloed systems via API integrations and dbt data pipelines into a single source of truth, ending the daily spreadsheet-reconciliation cycle permanently." },
    { icon: Users,     title: "Change Enablement",    desc: "Structured training, communication plans, and internal champion networks that drive genuine adoption, ensuring technology investment delivers its intended ROI." },
  ],

  process: [
    { title: "Discovery & Mapping",    desc: "2-week process mapping and technology audit, identifying bottlenecks, integration gaps, and the highest-value transformation opportunities with a business impact estimate for each." },
    { title: "Future-State Design",    desc: "We blueprint target processes, technology architecture, and an integration model, with a business case, phased delivery plan, and change management strategy." },
    { title: "Phased Implementation",  desc: "We deliver in measured 4–6 week sprints, modernising one business domain at a time so operations keep running smoothly throughout transformation." },
    { title: "Adoption & Measurement", desc: "We track adoption metrics against baselines, measure operational improvements, and tune the programme quarterly to maximise ROI from each delivered phase." },
  ],

  outcomesHeading: "Leaner operations, happier teams, faster growth.",
  outcomes: [
    { title: "Hours of manual work eliminated weekly",    desc: "Automated workflows that replace repetitive tasks permanently, freeing your team for the high-value work that actually drives growth." },
    { title: "Modern, maintainable technology",           desc: "Scalable platforms that reduce IT maintenance burden and support faster feature delivery at a fraction of legacy system operating cost." },
    { title: "One source of truth across the business",   desc: "Unified data from all systems, enabling real-time decisions without daily reconciliation of five conflicting spreadsheet reports." },
    { title: "Measurable productivity and cost gains",    desc: "Operations teams achieving more with the same headcount, tracked against the baseline metrics we establish on the first day of engagement." },
  ],

  tools: [
    "Cloud Migration", "RPA", "Workflow Automation", "API Integration",
    "Microservices", "AI Automation", "Data Pipelines", "Change Management",
  ],

  highlight: {
    title: "Transformation without disrupting day-to-day operations.",
    desc: "We transform in measured, low-risk phases, using parallel running, feature flagging, and incremental cutover. Your operations keep running smoothly while the technology foundation evolves underneath.",
  },

  ctaTitle: "Ready to transform how your",
  ctaHighlight: "business operates?",
};

const DigitalTransformation = () => <ConsultingLayout data={data} />;
export default DigitalTransformation;
