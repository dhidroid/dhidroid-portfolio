import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { D3MapVoronoiStippling } from "./D3MapVoronoiStippling";
import WorkExperience from "../home/WorkExperience";
import { DynamicIcon } from "../ui/DynamicIcon";
import { 
  Newspaper, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Award, 
  Terminal, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Check,
  Zap,
  Briefcase,
  DollarSign
} from "lucide-react";
import { Link } from "react-router";

interface NewspaperAboutLayoutProps {
  workExpData: any[];
}

const SKILL_CATEGORIES = [
  {
    title: "MOBILE & ARCHITECTURE",
    skills: [
      { name: "React Native", desc: "Cross-Platform Mobile Apps", level: "99%", url: "https://reactnative.dev" },
      { name: "TypeScript", desc: "Strict Type Safety", level: "95%", url: "https://www.typescriptlang.org" },
      { name: "Android", desc: "Native Jetpack Compose", level: "90%", url: "https://developer.android.com" },
      { name: "iOS", desc: "Swift & Objective-C Modules", level: "88%", url: "https://developer.apple.com" },
      { name: "Flutter", desc: "Hybrid UI Framework", level: "85%", url: "https://flutter.dev" },
    ]
  },
  {
    title: "BACKEND & SYSTEMS",
    skills: [
      { name: "Go", desc: "High-Performance RPC & REST", level: "92%", url: "https://go.dev" },
      { name: "Node.js", desc: "Async Express APIs", level: "96%", url: "https://nodejs.org" },
      { name: "PostgreSQL", desc: "Relational DB & Indexing", level: "90%", url: "https://www.postgresql.org" },
      { name: "MongoDB", desc: "Document Datastore", level: "88%", url: "https://www.mongodb.com" },
      { name: "GraphQL", desc: "Typed API Query Layer", level: "86%", url: "https://graphql.org" },
    ]
  },
  {
    title: "DEVOPS, CLOUD & CMS",
    skills: [
      { name: "Docker", desc: "Containerization & CI/CD", level: "90%", url: "https://www.docker.com" },
      { name: "AWS", desc: "EC2, S3, CloudFront & Lambda", level: "88%", url: "https://aws.amazon.com" },
      { name: "Sanity", desc: "Headless Studio CMS", level: "95%", url: "https://sanity.io" },
      { name: "Vercel", desc: "Edge Deployment & CDN", level: "98%", url: "https://vercel.com" },
      { name: "Git", desc: "Version Control & Actions", level: "98%", url: "https://git-scm.com" },
    ]
  }
];

const PRICING_PACKAGES = [
  {
    name: "STARTER MOBILE & WEB",
    price: "999",
    tagline: "Ideal for Landing Pages, Mobile MVPs & Single-Page Apps.",
    popular: false,
    badge: "TIER 01",
    features: [
      "Responsive React / Mobile MVP",
      "Swiss Editorial Typography Design",
      "Basic Technical & Image SEO",
      "Sanity Studio CMS Setup",
      "1 Week Deployment Support"
    ]
  },
  {
    name: "PROFESSIONAL FULL-STACK",
    price: "2,499",
    tagline: "Complete Mobile & Web Solution for Startups & Scaleups.",
    popular: true,
    badge: "MOST POPULAR",
    features: [
      "Cross-Platform Mobile App (iOS & Android)",
      "Full-Stack Node/Go Backend & Database",
      "Sanity Headless CMS Integration",
      "Advanced SEO & Analytics Telemetry",
      "Sub-100ms Performance Optimization",
      "1 Month Dedicated Support & Maintenance"
    ]
  },
  {
    name: "ENTERPRISE ARCHITECTURE",
    price: "Custom",
    tagline: "High-Concurrency Systems, Custom Microservices & SLA Support.",
    popular: false,
    badge: "ENTERPRISE",
    features: [
      "Distributed Microservices Architecture (Go / Node)",
      "High-Concurrency PostgreSQL / Mongo Cluster",
      "OAuth2 / JWT / RBAC Authentication",
      "CI/CD Pipeline Automation & Docker",
      "Priority SLA Support & Code Audit"
    ]
  }
];

