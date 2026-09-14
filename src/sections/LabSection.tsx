import React from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { FlaskConical, Activity } from 'lucide-react';

interface LabSectionProps {
  data: PortfolioData;
}

export const LabSection: React.FC<LabSectionProps> = ({ data }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#dcfce7] text-[#15803d] border-2 border-[#1c1d21] text-[10px] font-black shadow-[1.5px_1.5px_0px_#1c1d21]">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
            RUNNING
          </span>
        );
      case 'IN PROGRESS':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#dbeafe] text-[#1d4ed8] border-2 border-[#1c1d21] text-[10px] font-black shadow-[1.5px_1.5px_0px_#1c1d21]">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            IN PROGRESS
          </span>
        );
      case 'TESTING':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#f3e8ff] text-[#7e22ce] border-2 border-[#1c1d21] text-[10px] font-black shadow-[1.5px_1.5px_0px_#1c1d21]">
            <span className="w-2 h-2 rounded-full bg-[#9333ea] animate-pulse" />
            TESTING
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#fef9c3] text-[#854d0e] border-2 border-[#1c1d21] text-[10px] font-black shadow-[1.5px_1.5px_0px_#1c1d21]">
            <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse" />
            BUILDING
          </span>
        );
    }
  };

  return (
    <section id="lab" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            08 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            THE LAB
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [ACTIVE PROCESSES &amp; CURRENT EXPERIMENTS]
          </span>
        </div>

        <RetroWindow
          title="DAEMON_TASK_MANAGER // CONCURRENT PROCESSES"
          subtitle="MONITORING"
          icon={<FlaskConical className="w-4 h-4 text-[#f7c815]" />}
          variant="system"
          statusInfo={`CPU BENCH: 12% LOAD • ${data.currentWork.length} ACTIVE THREADS`}
        >
          <div className="space-y-5">
            <div className="text-xs text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] font-medium bg-[#fcf9f0] p-3.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              Real-time feed of current technical builds, ongoing research commits, and engineering challenges happening on Priyam's hardware bench and local worktrees.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.currentWork.map((process) => (
                <div
                  key={process.id}
                  className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 sm:p-5 shadow-[4px_4px_0px_#1c1d21] flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-[#1c1d21] pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-['Press_Start_2P'] text-[9px] text-[#1c1d21] font-black">
                          {process.processId}
                        </span>
                      </div>
                      {getStatusBadge(process.status)}
                    </div>

                    <div className="text-[10px] font-mono text-[#2067e8] font-black uppercase mb-1">
                      {process.category}
                    </div>

                    <h3 className="text-base sm:text-lg font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950">
                      {process.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-800 mt-1.5 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed font-medium">
                      {process.description}
                    </p>

                    {/* Retro Segmented Progress Bar */}
                    <div className="mt-3.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-black text-gray-700 mb-1">
                        <span>PIPELINE PROGRESS</span>
                        <span className="text-[#2067e8]">{process.progressPercent}%</span>
                      </div>
                      <div className="w-full h-4 bg-[#ede4d0] border-2 border-[#1c1d21] p-0.5 shadow-inner">
                        <div
                          className="h-full bg-[#f7c815] border-r-2 border-[#1c1d21] transition-all"
                          style={{ width: `${process.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {process.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#ede4d0] text-gray-900 text-[10px] font-mono font-bold border border-[#1c1d21]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer update */}
                  <div className="mt-4 pt-2 border-t-2 border-[#1c1d21] flex items-center gap-1.5 text-[10px] text-gray-700 font-mono font-bold">
                    <Activity className="w-3.5 h-3.5 text-[#16a34a] shrink-0 stroke-[3]" />
                    <span className="truncate">{process.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};
