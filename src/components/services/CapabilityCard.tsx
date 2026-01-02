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
                "group relative block overflow-hidden bg-[#222222] h-[480px] p-8 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between",
                className
            )}
        >
            {/* Top Text Content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white font-display mb-4 leading-tight">
                    {title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-[90%]">
                    {description}
                </p>
            </div>

            {/* Center Canvas Icon */}
            <div className="relative z-0 flex-1 flex items-center justify-center -my-8 group-hover:scale-105 transition-transform duration-500">
                <div className="w-48 h-48 opacity-80 group-hover:opacity-100 transition-opacity">
                    <CanvasArt 
                        variant={variant} 
                        color={
                            variant === 'database' ? '#fff' : 
                            variant === 'flow' ? '#fff' :
                            variant === 'network' ? '#fff' : '#fff'
                        } 
                    />
                </div>
            </div>

            {/* Bottom Link */}
             <div className="relative z-10 flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors text-sm font-medium mt-auto">
                 {linkText}
                 <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </div>

             {/* Hover Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        </motion.a>
    );
};

export default CapabilityCard;
