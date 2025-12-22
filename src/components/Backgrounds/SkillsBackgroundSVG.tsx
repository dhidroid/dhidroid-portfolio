import React from 'react';

export const SkillsBackgroundSVG = () => {
    return (
        <svg 
            viewBox="0 0 1000 1000" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full opacity-30 text-primary"
            preserveAspectRatio="xMidYMid slice"
        >
            <path d="M100 100 C 300 100, 300 300, 500 300 S 700 500, 900 500" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" opacity="0.4" />
            <path d="M100 300 C 300 300, 300 500, 500 500 S 700 700, 900 700" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" opacity="0.3" />
            <path d="M100 500 C 300 500, 300 700, 500 700 S 700 900, 900 900" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" opacity="0.2" />
            
            <circle cx="500" cy="300" r="10" fill="currentColor" opacity="0.5" />
            <circle cx="500" cy="500" r="15" fill="currentColor" opacity="0.6" />
            <circle cx="500" cy="700" r="10" fill="currentColor" opacity="0.5" />
        </svg>
    );
};
