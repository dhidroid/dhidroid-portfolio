import React from 'react';

export const StyleGuideSVG = () => {
    return (
        <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );
};
