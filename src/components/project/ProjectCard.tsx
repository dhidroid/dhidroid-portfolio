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
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
           {/* Image */}
           <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
           />
           
           {/* Dark Overlay on Hover */}
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

           {/* Hover Content: View Button */}
           <div className="absolute top-8 right-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 ease-out-expo">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black">
                  <ArrowUpRight className="w-6 h-6" />
              </div>
           </div>
        </div>

        {/* Text Meta */}
        <div className="mt-6 flex items-start justify-between border-t border-gray-200 pt-4 group-hover:border-black/20 transition-colors">
           <div>
               <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-foreground">{title}</h3>
               {category && (
                   <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1 block">{category}</span>
               )}
           </div>
           
           {year && (
               <span className="font-mono text-sm text-gray-400">{year}</span>
           )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
