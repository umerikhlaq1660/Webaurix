import React from "react";
import {
  ShieldPlus, ShieldCheck, Lock, Eye, AlertTriangle, FileSearch,
  KeyRound, Bug, ServerCog, Fingerprint, Network, Siren,
} from "lucide-react";
import ConsultingLayout from "../components/ConsultingLayout";

const data = {
  accent: "#68b5cc",
  accentLight: "#0e7490",
  path: "/consultancy/cybersecurity",
  icon: ShieldPlus,
  orbitIcons: [Lock, Eye, Bug, KeyRound, Network, Siren],

  metaTitle: "Cybersecurity Consulting & Risk Assessment | Webaurix",
  metaDesc:
    "Security audits, penetration testing, ISO 27001, GDPR compliance & 24/7 SIEM monitoring by Webaurix. Protect your business in Pakistan, the US, and the UK.",
  keywords:
    "cybersecurity consulting, security audit, penetration testing, risk assessment, ISO 27001 compliance, GDPR compliance, SIEM monitoring, zero trust security, Webaurix",

  eyebrow: "Cybersecurity Consulting",
  title: "Security that protects",
  titleHighlight: "what you've built.",
  description:
    "Webaurix delivers comprehensive cybersecurity consulting, risk assessments, OWASP-aligned penetration testing, ISO 27001 compliance, and 24/7 SIEM monitoring. We find vulnerabilities before attackers do and build the controls, policies, and incident response playbooks that keep your data and customers safe.",

  stats: [
    { value: "24/7", label: "Continuous threat monitoring" },
    { value: "100%", label: "Full-layer audit coverage" },
    { value: "<2h", label: "Average incident containment" },
  ],

  capabilitiesHeading: "Security built into every layer, infrastructure, application, and people.",
  capabilities: [
    { icon: FileSearch,    title: "Security Audits",       desc: "Layer-by-layer security assessments covering infrastructure, application code, network configuration, and access controls, delivered with a prioritised, severity-rated remediation roadmap." },
    { icon: AlertTriangle, title: "Risk Assessment",       desc: "ISO 31000-aligned risk identification, impact scoring, and treatment planning, mapping your full threat landscape and prioritising what to fix first by business impact, not just technical severity." },
    { icon: Bug,           title: "Penetration Testing",   desc: "Real-world attack simulations covering OWASP Top 10, network penetration, and social engineering, conducted by experienced ethical hackers with findings reported in plain business language." },
    { icon: Lock,          title: "Data Protection",       desc: "End-to-end encryption strategy, least-privilege access controls, and data classification frameworks protecting sensitive data at rest and in transit across all environments." },
    { icon: ShieldCheck,   title: "Compliance",            desc: "Gap assessments, policy documentation, and implementation support to achieve and maintain ISO 27001, GDPR, and industry-specific compliance, with evidence packages for auditors." },
    { icon: Eye,           title: "Monitoring & Response", desc: "24/7 SIEM log monitoring, automated anomaly detection, and a defined incident response playbook with a <2 hour containment SLA for critical security events." },
  ],

  process: [
    { title: "Threat Assessment (Week 1)", desc: "We audit your systems, data flows, access controls, and attack surface, producing an honest risk register with severity ratings and business impact estimates." },
    { title: "Prioritised Findings",       desc: "We present findings ranked by business impact, not just CVSS score, so leadership understands what to fix this week, this quarter, and this year." },
    { title: "Hardening & Controls",       desc: "We implement recommended technical controls, security policies, and tooling, in priority order, with validation testing after each hardening phase." },
    { title: "Ongoing Monitoring",         desc: "We deploy SIEM monitoring, schedule quarterly penetration tests, and provide monthly security posture reports with trending and benchmark comparisons." },
  ],

  outcomesHeading: "Confidence that your business is secure.",
  outcomes: [
    { title: "Critical vulnerabilities found and closed", desc: "Gaps identified and remediated before exploitation, with full audit evidence for compliance and insurance purposes." },
    { title: "ISO 27001 & GDPR compliance achieved",      desc: "Meet the certification requirements your enterprise clients, partners, and regulators demand, with a documented evidence trail." },
    { title: "<2 hour critical incident containment",     desc: "Defined response playbooks and 24/7 monitoring ensure structured, fast containment when threats materialise." },
    { title: "Customer and enterprise trust",             desc: "Security certifications and transparent policies that protect your reputation and unlock enterprise sales opportunities." },
  ],

  tools: [
    "ISO 27001", "GDPR", "OWASP", "Penetration Testing", "SIEM",
    "Zero Trust", "Encryption", "MFA", "Vulnerability Scanning",
  ],

  highlight: {
    title: "Security built as a programme, not a one-time audit.",
    desc: "A single audit gives you a point-in-time snapshot. Webaurix builds an ongoing security programme, with quarterly penetration testing, continuous SIEM monitoring, and regular security awareness training, so your defences improve as the threat landscape evolves.",
  },

  ctaTitle: "Ready to secure your",
  ctaHighlight: "business and data?",
};

const CybersecurityConsulting = () => <ConsultingLayout data={data} />;
export default CybersecurityConsulting;
