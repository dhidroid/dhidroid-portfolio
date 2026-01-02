import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import { Clock, Calendar } from "lucide-react";

interface BlogHeroProps {
  title: string;
  date: string;
  readingTime?: number;
  author?: string;
  category?: string;
  image?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ 
    title, 
    date, 
    readingTime, 
    author, 
    category,
    image 
}) => {
  return (
    <section className="pt-32 md:pt-48 pb-12 px-6">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-8 md:gap-12"
        >
          {/* Top Meta */}
           <motion.div 
             variants={fadeInUp}
             className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-gray-500"
           >
              {category && (
                  <span className="text-primary font-bold">{category}</span>
              )}
              <span className="w-12 h-px bg-gray-200" />
              <span>{new Date(date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
           </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
             <motion.h1 
                variants={fadeInUp}
                className="text-[10vw] md:text-[7rem] font-bold font-display leading-[0.9] tracking-tighter text-foreground max-w-5xl"
             >
                {title}
             </motion.h1>
          </div>

          {/* Bottom Meta & Image */}
          <motion.div variants={fadeInUp} className="space-y-12">
              <div className="flex flex-wrap items-center gap-8 md:gap-12 border-t border-gray-200 pt-6 text-sm md:text-base font-mono uppercase tracking-wide text-gray-500">
                  {author && (
                    <div>
                        <span className="text-gray-400 mr-2">Written by</span>
                        <span className="text-black font-semibold">{author}</span>
                    </div>
                  )}
                  {readingTime && (
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span className="text-black font-semibold">{readingTime} min read</span>
                    </div>
                  )}
              </div>

              {image && (
                 <div className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden bg-gray-100">
                   <img 
                     src={image} 
                     alt={title} 
                     className="absolute inset-0 w-full h-full object-cover"
                   />
                 </div>
              )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
