import {
  Globe,
  Smartphone,
  Layers,
  Code2,
  BarChart3,
  BrainCircuit,
  ChartNoAxesCombined,
  BriefcaseBusiness,
  BrainCog,
  ShieldPlus,
  CloudCog,
  Briefcase,
  Info,
  BookOpen,
  Users,
  PhoneCall,
} from "lucide-react";

const navItems = [
  {
    title: "SERVICES",
    sections: [
      {
        heading: "Web Development",
        icon: <Globe size={22} />,
        subtitle: "Custom web apps, CMS, e-commerce & full-stack solutions.",
        links: [
          { label: "Custom Web Apps", to: "/services/web-development" },
          { label: "E-Commerce (Shopify Plus)", to: "/services/ecommerce-development" },
          { label: "CMS Development", to: "/services/cms-development" },
          { label: "Progressive Web Apps", to: "/services/progressive-web-apps" },
        ],
      },
      {
        heading: "Mobile App Development",
        icon: <Smartphone size={22} />,
        subtitle: "iOS, Android, cross-platform & enterprise mobile apps.",
        links: [
          { label: "iOS & Android Apps", to: "/services/app-development" },
          { label: "Cross-Platform (Flutter)", to: "/services/cross-platform-app-development" },
          { label: "Enterprise App Development", to: "/services/enterprise-app-development" },
          { label: "AR/VR & Game Apps", to: "/services/ar-vr-game-apps" },
        ],
      },
      {
        heading: "UI/UX Design",
        icon: <Layers size={22} />,
        subtitle: "User research, wireframing, prototyping & visual design.",
        links: [
          { label: "UI/UX Design", to: "/services/ui-ux-design" },
          { label: "Branding & Visual Identity", to: "/services/branding" },
          { label: "Wireframing & Prototyping", to: "/services/wireframing-prototyping" },
          { label: "Product Research & Strategy", to: "/services/product-research" },
        ],
      },
      {
        heading: "Custom Software",
        icon: <Code2 size={22} />,
        subtitle: "End-to-end software, SaaS solutions & API integration.",
        links: [
          { label: "Custom Software Development", to: "/services/custom-software-development" },
          { label: "SaaS Solutions", to: "/services/saas-solutions" },
          { label: "API Integration", to: "/services/api-integration" },
          { label: "Legacy System Modernization", to: "/services/legacy-system-modernization" },
        ],
      },
      {
        heading: "Digital Marketing",
        icon: <BarChart3 size={22} />,
        subtitle: "SEO, PPC, social media, email & content marketing.",
        links: [
          { label: "SEO Optimization", to: "/services/seo-optimization" },
          { label: "PPC Advertising", to: "/services/ppc-advertising" },
          { label: "Social Media Marketing", to: "/services/social-media-marketing" },
          { label: "Email & Content Marketing", to: "/services/email-content-marketing" },
        ],
      },
      {
        heading: "AI & Generative AI",
        icon: <BrainCircuit size={22} />,
        subtitle: "AI chatbots, generative AI, ML integration & data analytics.",
        links: [
          { label: "Generative AI Solutions", to: "/services/ai/gen-ai" },
          { label: "AI Chatbots", to: "/services/ai/chatbot" },
          { label: "AI in Web & App Dev", to: "/services/ai/web" },
          { label: "Data Analytics", to: "/services/ai-data-consulting" },
        ],
      },
    ],
  },

  {
    title: "CONSULTANCY",
    sections: [
      {
        heading: "IT Strategy Consulting",
        icon: <ChartNoAxesCombined size={22} />,
        subtitle: "Align your IT with business goals for better outcomes.",
        links: [{ label: "Learn More", to: "/consultancy/it-strategy" }],
      },
      {
        heading: "Digital Transformation",
        icon: <BriefcaseBusiness size={22} />,
        subtitle: "Evaluate your technology landscape and optimize performance.",
        links: [{ label: "Learn More", to: "/consultancy/digital-transformation" }],
      },
      {
        heading: "AI & Data Consulting",
        icon: <BrainCog size={22} />,
        subtitle: "Automate operations, predict trends and innovate faster.",
        links: [{ label: "Learn More", to: "/services/ai-data-consulting" }],
      },
      {
        heading: "Cybersecurity Consulting",
        icon: <ShieldPlus size={22} />,
        subtitle: "Protect your digital assets with advanced security strategies.",
        links: [{ label: "Learn More", to: "/consultancy/cybersecurity" }],
      },
      {
        heading: "Cloud Consulting",
        icon: <CloudCog size={22} />,
        subtitle: "Migrate, optimize and scale your cloud infrastructure.",
        links: [{ label: "Learn More", to: "/consultancy/cloud" }],
      },
      {
        heading: "Startup IT Consulting",
        icon: <Briefcase size={22} />,
        subtitle: "Build a solid tech foundation for your growing startup.",
        links: [{ label: "Learn More", to: "/consultancy/startup-it" }],
      },
    ],
  },

  {
    title: "RESOURCES",
    sections: [
      {
        heading: "Blog & Insights",
        icon: <BookOpen size={22} />,
        subtitle: "Latest articles on tech, design and digital trends.",
        links: [
          { label: "Blog", to: "/blogs" },
          { label: "Case Studies", to: "/case-studies" },
        ],
      },
      {
        heading: "Help & FAQs",
        icon: <Info size={22} />,
        subtitle: "Answers to common questions about our services and process.",
        links: [
          { label: "FAQs", to: "/resources/webaurix-faqs" },
        ],
      },
    ],
  },

  {
    title: "COMPANY",
    sections: [
      {
        heading: "About Webaurix",
        icon: <Users size={22} />,
        subtitle: "Learn about our team, mission and values.",
        links: [
          { label: "About Us", to: "/about" },
          { label: "Careers", to: "/careers" },
        ],
      },
      {
        heading: "Get In Touch",
        icon: <PhoneCall size={22} />,
        subtitle: "Let's talk about your next big project.",
        links: [
          { label: "Contact Us", to: "/contact" },
          { label: "Book a Consultation", to: "/book-consultation" },
        ],
      },
    ],
  },
];

export default navItems;
