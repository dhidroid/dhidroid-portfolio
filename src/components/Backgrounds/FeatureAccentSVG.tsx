import React from 'react';

export const FeatureAccentSVG = () => {
    return (
        <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary/10"
        >
            <circle cx="32" cy="32" r="32" fill="currentColor" />
            <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" />
            <path d="M32 8 V 16 M32 48 V 56 M8 32 H 16 M48 32 H 56" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
    );
};
