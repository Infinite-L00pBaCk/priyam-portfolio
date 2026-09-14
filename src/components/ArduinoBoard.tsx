import React, { useState } from 'react';
import { playClickSound, playKeySound } from '../utils/sound';

interface ArduinoBoardProps {
  onClick?: () => void;
  isBlinking?: boolean;
}

export const ArduinoBoard: React.FC<ArduinoBoardProps> = ({ onClick, isBlinking = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localBlink, setLocalBlink] = useState(isBlinking);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (onClick) onClick();
  };

  const handleToggleLocalBlink = (e: React.MouseEvent) => {
    e.stopPropagation();
    playKeySound();
    setLocalBlink(!localBlink);
  };

  return (
    <div
      className="relative group select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Arduino Uno R3 • ATmega328P @ 16MHz (Click for Specs & Projects)"
    >
      {/* Floating Tooltip badge on hover */}
      {isHovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 bg-[#1c1d21] text-[#38bdf8] border-2 border-[#38bdf8] shadow-[2px_2px_0px_#1c1d21] font-mono text-[9px] font-black whitespace-nowrap animate-in fade-in duration-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
          <span>ARDUINO UNO R3 • ATMEGA328P</span>
        </div>
      )}

      {/* Main Arduino Uno PCB Vector Illustration */}
      <div className="relative w-36 sm:w-44 h-26 sm:h-32 bg-[#00878a] border-3 border-[#1c1d21] rounded-md shadow-[4px_4px_0px_#1c1d21] p-1.5 hover:-translate-y-1 hover:rotate-1 transition-all duration-200 overflow-hidden">
        
        {/* PCB Trace Pattern subtle overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />

        {/* 4 Corner Mounting Holes */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ebb429] border border-[#1c1d21]" />

        {/* Top Section: USB Type-B Port (Silver) & DC Barrel Jack (Black) */}
        <div className="flex items-start justify-between -mt-1 -mx-0.5">
          {/* USB Type-B Port */}
          <div className="w-6 sm:w-7 h-5 sm:h-6 bg-[#cbd5e1] border-2 border-[#1c1d21] rounded-xs flex flex-col items-center justify-center shadow-xs">
            <div className="w-3 sm:w-3.5 h-2.5 bg-[#1c1d21] rounded-xs flex items-center justify-center">
              <div className="w-1.5 h-1 bg-[#94a3b8] rounded-xs" />
            </div>
          </div>

          {/* Reset Button (Red Mini Tactile Switch) */}
          <div
            onClick={handleToggleLocalBlink}
            className="w-3.5 h-3.5 bg-[#dc2626] hover:bg-[#ef4444] border border-[#1c1d21] rounded-full flex items-center justify-center cursor-pointer shadow-xs active:scale-90"
            title="Reset / Toggle Pin 13 Blink"
          >
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          </div>

          {/* DC Power Barrel Jack (Black) */}
          <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#1c1d21] border-2 border-[#1c1d21] rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#374151] border border-gray-600 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1c1d21]" />
            </div>
          </div>
        </div>

        {/* Top Female Header (Digital Pins 0-13, GND, AREF) */}
        <div className="mt-1 flex justify-end">
          <div className="w-24 sm:w-28 h-2.5 bg-[#1c1d21] rounded-xs flex items-center justify-around px-1">
            {[...Array(14)].map((_, i) => (
              <span key={i} className="w-1 h-1 bg-[#475569] rounded-xs" />
            ))}
          </div>
        </div>
        <div className="flex justify-end text-[5px] sm:text-[6px] text-white/90 font-mono font-bold tracking-tighter pr-0.5">
          DIGITAL (PWM ~)
        </div>

        {/* Middle Components: ATmega328P IC, Crystal, Voltage Regulators */}
        <div className="my-1 flex items-center justify-between px-1">
          {/* ATmega16U2 USB Controller & 16MHz Crystal */}
          <div className="flex flex-col gap-1">
            <div className="w-3.5 h-3 bg-[#94a3b8] border border-[#1c1d21] rounded-xs text-[4px] flex items-center justify-center font-mono font-bold text-gray-800">
              16M
            </div>
            {/* Status LEDs (ON, L, TX, RX) */}
            <div className="flex items-center gap-1 bg-[#006f72] p-0.5 rounded border border-[#1c1d21]/40">
              {/* ON LED (Green) */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] border border-black/50 shadow-[0_0_3px_#22c55e]" title="Power ON" />
              {/* Pin 13 L LED (Yellow - blinks) */}
              <span
                className={`w-1.5 h-1.5 rounded-full bg-[#facc15] border border-black/50 ${
                  localBlink ? 'animate-ping shadow-[0_0_4px_#facc15]' : 'opacity-40'
                }`}
                title="Pin 13 LED"
              />
              <span className="w-1 h-1 rounded-full bg-[#38bdf8] opacity-80" title="TX" />
              <span className="w-1 h-1 rounded-full bg-[#38bdf8] opacity-80" title="RX" />
            </div>
          </div>

          {/* Main DIP-28 ATmega328P Microcontroller Chip */}
          <div className="w-16 sm:w-20 h-5 sm:h-6 bg-[#1c1d21] border border-gray-600 rounded-xs flex items-center justify-between px-1 relative shadow-xs">
            {/* Left notch */}
            <div className="w-1 h-2 rounded-r-full bg-[#374151]" />
            <div className="text-[5px] sm:text-[6px] font-mono font-black text-white/90 tracking-widest text-center leading-none">
              ATMEGA328P
            </div>
            <div className="text-[4px] text-gray-400 font-mono">16MHz</div>
          </div>
        </div>

        {/* Silkscreen Brand Label */}
        <div className="flex items-center justify-between px-1 text-[6px] sm:text-[7px] font-mono font-black text-white">
          <div className="flex items-center gap-1">
            {/* Infinity / Arduino Logo symbol */}
            <span className="w-2.5 h-1.5 border border-white rounded-full inline-block" />
            <span>ARDUINO</span>
          </div>
          <span className="text-[#facc15] font-black">UNO R3</span>
        </div>

        {/* Bottom Female Headers (Power & Analog In) */}
        <div className="mt-0.5 flex justify-between items-center px-0.5">
          <div className="flex flex-col">
            <span className="text-[5px] text-white/80 font-mono font-bold leading-none">POWER</span>
            <div className="w-10 sm:w-12 h-2 bg-[#1c1d21] rounded-xs flex items-center justify-around px-0.5">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-0.5 h-0.5 bg-[#475569] rounded-xs" />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[5px] text-white/80 font-mono font-bold leading-none">ANALOG IN</span>
            <div className="w-10 sm:w-12 h-2 bg-[#1c1d21] rounded-xs flex items-center justify-around px-0.5">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-0.5 h-0.5 bg-[#475569] rounded-xs" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hanging Badge Below Board */}
      <div className="mt-1 flex items-center justify-center">
        <span className="px-2 py-0.5 bg-[#0284c7] text-white font-mono text-[7px] sm:text-[8px] font-black border border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] -rotate-1">
          MICROCONTROLLER [AVR]
        </span>
      </div>
    </div>
  );
};
