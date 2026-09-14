import React, { useState } from 'react';
import { PortfolioData, SkillItem } from '../types';
import { Terminal, Code, Cpu, Wrench, Shield, Layers, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface SkillsSectionProps {
  data: PortfolioData;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { skills } = data;

  const categories = [
    {
      id: 'programming',
      title: 'PROGRAMMING & SYSTEMS',
      icon: <Terminal className="w-4 h-4 text-[#f7c815]" />,
      color: 'bg-[#2067e8] text-white',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-400',
      items: skills.programming || []
    },
    {
      id: 'web',
      title: 'WEB & REACT 19 INTERFACES',
      icon: <Globe className="w-4 h-4 text-cyan-300" />,
      color: 'bg-[#0891b2] text-white',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-400',
      items: skills.web || []
    },
    {
      id: 'electronics',
      title: 'EMBEDDED HARDWARE & PROTOCOLS',
      icon: <Cpu className="w-4 h-4 text-[#4ade80]" />,
      color: 'bg-[#16a34a] text-white',
      badgeColor: 'bg-green-100 text-green-900 border-green-400',
      items: skills.electronics || []
    },
    {
      id: 'tools',
      title: 'DEVELOPER TOOLING & PLATFORMS',
      icon: <Wrench className="w-4 h-4 text-amber-300" />,
      color: 'bg-[#ea580c] text-white',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-400',
      items: skills.tools || []
    },
    {
      id: 'foundations',
      title: 'ARCHITECTURAL FOUNDATIONS',
      icon: <Layers className="w-4 h-4 text-rose-300" />,
      color: 'bg-[#e11d48] text-white',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-400',
      items: skills.foundations || []
    }
  ];

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#1c1d21] pb-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              06 //
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
              SYSTEM_TOOLKIT
            </h2>
            <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
              [INSTALLED LIBRARIES, DRIVERS &amp; HARDWARE SKILLS]
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('all');
              }}
              className={`px-3 py-1 text-[11px] font-mono font-bold border-2 border-[#1c1d21] transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#f7c815] text-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] -translate-y-0.5'
                  : 'bg-[#ffffff] text-gray-800 hover:bg-[#ffe359] shadow-xs'
              }`}
            >
              ALL MODULES
            </button>
            {categories.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(cat.id);
                  }}
                  className={`px-3 py-1 text-[11px] font-mono font-bold border-2 border-[#1c1d21] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#f7c815] text-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] -translate-y-0.5'
                      : 'bg-[#ffffff] text-gray-800 hover:bg-[#ffe359] shadow-xs'
                  }`}
                >
                  {cat.title.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#fffdf7] border-3 border-[#1c1d21] shadow-[5px_5px_0px_#1c1d21] flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className={`${cat.color} px-3 py-2 flex items-center justify-between select-none border-b-3 border-[#1c1d21]`}>
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="font-mono text-xs font-black tracking-wider">
                    {cat.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-black/30 text-white font-bold border border-white/40">
                  {cat.items.length} MODULES
                </span>
              </div>

              {/* Skills Items List */}
              <div className="p-4 sm:p-5 flex-1 space-y-2.5 bg-[#fffdf7]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.items.map((item: SkillItem, iIdx: number) => (
                    <div
                      key={iIdx}
                      className={`p-2.5 border-2 border-[#1c1d21] transition-all shadow-[2px_2px_0px_#1c1d21] ${
                        item.highlight
                          ? 'bg-[#fff9e6] hover:bg-[#ffeec2]'
                          : 'bg-[#fbf7ee] hover:bg-[#f4ebd9]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-bold text-xs text-gray-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-1.5">
                          {item.highlight && (
                            <Sparkles className="w-3 h-3 text-[#f7c815] shrink-0 fill-[#f7c815]" />
                          )}
                          {item.name}
                        </span>
                        {item.highlight && (
                          <span className="px-1.5 py-0.2 bg-[#2067e8] text-white text-[9px] font-mono font-bold border border-[#1c1d21]">
                            CORE
                          </span>
                        )}
                      </div>
                      {item.tag && (
                        <p className="text-[10px] text-gray-600 font-mono mt-1 font-medium truncate">
                          {item.tag}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="px-4 py-2 bg-[#f5ecdc] border-t-2 border-[#1c1d21] flex items-center justify-between text-[10px] font-mono text-gray-700">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                  STATUS: VERIFIED
                </span>
                <span className="font-bold">
                  {cat.items.filter(i => i.highlight).length} CORE SPECIALIZATIONS
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="p-4 sm:p-5 bg-[#ede4d0] border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-black text-sm text-[#1c1d21] font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#2067e8]" />
              HARDWARE &amp; SOFTWARE INTEGRATION PHILOSOPHY
            </h4>
            <p className="text-xs text-gray-700 font-['Plus_Jakarta_Sans',sans-serif] max-w-3xl leading-relaxed">
              Bridging low-level hardware constraints with high-level reactive client architectures — prioritizing strict memory management (RAII), zero-leak firmware, deterministic peripheral timing, and responsive Web Crypto security.
            </p>
          </div>
          <div className="shrink-0 px-3 py-1.5 bg-[#f7c815] text-[#1c1d21] text-xs font-mono font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            VERIFIED_DISCIPLINES: 30+
          </div>
        </div>
      </div>
    </section>
  );
};
