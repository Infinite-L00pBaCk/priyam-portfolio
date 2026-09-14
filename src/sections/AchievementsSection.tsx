import React from 'react';
import { PortfolioData } from '../types';
import { Trophy, ShieldCheck } from 'lucide-react';

interface AchievementsSectionProps {
  data: PortfolioData;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ data }) => {
  return (
    <section id="achievements" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            07 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            ACHIEVEMENT_ARCHIVE
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [AWARDS, HACKATHONS &amp; VERIFIED CERTIFICATIONS]
          </span>
        </div>

        {/* Featured Shaastra IIT Madras Award */}
        <div className="bg-[#f7c815] border-3 border-[#1c1d21] p-4 sm:p-5 shadow-[6px_6px_0px_#1c1d21] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 bg-[#1c1d21] text-[#f7c815] flex items-center justify-center shrink-0 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#1c1d21] text-[#f7c815] font-['Press_Start_2P'] text-[8px] font-black">
                  HACK_001
                </span>
                <span className="text-xs font-black text-[#1c1d21] font-mono">
                  SHAASTRA 2026 • IIT MADRAS
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950">
                3rd Place Winner – HackSecure Hackathon
              </h3>
              <p className="text-xs sm:text-sm text-gray-900 mt-1 font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                Recognized at IIT Madras' flagship annual technical festival among national-level collegiate engineering competitors.
              </p>
            </div>
          </div>

          <div className="shrink-0 px-3 py-1.5 bg-[#ffffff] text-[#1c1d21] border-2 border-[#1c1d21] text-xs font-mono font-black tracking-wider shadow-[2px_2px_0px_#1c1d21]">
            NATIONAL HONORS ★
          </div>
        </div>

        {/* Collectible Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.achievements.map((ach) => (
            <div
              key={ach.id}
              className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21] flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#1c1d21] pb-2 mb-2.5">
                  <span className="font-['Press_Start_2P'] text-[9px] px-2 py-0.5 bg-[#2067e8] text-white border border-[#1c1d21]">
                    {ach.code}
                  </span>
                  <span className="text-[10px] font-mono text-gray-700 font-black">
                    {ach.year}
                  </span>
                </div>

                <div className="text-[11px] font-mono font-black text-[#2067e8] uppercase mb-1">
                  {ach.organization}
                </div>

                <h4 className="text-sm font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 leading-snug">
                  {ach.title}
                </h4>

                <p className="text-xs text-gray-700 mt-2 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed font-medium">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#1c1d21] flex items-center justify-between text-[10px] text-gray-700 font-mono">
                {ach.verificationId ? (
                  <span className="flex items-center gap-1 text-[#16a34a] font-black truncate pr-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span className="truncate">ID: {ach.verificationId}</span>
                  </span>
                ) : (
                  <span className="text-gray-600 font-bold">TYPE: {ach.type}</span>
                )}
                <span className="px-2 py-0.5 bg-[#f7c815] text-[#1c1d21] border border-[#1c1d21] shrink-0 font-black">
                  {ach.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
