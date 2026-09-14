import React from 'react';

interface CRTScreenProps {
  children: React.ReactNode;
  enabled?: boolean;
  className?: string;
}

export const CRTScreen: React.FC<CRTScreenProps> = ({
  children,
  enabled = true,
  className = ''
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#0a1a4a] crt-screen-container border-[8px] sm:border-[12px] border-[#18191e] rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Actual Child Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* CRT Scanline and Phosphor Filter Layer */}
      {enabled && (
        <>
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none crt-screen-overlay z-20 opacity-70" />

          {/* Vignette & Curvature Corner Shadow */}
          <div
            className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_50px_rgba(0,0,0,0.65),inset_0_0_15px_rgba(0,0,0,0.9)] rounded-xl"
          />

          {/* Subtle Screen Reflection Glare */}
          <div
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none z-30 opacity-15 bg-radial from-white via-transparent to-transparent rotate-12"
          />
        </>
      )}
    </div>
  );
};
