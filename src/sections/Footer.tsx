import React from 'react';
import { RotateCcw, ArrowUp } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface FooterProps {
  onReturnToDesk: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReturnToDesk, onScrollToTop }) => {
  return (
    <footer className="w-full bg-[#f4eee0] border-t-3 border-[#1c1d21] py-8 px-3 sm:px-6 font-['Space_Mono',monospace] text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#1c1d21] pb-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 shrink-0 rounded-none bg-[#f7c815] text-[#1c1d21] flex items-center justify-center font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
              PP
            </div>
            <div className="space-y-2.5">
              <div className="retro-groovy-text-sm text-2xl tracking-normal text-left pb-1">
                Priyam Prakash
              </div>
              <div className="text-xs text-gray-700 font-mono font-medium tracking-tight pt-1">
                VIT Bhopal • B.Tech Electronics &amp; Communication Engineering (2024–2028)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <button
              onClick={() => {
                playClickSound();
                onReturnToDesk();
              }}
              className="px-3.5 py-2 bg-[#f7c815] hover:bg-[#ffd92e] text-[#1c1d21] font-mono font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
              <span>REBOOT DESK</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onScrollToTop();
              }}
              className="px-3.5 py-2 bg-[#ffffff] hover:bg-[#2067e8] hover:text-white text-gray-900 font-mono font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
              <span>BACK TO TOP</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-700 font-mono font-bold text-center sm:text-left">
          <div>
            INSPIRED BY NATHAN WIJAYA RETRO AESTHETIC &amp; ENGINEERING SYSTEMS ARCHIVE.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] border border-[#1c1d21] inline-block animate-pulse" />
            <span className="text-[#16a34a]">ALL SYSTEMS ONLINE // 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
