import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import CanvasArt from '../ui/CanvasArt';
import { ExternalLink } from 'lucide-react';

interface CapabilityCardProps {
    title: string;
    description: string;
    link: string;
    linkText?: string;
    variant: 'database' | 'flow' | 'network' | 'chart';
    index: number;
    className?: string;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ 
    title, 
    description, 
    link,
    linkText = "See Profile",
    variant, 
    index,
    className 
}) => {
    return (
        <motion.a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "group relative block overflow-hidden bg-white/40 dark:bg-zinc-950/20 h-[480px] p-8 border border-slate-200 dark:border-zinc-800 hover:border-primary/40 dark:hover:border-primary/40 transition-colors flex flex-col justify-between",
                className
            )}
        >
            {/* Top Text Content */}
            <div className="relative z-10 select-none">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-display mb-4 leading-tight uppercase tracking-tight">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed max-w-[95%]">
                    {description}
                </p>
            </div>

            {/* Center Canvas Icon - Interactive / Visual Component */}
            <div className="relative z-0 flex-1 flex items-center justify-center -my-8 group-hover:scale-105 transition-transform duration-500">
                <div className="w-48 h-48 opacity-75 group-hover:opacity-105 transition-opacity">
                    <CanvasArt 
                        variant={variant} 
                        color="#5235F6"
                    />
                </div>
            </div>

            {/* Bottom Link */}
             <div className="relative z-10 flex items-center gap-2 text-slate-500 dark:text-zinc-400 group-hover:text-primary transition-colors text-xs font-mono uppercase tracking-wider mt-auto select-none">
                 <span>[ {linkText} ]</span>
                 <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
             </div>

             {/* Hover Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        </motion.a>
    );
};

export default CapabilityCard;
