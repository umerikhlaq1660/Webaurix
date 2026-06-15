/**
 * Service URL aliases.
 *
 * Each navbar sub-service gets its OWN SEO-friendly URL, but reuses the
 * rich page body (stages, offers, tech stack, FAQ, industries) of a parent
 * service. The alias only overrides the SEO-critical, above-the-fold pieces
 * (URL slug, breadcrumb label, H1 title, subtitle, meta title/description),
 * so every URL is unique and search-optimised without duplicating content.
 *
 * key   = the URL slug  →  /services/<key>
 * parent= which serviceData entry supplies the page body
 */
const serviceAliases = {
  /* ───── Web Development ───── */
  "ecommerce-development": {
    parent: "web-development",
    bannerLabel: "E-Commerce Development",
    bannerTitle: "High-converting e-commerce stores, built to sell",
    bannerSubtitle:
      "Webaurix builds fast, secure online stores on Shopify Plus and custom React stacks with Stripe payments, real-time inventory, and checkout flows optimised for conversion.",
    seo: {
      title: "E-Commerce Development Services | Shopify & React – Webaurix",
      description:
        "Fast, secure online stores on Shopify Plus and custom React stacks with Stripe payments and checkout optimised for conversion. Webaurix, Lahore, Pakistan.",
    },
  },
  "cms-development": {
    parent: "web-development",
    bannerLabel: "CMS Development",
    bannerTitle: "Flexible CMS websites your team can manage independently",
    bannerSubtitle:
      "Webaurix builds WordPress, Sanity, and Contentful CMS platforms that make publishing and editing content fully self-serve for your team, with no developer dependency.",
    seo: {
      title: "CMS Development Services | WordPress & Headless – Webaurix",
      description:
        "WordPress, Sanity, and Contentful CMS builds that make content updates self-serve and fast. Webaurix, Lahore, serving Pakistan, the US, and the UK.",
    },
  },
  "progressive-web-apps": {
    parent: "web-development",
    bannerLabel: "Progressive Web Apps",
    bannerTitle: "PWAs that install, work offline, and load under 2 seconds",
    bannerSubtitle:
      "Webaurix builds installable Progressive Web Apps that load in under 2 seconds, work offline, and deliver push notifications, all without requiring an App Store listing.",
    seo: {
      title: "Progressive Web App Development Services | Webaurix",
      description:
        "Installable PWAs that work offline, load in under 2 seconds, and support push notifications. No App Store required. Webaurix, Lahore, Pakistan.",
    },
  },

  /* ───── App Development ───── */
  "cross-platform-app-development": {
    parent: "app-development",
    bannerLabel: "Cross-Platform Apps",
    bannerTitle: "One codebase, iOS and Android, native performance",
    bannerSubtitle:
      "Webaurix builds React Native and Flutter apps that ship simultaneously to iOS and Android, with 70 percent code reuse, native-grade performance, and roughly half the development cost.",
    seo: {
      title: "Cross-Platform App Development | React Native – Webaurix",
      description:
        "React Native and Flutter cross-platform apps shipping to iOS and Android together. 70 percent code reuse, native performance. Webaurix, Lahore, Pakistan.",
    },
  },
  "enterprise-app-development": {
    parent: "app-development",
    bannerLabel: "Enterprise Apps",
    bannerTitle: "Secure enterprise apps built for complex organisations",
    bannerSubtitle:
      "Webaurix engineers enterprise mobile apps with SSO, role-based access control, offline capability, and deep integration with SAP, Salesforce, and your internal ERP systems.",
    seo: {
      title: "Enterprise Mobile App Development Services | Webaurix",
      description:
        "Secure enterprise apps with SSO, role-based access, offline mode, and ERP integration. Webaurix, Lahore, serving Pakistan, the US, and the UK.",
    },
  },
  "ar-vr-game-apps": {
    parent: "app-development",
    bannerLabel: "AR / VR & Game Apps",
    bannerTitle: "AR, VR, and mobile game apps that captivate users",
    bannerSubtitle:
      "Webaurix develops immersive AR, VR, and game apps using ARKit, ARCore, and Unity, from retail product try-on and 3D training simulations to casual mobile games.",
    seo: {
      title: "AR, VR & Mobile Game App Development | Webaurix",
      description:
        "Immersive AR, VR, and mobile game apps built with ARKit, ARCore, and Unity, for retail, training, and entertainment. Webaurix, Lahore, Pakistan.",
    },
  },

  /* ───── UI/UX family ───── */
  "branding": {
    parent: "ui-ux-design",
    bannerLabel: "Branding & Visual Identity",
    bannerTitle: "Brand identities that build recognition and lasting trust",
    bannerSubtitle:
      "Webaurix designs logos, colour systems, typography, and brand guidelines that make your business look credible, consistent, and unmistakably distinct across every touchpoint.",
    seo: {
      title: "Branding & Visual Identity Design Services | Webaurix",
      description:
        "Logos, colour systems, typography, and brand guidelines designed to build recognition and trust. Webaurix, Lahore, serving Pakistan, the US, and the UK.",
    },
  },
  "wireframing-prototyping": {
    parent: "ui-ux-design",
    bannerLabel: "Wireframing & Prototyping",
    bannerTitle: "Clickable wireframes and prototypes to validate ideas fast",
    bannerSubtitle:
      "Webaurix designs high-fidelity Figma wireframes and clickable prototypes that test user flows with real users and eliminate costly assumptions before a line of code is written.",
    seo: {
      title: "Wireframing & Prototyping Services | UX Design – Webaurix",
      description:
        "High-fidelity Figma wireframes and prototypes that test user flows and eliminate costly assumptions before development starts. Webaurix, Lahore, Pakistan.",
    },
  },
  "product-research": {
    parent: "ui-ux-design",
    bannerLabel: "Product Research & Strategy",
    bannerTitle: "User research and product strategy grounded in real data",
    bannerSubtitle:
      "Webaurix delivers user interviews, usability testing, journey mapping, and product strategy that aligns your roadmap with what real customers need and value, not assumptions.",
    seo: {
      title: "Product Research & UX Strategy Services | Webaurix",
      description:
        "User interviews, usability testing, journey mapping, and product strategy grounded in real user data. Webaurix, Lahore, serving Pakistan and the US.",
    },
  },

  /* ───── Custom Software family ───── */
  "saas-solutions": {
    parent: "custom-software-development",
    bannerLabel: "SaaS Solutions",
    bannerTitle: "Multi-tenant SaaS platforms built to scale from launch",
    bannerSubtitle:
      "Webaurix engineers SaaS platforms with Stripe subscription billing, multi-tenancy, usage metering, and the admin tooling that makes a SaaS product operationally sustainable.",
    seo: {
      title: "SaaS Development Services | Build Scalable SaaS – Webaurix",
      description:
        "Multi-tenant SaaS platforms with Stripe billing, usage metering, and admin tooling built for scale. Webaurix, Lahore, serving Pakistan, the US, and the UK.",
    },
  },
  "api-integration": {
    parent: "custom-software-development",
    bannerLabel: "API Integration",
    bannerTitle: "API development and integration that connects everything",
    bannerSubtitle:
      "Webaurix designs RESTful and GraphQL APIs and third-party integrations that connect your tools, data sources, and platforms into a unified, reliable, and documented ecosystem.",
    seo: {
      title: "API Development & Integration Services | Webaurix",
      description:
        "RESTful and GraphQL APIs, third-party integrations, and webhook systems that connect your platforms into one reliable ecosystem. Webaurix, Lahore, Pakistan.",
    },
  },
  "legacy-system-modernization": {
    parent: "custom-software-development",
    bannerLabel: "Legacy Modernization",
    bannerTitle: "Legacy modernisation without the rebuild risk",
    bannerSubtitle:
      "Webaurix replaces brittle legacy systems using strangler-fig migration, modernising piece by piece in parallel so business operations never stop during the transition.",
    seo: {
      title: "Legacy System Modernisation Services | Webaurix",
      description:
        "Strangler-fig legacy modernisation: migrate, refactor, and replatform ageing systems with zero business downtime. Webaurix, Lahore, Pakistan.",
    },
  },

  /* ───── Digital Marketing family ───── */
  "seo-optimization": {
    parent: "digital-marketing",
    bannerLabel: "SEO Optimization",
    bannerTitle: "SEO that earns rankings, organic traffic, and qualified leads",
    bannerSubtitle:
      "Webaurix delivers technical SEO audits, keyword strategy, on-page optimisation, and JSON-LD schema markup that build sustained organic visibility and qualified inbound traffic.",
    seo: {
      title: "SEO Optimization Services | Grow Organic Traffic – Webaurix",
      description:
        "Technical SEO, on-page optimisation, keyword strategy, and schema markup that build organic visibility and drive qualified traffic. Webaurix, Lahore, Pakistan.",
    },
  },
  "ppc-advertising": {
    parent: "digital-marketing",
    bannerLabel: "PPC Advertising",
    bannerTitle: "Google Ads and Meta PPC campaigns that maximise ROI",
    bannerSubtitle:
      "Webaurix manages Google Search, Shopping, and Meta PPC campaigns with precise audience targeting, conversion tracking, and continuous bid optimisation that turns ad spend into measurable revenue.",
    seo: {
      title: "PPC Advertising & Google Ads Management | Webaurix",
      description:
        "Google Ads and Meta PPC campaigns with precise targeting, conversion tracking, and ROI-focused optimisation. Webaurix, Lahore, serving Pakistan and the US.",
    },
  },
  "social-media-marketing": {
    parent: "digital-marketing",
    bannerLabel: "Social Media Marketing",
    bannerTitle: "Social media marketing that builds real, engaged audiences",
    bannerSubtitle:
      "Webaurix delivers social media strategy, content creation, and community management that grows your audience on Instagram, LinkedIn, and TikTok and converts followers into customers.",
    seo: {
      title: "Social Media Marketing & Management Services | Webaurix",
      description:
        "Social media strategy, content, and community management that grows audiences on Instagram, LinkedIn, and TikTok. Webaurix, Lahore, serving Pakistan and the US.",
    },
  },
  "email-content-marketing": {
    parent: "digital-marketing",
    bannerLabel: "Email & Content Marketing",
    bannerTitle: "Email funnels and content strategy that nurtures and converts",
    bannerSubtitle:
      "Webaurix builds segmented email sequences and automated drip funnels using Mailchimp, HubSpot, and Klaviyo that keep you top-of-mind and drive repeat conversions month after month.",
    seo: {
      title: "Email & Content Marketing Services | Webaurix",
      description:
        "Segmented email sequences and automated funnels built in Mailchimp, HubSpot, and Klaviyo that nurture leads and drive repeat conversions. Webaurix, Lahore, Pakistan.",
    },
  },
};

export default serviceAliases;
