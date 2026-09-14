import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Volume2, VolumeX, Tv, RotateCcw, 
  Terminal, FolderGit2, User, Clock, Award, 
  FlaskConical, Send, Cpu, Layers, Sparkles
} from 'lucide-react';
import { playClickSound, isSoundEnabled, toggleSound } from '../utils/sound';

interface SystemNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReturnToDesk: () => void;
  crtEnabled: boolean;
  onToggleCRT: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: '01 / HOME', short: 'HOME', icon: Terminal, color: 'hover:bg-[#2067e8]' },
  { id: 'profile', label: '02 / PROFILE', short: 'PROFILE', icon: User, color: 'hover:bg-[#ff548e]' },
  { id: 'journey', label: '03 / JOURNEY', short: 'JOURNEY', icon: Clock, color: 'hover:bg-[#f97316]' },
  { id: 'projects', label: '04 / PROJECTS', short: 'PROJECTS', icon: FolderGit2, color: 'hover:bg-[#2067e8]' },
  { id: 'experience', label: '05 / EXPERIENCE', short: 'EXP', icon: Layers, color: 'hover:bg-[#a855f7]' },
  { id: 'skills', label: '06 / SKILLS', short: 'SKILLS', icon: Cpu, color: 'hover:bg-[#22c55e]' },
  { id: 'achievements', label: '07 / RECORDS', short: 'RECORDS', icon: Award, color: 'hover:bg-[#f7c815]' },
  { id: 'lab', label: '08 / LAB', short: 'LAB', icon: FlaskConical, color: 'hover:bg-[#06b6d4]' },
  { id: 'contact', label: '09 / CONTACT', short: 'CONTACT', icon: Send, color: 'hover:bg-[#ef4444]' },
];

export const SystemNavbar: React.FC<SystemNavbarProps> = ({
  activeSection,
  onNavigate,
  onReturnToDesk,
  crtEnabled,
  onToggleCRT,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (id: string) => {
    playClickSound();
    onNavigate(id);
    setMenuOpen(false);
  };

  const handleToggleSound = () => {
    const state = toggleSound();
    setSoundActive(state);
    if (state) playClickSound();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf6ed] border-b-3 border-[#1c1d21] shadow-[0_3px_0px_#1c1d21] font-['Space_Mono',monospace] select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 flex items-center justify-between gap-2">
        {/* Left: Start / System Menu Button & Active Status */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => {
              playClickSound();
              setMenuOpen(!menuOpen);
            }}
            id="system-menu-btn"
            className={`px-3 py-1.5 text-xs font-['Press_Start_2P'] flex items-center gap-1.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] cursor-pointer transition-all ${
              menuOpen 
                ? 'bg-[#e5dfd2] translate-x-0.5 translate-y-0.5 shadow-none' 
                : 'bg-[#f7c815] hover:bg-[#ffe359] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            {/* 4-color flag icon */}
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="bg-[#ef4444]" />
              <span className="bg-[#22c55e]" />
              <span className="bg-[#2563eb]" />
              <span className="bg-[#f7c815]" />
            </div>
            <span className="text-[10px] text-[#1c1d21] font-black">START</span>
          </button>

          {/* Active section breadcrumb with Groovy Priyam Brand */}
          <div className="hidden sm:flex items-center gap-2.5 px-2.5 py-1 bg-[#ffffff] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] text-xs">
            <span className="retro-groovy-text-sm text-sm leading-none tracking-normal">
              Priyam Prakash
            </span>
            <span className="text-gray-400 font-mono font-bold">|</span>
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="font-bold text-[#1c1d21] font-mono text-[11px] uppercase">
              {activeSection.toUpperCase()}.EXE
            </span>
          </div>
        </div>

        {/* Center: Desktop Quick Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1 text-[11px] font-mono tracking-tight transition-all cursor-pointer whitespace-nowrap font-bold border-2 border-[#1c1d21] ${
                  isActive
                    ? 'bg-[#2067e8] text-white shadow-[2px_2px_0px_#1c1d21]'
                    : 'bg-[#ffffff] text-gray-800 hover:bg-[#f7c815] shadow-xs'
                }`}
              >
                {item.short}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls (CRT toggle, Sound toggle, Return to Desk, Clock) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* CRT toggle */}
          <button
            onClick={() => {
              playClickSound();
              onToggleCRT();
            }}
            title={crtEnabled ? "CRT Scanlines: ON" : "CRT Scanlines: OFF"}
            className={`p-1.5 text-xs border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] cursor-pointer ${
              crtEnabled ? 'bg-[#2067e8] text-white' : 'bg-[#ffffff] text-gray-700 hover:bg-[#f7c815]'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? "Sound: ON" : "Sound: OFF"}
            className={`p-1.5 text-xs border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] cursor-pointer ${
              soundActive ? 'bg-[#22c55e] text-white' : 'bg-[#ffffff] text-gray-700 hover:bg-[#f7c815]'
            }`}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Return to Retro Desk Scene */}
          <button
            onClick={() => {
              playClickSound();
              onReturnToDesk();
            }}
            title="Reboot / Return to Retro Desk Scene"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#ff548e] hover:bg-[#ff3b7c] text-white border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] text-xs font-bold cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <RotateCcw className="w-3 h-3 text-white" />
            <span className="text-[10px] font-mono">DESK</span>
          </button>

          {/* Real-time Clock */}
          <div className="hidden sm:block px-2.5 py-1 bg-[#ffffff] border-2 border-[#1c1d21] text-[10px] sm:text-xs font-mono font-black text-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            {timeString || '12:00:00 PM'}
          </div>
        </div>
      </div>

      {/* Start / System Popover Menu */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/30" 
            onClick={() => setMenuOpen(false)} 
          />
          <div className="absolute top-full left-2 sm:left-4 z-50 w-72 sm:w-80 bg-[#faf6ed] border-4 border-[#1c1d21] shadow-[8px_8px_0px_#1c1d21] p-1.5">
            {/* Menu Header Stripe */}
            <div className="bg-[#2067e8] text-white p-3 mb-1.5 flex items-center justify-between border-2 border-[#1c1d21]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#f7c815]" />
                <span className="font-['Press_Start_2P'] text-[10px] tracking-wider text-white">
                  PRIYAM_OS
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#f7c815] font-bold">2026</span>
            </div>

            {/* Nav List */}
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-mono font-bold transition-all cursor-pointer border-2 border-[#1c1d21] ${
                      isActive
                        ? 'bg-[#2067e8] text-white shadow-[2px_2px_0px_#1c1d21]'
                        : 'bg-[#ffffff] text-gray-900 hover:bg-[#f7c815]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="text-[10px]">►</span>}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions in Menu */}
            <div className="border-t-2 border-[#1c1d21] mt-2 pt-2 flex items-center justify-between px-2 text-[10px] font-mono">
              <button
                onClick={() => {
                  playClickSound();
                  onReturnToDesk();
                  setMenuOpen(false);
                }}
                className="text-[#dc2626] hover:underline flex items-center gap-1 font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reboot to Desk</span>
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
