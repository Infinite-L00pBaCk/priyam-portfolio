import React, { useState } from 'react';
import { playClickSound, playKeySound } from '../utils/sound';

interface BreadboardProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

export const Breadboard: React.FC<BreadboardProps> = ({
  className = '',
  onInteract,
}) => {
  const [ledLit, setLedLit] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setLedLit(!ledLit);
    if (onInteract) {
      onInteract(
        ledLit
          ? 'BREADBOARD: Circuit Power Cut • LED OFF'
          : 'BREADBOARD: 5V Bus Powered • Status LED Lit (330Ω Current Limiter)'
      );
    }
  };

  const handleWireClick = (e: React.MouseEvent, wireName: string) => {
    e.stopPropagation();
    playKeySound();
    if (onInteract) {
      onInteract(`JUMPER WIRE: ${wireName} tested with multimeter probe • Continuity OK (0.02Ω)`);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 ${className}`}
      title="Half-Size Solderless Breadboard • 400 Tie Points with Multicolored Jumper Wires (Click to Toggle LED)"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#4ade80] text-[7.5px] font-mono font-bold rounded border border-[#4ade80] shadow-xs whitespace-nowrap z-40 pointer-events-none">
          BREADBOARD 400-TIE • Click to toggle LED circuit
        </div>
      )}

      {/* Main Breadboard Body */}
      <div className="relative w-36 sm:w-44 bg-[#f8fafc] border-3 border-[#1c1d21] rounded-md shadow-[4px_4px_0px_#1c1d21] p-1.5 flex flex-col justify-between overflow-visible">
        
        {/* Top Power Bus Strip (+ Red / - Blue) */}
        <div className="w-full flex items-center justify-between px-1 py-0.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs mb-1">
          {/* Positive Rail (+) */}
          <div className="flex items-center gap-1 w-full">
            <span className="text-[6px] font-mono font-black text-[#ef4444] leading-none">+</span>
            <div className="h-[1.5px] flex-1 bg-[#ef4444]/60 rounded-full" />
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={`tp-${i}`} className="w-1 h-1 bg-[#334155] rounded-xs" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 py-0.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs mb-1 -mt-0.5">
          {/* Negative Rail (-) */}
          <div className="flex items-center gap-1 w-full">
            <span className="text-[6px] font-mono font-black text-[#3b82f6] leading-none">-</span>
            <div className="h-[1.5px] flex-1 bg-[#3b82f6]/60 rounded-full" />
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={`tm-${i}`} className="w-1 h-1 bg-[#334155] rounded-xs" />
              ))}
            </div>
          </div>
        </div>

        {/* Top Terminal Strip (Rows A - E) */}
        <div className="w-full bg-[#f8fafc] px-1 py-0.5 flex flex-col gap-0.5">
          {['A', 'B', 'C', 'D', 'E'].map((row) => (
            <div key={row} className="flex items-center justify-between">
              <span className="text-[5px] font-mono font-bold text-[#64748b] w-2">{row}</span>
              <div className="flex gap-[3px] sm:gap-1">
                {[...Array(15)].map((_, col) => (
                  <div
                    key={`top-${row}-${col}`}
                    className="w-1 h-1 bg-[#1e293b] rounded-xs hover:bg-[#0284c7] transition-colors"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Central DIP IC Divider Channel */}
        <div className="relative w-full h-2 bg-[#e2e8f0] border-y border-[#cbd5e1] my-0.5 flex items-center justify-between px-2">
          <span className="text-[5px] font-mono font-black text-[#94a3b8] tracking-widest">
            SOLDERLESS BREADBOARD
          </span>
          <span className="text-[5px] font-mono font-bold text-[#94a3b8]">400 PTS</span>
        </div>

        {/* Bottom Terminal Strip (Rows F - J) */}
        <div className="w-full bg-[#f8fafc] px-1 py-0.5 flex flex-col gap-0.5">
          {['F', 'G', 'H', 'I', 'J'].map((row) => (
            <div key={row} className="flex items-center justify-between">
              <span className="text-[5px] font-mono font-bold text-[#64748b] w-2">{row}</span>
              <div className="flex gap-[3px] sm:gap-1">
                {[...Array(15)].map((_, col) => (
                  <div
                    key={`bot-${row}-${col}`}
                    className="w-1 h-1 bg-[#1e293b] rounded-xs hover:bg-[#0284c7] transition-colors"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Power Bus Strip (+ Red / - Blue) */}
        <div className="w-full flex items-center justify-between px-1 py-0.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs mt-1">
          {/* Positive Rail (+) */}
          <div className="flex items-center gap-1 w-full">
            <span className="text-[6px] font-mono font-black text-[#ef4444] leading-none">+</span>
            <div className="h-[1.5px] flex-1 bg-[#ef4444]/60 rounded-full" />
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={`bp-${i}`} className="w-1 h-1 bg-[#334155] rounded-xs" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 py-0.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs mt-0.5">
          {/* Negative Rail (-) */}
          <div className="flex items-center gap-1 w-full">
            <span className="text-[6px] font-mono font-black text-[#3b82f6] leading-none">-</span>
            <div className="h-[1.5px] flex-1 bg-[#3b82f6]/60 rounded-full" />
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={`bm-${i}`} className="w-1 h-1 bg-[#334155] rounded-xs" />
              ))}
            </div>
          </div>
        </div>

        {/* On-Board Electronic Components & Jumper Wires Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {/* 1. 5mm Status LED */}
          <div
            className="absolute top-10 right-6 pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              playKeySound();
              setLedLit(!ledLit);
            }}
            title="5mm Diffused Green LED"
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border-2 border-[#1c1d21] shadow-xs flex items-center justify-center transition-all ${
                ledLit
                  ? 'bg-[#22c55e] shadow-[0_0_8px_#22c55e]'
                  : 'bg-[#15803d]/40 opacity-70'
              }`}
            >
              <div className="w-1 h-1 rounded-full bg-white/70" />
            </div>
            {/* LED Anode/Cathode Legs */}
            <div className="w-0.5 h-2 bg-[#94a3b8] mx-auto border-x border-[#1c1d21]/40" />
          </div>

          {/* 2. 330 Ohm Current Limiting Resistor */}
          <div className="absolute bottom-10 right-12 flex items-center">
            <div className="w-2 h-0.5 bg-[#94a3b8]" />
            <div className="w-5 h-2 bg-[#fde68a] border border-[#1c1d21] rounded-xs flex items-center justify-around px-0.5 shadow-2xs">
              <span className="w-0.5 h-full bg-[#f97316]" /> {/* Orange */}
              <span className="w-0.5 h-full bg-[#f97316]" /> {/* Orange */}
              <span className="w-0.5 h-full bg-[#991b1b]" /> {/* Brown */}
              <span className="w-0.5 h-full bg-[#eab308]" /> {/* Gold */}
            </div>
            <div className="w-2 h-0.5 bg-[#94a3b8]" />
          </div>

          {/* 3. Small IC Chip (e.g. 555 Timer / 74HC595 Shift Register) */}
          <div className="absolute top-[48%] left-10 -translate-y-1/2 w-8 h-4 bg-[#1e293b] border border-[#1c1d21] rounded-xs flex items-center justify-center shadow-xs">
            <div className="w-1 h-1 rounded-full bg-[#475569] absolute left-0.5 top-0.5" />
            <span className="text-[4.5px] font-mono font-bold text-gray-300">NE555</span>
          </div>

          {/* 4. Multicolored Jumper Wires SVG Spray */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-auto"
            viewBox="0 0 176 128"
            fill="none"
          >
            {/* RED JUMPER WIRE: Power + rail to Row B */}
            <g
              className="cursor-pointer group/wire"
              onClick={(e) => handleWireClick(e, 'RED +5V Power Wire')}
            >
              {/* Wire shadow */}
              <path
                d="M 30 12 C 40 -8, 65 -4, 75 28"
                stroke="#1c1d21"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                transform="translate(1, 2)"
              />
              {/* Main Red Wire */}
              <path
                d="M 30 12 C 40 -8, 65 -4, 75 28"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                className="hover:stroke-[#f87171] transition-colors"
              />
              {/* Wire Terminals/Pins */}
              <circle cx="30" cy="12" r="2" fill="#1c1d21" />
              <circle cx="75" cy="28" r="2" fill="#1c1d21" />
            </g>

            {/* BLUE JUMPER WIRE: Ground - rail to Row J */}
            <g
              className="cursor-pointer group/wire"
              onClick={(e) => handleWireClick(e, 'BLUE GND Ground Wire')}
            >
              {/* Shadow */}
              <path
                d="M 45 116 C 60 138, 95 130, 110 98"
                stroke="#1c1d21"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                transform="translate(1, 2)"
              />
              {/* Main Blue Wire */}
              <path
                d="M 45 116 C 60 138, 95 130, 110 98"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                className="hover:stroke-[#60a5fa] transition-colors"
              />
              <circle cx="45" cy="116" r="2" fill="#1c1d21" />
              <circle cx="110" cy="98" r="2" fill="#1c1d21" />
            </g>

            {/* YELLOW JUMPER WIRE: Signal loop bridging IC to LED */}
            <g
              className="cursor-pointer group/wire"
              onClick={(e) => handleWireClick(e, 'YELLOW GPIO Signal Wire')}
            >
              {/* Shadow */}
              <path
                d="M 52 48 C 70 15, 120 20, 140 42"
                stroke="#1c1d21"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                transform="translate(1, 2)"
              />
              {/* Main Yellow Wire */}
              <path
                d="M 52 48 C 70 15, 120 20, 140 42"
                stroke="#eab308"
                strokeWidth="3"
                strokeLinecap="round"
                className="hover:stroke-[#fde047] transition-colors"
              />
              <circle cx="52" cy="48" r="2" fill="#1c1d21" />
              <circle cx="140" cy="42" r="2" fill="#1c1d21" />
            </g>

            {/* GREEN JUMPER WIRE: Analog feed bridging top and bottom strips */}
            <g
              className="cursor-pointer group/wire"
              onClick={(e) => handleWireClick(e, 'GREEN Analog Feed Wire')}
            >
              {/* Shadow */}
              <path
                d="M 88 38 C 105 55, 105 75, 88 92"
                stroke="#1c1d21"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                transform="translate(1, 2)"
              />
              {/* Main Green Wire */}
              <path
                d="M 88 38 C 105 55, 105 75, 88 92"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                className="hover:stroke-[#4ade80] transition-colors"
              />
              <circle cx="88" cy="38" r="2" fill="#1c1d21" />
              <circle cx="88" cy="92" r="2" fill="#1c1d21" />
            </g>

            {/* ORANGE JUMPER WIRE: Small bypass jumper */}
            <g
              className="cursor-pointer group/wire"
              onClick={(e) => handleWireClick(e, 'ORANGE Clock Bus Wire')}
            >
              <path
                d="M 22 25 C 10 35, 10 50, 22 60"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="hover:stroke-[#fb923c] transition-colors"
              />
              <circle cx="22" cy="25" r="1.5" fill="#1c1d21" />
              <circle cx="22" cy="60" r="1.5" fill="#1c1d21" />
            </g>
          </svg>
        </div>

        {/* Bottom Hardware Tag Badge */}
        <div className="mt-1.5 -mb-3 bg-[#10b981] text-white px-2 py-0.5 border-2 border-[#1c1d21] rounded-xs font-mono text-[6.5px] font-black shadow-[2px_2px_0px_#1c1d21] self-center">
          BREADBOARD [PROTOTYPE]
        </div>
      </div>
    </div>
  );
};
