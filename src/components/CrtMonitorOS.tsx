import React, { useState } from 'react';
import { 
  Maximize2, RotateCcw, Folder, Cpu, Terminal, Award, User, 
  ExternalLink, Github, BookOpen, Layers, CheckCircle2, ChevronRight,
  Sparkles, Radio, Code2, Shield, Wrench, CircuitBoard
} from 'lucide-react';
import { playClickSound, playKeySound, playWindowOpenSound } from '../utils/sound';
import { portfolioData } from '../data/portfolio';

interface CrtMonitorOSProps {
  onExpandFullPortfolio: () => void;
  onReboot: () => void;
}

type WindowApp = 'about' | 'projects' | 'skills' | 'experience' | 'terminal';

export const CrtMonitorOS: React.FC<CrtMonitorOSProps> = ({
  onExpandFullPortfolio,
  onReboot,
}) => {
  const [activeApp, setActiveApp] = useState<WindowApp>('about');
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('ALL');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | 'hardware' | 'software' | 'core'>('all');
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([
    'PRIYAM_OS v2026.1 (B.Tech ECE // VIT Bhopal)',
    'Type "help", "about", "projects", "skills", "exp", "gate", or "expand" for commands.'
  ]);

  const handleSelectApp = (app: WindowApp) => {
    playWindowOpenSound();
    setActiveApp(app);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    playKeySound();
    const cmd = cliInput.trim().toLowerCase();
    setCliInput('');

    let response = '';
    if (cmd === 'help') {
      response = 'Commands: about, projects, skills, exp, gate, cgpa, stack, expand, reboot, clear';
    } else if (cmd === 'about') {
      response = 'Priyam Prakash | B.Tech ECE (2024 – 2028) @ VIT Bhopal | CGPA: 8.38 | Embedded Systems, ML & Web | GATE 2028 Aspirant';
      setActiveApp('about');
    } else if (cmd === 'projects') {
      response = 'Core Repos: PassVault Pro (AES-256 PWA), Arduino Uno Simulator (AVR Engine), Voice-Controlled Obstacle Rover, VTOP ML CAPTCHA, Banking C++';
      setActiveApp('projects');
    } else if (cmd === 'skills') {
      response = 'Hardware: ESP32, ATmega328P, UART, I2C, SPI, PWM, LoRa | AI/Software: PyTorch, OpenCV, MediaPipe, React, TypeScript | Core: VLSI, DSP';
      setActiveApp('skills');
    } else if (cmd === 'exp') {
      response = 'Experience: Open-Source Intern (IIT Ropar VLED Lab), Embedded Intern (Maven Silicon), General Secretary & Research Intern (Cisco Community VIT Bhopal), Space Tech (India Space Lab), Android Club Finance Team';
      setActiveApp('experience');
    } else if (cmd === 'gate') {
      response = 'Academic Goal: GATE 2028 ECE Preparation (Signals & Systems, Digital Circuits, Microprocessors, Control Systems, Communications, Networks)';
    } else if (cmd === 'cgpa') {
      response = 'Academic Record: CGPA 8.38 / 10.0 (Vellore Institute of Technology Bhopal - Electronics and Communication Engineering 2024 – 2028)';
    } else if (cmd === 'stack') {
      response = 'Primary Stack: C++, Embedded C, Python, PyTorch, OpenCV, React 19, TypeScript, Web Crypto API, Linux, Git';
    } else if (cmd === 'expand') {
      onExpandFullPortfolio();
      return;
    } else if (cmd === 'reboot') {
      onReboot();
      return;
    } else if (cmd === 'clear') {
      setCliLogs(['Terminal cleared. Ready for input.']);
      return;
    } else {
      response = `Command not found: "${cmd}". Type "help" for available system commands.`;
    }

    setCliLogs((prev) => [...prev, `$ ${cmd}`, response]);
  };

  return (
    <div className="relative w-full h-full bg-[#1546bd] text-white font-['Space_Mono',monospace] flex flex-col justify-between p-1.5 sm:p-2 select-none overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      {/* 1. CRT Top OS Status Bar */}
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-cyan-200 border-b border-blue-400/30 pb-1 px-1 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-bold tracking-wider">PRIYAM_OS 2026.1</span>
          <span className="hidden sm:inline text-blue-300">| VIT-BHOPAL ECE 2024-2028 (CGPA: 8.38)</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reboot OS button */}
          <button
            onClick={() => {
              playClickSound();
              onReboot();
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 bg-[#1e40af] hover:bg-[#2563eb] text-cyan-200 hover:text-white border border-cyan-400/40 rounded-xs text-[7px] sm:text-[8px] font-mono cursor-pointer"
            title="Reboot OS Boot Sequence"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">REBOOT</span>
          </button>

          {/* Expand into Full Webpage View Button */}
          <button
            onClick={() => {
              playWindowOpenSound();
              onExpandFullPortfolio();
            }}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono font-black text-[7px] sm:text-[8px] border border-[#1c1d21] rounded-xs cursor-pointer shadow-xs active:scale-95"
            title="Expand into full page portfolio"
          >
            <Maximize2 className="w-2.5 h-2.5" />
            <span>EXPAND FULL</span>
          </button>
        </div>
      </div>

      {/* 2. Main Desktop Area (Sidebar App Icons + Active Window) */}
      <div className="flex-1 my-1 flex gap-1.5 sm:gap-2 min-h-0 overflow-hidden">
        
        {/* Left Desktop App Icons */}
        <div className="w-14 sm:w-16 flex flex-col gap-1 sm:gap-1.5 shrink-0 py-0.5">
          {[
            { id: 'about' as WindowApp, label: 'ABOUT', icon: User, color: 'bg-[#0284c7]' },
            { id: 'projects' as WindowApp, label: 'PROJECTS', icon: Folder, color: 'bg-[#d97706]' },
            { id: 'skills' as WindowApp, label: 'SKILLS', icon: Cpu, color: 'bg-[#059669]' },
            { id: 'experience' as WindowApp, label: 'EXP.LOG', icon: Award, color: 'bg-[#7c3aed]' },
            { id: 'terminal' as WindowApp, label: 'CLI', icon: Terminal, color: 'bg-[#1c1d21]' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeApp === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectApp(item.id)}
                className={`flex flex-col items-center justify-center p-1 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e40af] border-cyan-300 shadow-[0_0_6px_rgba(56,189,248,0.5)] scale-102'
                    : 'bg-[#0e2a70]/70 border-transparent hover:bg-[#1e3a8a]/60 text-cyan-200'
                }`}
              >
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded ${item.color} flex items-center justify-center text-white border border-white/40 shadow-xs mb-0.5`}>
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="text-[6px] sm:text-[7px] font-mono font-bold leading-tight truncate max-w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center/Right: Active OS Window (Full, comprehensive, scrollable pane) */}
        <div className="flex-1 bg-[#faf8f5] text-[#1c1d21] border-2 border-[#1c1d21] rounded-md shadow-[3px_3px_0px_#1c1d21] flex flex-col overflow-hidden">
          
          {/* Window Title Bar */}
          <div className="bg-[#1e40af] text-white px-2 py-0.5 flex items-center justify-between border-b-2 border-[#1c1d21] shrink-0">
            <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
              <span className="uppercase">
                {activeApp === 'about' && 'ABOUT_PRIYAM_PRAKASH.SYS // ECE_BIO'}
                {activeApp === 'projects' && 'ECE_SOFTWARE_PROJECTS_DATABASE.DAT'}
                {activeApp === 'skills' && 'COMPREHENSIVE_SKILL_MATRIX.SYS'}
                {activeApp === 'experience' && 'PROFESSIONAL_EXPERIENCE_LOG.DAT'}
                {activeApp === 'terminal' && 'PRIYAM_OS_COMMAND_SHELL.SH'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[7px] font-mono text-cyan-200 hidden sm:inline">
                {activeApp === 'about' && 'VIT BHOPAL ECE'}
                {activeApp === 'projects' && `${portfolioData.projects.length} REPOSITORIES`}
                {activeApp === 'skills' && 'HARDWARE • AI • ECE'}
                {activeApp === 'experience' && 'INTERNSHIPS & LEADERSHIP'}
                {activeApp === 'terminal' && 'TTY1 ACTIVE'}
              </span>
              <button
                onClick={onExpandFullPortfolio}
                className="w-3.5 h-3.5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-xs flex items-center justify-center text-[7px] font-black cursor-pointer ml-1"
                title="Expand Full Page View"
              >
                +
              </button>
            </div>
          </div>

          {/* Window Body (Scrollable Container with Crisp Monospaced Layout) */}
          <div className="flex-1 p-2 sm:p-2.5 overflow-y-auto text-[8px] sm:text-[9px] leading-relaxed space-y-2 font-mono select-text bg-[#faf8f5]">
            
            {/* ══════════════════════════════════════════════════
                1. FULL ABOUT VIEW
               ══════════════════════════════════════════════════ */}
            {activeApp === 'about' && (
              <div className="space-y-2.5">
                {/* Identification Header Banner */}
                <div className="bg-[#fff3c4] border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[10px] sm:text-[11px] text-[#1c1d21] tracking-tight">
                        PRIYAM PRAKASH
                      </div>
                      <div className="text-[8px] text-gray-800 font-bold mt-0.5">
                        B.Tech in Electronics &amp; Communication Engineering (2024 – 2028)
                      </div>
                      <div className="text-[7.5px] sm:text-[8px] text-[#15803d] font-black flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#15803d]" />
                        <span>Vellore Institute of Technology (VIT) Bhopal • CGPA: 8.38 / 10.0</span>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#2067e8] text-white text-[7px] font-black rounded border border-[#1c1d21]">
                      B.TECH ECE
                    </span>
                  </div>
                </div>

                {/* Complete Professional Biography */}
                <div className="bg-white border border-[#1c1d21]/60 p-2 rounded-xs space-y-1.5 shadow-xs">
                  <div className="text-[8px] font-black text-[#1e40af] border-b border-gray-200 pb-0.5 flex items-center gap-1">
                    <User className="w-2.5 h-2.5" />
                    <span>PROFESSIONAL BIOGRAPHY &amp; TECHNICAL FOCUS</span>
                  </div>
                  <p className="text-gray-800 text-[8px] leading-relaxed">
                    Undergraduate engineer (2024 – 2028) in Electronics and Communication Engineering at <strong>Vellore Institute of Technology (VIT) Bhopal (CGPA: 8.38 / 10.0)</strong>. I specialize in building full-stack hardware-software systems—bridging bare-metal embedded C/C++ microcontroller firmware (ESP32, ATmega328P, ARM Cortex) with machine learning, computer vision (PyTorch, OpenCV, MediaPipe), and reactive full-stack web applications with modern TypeScript and client-side cryptography.
                  </p>
                  <p className="text-gray-800 text-[8px] leading-relaxed">
                    My engineering background combines low-level protocol debugging (UART, I2C, SPI, PWM, LoRa) with high-level software engineering, including open-source research contributions at IIT Ropar VLED Lab, space technology research at India Space Lab, and low-level firmware design at Maven Silicon.
                  </p>
                </div>

                {/* Academic Goals: GATE 2028 Preparation */}
                <div className="bg-[#eff6ff] border-2 border-[#2563eb] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="text-[8px] font-black text-[#1d4ed8] flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-2.5 h-2.5" />
                      <span>CURRENT ACADEMIC GOAL // GATE 2028 ECE ASPIRANT</span>
                    </div>
                    <span className="px-1 bg-[#2563eb] text-white text-[6.5px] font-bold rounded">
                      TARGET: 2028
                    </span>
                  </div>
                  <p className="text-gray-800 text-[7.5px] leading-relaxed">
                    Actively preparing for the <strong>Graduate Aptitude Test in Engineering (GATE 2028) in Electronics and Communication Engineering (ECE)</strong>. Rigorous study across core mathematical and physical engineering foundations:
                  </p>
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <div className="bg-white p-1 rounded border border-blue-200 text-[7px] text-gray-800">
                      • Signals, Systems &amp; DSP (Z-Transform, FFT)
                    </div>
                    <div className="bg-white p-1 rounded border border-blue-200 text-[7px] text-gray-800">
                      • Digital Circuits &amp; Microprocessors (8085/8086/AVR)
                    </div>
                    <div className="bg-white p-1 rounded border border-blue-200 text-[7px] text-gray-800">
                      • Electronic Devices &amp; Analog Circuits (MOSFET, Op-Amps)
                    </div>
                    <div className="bg-white p-1 rounded border border-blue-200 text-[7px] text-gray-800">
                      • Electromagnetics, Antennas &amp; Communications
                    </div>
                  </div>
                </div>

                {/* Key Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  <div className="bg-white border border-[#1c1d21]/40 p-1.5 rounded-xs space-y-0.5">
                    <span className="text-[7.5px] font-black text-[#059669] block">1. EMBEDDED SYSTEMS</span>
                    <span className="text-[7px] text-gray-700 block">
                      ESP32, AVR, ARM Cortex, Real-Time Sensor Fusion, UART/SPI/I2C protocols, PWM control.
                    </span>
                  </div>
                  <div className="bg-white border border-[#1c1d21]/40 p-1.5 rounded-xs space-y-0.5">
                    <span className="text-[7.5px] font-black text-[#7c3aed] block">2. EDGE AI &amp; VISION</span>
                    <span className="text-[7px] text-gray-700 block">
                      PyTorch CRNN OCR, OpenCV image processing, Google MediaPipe 21-point tracking, NLP models.
                    </span>
                  </div>
                  <div className="bg-white border border-[#1c1d21]/40 p-1.5 rounded-xs space-y-0.5">
                    <span className="text-[7.5px] font-black text-[#2563eb] block">3. FULL-STACK WEB</span>
                    <span className="text-[7px] text-gray-700 block">
                      React 19, TypeScript, Web Crypto API (AES-GCM-256), Web Audio API, PWA Offline Systems.
                    </span>
                  </div>
                </div>

                {/* Fast Navigation & Social Contacts */}
                <div className="bg-[#f5ecdc] border border-[#1c1d21] p-1.5 rounded-xs flex flex-wrap items-center justify-between gap-1 text-[7px]">
                  <div>
                    <span className="font-bold text-gray-900">EMAIL: </span>
                    <span className="text-[#2067e8] font-bold">priyamwork111@gmail.com</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">GITHUB: </span>
                    <a 
                      href="https://github.com/Infinite-L00pBaCk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1c1d21] font-bold hover:underline"
                    >
                      @Infinite-L00pBaCk
                    </a>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">LOCATION: </span>
                    <span className="text-gray-800">VIT Bhopal, India</span>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════
                2. FULL PROJECTS VIEW
               ══════════════════════════════════════════════════ */}
            {activeApp === 'projects' && (
              <div className="space-y-2">
                {/* Repository Registry Bar */}
                <div className="bg-yellow-100 border border-yellow-400 p-1.5 rounded-xs flex items-center justify-between text-[7.5px] text-gray-900">
                  <div className="font-black flex items-center gap-1">
                    <Folder className="w-3 h-3 text-[#d97706]" />
                    <span>PROJECT REPOSITORY ARCHIVE // DETAILED DOCUMENTATION</span>
                  </div>
                  <a
                    href="https://github.com/Infinite-L00pBaCk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                    }}
                    className="px-1.5 py-0.5 bg-[#1c1d21] hover:bg-black text-white text-[7px] font-black rounded flex items-center gap-1"
                  >
                    <Github className="w-2.5 h-2.5 text-[#facc15]" />
                    <span>ALL GITHUB REPOS</span>
                  </a>
                </div>

                {/* 1. PassVault Pro Full Card */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#16a34a]" />
                        <span className="font-black text-[#1c1d21] text-[9px]">
                          PassVault Pro - Zero-Knowledge Password Manager
                        </span>
                      </div>
                      <span className="text-[7px] text-gray-500 font-mono">[PASSVAULT_PRO.EXE] • 2026</span>
                    </div>
                    <span className="px-1 py-0.5 bg-blue-100 text-blue-900 text-[6.5px] font-black rounded border border-blue-300">
                      Web &amp; Systems
                    </span>
                  </div>

                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    An offline-first, zero-knowledge password vault Progressive Web App (PWA). Employs military-grade <strong>client-side AES-GCM 256-bit symmetric encryption</strong> and PBKDF2 key derivation using native browser <strong>Web Crypto API (SubtleCrypto)</strong>. Master passwords and credentials are never stored or transmitted in plain text across networks.
                  </p>

                  <div className="bg-gray-50 p-1 rounded border border-gray-200 text-[7px] space-y-0.5 text-gray-700">
                    <div className="font-bold text-gray-900">Core Highlights &amp; Engineering:</div>
                    <div>• Client-side PBKDF2 key stretching with high iteration counts &amp; cryptographic salts</div>
                    <div>• Full PWA offline caching with service workers &amp; zero network dependency</div>
                    <div>• Built-in entropy-based password generator with customizable symbol parameters</div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {["React 18", "TypeScript", "Web Crypto API (AES-GCM)", "PBKDF2", "Tailwind CSS", "PWA"].map((t, idx) => (
                      <span key={idx} className="px-1 py-0.2 bg-blue-50 text-blue-800 text-[6.5px] rounded border border-blue-200 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[6.5px] text-green-700 font-bold">● Active Deployment</span>
                    <div className="flex items-center gap-1">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/passvault-pro"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2 py-0.5 bg-[#1c1d21] hover:bg-black text-white text-[7px] font-bold rounded flex items-center gap-1"
                      >
                        <Github className="w-2.5 h-2.5 text-[#facc15]" />
                        <span>[ GITHUB REPO ]</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Arduino Uno Simulator Full Card */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <CircuitBoard className="w-3.5 h-3.5 text-[#2563eb]" />
                        <span className="font-black text-[#1c1d21] text-[9px]">
                          Arduino Uno Simulator &amp; Beginner Master Hub
                        </span>
                      </div>
                      <span className="text-[7px] text-gray-500 font-mono">[ARDUINO_SIMULATOR.BIN] • 2026</span>
                    </div>
                    <span className="px-1 py-0.5 bg-green-100 text-green-900 text-[6.5px] font-black rounded border border-green-300">
                      Embedded &amp; Simulation
                    </span>
                  </div>

                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Interactive browser-based hardware simulator and educational hub for the <strong>ATmega328P microcontroller</strong>. Models digital GPIO pin states, PWM frequency modulation, virtual breadboard components (LEDs, buzzers, ultrasonic sensors), in-browser C++ sketch parsing, and live UART serial monitoring.
                  </p>

                  <div className="bg-gray-50 p-1 rounded border border-gray-200 text-[7px] space-y-0.5 text-gray-700">
                    <div className="font-bold text-gray-900">Core Highlights &amp; Engineering:</div>
                    <div>• Real-time register emulation for DDRB, PORTB, PINB with 16MHz clock cycle timing</div>
                    <div>• Web Audio API sound synthesis for emulated piezo buzzers and relay click feedback</div>
                    <div>• Interactive circuit canvas with responsive drag-and-drop wire connections</div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {["React", "TypeScript", "Canvas 2D", "Web Audio API", "Embedded C++", "AVR Opcode Logic"].map((t, idx) => (
                      <span key={idx} className="px-1 py-0.2 bg-green-50 text-green-800 text-[6.5px] rounded border border-green-200 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[6.5px] text-green-700 font-bold">● Active Deployment</span>
                    <div className="flex items-center gap-1">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/Arduino-Beginner-Master-Hub-"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2 py-0.5 bg-[#1c1d21] hover:bg-black text-white text-[7px] font-bold rounded flex items-center gap-1"
                      >
                        <Github className="w-2.5 h-2.5 text-[#facc15]" />
                        <span>[ GITHUB REPO ]</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Voice-Controlled Obstacle-Avoiding Car Full Card */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span className="font-black text-[#1c1d21] text-[9px]">
                          Voice-Controlled Obstacle-Avoiding Car
                        </span>
                      </div>
                      <span className="text-[7px] text-gray-500 font-mono">[ROVER_VOICE_SCAN.ELF] • 2026</span>
                    </div>
                    <span className="px-1 py-0.5 bg-amber-100 text-amber-900 text-[6.5px] font-black rounded border border-amber-300">
                      Robotics &amp; Hardware
                    </span>
                  </div>

                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Autonomous robotic ground vehicle executing <strong>180° spatial depth mapping</strong> via HC-SR04 ultrasonic sensors mounted on SG90 servo turrets. Incorporates concurrent multi-threaded Bluetooth (HC-05) voice command processing and L298N dual H-bridge motor driver PWM regulation.
                  </p>

                  <div className="bg-gray-50 p-1 rounded border border-gray-200 text-[7px] space-y-0.5 text-gray-700">
                    <div className="font-bold text-gray-900">Core Highlights &amp; Engineering:</div>
                    <div>• 'Move-Stop-Scan' navigation algorithm eliminating ultrasonic blind spots in tight corners</div>
                    <div>• Non-blocking threading parser for concurrent voice telemetry and safety cutoff (&lt;15cm)</div>
                    <div>• Hardware PWM speed ramp-up curves preventing motor stall and floor slippage</div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {["Raspberry Pi", "Arduino C++", "Python", "HC-SR04", "SG90 Servo", "L298N H-Bridge", "HC-05"].map((t, idx) => (
                      <span key={idx} className="px-1 py-0.2 bg-amber-50 text-amber-800 text-[6.5px] rounded border border-amber-200 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[6.5px] text-blue-700 font-bold">● Hardware Verified</span>
                    <div className="flex items-center gap-1">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/Robotics-Obstacle-Avoidance-Car"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2 py-0.5 bg-[#1c1d21] hover:bg-black text-white text-[7px] font-bold rounded flex items-center gap-1"
                      >
                        <Github className="w-2.5 h-2.5 text-[#facc15]" />
                        <span>[ GITHUB REPO ]</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Other Key Projects Brief Summary Strip */}
                <div className="bg-gray-100 border border-gray-300 p-1.5 rounded-xs space-y-1">
                  <div className="text-[7.5px] font-bold text-gray-800">ADDITIONAL NOTABLE REPOSITORIES:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[7px]">
                    <div className="bg-white p-1 rounded border border-gray-200">
                      <div className="font-bold text-[#1c1d21]">VTOP Auto Login ML Solver</div>
                      <div className="text-gray-600">PyTorch CRNN OCR neural net solving student portal CAPTCHAs with 99.2% accuracy.</div>
                      <a href="https://github.com/Infinite-L00pBaCk/vtop-auto-login-captcha-solver" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-bold">[GitHub]</a>
                    </div>
                    <div className="bg-white p-1 rounded border border-gray-200">
                      <div className="font-bold text-[#1c1d21]">C++ Banking Management System</div>
                      <div className="text-gray-600">Object-Oriented C++17 engine with binary file serialization, smart pointers, &amp; RAII.</div>
                      <a href="https://github.com/Infinite-L00pBaCk/cpp-banking-management-system" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-bold">[GitHub]</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════
                3. FULL SKILLS VIEW
               ══════════════════════════════════════════════════ */}
            {activeApp === 'skills' && (
              <div className="space-y-2">
                {/* Category Filter Chips */}
                <div className="flex flex-wrap gap-1 pb-1 border-b border-gray-200">
                  {[
                    { id: 'all', label: 'ALL SKILLS' },
                    { id: 'hardware', label: 'HARDWARE & EMBEDDED' },
                    { id: 'software', label: 'AI & SOFTWARE' },
                    { id: 'core', label: 'CORE ECE' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        playClickSound();
                        setSelectedSkillCategory(cat.id as any);
                      }}
                      className={`px-1.5 py-0.5 text-[7px] font-bold rounded cursor-pointer border ${
                        selectedSkillCategory === cat.id
                          ? 'bg-[#1e40af] text-white border-[#1e40af]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Section 1: Hardware & Embedded */}
                {(selectedSkillCategory === 'all' || selectedSkillCategory === 'hardware') && (
                  <div className="bg-[#eff6ff] border-2 border-[#3b82f6] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                    <div className="text-[8px] font-black text-[#1e40af] flex items-center gap-1 border-b border-blue-200 pb-0.5">
                      <Cpu className="w-3 h-3 text-[#2563eb]" />
                      <span>1. HARDWARE, EMBEDDED SYSTEMS &amp; PROTOCOLS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                      <div className="bg-white p-1.5 rounded border border-blue-200">
                        <div className="font-bold text-[7.5px] text-blue-900">MICROCONTROLLERS &amp; BOARDS</div>
                        <div className="text-[7px] text-gray-800 mt-0.5">
                          • <strong>ESP32 &amp; ESP8266:</strong> Dual-core FreeRTOS, WiFi/BLE telemetry, deep sleep power management<br/>
                          • <strong>Arduino Uno (ATmega328P):</strong> Bare-metal AVR C++, register bitmasking (DDRx, PORTx), timers &amp; ISRs<br/>
                          • <strong>Raspberry Pi:</strong> Linux GPIO, Python multithreading, serial interfaces
                        </div>
                      </div>

                      <div className="bg-white p-1.5 rounded border border-blue-200">
                        <div className="font-bold text-[7.5px] text-blue-900">BUS PROTOCOLS &amp; HARDWARE IO</div>
                        <div className="text-[7px] text-gray-800 mt-0.5">
                          • <strong>UART / Serial:</strong> Baud negotiation, circular buffers, packet checksum validation<br/>
                          • <strong>I2C Protocol:</strong> 400kHz Fast-mode, multi-device addressing (MPU6050, BMP280, OLED)<br/>
                          • <strong>SPI Protocol:</strong> Full-duplex high-speed data transfer, CS multiplexing<br/>
                          • <strong>PWM &amp; Drivers:</strong> Duty cycle modulation, L298N H-Bridge dual motor speed regulation<br/>
                          • <strong>Wireless:</strong> LoRa long-range telemetry framing, HC-05 Bluetooth SPP
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2: AI & Software */}
                {(selectedSkillCategory === 'all' || selectedSkillCategory === 'software') && (
                  <div className="bg-[#f5f3ff] border-2 border-[#8b5cf6] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                    <div className="text-[8px] font-black text-[#6d28d9] flex items-center gap-1 border-b border-purple-200 pb-0.5">
                      <Layers className="w-3 h-3 text-[#7c3aed]" />
                      <span>2. ARTIFICIAL INTELLIGENCE &amp; SOFTWARE ENGINEERING</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                      <div className="bg-white p-1.5 rounded border border-purple-200">
                        <div className="font-bold text-[7.5px] text-purple-900">COMPUTER VISION &amp; MACHINE LEARNING</div>
                        <div className="text-[7px] text-gray-800 mt-0.5">
                          • <strong>PyTorch:</strong> CRNN model training, CTC loss, neural network architectures<br/>
                          • <strong>OpenCV:</strong> Image binarization, Otsu thresholding, contour extraction, ROI framing<br/>
                          • <strong>Google MediaPipe:</strong> 21-point hand landmark tracking, real-time spatial vector angles<br/>
                          • <strong>NLP &amp; Sentiment:</strong> FinBERT, VADER, tokenization, time-series polarity scoring
                        </div>
                      </div>

                      <div className="bg-white p-1.5 rounded border border-purple-200">
                        <div className="font-bold text-[7.5px] text-purple-900">SYSTEMS &amp; WEB DEVELOPMENT</div>
                        <div className="text-[7px] text-gray-800 mt-0.5">
                          • <strong>C++ (C++17/20):</strong> Strict RAII, Polymorphism, Smart Pointers, STL containers, memory safety<br/>
                          • <strong>React 19 &amp; TypeScript:</strong> Type-safe state systems, modular components, Vite bundler<br/>
                          • <strong>Web Crypto API:</strong> Client-side SubtleCrypto AES-GCM 256-bit, PBKDF2 key stretching<br/>
                          • <strong>Developer Tools:</strong> Git/GitHub PR workflows, Linux Bash CLI, ServiceNow Administration &amp; ATF
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Core ECE Topics */}
                {(selectedSkillCategory === 'all' || selectedSkillCategory === 'core') && (
                  <div className="bg-[#fefce8] border-2 border-[#eab308] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                    <div className="text-[8px] font-black text-[#a16207] flex items-center gap-1 border-b border-yellow-300 pb-0.5">
                      <CircuitBoard className="w-3 h-3 text-[#ca8a04]" />
                      <span>3. CORE ELECTRONICS &amp; COMMUNICATION ENGINEERING (ECE)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-0.5 text-[7px]">
                      <div className="bg-white p-1.5 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-950">CIRCUITS &amp; VLSI</div>
                        <div className="text-gray-700 mt-0.5">Digital System Design, CMOS logic, Cadence Virtuoso EDA schematic capture, setup/hold timing analysis.</div>
                      </div>
                      <div className="bg-white p-1.5 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-950">SIGNALS &amp; DSP</div>
                        <div className="text-gray-700 mt-0.5">Fourier/Laplace/Z-Transforms, digital filtering (FIR/IIR), discrete convolution, spectral noise attenuation.</div>
                      </div>
                      <div className="bg-white p-1.5 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-950">SPACE &amp; SENSING</div>
                        <div className="text-gray-700 mt-0.5">CanSat/CubeSat nanosatellite architectures, RF link budget calculations, GIS remote sensing telemetry.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════════════
                4. FULL EXPERIENCE LOG (EXP.LOG)
               ══════════════════════════════════════════════════ */}
            {activeApp === 'experience' && (
              <div className="space-y-2">
                {/* Header info */}
                <div className="bg-purple-100 border border-purple-400 p-1.5 rounded-xs flex items-center justify-between text-[7.5px] text-purple-950">
                  <div className="font-black flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#7c3aed]" />
                    <span>PROFESSIONAL INDUSTRY ROLES &amp; INSTITUTIONAL LEADERSHIP</span>
                  </div>
                  <span className="text-[6.5px] font-bold bg-[#7c3aed] text-white px-1.5 py-0.5 rounded">
                    5+ INTERNSHIPS
                  </span>
                </div>

                {/* 1. Cisco Community Leadership & Research */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[#1c1d21] text-[8.5px]">
                        General Secretary &amp; Former Research Intern / Co-Lead
                      </div>
                      <div className="text-[7.5px] text-[#2563eb] font-bold">
                        Cisco Community – VIT Bhopal
                      </div>
                    </div>
                    <span className="text-[6.5px] font-bold px-1 bg-rose-100 text-rose-900 border border-rose-300 rounded">
                      Nov 2024 – Present
                    </span>
                  </div>
                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Executive leadership overseeing overall club operations, technical strategy, and campus initiatives. Served as Research Intern &amp; Co-Lead spearheading technical hack sessions, before promotion to General Secretary in June 2026.
                  </p>
                  <div className="bg-gray-50 p-1 rounded border border-gray-200 text-[6.5px] space-y-0.5 text-gray-700">
                    <div>• Coordinated core technical infrastructure and event logistics for Advitya fest (100+ attendees)</div>
                    <div>• Mentored university cohorts in IoT, packet networking protocols, and ESP32 hardware interfacing</div>
                  </div>
                </div>

                {/* 2. Open-Source Research Contributor - IIT Ropar VLED Lab */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[#1c1d21] text-[8.5px]">
                        Open-Source Software Contributor Intern
                      </div>
                      <div className="text-[7.5px] text-[#2563eb] font-bold">
                        IIT Ropar – VLED Lab
                      </div>
                    </div>
                    <span className="text-[6.5px] font-bold px-1 bg-blue-100 text-blue-900 border border-blue-300 rounded">
                      May 2026 – Present
                    </span>
                  </div>
                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Deploying production-grade open-source code resolving national-level technical challenges alongside senior academic researchers and engineers. Architecting modular system components with rigorous peer reviews and automated unit testing.
                  </p>
                </div>

                {/* 3. Core Member - Android Club Finance Team */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[#1c1d21] text-[8.5px]">
                        Core Member – Finance Team
                      </div>
                      <div className="text-[7.5px] text-[#15803d] font-bold">
                        Android Club – VIT Bhopal
                      </div>
                    </div>
                    <span className="text-[6.5px] font-bold px-1 bg-green-100 text-green-900 border border-green-300 rounded">
                      2024 – 2025
                    </span>
                  </div>
                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Managed financial allocation, resource budgeting, sponsorship outreach, and event fiscal tracking for university-wide mobile development workshops, hackathons, and guest speaker sessions.
                  </p>
                </div>

                {/* 4. Embedded System Design Intern - Maven Silicon */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[#1c1d21] text-[8.5px]">
                        Embedded System Design Intern
                      </div>
                      <div className="text-[7.5px] text-[#d97706] font-bold">
                        Maven Silicon (Bengaluru, India)
                      </div>
                    </div>
                    <span className="text-[6.5px] font-bold px-1 bg-amber-100 text-amber-900 border border-amber-300 rounded">
                      May 2026 – July 2026
                    </span>
                  </div>
                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Designed and verified real-time microcontroller-driven Home Automation Systems. Programmed low-level embedded C/C++ firmware interfacing environmental sensors, power relays, and analyzed I2C/SPI bus signal timing.
                  </p>
                </div>

                {/* 5. Space Technology Intern - India Space Lab */}
                <div className="bg-white border-2 border-[#1c1d21] p-2 rounded-xs shadow-[2px_2px_0px_#1c1d21] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black text-[#1c1d21] text-[8.5px]">
                        Space Technology Intern
                      </div>
                      <div className="text-[7.5px] text-[#7c3aed] font-bold">
                        India Space Lab (New Delhi)
                      </div>
                    </div>
                    <span className="text-[6.5px] font-bold px-1 bg-purple-100 text-purple-900 border border-purple-300 rounded">
                      June 2026 – July 2026
                    </span>
                  </div>
                  <p className="text-[7.5px] text-gray-800 leading-relaxed">
                    Researched and formulated technical frameworks for CanSat/CubeSat nanosatellite architectures, environmental telemetry packet framing, and RF link budget power calculations.
                  </p>
                </div>

                {/* 6. Additional Internships: ServiceNow & Pinnacle Labs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[7px]">
                  <div className="bg-white p-1.5 rounded border border-gray-300">
                    <div className="font-bold text-[#1c1d21]">ServiceNow SysAdmin Intern</div>
                    <div className="text-gray-600">Automated business workflows via Flow Designer, verified RBAC, and executed ATF test suites.</div>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-gray-300">
                    <div className="font-bold text-[#1c1d21]">Software Engineer Intern (C++)</div>
                    <div className="text-gray-600">Pinnacle Labs: Developed high-throughput OOP C++ modules with smart pointers &amp; STL algorithms.</div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════
                5. FULL TERMINAL CLI VIEW
               ══════════════════════════════════════════════════ */}
            {activeApp === 'terminal' && (
              <div className="h-full flex flex-col justify-between space-y-1.5">
                <div className="bg-black/90 text-green-400 p-2 rounded-xs border border-green-700 font-mono text-[7px] sm:text-[8px] overflow-y-auto max-h-48 space-y-1 shadow-inner">
                  <div className="text-cyan-300 font-bold border-b border-green-800/60 pb-0.5">
                    PRIYAM_OS INTERACTIVE COMMAND PROMPT (v2026.1)
                  </div>
                  {cliLogs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1 text-[6.5px]">
                    <span className="text-gray-500 font-bold">QUICK:</span>
                    {['about', 'projects', 'skills', 'exp', 'gate', 'cgpa', 'clear'].map((quickCmd) => (
                      <button
                        key={quickCmd}
                        type="button"
                        onClick={() => {
                          setCliInput(quickCmd);
                        }}
                        className="px-1 py-0.2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-[6.5px] font-mono cursor-pointer"
                      >
                        {quickCmd}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleRunCommand} className="flex items-center gap-1 border-t border-gray-300 pt-1">
                    <span className="text-[#1546bd] font-black text-[9px]">&gt;</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Type command (e.g. about, projects, skills, gate)..."
                      className="flex-1 bg-white border border-[#1c1d21] px-1.5 py-1 text-[7.5px] sm:text-[8px] font-mono text-[#1c1d21] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#1e40af] hover:bg-[#1546bd] text-white text-[7.5px] font-bold rounded-xs cursor-pointer active:scale-95"
                    >
                      EXECUTE
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Window Bottom Banner: One-click Full Portfolio Expansion */}
          <div className="bg-[#ede5d6] border-t border-[#1c1d21] px-2 py-1 flex items-center justify-between shrink-0">
            <span className="text-[7px] font-bold text-gray-700">
              PRIYAM_OS Desktop Shell • VIT Bhopal ECE
            </span>
            <button
              onClick={() => {
                playWindowOpenSound();
                onExpandFullPortfolio();
              }}
              className="text-[7px] font-black text-blue-700 hover:text-blue-900 underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Expand to Full Web Portfolio</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. CRT Bottom Windows 95 Style Taskbar */}
      <div className="bg-[#0e308c] border-t border-blue-400/30 px-2 py-0.5 flex items-center justify-between text-[8px] font-mono select-none -mx-1.5 sm:-mx-2 -mb-1.5 sm:-mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          {/* Start button */}
          <div
            onClick={onExpandFullPortfolio}
            className="flex items-center gap-1 px-1.5 py-0.5 bg-[#d1d5db] hover:bg-white text-[#1c1d21] border border-[#1c1d21] text-[8px] font-bold shadow-xs cursor-pointer active:translate-y-0.5"
          >
            <span className="w-1.5 h-1.5 bg-[#ea580c] inline-block" />
            <span>Start</span>
          </div>
          {/* Active app pill */}
          <div className="px-2 py-0.5 bg-[#1e40af] text-cyan-200 border border-blue-400/40 text-[7px] font-bold uppercase truncate max-w-[110px]">
            {activeApp.toUpperCase()}
          </div>
        </div>

        <div className="text-[7px] sm:text-[8px] text-cyan-200 font-bold font-mono">
          VIT ECE • 8.08 CGPA • ONLINE
        </div>
      </div>
    </div>
  );
};
