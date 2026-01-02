import React from 'react';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiFramer, SiNextdotjs } from 'react-icons/si';

// Cursor SVG Component
const MouseCursor = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <path 
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19177L14.8092 12.3673H5.65376Z" 
      fill={color} 
      stroke="white" 
      strokeWidth="1"
    />
  </svg>
);

interface TechCursor {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  initialX: string;
  initialY: string;
  moveRange: number;
  duration: number;
}

const cursors: TechCursor[] = [
  { 
    id: 'react', 
    label: 'React', 
    icon: FaReact, 
    color: '#61DAFB', 
    initialX: '15%', 
    initialY: '20%',
    moveRange: 40,
    duration: 5
  },
  { 
    id: 'ts', 
    label: 'TypeScript', 
    icon: SiTypescript, 
    color: '#3178C6', 
    initialX: '75%', 
    initialY: '15%',
    moveRange: 60,
    duration: 7
  },
  { 
    id: 'tailwind', 
    label: 'Tailwind CSS', 
    icon: SiTailwindcss, 
    color: '#06B6D4', 
    initialX: '85%', 
    initialY: '60%',
    moveRange: 50,
    duration: 6
  },
  { 
    id: 'framer', 
    label: 'Framer Motion', 
    icon: SiFramer, 
    color: '#0055FF', 
    initialX: '10%', 
    initialY: '70%',
    moveRange: 45,
    duration: 8
  },
    { 
    id: 'next', 
    label: 'Next.js', 
    icon: SiNextdotjs, 
    color: '#000000', 
    initialX: '50%', 
    initialY: '40%',
    moveRange: 30,
    duration: 9
  },
];

const HeroCursors = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {cursors.map((cursor) => (
        <CursorItem key={cursor.id} cursor={cursor} />
      ))}
    </div>
  );
};

const CursorItem = ({ cursor }: { cursor: TechCursor }) => {
  const Icon = cursor.icon;
  
  return (
    <motion.div
        className="absolute top-0 left-0 flex items-start gap-2"
        initial={{ 
            x: cursor.initialX, 
            y: cursor.initialY, 
            opacity: 0 
        }}
        animate={{ 
            x: [
              cursor.initialX, 
              `calc(${cursor.initialX} + ${Math.random() * cursor.moveRange - cursor.moveRange/2}px)`,
              `calc(${cursor.initialX} - ${Math.random() * cursor.moveRange - cursor.moveRange/2}px)`,
              cursor.initialX
            ],
            y: [
              cursor.initialY, 
              `calc(${cursor.initialY} - ${Math.random() * cursor.moveRange - cursor.moveRange/2}px)`,
              `calc(${cursor.initialY} + ${Math.random() * cursor.moveRange - cursor.moveRange/2}px)`,
              cursor.initialY
            ],
            opacity: 1
        }}
        transition={{
            duration: cursor.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }}
    >
      <MouseCursor color={cursor.color} />
      
      <div 
        className="px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/20 backdrop-blur-sm"
        style={{ backgroundColor: cursor.color }}
      >
         <span className="text-white bg-black/10 rounded-full p-0.5">
            <Icon size={12} />
         </span>
         <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {cursor.label}
         </span>
      </div>
    </motion.div>
  );
};

export default HeroCursors;
