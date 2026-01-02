import React from "react";

interface PinProps {
  color?: string;
  size?: number;
  className?: string;
}

export const Pin: React.FC<PinProps> = ({ 
  color = "#EF4444", 
  size = 40,
  className 
}) => {
  // Generate a unique ID for gradients to avoid conflicts if multiple pins are on screen
  const id = React.useId().replace(/:/g, "");

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" }}
    >
      <defs>
        {/* Main Body Gradient - creating a 3D spherical look */}
        <radialGradient
          id={`pin-body-${id}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 18) rotate(90) scale(14)"
        >
          <stop stopColor={color} />
          <stop offset="0.8" stopColor={color} style={{ filter: 'brightness(0.8)' }} />
          <stop offset="1" stopColor={color} style={{ filter: 'brightness(0.6)' }} />
        </radialGradient>

        {/* Highlight Gradient for glossy effect */}
        <radialGradient
          id={`pin-highlight-${id}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15 12) rotate(90) scale(8)"
        >
          <stop stopColor="white" stopOpacity="0.9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Metallic Base Gradient */}
        <linearGradient
          id={`pin-metal-${id}`}
          x1="16"
          y1="28"
          x2="24"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9CA3AF" />
          <stop offset="0.5" stopColor="#E5E7EB" />
          <stop offset="1" stopColor="#9CA3AF" />
        </linearGradient>
      </defs>

      {/* Shadow Contact Point (where it sticks in) */}
      <ellipse cx="20" cy="38" rx="3" ry="1.5" fill="black" fillOpacity="0.2" />

      {/* Metallic Needle Base (visible part) */}
      <path
        d="M18.5 28H21.5L20 38L18.5 28Z"
        fill="#6B7280"
      />
      
      {/* Metallic Collar */}
      <rect x="17" y="27" width="6" height="3" rx="1" fill={`url(#pin-metal-${id})`} />

      {/* Main Pin Head Body */}
      <circle cx="20" cy="18" r="12" fill={`url(#pin-body-${id})`} />
      
      {/* Inner Shadow/Edge definition for 3D rim */}
      <circle cx="20" cy="18" r="12" stroke="black" strokeOpacity="0.1" strokeWidth="0.5" />

      {/* Glossy Highlight */}
      <ellipse cx="16" cy="14" rx="4" ry="3" fill={`url(#pin-highlight-${id})`} transform="rotate(-15 16 14)" />
      
      {/* Secondary smaller highlight */}
      <circle cx="23" cy="22" r="1.5" fill="white" fillOpacity="0.2" />

    </svg>
  );
};
