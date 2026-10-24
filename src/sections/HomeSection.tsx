import React from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { 
  FolderGit2, User, Send, ArrowRight, 
  Terminal, Cpu, Award, Sparkles, Download, Check
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface HomeSectionProps {
  data: PortfolioData;
  onNavigate: (sectionId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ data, onNavigate }) => {
  return (
    <section id="home" className="w-full pt-16 sm:pt-20 pb-12 sm:pb-16 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        
        {/* Main Hero Window */}
        <div className="relative">
          {/* Playful Stickers on window corner */}
          <div className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-1.5">
            <span className="px-2.5 py-1 bg-[#ff548e] text-white border-2 border-[#1c1d21] font-mono text-[9px] font-black rotate-3 shadow-[2px_2px_0px_#1c1d21]">
              ★ 2026 EDITION
            </span>
            <span className="w-7 h-7 rounded-full bg-[#f7c815] border-2 border-[#1c1d21] flex items-center justify-center font-black text-xs text-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              :)
            </span>
          </div>

          <RetroWindow
            title="PRIYAM_SYSTEM_SHELL.EXE"
            subtitle="ONLINE • HOST: VIT_BHOPAL"
            icon={<Terminal className="w-4 h-4 text-[#f7c815]" />}
            variant="system"
            statusInfo="SYSTEM STATUS: ONLINE • CIRCUITS & CODE ACTIVE"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f7c815] text-[#1c1d21] border-2 border-[#1c1d21] text-xs font-black shadow-[2px_2px_0px_#1c1d21]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-ping" />
                  <span>ELECTRONICS &amp; COMMUNICATION • 2024-2028</span>
                </div>

                <div className="space-y-4 pt-2 pb-1">
                  <div className="text-xs sm:text-sm font-mono font-black text-[#ea580c] tracking-widest uppercase">
                    ★ WELCOME TO THE SYSTEM ★
                  </div>
                  <h1 className="leading-tight py-2">
                    <span className="retro-groovy-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl block tracking-normal pb-3 sm:pb-4">
                      Priyam Prakash
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight block mt-4 sm:mt-5">
                      ELECTRONICS &amp; SYSTEMS ENGINEER
                    </span>
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-[#2067e8] font-bold tracking-wide uppercase mt-2">
                    ► {data.specialization}
                  </p>
                </div>

                <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] max-w-2xl font-medium">
                  {data.tagline} {data.bio}
                </p>

                {/* Colorful Physical-feeling Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      onNavigate('projects');
                    }}
                    id="hero-explore-projects-btn"
                    className="px-5 py-2.5 bg-[#2067e8] hover:bg-[#1853bf] text-white font-mono text-xs font-black border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-2 transition-all"
                  >
                    <FolderGit2 className="w-4 h-4 text-[#f7c815]" />
                    <span>[ EXPLORE PROJECTS ]</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      onNavigate('profile');
                    }}
                    id="hero-about-btn"
                    className="px-5 py-2.5 bg-[#f7c815] hover:bg-[#eab308] text-[#1c1d21] font-mono text-xs font-black border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-2 transition-all"
                  >
                    <User className="w-4 h-4 text-[#1c1d21]" />
                    <span>[ ABOUT ME ]</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      onNavigate('contact');
                    }}
                    id="hero-contact-btn"
                    className="px-5 py-2.5 bg-[#ff548e] hover:bg-[#ff3b7c] text-white font-mono text-xs font-black border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>[ GET IN TOUCH ]</span>
                  </button>
                </div>
              </div>

              {/* Right Terminal / Stats Box in Electric Cobalt Blue */}
              <div className="lg:col-span-4 bg-[#14234b] border-3 border-[#1c1d21] p-4 text-gray-100 text-xs font-mono rounded-none shadow-[5px_5px_0px_#1c1d21]">
                <div className="flex items-center justify-between border-b-2 border-blue-400/40 pb-2 mb-3">
                  <span className="text-[#f7c815] font-black tracking-wider">SYSTEM_REGISTERS</span>
                  <span className="text-[10px] text-cyan-200">VIT_BHOPAL</span>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  <div className="flex justify-between border-b border-blue-800/60 pb-1">
                    <span className="text-gray-300">CGPA:</span>
                    <span className="font-black text-[#f7c815]">8.38 / 10.0</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-800/60 pb-1">
                    <span className="text-gray-300">INTERNSHIPS:</span>
                    <span className="font-black text-[#4ade80]">5 High-Impact</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-800/60 pb-1">
                    <span className="text-gray-300">ORGANIZATION:</span>
                    <span className="font-bold text-cyan-300">IIT Ropar VLED Lab</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-800/60 pb-1">
                    <span className="text-gray-300">COMMUNITY:</span>
                    <span className="font-bold text-pink-300">Gen Sec, Cisco Club</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">HONOR:</span>
                    <span className="font-black text-amber-300">HackSecure Winner</span>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t-2 border-blue-400/30 text-[10px] text-cyan-200 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                  <span>Hardware Firmware &amp; Full-Stack Web Ready</span>
                </div>
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* 4 Colorful Collectible Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {data.quickStats.map((stat, idx) => {
            const cardThemes = [
              { bg: 'bg-[#fef9c3]', border: 'border-[#1c1d21]', text: 'text-[#854d0e]' },
              { bg: 'bg-[#e0f2fe]', border: 'border-[#1c1d21]', text: 'text-[#0369a1]' },
              { bg: 'bg-[#dcfce7]', border: 'border-[#1c1d21]', text: 'text-[#15803d]' },
              { bg: 'bg-[#ffe4e6]', border: 'border-[#1c1d21]', text: 'text-[#be123c]' },
            ];
            const theme = cardThemes[idx % cardThemes.length];

            return (
              <div
                key={idx}
                className={`p-3.5 ${theme.bg} border-3 ${theme.border} shadow-[4px_4px_0px_#1c1d21] flex flex-col justify-between hover:-translate-y-1 transition-transform`}
              >
                <div className={`text-[10px] font-black uppercase tracking-wider font-mono ${theme.text}`}>
                  {stat.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-950 font-['Plus_Jakarta_Sans',sans-serif] my-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-gray-800 font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
