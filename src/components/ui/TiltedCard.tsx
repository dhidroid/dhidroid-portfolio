import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface TiltedCardProps {
  title: string;
  value: string;
  subtitle?: string;
  rotate?: number;
  className?: string;
  index?: number;
}

const TiltedCard: React.FC<TiltedCardProps> = ({ 
    title, 
    value, 
    subtitle, 
    rotate = 0, 
    className,
    index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotate }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
        delay: index * 0.1 
      }}
      whileHover={{ 
         scale: 1.05, 
         rotate: 0, 
         zIndex: 10,
         transition: { duration: 0.3 } 
      }}
      className={cn(
        "relative flex flex-col justify-between p-8 md:p-10 rounded-[2rem] bg-gray-100/50 backdrop-blur-sm border border-white/20 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
            {title}
        </span>
        <h3 className="text-5xl md:text-7xl font-bold font-display text-foreground tracking-tighter">
            {value}
        </h3>
      </div>
      
      {subtitle && (
          <div className="mt-8 pt-8 border-t border-gray-200/50">
            <p className="text-base font-medium text-gray-500 font-body leading-relaxed">
                {subtitle}
            </p>
          </div>
      )}
    </motion.div>
  );
};

export default TiltedCard;
