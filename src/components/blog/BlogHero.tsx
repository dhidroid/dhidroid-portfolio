import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/motion";

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
    <section className="pt-28 pb-12 px-6 border-b border-border bg-background">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-12"
        >
          {/* Editorial Grid Divide */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Title Section - Columns 1-8 */}
            <div className="lg:col-span-8 space-y-6">
              <div className="overflow-hidden">
                <motion.h1 
                  variants={fadeInUp}
                  className="text-[8vw] lg:text-[4.8rem] font-extrabold font-display leading-[0.95] tracking-tighter text-foreground uppercase"
                >
                  {title}
                </motion.h1>
              </div>
            </div>

            {/* Monospace Metadata Table - Columns 9-12 */}
            <motion.div 
              variants={fadeInUp} 
              className="lg:col-span-4 border border-border bg-slate-50/50 dark:bg-zinc-900/20 font-mono text-xs text-slate-500 dark:text-zinc-400 divide-y divide-border rounded-sm select-none"
            >
              {category && (
                <div className="flex justify-between p-4">
                  <span className="text-slate-400">CATEGORY:</span>
                  <span className="font-bold text-[#5235F6]">{category.toUpperCase()}</span>
                </div>
              )}
              <div className="flex justify-between p-4">
                <span className="text-slate-400">PUBLISHED:</span>
                <span className="font-bold text-foreground">
                  {new Date(date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                </span>
              </div>
              {author && (
                <div className="flex justify-between p-4">
                  <span className="text-slate-400">WRITER:</span>
                  <span className="font-bold text-foreground">{author.toUpperCase()}</span>
                </div>
              )}
              {readingTime && (
                <div className="flex justify-between p-4">
                  <span className="text-slate-400">READTIME:</span>
                  <span className="font-bold text-foreground">{readingTime} MIN READ</span>
                </div>
              )}
            </motion.div>

          </div>

          {/* Cover Image Block */}
          {image && (
            <motion.div 
              variants={fadeInUp}
              className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden bg-slate-100/50 dark:bg-zinc-950/40 border border-border rounded-sm"
            >
              <img 
                src={image} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
