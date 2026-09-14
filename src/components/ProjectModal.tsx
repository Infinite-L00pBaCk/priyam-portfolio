import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, Cpu, CheckCircle2, AlertTriangle, Lightbulb, Terminal, ArrowUpRight } from 'lucide-react';
import { playClickSound, playWindowOpenSound, playWindowCloseSound } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [loadingStep, setLoadingStep] = useState(true);

  useEffect(() => {
    if (project) {
      playWindowOpenSound();
      setLoadingStep(true);
      const timer = setTimeout(() => {
        setLoadingStep(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    playWindowCloseSound();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-[#fffdf7] border-4 border-[#1c1d21] shadow-[8px_8px_0px_#1c1d21] flex flex-col font-['Space_Mono',monospace] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Header with Electric Blue and Yellow Accents */}
        <div className="bg-[#2067e8] text-white px-3 py-2.5 flex items-center justify-between select-none border-b-3 border-[#1c1d21]">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-3 h-3 rounded-full bg-[#f7c815] border border-black inline-block shrink-0" />
            <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[#f7c815] truncate">
              {project.codeName}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#ffffff] text-[#1c1d21] text-[9px] font-bold border border-[#1c1d21]">
              {project.status}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClose}
              aria-label="Close project window"
              className="w-6 h-6 bg-[#ef4444] hover:bg-[#dc2626] text-white border-2 border-[#1c1d21] flex items-center justify-center cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Loading State or Content */}
        {loadingStep ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-3 bg-[#fffdf7] text-center">
            <div className="font-['Press_Start_2P'] text-xs text-[#2067e8] animate-pulse">
              INITIALIZING {project.codeName}...
            </div>
            <div className="w-48 h-4 bg-[#ede4d0] border-2 border-[#1c1d21] p-0.5">
              <div className="h-full bg-[#f7c815] animate-pulse w-3/4" />
            </div>
            <span className="text-xs text-gray-700 font-mono font-bold">Mounting schematic registers</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#fffdf7] space-y-5 text-gray-900">
            {/* Project Title and Meta */}
            <div className="border-b-3 border-[#1c1d21] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
                <span className="px-2 py-0.5 bg-[#f7c815] text-[#1c1d21] font-mono font-black border border-[#1c1d21] uppercase text-[11px]">
                  {project.category} • {project.year}
                </span>
                <span className="px-2 py-0.5 bg-[#ede4d0] border border-[#1c1d21] text-[10px] font-bold">
                  ID: {project.id}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 mt-1">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-gray-800 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                {project.shortDescription}
              </p>

              {/* Metrics Chips */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#dbeafe] text-[#1e40af] border-2 border-[#1c1d21] text-xs font-mono font-black shadow-[2px_2px_0px_#1c1d21] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb]" />
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview Section */}
            <div>
              <h3 className="text-xs font-black font-mono uppercase tracking-wider text-gray-800 flex items-center gap-1.5 mb-2">
                <Terminal className="w-3.5 h-3.5 text-[#2067e8]" />
                <span>OVERVIEW &amp; OBJECTIVE</span>
              </h3>
              <div className="p-3.5 bg-[#fcf9f0] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] text-sm text-gray-800 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                {project.overview}
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 bg-[#fef2f2] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
                <div className="flex items-center gap-1.5 text-xs font-black font-mono text-[#991b1b] uppercase mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>THE PROBLEM</span>
                </div>
                <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                  {project.problem}
                </p>
              </div>

              <div className="p-3.5 bg-[#f0fdf4] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
                <div className="flex items-center gap-1.5 text-xs font-black font-mono text-[#166534] uppercase mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>THE SOLUTION</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xs font-black font-mono uppercase tracking-wider text-gray-800 mb-2">
                KEY ARCHITECTURAL FEATURES
              </h3>
              <div className="bg-[#fcf9f0] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] p-3 space-y-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800 font-['Plus_Jakarta_Sans',sans-serif]">
                    <span className="font-mono font-black text-[#2067e8] text-xs shrink-0 mt-0.5">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Breakdown */}
            <div>
              <h3 className="text-xs font-black font-mono uppercase tracking-wider text-gray-800 mb-2">
                TECHNOLOGY IMPLEMENTATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#ffffff] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] flex flex-col justify-between"
                  >
                    <span className="font-mono text-xs font-black text-[#2067e8]">
                      {tech.name}
                    </span>
                    <span className="text-[11px] text-gray-700 mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {tech.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Learnings */}
            <div className="p-3.5 bg-[#fefce8] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] text-xs sm:text-sm space-y-2">
              <div>
                <span className="font-black font-mono text-[#854d0e] uppercase">CHALLENGE: </span>
                <span className="text-amber-950 font-['Plus_Jakarta_Sans',sans-serif]">{project.challenges}</span>
              </div>
              <div className="border-t border-amber-300 pt-2">
                <span className="font-black font-mono text-[#854d0e] uppercase">SYSTEM LEARNING: </span>
                <span className="text-amber-950 font-['Plus_Jakarta_Sans',sans-serif]">{project.learnings}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-3 bg-[#ede4d0] border-t-3 border-[#1c1d21] flex flex-wrap items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="px-3 py-1.5 bg-[#1c1d21] hover:bg-black text-white font-mono text-xs font-bold flex items-center gap-1.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
              >
                <Github className="w-3.5 h-3.5 text-[#f7c815]" />
                <span>[ GITHUB REPO ]</span>
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="px-3 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-mono text-xs font-bold flex items-center gap-1.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>[ LIVE DEMO ]</span>
              </a>
            )}
          </div>

          <button
            onClick={handleClose}
            className="px-4 py-1.5 bg-[#ffffff] hover:bg-[#f7c815] text-[#1c1d21] border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] text-xs font-mono font-black cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            CLOSE WINDOW [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
