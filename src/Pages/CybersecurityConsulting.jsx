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

  metaTitle: "Cybersecurity Consulting Services | Webaurix",
  metaDesc:
    "Protect your business from threats. Webaurix cybersecurity consulting delivers risk assessments, security audits, and defence strategies that keep you safe.",
  keywords:
    "cybersecurity consulting, security audit, risk assessment, penetration testing, compliance, data protection, threat defence, Webaurix",

  eyebrow: "Cybersecurity Consulting",
  title: "Protect what you've",
  titleHighlight: "built.",
  description:
    "We assess, harden, and defend your systems - with security audits, risk assessments, and proactive strategies that keep your data and customers safe.",

  stats: [
    { value: "24/7", label: "Threat monitoring" },
    { value: "100%", label: "Audit coverage" },
    { value: "0", label: "Tolerance for risk" },
  ],

  capabilitiesHeading: "Security built into every layer of your business.",
  capabilities: [
    { icon: FileSearch,    title: "Security Audits",     desc: "Deep assessments that expose vulnerabilities before attackers find them." },
    { icon: AlertTriangle, title: "Risk Assessment",     desc: "Identify, prioritise, and plan against your most critical threats." },
    { icon: Bug,           title: "Penetration Testing", desc: "Real-world attack simulations that test your true defences." },
    { icon: Lock,          title: "Data Protection",     desc: "Encryption, access control, and policies that safeguard sensitive data." },
    { icon: ShieldCheck,   title: "Compliance",          desc: "Meet GDPR, ISO 27001, and industry standards with confidence." },
    { icon: Eye,           title: "Monitoring & Response", desc: "Continuous monitoring and rapid response to contain incidents fast." },
  ],

  process: [
    { title: "Assess",   desc: "We audit your systems, data flows, and threat exposure." },
    { title: "Identify", desc: "We map and prioritise vulnerabilities and risks." },
    { title: "Harden",   desc: "We implement controls, policies, and protections." },
    { title: "Monitor",  desc: "We watch, test, and respond to keep you protected." },
  ],

  outcomesHeading: "Confidence that your business is secure.",
  outcomes: [
    { title: "Fewer vulnerabilities",  desc: "Gaps found and closed before they're exploited." },
    { title: "Regulatory compliance",  desc: "Meet the standards your industry demands." },
    { title: "Faster incident response", desc: "Contain and recover from threats quickly." },
    { title: "Customer trust",         desc: "Protect data and the reputation you've earned." },
  ],

  tools: [
    "ISO 27001", "GDPR", "OWASP", "Penetration Testing", "SIEM",
    "Zero Trust", "Encryption", "MFA", "Vulnerability Scanning",
  ],

  highlight: {
    title: "Security is a process, not a product.",
    desc: "We don't just install tools - we build a security culture and ongoing programme that adapts as threats evolve.",
  },

  ctaTitle: "Ready to secure your",
  ctaHighlight: "business and data?",
};

const CybersecurityConsulting = () => <ConsultingLayout data={data} />;
export default CybersecurityConsulting;
