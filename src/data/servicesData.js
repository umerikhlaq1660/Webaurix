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
    bannerTitle: "Designing delightful and usable interfaces",
    bannerSubtitle: "We craft user-centered interfaces and experiences that convert - from research to high-fidelity prototypes.",
    seo: {
      title: "UI UX Design Services | User Focused Digital Experiences – Webaurix",
      description:
        "Webaurix provides professional UI UX design services to create intuitive, engaging, and conversion focused digital products for modern businesses."
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
      { title: "Research & Analysis", desc: "Understand user needs, competitors, and business goals to define design strategy." },
      { title: "Planning & Strategy", desc: "Create wireframes, prototypes, and interaction flows before final design." },
      { title: "Design & Prototyping", desc: "Develop UI/UX designs, visual components, and interactive prototypes." },
      { title: "Testing & Feedback", desc: "Conduct usability tests, gather feedback, and refine designs." },
      { title: "Handover & Implementation", desc: "Deliver final design assets and guidelines for development." },
      { title: "Maintenance & Optimization", desc: "Monitor user interaction, update designs, and optimize experience continuously." },
    ],

    offers: [
      {
        icon: TrendingUp,
        title: "User Research & Analysis",
        descback: "We conduct surveys, interviews, and analytics to deeply understand user behavior, preferences, and pain points. Insights guide our design strategy and decision-making.",
      },
      {
        icon: Layers,
        title: "Wireframing & Prototyping",
        descback: "We create interactive wireframes and high-fidelity prototypes to visualize user flows, test concepts, and ensure seamless navigation before final development.",

      },
      {
        icon: Monitor,
        title: "Visual & Interaction Design",
        descback: "Our team crafts visually appealing interfaces with intuitive interactions, consistent branding, and attention to detail that keeps users engaged..",

      },
      {
        icon: CheckCircle,
        title: "Usability Testing",
        descback: "We perform rigorous usability tests with real users, identify friction points, and refine designs for optimal efficiency and satisfaction.",

      },
      {
        icon: Target,
        title: "UI/UX Strategy & Consulting",
        descback: "We provide expert guidance on product experience, accessibility, and design improvements, aligning UI/UX with business goals for measurable growth.",

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
    bannerTitle: "Fast, secure and maintainable websites",
    bannerSubtitle: "From marketing sites to complex web apps - we build performant, accessible and scalable solutions.",
    seo: {
      title: "Custom Web Development Services | Scalable Websites – Webaurix",
      description:
        "Webaurix offers secure and scalable web development services using modern technologies to build high performance business websites."
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
      { title: "Discovery & Research", desc: "Understanding your goals, audience, and project vision." },
      { title: "Planning & Strategy", desc: "Creating a clear roadmap and choosing the right tech." },
      { title: "UI/UX Design", desc: "Designing intuitive and visually engaging interfaces." },
      { title: "Prototyping", desc: "Building interactive drafts for early feedback." },
      { title: "Development", desc: "Turning designs into functional, high-quality code." },
      { title: "Testing & QA", desc: "Ensuring everything runs smoothly and bug-free." },
      { title: "Deployment", desc: "Launching your product seamlessly to the live environment." },
      { title: "Support", desc: "Providing updates, fixes, and continuous improvements." },
    ],

    offers: [
      {
        icon: LayoutPanelLeft,
        title: "Front-End Development",
        descback: "We develop fast, engaging interfaces using React, Next.js, and modern frameworks ensuring pixel-perfect design and smooth interactivity across all devices.",
        link: "/services/ui-ux#interaction",
      },
      {
        icon: Database,
        title: "Back-End Development",
        descback: "We develop secure, scalable, and efficient server-side systems with powerful APIs and database architectures that ensure stability and top-tier performance.",
        link: "/services/web-development#cms",
      },
      {
        icon: Layers,
        title: "Full-Stack Development",
        descback: "From concept to deployment, we handle both front and back ends delivering complete, integrated, and high-quality digital solutions built for growth.",
        link: "/services/web-development#cms",
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce Development",
        descback: "We build feature-rich online stores with seamless checkout, secure payments, and user-friendly dashboards to enhance conversions and customer satisfaction.",
        link: "/services/web-development#cms",
      },
      {
        icon: Globe,
        title: "Web App Development",
        descback: "We create powerful, scalable, and user-centric web applications designed to streamline workflows, boost engagement, and meet your unique business goals.",
        link: "/services/web-development#cms",
      },
      {
        icon: Plug,
        title: "API Integration & Development",
        descback: "Our experts design and integrate APIs that enable smooth data exchange, system automation, and seamless connectivity between applications.",
        link: "/services/web-development#cms",
      },
      {
        icon: FileStack,
        title: "CMS Development",
        descback: "Empowering you with custom or WordPress-based CMS solutions that make content updates effortless, secure, and scalable for future expansion.",
      },
      {
        icon: TrendingUp,
        title: "SEO Optimization",
        descback: "Enhance your website’s visibility and reach with optimized code, fast performance, and strategic SEO implementation for higher search rankings.",
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
    bannerTitle: "Innovative, Fast, and Maintainable App Experiences",
    bannerSubtitle: "Building high-performance mobile experiences that are fast, reliable, and unforgettable.",
    seo: {
      title: "Mobile App Development Company | iOS & Android Apps – Webaurix",
      description:
        "We build high quality mobile applications for iOS and Android platforms that deliver performance, usability, and business growth."
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
      { title: "Planning", desc: "Define scope, goals, and architecture." },
      { title: "Analysis", desc: "Study the market and user needs in detail." },
      { title: "Design", desc: "Create the app’s UI/UX and overall architecture." },
      { title: "Development", desc: "Write code and implement app features." },
      { title: "Testing", desc: "Identify and fix bugs and issues." },
      { title: "Deployment", desc: "Launch the app on stores or servers." },
      { title: "Maintenance", desc: "Perform updates, bug fixes, and improvements." },
      { title: "Evaluation", desc: "Assess app performance and collect user feedback." },
    ],

    offers: [
      {
        icon: Smartphone,
        title: "Native App Development",
        descback: "Apps built specifically for Android or iOS platforms. Best performance with full access to device features.",
      },
      {
        icon: Blocks,
        title: "Hybrid App Development",
        descback: "Single codebase apps that run on multiple platforms. Faster development while supporting both Android and iOS.",
      },
      {
        icon: Globe,
        title: "Web App Development",
        descback: "We create powerful, scalable, and user-centric web applications designed to streamline workflows, boost engagement, and meet your unique business goals.",
      },
      {
        icon: SquareChartGantt,
        title: "Progressive Web Apps (PWA)",
        descback: "Web apps with app-like features. Can work offline, send notifications, and be installed on devices.",
      },
      {
        icon: FileStack,
        title: "Enterprise App Development",
        descback: "Apps designed for business operations and internal processes. Helps manage HR, inventory, and workflow efficiently.",
      },
      {
        icon: Gamepad2,
        title: "Game App Development",
        descback: "Interactive mobile or desktop games. Built using Unity or Unreal for engaging user experiences.",
      },
      {
        icon: Cross,
        title: "Cross-Platform Development",
        descback: "One codebase for apps across multiple platforms. Reduces development time and cost while maintaining wide reach.",
      },
      {
        icon: RectangleGoggles,
        title: "AR/VR App Development",
        descback: "Augmented or Virtual Reality apps for immersive experiences. Ideal for training, shopping, and entertainment.",
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
    bannerTitle: "Smart Digital Systems That Adapt To Your Needs",
    bannerSubtitle: "Scalable secure software solutions designed to simplify processes boost productivity and grow your business efficiently.",
    seo: {
      title: "Custom Software Development Services – Webaurix",
      description:
        "Webaurix develops tailored software solutions to automate operations, improve efficiency, and support long term business growth."
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
      { title: "Planning", desc: "Define goals, scope, and feasibility." },
      { title: "Requirement Analysis", desc: "Gather and clarify user needs." },
      { title: "System Design", desc: "Plan system architecture and interfaces." },
      { title: "Prototyping", desc: "Create a basic version for feedbackl." },
      { title: "Implementation", desc: "Write and integrate the code" },
      { title: "Testing", desc: "Find and fix defects." },
      { title: "Deployment", desc: "Launch software for users." },
      { title: "Maintenance", desc: "Update and improve post-launch." },
      { title: "Documentation", desc: "Prepare user and technical manuals" },
      { title: "Evaluation", desc: "Review performance and collect feedback." },
    ],

    offers: [
      {
        icon: Smartphone,
        title: "Custom Mobile Applications",
        descback: "We create feature-rich mobile apps with seamless experiences across platforms, engaging users and boosting business.",
      },
      {
        icon: Globe,
        title: "End-to-End Software Development",
        descback: "We manage your project from concept to deployment, delivering efficient, scalable, and tailored software solutions.",
      },
      {
        icon: Settings,
        title: "Enterprise Systems",
        descback: "We build secure, scalable enterprise platforms that streamline workflows, enhance collaboration, and support data-driven decisions.",
      },
      {
        icon:  MonitorCog,
        title: "SaaS Solutions",
        descback: "We develop scalable, cost-effective SaaS solutions with multi-tenancy and advanced user management for high performance.",
      },
      {
        icon: Globe,
        title: "Legacy System Modernization",
        descback: "We modernize legacy systems, boosting performance, reducing technical debt, and adding advanced features with minimal disruption.",
      },
      {
        icon: Webhook ,
        title: "API integration",
        descback: "We deliver secure and efficient third-party API integrations, enhancing functionality and creating a connected digital ecosystem.",
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
    bannerTitle: "Drive Growth with Data-Driven Digital Marketing",
    bannerSubtitle:"We boost brand growth with SEO, social media, PPC, email, and targeted campaigns.",
    seo: {
      title: "Digital Marketing Services | SEO PPC Social Media – Webaurix",
      description:
        "Grow your online presence with Webaurix digital marketing services including SEO, paid ads, and data driven growth strategies."
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
      { title: "Research & Analysis", desc: "Understand target audience, competitors, and market trends to define strategy." },
      { title: "Strategy Planning", desc: "Create campaign plan, select channels (SEO, PPC, social media, email), and set goals." },
      { title: "Content & Creative Development", desc: "Design creatives, write copy, and prepare assets for campaigns." },
      { title: "Campaign Execution", desc: "Launch marketing campaigns across chosen platforms and channels." },
      { title: "Monitoring & Optimization", desc: "Track performance, analyze metrics, and optimize campaigns for better results." },
      { title: "Reporting & Insights", desc: "Provide detailed reports, insights, and recommendations for ongoing growth." },
    ],

    offers: [
      {
        icon: TrendingUp,
        title: "SEO (Search Engine Optimization)",
        descback: "Improve your website’s search engine ranking, drive organic traffic, and attract high-quality visitors. Optimize on-page, off-page, and technical SEO for long-term growth.",
      },
      {
        icon: DollarSign,
        title: "PPC Advertising",
        descback: "Run targeted paid campaigns on Google, social media, and other platforms. Generate leads quickly, control budgets, and maximize ROI with precise audience targeting.",
      },
      {
        icon: Share2,
        title: "Social Media Marketing",
        descback: "Engage your audience across platforms like Facebook, Instagram, and LinkedIn. Build brand awareness, grow followers, and drive meaningful interactions.",
      },
      {
        icon: FileText,
        title: "Content Marketing",
        descback: "Create compelling blogs, articles, videos, and graphics that educate, inform, and engage your audience. Enhance brand authority and support SEO efforts.",
      },
      {
        icon: Mail,
        title: "Email Marketing",
        descback: "Send personalized campaigns to nurture leads and retain customers. Automate workflows, segment audiences, and improve open and click-through rates.",
      },
      {
        icon: Zap,
        title: "Conversion Rate Optimization (CRO)",
        descback: "Optimize websites and landing pages to turn visitors into leads or customers. A/B testing, UX improvements, and analytics-driven tweaks enhance conversions.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Reporting",
        descback: "Track marketing performance, analyze key metrics, and gain actionable insights. Make informed decisions to improve campaigns and measure ROI accurately.",
      },
      {
        icon: Target,
        title: "Brand Strategy & Consulting",
        descback: "Develop strategies for digital presence, positioning, and growth. Align marketing efforts with business goals to strengthen brand identity and reach.",
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
