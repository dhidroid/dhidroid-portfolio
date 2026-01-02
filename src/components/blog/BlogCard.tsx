import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  image?: string;
  date: string;
  readingTime?: number;
  category?: string;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
    title, 
    slug, 
    image, 
    date,
    readingTime,
    category,
    className = "" 
}) => {
  return (
    <Link 
        to={`/blog/${slug}`}
        className={`group block ${className}`}
    >
      <div className="space-y-6">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
           {image ? (
               <img 
                 src={image} 
                 alt={title} 
                 className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
               />
           ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                   <span className="font-mono text-xs uppercase">No Image</span>
               </div>
           )}
           
           {/* Overlay Button */}
           <div className="absolute top-4 right-4 z-10 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                   <ArrowUpRight className="w-5 h-5 text-black" />
               </div>
           </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
           <div className="flex items-center justify-between border-b border-gray-200 pb-3">
               <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                   {category || "Article"}
               </span>
               <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400">
                   <span>{new Date(date).getFullYear()}</span>
                   {readingTime && (
                       <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock size={10} />
                            <span>{readingTime} min</span>
                        </div>
                       </>
                   )}
               </div>
           </div>
           
           <h3 className="text-2xl md:text-3xl font-bold font-display leading-[1.1] text-foreground group-hover:text-primary transition-colors">
               {title}
           </h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
