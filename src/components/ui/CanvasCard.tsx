import React from "react";
import { motion } from "motion/react";
import { Pin } from "./Pin";
import { cn } from "../../utils/cn";

interface CanvasCardProps {
  children: React.ReactNode;
  pinColor?: string;
  className?: string;
  rotation?: number; // degrees
  delay?: number;
}

export const CanvasCard: React.FC<CanvasCardProps> = ({
  children,
  pinColor = "#22c55e",
  className,
  rotation = 0,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        delay: delay 
      }}
      whileHover={{ 
        scale: 1.02, 
        rotate: 0,
        zIndex: 10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={cn(
        "relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-shadow duration-300 ease-out mb-8 break-inside-avoid",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white before:to-gray-50/50 before:rounded-2xl before:pointer-events-none",
        className
      )}
      style={{
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.01)" // Layered soft shadow
      }}
    >
      {/* Pin Element */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <Pin color={pinColor} size={32} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
