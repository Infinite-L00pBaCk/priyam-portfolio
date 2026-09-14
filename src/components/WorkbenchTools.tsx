import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

interface WorkbenchToolsProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

export const WorkbenchTools: React.FC<WorkbenchToolsProps> = ({
  className = '',
  onInteract,
}) => {
  const [isSnipped, setIsSnipped] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setIsSnipped(!isSnipped);
    if (onInteract) {
      onInteract(
        isSnipped
          ? 'ESD TOOLS: Precision Curved Tweezers (ESD-15) selected for 0805 SMD placement'
          : 'PLATO 170: Flush Wire Cutters snipped excess jumper lead • Clean 45° cut'
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 flex flex-col items-center ${className}`}
      title="Plato 170 Precision Flush Cutters & ESD-15 Anti-Static Tweezers (Click to interact)"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#38bdf8] text-[7.5px] font-mono font-bold rounded border border-[#38bdf8] shadow-xs whitespace-nowrap z-40 pointer-events-none">
          PRECISION TOOLS • Flush Cutters & ESD-15 Tweezers
        </div>
      )}

      {/* Main Vector Artwork: Blue ESD Mat with Cutters & Tweezers */}
      <svg
        viewBox="0 0 140 85"
        className="w-28 sm:w-34 md:w-38 h-auto drop-shadow-[4px_4px_0px_#1c1d21]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Anti-Static Workbench Pad / Mat */}
        <rect
          x="6"
          y="10"
          width="128"
          height="68"
          rx="4"
          fill="#0284c7"
          stroke="#1c1d21"
          strokeWidth="3"
        />
        {/* Grid markings on ESD mat */}
        <path
          d="M20 10 L20 78 M40 10 L40 78 M60 10 L60 78 M80 10 L80 78 M100 10 L100 78 M120 10 L120 78"
          stroke="#0369a1"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M6 24 L134 24 M6 40 L134 40 M6 56 L134 56 M6 70 L134 70"
          stroke="#0369a1"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* ESD Grounding Symbol Stamp */}
        <text
          x="14"
          y="20"
          fill="#bae6fd"
          fontSize="5"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ESD-SAFE
        </text>

        {/* --- 1. PLATO 170 BLUE PRECISION FLUSH CUTTERS --- */}
        <g transform="translate(18, 14) rotate(-15 40 30)">
          {/* Shadow */}
          <ellipse cx="40" cy="35" rx="36" ry="6" fill="#1c1d21" opacity="0.25" />

          {/* Pivot Screw / Hinge Nut */}
          <circle cx="42" cy="28" r="4.5" fill="#64748b" stroke="#1c1d21" strokeWidth="2" />
          <circle cx="42" cy="28" r="1.5" fill="#1c1d21" />

          {/* Left Carbon Steel Jaws (Cutting Blade) */}
          <path
            d="M42 26 L22 18 L24 28 L42 29 Z"
            fill="#e2e8f0"
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Ground Beveled Edge */}
          <path d="M22 18 L42 27" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Right Carbon Steel Jaws */}
          <path
            d="M42 30 L22 38 L24 28 L42 27 Z"
            fill="#cbd5e1"
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Internal Spring Return Leaf */}
          <path d="M42 28 C50 26, 52 30, 60 28" stroke="#1c1d21" strokeWidth="2" fill="none" />

          {/* Upper Ergonomic Blue Rubber Handle */}
          <path
            d="M42 26 C55 18, 70 14, 92 16 C95 18, 93 25, 90 26 C72 24, 58 26, 42 29 Z"
            fill="#0ea5e9"
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Handle Texture / Grip Notch */}
          <line x1="62" y1="18" x2="62" y2="24" stroke="#0284c7" strokeWidth="2" />
          <line x1="72" y1="17" x2="72" y2="23" stroke="#0284c7" strokeWidth="2" />
          <line x1="82" y1="17" x2="82" y2="23" stroke="#0284c7" strokeWidth="2" />
          <text x="66" y="22" fill="#ffffff" fontSize="3.5" fontFamily="sans-serif" fontWeight="900">
            PLATO 170
          </text>

          {/* Lower Ergonomic Blue Rubber Handle */}
          <path
            d="M42 30 C55 38, 70 42, 92 40 C95 38, 93 31, 90 30 C72 32, 58 30, 42 27 Z"
            fill="#0284c7"
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="62" y1="32" x2="62" y2="38" stroke="#0369a1" strokeWidth="2" />
          <line x1="72" y1="33" x2="72" y2="39" stroke="#0369a1" strokeWidth="2" />
          <line x1="82" y1="33" x2="82" y2="39" stroke="#0369a1" strokeWidth="2" />
        </g>

        {/* --- 2. ESD-15 ANTI-STATIC CURVED TWEEZERS --- */}
        <g transform="translate(68, 48) rotate(8)">
          {/* Shadow */}
          <path
            d="M4 14 C20 18, 42 16, 56 12"
            stroke="#1c1d21"
            strokeWidth="4"
            opacity="0.25"
            strokeLinecap="round"
          />
          {/* Black Anti-Static Coated Body */}
          <path
            d="M2 12 C18 16, 38 14, 52 10 L56 6 C42 10, 20 12, 2 8 Z"
            fill="#1e293b"
            stroke="#1c1d21"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Fine Curved Fine Metallic Tips */}
          <path
            d="M52 10 C56 9, 60 6, 62 1 L60 0 C57 5, 54 7, 51 8 Z"
            fill="#cbd5e1"
            stroke="#1c1d21"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <text x="18" y="11.5" fill="#94a3b8" fontSize="3" fontFamily="monospace" fontWeight="bold">
            ESD-15
          </text>
        </g>

        {/* Snipped Copper Wire Trimmings */}
        <path d="M112 28 Q116 22 122 25" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M118 36 Q124 33 126 40" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>

      {/* Bottom Hardware Tag Badge */}
      <div className="mt-1 bg-[#0284c7] text-white px-2 py-0.5 border-2 border-[#1c1d21] rounded-xs font-mono text-[6.5px] font-black shadow-[2px_2px_0px_#1c1d21]">
        ESD TOOLS [PLATO 170]
      </div>
    </div>
  );
};
