import { Globe, Server, Database, Layout, Smartphone, Cloud } from "lucide-react";

export const PortfolioContent = {
  hero: {
    badge: "Available for new projects",
    title: {
      line1: "Building high-performance",
      line2: "digital experiences",
      highlight: "digital experiences" // used for coloring
    },
    subheadline: "I bridge the gap between complex backend logic and pixel-perfect frontend experiences. Focused on scalability, accessibility, and modern tooling.",
    cta: {
      primary: "View Projects",
      secondary: "Read Blog"
    },
    socialProof: "Trusted by startups and enterprises to ship production-ready code."
  },
  
  about: {
    title: "Beyond the Code",
    story: [
      "I’ve spent the last 5+ years dissecting complex problems and reassembling them into elegant software solutions. My journey started with simple scripts and evolved into architecting full-scale SaaS platforms.",
      "Currently, I act as a Full Stack Engineer, where I don't just write code—I design systems. I believe in 'plumbing before pixel-pushing': ensuring the data flow, state management, and API layers are robust before polishing the UI.",
      "I’m strictly pragmatic about tools. Whether it's Next.js for SSR, Node.js for microservices, or Tailwind for rapid UI development, I choose what delivers the best user experience and maintainability."
    ]
  },

  experience: [
    {
      id: 1,
      role: "Senior Frontend Engineer",
      company: "TechCorp",
      period: "2023 - Present",
      achievements: [
        "Architected a dashboard reducing load times by 40% using React and optimized data fetching.",
        "Led a team of 4 managing a monorepo migration with modern build tools.",
        "Implemented rigorous design system standards using Tailwind CSS."
      ]
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "StartupX",
      period: "2021 - 2023",
      achievements: [
        "Built the MVP payment flow processing $1M+ ARR in transaction volume.",
        "Designed and deployed a real-time notification microservice using Node.js.",
        "Optimized database queries decreasing API latency by 60%."
      ]
    }
  ],

  projects: [
    {
      id: "enterprise-dashboard",
      title: "Enterprise SaaS Analytics",
      description: "A high-performance analytics dashboard handling 10k+ real-time data points.",
      techStack: ["React", "TypeScript", "D3.js", "TanStack Query"],
      features: ["Real-time Data Visualization", "Role-based Access Control", "Exportizable Reports"],
      links: { demo: "#", code: "#" }
    },
    {
      id: "headless-ecommerce",
      title: "Headless E-commerce Starter",
      description: "A production-ready e-commerce template focused on SEO and Core Web Vitals.",
      techStack: ["Next.js", "Sanity CMS", "Shopify API", "Tailwind"],
      features: ["ISR Revalidation", "Omnichannel Inventory", "Stripe Checkout"],
      links: { demo: "#", code: "#" }
    }
  ],

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"],
    backend: ["Node.js", "Express", "PostgreSQL", "Redis", "Supabase"],
    tools: ["Docker", "Git", "GitHub Actions", "AWS (S3, Lambda)", "Vercel"],
    design: ["System Design", "Figma", "Accessibility (WCAG)", "UI/UX Architecture"]
  },

  services: [
    {
      title: "Frontend Architecture",
      description: "Scalable React applications with focus on performance and maintainability.",
      icon: Layout
    },
    {
      title: "Backend Systems",
      description: "Robust APIs and microservices designed for high availability.",
      icon: Server
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile apps using React Native and Expo.",
      icon: Smartphone
    },
    {
      title: "Cloud & DevOps",
      description: "Automated CI/CD pipelines and secure cloud infrastructure.",
      icon: Cloud
    }
  ],
  
  clients: [
    { name: "TechCorp", logo: "TC" },
    { name: "StartupX", logo: "SX" },
    { name: "InnovateInc", logo: "II" },
    { name: "FutureSystems", logo: "FS" },
    { name: "CloudScale", logo: "CS" },
    { name: "DataFlow", logo: "DF" }
  ],

  contact: {
    headline: "Ready to build something scalable?",
    subtext: "I'm currently open to consulting and senior engineer roles. Let's discuss your technical challenges.",
    cta: "Schedule a 15-min Sync"
  }
};
