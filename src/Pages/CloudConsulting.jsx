import React from "react";
import {
  CloudCog, Cloud, Server, Database, GitBranch, Gauge,
  Lock, RefreshCw, Layers, Workflow, TrendingUp, ShieldCheck,
} from "lucide-react";
import ConsultingLayout from "../components/ConsultingLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  path: "/consultancy/cloud",
  icon: CloudCog,
  orbitIcons: [Cloud, Server, Database, GitBranch, Lock, RefreshCw],

  metaTitle: "Cloud Consulting Services | Webaurix",
  metaDesc:
    "Migrate, optimise, and scale on the cloud. Webaurix cloud consulting delivers secure, cost-efficient cloud strategy, migration, and DevOps.",
  keywords:
    "cloud consulting, cloud migration, AWS, Azure, Google Cloud, DevOps, cloud optimization, cloud architecture, Webaurix",

  eyebrow: "Cloud Consulting",
  title: "Scale on the cloud,",
  titleHighlight: "without the chaos.",
  description:
    "We help you migrate, optimise, and scale your infrastructure on AWS, Azure, or Google Cloud - secure, resilient, and cost-efficient by design.",

  stats: [
    { value: "45%", label: "Lower cloud cost" },
    { value: "99.9%", label: "Uptime targets" },
    { value: "10x", label: "Faster scaling" },
  ],

  capabilitiesHeading: "Cloud done right - secure, scalable, and cost-aware.",
  capabilities: [
    { icon: RefreshCw,   title: "Cloud Migration",    desc: "Move workloads to the cloud with zero data loss and minimal downtime." },
    { icon: Layers,      title: "Cloud Architecture", desc: "Well-architected, resilient infrastructure designed to scale." },
    { icon: Gauge,       title: "Cost Optimization",  desc: "Right-size resources and cut waste to slash your cloud bill." },
    { icon: Workflow,    title: "DevOps & CI/CD",     desc: "Automated pipelines that ship faster with fewer errors." },
    { icon: ShieldCheck, title: "Cloud Security",     desc: "Identity, encryption, and compliance baked into every layer." },
    { icon: Server,      title: "Managed Operations", desc: "Monitoring, scaling, and maintenance handled for you." },
  ],

  process: [
    { title: "Assess",   desc: "We review your infrastructure, costs, and goals." },
    { title: "Architect",desc: "We design the right cloud setup for your needs." },
    { title: "Migrate",  desc: "We move workloads securely with minimal disruption." },
    { title: "Optimize", desc: "We tune cost, performance, and reliability continuously." },
  ],

  outcomesHeading: "Infrastructure that grows with you.",
  outcomes: [
    { title: "Lower cloud bills",      desc: "Pay only for what you actually need." },
    { title: "Effortless scaling",     desc: "Handle traffic spikes without breaking a sweat." },
    { title: "Higher reliability",     desc: "Resilient architecture with strong uptime." },
    { title: "Faster releases",        desc: "Automated DevOps pipelines ship in minutes." },
  ],

  tools: [
    "AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Docker",
    "Terraform", "CI/CD", "Serverless", "CloudWatch",
  ],

  highlight: {
    title: "Cloud that fits your budget and goals.",
    desc: "We design for cost-efficiency from day one - so you get the scale and reliability of the cloud without the runaway bills.",
  },

  ctaTitle: "Ready to scale smarter on the",
  ctaHighlight: "cloud?",
};

const CloudConsulting = () => <ConsultingLayout data={data} />;
export default CloudConsulting;
