import { 
  Code2, 
  LayoutPanelLeft, 
  Database, 
  Layers,
  ShoppingCart,
  FileStack,
  Globe,
  Plug,
  Blocks,
  SquareChartGantt,
  Gamepad2,
  Cross,
  RectangleGoggles,
  Smartphone,
  MonitorCog,
  Settings,
  CircleDollarSign,
  HeartPlus,
  Dumbbell,
  HousePlus,
  HandPlatter,
  School,
  TentTree,
  Webhook,
  TrendingUp,
  Truck,
  Code,
  Coffee,
  DollarSign,
  Share2,
  FileText,
  Mail,
  Zap,
  BarChart2,
  Target,
  Monitor,
  CheckCircle
 } from "lucide-react";

const servicesData = {
  "ui-ux-design": {
    bannerLabel: "UI / UX",
    bannerTitle: "User-centred UI/UX design that converts and retains",
    bannerSubtitle: "Webaurix designs intuitive, on-brand interfaces in Figma, from user research and wireframing to high-fidelity prototypes and design systems, built for measurable usability and conversion.",
    seo: {
      title: "UI UX Design Services | Figma & User Research – Webaurix",
      description:
        "User research, Figma wireframes, high-fidelity prototypes, and design systems that improve usability and conversion. Webaurix, Lahore, Pakistan, US, UK."
    },
    stagesHeading: "Our Design Process",
    offersHeading: "What We Offer",
    techStackHeading: "Our Design Toolkit",
    customIndustries: {
      title: "Industries We Serve",
      industries: [
        { name: "E-Commerce Brands", desc: "We design intuitive, user-friendly ecommerce experiences that enhance engagement. Mobile-first layouts and seamless navigation ensure smooth browsing. Product discovery and checkout flows are optimized for ease and efficiency. Every interface is crafted to turn visitors into loyal customers.", icon: ShoppingCart },
        { name: "Healthcare", desc: "We craft patient-friendly apps and websites for appointments, records, and services. Navigation is simple and information is easy to access. Interfaces build trust and improve user engagement. Designs enhance patient experience and streamline interactions.", icon: HeartPlus  },
        { name: "Finance", desc: "We create secure, user-centric dashboards and portals for banking and fintech platforms. Complex data is presented clearly for easy understanding. Interfaces are optimized for engagement and trust. Designs enhance usability and client confidence.", icon: CircleDollarSign },
        { name: "Real Estate", desc: "We design property browsing apps and websites with clear listings and inquiry flows. Navigation and search are intuitive. Interfaces highlight properties effectively. Every design helps convert visitors into potential buyers.", icon: HousePlus  },
        { name: "Restaurants", desc: "We design menu-focused, booking-friendly apps and websites for restaurants and hotels. Interfaces make ordering, reservations, and browsing simple. Visuals highlight ambiance and offerings. Every design encourages repeat visits and customer loyalty.", icon: HandPlatter  },
        { name: "Education", desc: "We design engaging learning platforms and interactive dashboards for students and educators. Navigation is intuitive and content is easy to access. Interfaces improve comprehension and retention. Every design supports a smooth and effective learning experience.", icon: School  },
        { name: "Fitness and gyms", desc: "We build member-focused apps and websites with schedules, classes, and membership management. Navigation is smooth for all users. Visuals highlight energy and services. Interfaces drive engagement and retention of members.", icon: Dumbbell  },
        { name: "Travel & Tourism", desc: "We craft visually appealing apps and websites for bookings and trip planning. Navigation and search are intuitive for easy exploration. Interactive elements enhance engagement and decision-making. Designs inspire users to explore and book trips confidently.", icon: TentTree  },
      ],
      btnText: "Contact Us",
    },

    stages: [
      { title: "Research & Analysis", desc: "We conduct user interviews, surveys, and heatmap analysis to understand real user behaviour and the design decisions that will move your KPIs." },
      { title: "Planning & Strategy", desc: "We map information architecture, user flows, and a clear design brief before wireframing begins, aligning your team on direction before design starts." },
      { title: "Design & Prototyping", desc: "We design pixel-perfect, fully responsive interfaces in Figma with consistent components, accessible colour contrast, and mobile-first layouts throughout." },
      { title: "Testing & Feedback", desc: "We run moderated and unmoderated usability sessions with your target users, identify friction points with session recordings, and refine the design based on real behaviour." },
      { title: "Handover & Implementation", desc: "We hand off design tokens, a living Figma component library, and annotated developer specs and stay available to answer implementation questions during build." },
      { title: "Maintenance & Optimization", desc: "We monitor real user behaviour with heatmaps and session recordings after launch and iterate the design to continuously improve task completion and conversion rate." },
    ],

    offers: [
      {
        icon: TrendingUp,
        title: "User Research & Analysis",
        descback: "We conduct in-depth user interviews, surveys, session recordings, and heatmap analysis to build a research-backed design brief grounded in real user behaviour, not assumptions.",
      },
      {
        icon: Layers,
        title: "Wireframing & Prototyping",
        descback: "We create low and high-fidelity Figma wireframes and interactive prototypes that test user journeys and validate navigation before any development investment is committed.",

      },
      {
        icon: Monitor,
        title: "Visual & Interaction Design",
        descback: "Our team designs pixel-perfect, brand-consistent interfaces in Figma with accessible colour contrast, responsive layouts, and motion specs included for every component.",

      },
      {
        icon: CheckCircle,
        title: "Usability Testing",
        descback: "We run moderated usability sessions with your target audience, identify friction with video evidence, and refine designs until users complete core tasks without confusion.",

      },
      {
        icon: Target,
        title: "UI/UX Strategy & Consulting",
        descback: "We map your product experience against business KPIs, identify the highest-impact improvements, and deliver a prioritised design roadmap with a clear ROI rationale for each change.",

      },
    ],
    customChatbot: {
      title: "Enhance your designs with AI-driven feedback",
      desc: "We’ll integrate an AI-powered assistant that reviews design choices, provides usability insights, and learns from your user feedback.",
      ctaText: "Integrate AI Assistant",
      ctaLink: "/book-call",
    },

    customTechStack: {
      Design: [
        { name: "Figma", img: "/stack/platforms/Figma.png" },
        { name: "Adobe XD", img: "/stack/platforms/Adobe-xd.png" },
        { name: "Sketch", img: "/stack/platforms/Sketch.png" },
        { name: "Invision", img: "/stack/platforms/Invision.png" },
        { name: "Adobe Photoshop", img: "/stack/platforms/PS.png" },
        { name: "Adobe Illustrator", img: "/stack/platforms/Ai.png" },
        { name: "Canva", img: "/stack/platforms/Canva.png" },
        { name: "Zeplin", img: "/stack/platforms/Zeplin.png" },
        { name: "Slack", img: "/stack/platforms/Slack.png" },
      ],
    },
       customFAQ: {
  title: "UI/UX FAQs",
  items: [
    {
      question: "What is UI/UX design?",
      answer:
        "UI/UX design focuses on creating intuitive, visually appealing, and user-friendly experiences for websites, apps, and digital products.",
    },
    {
      question: "Why is UI/UX important?",
      answer:
        "Good design improves usability, increases engagement, reduces friction, and boosts conversions, creating better overall user experiences..",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We provide UI/UX design for ecommerce, healthcare, finance, education, travel, restaurants, fitness, SaaS startups, real estate, and legal sectors.",
    },
    {
      question: "What is your design process?",
      answer:
        "Our process includes research, planning, wireframing, prototyping, testing, and final design handoff to ensure optimal usability.",
    },
    {
      question: "How do you measure design success?",
      answer:
        "We track usability, engagement, conversion rates, and user feedback to ensure designs meet both business and user goals effectively.",
    },
  ],
},
  },
  "web-development": {
    bannerLabel: "Web Development",
    bannerTitle: "Fast, modern websites and web apps that rank and convert",
    bannerSubtitle: "Webaurix builds performance-first websites and web apps on React and Next.js, Core Web Vitals optimised, SEO-ready, and built to scale for clients in Pakistan, the US, and the UK.",
    seo: {
      title: "Custom Web Development Services | React & Next.js – Webaurix",
      description:
        "Custom websites and web apps built on React, Next.js, and Node.js. Core Web Vitals-first, SEO-optimised, scalable. Webaurix, Lahore, serving Pakistan, US, and the UK."
    },
    stagesHeading: "Development Lifecycle",
    offersHeading: "Our Capabilities",
    techStackHeading: "Tech We Love",
    customIndustries: {
      title: "Industries We Serve",
      industries: [
        { name: "E-Commerce Brands", desc: "We build fast, secure, and conversion-driven online stores that enhance user experience. Mobile-first layouts and optimized performance boost sales naturally. Product discovery and checkout are simple and smooth. Every store is designed to turn visitors into loyal customers.", icon: ShoppingCart },
        { name: "Healthcare", desc: "We develop secure, patient-friendly websites with easy appointment booking. Service listings and doctor profiles are clear. Navigation is simple for all users. Designs build trust and improve patient communication.", icon: HeartPlus  },
        { name: "Finance", desc: "We build secure, professional websites highlighting services and expertise. Tools like calculators and trackers enhance experience. Navigation is simple and client-focused. Designs build trust and convert visitors into clients.", icon: CircleDollarSign },
        { name: "Real Estate", desc: "We create dynamic, lead-focused websites with property filters and map integration. Clean layouts help users explore listings easily. Inquiry systems make contacting agents simple. Websites convert visitors into potential buyers efficiently.", icon: HousePlus  },
        { name: "Restaurants", desc: "We design menu-focused and delivery-friendly websites that simplify online orders. Reservation systems are integrated seamlessly. Visuals highlight signature dishes and ambiance. The design boosts customer engagement and loyalty.", icon: HandPlatter  },
        { name: "Education", desc: "We build scalable, intuitive platforms for courses, lectures, and resources. Enrollment processes are streamlined for students. Content is easy to manage and navigate. Designs help attract new learners effectively.", icon: School  },
        { name: "Fitness and gyms", desc: "We design member-focused websites with class schedules and membership options. Online booking is seamless. Visuals highlight the energy of the gym. The design attracts new clients and retains existing ones.", icon: Dumbbell  },
        { name: "Travel & Tourism", desc: "We create visually rich, booking-friendly websites for travel brands. Packages and destinations are highlighted clearly. Booking and inquiry systems are simple. Designs inspire users to explore and plan trips.", icon: TentTree  },
      ],
      btnText: "Contact Us",
    },

    stages: [
      { title: "Discovery & Research", desc: "We study your users, competitors, and technical requirements to scope a lean, achievable delivery plan with no surprises." },
      { title: "Planning & Strategy", desc: "We select the right technology stack, architecture pattern, and delivery milestones to minimise risk and maximise delivery speed." },
      { title: "UI/UX Design", desc: "We design intuitive, on-brand interfaces in Figma with accessibility, mobile-first layout, and conversion rate built in from day one." },
      { title: "Prototyping", desc: "We build clickable prototypes reviewed by your team and tested with real users before a single line of code is written." },
      { title: "Development", desc: "We engineer fast, type-safe code using React, TypeScript, and Node.js with automated testing and code review at each sprint." },
      { title: "Testing & QA", desc: "We run Lighthouse audits, cross-browser testing, and load tests to ensure sub-2s load times and zero functional regressions." },
      { title: "Deployment", desc: "We deploy to your cloud with CI/CD automation, HTTPS, and monitoring configured from day one, with zero-downtime releases." },
      { title: "Support", desc: "We provide bug fixes, feature iterations, and performance reviews on a schedule that fits your team and roadmap." },
    ],

    offers: [
      {
        icon: LayoutPanelLeft,
        title: "Front-End Development",
        descback: "Pixel-perfect, interactive interfaces built on React, Next.js, and TypeScript, loading in under 2 seconds and passing Core Web Vitals with scores of 90 or above.",
        link: "/services/ui-ux#interaction",
      },
      {
        icon: Database,
        title: "Back-End Development",
        descback: "Secure, scalable server-side systems with REST and GraphQL APIs, PostgreSQL or MongoDB, and Node.js, engineered for reliability at any traffic level.",
        link: "/services/web-development#cms",
      },
      {
        icon: Layers,
        title: "Full-Stack Development",
        descback: "End-to-end development from database to UI, managed by a single team, eliminating handoff delays and delivering integrated, production-ready solutions on schedule.",
        link: "/services/web-development#cms",
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce Development",
        descback: "High-converting online stores with Stripe or PayFast payment integration, real-time inventory management, and admin dashboards built for rapid growth.",
        link: "/services/web-development#cms",
      },
      {
        icon: Globe,
        title: "Web App Development",
        descback: "Complex, data-rich web applications with real-time features, role-based access control, and performance matching a native desktop app, built on React and Node.js.",
        link: "/services/web-development#cms",
      },
      {
        icon: Plug,
        title: "API Integration & Development",
        descback: "RESTful and GraphQL API design and integration that connects your systems, third-party services, and data sources into a unified, reliable, and documented ecosystem.",
        link: "/services/web-development#cms",
      },
      {
        icon: FileStack,
        title: "CMS Development",
        descback: "Headless CMS implementations with Sanity or Contentful and custom WordPress builds, making content updates self-serve and reducing dependency on developers.",
      },
      {
        icon: TrendingUp,
        title: "SEO Optimization",
        descback: "Technical SEO from day one: semantic HTML, JSON-LD schema markup, XML sitemap, canonical URLs, and Lighthouse scores of 90 or above on every page we ship.",
      },
    ],

    customSection: {
      title: "Performance Optimization",
      desc: "Boost your site’s loading time and SEO rankings through modern performance practices - from code-splitting to CDN strategies.",
      ctaText: "Optimize My Site",
      ctaLink: "/book-call",
    },
    customForm: {
       title: "Optimize My Site",
       desc: "Fill out this quick form and our team will analyze your website’s performance within 24 hours.",
       buttonText: "Analyze My Site",
       fields: [
         { type: "text", placeholder: "Full Name" },
         { type: "email", placeholder: "Email Address" },
         { type: "url", placeholder: "Website URL" },
         { type: "textarea", placeholder: "Describe your goals or current issues..." },
      ],
    },

    customChatbot: {
      title: "Let’s make your website smarter. We’ll integrate a free chatbot for your visitors trained on your business info.",
      desc: "We’ll add a free AI chatbot that helps you manage your site, debug issues, and answer visitor queries 24/7.",
      ctaText: "Get AI Assistant",
      ctaLink: "/book-call",
    },

    customTechStack: {
      Frontend: [
        { name: "React.js", img: "/stack/frontend/React.png" },
        { name: "Next.js", img: "/stack/frontend/Next.js.png" },
        { name: "Angular", img: "/stack/frontend/Angular.png" },
        { name: "Django", img: "/stack/frontend/Django.png" },
        { name: "TypeScript", img: "/stack/frontend/TypeScript.png" },
        { name: "JavaScript", img: "/stack/frontend/JavaScript.png" },
        { name: "Tailwind CSS", img: "/stack/frontend/Tailwind.png" },
        { name: "Bootstrap", img: "/stack/frontend/Bootstrap.png" },
      ],
      Backend: [
        { name: "Node.js", img: "/stack/backend/Node.js.png" },
        { name: "Python", img: "/stack/backend/Python.png" },
        { name: "Express", img: "/stack/backend/Express.png" },
        { name: "MongoDB", img: "/stack/backend/MongoDB.png" },
        { name: "Mongoose.js", img: "/stack/backend/Mongoose.js.png" },
        { name: "GraphQL", img: "/stack/backend/GraphQL.png" },
        { name: "Sequelize", img: "/stack/backend/Sequelize.png" },
        { name: "PostgreSQL", img: "/stack/backend/PostgresSQL.png" },
        { name: "MySQL", img: "/stack/backend/MySQL.png" },
        { name: "DigitalOcean", img: "/stack/backend/DigitalOcean.png" },
      ],
      DevOps: [
        { name: "Docker", img: "/stack/backend/Docker.png" },
        { name: "GitHubActions", img: "/stack/backend/GitHubActions.png" },
        { name: "NGINX", img: "/stack/backend/NGINX.png" },
      ],
    },
    customFAQ: {
  title: "Web Development FAQs",
  items: [
    {
      question: "How long does it take to build a website?",
      answer:
        "The timeline depends on the project’s size and complexity typically, a standard business website takes 3–6 weeks, while custom web applications may take a few months.",
    },
    {
      question: "Will my website be mobile-friendly and responsive?",
      answer:
        "Absolutely. Every website we build is optimized for all devices - desktops, tablets, and smartphones - ensuring a smooth user experience everywhere.",
    },
    {
      question: "Can I update and manage the website myself after it’s built?",
      answer:
        "Yes! We provide CMS-based solutions that let you easily edit content, images, and pages without needing technical knowledge.",
    },
    {
      question: "Do you offer website maintenance after launch?",
      answer:
        "Yes, we offer ongoing maintenance and support to keep your website secure, updated, and performing at its best after going live.",
    },
    {
      question: "How much does a custom website cost?",
      answer:
        "Pricing varies based on your goals, features, and design requirements - we tailor quotes to match your exact needs and budget.",
    },
  ],
},

  },
  "app-development": {
    bannerLabel: "App Development",
    bannerTitle: "High-performance iOS and Android apps, built for real users",
    bannerSubtitle: "Webaurix engineers native and cross-platform mobile apps using React Native and Flutter, fast, reliable, and designed to retain users from the very first session.",
    seo: {
      title: "Mobile App Development | iOS & Android Apps – Webaurix",
      description:
        "iOS and Android apps built with React Native and Flutter. Fast, secure, and designed for real user retention. Webaurix, Lahore, serving Pakistan, US, and the UK."
    },
    stagesHeading: "Development Lifecycle",
    offersHeading: "Our Capabilities",
    techStackHeading: "Tech We Love",
    customIndustries: {
      title: "Industries We Serve",
      industries: [
        { name: "E-Commerce Brands", desc: "We build high performance ecommerce apps with fast navigation and secure payments. Users enjoy a smooth shopping flow built for mobile first. Product browsing and checkout are simple and intuitive. Every app is designed to turn users into loyal customers.", icon: ShoppingCart },
        { name: "Healthcare", desc: "We develop secure patient friendly healthcare apps with easy appointment scheduling. Service details and doctor profiles stay clear and accessible. Navigation is smooth for users of all ages. The app strengthens trust and improves patient communication.", icon: HeartPlus  },
        { name: "Finance", desc: "We build secure professional finance apps that clearly highlight services and expertise. Built in tools like calculators and trackers improve user experience. Navigation stays simple and client focused. The app builds trust and helps convert users into long term clients.", icon: CircleDollarSign },
        { name: "Real Estate", desc: "We create dynamic lead focused real estate apps with smooth property filters and map features. Users explore listings easily through clean mobile screens. Inquiry options make contacting agents simple. The app turns viewers into potential buyers efficiently.", icon: HousePlus  },
        { name: "Restaurants", desc: "We design menu focused and delivery friendly food apps that simplify online ordering. Reservation and table booking features work smoothly. Visuals highlight signature dishes and enhance the brand experience. The app boosts customer engagement and loyalty.", icon: HandPlatter  },
        { name: "Education", desc: "We build scalable intuitive learning apps for courses lectures and study resources. Enrollment and access flows stay smooth for students. Content is easy to browse and manage on mobile. The app helps attract and retain new learners effectively.", icon: School  },
        { name: "Fitness and gyms", desc: "We design member focused fitness apps with class schedules and membership options. Online booking and check ins are smooth for users. Visuals highlight the energy and identity of the gym. The app attracts new clients and keeps existing members engaged.", icon: Dumbbell  },
        { name: "Travel & Tourism", desc: "We create visually rich travel apps with smooth booking features. Packages and destinations stay clearly highlighted for easy browsing. Booking and inquiry flows are simple on mobile. The app inspires users to explore and plan trips effortlessly.", icon: TentTree  },
      ],
      btnText: "Contact Us",
    },

    stages: [
      { title: "Planning", desc: "Define app scope, user flows, and technical architecture to avoid costly pivots and scope creep during development." },
      { title: "Analysis", desc: "Study the app market, target users, and competition to validate features and prioritise the build list before writing code." },
      { title: "Design", desc: "Create high-fidelity UI/UX in Figma, reviewed by your team and tested with representative users before development begins." },
      { title: "Development", desc: "Engineer native or cross-platform code using React Native or Flutter with full test coverage at each two-week sprint." },
      { title: "Testing", desc: "Run device-lab testing, performance profiling, and security audits across iOS and Android before App Store submission." },
      { title: "Deployment", desc: "Submit to the App Store and Google Play with metadata, screenshots, and app store optimisation (ASO) configured for discoverability." },
      { title: "Maintenance", desc: "Post-launch monitoring, OS compatibility updates, and feature iterations on a schedule aligned to your product roadmap." },
      { title: "Evaluation", desc: "Monthly analytics reviews covering retention rate, crash frequency, and session depth to guide the next development cycle." },
    ],

    offers: [
      {
        icon: Smartphone,
        title: "Native App Development",
        descback: "iOS and Android apps built in Swift, Kotlin, or React Native with full device hardware access, camera, GPS, biometrics, and push notifications included.",
      },
      {
        icon: Blocks,
        title: "Hybrid App Development",
        descback: "Single React Native or Flutter codebase running natively on iOS and Android, delivering 70 percent code reuse with near-native performance and platform-appropriate UI.",
      },
      {
        icon: Globe,
        title: "Web App Development",
        descback: "Progressive, app-like web applications that work offline, support push notifications, and install to the home screen without requiring an App Store listing or review.",
      },
      {
        icon: SquareChartGantt,
        title: "Progressive Web Apps (PWA)",
        descback: "Web apps with app-like features that work offline, send push notifications, and install directly to the device home screen, available without App Store approval.",
      },
      {
        icon: FileStack,
        title: "Enterprise App Development",
        descback: "Secure enterprise apps with single sign-on, role-based permissions, offline capability, and deep integration with SAP, Salesforce, or your internal ERP systems.",
      },
      {
        icon: Gamepad2,
        title: "Game App Development",
        descback: "Mobile and desktop games built with Unity or Unreal Engine, from 2D casual games to complex 3D experiences published on iOS, Android, and PC platforms.",
      },
      {
        icon: Cross,
        title: "Cross-Platform Development",
        descback: "One React Native or Flutter codebase, two app stores. Delivers 60fps performance and native look-and-feel on both platforms at roughly half the development cost.",
      },
      {
        icon: RectangleGoggles,
        title: "AR/VR App Development",
        descback: "Immersive augmented and virtual reality experiences using ARKit, ARCore, and Unity, for retail product try-on, employee training, and interactive entertainment.",
      },
      
    ],

    customSection: {
      title: "Performance Optimization",
      desc: "Boost your site’s loading time and SEO rankings through modern performance practices - from code-splitting to CDN strategies.",
      ctaText: "Optimize My Site",
      ctaLink: "/book-call",
    },

    customChatbot: {
      title: "Launch faster with an AI-powered Dev Assistant",
      desc: "We’ll add a free AI chatbot that helps you manage your site, debug issues, and answer visitor queries 24/7.",
      ctaText: "Get AI Assistant",
      ctaLink: "/book-call",
    },

    customTechStack: {
      Frontend: [
        { name: "React Native", img: "/stack/frontend/React.png" },
        { name: "Angular", img: "/stack/frontend/Angular.png" },
        { name: "Vue.js", img: "/stack/frontend/Vue.js.png" },
        { name: "Redux", img: "/stack/frontend/Redux.png" },
        { name: "Material-UI", img: "/stack/frontend/Material UI.png" },
        { name: "Flutter", img: "/stack/frontend/Flutter.png" },
        { name: "MobX", img: "/stack/frontend/MobX.png" },
        { name: "Webpack", img: "/stack/frontend/Webpack.png" },
        { name: "Vite", img: "/stack/frontend/Vite.png" },
        { name: "Babel", img: "/stack/frontend/Babel.png" },
      ],
      Backend: [
        { name: "Node.js", img: "/stack/backend/Node.js.png" },
        { name: "Python", img: "/stack/backend/Python.png" },
        { name: "Java", img: "/stack/backend/Java.png" },
        { name: "Express", img: "/stack/backend/Express.png" },
        { name: "Laravel", img: "/stack/backend/Laravel.png" },
        { name: "NestJS", img: "/stack/backend/Nest.js.png" },
        { name: "Django", img: "/stack/backend/Django.png" },
        { name: "MySQL", img: "/stack/backend/MySQL.png" },
        { name: "PostgreSQL", img: "/stack/backend/PostgresSQL.png" },
        { name: "MongoDB", img: "/stack/backend/MongoDB.png" },
        { name: "Firebase", img: "/stack/backend/Firebase.png" },
        { name: "GraphQL", img: "/stack/backend/GraphQL.png" },
        { name: "AWS", img: "/stack/backend/AWS.png" },
      ],
    },
    customFAQ: {
    title: "App Development FAQs",
    items: [
    {
      question: "What platforms do you develop apps for?",
      answer:
        "We develop apps for Android, iOS, and cross-platform solutions like Flutter and React Native.",
    },
    {
      question: "How long does it take to build a mobile app?",
      answer:
        "App development usually takes 4–12 weeks depending on complexity and features.",
    },
    {
      question: "Do you provide app maintenance after launch?",
      answer:
        "Yes, we offer post-launch support, updates, and bug fixes to ensure smooth performance.",
    },
    {
      question: "Can you integrate APIs and third-party services?",
      answer:
        "Absolutely! We can integrate APIs, payment gateways, analytics, and other services as needed.",
    },
    {
      question: "How do you ensure app security?",
      answer:
        "We follow industry standards, use secure authentication (JWT/OAuth), encrypt data, and implement best practices for mobile security.",
    },
  ],
    },
  },
  "custom-software-development": {
    bannerLabel: "Custom Software Development",
    bannerTitle: "Custom software that automates, integrates, and scales",
    bannerSubtitle: "Webaurix engineers bespoke software including SaaS platforms, enterprise systems, and API integrations, built to reduce manual work and scale alongside your business.",
    seo: {
      title: "Custom Software Development Services | SaaS & ERP – Webaurix",
      description:
        "Bespoke SaaS, ERP, and enterprise software that automates workflows and scales with your business. Webaurix, Lahore, serving Pakistan, the US, and the UK."
    },
    stagesHeading: "Our Approch to Custom Software Development",
    offersHeading: "Complete Suite of Custom Software Solutions",
    techStackHeading: "Software Development Stack",
    customIndustries: {
      title: "Industries We Serve",
      industries: [
        { name: "Retail & E-Commerce", desc: "We create custom software for inventory management, order tracking, and POS systems. Dashboards are easy to use and integrate with existing platforms. Mobile-friendly interfaces allow on-the-go management. The software improves sales tracking and operational control.", icon: ShoppingCart },
        { name: "Healthcare", desc: "We develop custom healthcare software for patient management, telemedicine, and electronic health records. Systems are secure, user-friendly, and accessible on multiple devices. Workflows are streamlined for staff efficiency. The software improves patient care and operational management.", icon: HeartPlus  },
        { name: "Finance", desc: "We build secure finance software for portfolio management, trading, and accounting. Tools enhance client interaction and data tracking. Interfaces are intuitive and easy to navigate. The software boosts efficiency, accuracy, and trust.", icon: CircleDollarSign },
        { name: "Real Estate", desc: "We develop property management and CRM software for agents and agencies. Listings, client data, and communication tools are integrated. Mobile and desktop access ensure smooth operations. The software streamlines management and increases leads.", icon: HousePlus  },
        { name: "Restaurants", desc: "We design menu focused and delivery friendly food apps that simplify online ordering. Reservation and table booking features work smoothly. Visuals highlight signature dishes and enhance the brand experience. The app boosts customer engagement and loyalty.", icon: HandPlatter  },
        { name: "Education", desc: "We develop custom LMS platforms, assessment tools, and reporting software. Courses and resources are easy to manage and track. Mobile-friendly access ensures learning anywhere. The software improves engagement and administration.", icon: School  },
        { name: "Fitness and gyms", desc: "We design member focused fitness apps with class schedules and membership options. Online booking and check ins are smooth for users. Visuals highlight the energy and identity of the gym. The app attracts new clients and keeps existing members engaged.", icon: Dumbbell  },
        { name: "Travel & Tourism", desc: "We build booking, itinerary, and CRM software for travel businesses. Platforms are user-friendly and visually appealing. Reservation flows and client management are simplified. The software enhances customer experience and operational efficiency.", icon: TentTree  },
        { name: "Manufacturing and logistics", desc: "We design ERP and supply chain management systems tailored to your operations. Workflows are automated for efficiency. Interfaces allow easy tracking of production and shipments. The software reduces errors and enhances productivity.", icon: Truck},
        { name: "SaaS and tech startups", desc: "We create custom platforms, workflow tools, and API integrations for SaaS companies. Features are scalable and user-centric. Interfaces are intuitive for both clients and internal teams. The software accelerates growth and product adoption.", icon: Code  },
        { name: "Hospitality and restaurant", desc: "We develop custom booking, kitchen management, and loyalty systems. Interfaces are simple and visually engaging. Workflows enhance order accuracy and customer interaction. The software improves service quality and operational control.", icon: Coffee  },
      ],
      btnText: "Contact Us",
    },

    stages: [
      { title: "Planning", desc: "Define business goals, user roles, and system boundaries to create a scoped delivery plan with no hidden complexity." },
      { title: "Requirement Analysis", desc: "Document functional and non-functional requirements with stakeholders to eliminate assumption-driven rework before build begins." },
      { title: "System Design", desc: "Architect the data model, API layer, and integration points to handle current requirements and support future scale without a rebuild." },
      { title: "Prototyping", desc: "Build a working prototype of the core user journey for stakeholder sign-off before full development investment is committed." },
      { title: "Implementation", desc: "Write and integrate code in fortnightly sprints with peer review, automated tests, and working builds your team can access weekly." },
      { title: "Testing", desc: "Run unit, integration, and UAT testing covering edge cases, security vulnerabilities, and load scenarios before release." },
      { title: "Deployment", desc: "Ship to production with zero-downtime deployment, uptime monitoring, and runbook documentation for your operations team." },
      { title: "Maintenance", desc: "Post-launch bug fixes, dependency updates, and feature increments delivered on a defined support schedule with SLAs." },
      { title: "Documentation", desc: "Technical API documentation, user manuals, and admin guides delivered alongside the code, not as a post-project afterthought." },
      { title: "Evaluation", desc: "Post-launch reviews measuring the KPIs agreed on day one: processing time saved, error rates reduced, and operating costs cut." },
    ],

    offers: [
      {
        icon: Smartphone,
        title: "Custom Mobile Applications",
        descback: "Feature-rich iOS and Android apps built with React Native, including custom business logic, third-party integrations, and offline capability as standard.",
      },
      {
        icon: Globe,
        title: "End-to-End Software Development",
        descback: "We own the full delivery lifecycle from scoping to handover, with a single team responsible for architecture quality, code standards, and on-time delivery.",
      },
      {
        icon: Settings,
        title: "Enterprise Systems",
        descback: "Secure, scalable enterprise platforms with SSO, role-based access control, full audit logging, and integration with your existing ERP, CRM, and HR systems.",
      },
      {
        icon:  MonitorCog,
        title: "SaaS Solutions",
        descback: "Multi-tenant SaaS platforms with Stripe subscription billing, usage-based metering, and the admin and billing tooling that makes SaaS operationally sustainable.",
      },
      {
        icon: Globe,
        title: "Legacy System Modernization",
        descback: "We replace brittle legacy systems using strangler-fig migration, modernising piece by piece in parallel so business operations never stop during transition.",
      },
      {
        icon: Webhook ,
        title: "API integration",
        descback: "RESTful and GraphQL API design, third-party service integrations, and webhook systems that connect all your tools into a unified, reliable data ecosystem.",
      },
    ],

    customSection: {
      title: "Performance Optimization",
      desc: "Boost your site’s loading time and SEO rankings through modern performance practices - from code-splitting to CDN strategies.",
      ctaText: "Optimize My Site",
      ctaLink: "/book-call",
    },

    customChatbot: {
      title: "Launch faster with an AI-powered Dev Assistant",
      desc: "We’ll add a free AI chatbot that helps you manage your site, debug issues, and answer visitor queries 24/7.",
      ctaText: "Get AI Assistant",
      ctaLink: "/book-call",
    },

    customTechStack: {
      Frontend: [
        { name: "React.js", img: "/stack/frontend/React.png" },
        { name: "Angular", img: "/stack/frontend/Angular.png" },
        { name: "Vue.js", img: "/stack/frontend/Vue.js.png" },
        { name: "Flutter", img: "/stack/frontend/Flutter.png" },
        { name: "Redux", img: "/stack/frontend/Redux.png" },
        { name: "Material UI", img: "/stack/frontend/Material UI.png" },
        { name: "Tailwind", img: "/stack/frontend/Tailwind.png" },
      ],
      Backend: [
        { name: "Node.js", img: "/stack/backend/Node.js.png" },
        { name: "Express", img: "/stack/backend/Express.png" },
        { name: "Python", img: "/stack/backend/Python.png" },
        { name: "Java", img: "/stack/backend/Java.png" },
        { name: "C++", img: "/stack/backend/CPlusPlus.png" },
        { name: "GraphQL", img: "/stack/backend/GraphQL.png" },
        { name: "C#", img: "/stack/backend/CSharp.png" },

      ],
      Database: [
        { name: "PostgreSQL", img: "/stack/backend/PostgresSQL.png" },
        { name: "MySQL", img: "/stack/backend/MySQL.png" },
        { name: "MongoDB", img: "/stack/backend/MongoDB.png" },
        { name: "Firebase", img: "/stack/backend/Firebase.png" },
        { name: "AWS", img: "/stack/backend/AWS.png" },

      ],
      DevOps: [
        { name: "Docker", img: "/stack/backend/Docker.png" },
        { name: "GitHubActions", img: "/stack/backend/GitHubActions.png" },
        { name: "Kubernetes", img: "/stack/backend/Kubernetes.png" },
      ],
    },
    customFAQ: {
    title: "Softaware Development FAQs",
    items: [
    {
      question: "What is custom software development?",
      answer:
        "Custom software development is the process of creating tailor-made applications and systems specifically designed to meet the unique needs of a business or organization.",
    },
    {
      question: "How long does it take to develop custom software?",
      answer:
        "The timeline depends on the complexity, features, and platform of the software. Small apps may take a few weeks, while enterprise solutions can take several months.",
    },
    {
      question: "Which industries benefit most from custom software?",
      answer:
        "Industries like healthcare, finance, education, retail, logistics, real estate, travel, and SaaS startups benefit greatly, as they require tailored solutions for efficiency and growth.",
    },
    {
      question: "What technologies are used in custom software development?",
      answer:
        "We use modern frontend and backend frameworks (React, Node.js, Django, Spring Boot), databases (PostgreSQL, MongoDB), cloud services (AWS, Azure), and DevOps tools (Docker, CI/CD pipelines) to build scalable and secure software.",
    },
    {
      question: "How does custom software improve business operations?",
      answer:
        "Custom software streamlines workflows, automates repetitive tasks, enhances data management, improves user experience, and provides tools tailored to your specific business goals, boosting overall efficiency.",
    },
  ],
  },
  },
  "digital-marketing": {
    bannerLabel: "Digital Marketing",
    bannerTitle: "Data-driven digital marketing that grows revenue",
    bannerSubtitle: "Webaurix runs SEO, Google Ads, social media, email, and content campaigns with analytics-first strategy to drive traffic, generate qualified leads, and grow your brand.",
    seo: {
      title: "Digital Marketing Services | SEO PPC Social Media – Webaurix",
      description:
        "SEO, Google Ads, social media, email, and content marketing with analytics-first strategy. Webaurix, Lahore, serving Pakistan, the US, and the UK."
    },

    stagesHeading: "Stages Of Work",
    offersHeading: "Our Capabilities",
    techStackHeading: "Platforms Driving Growth",
    customIndustries: {
      title: "Industries We Drive Growth For",
      industries: [
        { name: "Retail & E-Commerce", desc: "We help online stores and retail brands grow through SEO, paid ads, and social media campaigns. Engaging content drives conversions and customer retention. Analytics track results for continuous improvement. Our strategies boost brand visibility and sales..", icon: ShoppingCart },
        { name: "Healthcare", desc: "We create marketing campaigns for hospitals and clinics to attract and retain patients. SEO, social media, and email campaigns build trust. Content highlights services and expertise. Strategies improve engagement and online presence.", icon: HeartPlus  },
        { name: "Finance", desc: "We promote banks, fintechs, and investment firms with targeted SEO, PPC, and content strategies. Campaigns increase leads and client engagement. Analytics track performance and ROI. Solutions strengthen brand credibility online.", icon: CircleDollarSign },
        { name: "Real Estate", desc: "We run marketing campaigns for agents and property developers to attract buyers. SEO, social media, and paid ads showcase listings. Engaging content highlights properties. Strategies increase inquiries and leads.", icon: HousePlus  },
        { name: "Restaurants", desc: "We promote restaurants, cafes, and hotels with social media, SEO, and paid campaigns. Content highlights menus and services. Strategies increase reservations and repeat customers. Analytics optimize performance for growth.", icon: HandPlatter  },
        { name: "Education", desc: "We help schools, colleges, and online learning platforms attract students through SEO, ads, and social media. Content and campaigns enhance engagement and authority. Analytics measure campaign success. Strategies boost enrollments and visibility.", icon: School  },
        { name: "Fitness and gyms", desc: "We help gyms, trainers, and fitness centers attract members with targeted campaigns. SEO, social media, and email marketing drive engagement. Content highlights classes and services. Strategies improve memberships and brand visibility.", icon: Dumbbell  },
        { name: "Travel & Tourism", desc: "We run campaigns for travel agencies, hotels, and tour operators to increase bookings. SEO, PPC, and social media drive traffic. Engaging content showcases destinations. Strategies improve customer engagement and loyalty.", icon: TentTree  },
        { name: "SaaS and tech startups", desc: "We create campaigns for tech companies and startups to generate leads and awareness. SEO, PPC, and content marketing highlight products. Analytics measure performance. Strategies boost conversions and growth.", icon: Code  },
       
      ],
      btnText: "Contact Us",
    },


    stages: [
      { title: "Research & Analysis", desc: "We audit your current traffic, competitors, and audience to identify the highest-ROI marketing channels and content opportunities specific to your business." },
      { title: "Strategy Planning", desc: "We build a channel-specific campaign plan with target audiences, monthly budgets, KPIs, and a content calendar aligned to your revenue goals." },
      { title: "Content & Creative Development", desc: "We produce on-brand ad creative, landing page copy, social content, blog posts, and email sequences ready to launch across all chosen channels simultaneously." },
      { title: "Campaign Execution", desc: "We launch campaigns across SEO, Google Ads, Meta, email, and content with attribution tracking and conversion goals configured before go-live." },
      { title: "Monitoring & Optimization", desc: "We monitor performance daily, run A/B tests on creatives and copy, and reallocate budget to the highest-performing channels and audiences every week." },
      { title: "Reporting & Insights", desc: "We deliver monthly reports with traffic, leads, conversions, and ROI tracked against the baseline metrics we established at the project start." },
    ],

    offers: [
      {
        icon: TrendingUp,
        title: "SEO (Search Engine Optimization)",
        descback: "Comprehensive SEO covering technical audits, on-page optimisation, keyword clustering, internal linking, schema markup, and monthly ranking progress reports delivered on schedule.",
      },
      {
        icon: DollarSign,
        title: "PPC Advertising",
        descback: "Google Search, Display, and Shopping campaigns and Meta Ads managed with conversion tracking, audience segmentation, and weekly bid optimisation focused on cost per acquisition.",
      },
      {
        icon: Share2,
        title: "Social Media Marketing",
        descback: "Social media strategy, creative content production, community management, and paid amplification across Instagram, LinkedIn, Facebook, and TikTok with monthly analytics reporting.",
      },
      {
        icon: FileText,
        title: "Content Marketing",
        descback: "Blog posts, pillar pages, case studies, and email newsletters produced with keyword research and editorial review to build topical authority and drive organic rankings.",
      },
      {
        icon: Mail,
        title: "Email Marketing",
        descback: "Segmented email campaigns and automated drip sequences built in Mailchimp, Klaviyo, or HubSpot with open rate, click rate, and conversion tracked and optimised monthly.",
      },
      {
        icon: Zap,
        title: "Conversion Rate Optimization (CRO)",
        descback: "Landing page and checkout optimisation using Hotjar session recordings and A/B testing, targeting measurable and statistically significant uplift in your conversion rate.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Reporting",
        descback: "GA4 and Google Tag Manager setup, conversion tracking, attribution modelling, and a monthly performance dashboard that gives leadership clear, actionable ROI visibility.",
      },
      {
        icon: Target,
        title: "Brand Strategy & Consulting",
        descback: "Brand positioning, audience persona development, competitive messaging analysis, and a digital marketing playbook aligned to your growth stage and revenue targets.",
      },

    ],
    customTechStack: {
      Platform: [
        { name: "Google Ads", img: "/stack/platforms/google-ads.png" },
        { name: "Meta Ads", img: "/stack//platforms/meta.png" },
        { name: "Twitter", img: "/stack/platforms/twitter.png" },
        { name: "Linkedin", img: "/stack/platforms/LinkedIn.png" },
        { name: "Mailchimp", img: "/stack/platforms/mailchimp.png" },
        { name: "HubSpot", img: "/stack/platforms/hubspot.png" },
        { name: "Canva", img: "/stack/platforms/Canva.png" },
      ],
    },
    customFAQ: {
    title: "Let’s Clear Your Doubts",
    items: [
    {
      question: "What is digital marketing?",
      answer:
        "We help businesses grow online using SEO, social media, email, PPC, and content marketing to reach the right audience effectively.",
    },
    {
      question: "Which industries benefit from digital marketing?",
      answer:
        "We serve clients across ecommerce, healthcare, finance, education, travel, restaurants, fitness, SaaS startups, real estate, and legal sectors, tailoring strategies for each.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Results depend on the strategy and channels. Paid campaigns can show quick results, while SEO and content marketing typically deliver growth over a few months.",
    },
    {
      question: "What tools does your team use?",
      answer:
        "Our team uses industry-leading tools like Google Analytics, SEMrush, Ahrefs, HubSpot, Mailchimp, Canva, and social media management platforms to ensure measurable success.",
    },
    {
      question: "How do you measure campaign success?",
      answer:
        "We track traffic, leads, conversions, engagement, and ROI. Regular reports and insights from our team help optimize campaigns for maximum impact.",
    },
  ],
  },
  },
   
  
};


export default servicesData;
