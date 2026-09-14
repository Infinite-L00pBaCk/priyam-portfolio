import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

interface RaspberryPiBoardProps {
  onClick?: () => void;
}

export const RaspberryPiBoard: React.FC<RaspberryPiBoardProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (onClick) onClick();
  };

  return (
    <div
      className="relative group select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Raspberry Pi 4 Model B • Broadcom BCM2711 Quad-Core (Click for Specs & Projects)"
    >
      {/* Floating Tooltip badge on hover */}
      {isHovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 bg-[#1c1d21] text-[#4ade80] border-2 border-[#4ade80] shadow-[2px_2px_0px_#1c1d21] font-mono text-[9px] font-black whitespace-nowrap animate-in fade-in duration-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
          <span>RASPBERRY PI 4 • QUAD 1.5GHz</span>
        </div>
      )}

      {/* Main Raspberry Pi 4 PCB Vector Illustration */}
      <div className="relative w-38 sm:w-46 h-26 sm:h-32 bg-[#15803d] border-3 border-[#1c1d21] rounded-md shadow-[4px_4px_0px_#1c1d21] p-1.5 hover:-translate-y-1 hover:-rotate-1 transition-all duration-200 overflow-hidden">
        
        {/* PCB Trace Pattern subtle overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />

        {/* 4 Corner Gold Mounting Holes */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />

        {/* Top 40-Pin GPIO Header (Gold pins in dual black row) */}
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-28 h-3 bg-[#1c1d21] rounded-xs flex items-center justify-around px-0.5 border border-black/40">
            <div className="grid grid-cols-12 gap-0.5 w-full">
              {[...Array(24)].map((_, i) => (
                <span key={i} className="w-1 h-0.5 bg-[#facc15] rounded-xs inline-block" />
              ))}
            </div>
          </div>

          {/* DSI Display Ribbon Connector (White/Black) */}
          <div className="w-5 sm:w-6 h-2 bg-[#f8fafc] border border-[#1c1d21] rounded-xs flex items-center justify-center">
            <div className="w-3.5 h-0.5 bg-[#1c1d21]" />
          </div>
        </div>
        <div className="text-[5px] sm:text-[6px] text-white/90 font-mono font-bold tracking-tighter">
          40-PIN EXTENDED GPIO
        </div>

        {/* Center: Broadcom BCM2711 SoC, RAM chip, PMIC */}
        <div className="my-1 flex items-center justify-between px-0.5">
          {/* Power & Activity LEDs */}
          <div className="flex flex-col gap-0.5">
            {/* PWR LED (Red) */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] border border-black/50 shadow-[0_0_3px_#ef4444]" title="PWR" />
            {/* ACT LED (Green - flashes) */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] border border-black/50 animate-pulse shadow-[0_0_4px_#22c55e]" title="ACT" />
          </div>

          {/* Broadcom BCM2711 SoC Metal Heat-Spreader */}
          <div className="w-12 sm:w-14 h-9 sm:h-10 bg-[#94a3b8] border-2 border-[#1c1d21] rounded-xs p-0.5 flex flex-col items-center justify-center shadow-xs">
            <div className="text-[5px] sm:text-[6px] font-mono font-black text-[#1c1d21] leading-tight text-center">
              BROADCOM
            </div>
            <div className="text-[4px] sm:text-[5px] font-mono text-gray-800 font-bold leading-none">
              BCM2711
            </div>
            <div className="text-[4px] text-gray-700 font-mono">4x 1.5GHz</div>
          </div>

          {/* Dual USB 3.0 & USB 2.0 Stacks (Right Edge) */}
          <div className="flex flex-col gap-0.5 items-end">
            {/* USB 3.0 (Blue plastic insert inside silver shell) */}
            <div className="w-7 sm:w-8 h-4 bg-[#cbd5e1] border border-[#1c1d21] rounded-xs flex items-center justify-center p-0.5">
              <div className="w-4 sm:w-5 h-2 bg-[#2563eb] rounded-xs" />
            </div>
            {/* USB 2.0 (Black plastic insert inside silver shell) */}
            <div className="w-7 sm:w-8 h-4 bg-[#cbd5e1] border border-[#1c1d21] rounded-xs flex items-center justify-center p-0.5">
              <div className="w-4 sm:w-5 h-2 bg-[#1c1d21] rounded-xs" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Dual Micro-HDMI, USB-C, Gigabit Ethernet */}
        <div className="mt-0.5 flex items-end justify-between px-0.5">
          {/* USB-C Power & Dual Micro-HDMI ports */}
          <div className="flex items-center gap-1">
            {/* USB-C */}
            <div className="w-3.5 h-2 bg-[#cbd5e1] border border-[#1c1d21] rounded-xs flex items-center justify-center">
              <div className="w-2 h-0.5 bg-[#1c1d21] rounded-full" />
            </div>
            {/* Micro HDMI 0 & 1 */}
            <div className="w-3 h-2 bg-[#94a3b8] border border-[#1c1d21] rounded-xs" />
            <div className="w-3 h-2 bg-[#94a3b8] border border-[#1c1d21] rounded-xs" />
          </div>

          {/* Raspberry Pi Logo Silkscreen */}
          <div className="text-[6px] sm:text-[7px] font-mono font-black text-white flex items-center gap-0.5">
            <span className="text-[#f43f5e]">🍓</span>
            <span>Pi 4B</span>
          </div>

          {/* Gigabit Ethernet Port (Silver Shell with yellow/green LEDs) */}
          <div className="w-8 sm:w-9 h-4.5 bg-[#cbd5e1] border border-[#1c1d21] rounded-xs flex items-center justify-between px-1">
            <span className="w-1 h-1 bg-[#22c55e] rounded-full" />
            <div className="w-3.5 h-2.5 bg-[#1c1d21] rounded-xs" />
            <span className="w-1 h-1 bg-[#f59e0b] rounded-full" />
          </div>
        </div>
      </div>

      {/* Hanging Badge Below Board */}
      <div className="mt-1 flex items-center justify-center">
        <span className="px-2 py-0.5 bg-[#16a34a] text-white font-mono text-[7px] sm:text-[8px] font-black border border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] rotate-1">
          SINGLE-BOARD [ARM64]
        </span>
      </div>
    </div>
  );
};
