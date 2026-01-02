import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/motion";

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
    <section className="pt-32 md:pt-48 pb-12 px-6">
      <div className="max-w-[1800px] mx-auto">
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
            className="flex flex-wrap items-center gap-6 md:gap-12 border-t border-gray-200 pt-6 text-sm md:text-base font-mono uppercase tracking-wide text-gray-500"
          >
             {client && (
               <div>
                  <span className="text-gray-400 mr-2">Client</span>
                  <span className="text-black font-semibold">{client}</span>
               </div>
             )}
             <div>
                  <span className="text-gray-400 mr-2">Year</span>
                  <span className="text-black font-semibold">{year}</span>
             </div>
             {role && (
               <div>
                  <span className="text-gray-400 mr-2">Role</span>
                  <span className="text-black font-semibold">{role}</span>
               </div>
             )}
          </motion.div>

          {/* Hero Image */}
          {image && (
             <motion.div 
               variants={fadeInUp}
               className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden bg-gray-100 mt-8"
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