const DELIVERED_WORKS = [
  {
    title: "Scalable React Native E-Commerce Platform",
    category: "MOBILE APP",
    client: "Natobotics Technology",
    impact: "50K+ Monthly Active Users",
    stack: ["React Native", "TypeScript", "Node.js", "Redux"]
  },
  {
    title: "High-Throughput Microservice API Gateway",
    category: "SYSTEMS",
    client: "Algojaxon Soft",
    impact: "Sub-50ms Response Latency",
    stack: ["Go (Golang)", "PostgreSQL", "Docker", "AWS"]
  },
  {
    title: "Headless Sanity Studio CMS & Portfolio Engine",
    category: "FULL STACK",
    client: "Dhidroid Studio",
    impact: "100% Google Lighthouse Score",
    stack: ["React", "Sanity Studio", "Tailwind CSS", "Vercel"]
  }
];

export const NewspaperAboutLayout: React.FC<NewspaperAboutLayoutProps> = ({ workExpData }) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState(SKILL_CATEGORIES[0].title);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#0C0C0E] text-slate-900 dark:text-zinc-100 min-h-screen font-serif transition-colors duration-300">
      
      {/* 1. TOP GAZETTE MASTHEAD */}
      <header className="pt-24 md:pt-32 pb-6 border-b-2 border-slate-900 dark:border-zinc-200">
        <Container className="max-w-[1800px] px-6">
          
          {/* Top Issue Dateline Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 border-b border-t border-slate-900/30 dark:border-zinc-800 text-[11px] font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase gap-2 select-none">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#5235F6]">VOL. IV NO. 248</span>
              <span>•</span>
              <span>{currentDate}</span>
              <span>•</span>
              <span className="hidden md:inline">10+ YEARS EXPERIENCE EDITION</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: AVAILABLE FOR CONSULTING & FREELANCE</span>
              <span>•</span>
              <span>PRICE TARIFF INCLUDED</span>
            </div>
          </div>

          {/* Broadsheet Main Masthead Title */}
          <div className="py-8 md:py-12 text-center border-b-4 border-slate-900 dark:border-zinc-200 select-none">
            <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-slate-500 dark:text-zinc-400 mb-3">
              <Newspaper className="w-4 h-4 text-[#5235F6]" />
              <span>THE OFFICIAL ENGINEERING GAZETTE // BIOGRAPHY, SKILLS & PRICING</span>
              <Newspaper className="w-4 h-4 text-[#5235F6]" />
            </div>

            <h1 className="text-[12vw] lg:text-[7.5rem] font-black font-serif tracking-tight leading-[0.85] text-slate-900 dark:text-white uppercase">
              THE ABOUT GAZETTE
            </h1>

            <p className="mt-4 text-xs md:text-sm font-mono tracking-widest uppercase text-slate-600 dark:text-zinc-400">
              "ALL THE CODE, SKILLS, WORKERS & TRANSPARENT PRICING FIT TO PRINT" • ESTABLISHED 2024
            </p>
          </div>

          {/* Headlines Ticker Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-3 border-b-2 border-slate-900 dark:border-zinc-800 font-mono text-xs text-slate-700 dark:text-zinc-300">
            <div className="md:col-span-4 font-bold text-[#5235F6] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LEAD REPORT:</span>
              <span className="text-slate-900 dark:text-white font-normal truncate">DHINESH KUMAR (10+ YRS EXP)</span>
            </div>
            <div className="md:col-span-5 truncate text-slate-600 dark:text-zinc-400">
              SECTION A: BIOGRAPHY • SECTION B: SKILLS MATRIX • SECTION C: CAREER WORKERS • SECTION D: PRICING
            </div>
            <div className="md:col-span-3 text-right font-bold text-slate-500">
              GAZETTE ISSUE #2026
            </div>
          </div>

        </Container>
      </header>


      {/* 2. SECTION A: FRONT PAGE LEAD STORY & D3 WIREPHOTO */}
      <section className="py-12 border-b border-slate-300 dark:border-zinc-800">
        <Container className="max-w-[1800px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT 8 COLUMNS: MAIN FEATURE STORY */}
            <div className="lg:col-span-8 space-y-8 pr-0 lg:pr-6 lg:border-r border-slate-300 dark:border-zinc-800">
              
              <div className="space-y-4">
                <div className="inline-block px-2 py-0.5 bg-[#5235F6] text-white font-mono text-[10px] uppercase tracking-widest">
                  SPECIAL FRONT PAGE BIOGRAPHY
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.05] tracking-tight text-slate-900 dark:text-white">
                  SENIOR SOFTWARE ENGINEER CRAFTS HIGH-PERFORMANCE MOBILE & CLOUD ECOSYSTEMS
                </h2>

                <h3 className="text-lg md:text-xl font-serif italic text-slate-600 dark:text-zinc-400 border-l-2 border-[#5235F6] pl-4">
                  Dhinesh Kumar brings over 10+ years of software engineering expertise, bridging native mobile applications with scalable Go backend microservices from Chennai, India.
                </h3>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-slate-500 border-b border-slate-200 dark:border-zinc-800 pb-3">
                  <span>BY EDITORIAL BOARD</span>
                  <span>•</span>
                  <span>LOCATION: CHENNAI, INDIA</span>
                  <span>•</span>
                  <span>10+ YEARS EXPERIENCE</span>
                </div>
              </div>

              {/* Lead Article Body Text with Drop Cap */}
              <div className="space-y-6 text-slate-800 dark:text-zinc-200 text-base md:text-lg leading-relaxed font-serif">
                <p className="first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:font-serif first-letter:pr-3 first-letter:leading-none first-letter:text-[#5235F6]">
                  With over a decade of hands-on software engineering experience, I am a passionate Senior Software Engineer and Mobile Specialist based in Chennai, India. My core domain lies in building cross-platform mobile apps with React Native, high-throughput microservices in Go (Golang), and Headless CMS integrations powered by Sanity Studio.
                </p>

                <p>
                  Throughout my career, I have engineered client solutions across healthcare, e-commerce, and enterprise automation. My technical philosophy centers on clean architecture, zero-jank 60fps mobile interfaces, strict TypeScript typing, and automated CI/CD deployments.
                </p>
              </div>

              {/* Wirephoto Box: D3 Stippling Map Visual */}
              <div className="border border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-3">
                <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#5235F6]" />
                    <span className="font-bold text-slate-900 dark:text-white">WIREPHOTO FIG. 1.1 — GLOBAL GEOGRAPHIC NODE NETWORK</span>
                  </div>
                  <span>SALEM // CHENNAI</span>
                </div>

                <D3MapVoronoiStippling />

                <figcaption className="text-xs font-mono text-slate-500 dark:text-zinc-400 italic">
                  Caption: D3 Voronoi stippling telemetry map plotting active development hubs in Chennai and Salem, India.
                </figcaption>
              </div>

            </div>


            {/* RIGHT 4 COLUMNS: AUDIT SUMMARY & IMPACT METRICS */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* CAREER AUDIT METRICS BOX */}
              <div className="border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-6">
                <div className="border-b-2 border-slate-900 dark:border-zinc-700 pb-3">
                  <span className="font-mono text-[10px] text-[#5235F6] uppercase tracking-widest block font-bold">
                    VERIFIED CAREER AUDIT
                  </span>
                  <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-slate-900 dark:text-white">
                    KEY AUDIT STATS
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center font-mono">
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800">
                    <span className="text-2xl md:text-3xl font-extrabold text-[#5235F6] block">10+</span>
                    <span className="text-[10px] text-slate-500 uppercase block">YEARS EXP</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800">
                    <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white block">50+</span>
                    <span className="text-[10px] text-slate-500 uppercase block">PROJECTS</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800">
                    <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white block">2.4K</span>
                    <span className="text-[10px] text-slate-500 uppercase block">COMMITS</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800">
                    <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 block">100%</span>
                    <span className="text-[10px] text-slate-500 uppercase block">SATISFACTION</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 dark:bg-zinc-800/60 font-mono text-[11px] text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">EXPERT DOMAINS:</span>
                  <p>React Native Mobile Architecture, Go Microservices, Full Stack Systems & Sanity CMS.</p>
                </div>
              </div>

              {/* QUICK CALL TO ACTION BOX */}
              <div className="border border-dashed border-slate-400 dark:border-zinc-700 p-6 space-y-4 bg-amber-50/30 dark:bg-zinc-900/30">
                <div className="flex items-center gap-2 font-mono text-xs text-[#5235F6] font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>DIRECT INQUIRY</span>
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Ready to Start Your Project?
                </h4>
                <p className="text-xs font-serif text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Review our transparent service pricing tiers below or schedule a direct consultation.
                </p>
                <Link
                  to="/schedule"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#5235F6] dark:hover:bg-[#5235F6] dark:hover:text-white transition-colors"
                >
                  <span>BOOK A CALL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </Container>
      </section>


      {/* 3. SECTION B: TECHNICAL SKILLS & STACK MATRIX (SKILLS PAGE BASED) */}
      <section className="py-16 border-b-2 border-slate-900 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-900/30">
        <Container className="max-w-[1800px] px-6 space-y-12">
          
          <div className="border-t-4 border-b-2 border-slate-900 dark:border-zinc-200 py-3 flex flex-col md:flex-row justify-between items-center font-mono text-xs tracking-widest uppercase">
            <span className="font-bold text-[#5235F6]">SECTION B // TECHNICAL SKILLS & STACK MATRIX</span>
            <span className="text-slate-500 font-normal">PAGE 02 • SYSTEM ENGINE TOOLKIT</span>
          </div>

          {/* Skill Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveSkillCategory(cat.title)}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  activeSkillCategory === cat.title
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white font-bold shadow-md'
                    : 'bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-900'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Skills Grid */}
          <div className="max-w-6xl mx-auto border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl">
            <AnimatePresence mode="wait">
              {SKILL_CATEGORIES.map((cat) => cat.title === activeSkillCategory && (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-slate-200 dark:border-zinc-800 pb-4 flex justify-between items-center">
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white uppercase tracking-wide">
                      {cat.title} TOOLKIT
                    </h3>
                    <span className="font-mono text-xs text-slate-400">10+ YEARS HANDS-ON EXPERIENCE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.skills.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 border border-slate-300 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 hover:border-[#5235F6] transition-all duration-300 rounded-sm group"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-sm bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 flex items-center justify-center text-[#5235F6] group-hover:scale-110 transition-transform">
                            <DynamicIcon name={skill.name} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold font-serif text-lg text-slate-900 dark:text-white group-hover:text-[#5235F6] transition-colors">
                              {skill.name}
                            </h4>
                            <span className="font-mono text-[10px] text-slate-500 uppercase">{skill.desc}</span>
                          </div>
                        </div>

                        {/* Skill Level Progress Bar */}
                        <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-zinc-800 font-mono text-[10px]">
                          <div className="flex justify-between text-slate-500">
                            <span>MASTERY</span>
                            <span className="font-bold text-[#5235F6]">{skill.level}</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[#5235F6]" style={{ width: skill.level }} />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </Container>
      </section>


      {/* 4. SECTION C: CAREER WORKERS & DELIVERED PROJECTS (WORKS BASED) */}
      <section className="py-16 border-b border-slate-300 dark:border-zinc-800">
        <Container className="max-w-[1800px] px-6 space-y-12">
          
          <div className="border-t-4 border-b-2 border-slate-900 dark:border-zinc-200 py-3 flex flex-col md:flex-row justify-between items-center font-mono text-xs tracking-widest uppercase">
            <span className="font-bold text-[#5235F6]">SECTION C // CAREER WORKERS & DELIVERED CASE STUDIES</span>
            <span className="text-slate-500 font-normal">PAGE 03 • WORK EXPERIENCE & PROJECTS</span>
          </div>

          {/* Delivered Projects Cards */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-3xl font-bold font-serif uppercase tracking-tight text-slate-900 dark:text-white">
                FEATURED CLIENT DELIVERIES
              </h3>
              <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                REPRESENTATIVE WORKERS & CASE STUDIES
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {DELIVERED_WORKS.map((work) => (
                <div
                  key={work.title}
                  className="border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4 hover:border-[#5235F6] transition-colors"
                >
                  <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 border-b border-slate-200 dark:border-zinc-800 pb-3">
                    <span className="font-bold text-[#5235F6]">{work.category}</span>
                    <span>{work.client}</span>
                  </div>

                  <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white leading-snug">
                    {work.title}
                  </h4>

                  <div className="p-2.5 bg-slate-100 dark:bg-zinc-800/50 font-mono text-xs text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                    <span className="text-slate-400 block text-[10px]">IMPACT METRIC:</span>
                    <span className="font-bold text-[#5235F6]">{work.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {work.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 font-mono text-[10px] uppercase text-slate-600 dark:text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Full Career Work Experience */}
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-slate-900 dark:border-zinc-700 p-6 md:p-10">
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-4 mb-6">
              <span className="font-mono text-xs text-[#5235F6] font-bold uppercase tracking-widest block">
                CAREER HISTORY LOGS
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white uppercase">
                PROFESSIONAL APPOINTMENTS & ROLES
              </h3>
            </div>
            <WorkExperience experiences={workExpData} />
          </div>

        </Container>
      </section>


      {/* 5. SECTION D: SERVICE PACKAGES & TRANSPARENT PRICING (PRICING PAGE BASED) */}
      <section className="py-16 border-b-2 border-slate-900 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-900/30">
        <Container className="max-w-[1800px] px-6 space-y-12">
          
          <div className="border-t-4 border-b-2 border-slate-900 dark:border-zinc-200 py-3 flex flex-col md:flex-row justify-between items-center font-mono text-xs tracking-widest uppercase">
            <span className="font-bold text-[#5235F6]">SECTION D // COMMERCIAL SERVICE PACKAGES & TRANSPARENT PRICING</span>
            <span className="text-slate-500 font-normal">PAGE 04 • SERVICE TARIFF</span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs text-[#5235F6] font-bold uppercase tracking-widest">
              TRANSPARENT PRICING TARIFF
            </span>
            <h3 className="text-3xl md:text-5xl font-bold font-serif uppercase tracking-tight text-slate-900 dark:text-white">
              SERVICE PACKAGES & RATES
            </h3>
            <p className="text-sm md:text-base font-serif text-slate-600 dark:text-zinc-400">
              Clear, transparent pricing tiers for software engineering, mobile development, and architecture. Backed by 10+ years experience with no hidden fees.
            </p>
          </div>

          {/* 3-Column Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`border-2 p-8 flex flex-col justify-between transition-all duration-300 relative bg-white dark:bg-zinc-900 ${
                  pkg.popular
                    ? 'border-[#5235F6] shadow-2xl ring-2 ring-[#5235F6]/20'
                    : 'border-slate-900 dark:border-zinc-700'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-4 mb-6 font-mono text-xs">
                  <span className={`px-2.5 py-1 font-bold uppercase tracking-widest ${
                    pkg.popular ? 'bg-[#5235F6] text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}>
                    {pkg.badge}
                  </span>
                  <span className="text-slate-400">FIXED SCOPE</span>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                    {pkg.name}
                  </h4>
                  
                  <div className="font-serif">
                    <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                      {pkg.price !== "Custom" ? `$${pkg.price}` : pkg.price}
                    </span>
                    {pkg.price !== "Custom" && <span className="text-xs font-mono text-slate-500 ml-1">/PROJECT</span>}
                  </div>

                  <p className="text-xs font-serif text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-200 dark:border-zinc-800 pt-3">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 font-serif text-xs md:text-sm text-slate-700 dark:text-zinc-300 mb-8 border-t border-slate-200 dark:border-zinc-800 pt-6 flex-grow">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#5235F6] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <Link
                  to="/schedule"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                    pkg.popular
                      ? 'bg-[#5235F6] text-white hover:bg-slate-900'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-[#5235F6] dark:hover:bg-[#5235F6] dark:hover:text-white'
                  }`}
                >
                  <span>CHOOSE {pkg.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

        </Container>
      </section>

    </div>
  );
};

export default NewspaperAboutLayout;
