/**
 * Priyam Prakash | Personal Engineering Portfolio
 * Inspired by retro computer OS aesthetic + modern engineering portfolio depth
 */

import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolio';
import { Project } from './types';
import { RetroDeskEnvironment } from './components/RetroDeskEnvironment';
import { SystemNavbar } from './components/SystemNavbar';
import { ProjectModal } from './components/ProjectModal';
import { HomeSection } from './sections/HomeSection';
import { ProfileSection } from './sections/ProfileSection';
import { JourneySection } from './sections/JourneySection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { LabSection } from './sections/LabSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import { playClickSound, playWindowOpenSound } from './utils/sound';

export default function App() {
  // 'desk' = the full retro desktop environment with vintage computer & boot sequence
  // 'portfolio' = the expanded full professional portfolio website
  const [viewMode, setViewMode] = useState<'desk' | 'portfolio'>('desk');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section on scroll when in portfolio mode
  useEffect(() => {
    if (viewMode !== 'portfolio') return;

    const sections = ['home', 'profile', 'journey', 'projects', 'experience', 'skills', 'achievements', 'lab', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  // Navigate to section
  const handleNavigate = (sectionId: string) => {
    if (viewMode === 'desk') {
      setViewMode('portfolio');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleEnterSystem = () => {
    playWindowOpenSound();
    setViewMode('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToDesk = () => {
    playClickSound();
    setViewMode('desk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ede6d4] text-[#1c1d21] font-['Space_Mono',monospace] selection:bg-[#2563eb] selection:text-white relative">
      {/* Optional Global Scanlines Overlay for CRT mode */}
      {crtEnabled && (
        <div className="fixed inset-0 pointer-events-none z-50 crt-screen-overlay opacity-30" />
      )}

      {/* Main View Router: Desk vs Full Portfolio */}
      {viewMode === 'desk' ? (
        <RetroDeskEnvironment
          onEnterSystem={handleEnterSystem}
          crtEnabled={crtEnabled}
          onToggleCRT={() => setCrtEnabled(!crtEnabled)}
          onNavigateToSection={handleNavigate}
        />
      ) : (
        <div className="min-h-screen flex flex-col">
          {/* Retro OS System Taskbar Navigation */}
          <SystemNavbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onReturnToDesk={handleReturnToDesk}
            crtEnabled={crtEnabled}
            onToggleCRT={() => setCrtEnabled(!crtEnabled)}
          />

          {/* Portfolio Sections */}
          <main className="flex-1">
            <HomeSection data={portfolioData} onNavigate={handleNavigate} />
            <ProfileSection data={portfolioData} />
            <JourneySection data={portfolioData} />
            <ProjectsSection
              projects={portfolioData.projects}
              onSelectProject={(p) => setSelectedProject(p)}
            />
            <ExperienceSection data={portfolioData} />
            <SkillsSection data={portfolioData} />
            <AchievementsSection data={portfolioData} />
            <LabSection data={portfolioData} />
            <ContactSection data={portfolioData} />
          </main>

          {/* Footer */}
          <Footer
            onReturnToDesk={handleReturnToDesk}
            onScrollToTop={handleScrollToTop}
          />
        </div>
      )}

      {/* Detailed Project Window Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

