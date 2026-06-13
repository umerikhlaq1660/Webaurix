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
    bannerTitle: "High-converting e-commerce stores",
    bannerSubtitle:
      "Shopify Plus, headless storefronts and custom carts - fast, secure online stores built to turn visitors into customers.",
    seo: {
      title: "E-Commerce Development Services | Shopify & Custom Stores – Webaurix",
      description:
        "Webaurix builds fast, secure, conversion-focused e-commerce stores on Shopify Plus and custom stacks that grow your online sales.",
    },
  },
  "cms-development": {
    parent: "web-development",
    bannerLabel: "CMS Development",
    bannerTitle: "Flexible, easy-to-manage CMS websites",
    bannerSubtitle:
      "WordPress, headless CMS and custom content platforms that let your team publish and update content with zero friction.",
    seo: {
      title: "CMS Development Services | WordPress & Headless CMS – Webaurix",
      description:
        "Custom CMS development by Webaurix - WordPress, headless and bespoke content platforms that are fast, secure and easy to manage.",
    },
  },
  "progressive-web-apps": {
    parent: "web-development",
    bannerLabel: "Progressive Web Apps",
    bannerTitle: "App-like speed on the open web",
    bannerSubtitle:
      "Installable, offline-ready Progressive Web Apps that load instantly and feel native - without the app store.",
    seo: {
      title: "Progressive Web App (PWA) Development Services – Webaurix",
      description:
        "Webaurix builds installable, offline-capable Progressive Web Apps that deliver native-app speed and reliability on any device.",
    },
  },

  /* ───── App Development ───── */
  "cross-platform-app-development": {
    parent: "app-development",
    bannerLabel: "Cross-Platform Apps",
    bannerTitle: "One codebase, every platform",
    bannerSubtitle:
      "Flutter and React Native apps that ship to iOS and Android together - faster delivery, lower cost, native performance.",
    seo: {
      title: "Cross-Platform App Development | Flutter & React Native – Webaurix",
      description:
        "Webaurix builds cross-platform mobile apps with Flutter and React Native - one codebase for iOS and Android with native-grade performance.",
    },
  },
  "enterprise-app-development": {
    parent: "app-development",
    bannerLabel: "Enterprise Apps",
    bannerTitle: "Secure apps built to scale",
    bannerSubtitle:
      "Robust, compliant enterprise mobile apps with the security, integrations and reliability large organisations demand.",
    seo: {
      title: "Enterprise Mobile App Development Services – Webaurix",
      description:
        "Scalable, secure enterprise app development by Webaurix - built for performance, compliance and seamless system integration.",
    },
  },
  "ar-vr-game-apps": {
    parent: "app-development",
    bannerLabel: "AR / VR & Game Apps",
    bannerTitle: "Immersive AR, VR & game experiences",
    bannerSubtitle:
      "Interactive AR, VR and mobile game apps that captivate users with rich, real-time 3D experiences.",
    seo: {
      title: "AR/VR & Mobile Game App Development Services – Webaurix",
      description:
        "Webaurix develops immersive AR, VR and mobile game apps with rich real-time 3D, built for engagement and performance.",
    },
  },

  /* ───── UI/UX family ───── */
  "branding": {
    parent: "ui-ux-design",
    bannerLabel: "Branding & Visual Identity",
    bannerTitle: "Brands people remember",
    bannerSubtitle:
      "Logos, identity systems and brand guidelines that make your business look credible, consistent and unmistakably you.",
    seo: {
      title: "Branding & Visual Identity Design Services – Webaurix",
      description:
        "Webaurix crafts memorable brand identities - logos, colour systems and guidelines that build trust and recognition.",
    },
  },
  "wireframing-prototyping": {
    parent: "ui-ux-design",
    bannerLabel: "Wireframing & Prototyping",
    bannerTitle: "Validate ideas before you build",
    bannerSubtitle:
      "Interactive wireframes and clickable prototypes that test flows and de-risk decisions before a line of code is written.",
    seo: {
      title: "Wireframing & Prototyping Services | UX Design – Webaurix",
      description:
        "Webaurix designs interactive wireframes and prototypes to validate user flows and de-risk your product before development.",
    },
  },
  "product-research": {
    parent: "ui-ux-design",
    bannerLabel: "Product Research & Strategy",
    bannerTitle: "Decisions grounded in real users",
    bannerSubtitle:
      "User research, journey mapping and product strategy that align your roadmap with what customers actually need.",
    seo: {
      title: "Product Research & UX Strategy Services – Webaurix",
      description:
        "Webaurix delivers user research and product strategy - journey maps and insights that align your roadmap with real user needs.",
    },
  },

  /* ───── Custom Software family ───── */
  "saas-solutions": {
    parent: "custom-software-development",
    bannerLabel: "SaaS Solutions",
    bannerTitle: "SaaS products built to scale",
    bannerSubtitle:
      "Multi-tenant SaaS platforms with billing, dashboards and APIs - engineered for growth from day one.",
    seo: {
      title: "SaaS Development Services | Build Scalable SaaS – Webaurix",
      description:
        "Webaurix builds scalable, multi-tenant SaaS platforms with secure billing, analytics and APIs - engineered for growth.",
    },
  },
  "api-integration": {
    parent: "custom-software-development",
    bannerLabel: "API Integration",
    bannerTitle: "Connect every system seamlessly",
    bannerSubtitle:
      "Custom APIs and third-party integrations that make your tools, data and platforms work together as one.",
    seo: {
      title: "API Development & Integration Services – Webaurix",
      description:
        "Webaurix designs and integrates secure, reliable APIs that connect your platforms, data and third-party tools seamlessly.",
    },
  },
  "legacy-system-modernization": {
    parent: "custom-software-development",
    bannerLabel: "Legacy Modernization",
    bannerTitle: "Modernise without the rebuild risk",
    bannerSubtitle:
      "Migrate, refactor and re-platform ageing systems into secure, maintainable, future-ready software.",
    seo: {
      title: "Legacy System Modernization Services – Webaurix",
      description:
        "Webaurix modernises legacy systems - migration, refactoring and re-platforming into secure, scalable, maintainable software.",
    },
  },

  /* ───── Digital Marketing family ───── */
  "seo-optimization": {
    parent: "digital-marketing",
    bannerLabel: "SEO Optimization",
    bannerTitle: "Rank higher, grow organically",
    bannerSubtitle:
      "Technical, on-page and content SEO that lifts your rankings and drives qualified organic traffic that converts.",
    seo: {
      title: "SEO Optimization Services | Grow Organic Traffic – Webaurix",
      description:
        "Webaurix delivers technical, on-page and content SEO that boosts rankings and drives qualified organic traffic to your site.",
    },
  },
  "ppc-advertising": {
    parent: "digital-marketing",
    bannerLabel: "PPC Advertising",
    bannerTitle: "Paid ads that pay for themselves",
    bannerSubtitle:
      "Google and social PPC campaigns optimised for ROI - the right audience, the right message, measurable returns.",
    seo: {
      title: "PPC Advertising & Google Ads Management Services – Webaurix",
      description:
        "Webaurix runs high-ROI PPC campaigns on Google and social - precise targeting and optimisation that turn ad spend into revenue.",
    },
  },
  "social-media-marketing": {
    parent: "digital-marketing",
    bannerLabel: "Social Media Marketing",
    bannerTitle: "Build a brand people follow",
    bannerSubtitle:
      "Strategy, content and community management that grow your audience and turn followers into loyal customers.",
    seo: {
      title: "Social Media Marketing Services – Webaurix",
      description:
        "Webaurix grows your social presence with strategy, content and community management that turns followers into customers.",
    },
  },
  "email-content-marketing": {
    parent: "digital-marketing",
    bannerLabel: "Email & Content Marketing",
    bannerTitle: "Content that nurtures and converts",
    bannerSubtitle:
      "Email funnels and content strategy that build trust, keep you top-of-mind and drive repeat conversions.",
    seo: {
      title: "Email & Content Marketing Services – Webaurix",
      description:
        "Webaurix builds email funnels and content strategies that nurture leads, build trust and drive repeat conversions.",
    },
  },
};

export default serviceAliases;
