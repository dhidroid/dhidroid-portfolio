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
            "group relative bg-[#18181b] border border-white/5 p-8 flex flex-col justify-between aspect-[4/4] transition-all duration-300 hover:border-white/10 hover:shadow-2xl overflow-hidden",
            className
        )}>
           
            {/* Abstract Background Shape via Gradient */}
            <div className={cn(
                "absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-tr blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                gradients[themeIndex]
            )} />

            {/* Pattern Overlay - Optional simple lines */}
            <div className="absolute right-0 bottom-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 L100 0 M20 100 L100 20 M40 100 L100 40" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            {/* Header: Icon + Date */}
            <div className="relative z-10 flex items-start justify-between mb-12">
                {/* Tech Icon Square */}
                <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg",
                    iconColors[themeIndex]
                )}>
                    <DynamicIcon name={mainTech} className="w-6 h-6" />
                </div>
                
                {/* Date / Period */}
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    {item.period.split('-')[0].trim()}
                </span>
            </div>

            {/* Content: Title & Company */}
            <div className="relative z-10 mt-auto">
                <span className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    {item.location || "Remote"}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight font-display">
                    {item.role}
                </h3>
                
                <div className="text-gray-400 font-medium text-sm">
                    {item.company}
                </div>
            </div>

            {/* Bottom: Date Range Full */}
             <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                 <span className="text-gray-600 text-xs font-mono">
                    {item.role}
                 </span>
                 <span className="text-gray-400 text-xs font-mono font-bold">
                    {item.period}
                 </span>
             </div>
        </div>
    );
};

export default ExperienceCard;
