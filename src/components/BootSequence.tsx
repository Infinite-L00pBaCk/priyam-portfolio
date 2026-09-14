import React, { useEffect, useState } from 'react';
import { Play, SkipForward, Volume2, VolumeX, Terminal, CheckCircle2 } from 'lucide-react';
import { playBootBeep, playClickSound, isSoundEnabled, toggleSound } from '../utils/sound';

interface BootSequenceProps {
  onEnterSystem: () => void;
  isCompact?: boolean;
}

const BOOT_MESSAGES = [
  "BOOTING PRIYAM_OS v3.8.2...",
  "CHECKING RAM: 640KB BASE OK, 64MB EXT OK",
  "INITIALIZING HARDWARE INTERRUPTS...",
  "LOADING EMBEDDED KERNEL & SCHEMATICS...",
  "MOUNTING PROJECT ARCHIVES & WORKSPACES...",
  "LOADING INDUSTRY EXPERIENCE RECORDS...",
  "SYNCHRONIZING SYSTEM TOOLKIT & CERTS...",
  "SYSTEM READY // 100%"
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onEnterSystem, isCompact = false }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  useEffect(() => {
    // Startup audio chime
    const timer = setTimeout(() => {
      playBootBeep();
    }, 350);

    // Smooth retro boot progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const step = prev > 60 ? 5 : 3;
        return Math.min(100, prev + step);
      });
    }, 90);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const idx = Math.min(
      BOOT_MESSAGES.length - 1,
      Math.floor((progress / 100) * (BOOT_MESSAGES.length - 1))
    );
    setMessageIndex(idx);
  }, [progress]);

  const handleEnter = () => {
    playClickSound();
    onEnterSystem();
  };

  const handleSkip = () => {
    playClickSound();
    setProgress(100);
    setIsReady(true);
    onEnterSystem();
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
    if (next) playClickSound();
  };

  // Segmented progress bar calculation
  const totalBlocks = 18;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 sm:p-4 bg-[#2067e8] text-[#ffffff] font-['Space_Mono',monospace] select-none overflow-hidden">
      
      {/* Top Header inside CRT (Subtle retro system bar) */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs text-cyan-200 border-b border-blue-400/30 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f7c815] animate-ping" />
          <span className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-white">
            SYS: PRIYAM_OS
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-1 hover:bg-blue-700 rounded text-cyan-200 hover:text-white transition-colors"
            title={soundActive ? "Mute audio" : "Enable audio"}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-blue-300" />}
          </button>
          <button
            onClick={handleSkip}
            className="px-2 py-0.5 bg-blue-800/90 hover:bg-blue-700 text-cyan-200 border border-cyan-400/50 text-[9px] font-mono cursor-pointer rounded-xs"
          >
            SKIP [ESC]
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CENTER: EXACT RETRO "PORTOFOLIO" LOGO & SEGMENTED LOADING BAR  */}
      {/* ============================================================== */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-1 py-2">
        
        {/* SVG Recreation of the iconic chunky geometric block letters from the reference image */}
        <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mb-2 sm:mb-3">
          <svg viewBox="0 0 520 80" className="w-full h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <g fill="#faf5e6" stroke="#1c1d21" strokeWidth="6" strokeLinejoin="miter">
              {/* P */}
              <path d="M10,10 L50,10 L50,45 L32,45 L32,70 L10,70 Z M30,26 L30,33 L32,33 L32,26 Z" fillRule="evenodd" />
              {/* O */}
              <path d="M60,10 L100,10 L100,70 L60,70 Z M78,26 L82,26 L82,54 L78,54 Z" fillRule="evenodd" />
              {/* R */}
              <path d="M110,10 L150,10 L150,45 L138,45 L150,70 L130,70 L122,48 L122,70 L110,70 Z M124,24 L136,24 L136,34 L124,34 Z" fillRule="evenodd" />
              {/* T */}
              <path d="M160,10 L205,10 L205,25 L190,25 L190,70 L175,70 L175,25 L160,25 Z" />
              {/* O */}
              <path d="M215,10 L255,10 L255,70 L215,70 Z M233,26 L237,26 L237,54 L233,54 Z" fillRule="evenodd" />
              {/* F */}
              <path d="M265,10 L305,10 L305,25 L285,25 L285,38 L300,38 L300,50 L285,50 L285,70 L265,70 Z" />
              {/* O */}
              <path d="M315,10 L355,10 L355,70 L315,70 Z M333,26 L337,26 L337,54 L333,54 Z" fillRule="evenodd" />
              {/* L */}
              <path d="M365,10 L385,10 L385,55 L405,55 L405,70 L365,70 Z" />
              {/* I */}
              <path d="M415,10 L435,10 L435,70 L415,70 Z" />
              {/* O */}
              <path d="M445,10 L485,10 L485,70 L445,70 Z M463,26 L467,26 L467,54 L463,54 Z" fillRule="evenodd" />
            </g>
          </svg>

          <div className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-[#f7c815] tracking-widest mt-1">
            PRIYAM PRAKASH • VIT BHOPAL ECE
          </div>
        </div>

        {/* --- EXACT SEGMENTED RETRO PROGRESS BAR FROM IMAGE --- */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mt-1 sm:mt-2">
          {/* Outer cream box with black border */}
          <div className="bg-[#fbf7eb] border-3 border-[#1c1d21] p-1.5 shadow-[3px_3px_0px_rgba(0,0,0,0.4)]">
            {/* Grid of segmented black vertical blocks */}
            <div className="flex gap-1 h-5 sm:h-6 items-center">
              {[...Array(totalBlocks)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full transition-all duration-75 ${
                    i < filledBlocks
                      ? 'bg-[#1c1d21]'
                      : 'bg-[#ded8c4]/40 border-r border-[#ded8c4]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* "LOADING..." Pixel text right underneath bar */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-['Press_Start_2P'] mt-2 px-1">
            <span className="text-[#faf5e6] tracking-wider animate-pulse">
              {isReady ? 'READY!' : 'LOADING...'}
            </span>
            <span className="text-[#f7c815]">{progress}%</span>
          </div>
        </div>

        {/* Action Button after boot completes */}
        <div className="mt-3 sm:mt-4 h-11 flex flex-col items-center justify-center">
          {isReady ? (
            <button
              onClick={handleEnter}
              id="boot-enter-system-btn"
              className="px-5 sm:px-6 py-2 bg-[#f7c815] hover:bg-[#ffdf40] text-[#1c1d21] font-['Press_Start_2P'] text-[10px] sm:text-xs border-3 border-[#1c1d21] shadow-[3px_3px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2 transition-transform animate-bounce"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#1c1d21]" />
              <span>[ ENTER SYSTEM ]</span>
            </button>
          ) : (
            <div className="text-[9px] font-mono text-cyan-200 truncate max-w-[260px] sm:max-w-[340px]">
              {BOOT_MESSAGES[messageIndex]}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM RETRO WINDOWS 95 TASKBAR INSIDE CRT                     */}
      {/* ============================================================== */}
      <div className="bg-[#d4cdbf] border-t-2 border-[#ffffff] border-b border-[#1c1d21] px-1.5 py-1 flex items-center justify-between select-none -mx-2 sm:-mx-4 -mb-2 sm:-mb-4">
        
        {/* Left: Start Button + Active Porto Window Tab */}
        <div className="flex items-center gap-1.5">
          {/* Start button with 4-color Windows flag icon */}
          <button
            onClick={handleEnter}
            className="flex items-center gap-1.5 px-2 py-0.5 bg-[#dcd4c3] text-[#1c1d21] border-2 border-[#ffffff] border-r-[#4a4a4a] border-b-[#4a4a4a] text-[9px] sm:text-[10px] font-bold shadow-xs active:border-inset cursor-pointer"
          >
            {/* 4-color flag */}
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="bg-[#ef4444]" />
              <span className="bg-[#22c55e]" />
              <span className="bg-[#2563eb]" />
              <span className="bg-[#f7c815]" />
            </div>
            <span className="font-mono">Start</span>
          </button>

          {/* Active Window: Porto */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#beb39d] text-[#1c1d21] border-2 border-[#4a4a4a] border-r-[#ffffff] border-b-[#ffffff] text-[9px] sm:text-[10px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#2067e8] inline-block" />
            <span>Porto</span>
          </div>
        </div>

        {/* Right System Tray */}
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#1c1d21] px-1 bg-[#beb39d] border border-[#7a705e] py-0.5">
          <span className="hidden sm:inline">64MB RAM</span>
          <span>12:00 AM</span>
        </div>
      </div>
    </div>
  );
};
