import React, { useState } from 'react';
import { X, Cpu, Terminal, Zap, ArrowRight, Play, CheckCircle, ExternalLink, Github } from 'lucide-react';
import { playClickSound, playKeySound } from '../utils/sound';

export type HardwareType = 'arduino' | 'raspberry-pi';

interface HardwareSpecsModalProps {
  type: HardwareType;
  onClose: () => void;
  onNavigateToProjects?: (projectName?: string) => void;
  onToggleArduinoBlink?: () => void;
  isArduinoBlinking?: boolean;
}

export const HardwareSpecsModal: React.FC<HardwareSpecsModalProps> = ({
  type,
  onClose,
  onNavigateToProjects,
  onToggleArduinoBlink,
  isArduinoBlinking = true,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'projects' | 'terminal'>('specs');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    type === 'arduino'
      ? 'AVR-GCC 12.2.0 (ATmega328P target) initialized.\nReady for flashing via /dev/ttyUSB0 @ 115200 baud.'
      : 'Linux priyam-rpi4 6.1.21-v8+ #1642 SMP PREEMPT aarch64\nDebian GNU/Linux 12 (bookworm) / Python 3.11.2\nType command or select test script below.'
  ]);

  const isArduino = type === 'arduino';

  const handleTabChange = (tab: 'specs' | 'projects' | 'terminal') => {
    playClickSound();
    setActiveTab(tab);
  };

  const handleRunCommand = (cmd: string) => {
    playKeySound();
    if (isArduino) {
      if (cmd === 'blink') {
        if (onToggleArduinoBlink) onToggleArduinoBlink();
        setTerminalOutput((prev) => [
          ...prev,
          `$ ./flash_blink.sh --pin=13`,
          `Writing | #################################### | 100% 0.45s`,
          `avrdude: 1084 bytes of flash written`,
          `>>> PIN 13 LED STATUS: ${!isArduinoBlinking ? 'BLINKING (1Hz)' : 'STOPPED'}`
        ]);
      } else if (cmd === 'read_adc') {
        setTerminalOutput((prev) => [
          ...prev,
          `$ analogRead(A0)`,
          `Sampling ADC Channel 0 [Vref=5.0V, 10-bit resolution]...`,
          `Raw ADC Value: 512 | Computed Voltage: 2.50V (Potentiometer centered)`
        ]);
      } else if (cmd === 'uart_dump') {
        setTerminalOutput((prev) => [
          ...prev,
          `$ screen /dev/ttyUSB0 9600`,
          `[HC-05 BLUETOOTH READY]`,
          `VOICE_COMMAND_RX: "FORWARD" -> L298N PWM IN1:255 IN2:0 IN3:255 IN4:0`,
          `ULTRASONIC_DISTANCE: 42.8 cm (Clear path)`
        ]);
      }
    } else {
      if (cmd === 'pinout') {
        setTerminalOutput((prev) => [
          ...prev,
          `$ pinout`,
          `,--------------------------------.`,
          `| oooooooooooooooooooo J8   +====| 4x USB`,
          `| 1ooooooooooooooooooo      |    | [3.0+2.0]`,
          `|    +---+                  +====|`,
          `|    |SoC|     +---+             |`,
          `|    +---+     |RAM|             |`,
          `|                    +===+       | 1Gbps LAN`,
          `| [PWR] [HDMI0] [HDMI1]  |   +===|`,
          `\`--------------------------------'`,
          `BCM2711 64-bit 4 Cores @ 1.5GHz | 40-Pin GPIO active`
        ]);
      } else if (cmd === 'measure_temp') {
        setTerminalOutput((prev) => [
          ...prev,
          `$ vcgencmd measure_temp`,
          `temp=41.2'C (Active cooling thermal throttling: INACTIVE)`,
          `$ vcgencmd get_throttled`,
          `throttled=0x0 (System healthy, full 1.5GHz governor boost)`
        ]);
      } else if (cmd === 'run_cv') {
        setTerminalOutput((prev) => [
          ...prev,
          `$ python3 face_attendance_pipeline.py --camera=0`,
          `[OpenCV 4.8.0] Loading Haar Cascade & LBPH Face Recognizer...`,
          `Model loaded in 0.32s. Processing camera feed @ 30 FPS.`,
          `Match found: Priyam Prakash (ID: 24BEC10139) - Confidence: 94.6%`,
          `Attendance logged to sqlite:///attendance_db.sqlite`
        ]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs font-['Space_Mono',monospace] animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#ede5d6] border-4 border-[#1c1d21] shadow-[8px_8px_0px_#1c1d21] rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Header Bar */}
        <div className={`px-3 py-2 flex items-center justify-between border-b-3 border-[#1c1d21] ${
          isArduino ? 'bg-[#00878a] text-white' : 'bg-[#15803d] text-white'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#facc15] border border-[#1c1d21]" />
            <div className="font-['Press_Start_2P'] text-[10px] sm:text-xs font-bold tracking-tight">
              {isArduino ? 'ARDUINO_UNO_R3.HW' : 'RASPBERRY_PI_4B.SYS'}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-6 h-6 bg-[#dc2626] hover:bg-[#ef4444] text-white border-2 border-[#1c1d21] rounded flex items-center justify-center cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
              title="Close window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#dcd3be] border-b-2 border-[#1c1d21] px-3 pt-2 flex items-center gap-1">
          <button
            onClick={() => handleTabChange('specs')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-bold border-2 border-b-0 border-[#1c1d21] rounded-t-md transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-[#ede5d6] text-[#1c1d21] -mb-[2px] pb-2 font-black shadow-xs'
                : 'bg-[#c9bea7] text-gray-700 hover:bg-[#d8ceb8]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware Specs</span>
            </span>
          </button>

          <button
            onClick={() => handleTabChange('projects')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-bold border-2 border-b-0 border-[#1c1d21] rounded-t-md transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#ede5d6] text-[#1c1d21] -mb-[2px] pb-2 font-black shadow-xs'
                : 'bg-[#c9bea7] text-gray-700 hover:bg-[#d8ceb8]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Related Projects</span>
            </span>
          </button>

          <button
            onClick={() => handleTabChange('terminal')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-bold border-2 border-b-0 border-[#1c1d21] rounded-t-md transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#ede5d6] text-[#1c1d21] -mb-[2px] pb-2 font-black shadow-xs'
                : 'bg-[#c9bea7] text-gray-700 hover:bg-[#d8ceb8]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Test Shell</span>
            </span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: HARDWARE SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              {/* Summary Card */}
              <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-[3px_3px_0px_#1c1d21] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                    {isArduino ? '8-Bit Microcontroller Unit' : '64-Bit Single Board Computer'}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#1c1d21] leading-tight">
                    {isArduino ? 'Arduino Uno R3 (ATmega328P)' : 'Raspberry Pi 4 Model B'}
                  </h3>
                  <p className="text-xs text-gray-700 mt-0.5">
                    {isArduino
                      ? 'Standard hardware platform for embedded C/C++ control systems, PWM motor drivers, and sensor instrumentation.'
                      : 'High-performance Linux computing platform used for Computer Vision, OpenCV Edge AI, and distributed IoT gateways.'}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className={`px-2.5 py-1 text-xs font-black border-2 border-[#1c1d21] rounded-md shadow-xs ${
                    isArduino ? 'bg-[#00878a] text-white' : 'bg-[#15803d] text-white'
                  }`}>
                    {isArduino ? '5V LOGIC • 16MHz' : '4GB LPDDR4 • ARM v8'}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {isArduino ? (
                  <>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">CORE PROCESSOR</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">Microchip ATmega328P (8-bit AVR RISC)</div>
                      <div className="text-[10px] text-gray-600">Clock speed: 16 MHz Crystal Oscillator</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">MEMORY CONFIGURATION</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">32 KB Flash + 2 KB SRAM</div>
                      <div className="text-[10px] text-gray-600">1 KB EEPROM Non-Volatile Storage</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">DIGITAL I/O & PWM</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">14 Digital Pins (6 Hardware PWM)</div>
                      <div className="text-[10px] text-gray-600">Max 40mA per I/O pin @ 5V Logic</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">ANALOG & BUS PROTOCOLS</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">6x 10-Bit ADC Channels (A0 - A5)</div>
                      <div className="text-[10px] text-gray-600">Hardware UART (D0/D1), SPI (10-13), I2C (A4/A5)</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">SYSTEM ON CHIP (SoC)</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">Broadcom BCM2711, Quad Cortex-A72</div>
                      <div className="text-[10px] text-gray-600">64-bit ARM v8 Architecture @ 1.5 GHz</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">RAM & STORAGE</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">4GB LPDDR4-3200 SDRAM</div>
                      <div className="text-[10px] text-gray-600">MicroSD Slot with High-Speed UHS-I Bus</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">CONNECTIVITY & PORTS</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">Gigabit Ethernet, 2.4/5GHz Wi-Fi, BT 5.0</div>
                      <div className="text-[10px] text-gray-600">2x USB 3.0 (Blue), 2x USB 2.0, USB-C Power</div>
                    </div>
                    <div className="bg-white border-2 border-[#1c1d21] p-2.5 rounded shadow-xs">
                      <div className="text-[9px] font-bold text-gray-500">DISPLAY & GPIO EXPANSION</div>
                      <div className="text-xs font-black text-[#1c1d21] mt-0.5">Dual 4Kp60 Micro-HDMI + MIPI DSI</div>
                      <div className="text-[10px] text-gray-600">Standard 40-Pin GPIO Header (UART, SPI, I2C, PWM)</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: RELATED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <div className="text-xs text-gray-700 font-bold">
                {isArduino
                  ? 'Key engineering builds by Priyam Prakash implemented with Arduino & Microcontrollers:'
                  : 'Key engineering builds by Priyam Prakash implemented with Raspberry Pi, Linux & Edge AI:'}
              </div>

              {isArduino ? (
                <>
                  {/* Project 1: Arduino Uno Simulator & Beginner Hub */}
                  <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-yellow-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00878a]" />
                        <h4 className="font-black text-sm text-[#1c1d21]">
                          Arduino Uno Simulator &amp; Beginner Master Hub
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Web-based ATmega328P browser emulator with virtual breadboards, interactive I/O pins, LED control, and C++ sketch testing.
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">Web AVR Engine</span>
                        <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 text-[9px] font-bold rounded">C++ / Hardware Sim</span>
                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[9px] font-bold rounded">Browser IDE</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/Arduino-Beginner-Master-Hub-"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2.5 py-1.5 bg-[#1c1d21] hover:bg-black text-white font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5 text-[#facc15]" />
                        <span>[ Repo ]</span>
                      </a>
                      <button
                        onClick={() => {
                          playClickSound();
                          onClose();
                          if (onNavigateToProjects) onNavigateToProjects('projects');
                        }}
                        className="px-3 py-1.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Project 2: Obstacle Car */}
                  <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-yellow-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00878a]" />
                        <h4 className="font-black text-sm text-[#1c1d21]">
                          Voice-Controlled Obstacle-Avoiding Car
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Arduino Uno + L298N Motor Driver + HC-05 Bluetooth module + Ultrasonic sensor mounted on SG90 micro servo for 180° spatial scanning.
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">C++ / Arduino IDE</span>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[9px] font-bold rounded">Ultrasonic Scanning</span>
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">PWM Speed Control</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/Robotics-Obstacle-Avoidance-Car"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2.5 py-1.5 bg-[#1c1d21] hover:bg-black text-white font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5 text-[#facc15]" />
                        <span>[ Repo ]</span>
                      </a>
                      <button
                        onClick={() => {
                          playClickSound();
                          onClose();
                          if (onNavigateToProjects) onNavigateToProjects('projects');
                        }}
                        className="px-3 py-1.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Project 3: CanSat / ESP32 Telemetry */}
                  <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-yellow-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00878a]" />
                        <h4 className="font-black text-sm text-[#1c1d21]">
                          CanSat Satellite Telemetry &amp; Sensor Subsystem
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Engineered embedded sensor node with I2C BMP280 barometer, MPU6050 6-DOF IMU, and LoRa transceiver transmitting live descent telemetry.
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[9px] font-bold rounded">India Space Lab</span>
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">I2C / SPI Bus</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playClickSound();
                        onClose();
                        if (onNavigateToProjects) onNavigateToProjects('experience');
                      }}
                      className="shrink-0 px-3 py-1.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>View Lab Log</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Pi Project 1: Real-Time Face Recognition */}
                  <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-yellow-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                        <h4 className="font-black text-sm text-[#1c1d21]">
                          Real-Time Face Recognition Attendance System
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Engineered automated edge biometric logger utilizing Python, OpenCV Haar cascades, and LBPH face recognition deployed on edge camera feeds.
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">Python / OpenCV</span>
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">SQLite DB</span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-800 text-[9px] font-bold rounded">Edge Inference</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playClickSound();
                        onClose();
                        if (onNavigateToProjects) onNavigateToProjects('projects');
                      }}
                      className="shrink-0 px-3 py-1.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>View in Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pi Project 2: Automated CAPTCHA Decoding */}
                  <div className="bg-white border-2 border-[#1c1d21] p-3 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:bg-yellow-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                        <h4 className="font-black text-sm text-[#1c1d21]">
                          Automated CAPTCHA Decoding System (CRNN)
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Convolutional Recurrent Neural Network (CRNN) achieving 98.4% optical text recognition accuracy with automated contour extraction.
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-bold rounded">PyTorch / CRNN</span>
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded">IIT Madras Shaastra</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <a
                        href="https://github.com/Infinite-L00pBaCk/vtop-auto-login-captcha-solver"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        className="px-2.5 py-1.5 bg-[#1c1d21] hover:bg-black text-white font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5 text-[#facc15]" />
                        <span>[ Repo ]</span>
                      </a>
                      <button
                        onClick={() => {
                          playClickSound();
                          onClose();
                          if (onNavigateToProjects) onNavigateToProjects('projects');
                        }}
                        className="px-3 py-1.5 bg-[#facc15] hover:bg-[#fde047] text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: LIVE TEST SHELL */}
          {activeTab === 'terminal' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-800">Interactive Hardware Test Sandbox:</span>
                <span className="text-[10px] text-gray-600 font-mono">Simulated Web Hardware Bridge</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {isArduino ? (
                  <>
                    <button
                      onClick={() => handleRunCommand('blink')}
                      className="px-3 py-1.5 bg-[#00878a] hover:bg-[#006f72] text-white font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isArduinoBlinking ? 'Stop Pin 13 LED' : 'Flash Pin 13 LED (Blink)'}</span>
                    </button>

                    <button
                      onClick={() => handleRunCommand('read_adc')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer"
                    >
                      <span>Sample ADC (A0 Potentiometer)</span>
                    </button>

                    <button
                      onClick={() => handleRunCommand('uart_dump')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer"
                    >
                      <span>Monitor UART (HC-05 Stream)</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleRunCommand('pinout')}
                      className="px-3 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3" />
                      <span>Display 40-Pin GPIO Map</span>
                    </button>

                    <button
                      onClick={() => handleRunCommand('measure_temp')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer"
                    >
                      <span>Check Thermal & Throttling Status</span>
                    </button>

                    <button
                      onClick={() => handleRunCommand('run_cv')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#1c1d21] font-mono text-xs font-bold border-2 border-[#1c1d21] rounded shadow-xs cursor-pointer"
                    >
                      <span>Test OpenCV Face Pipeline</span>
                    </button>
                  </>
                )}
              </div>

              {/* Terminal Window Box */}
              <div className="w-full bg-[#18191e] border-3 border-[#1c1d21] rounded-lg p-3 text-green-400 font-mono text-xs shadow-inner h-44 overflow-y-auto space-y-1 select-text">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                    {line.startsWith('$') ? (
                      <span className="text-yellow-400 font-bold">{line}</span>
                    ) : line.includes('PIN 13') || line.includes('Match found') ? (
                      <span className="text-cyan-300 font-bold">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>&gt;</span>
                  <span className="w-2 h-4 bg-green-400 inline-block animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#dcd3be] border-t-2 border-[#1c1d21] px-4 py-2 flex items-center justify-between text-[10px] font-mono text-gray-700">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-700" />
            <span>Target: Priyam Prakash ECE Hardware Lab</span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-3 py-1 bg-[#1c1d21] text-white hover:bg-gray-800 font-mono text-xs font-bold rounded cursor-pointer"
          >
            Close [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
