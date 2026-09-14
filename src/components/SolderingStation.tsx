import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

interface SolderingStationProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

export const SolderingStation: React.FC<SolderingStationProps> = ({
  className = '',
  onInteract,
}) => {
  const [temperature, setTemperature] = useState<number>(350); // 350°C standard lead-free soldering temp
  const [isHeating, setIsHeating] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleToggleHeat = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const nextHeating = !isHeating;
    setIsHeating(nextHeating);
    if (onInteract) {
      onInteract(
        nextHeating
          ? `SOLDERING STATION: Heating to ${temperature}°C • Tip Hot & Ready (Sn63/Pb37 Solder Flux Active)`
          : 'SOLDERING STATION: Standby / Cooled Down • Tip Safe'
      );
    }
  };

  const handleTempAdjust = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const temps = [300, 350, 400, 450];
    const nextIdx = (temps.indexOf(temperature) + 1) % temps.length;
    const nextTemp = temps[nextIdx];
    setTemperature(nextTemp);
    if (onInteract) {
      onInteract(`SOLDERING STATION: Set Temperature to ${nextTemp}°C`);
    }
  };

  return (
    <div
      onClick={handleToggleHeat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 flex flex-col items-center ${className}`}
      title="Hakko-Style Soldering Station & Iron Stand with Solder Wire Spool (Click to Toggle Power/Temp)"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#f97316] text-[7.5px] font-mono font-bold rounded border border-[#f97316] shadow-xs whitespace-nowrap z-40 pointer-events-none">
          SOLDERING KIT • {isHeating ? `${temperature}°C HOT` : 'STANDBY'} (Click to adjust)
        </div>
      )}

      {/* Main Vector Artwork: Solder Wire Spool, Heavy Base, Brass Mesh, Sponge, and Iron Cradle */}
      <svg
        viewBox="0 0 170 200"
        className="w-36 sm:w-44 md:w-48 lg:w-50 h-auto drop-shadow-[4px_4px_0px_#1c1d21]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk Contact Grounding Shadow */}
        <ellipse cx="85" cy="188" rx="78" ry="9" fill="#1c1d21" opacity="0.3" />

        {/* --- COMPLETE SILICONE POWER CABLE (Continuous smooth loop from iron handle to station base) --- */}
        {/* Outer Cable Outline / Shadow */}
        <path
          d="M 39.5 12 C 18 20, 6 48, 8 92 C 10 134, 22 162, 54 162"
          stroke="#1c1d21"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner Cable Core (Dark Slate Silicone) */}
        <path
          d="M 39.5 12 C 18 20, 6 48, 8 92 C 10 134, 22 162, 54 162"
          stroke="#334155"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- LEFT: SOLDER WIRE SPOOL (60/40 Rosin Core) --- */}
        <g transform="translate(6, 126)">
          {/* Spool Shadow */}
          <ellipse cx="22" cy="58" rx="20" ry="5" fill="#1c1d21" opacity="0.25" />
          
          {/* Spool Bottom Flange */}
          <ellipse cx="22" cy="52" rx="20" ry="7" fill="#1e293b" stroke="#1c1d21" strokeWidth="2.5" />
          
          {/* Wounded Solder Wire Body (Silver Metallic) */}
          <path
            d="M5 24 L39 24 L39 48 L5 48 Z"
            fill="#cbd5e1"
            stroke="#1c1d21"
            strokeWidth="2.5"
          />
          {/* Solder Wire Grooves */}
          <line x1="5" y1="28" x2="39" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="5" y1="33" x2="39" y2="33" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="5" y1="38" x2="39" y2="38" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="5" y1="43" x2="39" y2="43" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Spool Top Flange */}
          <ellipse cx="22" cy="24" rx="20" ry="7" fill="#0284c7" stroke="#1c1d21" strokeWidth="2.5" />
          <ellipse cx="22" cy="24" rx="14" ry="4.5" fill="#0369a1" />
          <circle cx="22" cy="24" r="4" fill="#1c1d21" />

          {/* Solder Label */}
          <rect x="8" y="30" width="28" height="12" rx="1" fill="#facc15" stroke="#1c1d21" strokeWidth="1.5" />
          <text x="22" y="38" textAnchor="middle" fill="#1c1d21" fontSize="5" fontFamily="monospace" fontWeight="900">
            60/40
          </text>

          {/* Loose Solder Wire Strand Curling Out Toward Work Area */}
          <path
            d="M36 28 C48 18, 55 24, 60 48 C64 62, 58 68, 52 70"
            stroke="#e2e8f0"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M36 28 C48 18, 55 24, 60 48 C64 62, 58 68, 52 70"
            stroke="#1c1d21"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- MAIN HEAVY CAST-IRON STATION BASE --- */}
        <path
          d="M52 142 L160 142 L154 186 L56 186 Z"
          fill="#334155"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Base Bevel Highlight Line */}
        <path d="M58 148 L152 148" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

        {/* Yellow Cleaning Sponge Tray */}
        <rect
          x="62"
          y="152"
          width="36"
          height="26"
          rx="3"
          fill="#fef08a"
          stroke="#1c1d21"
          strokeWidth="2.5"
        />
        {/* Sponge Wet Texture Holes */}
        <circle cx="70" cy="159" r="1.8" fill="#ca8a04" />
        <circle cx="82" cy="160" r="1.5" fill="#ca8a04" />
        <circle cx="75" cy="167" r="2" fill="#ca8a04" />
        <circle cx="88" cy="168" r="1.8" fill="#ca8a04" />
        <circle cx="71" cy="173" r="1.5" fill="#ca8a04" />
        <circle cx="82" cy="174" r="1.8" fill="#ca8a04" />

        {/* Golden Brass Wire Tip Cleaner (Mesh Ball Dome) */}
        <circle
          cx="126"
          cy="165"
          r="14"
          fill="#ca8a04"
          stroke="#1c1d21"
          strokeWidth="2.5"
        />
        {/* Brass Curls Texture */}
        <path d="M118 158 Q126 153 134 159 Q126 168 120 163" stroke="#fef08a" strokeWidth="1.5" fill="none" />
        <path d="M121 169 Q128 174 133 166 Q124 159 128 167" stroke="#fef08a" strokeWidth="1.5" fill="none" />
        <circle cx="126" cy="165" r="3" fill="#854d0e" />

        {/* Power / Heat Indicator LED on Base */}
        <circle
          cx="148"
          cy="156"
          r="3"
          fill={isHeating ? '#ef4444' : '#475569'}
          stroke="#1c1d21"
          strokeWidth="1.5"
          className={isHeating ? 'animate-pulse' : ''}
        />

        {/* Temperature / Status Readout Screen on Base */}
        <rect
          x="94"
          y="178"
          width="48"
          height="7"
          rx="1"
          fill="#1c1d21"
        />
        <text
          x="118"
          y="183.5"
          textAnchor="middle"
          fill={isHeating ? '#4ade80' : '#94a3b8'}
          fontSize="5"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {isHeating ? `HEAT ${temperature}°C` : 'STANDBY'}
        </text>

        {/* --- SPRING COIL CRADLE & ANGLED SOLDERING IRON --- */}
        <g transform="rotate(-32 110 125)">
          {/* Heavy Base Bracket */}
          <rect x="94" y="112" width="32" height="14" rx="2" fill="#1e293b" stroke="#1c1d21" strokeWidth="2.5" />

          {/* Internal safety funnel guide */}
          <path
            d="M96 38 L124 38 L116 118 L104 118 Z"
            fill="#1e293b"
            stroke="#1c1d21"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Spiral Coils of the Iron Holder */}
          {[42, 53, 64, 75, 86, 97, 108].map((y, idx) => (
            <ellipse
              key={idx}
              cx="110"
              cy={y}
              rx={18 - idx * 0.9}
              ry="5"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="4"
            />
          ))}
          {[42, 53, 64, 75, 86, 97, 108].map((y, idx) => (
            <ellipse
              key={`h-${idx}`}
              cx="110"
              cy={y}
              rx={18 - idx * 0.9}
              ry="5"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.8"
            />
          ))}

          {/* --- SOLDERING IRON INSERTED IN STAND --- */}
          {/* Heated Tip (Precision Chisel) */}
          <path
            d="M106 118 L114 118 L112 142 L108 142 Z"
            fill={isHeating ? '#f97316' : '#94a3b8'}
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Heat Glow on Tip when active */}
          {isHeating && (
            <ellipse cx="110" cy="134" rx="5" ry="9" fill="#fb923c" opacity="0.7" />
          )}

          {/* Steel Heating Element Barrel Tube */}
          <rect
            x="105"
            y="62"
            width="10"
            height="58"
            fill="#cbd5e1"
            stroke="#1c1d21"
            strokeWidth="3"
          />
          {/* Chrome Barrel Vent Holes */}
          <circle cx="110" cy="72" r="1.5" fill="#1c1d21" />
          <circle cx="110" cy="82" r="1.5" fill="#1c1d21" />
          <circle cx="110" cy="92" r="1.5" fill="#1c1d21" />
          <circle cx="110" cy="102" r="1.5" fill="#1c1d21" />

          {/* Heat Guard Ring Collar */}
          <rect
            x="100"
            y="54"
            width="20"
            height="8"
            rx="2.5"
            fill="#0284c7"
            stroke="#1c1d21"
            strokeWidth="3"
          />

          {/* Ergonomic Textured Blue Grip Handle */}
          <path
            d="M102 4 L118 4 L117 54 L103 54 Z"
            fill="#0ea5e9"
            stroke="#1c1d21"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Black Rubber Grip Ribs */}
          <line x1="102.5" y1="14" x2="117.5" y2="14" stroke="#1c1d21" strokeWidth="3" />
          <line x1="103" y1="24" x2="117" y2="24" stroke="#1c1d21" strokeWidth="3" />
          <line x1="103" y1="34" x2="117" y2="34" stroke="#1c1d21" strokeWidth="3" />
          <line x1="103.5" y1="44" x2="116.5" y2="44" stroke="#1c1d21" strokeWidth="3" />

          {/* Cord Strain Relief Boot */}
          <path
            d="M106 4 L114 4 L113 -8 L107 -8 Z"
            fill="#1c1d21"
            stroke="#1c1d21"
            strokeWidth="2.5"
          />
        </g>

        {/* --- HEAT & FLUX SMOKE WISPS --- */}
        {isHeating && (
          <g className="opacity-80">
            <path
              d="M72 75 Q60 55 74 38 Q82 20 70 6"
              stroke="#f1f5f9"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M80 84 Q92 64 82 46 Q74 28 85 12"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>

      {/* Bottom Hardware Tag Badge */}
      <div
        onClick={handleTempAdjust}
        className="mt-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-2.5 py-0.5 border-2 border-[#1c1d21] rounded-xs font-mono text-[7px] font-black shadow-[2px_2px_0px_#1c1d21] tracking-wider transition-colors cursor-pointer"
        title="Click to change temperature"
      >
        SOLDERING KIT [{temperature}°C]
      </div>
    </div>
  );
};
