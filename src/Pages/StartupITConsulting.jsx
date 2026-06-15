import React from "react";
import {
  Briefcase, Rocket, Lightbulb, Code2, Layers, Gauge,
  TrendingUp, Users, GitBranch, Cloud, Target, Zap,
} from "lucide-react";
import ConsultingLayout from "../components/ConsultingLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  path: "/consultancy/startup-it",
  icon: Briefcase,
  orbitIcons: [Rocket, Lightbulb, Code2, Cloud, TrendingUp, Target],

  metaTitle: "Startup IT Consulting & MVP Strategy | Webaurix",
  metaDesc:
    "MVP strategy, tech stack selection & scalable architecture for early-stage startups. Launch 2x faster, avoid costly rebuilds. Webaurix, Pakistan, US, UK.",
  keywords:
    "startup IT consulting, MVP strategy, tech stack selection, scalable startup architecture, startup CTO consulting, technical advisory, lean MVP, startup technology advisor, Webaurix",

  eyebrow: "Startup IT Consulting",
  title: "Build the right foundation,",
  titleHighlight: "from day one.",
  description:
    "Webaurix acts as your technical co-founder without the equity. We help founders make the technology decisions that determine whether you launch in 8 weeks or 18 months, and whether you rebuild in year two or scale to 100x. MVP strategy, tech stack selection, and architecture advisory for startups in Pakistan, South Korea, the US, and the UK.",

  stats: [
    { value: "2x", label: "Faster time to first launch" },
    { value: "60%", label: "Less technical rework" },
    { value: "100+", label: "Startups advised on tech" },
  ],

  capabilitiesHeading: "Founder-friendly technical guidance that avoids costly early mistakes.",
  capabilities: [
    { icon: Lightbulb, title: "MVP Strategy",          desc: "Define the minimum feature set that validates your core assumption and wins your first users, and ruthlessly cut everything else so you can launch in weeks, not months." },
    { icon: Layers,    title: "Tech Stack Selection",  desc: "Choose the right combination of frameworks, databases, and cloud services that fit your team's current skills, budget constraints, and 5-year scale requirements, with written rationale for every decision." },
    { icon: GitBranch, title: "Scalable Architecture", desc: "Architecture designed from day one to handle 100x your launch traffic without a full rebuild, the right patterns, abstractions, and database design implemented before you have to retrofit them." },
    { icon: Cloud,     title: "Lean Infrastructure",   desc: "Cost-efficient cloud setup on AWS, GCP, or Vercel that starts under $50/month and scales linearly as revenue grows, no full-time DevOps engineer required to operate it." },
    { icon: Users,     title: "Team & Hiring Guidance",desc: "Honest, equity-free advice on what to build internally, what SaaS tools to use, and what to outsource, protecting your runway and keeping engineering hours focused on product differentiation." },
    { icon: TrendingUp,title: "Scale Planning",        desc: "A concrete technical roadmap from MVP to Series A, covering when to introduce microservices, how to handle database scale, and what engineering team structure supports 10x and 100x growth." },
  ],

  process: [
    { title: "Founder Discovery (Week 1)",   desc: "We dig into your idea, target user, market size, and funding runway, building the full context we need to give specific, honest technical advice rather than generic frameworks." },
    { title: "Technical Advisory (Week 1–2)",desc: "We recommend the MVP scope, technology stack, system architecture, and infrastructure setup, with a written rationale for every decision so your team understands the why." },
    { title: "Build Guidance (Weeks 2–8)",   desc: "We support your engineering team or development partner through the MVP build, reviewing architecture decisions, pull requests, and deployment configurations weekly." },
    { title: "Scale Planning (Ongoing)",     desc: "We conduct quarterly architecture reviews as your user base grows, proactively flagging bottlenecks and proposing solutions before they become production crises." },
  ],

  outcomesHeading: "Move fast without breaking your future.",
  outcomes: [
    { title: "A working MVP in 6–10 weeks",      desc: "A focused, testable product that validates your core assumption with real users, built on a foundation that won't need to be thrown away." },
    { title: "No expensive technology rebuilds",  desc: "The right architecture and stack from the start eliminates the 12–18 month rebuild that kills momentum and burns runway at early-stage startups." },
    { title: "Investor-ready technical foundations", desc: "Architecture and documentation that passes technical due diligence and scales to the growth metrics shown in your Series A pitch deck." },
    { title: "A clear path from MVP to scale",   desc: "A documented technical roadmap showing investors and your team exactly how you'll handle 10x and 100x user growth, with cost and team structure projections." },
  ],

  tools: [
    "MVP Roadmap", "Lean Startup", "Modern Stacks", "Cloud-Native",
    "CI/CD", "Agile", "Scalable Architecture", "Cost Modeling",
  ],

  highlight: {
    title: "CTO-level expertise, without the equity cost.",
    desc: "Webaurix gives early-stage founders access to the same quality of technical leadership that well-funded startups get from an experienced CTO, without giving up equity. Pragmatic advice that balances launch speed today with the scalable foundations you'll need when growth actually hits.",
  },

  ctaTitle: "Ready to build your startup on solid",
  ctaHighlight: "foundations?",
};

const StartupITConsulting = () => <ConsultingLayout data={data} />;
export default StartupITConsulting;
