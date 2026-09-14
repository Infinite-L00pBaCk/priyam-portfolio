import React, { useState, useEffect } from 'react';
import { playClickSound, playKeySound } from '../utils/sound';

interface DigitalOscilloscopeProps {
  className?: string;
  onInteract?: (msg: string) => void;
}

type WaveformType = 'sine' | 'square' | 'triangle' | 'pulse';

export const DigitalOscilloscope: React.FC<DigitalOscilloscopeProps> = ({
  className = '',
  onInteract,
}) => {
  const [waveType, setWaveType] = useState<WaveformType>('sine');
  const [frequency, setFrequency] = useState<number>(1.0); // in kHz
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Animated sweep when running
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggleWave = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const waves: WaveformType[] = ['sine', 'square', 'triangle', 'pulse'];
    const nextWave = waves[(waves.indexOf(waveType) + 1) % waves.length];
    setWaveType(nextWave);
    if (onInteract) {
      onInteract(`OSCILLOSCOPE: Switched probe to ${nextWave.toUpperCase()} test signal (${frequency.toFixed(2)} kHz)`);
    }
  };

  const handleToggleRun = (e: React.MouseEvent) => {
    e.stopPropagation();
    playKeySound();
    const nextRunning = !isRunning;
    setIsRunning(nextRunning);
    if (onInteract) {
      onInteract(
        nextRunning
          ? 'OSCILLOSCOPE: Trigger RUN • Acquiring 20MS/s real-time sampling'
          : 'OSCILLOSCOPE: Trigger HOLD • Waveform buffer locked'
      );
    }
  };

  const handleFreqStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const freqs = [0.5, 1.0, 2.5, 5.0, 10.0];
    const nextFreq = freqs[(freqs.indexOf(frequency) + 1) % freqs.length];
    setFrequency(nextFreq);
    if (onInteract) {
      onInteract(`OSCILLOSCOPE: Timebase scaled to ${nextFreq.toFixed(1)} kHz`);
    }
  };

  // Generate SVG path data for the animated waveform
  const generateWavePath = () => {
    const width = 86;
    const height = 38;
    const midY = height / 2;
    const points: string[] = [];

    for (let x = 0; x <= width; x += 1.5) {
      const phase = ((x + offset * (frequency / 1.0)) * 0.15);
      let y = midY;

      if (waveType === 'sine') {
        y = midY + Math.sin(phase) * 12;
      } else if (waveType === 'square') {
        y = midY + (Math.sin(phase) >= 0 ? 12 : -12);
      } else if (waveType === 'triangle') {
        const t = (phase % (2 * Math.PI)) / (2 * Math.PI);
        y = midY + (t < 0.5 ? (t * 4 - 1) : ((1 - t) * 4 - 1)) * 12;
      } else if (waveType === 'pulse') {
        const p = phase % (2 * Math.PI);
        y = midY + (p < 0.8 ? -12 : 12);
      }

      points.push(`${x === 0 ? 'M' : 'L'} ${x + 6} ${y + 6}`);
    }

    return points.join(' ');
  };

  return (
    <div
      onClick={handleToggleWave}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group transition-transform hover:scale-105 active:scale-95 flex flex-col items-center ${className}`}
      title="Mini Digital Storage Oscilloscope (DSO-150) • 200kHz Bandwidth (Click to Change Waveform / Toggle Run)"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#4ade80] text-[7.5px] font-mono font-bold rounded border border-[#4ade80] shadow-xs whitespace-nowrap z-40 pointer-events-none">
          DSO OSCILLOSCOPE • {waveType.toUpperCase()} ({frequency} kHz) • Click to cycle
        </div>
      )}

      {/* Main Vector Enclosure: Retro Dark Gray Chassis with BNC Probes and Controls */}
      <div className="relative w-36 sm:w-44 bg-[#1e293b] border-3 border-[#1c1d21] rounded-md shadow-[4px_4px_0px_#1c1d21] p-1.5 flex flex-col justify-between">
        
        {/* Top Header Bar: Model & Status Indicators */}
        <div className="flex items-center justify-between px-1 pb-1 border-b border-[#334155]">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] border border-[#1c1d21]" />
            <span className="text-[5.5px] font-mono font-black text-[#94a3b8] tracking-wider">
              DSO-150 MINI SCOPE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`text-[5px] font-mono font-bold px-1 rounded-xs border ${
                isRunning
                  ? 'bg-[#15803d]/50 text-[#4ade80] border-[#22c55e]'
                  : 'bg-[#991b1b]/50 text-[#f87171] border-[#ef4444]'
              }`}
            >
              {isRunning ? 'RUN' : 'HOLD'}
            </span>
            <span className="text-[5px] font-mono text-[#cbd5e1]">{frequency.toFixed(1)}k</span>
          </div>
        </div>

        {/* Oscilloscope CRT / LCD Display Screen */}
        <div className="relative my-1 w-full bg-[#052e16] border-2 border-[#1c1d21] rounded-xs p-1 overflow-hidden shadow-inner flex flex-col justify-between">
          
          {/* Subtle Grid Reticle (8x4 divisions) */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)',
              backgroundSize: '12px 10px',
            }}
          />

          {/* Top Screen OSD Stats */}
          <div className="relative z-10 flex items-center justify-between text-[4.5px] font-mono text-[#4ade80] px-0.5 leading-none">
            <span>CH1: 1.00V/div</span>
            <span>f: {(frequency * 1000).toFixed(0)}Hz</span>
            <span>Vpp: 3.32V</span>
          </div>

          {/* Animated Waveform Canvas (SVG) */}
          <svg
            viewBox="0 0 98 50"
            className="w-full h-11 relative z-10 overflow-visible"
            fill="none"
          >
            {/* Glow blur underlay */}
            <path
              d={generateWavePath()}
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
            {/* Crisp Phosphor Green Trace */}
            <path
              d={generateWavePath()}
              stroke="#4ade80"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Bottom Screen OSD Scale */}
          <div className="relative z-10 flex items-center justify-between text-[4.5px] font-mono text-[#86efac] px-0.5 leading-none">
            <span>TB: 500µs</span>
            <span>TRG: AUTO ↗</span>
            <span className="font-bold text-[#facc15]">{waveType.toUpperCase()}</span>
          </div>
        </div>

        {/* Bottom Control Section: Buttons, Rotary Knob, and BNC Probe Input */}
        <div className="flex items-center justify-between px-1 pt-0.5 border-t border-[#334155] gap-1">
          {/* Action Buttons */}
          <div className="flex gap-1">
            <button
              onClick={handleToggleRun}
              className={`px-1.5 py-0.5 border border-[#1c1d21] rounded-xs font-mono text-[5px] font-black shadow-2xs transition-colors ${
                isRunning ? 'bg-[#22c55e] text-[#052e16]' : 'bg-[#ef4444] text-white'
              }`}
            >
              RUN/STOP
            </button>
            <button
              onClick={handleFreqStep}
              className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748b] text-white border border-[#1c1d21] rounded-xs font-mono text-[5px] font-bold shadow-2xs transition-colors"
            >
              SCALE
            </button>
          </div>

          {/* Rotary Navigation Dial */}
          <div
            onClick={handleToggleWave}
            className="w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#1c1d21] flex items-center justify-center shadow-2xs hover:rotate-45 transition-transform"
            title="Rotary Encoder Knob"
          >
            <div className="w-0.5 h-1.5 bg-[#cbd5e1] rounded-full -translate-y-0.5" />
          </div>

          {/* BNC Probe Port with Ground Clip */}
          <div className="flex items-center gap-0.5">
            <div className="w-3 h-3 rounded-full bg-[#94a3b8] border-2 border-[#1c1d21] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1c1d21]" />
            </div>
            <span className="text-[4.5px] font-mono font-bold text-[#64748b]">BNC</span>
          </div>
        </div>
      </div>

      {/* Bottom Hardware Tag Badge */}
      <div className="mt-1 bg-[#38bdf8] text-[#0f172a] px-2 py-0.5 border-2 border-[#1c1d21] rounded-xs font-mono text-[6.5px] font-black shadow-[2px_2px_0px_#1c1d21]">
        OSCILLOSCOPE [200kHz DSO]
      </div>
    </div>
  );
};
