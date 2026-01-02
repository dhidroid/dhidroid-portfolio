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
                "group relative overflow-hidden bg-[#121212] h-[450px] flex flex-col justify-between p-10 border border-white/5 hover:border-white/20 transition-colors", // Removed rounded-2xl
                className
            )}
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      500px circle at ${mouseX}px ${mouseY}px,
                      rgba(255, 255, 255, 0.1),
                      transparent 80%
                    )
                  `,
                }}
            />

            {/* Canvas Background Layer */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <CanvasArt variant={variant} color={
                    variant === 'lines' ? 'rgba(249, 115, 22, 0.4)' : // Orange
                    variant === 'grid' ? 'rgba(168, 85, 247, 0.4)' :   // Purple
                    'rgba(59, 130, 246, 0.4)'                          // Blue
                } />
            </div>
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10">
                <h3 className="text-sm font-bold text-gray-500 font-display uppercase tracking-[0.2em]">{title}</h3>
            </div>
            
            {/* Content Bottom */}
            <div className="relative z-10 mt-auto">
                 <div className="text-8xl font-bold text-white tracking-tighter mb-6 font-display">
                    {value}
                 </div>
                 <p className="text-gray-400 text-base leading-relaxed max-w-[90%] border-t border-white/10 pt-6">
                    {subtitle}
                 </p>
            </div>

             {/* Hover Accent (Optional: Keep or Remove based on Spotlight preference. Spotlight is better.) */}
             {/* Removing the blur blob to prefer the spotlight effect for sharpness */}

        </motion.div>
    );
};

export default StatsCard;
