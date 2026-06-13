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

  metaTitle: "Startup IT Consulting Services | Webaurix",
  metaDesc:
    "Build a solid tech foundation for your startup. Webaurix startup IT consulting covers MVP strategy, tech stack, architecture, and scaling.",
  keywords:
    "startup IT consulting, MVP development strategy, startup tech stack, technical co-founder, scalable architecture, startup CTO, Webaurix",

  eyebrow: "Startup IT Consulting",
  title: "Build the right foundation,",
  titleHighlight: "from day one.",
  description:
    "We help founders make smart technology decisions early - the right stack, scalable architecture, and an MVP roadmap that gets you to market fast without costly mistakes.",

  stats: [
    { value: "2x", label: "Faster to market" },
    { value: "60%", label: "Less rework" },
    { value: "∞", label: "Built to scale" },
  ],

  capabilitiesHeading: "Founder-friendly tech guidance that avoids costly mistakes.",
  capabilities: [
    { icon: Lightbulb, title: "MVP Strategy",       desc: "Define the smallest product that proves your idea and wins users." },
    { icon: Layers,    title: "Tech Stack Selection", desc: "Choose the right tools that fit your budget and scale with you." },
    { icon: GitBranch, title: "Scalable Architecture", desc: "Build foundations that won't crumble when growth hits." },
    { icon: Cloud,     title: "Lean Infrastructure", desc: "Cost-efficient cloud setup that grows only as you do." },
    { icon: Users,     title: "Team & Hiring Guidance", desc: "Advice on what to build in-house vs outsource, and who to hire." },
    { icon: TrendingUp,title: "Scale Planning",     desc: "A roadmap to handle 10x users when product-market fit lands." },
  ],

  process: [
    { title: "Understand", desc: "We dig into your idea, market, and constraints." },
    { title: "Advise",     desc: "We recommend the stack, architecture, and MVP scope." },
    { title: "Build",      desc: "We help you ship a lean, scalable first version." },
    { title: "Scale",      desc: "We guide you from MVP to a product ready to grow." },
  ],

  outcomesHeading: "Move fast without breaking your future.",
  outcomes: [
    { title: "A market-ready MVP",     desc: "Launch quickly and start learning from users." },
    { title: "The right tech choices", desc: "No expensive rebuilds six months later." },
    { title: "Investor-ready foundations", desc: "Architecture that stands up to due diligence." },
    { title: "A clear scaling path",   desc: "Know exactly how you'll handle growth." },
  ],

  tools: [
    "MVP Roadmap", "Lean Startup", "Modern Stacks", "Cloud-Native",
    "CI/CD", "Agile", "Scalable Architecture", "Cost Modeling",
  ],

  highlight: {
    title: "We've built for startups - we get it.",
    desc: "Limited budget, big ambition, tight timelines. We give you pragmatic advice that balances speed today with scale tomorrow.",
  },

  ctaTitle: "Ready to build your startup on solid",
  ctaHighlight: "foundations?",
};

const StartupITConsulting = () => <ConsultingLayout data={data} />;
export default StartupITConsulting;
