import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

interface CopaCCanProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

export const CopaCCan: React.FC<CopaCCanProps> = ({
  className = '',
  onInteract,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (onInteract) {
      onInteract('Copa-C Classic: 330ml Ice Cold Cola • Fueling late night C++ & embedded debugging!');
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 flex flex-col items-center ${className}`}
      title="Copa-C Soda Can • 330ml Ice Cold Cola (Click to refresh)"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#ef4444] text-[7.5px] font-mono font-bold rounded border border-[#ef4444] shadow-xs whitespace-nowrap z-40 pointer-events-none">
          COPA-C COLA • Ice Cold (Click to sip)
        </div>
      )}

      {/* Vector Can Artwork */}
      <svg
        viewBox="0 0 60 95"
        className="w-12 sm:w-14 md:w-16 h-auto drop-shadow-[3px_3px_0px_#1c1d21]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Contact Shadow */}
        <ellipse cx="30" cy="90" rx="22" ry="5" fill="#1c1d21" opacity="0.3" />

        {/* Can Bottom Rim (Chime) */}
        <ellipse cx="30" cy="85" rx="18" ry="6" fill="#cbd5e1" stroke="#1c1d21" strokeWidth="2.5" />

        {/* Can Body Cylinder */}
        <path
          d="M12 22 L48 22 L48 85 L12 85 Z"
          fill="#dc2626"
          stroke="#1c1d21"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Metallic Highlight Gradient Strip */}
        <path d="M16 22 L20 22 L20 85 L16 85 Z" fill="#ef4444" opacity="0.7" />
        <path d="M42 22 L45 22 L45 85 L42 85 Z" fill="#b91c1c" />

        {/* White Wave Ribbon (Dynamic Contour) */}
        <path
          d="M12 48 Q22 40 30 52 Q38 64 48 54 L48 64 Q38 74 30 62 Q22 50 12 58 Z"
          fill="#ffffff"
          stroke="#1c1d21"
          strokeWidth="1.5"
        />

        {/* Copa-C Retro Typography Logo */}
        <text
          x="30"
          y="42"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Press Start 2P', cursive, sans-serif"
          fontSize="6"
          fontWeight="900"
          letterSpacing="-0.5"
        >
          Copa-C
        </text>

        <text
          x="30"
          y="76"
          textAnchor="middle"
          fill="#fef08a"
          fontFamily="monospace"
          fontSize="4"
          fontWeight="bold"
        >
          330ml • COLA
        </text>

        {/* Can Top Neck taper */}
        <path
          d="M12 22 L16 12 L44 12 L48 22 Z"
          fill="#94a3b8"
          stroke="#1c1d21"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Can Top Lid (Silver Rim) */}
        <ellipse cx="30" cy="12" rx="14" ry="4.5" fill="#e2e8f0" stroke="#1c1d21" strokeWidth="2.5" />
        <ellipse cx="30" cy="12" rx="10" ry="3" fill="#cbd5e1" />

        {/* Pop-Tab Ring */}
        <ellipse cx="30" cy="11.5" rx="4" ry="1.5" fill="#64748b" stroke="#1c1d21" strokeWidth="1.2" />
        <circle cx="30" cy="11.5" r="1" fill="#1c1d21" />

        {/* Condensation Droplets */}
        <circle cx="22" cy="32" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="38" cy="68" r="1.2" fill="#ffffff" opacity="0.8" />
        <circle cx="24" cy="74" r="0.8" fill="#ffffff" opacity="0.8" />
      </svg>
    </div>
  );
};
