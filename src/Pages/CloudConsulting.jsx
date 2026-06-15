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

  metaTitle: "Cloud Consulting, Migration & DevOps | Webaurix",
  metaDesc:
    "Migrate to AWS, Azure or GCP securely, cut cloud costs by 45%, and accelerate releases with DevOps & CI/CD pipelines. Webaurix cloud consulting, Pakistan, US, UK.",
  keywords:
    "cloud consulting, AWS consulting, Azure migration, Google Cloud consulting, cloud migration, DevOps CI/CD, Kubernetes, cloud cost optimisation, cloud architecture, Webaurix",

  eyebrow: "Cloud Consulting & Migration",
  title: "Scale on the cloud,",
  titleHighlight: "without the runaway costs.",
  description:
    "Webaurix migrates, architects, and optimises cloud infrastructure on AWS, Azure, and Google Cloud, targeting 99.9% uptime, cutting cloud bills by up to 45%, and accelerating release cycles with production-grade DevOps and CI/CD. Delivered for businesses in Pakistan, South Korea, the US, and the UK.",

  stats: [
    { value: "45%", label: "Average cloud cost reduction" },
    { value: "99.9%", label: "Uptime target achieved" },
    { value: "10x", label: "Faster infrastructure scaling" },
  ],

  capabilitiesHeading: "Cloud done right, secure, scalable, and built for cost-efficiency.",
  capabilities: [
    { icon: RefreshCw,   title: "Cloud Migration",    desc: "Lift-and-shift, replatform, or refactor workloads to AWS, Azure, or GCP, with a parallel-run cutover strategy and automated validation that eliminates migration downtime and data loss risk." },
    { icon: Layers,      title: "Cloud Architecture", desc: "Multi-region, fault-tolerant infrastructure designed using AWS Well-Architected or Azure Landing Zone frameworks, built to survive real AZ failures without impacting your users." },
    { icon: Gauge,       title: "Cost Optimization",  desc: "Reserved instance planning, autoscaling policies, and resource right-sizing that typically reduce cloud operating costs by 30–45% within 90 days of engagement." },
    { icon: Workflow,    title: "DevOps & CI/CD",     desc: "GitHub Actions, GitLab CI, or AWS CodePipeline automation that deploys to production in minutes, with automated testing, blue-green deployments, and one-click rollback." },
    { icon: ShieldCheck, title: "Cloud Security",     desc: "IAM least-privilege policies, encryption at rest and in transit, VPC architecture, and compliance baselines aligned to SOC 2, ISO 27001, and GDPR requirements." },
    { icon: Server,      title: "Managed Operations", desc: "Continuous CloudWatch, Datadog, or Grafana monitoring with auto-scaling, automated patching, and on-call incident response, your cloud infrastructure managed end to end." },
  ],

  process: [
    { title: "Cloud Readiness Assessment", desc: "We audit your current infrastructure, applications, data flows, and monthly cloud costs, delivering a migration strategy and business case with projected savings before any workload moves." },
    { title: "Architecture Design",        desc: "We design the target cloud architecture, security baseline, networking topology, and cost model, validated against your SLAs, budget, and compliance requirements." },
    { title: "Migration & Deployment",     desc: "We migrate workloads in priority order using parallel running and automated testing, each stage validated before the next begins to minimise risk at every step." },
    { title: "Continuous Optimisation",    desc: "We monitor cost, performance, and reliability daily, delivering monthly savings reports and quarterly architecture reviews as your usage and requirements evolve." },
  ],

  outcomesHeading: "Infrastructure that grows with you.",
  outcomes: [
    { title: "30–45% lower monthly cloud bills",    desc: "Right-sized resources, reserved instance pricing, and autoscaling configured from day one, not retrofitted after the bill shock arrives." },
    { title: "99.9%+ availability and uptime",      desc: "Multi-AZ deployments, health-check automation, and failover configuration that eliminate single points of failure across your infrastructure." },
    { title: "10x faster infrastructure scaling",   desc: "Autoscaling groups and serverless functions that handle traffic spikes in seconds, no manual intervention, no downtime during peak load." },
    { title: "Production releases in minutes, not days", desc: "CI/CD pipelines that test, build, and deploy to production automatically, with branch-based deployments and one-click rollback when needed." },
  ],

  tools: [
    "AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Docker",
    "Terraform", "CI/CD", "Serverless", "CloudWatch",
  ],

  highlight: {
    title: "Cloud built for cost-efficiency from the very first design decision.",
    desc: "Most teams migrate to the cloud and watch their monthly bill grow unchecked. We design for cost-efficiency before the first workload moves, right-sizing resources, configuring autoscaling policies, and reserving capacity, so you get enterprise-grade cloud without the enterprise-grade bill.",
  },

  ctaTitle: "Ready to scale smarter on the",
  ctaHighlight: "cloud?",
};

const CloudConsulting = () => <ConsultingLayout data={data} />;
export default CloudConsulting;
