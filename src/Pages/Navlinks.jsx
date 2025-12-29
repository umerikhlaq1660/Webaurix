import {
  Palette,
  TrendingUp,
  BrainCircuit,
  Handshake,
  Briefcase,
  BriefcaseBusiness,
  BrainCog,
  ShieldPlus,
  CloudCog,
  ChartNoAxesCombined,
  Info,
  Book,
  Shapes,
} from "lucide-react";

const navItems = [
  {
    title: "SERVICES",
    sections: [
      {
        heading: "Design",
        icon: <Palette size={30} />,
        links: [
          { label: "UI UX Design", to: "/services/ui-ux-design" },
          { label: "Branding & Visual Identity", to: "/services/branding" },
          { label: "Product Research & Strategy", to: "/services/product-research" },
        ],
      },
      {
        heading: "Digital Transformation",
        icon: <TrendingUp size={30} />,
        links: [
          { label: "Web Development", to: "/services/web-development" },
          { label: "Mobile App Development", to: "/services/app-development" },
          { label: "Custom Software Development", to: "/services/custom-software-development" },
          { label: "Digital Marketing", to: "/services/digital-marketing" },
        ],
      },
      {
        heading: "Artificial Intelligence",
        icon: <BrainCircuit size={30} />,
        links: [
          { label: "Generative AI", to: "/services/ai/gen-ai" },
          { label: "AI in Web & App Development", to: "/services/ai/web" },
          { label: "AI Chatbots", to: "/services/ai-chatbot" },
        ],
      },
      {
        heading: "Staff Augmentation",
        icon: <Handshake size={30} />,
        links: [
          { label: "Frontend Developers", to: "/services/staff/frontend" },
          { label: "Backend Developers", to: "/services/staff/backend" },
          { label: "DevOps Engineers", to: "/services/staff/devops" },
          { label: "QA & Testing", to: "/services/staff/qa" },
        ],
      },
    ],
  },

 {
    title: "CONSULTANCY",
    sections: [
      {
        heading: "IT Strategy Consulting",
        icon: <ChartNoAxesCombined size={30} />,
        subtitle: "Align your IT with business goals for better outcomes.",
        links: [
          {
            label: "Learn More",
            to: "/services/it-strategy-consulting",

          },
        ],
      },
      {
        heading: "Business & Digital Transformation",
        icon: <BriefcaseBusiness size={30} />,
        subtitle: "Evaluate your technology landscape and optimize performance.",
        links: [
          {
            label: "Learn More",
            to: "/services/digital-transformation-consulting",

          },
        ],
      },
      {
        heading: "AI & Data Consulting",
        icon: <BrainCog size={30} />,
        subtitle: "Automate operations to improve efficiency and reduce costs.",
        links: [
          {
            label: "Learn More",
            to: "/services/ai-data-consulting",
          },
        ],
      },
      {
        heading: "Cybersecurity Consulting",
        icon: <ShieldPlus size={30} />,
        subtitle: "Automate operations to improve efficiency and reduce costs.",
        links: [
          {
            label: "Learn More",
            to: "/services/cybersecurity-consulting",

          },
        ],
      },
      {
        heading: "Cloud Consulting",
        icon: <CloudCog size={30} />,
        subtitle: "Automate operations to improve efficiency and reduce costs.",
        links: [
          {
            label: "Learn More",
            to: "/services/cloud-consulting",

          },
        ],
      },
      {
        heading: "IT Infrastructure",
        icon: <ChartNoAxesCombined size={30} />,
        subtitle: "Automate operations to improve efficiency and reduce costs.",
        links: [
          {
            label: "Learn More",
            to: "/services/it-information-consulting",

          },
        ],
      },
      {
        heading: "Startup & Business IT Consulting",
        icon: <Briefcase size={30} />,
        subtitle: "Automate operations to improve efficiency and reduce costs.",
        links: [
          {
            label: "Learn More",
            to: "/services/startup-business-it-consulting",
          },
        ],
      },
    ],
  },
  {
    title: "RESOURCES",
    sections: [
      {
        heading: "Learning",
        icon: <Shapes size={30} />,
        links: [
          { label: "Blog", to: "/blogs" },
          { label: "FAQs", to: "/resources/webaurix-faqs" },
        ],
      },
    ],
  },

  {
    title: "COMPANY",
    sections: [
      {
        heading: "Company",
        icon: <Info size={30} />,
        links: [
          { label: "About Us", to: "/about" },
          { label: "Careers", to: "/careers" },
          { label: "Contact", to: "/contact" },
        ],
      },
      {
        heading: "Client Resources",
        icon: <Book size={30} />,
        links: [
          { label: "Book a Consultation", to: "/book-consultation" },
        ],
      },
    ],
  },
];

export default navItems;
