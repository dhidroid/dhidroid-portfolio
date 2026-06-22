import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '../../utils/cn';
import CanvasArt from '../ui/CanvasArt';

interface StatsCardProps {
    title: string;
    value: string;
    subtitle: string;
    variant: 'lines' | 'grid' | 'radar';
    index: number;
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
    title, 
    value, 
    subtitle, 
    variant, 
    index,
    className 
}) => {
    // Mouse Tracking Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className={cn(
                "group relative overflow-hidden bg-white/40 dark:bg-zinc-950/20 h-[450px] flex flex-col justify-between p-10 border border-slate-200 dark:border-zinc-800 hover:border-primary/40 dark:hover:border-primary/40 transition-colors duration-500",
                className
            )}
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      500px circle at ${mouseX}px ${mouseY}px,
                      rgba(82, 53, 246, 0.08),
                      transparent 80%
                    )
                  `,
                }}
            />

            {/* Canvas Background Layer */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-45 transition-opacity duration-700 dark:opacity-30 dark:group-hover:opacity-60">
                <CanvasArt variant={variant} color={
                    variant === 'lines' ? 'rgba(82, 53, 246, 0.4)' : // Stuxen Purple
                    variant === 'grid' ? 'rgba(6, 182, 212, 0.4)' :   // Cyan
                    'rgba(138, 92, 246, 0.4)'                          // Violet
                } />
            </div>
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10">
                <h3 className="text-xs font-mono text-slate-400 dark:text-zinc-500 tracking-[0.15em] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {title}
                </h3>
            </div>
            
            {/* Content Bottom */}
            <div className="relative z-10 mt-auto">
                 <div className="text-7xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6 font-display uppercase">
                    {value}
                 </div>
                 <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed border-t border-slate-200 dark:border-zinc-800 pt-6 font-sans">
                    {subtitle}
                 </p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
