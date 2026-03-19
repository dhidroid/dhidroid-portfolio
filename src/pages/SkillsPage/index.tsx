import React from "react";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";

import { Container } from "../../components/ui/Container";
import { DynamicIcon } from "../../components/ui/DynamicIcon";
import { LinkPreview } from "../../components/ui/LinkPreview";
import { PERSONAL_INFO } from "../../config/personal";
import { fadeInUp, staggerContainer } from "../../utils/motion";

// Enhanced Data for Dynamic Icons
const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", desc: "UI Library", url: "https://react.dev" },
      { name: "Next.js", desc: "Framework", url: "https://nextjs.org" },
      { name: "TypeScript", desc: "Type Safety", url: "https://www.typescriptlang.org" },
      { name: "Tailwind CSS", desc: "Styling", url: "https://tailwindcss.com" },
      { name: "Framer Motion", desc: "Animation", url: "https://www.framer.com/motion" },
      { name: "Vite", desc: "Build Tool", url: "https://vitejs.dev" },
      { name: "Redux", desc: "State Management", url: "https://redux.js.org" },
      { name: "HTML5", desc: "Markup", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", desc: "Runtime", url: "https://nodejs.org" },
      { name: "Go", desc: "Performance", url: "https://go.dev" },
      { name: "Python", desc: "Scripting/AI", url: "https://www.python.org" },
      { name: "PostgreSQL", desc: "Relational DB", url: "https://www.postgresql.org" },
      { name: "MongoDB", desc: "NoSQL DB", url: "https://www.mongodb.com" },
      { name: "GraphQL", desc: "API Query", url: "https://graphql.org" },
      { name: "Firebase", desc: "BaaS", url: "https://firebase.google.com" },
      { name: "Supabase", desc: "Open Source BaaS", url: "https://supabase.com" },
    ]
  },
  {
    title: "Mobile & Tools",
    skills: [
      { name: "React Native", desc: "Cross Platform", url: "https://reactnative.dev" },
      { name: "Flutter", desc: "Hybrid Apps", url: "https://flutter.dev" },
      { name: "Docker", desc: "Containerization", url: "https://www.docker.com" },
      { name: "Git", desc: "Version Control", url: "https://git-scm.com" },
      { name: "Figma", desc: "UI Design", url: "https://figma.com" },
      { name: "AWS", desc: "Cloud Services", url: "https://aws.amazon.com" },
      { name: "Vercel", desc: "Deployment", url: "https://vercel.com" },
      { name: "Netlify", desc: "Hosting", url: "https://netlify.com" },
      { name: "Jest", desc: "Testing", url: "https://jestjs.io" },
    ]
  }
];

const SkillCard: React.FC<{ skill: { name: string; desc: string; url: string } }> = ({ skill }) => {
  return (
    <LinkPreview href={skill.url} showPreview={false}>
      <div className="group relative flex flex-col items-start gap-4 cursor-pointer">
        {/* Icon Container */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500 relative z-10">
          <DynamicIcon name={skill.name} className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110" />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mt-1">
            {skill.desc}
          </p>
        </div>

        {/* Enhanced Hover Card */}
        <div className="absolute left-0 bottom-full mb-4 w-[300px] p-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-xl">
            {/* Gradient Header */}
            <div className="h-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-gray-100 flex items-center justify-center relative">
              <div className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -mt-8 border border-gray-100">
                <DynamicIcon name={skill.name} className="w-7 h-7 text-primary" />
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-bold font-display text-lg text-gray-900">{skill.name}</h4>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">
                  {skill.desc}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Official documentation and resources for {skill.name}.
              </p>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-xs text-gray-400">Opens in new tab</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute left-8 -bottom-2 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
        </div>
      </div>
    </LinkPreview>
  );
};

const SkillsPage = () => {
  return (
      <React.Fragment>
        <SEO
        title={`Skills & Stack | ${PERSONAL_INFO.name}`}
        description="My technical toolkit: React, Node.js, Cloud Architecture, and Design Systems."
        keywords={["Skills", "Tech Stack", "React", "Node.js"]}
        url="/skills"
        />

      <main className="bg-white min-h-screen pt-32 md:pt-48 pb-24">
        <Container className="max-w-[1800px] px-6">

          {/* Header Section - Massive Typography */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mb-24 md:mb-40"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-[12vw] md:text-[8rem] font-bold font-display uppercase leading-[0.85] tracking-tighter text-foreground mb-12"
            >
              Skills &<br />
              <span className="text-gray-300">Expertise</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 md:items-start border-t border-gray-200 pt-8">
              <span className="font-mono text-sm uppercase tracking-widest text-gray-500 md:w-48">The Toolkit</span>
              <p className="max-w-xl text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                I leverage a modern, performance-driven stack to build digital products that scale. My expertise spans the entire development lifecycle, from pixel-perfect frontend interfaces to robust backend architectures.
              </p>
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <div className="flex flex-col gap-24 md:gap-40">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/10 pt-12"
              >
                {/* Category Title */}
                <div className="md:col-span-3">
                  <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-gray-900 sticky top-32">
                    {category.title}
                  </h2>
                </div>

                {/* Skills List */}
                <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {category.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
            </div>

          </Container>
      </main>
      </React.Fragment>
    );
};

export default SkillsPage;
