import React from "react";
import { ExperienceItem } from "../home/WorkExperience";
import { DynamicIcon } from "../ui/DynamicIcon";
import { cn } from "../../utils/cn";

interface ExperienceCardProps {
    item: ExperienceItem;
    className?: string;
    index?: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, className, index = 0 }) => {
    // Determine the icon based on the first tag or a fallback
    const mainTech = item.tags && item.tags.length > 0 ? item.tags[0] : "development";
    
    // Abstract pattern colors/styles based on index or content to vary the cards
    // Reference image has different colored gradients/shapes.
    const gradients = [
        "from-purple-500/20 to-blue-500/20",
        "from-cyan-500/20 to-teal-500/20", 
        "from-yellow-500/20 to-orange-500/20",
        "from-pink-500/20 to-red-500/20",
        "from-emerald-500/20 to-green-500/20"
    ];

    const iconColors = [
        "bg-purple-500",
        "bg-cyan-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-emerald-500"
    ];
    
    const themeIndex = index % gradients.length;
    
    return (
        <div className={cn(
            "group relative bg-white/40 dark:bg-zinc-950/20 border border-slate-200 dark:border-zinc-800 p-8 flex flex-col justify-between aspect-[4/4] transition-all duration-500 hover:border-primary/40 dark:hover:border-primary/40 overflow-hidden",
            className
        )}>
           
            {/* Spotlight Gradient */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_50%_120%,rgba(82,53,246,0.06),transparent_80%)]" />

            {/* Pattern Overlay - Simple Swiss Grid lines */}
            <div className="absolute right-0 bottom-0 opacity-[0.05] dark:opacity-[0.03] text-slate-900 dark:text-white group-hover:scale-105 transition-transform duration-700">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 L100 0 M20 100 L100 20 M40 100 L100 40" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* Header: Icon + Date */}
            <div className="relative z-10 flex items-start justify-between mb-8 select-none">
                {/* Tech Icon Square - Sleek & Neutral */}
                <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200">
                    <DynamicIcon name={mainTech} className="w-5 h-5 text-primary" />
                </div>
                
                {/* Date / Period */}
                <span className="font-mono text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest bg-slate-100/80 dark:bg-zinc-800/80 px-2 py-0.5 rounded-sm border border-slate-200/50 dark:border-zinc-700/50">
                    {item.period.split('-')[0].trim()}
                </span>
            </div>

            {/* Content: Title & Company */}
            <div className="relative z-10 mt-auto select-none">
                <span className="block text-[10px] font-mono text-slate-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                    {item.location || "Remote"}
                </span>
                
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug font-display uppercase tracking-tight group-hover:text-primary transition-colors duration-300">
                    {item.role}
                </h3>
                
                <div className="text-slate-600 dark:text-zinc-400 font-medium text-sm">
                    {item.company}
                </div>
            </div>

            {/* Bottom: Date Range Full */}
             <div className="relative z-10 mt-6 pt-6 border-t border-slate-200 dark:border-zinc-800/50 flex justify-between items-center select-none">
                 <span className="text-slate-400 dark:text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
                    [ RECORD ]
                 </span>
                 <span className="text-slate-500 dark:text-zinc-400 text-xs font-mono font-bold">
                    {item.period}
                 </span>
             </div>
        </div>
    );
};

export default ExperienceCard;
