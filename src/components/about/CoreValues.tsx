import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";

const values = [
  {
    id: "mobile",
    label: "Mobile Excellence",
    title: "Crafting High-Performance Apps.",
    description: "Crafting high-performance Android and iOS apps using React Native, Jetpack Compose, and Swift. I focus on fluid animations, native modules, and optimized render cycles.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874&auto=format&fit=crop"
  },
  {
    id: "backend",
    label: "Backend & Systems",
    title: "Scalable Architectures.",
    description: "Designing scalable architectures using Node.js, Go, PostgreSQL, and Prisma. Building robust APIs and microservices that can handle high concurrency and complex data relationships.",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop"
  },
  {
    id: "devops",
    label: "DevOps & Tooling",
    title: "Streamlined Workflows.",
    description: "Streamlining workflows with Docker, GitHub Actions, and CI/CD pipelines. Automating deployment processes to ensure reliability and faster time-to-market.",
    image: "https://images.unsplash.com/photo-1667372393119-c8c2a3867623?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "open",
    label: "Open Knowledge",
    title: "Community & Contribution.",
    description: "I am an active contributor to the FOSS community and a technical writer on Medium, sharing insights on ESLint, SQLite, and the latest ECMAScript standards.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop"
  }
];

const CoreValues = () => {
  const [activeTab, setActiveTab] = useState(values[0].id);

  return (
    <section className="py-24 md:py-32 bg-background border-t border-slate-200 dark:border-zinc-800">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Tabs & Content */}
          <div className="lg:w-1/2 flex flex-col gap-12">
            <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4 select-none">
              {values.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`text-xs font-mono uppercase tracking-wider px-4 py-2 border transition-all duration-300 cursor-pointer ${
                      activeTab === item.id 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white' 
                      : 'text-slate-500 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:text-slate-900 dark:hover:text-white'
                   }`}
                 >
                   {item.label}
                 </button>
              ))}
            </div>

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                 {values.map((item) => item.id === activeTab && (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-6"
                    >
                       <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1]">
                          {item.title}
                       </h2>
                       <p className="text-xl text-gray-600 leading-relaxed font-body">
                          {item.description}
                       </p>
                    </motion.div>
                 ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2">
             <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                   {values.map((item) => item.id === activeTab && (
                      <motion.img
                        key={item.id + "-img"}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                   ))}
                </AnimatePresence>
                
                {/* Overlay Texture/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CoreValues;
