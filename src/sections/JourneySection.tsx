import React from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { Clock, Terminal, ChevronRight, Award, Briefcase, GraduationCap, Users } from 'lucide-react';

interface JourneySectionProps {
  data: PortfolioData;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ data }) => {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Award':
        return { icon: <Award className="w-3.5 h-3.5 text-[#1c1d21]" />, bg: 'bg-[#f7c815]' };
      case 'Internship':
        return { icon: <Briefcase className="w-3.5 h-3.5 text-white" />, bg: 'bg-[#2067e8]' };
      case 'Community':
      case 'Leadership':
        return { icon: <Users className="w-3.5 h-3.5 text-white" />, bg: 'bg-[#ff548e]' };
      default:
        return { icon: <GraduationCap className="w-3.5 h-3.5 text-white" />, bg: 'bg-[#16a34a]' };
    }
  };

  return (
    <section id="journey" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            03 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            JOURNEY.LOG
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [CHRONOLOGICAL SYSTEM EVENTS &amp; MILESTONES]
          </span>
        </div>

        <RetroWindow
          title="SYSTEM_EVENT_TIMELINE // 2024 - PRESENT"
          subtitle="AUDIT TRAIL"
          icon={<Clock className="w-4 h-4 text-[#f7c815]" />}
          variant="system"
          statusInfo="LOG INTEGRITY: 100% • ALL MILESTONES VERIFIED"
        >
          <div className="space-y-6">
            <div className="bg-[#14234b] p-3 text-cyan-200 text-xs border-2 border-[#1c1d21] shadow-[3px_3px_0px_#1c1d21] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#f7c815]" />
                <span className="font-bold">CAT /SYS/LOGS/ENGINEERING_PROGRESSION.TXT</span>
              </div>
              <span className="text-[10px] text-yellow-300 font-black">VIT_BHOPAL</span>
            </div>

            {/* Timeline Log Entries */}
            <div className="relative pl-6 sm:pl-8 border-l-3 border-[#1c1d21] space-y-6">
              {data.journey.map((item, idx) => {
                const theme = getCategoryTheme(item.category);

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline node icon */}
                    <div className={`absolute -left-[32px] sm:-left-[40px] top-1.5 w-7 h-7 rounded-full ${theme.bg} border-2 border-[#1c1d21] flex items-center justify-center shadow-[2px_2px_0px_#1c1d21]`}>
                      {theme.icon}
                    </div>

                    {/* Log Record Box */}
                    <div className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21] hover:-translate-y-0.5 transition-transform">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1c1d21] pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#2067e8] text-white font-['Press_Start_2P'] text-[9px] border border-[#1c1d21]">
                            {item.year}
                          </span>
                          {item.quarter && (
                            <span className="px-2 py-0.5 bg-[#f7c815] text-[#1c1d21] text-[10px] font-mono font-black border border-[#1c1d21]">
                              {item.quarter}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-gray-600 font-bold">
                            [{item.systemLogCode}]
                          </span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#f5ecdc] text-[#1c1d21] text-[10px] font-black border border-[#1c1d21] uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed font-medium">
                        {item.description}
                      </p>

                      {item.details && item.details.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-300 space-y-1">
                          {item.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-1.5 text-xs text-gray-700 font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                              <ChevronRight className="w-3.5 h-3.5 text-[#2067e8] shrink-0 mt-0.5 stroke-[3]" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};
