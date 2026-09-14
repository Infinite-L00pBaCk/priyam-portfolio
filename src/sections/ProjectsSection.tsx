import React, { useState } from 'react';
import { Project } from '../types';
import { 
  FolderGit2, Terminal, Cpu, Shield, ArrowUpRight, 
  Layers, ExternalLink, Github, Filter, Sparkles 
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Embedded & IoT', 'Web & Systems', 'AI & ML', 'Robotics & Hardware', 'C++ Systems'];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedFilter);

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'circuit':
        return <Cpu className="w-4 h-4 text-[#f7c815]" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-cyan-300" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-[#4ade80]" />;
      default:
        return <Terminal className="w-4 h-4 text-white" />;
    }
  };

  const headerColors = [
    'bg-[#2067e8] text-white',
    'bg-[#e11d48] text-white',
    'bg-[#16a34a] text-white',
    'bg-[#9333ea] text-white',
    'bg-[#ea580c] text-white',
    'bg-[#0891b2] text-white',
  ];

  return (
    <section id="projects" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#1c1d21] pb-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              04 //
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
              PROJECT_ARCHIVE
            </h2>
            <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
              [SYSTEM REPOSITORIES &amp; HARDWARE]
            </span>
          </div>

          {/* Filter Pills in retro comic buttons */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound();
                    setSelectedFilter(cat);
                  }}
                  className={`px-3 py-1 text-[11px] font-mono font-bold border-2 border-[#1c1d21] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#f7c815] text-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] -translate-y-0.5'
                      : 'bg-[#ffffff] text-gray-800 hover:bg-[#ffe359] shadow-xs'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredProjects.map((project, idx) => {
            const headerClass = headerColors[idx % headerColors.length];

            return (
              <div
                key={project.id}
                className="bg-[#fffdf7] border-3 border-[#1c1d21] shadow-[5px_5px_0px_#1c1d21] flex flex-col justify-between hover:-translate-y-1 transition-all group"
              >
                {/* Window Header */}
                <div className={`${headerClass} px-3 py-2 flex items-center justify-between select-none border-b-3 border-[#1c1d21]`}>
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="shrink-0">{getProjectIcon(project.iconType)}</span>
                    <span className="font-mono text-xs font-black tracking-wider truncate">
                      {project.codeName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-black/30 text-white font-bold border border-white/40">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Window Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#fffdf7]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#2067e8] font-black uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 bg-[#ede4d0] border border-[#1c1d21] text-[10px] font-bold">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 group-hover:text-[#2067e8] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-700 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed line-clamp-3 font-medium">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-[#f5ecdc] text-gray-900 text-[10px] font-mono font-bold border border-[#1c1d21] shadow-[1px_1px_0px_#1c1d21]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Controls */}
                  <div className="mt-5 pt-3 border-t-2 border-[#1c1d21] flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        onSelectProject(project);
                      }}
                      className="px-3.5 py-1.5 bg-[#f7c815] hover:bg-[#ffd92e] text-[#1c1d21] text-xs font-mono font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>[ VIEW SPECS ]</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playClickSound()}
                          className="px-2.5 py-1.5 bg-[#1c1d21] hover:bg-black text-white border-2 border-[#1c1d21] text-xs flex items-center gap-1.5 font-mono font-bold shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                          title={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-3.5 h-3.5 text-[#f7c815]" />
                          <span className="text-[11px]">[ GITHUB REPO ]</span>
                          <ExternalLink className="w-3 h-3 text-gray-300" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playClickSound()}
                          className="px-2 py-1.5 bg-[#22c55e] hover:bg-[#16a34a] text-white border-2 border-[#1c1d21] text-xs flex items-center gap-1 font-mono font-bold shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">LIVE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
