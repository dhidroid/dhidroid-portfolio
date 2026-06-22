import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/motion";

import { D3MeshBackground } from "./D3MeshBackground";

interface ProjectHeroProps {
  title: string;
  client?: string;
  year?: string;
  role?: string;
  image?: string;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ 
    title, 
    client, 
    year = "2024", 
    role, 
    image 
}) => {
  return (
    <section className="pt-32 md:pt-48 pb-12 px-6 relative overflow-hidden bg-background border-b border-border">
      <D3MeshBackground />
      <div className="max-w-[1800px] mx-auto relative z-10">
        <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-12"
        >
          {/* Title */}
          <div className="overflow-hidden">
             <motion.h1 
                variants={fadeInUp}
                className="text-[10vw] md:text-[8rem] font-bold font-display uppercase leading-[0.85] tracking-tighter text-foreground"
             >
                {title}
             </motion.h1>
          </div>

          {/* Meta Row */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-6 md:gap-12 border-t border-border pt-6 text-sm md:text-base font-mono uppercase tracking-wide text-slate-500 dark:text-zinc-400"
          >
             {client && (
               <div>
                  <span className="text-slate-400 dark:text-zinc-500 mr-2">Client</span>
                  <span className="text-foreground font-semibold">{client}</span>
               </div>
             )}
             <div>
                  <span className="text-slate-400 dark:text-zinc-500 mr-2">Year</span>
                  <span className="text-foreground font-semibold">{year}</span>
             </div>
             {role && (
               <div>
                  <span className="text-slate-400 dark:text-zinc-500 mr-2">Role</span>
                  <span className="text-foreground font-semibold">{role}</span>
               </div>
             )}
          </motion.div>

          {/* Hero Image */}
          {image && (
             <motion.div 
               variants={fadeInUp}
               className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden bg-slate-100/50 dark:bg-zinc-950/40 border border-border mt-8 rounded-sm"
             >
               <img 
                 src={image} 
                 alt={title} 
                 className="absolute inset-0 w-full h-full object-cover"
               />
             </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
