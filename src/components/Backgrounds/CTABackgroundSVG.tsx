import React from 'react';

export const CTABackgroundSVG = () => {
    return (
        <svg 
            viewBox="0 0 1200 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full text-primary"
            preserveAspectRatio="none"
        >
            <circle cx="100" cy="350" r="200" fill="currentColor" fillOpacity="0.05" />
            <circle cx="1100" cy="50" r="150" fill="currentColor" fillOpacity="0.05" />
            <path d="M0 400 L 1200 400 L 1200 350 Q 600 250 0 350 Z" fill="currentColor" fillOpacity="0.03" />
        </svg>
    );
};
