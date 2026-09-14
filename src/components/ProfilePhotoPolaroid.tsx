import React, { useState, useEffect } from 'react';

interface ProfilePhotoPolaroidProps {
  name?: string;
  institution?: string;
  specialization?: string;
  statusText?: string;
  batchText?: string;
}

export const ProfilePhotoPolaroid: React.FC<ProfilePhotoPolaroidProps> = ({
  name = 'PRIYAM PRAKASH',
  institution = 'VIT BHOPAL',
  specialization = 'ECE',
  statusText = 'STATUS: B.TECH (2024 – 2028)',
  batchText = 'Class of 2028 • Bhopal, India',
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    // Check saved photo in localStorage
    return (
      localStorage.getItem('priyam_portfolio_photo') ||
      localStorage.getItem('priyam_photo') ||
      '/priyam_prakash_24bec10139.png'
    );
  });

  const [imgErrorCount, setImgErrorCount] = useState<number>(0);

  // Fallback fallback paths
  const handleImageError = () => {
    setImgErrorCount((prev) => {
      const next = prev + 1;
      if (next === 1) {
        setPhotoUrl('/priyam_prakash.png');
      } else if (next === 2) {
        setPhotoUrl('/assets/priyam_prakash_24bec10139.png');
      } else if (next === 3) {
        setPhotoUrl('/assets/priyam_prakash.png');
      }
      return next;
    });
  };

  return (
    <div
      id="profile-polaroid-container"
      className="bg-[#fffdf7] border-3 border-[#1c1d21] p-3.5 text-center shadow-[4px_4px_0px_#1c1d21] relative select-none"
    >
      {/* Smiley Sticker Top Right */}
      <span
        className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f7c815] border-2 border-[#1c1d21] flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#1c1d21] z-20"
        title="Engineering smile :)"
      >
        :)
      </span>

      {/* Main Square Photo Frame */}
      <div
        id="profile-photo-frame"
        className="w-full aspect-square max-w-[220px] mx-auto bg-[#ffffff] border-3 border-[#1c1d21] rounded-none flex flex-col items-center justify-center relative overflow-hidden shadow-inner"
      >
        {/* Real Portrait Photo of Priyam Prakash */}
        <img
          id="priyam-profile-avatar-img"
          src={photoUrl}
          alt="Priyam Prakash - Electronics & Communication Engineering"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover object-top relative z-10 bg-white"
        />

        {/* Live Status Beacon Top-Right */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-[#1c1d21]/75 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/20 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] inline-block" />
          <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-wider">LIVE</span>
        </div>

        {/* Bottom Bar overlay inside photo */}
        <div className="absolute bottom-0 inset-x-0 bg-[#1c1d21]/90 backdrop-blur-xs py-1.5 px-2.5 z-20 flex items-center justify-between border-t border-white/20">
          <div className="text-left leading-tight">
            <div className="text-[9px] font-mono font-black text-[#f7c815] tracking-wider">{name}</div>
            <div className="text-[7.5px] font-mono text-cyan-200">{institution} • {specialization}</div>
          </div>
          <div className="text-[7.5px] font-mono text-gray-300 font-bold tracking-wider">24BEC10139</div>
        </div>
      </div>

      {/* Polaroid Caption Info */}
      <div className="mt-3.5 space-y-0.5">
        <div className="text-xs font-mono font-black text-gray-950 tracking-tight">
          {statusText}
        </div>
        <div className="text-[11px] text-[#2067e8] font-bold font-mono">
          {batchText}
        </div>
      </div>
    </div>
  );
};
