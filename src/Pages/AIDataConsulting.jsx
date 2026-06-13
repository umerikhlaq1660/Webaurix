import React from "react";
import {
  BarChart3, Database, TrendingUp, Brain, LineChart, PieChart,
  Workflow, Target, Layers, GitBranch, Gauge, ShieldCheck,
} from "lucide-react";
import AIServiceLayout from "../components/AIServiceLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  sceneVariant: "orbit",
  path: "/services/ai-data-consulting",
  metaTitle: "AI & Data Consulting Services | Webaurix",
  metaDesc:
    "AI and data consulting - strategy, analytics, machine learning models, and data pipelines that turn raw data into confident decisions.",
  keywords:
    "AI consulting, data consulting, data analytics, machine learning consulting, business intelligence, data engineering, AI strategy, Webaurix",

  eyebrow: "AI & Data Consulting",
  title: "Decisions powered by",
  titleHighlight: "data, not guesswork.",
  description:
    "We help you make sense of your data - from strategy and analytics to custom machine learning models and pipelines that surface insight where you need it most.",

  stats: [
    { value: "40%", label: "Better decisions" },
    { value: "5x", label: "Faster insights" },
    { value: "99%", label: "Data accuracy" },
  ],

  capabilitiesHeading: "From raw data to real, measurable business outcomes.",
  capabilities: [
    { icon: Target,    title: "AI Strategy",          desc: "We assess your data maturity and build a clear, ROI-focused AI roadmap." },
    { icon: BarChart3, title: "Analytics & BI",        desc: "Dashboards and reports that turn scattered data into clear, live signals." },
    { icon: Brain,     title: "Machine Learning",      desc: "Custom predictive and classification models trained on your data." },
    { icon: Database,  title: "Data Engineering",      desc: "Robust pipelines that clean, transform, and unify your data sources." },
    { icon: TrendingUp,title: "Forecasting",           desc: "Demand, churn, and revenue forecasting to plan with confidence." },
    { icon: ShieldCheck,title: "Data Governance",      desc: "Security, compliance, and quality baked into every layer." },
  ],

  process: [
    { title: "Assess",    desc: "We audit your data sources, quality, and goals." },
    { title: "Model",     desc: "We design the analytics or ML approach that fits." },
    { title: "Build",     desc: "We engineer pipelines, models, and dashboards." },
    { title: "Activate",  desc: "We deliver insight into the tools your team already uses." },
  ],

  useCasesHeading: "Data work that pays for itself.",
  useCases: [
    { title: "Customer churn prediction",  desc: "Spot at-risk customers before they leave." },
    { title: "Demand forecasting",          desc: "Optimize inventory and staffing with accurate predictions." },
    { title: "Revenue analytics",           desc: "Understand exactly what drives your growth." },
    { title: "Operational dashboards",      desc: "Real-time visibility across your business." },
  ],

  tech: [
    "Python", "Pandas", "scikit-learn", "TensorFlow", "BigQuery",
    "Snowflake", "Power BI", "Tableau", "dbt", "Airflow",
  ],

  highlight: {
    title: "Insight that reaches the people who decide.",
    desc: "We don't just build models - we deliver insight into dashboards, alerts, and tools your team already uses, so data actually changes decisions.",
  },

  ctaTitle: "Let's unlock the value hiding in",
  ctaHighlight: "your data.",
};

const AIDataConsulting = () => <AIServiceLayout data={data} />;
export default AIDataConsulting;
