import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "../../utils/cn";

interface ProjectCardProps {
  id: string;
  title: string;
  category?: string;
  image: string;
  year?: string;
  slug: string;
  className?: string; // For grid spans
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
    title, 
    category, 
    year, 
    image, 
    slug, 
    className 
}) => {
  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className={cn("group relative w-full block cursor-pointer", className)}
    >
      <Link to={`/works/${slug}`} className="block w-full">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-slate-100/50 dark:bg-zinc-950/40 border border-border rounded-sm">
           {/* Image */}
           <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
           />
           
           {/* Dark Overlay on Hover */}
           <div className="absolute inset-0 bg-slate-950/10 dark:bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

           {/* Hover Content: View Button */}
           <div className="absolute top-8 right-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 ease-out-expo">
              <div className="w-14 h-14 rounded-sm bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                  <ArrowUpRight className="w-5 h-5" />
              </div>
           </div>
        </div>

        {/* Text Meta */}
        <div className="mt-6 flex items-start justify-between border-t border-border pt-4 group-hover:border-primary/45 dark:group-hover:border-primary/45 transition-colors duration-500">
           <div>
               <h3 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tighter text-slate-900 dark:text-white">{title}</h3>
               {category && (
                   <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-1 block">{category}</span>
               )}
           </div>
           
           {year && (
               <span className="font-mono text-xs text-slate-500 dark:text-zinc-400 tracking-wider bg-slate-100/80 dark:bg-zinc-800/80 px-2 py-0.5 rounded-sm border border-border">{year}</span>
           )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
