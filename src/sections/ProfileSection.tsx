import React from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { ProfilePhotoPolaroid } from '../components/ProfilePhotoPolaroid';
import { User, GraduationCap, Heart, Terminal, MapPin, Mail, Phone, Github, Linkedin, CheckCircle2, Star } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ProfileSectionProps {
  data: PortfolioData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ data }) => {
  return (
    <section id="profile" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            02 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            PROFILE.DAT
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [IDENTIFICATION &amp; ACADEMIC RECORD]
          </span>
        </div>

        <RetroWindow
          title="IDENTITY_DESCRIPTOR // PRIYAM_PRAKASH"
          subtitle="READ-ONLY FILE"
          icon={<User className="w-4 h-4 text-[#f7c815]" />}
          variant="system"
          statusInfo="RECORD VERIFIED • VIT BHOPAL B.TECH (ECE)"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Polaroid Photo Badge & Direct Contact */}
            <div className="md:col-span-4 space-y-4">
              {/* Polaroid Photo Badge */}
              <ProfilePhotoPolaroid
                name="PRIYAM PRAKASH"
                institution="VIT BHOPAL"
                specialization="ECE"
                statusText="STATUS: B.TECH (2024 – 2028)"
                batchText="Class of 2028 • Bhopal, India"
              />

              {/* Quick Communication Ports */}
              <div className="bg-[#fffdf7] border-3 border-[#1c1d21] p-3 space-y-2 text-xs shadow-[4px_4px_0px_#1c1d21]">
                <div className="font-black font-mono text-[#1c1d21] border-b-2 border-[#1c1d21] pb-1 flex items-center justify-between">
                  <span>COMMUNICATION PORTS</span>
                  <span className="text-[10px] text-[#16a34a]">ACTIVE</span>
                </div>
                <a
                  href={`mailto:${data.social.email}`}
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 text-gray-800 hover:text-[#2067e8] font-bold truncate transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2067e8] shrink-0" />
                  <span className="truncate">{data.social.email}</span>
                </a>
                <a
                  href={`tel:${data.social.phone}`}
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 text-gray-800 hover:text-[#16a34a] font-bold truncate transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                  <span>{data.social.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-gray-700 font-bold truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
                  <span>{data.social.location}</span>
                </div>
                
                <div className="pt-2 border-t-2 border-[#1c1d21] flex items-center gap-2">
                  <a
                    href={data.social.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    className="flex-1 py-1.5 text-center bg-[#1c1d21] text-white text-[11px] font-black border-2 border-[#1c1d21] hover:bg-black shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    GitHub
                  </a>
                  <a
                    href={data.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    className="flex-1 py-1.5 text-center bg-[#2067e8] text-white text-[11px] font-black border-2 border-[#1c1d21] hover:bg-[#1853bf] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Education, Interests */}
            <div className="md:col-span-8 space-y-4">
              {/* Biography */}
              <div className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21]">
                <div className="text-xs font-black font-mono text-[#2067e8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#2067e8]" />
                  <span>SYSTEM OVERVIEW // BIOGRAPHY</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                  {data.bio}
                </p>
              </div>

              {/* Education Box */}
              <div className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21]">
                <div className="text-xs font-black font-mono text-[#16a34a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#16a34a]" />
                  <span>EDUCATION &amp; ACADEMICS</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-black text-sm sm:text-base text-gray-950 font-['Plus_Jakarta_Sans',sans-serif]">
                      {data.education.institution}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
                      {data.education.gpa}
                    </span>
                  </div>
                  <div className="text-xs text-[#2067e8] font-black">
                    {data.education.degree} in {data.education.specialization} ({data.education.period})
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Location: {data.education.location}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-[#1c1d21] space-y-1.5">
                  {data.education.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests Grid */}
              <div className="bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21]">
                <div className="text-xs font-black font-mono text-[#a855f7] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>CORE TECHNICAL INTERESTS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.interests.map((interest, idx) => {
                    const colors = ['bg-[#fef9c3]', 'bg-[#e0f2fe]', 'bg-[#dcfce7]', 'bg-[#ffe4e6]', 'bg-[#f3e8ff]', 'bg-[#ffedd5]'];
                    const color = colors[idx % colors.length];

                    return (
                      <div
                        key={idx}
                        className={`p-2 ${color} border-2 border-[#1c1d21] text-xs text-gray-900 font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center gap-2 shadow-[2px_2px_0px_#1c1d21]`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1c1d21] shrink-0" />
                        <span>{interest}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};
