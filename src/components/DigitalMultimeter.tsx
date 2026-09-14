import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';

interface DigitalMultimeterProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

type Mode = 'DCV' | 'ACV' | 'OHM' | 'CONT' | 'AMP' | 'OFF';

const MODES: { id: Mode; label: string; reading: string; unit: string; angle: number }[] = [
  { id: 'DCV', label: 'DC V⎓', reading: '5.012', unit: 'V DC', angle: 45 },
  { id: 'ACV', label: 'AC V~', reading: '230.4', unit: 'V AC', angle: 90 },
  { id: 'OHM', label: 'Ω RES', reading: '10.02', unit: 'kΩ', angle: 135 },
  { id: 'CONT', label: '•))) BEEP', reading: '0.001', unit: 'Ω OK', angle: 180 },
  { id: 'AMP', label: 'mA ⎓', reading: '42.80', unit: 'mA', angle: 225 },
  { id: 'OFF', label: 'OFF', reading: '---', unit: '', angle: 0 },
];

export const DigitalMultimeter: React.FC<DigitalMultimeterProps> = ({
  className = '',
  onInteract,
}) => {
  const [currentModeIndex, setCurrentModeIndex] = useState<number>(0); // Default to DCV (5.0V Arduino rail)
  const [isHold, setIsHold] = useState<boolean>(false);
  const [backlight, setBacklight] = useState<boolean>(true);

  const activeMode = MODES[currentModeIndex];

  const handleDialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const nextIndex = (currentModeIndex + 1) % MODES.length;
    setCurrentModeIndex(nextIndex);
    if (onInteract) {
      const mode = MODES[nextIndex];
      onInteract(`MULTIMETER [${mode.label}]: Reading = ${mode.reading} ${mode.unit}`);
    }
  };

  const handleHoldToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setIsHold(!isHold);
    if (onInteract) {
      onInteract(isHold ? 'MULTIMETER: HOLD RELEASED' : 'MULTIMETER: DATA HOLD ACTIVE');
    }
  };

  const handleBacklightToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setBacklight(!backlight);
  };

  return (
    <div
      onClick={handleDialClick}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 ${className}`}
      title="Digital Multimeter DT-830D • Click dial to change mode (DCV / ACV / Ω / Continuity / mA)"
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#facc15] text-[7.5px] font-mono font-bold rounded border border-[#facc15] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
        DMM: {activeMode.label} • Click to switch test probe
      </div>

      {/* Multimeter Body Container */}
      <div className="relative w-28 sm:w-32 bg-[#eab308] border-3 border-[#1c1d21] rounded-xl p-2 shadow-[4px_4px_0px_#1c1d21] flex flex-col items-center">
        
        {/* Top Rubber Grip Bumper Accent */}
        <div className="w-16 h-1.5 bg-[#1c1d21] rounded-full -mt-1 mb-1.5 opacity-80" />

        {/* Model Brand Header */}
        <div className="w-full flex items-center justify-between px-0.5 mb-1 text-[6.5px] font-mono font-black text-[#1c1d21]">
          <span className="bg-[#1c1d21] text-[#facc15] px-1 py-0.2 rounded-xs">ECE-830D</span>
          <span className="tracking-tighter">TRUE RMS</span>
        </div>

        {/* Digital LCD Screen (Backlit Retro Green / Amber) */}
        <div
          className={`w-full border-2 border-[#1c1d21] rounded-xs p-1 flex flex-col justify-between shadow-inner transition-colors ${
            activeMode.id === 'OFF'
              ? 'bg-[#4b5563] text-gray-400'
              : backlight
              ? 'bg-[#86efac] text-[#064e3b]'
              : 'bg-[#bbf7d0] text-[#14532d]'
          }`}
          style={{ height: '38px' }}
        >
          {/* LCD Indicators Bar */}
          <div className="flex items-center justify-between text-[6px] font-mono font-bold leading-none">
            <span className="flex items-center gap-0.5">
              {isHold && <span className="bg-[#064e3b] text-white px-0.5 rounded-xs text-[5px]">HOLD</span>}
              <span>AUTO</span>
            </span>
            <span>{activeMode.unit}</span>
          </div>

          {/* 7-Segment Digital Readout */}
          <div className="text-right font-mono font-black text-sm sm:text-base tracking-widest leading-none pr-0.5">
            {activeMode.reading}
          </div>
        </div>

        {/* Hold & Backlight Buttons Bar */}
        <div className="w-full flex items-center justify-between gap-1.5 mt-1.5 mb-1 px-1">
          <button
            onClick={handleHoldToggle}
            className={`flex-1 py-0.5 text-[6px] font-mono font-black border border-[#1c1d21] rounded-xs shadow-xs transition-colors ${
              isHold ? 'bg-[#ef4444] text-white' : 'bg-[#1c1d21] text-[#facc15] hover:bg-black'
            }`}
          >
            HOLD
          </button>
          <button
            onClick={handleBacklightToggle}
            className={`flex-1 py-0.5 text-[6px] font-mono font-black border border-[#1c1d21] rounded-xs shadow-xs transition-colors ${
              backlight ? 'bg-[#22c55e] text-[#1c1d21]' : 'bg-[#1c1d21] text-gray-300 hover:bg-black'
            }`}
          >
            LIGHT
          </button>
        </div>

        {/* Rotary Range Selector Dial */}
        <div className="relative my-1 w-16 h-16 rounded-full bg-[#1c1d21] border-2 border-[#1c1d21] flex items-center justify-center shadow-md">
          {/* Circular Mode Labels around Dial */}
          <span className="absolute top-0.5 text-[5.5px] font-mono font-bold text-white">OFF</span>
          <span className="absolute right-1 text-[5.5px] font-mono font-bold text-[#67e8f9]">V⎓</span>
          <span className="absolute bottom-1 text-[5.5px] font-mono font-bold text-[#fde047]">Ω</span>
          <span className="absolute left-1 text-[5.5px] font-mono font-bold text-[#f472b6]">mA</span>

          {/* Inner Rotating Knob */}
          <div
            className="w-10 h-10 rounded-full bg-[#374151] border-2 border-[#9ca3af] flex items-center justify-center transition-transform duration-200"
            style={{ transform: `rotate(${activeMode.angle}deg)` }}
          >
            {/* Pointer notch indicator */}
            <div className="w-1 h-4 bg-[#ef4444] rounded-full -mt-4 border border-black/50" />
            <div className="w-3 h-3 rounded-full bg-[#1c1d21]" />
          </div>
        </div>

        {/* Probe Input Jacks (COM, V/Ω/mA, 10A) */}
        <div className="w-full flex items-center justify-around mt-1 pt-1 border-t border-[#1c1d21]/30">
          {/* 10A Jack */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#dc2626] border-2 border-[#1c1d21] flex items-center justify-center shadow-inner">
              <div className="w-1 h-1 rounded-full bg-[#1c1d21]" />
            </div>
            <span className="text-[5px] font-mono font-bold text-[#1c1d21]">10A</span>
          </div>

          {/* COM Jack (Black Ground with inserted black probe) */}
          <div className="flex flex-col items-center relative">
            <div className="w-3 h-3 rounded-full bg-[#1c1d21] border-2 border-[#1c1d21] flex items-center justify-center shadow-inner">
              <div className="w-1 h-1 rounded-full bg-[#4b5563]" />
            </div>
            <span className="text-[5px] font-mono font-bold text-[#1c1d21]">COM</span>
          </div>

          {/* V/Ω Jack (Red Probe inserted) */}
          <div className="flex flex-col items-center relative">
            <div className="w-3 h-3 rounded-full bg-[#dc2626] border-2 border-[#1c1d21] flex items-center justify-center shadow-inner">
              <div className="w-1 h-1 rounded-full bg-[#1c1d21]" />
            </div>
            <span className="text-[5px] font-mono font-bold text-[#1c1d21]">VΩmA</span>
          </div>
        </div>

        {/* Bottom Hardware Tag Badge */}
        <div className="mt-1.5 -mb-3 bg-[#0284c7] text-white px-2 py-0.5 border-2 border-[#1c1d21] rounded-xs font-mono text-[6.5px] font-black shadow-[2px_2px_0px_#1c1d21]">
          DIGITAL MULTIMETER
        </div>
      </div>

      {/* Realistic Curled Test Leads (Red & Black Wires with Sharp Probe Tips) */}
      <div className="absolute -bottom-6 -left-3 pointer-events-none z-10">
        <svg width="140" height="40" viewBox="0 0 140 40" fill="none">
          {/* Black Wire curling toward board */}
          <path
            d="M58 4 C50 18, 30 22, 12 16 C4 13, 2 24, 8 32"
            stroke="#1c1d21"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Black Probe Needle Tip */}
          <path d="M8 32 L4 36" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Red Wire curling toward board */}
          <path
            d="M82 4 C90 18, 110 20, 126 14 C134 11, 136 24, 130 32"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Red Probe Needle Tip */}
          <path d="M130 32 L134 36" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
