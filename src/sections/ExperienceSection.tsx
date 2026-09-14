import React from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { Layers, MapPin, Calendar, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  data: PortfolioData;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data }) => {
  return (
    <section id="experience" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            05 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            EXPERIENCE.LOG
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [INTERNSHIPS, RESEARCH &amp; LEADERSHIP RECORDS]
          </span>
        </div>

        <RetroWindow
          title="PROFESSIONAL_RECORDS_REGISTRY"
          subtitle="FILTER: ALL VERIFIED RECORDS"
          icon={<Layers className="w-4 h-4 text-[#f7c815]" />}
          variant="system"
          statusInfo="TOTAL RECORDS: 6 • VERIFIED INDUSTRY ENGAGEMENTS"
        >
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 sm:p-5 shadow-[4px_4px_0px_#1c1d21] hover:-translate-y-0.5 transition-transform"
              >
                {/* Record Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1c1d21] pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-['Press_Start_2P'] text-[9px] px-2 py-0.5 bg-[#2067e8] text-white border border-[#1c1d21]">
                      {exp.id}
                    </span>
                    <span className="font-black text-sm text-[#1c1d21] font-mono">
                      {exp.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-black border border-[#1c1d21]">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1 text-gray-700 font-mono font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#2067e8]" />
                      {exp.year}
                    </span>
                  </div>
                </div>

                {/* Role and Location */}
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <h3 className="text-base sm:text-lg font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600 font-mono font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#ef4444]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed mb-3 font-medium">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-1.5 bg-[#fcf9f0] p-3.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] mb-3">
                  <div className="text-[10px] font-black font-mono text-[#2067e8] uppercase tracking-wider mb-1">
                    KEY OUTCOMES &amp; DELIVERABLES
                  </div>
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                      <ChevronRight className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5 stroke-[3]" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies used */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-[#1c1d21] font-mono font-black uppercase mr-1">TECH:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#ede4d0] text-gray-900 text-[10px] font-mono font-bold border border-[#1c1d21]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};
