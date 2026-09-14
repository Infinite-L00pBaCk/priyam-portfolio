import React, { useState, useEffect, useMemo } from 'react';
import { playClickSound, playWindowOpenSound, playBootBeep, playKeySound } from '../utils/sound';
import { ArduinoBoard } from './ArduinoBoard';
import { RaspberryPiBoard } from './RaspberryPiBoard';
import { HardwareSpecsModal, HardwareType } from './HardwareSpecsModal';
import { CrtMonitorOS } from './CrtMonitorOS';
import { GanpatiIllustration } from './GanpatiIllustration';
import { DigitalMultimeter } from './DigitalMultimeter';
import { Breadboard } from './Breadboard';
import { SolderingStation } from './SolderingStation';
import { DigitalOscilloscope } from './DigitalOscilloscope';
import { WorkbenchTools } from './WorkbenchTools';
import { CopaCCan } from './CopaCCan';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface RetroDeskEnvironmentProps {
  onEnterSystem: () => void;
  crtEnabled: boolean;
  onToggleCRT?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const BOOT_STAGES = [
  { progress: 10, text: "CHECKING MEMORY: 640KB BASE OK, 64MB EXT OK" },
  { progress: 28, text: "INITIALIZING HARDWARE INTERRUPTS & TIMERS..." },
  { progress: 48, text: "DETECTING ATMEGA328P & BCM2711 PERIPHERALS..." },
  { progress: 68, text: "MOUNTING /DEV/PORTFOLIO (VIT ECE ARCHIVES)..." },
  { progress: 85, text: "LOADING EMBEDDED C++ KERNEL & SCHEMATICS..." },
  { progress: 100, text: "SYSTEM READY // 100% OPERATIONAL" }
];

export const RetroDeskEnvironment: React.FC<RetroDeskEnvironmentProps> = ({
  onEnterSystem,
  crtEnabled,
  onToggleCRT,
  onNavigateToSection,
}) => {
  const [turboMhz, setTurboMhz] = useState(33);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hardware Modal state
  const [activeHardwareModal, setActiveHardwareModal] = useState<HardwareType | null>(null);
  const [isArduinoBlinking, setIsArduinoBlinking] = useState(true);

  // Live Date State synced to current day
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Interactive Boot Sequence State inside CRT Screen
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessageIndex, setBootMessageIndex] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Monitor Display Mode: 'boot' vs 'desktop' (inner portfolio)
  const [monitorScreenState, setMonitorScreenState] = useState<'boot' | 'desktop'>('boot');

  // Update date periodically (every minute)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Run automated boot sequence when desk loads
  useEffect(() => {
    // Initial startup sound chime
    const soundTimer = setTimeout(() => {
      playBootBeep();
    }, 300);

    // Increment boot progress
    const bootInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setIsBootComplete(true);
          return 100;
        }
        // Adaptive step for realistic retro feel
        const step = prev < 30 ? 4 : prev < 75 ? 6 : 8;
        const next = Math.min(100, prev + step);
        if (next >= 100) {
          setIsBootComplete(true);
        }
        return next;
      });
    }, 85);

    return () => {
      clearTimeout(soundTimer);
      clearInterval(bootInterval);
    };
  }, []);

  // Update boot message based on progress
  useEffect(() => {
    for (let i = BOOT_STAGES.length - 1; i >= 0; i--) {
      if (bootProgress >= BOOT_STAGES[i].progress) {
        setBootMessageIndex(i);
        break;
      }
    }
  }, [bootProgress]);

  // Toast feedback helper
  const showToast = (message: string) => {
    playClickSound();
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleTurbo = () => {
    playClickSound();
    const nextSpeed = turboMhz === 33 ? 66 : 33;
    setTurboMhz(nextSpeed);
    showToast(`TURBO SPEED: ${nextSpeed} MHz (${nextSpeed === 66 ? 'OVERCLOCKED' : 'STANDARD'})`);
  };

  const handleToggleCrt = () => {
    playClickSound();
    if (onToggleCRT) {
      onToggleCRT();
      showToast(`CRT SCANLINE EMULATION: ${!crtEnabled ? 'ACTIVE' : 'OFF'}`);
    }
  };

  // Replay Boot Sequence
  const handleRestartBoot = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playBootBeep();
    setMonitorScreenState('boot');
    setBootProgress(0);
    setBootMessageIndex(0);
    setIsBootComplete(false);
    showToast('REBOOTING PRIYAM_OS SYSTEM...');

    const bootInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setIsBootComplete(true);
          return 100;
        }
        const step = prev < 30 ? 4 : prev < 75 ? 6 : 8;
        const next = Math.min(100, prev + step);
        if (next >= 100) {
          setIsBootComplete(true);
        }
        return next;
      });
    }, 85);
  };

  // Enter Monitor Desktop inside CRT
  const handleEnterMonitorScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWindowOpenSound();
    setMonitorScreenState('desktop');
    showToast('ENTERING PRIYAM_OS DESKTOP...');
  };

  // Expand into Full Portfolio Page View
  const handleEnterFullPortfolio = () => {
    setIsTransitioning(true);
    playWindowOpenSound();
    setTimeout(() => {
      onEnterSystem();
    }, 450);
  };

  // Segmented Progress calculation (20 blocks)
  const totalBlocks = 20;
  const filledBlocks = Math.round((bootProgress / 100) * totalBlocks);

  // Calendar Calculation memoized for current month
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed
    const todayDate = currentDate.getDate();

    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const monthName = monthNames[month];

    // First day of current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Number of days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Number of days in previous month
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: Array<{ day: number; isCurrentMonth: boolean; isToday: boolean }> = [];

    // Previous month tail days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        isToday: d === todayDate,
      });
    }

    // Next month starting days to complete 5 weeks (35 cells)
    const remaining = 35 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({
        day: d,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return {
      year,
      monthName,
      todayDate,
      cells,
      dateFormatted: currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
    };
  }, [currentDate]);

  return (
    <div
      id="retro-desk-frontpage"
      className={`relative min-h-screen w-full bg-[#e8a317] overflow-x-hidden select-none transition-all duration-500 font-sans ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #cf8c07 2px, transparent 2px),
          linear-gradient(to bottom, #cf8c07 2px, transparent 2px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          id="retro-toast-banner"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#1c1d21] text-[#facc15] border-3 border-[#facc15] rounded-xs font-mono text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#000000] animate-bounce pointer-events-none text-center"
        >
          {toastMessage}
        </div>
      )}

      {/* Hardware Specs Modal Dialog (when clicking Arduino or Raspberry Pi) */}
      {activeHardwareModal && (
        <HardwareSpecsModal
          type={activeHardwareModal}
          onClose={() => setActiveHardwareModal(null)}
          onNavigateToProjects={(sectionId) => {
            setActiveHardwareModal(null);
            if (onNavigateToSection && sectionId) {
              onNavigateToSection(sectionId);
            } else {
              onEnterSystem();
            }
          }}
          onToggleArduinoBlink={() => setIsArduinoBlinking(!isArduinoBlinking)}
          isArduinoBlinking={isArduinoBlinking}
        />
      )}

      {/* ==================================================================== */}
      {/* 1. TOP BACKGROUND WALL: TROPICAL SKYLINE WINDOW (TOP RIGHT)          */}
      {/* ==================================================================== */}
      <div className="relative w-full flex items-start justify-end pointer-events-none mb-2 sm:mb-0">
        {/* --- TROPICAL WINDOW (TOP RIGHT) --- */}
        <div
          onClick={() => showToast('Sunny tropical day outside the engineering lab!')}
          className="pointer-events-auto relative border-l-4 border-b-4 border-[#1c1d21] overflow-hidden shadow-[4px_4px_0px_rgba(28,29,33,0.3)] z-0 select-none cursor-pointer"
          title="Window View"
          style={{
            width: '380px',
            height: '210px',
            background: 'linear-gradient(180deg, #1d78ea 0%, #258bf7 100%)',
          }}
        >
          {/* Subtle horizontal sky stripes / scanlines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* White Cartoon Cloud */}
          <div className="absolute top-5 left-3 sm:left-6 z-10">
            <svg viewBox="0 0 110 55" className="w-16 sm:w-22 md:w-26 drop-shadow-xs">
              <path
                d="M10,42 Q0,42 5,30 Q8,15 28,18 Q40,6 60,14 Q74,4 86,20 Q105,18 100,34 Q106,42 92,42 Z"
                fill="#ffffff"
                stroke="#1c1d21"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Distant Blue Cityscape / Skyline Blocks */}
          <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 flex items-end justify-start gap-1 sm:gap-2 px-2 z-10">
            <div className="w-5 sm:w-7 h-6 sm:h-8 bg-[#2563eb] border-t-2 border-r-2 border-l-2 border-[#1c1d21]" />
            <div className="w-6 sm:w-9 h-7 sm:h-10 bg-[#1d4ed8] border-t-2 border-r-2 border-l-2 border-[#1c1d21]" />
            <div className="w-7 sm:w-11 h-9 sm:h-12 bg-[#1e40af] border-t-2 border-r-2 border-l-2 border-[#1c1d21]" />
            <div className="w-6 sm:w-8 h-6 sm:h-9 bg-[#2563eb] border-t-2 border-r-2 border-l-2 border-[#1c1d21]" />
            <div className="w-8 sm:w-12 h-8 sm:h-11 bg-[#1d4ed8] border-t-2 border-r-2 border-l-2 border-[#1c1d21]" />
          </div>

          {/* Cascading Green Palm Leaf Frond from Top-Right */}
          <div className="absolute -top-3 -right-2 z-20 pointer-events-none">
            <svg width="180" height="200" viewBox="0 0 180 200" fill="none" className="w-28 sm:w-38 md:w-48 h-auto">
              <path d="M180,0 Q110,60 25,150" stroke="#1c1d21" strokeWidth="4" strokeLinecap="round" />
              <path d="M180,0 Q110,60 25,150" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
              {[
                "M180,15 Q120,25 70,45 Q120,40 180,15",
                "M170,35 Q105,50 45,75 Q110,65 170,35",
                "M160,55 Q95,75 25,105 Q95,90 160,55",
                "M150,75 Q85,100 10,135 Q85,115 150,75",
                "M135,95 Q75,125 15,170 Q75,145 135,95",
                "M120,115 Q70,150 35,190 Q75,165 120,115",
                "M165,25 Q130,65 85,95 Q135,70 165,25",
                "M150,45 Q120,85 75,120 Q120,95 150,45"
              ].map((dStr, idx) => (
                <path
                  key={idx}
                  d={dStr}
                  fill="#22c55e"
                  stroke="#1c1d21"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. SYMMETRICAL RETRO-TECH DESK COMPOSITION                           */}
      {/*    LEFT FLANK (INSTRUMENTS) | CENTER (CRT MONITOR) | RIGHT FLANK     */}
      {/* ==================================================================== */}
      <div className="relative z-20 mx-auto -mt-12 sm:-mt-16 md:-mt-20 w-full max-w-[1480px] px-3 sm:px-6 lg:px-8 flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 xl:gap-8">
        
        {/* ================================================================== */}
        {/* --- LEFT SIDE: CALENDAR + SCOPE + ESD TOOLS + ARDUINO + SOLDER --- */}
        {/* ================================================================== */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-5 z-30 order-2 xl:order-1 shrink-0 w-full xl:w-auto">
          
          {/* Upper-Left: September 2026 Calendar & DSO-150 Scope Stacked */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-5 w-full">
            {/* September 2026 Wall Calendar */}
            <div
              onClick={() => showToast(`Today: ${calendarData.dateFormatted}`)}
              className="bg-[#faf8f5] border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] px-2.5 pt-2 pb-2 cursor-pointer hover:-translate-y-0.5 transition-transform flex flex-col justify-between"
              style={{
                width: '165px',
                height: '160px',
              }}
              title={`Wall Calendar • ${calendarData.dateFormatted}`}
            >
              {/* 6 Top Spiral Rings */}
              <div className="flex justify-between px-1 -mt-4 mb-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-2.5 h-3.5 bg-[#374151] rounded-full border-2 border-[#1c1d21]" />
                    <div className="w-1.5 h-1 bg-[#1c1d21] rounded-full -mt-0.5" />
                  </div>
                ))}
              </div>

              {/* Calendar Header: Year and PRIYAM */}
              <div className="flex items-center justify-between text-[8px] font-mono font-bold text-gray-800 border-b border-gray-200 pb-0.5 px-0.5">
                <span>{calendarData.year}</span>
                <span className="text-[#dc2626] font-black text-[7px] tracking-wider">PRIYAM</span>
              </div>

              {/* Big Bold Red Month */}
              <div className="text-center font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#dc2626] leading-none my-0.5 tracking-tight">
                {calendarData.monthName}
              </div>

              {/* Days Grid: S M T W T F S with live calendar cells dynamically rendered */}
              <div className="grid grid-cols-7 gap-y-0.5 text-center text-[6.5px] font-mono font-bold text-gray-800 leading-tight">
                <span className="text-gray-700">S</span>
                <span className="text-gray-700">M</span>
                <span className="text-gray-700">T</span>
                <span className="text-gray-700">W</span>
                <span className="text-gray-700">T</span>
                <span className="text-gray-700">F</span>
                <span className="text-gray-700">S</span>

                {calendarData.cells.map((cell, idx) => {
                  if (cell.isToday) {
                    return (
                      <span
                        key={idx}
                        className="flex items-center justify-center"
                        title={`Today: ${cell.day}`}
                      >
                        <span className="w-[16px] h-[16px] rounded-full border-2 border-[#1d4ed8] bg-[#dbeafe] text-[#1d4ed8] font-black flex items-center justify-center text-[6.5px] leading-none shadow-xs scale-105">
                          {cell.day}
                        </span>
                      </span>
                    );
                  }

                  return (
                    <span
                      key={idx}
                      className={`flex items-center justify-center h-[16px] ${
                        cell.isCurrentMonth ? 'text-gray-900 font-bold' : 'text-gray-400 font-normal'
                      }`}
                    >
                      {cell.day}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* DSO-150 Mini Scope (Live animated phosphor waveforms) */}
            <div className="relative z-30">
              <DigitalOscilloscope
                onInteract={(msg) => showToast(msg)}
              />
            </div>
          </div>

          {/* Mid-Left: ESD Tools & Arduino Uno Stacked / Paired */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full">
            {/* Blue ESD Tools Box / Mat with Plato 170 Cutters & Tweezers */}
            <div className="relative z-30">
              <WorkbenchTools
                onInteract={(msg) => showToast(msg)}
              />
            </div>

            {/* Arduino UNO R3 Microcontroller Board */}
            <div className="relative z-30">
              <ArduinoBoard
                onClick={() => setActiveHardwareModal('arduino')}
                isBlinking={isArduinoBlinking}
              />
            </div>
          </div>

          {/* Bottom-Left: Soldering Kit [350°C] with Solder Spool & Iron */}
          <div className="relative z-30 self-center xl:self-start mt-1">
            <SolderingStation
              onInteract={(msg) => showToast(msg)}
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* --- CENTER: MAIN BEIGE CRT MONITOR HOUSING (EXACT CENTER) -------- */}
        {/* ================================================================== */}
        <div className="w-full max-w-[96%] sm:max-w-[580px] md:max-w-[660px] flex flex-col items-center order-1 xl:order-2 shrink-0">
          
          {/* --- TOP PILL STICKER: P R I Y A M --- */}
          <div
            onClick={() => showToast('PRIYAM: Embedded Engineer & Systems Architect!')}
            className="relative -mb-3.5 sm:-mb-4 z-30 px-3.5 py-1 bg-[#1c1d21] border-2 border-[#1c1d21] rounded-full shadow-[3px_3px_0px_#1c1d21] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
            title="PRIYAM Badge"
          >
            {[
              { ch: 'P', bg: 'bg-[#831843]' },
              { ch: 'R', bg: 'bg-[#d97706]' },
              { ch: 'I', bg: 'bg-[#059669]' },
              { ch: 'Y', bg: 'bg-[#0284c7]' },
              { ch: 'A', bg: 'bg-[#7c3aed]' },
              { ch: 'M', bg: 'bg-[#db2777]' },
            ].map((item, idx) => (
              <span
                key={idx}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${item.bg} text-white font-['Press_Start_2P'] text-[7px] sm:text-[9px] flex items-center justify-center font-bold border border-white/40`}
              >
                {item.ch}
              </span>
            ))}
          </div>

          {/* --- MONITOR BEZEL CASING --- */}
          <div
            className="relative w-full bg-[#ede5d6] border-4 border-[#1c1d21] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 shadow-[6px_6px_0px_#1c1d21]"
            style={{ width: '660px', maxWidth: '100%' }}
          >
            {/* Top-Right Bezel Sticker: Purple Star */}
            <div
              onClick={() => showToast('Purple Star Sticker ★')}
              className="absolute top-2.5 right-3.5 w-4 h-4 text-[#9333ea] cursor-pointer hover:rotate-12 transition-transform drop-shadow-xs"
              title="Purple Star"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="#1c1d21" strokeWidth="2">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </div>

            {/* Inner Dark Screen Housing */}
            <div className="w-full bg-[#20232a] border-3 border-[#1c1d21] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 overflow-hidden">
              {/* CRT Display Container (Retro Blue #1546bd / #0000aa theme) */}
              <div
                className={`relative w-full h-[265px] sm:h-[305px] md:h-[335px] bg-[#1546bd] rounded-lg overflow-hidden border-2 border-[#1c1d21] flex flex-col justify-between text-white ${
                  crtEnabled ? 'crt-screen-overlay' : ''
                }`}
              >
                {/* CRT Scanline filter effect */}
                {crtEnabled && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20 opacity-40"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                )}

                {monitorScreenState === 'desktop' ? (
                  /* Interactive OS Desktop View inside CRT monitor */
                  <CrtMonitorOS
                    onExpandFullPortfolio={handleEnterFullPortfolio}
                    onReboot={handleRestartBoot}
                  />
                ) : (
                  /* Interactive Boot Sequence inside CRT monitor */
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 sm:p-3">
                    
                    {/* CRT Top Status Bar */}
                    <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-cyan-200 px-1 border-b border-blue-400/30 pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block animate-pulse" />
                        <span className="font-bold tracking-wider">PRIYAM_OS 2026.1</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-cyan-300 font-bold">VIT-BHOPAL</span>
                        
                        {/* Reboot Button */}
                        <button
                          onClick={handleRestartBoot}
                          className="flex items-center gap-1 px-1.5 py-0.5 bg-[#1e40af] hover:bg-[#2563eb] text-cyan-200 hover:text-white border border-cyan-400/40 rounded-xs text-[7px] sm:text-[8px] font-mono cursor-pointer transition-colors"
                          title="Replay OS Boot sequence"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>REBOOT</span>
                        </button>

                        <span className="bg-[#1e40af] border border-cyan-400/40 px-1.5 py-0.5 rounded-xs text-[8px] font-bold text-[#facc15]">
                          {bootProgress}%
                        </span>
                      </div>
                    </div>

                    {/* CRT Center Content: Interactive Boot Sequence */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-1">
                      
                      {/* 3D Isometric Pixel PORTFOLIO Title */}
                      <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px]">
                        <svg viewBox="0 0 540 60" className="w-full h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                          {/* Layer 1: Dark Navy 3D Extrusion */}
                          <text
                            x="50%"
                            y="42"
                            textAnchor="middle"
                            fontFamily="'Press Start 2P', monospace"
                            fontSize="36"
                            fontWeight="900"
                            fill="#0e2363"
                            dx="4"
                            dy="4"
                          >
                            PORTFOLIO
                          </text>
                          {/* Layer 2: Sky Blue Extrusion */}
                          <text
                            x="50%"
                            y="42"
                            textAnchor="middle"
                            fontFamily="'Press Start 2P', monospace"
                            fontSize="36"
                            fontWeight="900"
                            fill="#38bdf8"
                            dx="2"
                            dy="2"
                          >
                            PORTFOLIO
                          </text>
                          {/* Layer 3: Solid Black Outline */}
                          <text
                            x="50%"
                            y="42"
                            textAnchor="middle"
                            fontFamily="'Press Start 2P', monospace"
                            fontSize="36"
                            fontWeight="900"
                            fill="#1c1d21"
                            stroke="#1c1d21"
                            strokeWidth="6"
                            strokeLinejoin="miter"
                          >
                            PORTFOLIO
                          </text>
                          {/* Layer 4: Pure White Front Face */}
                          <text
                            x="50%"
                            y="42"
                            textAnchor="middle"
                            fontFamily="'Press Start 2P', monospace"
                            fontSize="36"
                            fontWeight="900"
                            fill="#ffffff"
                          >
                            PORTFOLIO
                          </text>
                        </svg>
                      </div>

                      {/* Subtitle */}
                      <div className="text-[7px] sm:text-[9px] md:text-[10px] font-mono font-bold text-cyan-200 tracking-widest mt-0.5 uppercase">
                        ELECTRONICS &amp; COMMUNICATION ENGINEERING
                      </div>

                      {/* Live Diagnostic Boot Stage Message */}
                      <div className="text-[7px] sm:text-[8px] md:text-[9px] font-mono font-bold text-cyan-300 mt-1.5 h-4 flex items-center justify-center">
                        <span className="text-yellow-300 mr-1">&gt;</span>
                        <span className="truncate max-w-[280px] sm:max-w-[400px]">
                          {BOOT_STAGES[bootMessageIndex]?.text || "BOOTING PRIYAM_OS..."}
                        </span>
                      </div>

                      {/* Segmented Yellow Loading Progress Bar (20 Blocks) */}
                      <div className="flex items-center justify-center gap-1 sm:gap-1.5 font-mono text-base sm:text-lg font-black text-[#facc15] select-none mt-1 sm:mt-1.5">
                        <span className="text-lg sm:text-xl font-black leading-none">[</span>
                        <div className="flex gap-0.5 sm:gap-1 items-center bg-black/40 p-0.5 sm:p-1 border border-[#facc15]/50 rounded-xs">
                          {[...Array(totalBlocks)].map((_, i) => (
                            <span
                              key={i}
                              className={`w-1.5 sm:w-2 md:w-2.5 h-3 sm:h-3.5 md:h-4 transition-all duration-75 ${
                                i < filledBlocks
                                  ? 'bg-[#facc15] border-r border-[#ca8a04]/60 shadow-[0_0_4px_rgba(250,204,21,0.5)]'
                                  : 'bg-[#1e293b]/60 border-r border-black/40'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg sm:text-xl font-black leading-none">]</span>
                      </div>

                      {/* System Status Label */}
                      <div className="mt-1 flex items-center gap-1 text-[7px] sm:text-[9px] font-['Press_Start_2P'] tracking-wider text-center font-bold">
                        {isBootComplete ? (
                          <span className="text-[#4ade80] flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block" />
                            SYSTEM READY // ALL MODULES ONLINE
                          </span>
                        ) : (
                          <span className="text-[#67e8f9] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] inline-block animate-ping" />
                            LOADING SYSTEM KERNEL ({bootProgress}%)
                          </span>
                        )}
                      </div>

                      {/* Main Interactive Button: [ ENTER SYSTEM ] */}
                      <div className="mt-2 sm:mt-2.5 relative z-30">
                        <button
                          onClick={handleEnterMonitorScreen}
                          id="crt-enter-system-btn"
                          className={`relative z-30 pointer-events-auto px-6 sm:px-8 py-1.5 sm:py-2 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs sm:text-sm font-black border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer tracking-wider transition-all uppercase hover:-translate-y-0.5 ${
                            isBootComplete
                              ? 'ring-2 ring-yellow-300 ring-offset-2 ring-offset-blue-900 animate-bounce'
                              : 'opacity-90'
                          }`}
                        >
                          [ ENTER SYSTEM ]
                        </button>
                      </div>
                    </div>

                    {/* CRT Bottom Windows 95 Style Taskbar */}
                    <div className="relative z-10 bg-[#0e308c] border-t border-blue-400/30 px-2 sm:px-3 py-1 flex items-center justify-between text-xs font-mono select-none -mx-2.5 sm:-mx-3 -mb-2.5 sm:-mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Start button */}
                        <div
                          onClick={handleEnterMonitorScreen}
                          className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-[#d1d5db] text-[#1c1d21] border border-[#1c1d21] text-[9px] sm:text-[10px] font-bold shadow-xs cursor-pointer hover:bg-white"
                        >
                          <span className="w-2 h-2 bg-[#ea580c] inline-block" />
                          <span>Start</span>
                        </div>
                        {/* Active tab */}
                        <div className="px-2 sm:px-2.5 py-0.5 bg-[#1e40af] text-cyan-200 border border-blue-400/40 text-[9px] sm:text-[10px] font-bold">
                          Porto_OS
                        </div>
                      </div>

                      <div className="text-[9px] sm:text-[10px] text-cyan-200 font-bold font-mono flex items-center gap-2">
                        <span>RAM: 640KB</span>
                        <span className="text-yellow-400">VIT ECE</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lower Bezel Controls & Stickers */}
            <div className="pt-2 sm:pt-2.5 px-1 sm:px-2 flex items-center justify-between text-xs select-none">
              {/* Left: Model text with red square indicator */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#dc2626] border border-[#1c1d21] inline-block shrink-0" />
                <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] font-black text-[#1c1d21] tracking-tight">
                  VIT 2026-Electronics and Communication Engineering
                </span>
              </div>

              {/* Right: CRT: ON toggle pill + two circular dials */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handleToggleCrt}
                  id="crt-toggle-btn"
                  className="px-2.5 py-0.5 bg-[#ffffff] hover:bg-[#facc15] text-[#1c1d21] font-mono text-[8px] sm:text-[9px] font-black border-2 border-[#1c1d21] rounded-full shadow-[1px_1px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  title="Toggle CRT scanline filter"
                >
                  CRT: {crtEnabled ? 'ON' : 'OFF'}
                </button>

                {/* Rotary Dials */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#9ca3af] border-2 border-[#1c1d21] flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-[#1c1d21]" />
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#9ca3af] border-2 border-[#1c1d21] flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-[#1c1d21]" />
                </div>
              </div>
            </div>

            {/* Bottom-Left Overlapping Sticker: Yellow Smiley + EMBEDDED SYSTEMS tag */}
            <div
              onClick={() => showToast('Specialization: Embedded Systems & C++ Architecture!')}
              className="absolute -bottom-4 left-4 z-30 flex items-center cursor-pointer hover:scale-105 transition-transform"
              title="Embedded Systems"
            >
              {/* Yellow Smiley Face */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#facc15] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] flex items-center justify-center relative z-10">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5">
                  <circle cx="8" cy="9" r="1.5" fill="#1c1d21" />
                  <circle cx="16" cy="9" r="1.5" fill="#1c1d21" />
                  <path
                    d="M7 13.5 C9 18, 15 18, 17 13.5"
                    fill="none"
                    stroke="#1c1d21"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Orange Tag - tilted 2deg */}
              <div className="px-2 py-0.5 bg-[#ea580c] text-white font-mono text-[8px] sm:text-[9px] font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] -ml-1 -rotate-2">
                EMBEDDED SYSTEMS
              </div>
            </div>

            {/* Bottom-Right Sticker: Purple Smiley Face */}
            <div
              onClick={() => showToast('Retro Vibes: Active & Smiling!')}
              className="absolute -bottom-3.5 right-10 z-30 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#a855f7] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              title="Purple Smiley"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                <circle cx="8" cy="9" r="1.5" fill="#ffffff" />
                <circle cx="16" cy="9" r="1.5" fill="#ffffff" />
                <path
                  d="M7 13.5 C9 18, 15 18, 17 13.5"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* --- DESKTOP CPU UNIT (UNDER MONITOR) --- */}
          <div
            className="bg-[#ede5d6] border-4 border-[#1c1d21] border-t-0 rounded-b-xl sm:rounded-b-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-[6px_6px_0px_#1c1d21] flex items-center justify-between relative z-10"
            style={{ width: '680px', maxWidth: '100%' }}
          >
            {/* Floppy Drive Bay & Cooling Vents */}
            <div className="flex-1 flex flex-col gap-1.5 pr-4 select-none">
              {/* Taped Yellow Label: C++ / ROBOTICS centered over drive slot */}
              <div className="self-center -mt-4 mb-0.5">
                <div
                  onClick={() => showToast('Skill Stack: C++ & Robotics hardware!')}
                  className="relative px-3 py-0.5 bg-[#facc15] text-[#1c1d21] font-mono text-[8px] sm:text-[9px] font-black border border-[#1c1d21] shadow-xs cursor-pointer"
                >
                  <span className="absolute -left-1.5 -top-1 w-3 h-3 bg-white/60 -rotate-12 border border-black/20 pointer-events-none" />
                  <span className="absolute -right-1.5 -top-1 w-3 h-3 bg-white/60 rotate-12 border border-black/20 pointer-events-none" />
                  C++ / ROBOTICS
                </div>
              </div>

              {/* Recessed Floppy Slot */}
              <div
                onClick={handleRestartBoot}
                className="w-full h-3.5 bg-[#1c1d21] rounded-xs flex items-center justify-end px-2 cursor-pointer gap-1.5"
                title="Floppy Drive A: Click to reload OS"
              >
                <span className="w-2 h-1 bg-[#22c55e] rounded-xs animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
              </div>

              {/* Horizontal Cooling Lines */}
              <div className="w-full space-y-0.5">
                <div className="w-full h-0.5 bg-[#1c1d21] rounded-full" />
                <div className="w-full h-0.5 bg-[#1c1d21] rounded-full" />
              </div>
            </div>

            {/* Right Controls: PWR / TURBO, 33 MHz & Red Push Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-[7px] sm:text-[8px] font-mono font-bold text-gray-700 leading-none">
                  PWR / TURBO
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#16a34a] leading-tight">
                  {turboMhz} MHz
                </span>
              </div>

              {/* Red Push Button */}
              <button
                onClick={handleToggleTurbo}
                id="cpu-turbo-button"
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#dc2626] hover:bg-[#b91c1c] active:bg-[#991b1b] border-2 border-[#1c1d21] rounded-md shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center transition-all"
                title="Toggle Turbo Clock Speed"
              >
                <span className="w-2.5 h-2.5 rounded-full border border-red-900 bg-red-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* --- RIGHT SIDE: BREADBOARD + MULTIMETER + PI 4B + GANESHA + SODA -- */}
        {/* ================================================================== */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-5 z-30 order-3 shrink-0 w-full xl:w-auto">
          
          {/* Upper-Right: Solderless Breadboard & Digital Multimeter (Mirroring Calendar & Scope) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-5 w-full">
            {/* Solderless Breadboard with Multicolor Jumpers */}
            <div className="relative z-30">
              <Breadboard
                onInteract={(msg) => showToast(msg)}
              />
            </div>

            {/* ECE-839D True RMS Digital Multimeter */}
            <div className="relative z-30 self-center sm:self-end">
              <DigitalMultimeter
                onInteract={(msg) => showToast(msg)}
              />
            </div>
          </div>

          {/* Mid-Right: Raspberry Pi 4B & Cute Lord Ganesha (Mirroring ESD Tools & Arduino) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full">
            {/* Raspberry Pi 4 Model B Single-Board Computer */}
            <div className="relative z-30">
              <RaspberryPiBoard
                onClick={() => setActiveHardwareModal('raspberry-pi')}
              />
            </div>

            {/* Cute Lord Ganesha Illustration on Desk */}
            <div className="relative z-30 flex flex-col items-center justify-center">
              <GanpatiIllustration
                onClick={() => showToast('ॐ Shree Ganeshay Namah • Wisdom, Engineering & Good Fortune!')}
              />
            </div>
          </div>

          {/* Bottom-Right: DL BESOK! Sticky Note, Floppy Disk & Copa-C Drink Can at Bottom-Right Corner */}
          <div className="relative z-30 self-center xl:self-end flex items-end justify-center gap-3 sm:gap-4 mt-1">
            {/* Sticky Notes & Floppy Disk */}
            <div className="relative flex flex-col items-center">
              {/* Pink Post-It Note */}
              <div
                onClick={() => showToast('DL BESOK: IIT Ropar Log, ESP32 PWM, Coffee >> Code')}
                className="w-18 sm:w-20 bg-[#ff548e] border-2 border-[#1c1d21] p-1.5 rotate-3 shadow-[3px_3px_0px_#1c1d21] cursor-pointer hover:rotate-0 transition-transform z-20 flex flex-col justify-between"
                title="DL BESOK Note"
              >
                <div className="font-mono text-[7.5px] sm:text-[8.5px] font-black text-[#1c1d21] border-b border-[#1c1d21]/30 pb-0.5 mb-0.5">
                  DL BESOK!
                </div>
                <div className="text-[5.5px] sm:text-[6.5px] font-mono text-gray-900 font-bold space-y-0.5 leading-tight">
                  <div>• IIT Ropar Log</div>
                  <div>• ESP32 PWM</div>
                  <div>• Coffee &gt;&gt; Code</div>
                </div>
              </div>

              {/* 3.5" Black Floppy Disk */}
              <div
                onClick={handleRestartBoot}
                className="w-16 sm:w-18 h-16 sm:h-18 bg-[#1c1d21] border-2 border-[#1c1d21] p-1 -rotate-6 shadow-[3px_3px_0px_#1c1d21] flex flex-col justify-between -mt-5 sm:-mt-6 cursor-pointer hover:scale-105 transition-transform"
                title="Floppy Disk • Click to reload OS"
              >
                <div className="w-6 h-3.5 bg-[#9ca3af] border border-[#1c1d21] mx-auto rounded-xs" />
                <div className="bg-[#fef08a] border border-[#1c1d21] p-0.5 font-mono font-black text-[#1c1d21]">
                  <div className="text-[5.5px] sm:text-[6.5px] leading-tight">PRIYAM_OS</div>
                  <div className="text-[4.5px] text-gray-700">v3.8_BOOT</div>
                </div>
              </div>
            </div>

            {/* Copa-C Retro 330ml Ice Cold Soda Can */}
            <div className="relative z-30">
              <CopaCCan
                onInteract={(msg) => showToast(msg)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. BOTTOM CENTER: SKIP PILL & FOOTER TEXT                            */}
      {/* ==================================================================== */}
      <div className="relative z-30 w-full flex flex-col items-center justify-center gap-1.5 pb-4 pt-6 select-none">
        {/* Skip into Full Portfolio Pill Button */}
        <button
          onClick={handleEnterFullPortfolio}
          id="skip-to-portfolio-pill"
          className="px-5 sm:px-7 py-1.5 sm:py-2 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs sm:text-sm font-bold border-2 border-[#1c1d21] rounded-full shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer hover:-translate-y-0.5 transition-all"
        >
          <span className="underline decoration-[#1c1d21] underline-offset-4">
            Skip into Full Portfolio &rarr;
          </span>
        </button>

        {/* Footer Credit Line */}
        <div className="text-[8px] sm:text-[10px] md:text-xs font-mono font-bold text-gray-900 tracking-wider text-center px-2">
          PRIYAM PRAKASH • VIT BHOPAL B.TECH ECE • CLICK [ ENTER SYSTEM ] OR EXPLORE ARDUINO &amp; PI BOARDS
        </div>
      </div>
    </div>
  );
};
