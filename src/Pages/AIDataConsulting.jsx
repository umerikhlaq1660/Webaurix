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
  metaTitle: "AI & Data Consulting for Business Growth | Webaurix",
  metaDesc:
    "Machine learning models, data pipelines, BI dashboards & AI strategy that turn raw data into business decisions. Webaurix, Lahore, serving Pakistan, the US, and the UK.",
  keywords:
    "AI consulting, data consulting, machine learning consulting, data pipeline engineering, business intelligence, Power BI consulting, dbt Airflow, AI strategy, Webaurix",

  eyebrow: "AI & Data Consulting",
  title: "Data-driven decisions,",
  titleHighlight: "engineered to scale.",
  description:
    "Webaurix helps businesses unlock the value hiding in their data, from AI strategy and custom machine learning models to production data pipelines and BI dashboards that surface insight at the moment decisions are made. Python, BigQuery, Snowflake, dbt, and TensorFlow, delivered for clients across Pakistan, the US, and the UK.",

  stats: [
    { value: "40%", label: "Faster decision cycles" },
    { value: "5x", label: "More insight, same data" },
    { value: "99%", label: "Pipeline reliability" },
  ],

  capabilitiesHeading: "From raw data to real, measurable business outcomes.",
  capabilities: [
    { icon: Target,     title: "AI Strategy",     desc: "We assess your data maturity, identify the highest-ROI AI opportunities, and deliver a phased roadmap with a business case for each initiative, not a generic slide deck." },
    { icon: BarChart3,  title: "Analytics & BI",  desc: "Power BI and Tableau dashboards connected to live data sources, replacing weekly spreadsheet reports with real-time signals that decision-makers can act on immediately." },
    { icon: Brain,      title: "Machine Learning", desc: "Classification, regression, and clustering models trained on your proprietary data, validated against real business KPIs (churn rate, revenue impact) not just accuracy scores." },
    { icon: Database,   title: "Data Engineering", desc: "dbt + Airflow data pipelines that clean, transform, and unify your sources into a reliable warehouse, with automated quality checks and alerting on data drift." },
    { icon: TrendingUp, title: "Forecasting",      desc: "Demand forecasting, churn prediction, and revenue modelling built with scikit-learn and TensorFlow, helping you plan inventory, staff, and spend with 90%+ accuracy." },
    { icon: ShieldCheck,title: "Data Governance",  desc: "Automated data validation, column-level access controls, and GDPR-compliant pipeline design, so your data is trustworthy, secure, and audit-ready by default." },
  ],

  process: [
    { title: "Data Audit (Week 1)",        desc: "We inventory your data sources, assess quality and completeness gaps, and identify the highest-value use cases for analytics or machine learning." },
    { title: "Solution Design (Week 1–2)", desc: "We blueprint the warehouse architecture, pipeline topology, model approach, and the KPIs that will measure success, reviewed with your team before build begins." },
    { title: "Build & Validate (Week 2–6)",desc: "We engineer pipelines, train and validate models, and build dashboards, with weekly progress check-ins so you see working deliverables, not a big-bang reveal." },
    { title: "Activate & Maintain",        desc: "We deliver insight into your existing tools (Slack, email, BI platform) and monitor pipeline health, model drift, and dashboard accuracy continuously." },
  ],

  useCasesHeading: "Data work that pays for itself.",
  useCases: [
    { title: "Customer churn prediction", desc: "Identify at-risk customers 30+ days before they churn and trigger targeted retention campaigns, reducing churn by 20–35%." },
    { title: "Demand forecasting",         desc: "Predict demand by SKU, region, and season with 90%+ accuracy, cutting stockout events and overstock carrying costs significantly." },
    { title: "Revenue analytics",          desc: "Understand exactly which channels, campaigns, and customer cohorts drive revenue, with attribution modelling down to individual customer journeys." },
    { title: "Operational dashboards",     desc: "Live visibility into ops, fulfilment, and support metrics, replacing end-of-day batch reports with dashboards that update every 5 minutes." },
  ],

  tech: [
    "Python", "Pandas", "scikit-learn", "TensorFlow", "BigQuery",
    "Snowflake", "Power BI", "Tableau", "dbt", "Airflow",
  ],

  highlight: {
    title: "Insight that reaches the people who decide.",
    desc: "We don't just build models, we deliver insight into the dashboards, Slack alerts, and workflows your team already uses. Data that actually changes decisions, not data that collects dust in a warehouse.",
  },

  ctaTitle: "Let's unlock the value hiding in",
  ctaHighlight: "your data.",
};

const AIDataConsulting = () => <AIServiceLayout data={data} />;
export default AIDataConsulting;
