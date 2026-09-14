import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface RetroWindowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  statusInfo?: string;
  onClose?: () => void;
  className?: string;
  variant?: 'default' | 'active' | 'system' | 'yellow' | 'pink' | 'emerald' | 'purple' | 'orange';
  actions?: React.ReactNode;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  subtitle,
  icon,
  children,
  statusInfo,
  onClose,
  className = '',
  variant = 'system',
  actions
}) => {
  const getHeaderBg = () => {
    switch (variant) {
      case 'yellow':
        return 'bg-[#f7c815] text-[#1c1d21]';
      case 'pink':
        return 'bg-[#ff548e] text-white';
      case 'emerald':
        return 'bg-[#10b981] text-white';
      case 'purple':
        return 'bg-[#a855f7] text-white';
      case 'orange':
        return 'bg-[#f97316] text-white';
      case 'system':
      case 'active':
      default:
        return 'bg-[#2067e8] text-white';
    }
  };

  return (
    <div
      className={`bg-[#ffffff] border-3 border-[#1c1d21] rounded-none shadow-[6px_6px_0px_#1c1d21] font-['Space_Mono',monospace] flex flex-col overflow-hidden ${className}`}
    >
      {/* Title Bar with crisp retro styling */}
      <div className={`px-3 py-2 flex items-center justify-between select-none border-b-3 border-[#1c1d21] ${getHeaderBg()}`}>
        <div className="flex items-center gap-2 truncate pr-2">
          {icon && <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>}
          <div className="truncate font-black text-xs tracking-tight">
            <span>{title}</span>
            {subtitle && (
              <span className="opacity-80 text-[10px] ml-2 hidden sm:inline font-bold">
                [{subtitle}]
              </span>
            )}
          </div>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {actions}
          <button
            onClick={() => playClickSound()}
            aria-label="Minimize Window"
            className="w-4 h-4 bg-[#ffffff] hover:bg-[#f7c815] text-[#1c1d21] border-2 border-[#1c1d21] flex items-center justify-center cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
          >
            <Minus className="w-2.5 h-2.5 stroke-[3]" />
          </button>
          <button
            onClick={() => playClickSound()}
            aria-label="Maximize Window"
            className="w-4 h-4 bg-[#ffffff] hover:bg-[#f7c815] text-[#1c1d21] border-2 border-[#1c1d21] flex items-center justify-center cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
          >
            <Square className="w-2.5 h-2.5 stroke-[3]" />
          </button>
          {onClose && (
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              aria-label="Close Window"
              className="w-4 h-4 bg-[#ef4444] hover:bg-[#dc2626] text-white border-2 border-[#1c1d21] flex items-center justify-center cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
            >
              <X className="w-2.5 h-2.5 stroke-[4]" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3 sm:p-5 flex-1 overflow-auto bg-[#fffdf7]">
        {children}
      </div>

      {/* Bottom Status Bar */}
      {statusInfo && (
        <div className="px-3 py-1.5 bg-[#f4eee0] border-t-2 border-[#1c1d21] text-[10px] text-gray-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block animate-pulse" />
            <span className="truncate font-bold">{statusInfo}</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#2067e8] font-black hidden sm:inline">
            PRIYAM_OS // READY
          </span>
        </div>
      )}
    </div>
  );
};
