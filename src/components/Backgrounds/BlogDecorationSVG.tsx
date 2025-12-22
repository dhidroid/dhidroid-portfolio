import React from 'react';

export const BlogDecorationSVG = () => {
    return (
        <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 -z-10 text-primary/10"
        >
            <rect x="140" y="20" width="40" height="160" rx="20" fill="currentColor" />
            <rect x="80" y="60" width="40" height="120" rx="20" fill="currentColor" opacity="0.6" />
            <rect x="20" y="100" width="40" height="80" rx="20" fill="currentColor" opacity="0.3" />
        </svg>
    );
};
