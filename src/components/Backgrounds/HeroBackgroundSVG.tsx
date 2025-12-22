import React from 'react';

export const HeroBackgroundSVG = () => {
    return (
        <svg 
            viewBox="0 0 1440 800" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full opacity-60"
            preserveAspectRatio="none"
        >
            <path 
                d="M-50 300 C 200 400, 400 100, 700 300 S 1100 500, 1500 200 V 0 H -50 Z" 
                fill="url(#gradient-hero)" 
                opacity="0.05"
            />
            <path 
                d="M-50 400 C 300 200, 600 600, 900 400 S 1300 100, 1500 300 V 0 H -50 Z" 
                fill="url(#gradient-hero)" 
                opacity="0.03"
            />
            <defs>
                <linearGradient id="gradient-hero" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3f0bd9" />
                    <stop offset="100%" stopColor="#855cff" />
                </linearGradient>
            </defs>
        </svg>
    );
};
