import React from 'react';

export const NotFoundSVG = () => {
    return (
        <svg 
            viewBox="0 0 400 300" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm mx-auto mb-8 text-primary"
        >
             {/* Abstract Geometric 'Broken' shapes */}
            <rect x="50" y="50" width="100" height="100" rx="8" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10" opacity="0.5" />
            <rect x="180" y="80" width="120" height="120" rx="60" fill="currentColor" fillOpacity="0.1" />
            <path d="M280 200 L 350 280 L 150 280 L 220 200 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" opacity="0.6" />
            
            {/* The '404' or subtle text representation if acceptable, otherwise abstract */}
            <circle cx="100" cy="100" r="20" fill="currentColor" />
            <path d="M90 90 L 110 110 M110 90 L 90 110" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
};
