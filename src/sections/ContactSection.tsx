import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { RetroWindow } from '../components/RetroWindow';
import { 
  Send, Mail, Phone, MapPin, Github, Linkedin, 
  CheckCircle2, Terminal, RefreshCw, Copy, Check, AlertTriangle, ArrowUpRight 
} from 'lucide-react';
import { playClickSound, playWindowOpenSound } from '../utils/sound';

interface ContactSectionProps {
  data: PortfolioData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submittedData, setSubmittedData] = useState({
    name: '',
    email: '',
    subject: ''
  });
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Terminal Easter Egg state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'help', output: 'Available commands: about, skills, projects, contact, clear, reboot' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClickSound();
    setSendStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/priyamwork111@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject
            ? `[Portfolio Transmission] ${formData.subject}`
            : `[Portfolio Transmission] New message from ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (response.ok && result.success !== 'false') {
        setSubmittedData({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry'
        });
        setSendStatus('sent');
        playWindowOpenSound();
        // Clear fields on successful transmission
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'SMTP Gateway rejected packet transmission.');
      }
    } catch (err: unknown) {
      console.error('Contact transmission error:', err);
      setSendStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Packet drop detected. Please check network connection or use direct email.'
      );
    }
  };

  const handleReset = () => {
    playClickSound();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSendStatus('idle');
    setErrorMessage('');
  };

  const getStatusInfo = () => {
    switch (sendStatus) {
      case 'sending':
        return 'CONNECTION: SECURE (TLS) • TRANSMITTING PACKETS...';
      case 'sent':
        return 'CONNECTION: SECURE (TLS) • TRANSMISSION SUCCESSFUL // MESSAGE DELIVERED';
      case 'error':
        return 'ERROR: TRANSMISSION_FAILED // PACKET_DROP_DETECTED';
      case 'idle':
      default:
        return 'CONNECTION: SECURE (TLS) • READY FOR TRANSMISSION';
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = cliInput.trim().toLowerCase();
    if (!trimmed) return;

    playClickSound();

    let reply = '';
    switch (trimmed) {
      case 'help':
        reply = 'Commands: about, skills, projects, contact, vit, clear, reboot, date';
        break;
      case 'about':
        reply = 'Priyam Prakash: 3rd-year B.Tech ECE student at VIT Bhopal (CGPA 8.38). Embedded Systems & Full-Stack.';
        break;
      case 'skills':
        reply = 'Core: C++, Embedded C, Python, React, TypeScript, ESP32, Raspberry Pi, Web Crypto.';
        break;
      case 'projects':
        reply = '1. Gesture Smart Home  2. PassVault Pro  3. VTOP Auto Login  4. Voice Obstacle Car  5. Banking System';
        break;
      case 'vit':
        reply = 'Vellore Institute of Technology, Bhopal Campus. Electronics & Communication Dept.';
        break;
      case 'contact':
        reply = `Email: ${data.social.email} | Phone: ${data.social.phone}`;
        break;
      case 'date':
        reply = new Date().toString();
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      case 'reboot':
        window.location.reload();
        return;
      default:
        reply = `Command not recognized: "${trimmed}". Type "help" for valid commands.`;
    }

    setCliHistory((prev) => [...prev, { cmd: cliInput, output: reply }]);
    setCliInput('');
  };

  return (
    <section id="contact" className="w-full py-12 font-['Space_Mono',monospace]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b-3 border-[#1c1d21] pb-2">
          <span className="px-2.5 py-0.5 bg-[#f7c815] text-[#1c1d21] font-['Press_Start_2P'] text-xs font-black border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21]">
            09 //
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 tracking-tight">
            CONTACT
          </h2>
          <span className="text-xs text-gray-700 font-mono font-bold hidden sm:inline">
            [NEW TRANSMISSION // EMAIL CLIENT]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form: Retro Email Client */}
          <div className="lg:col-span-7">
            <RetroWindow
              title="NEW_MESSAGE.EXE"
              subtitle="SMTP_CLIENT v1.4"
              icon={<Mail className="w-4 h-4 text-[#f7c815]" />}
              variant="system"
              statusInfo={getStatusInfo()}
            >
              {sendStatus === 'sent' ? (
                <div className="py-8 px-4 text-center space-y-4 bg-[#fffdf7] border-3 border-[#16a34a] shadow-[4px_4px_0px_#1c1d21] animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#dcfce7] border-2 border-[#16a34a] text-[#16a34a] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-['Plus_Jakarta_Sans',sans-serif] text-gray-950">
                      TRANSMISSION SUCCESSFUL // MESSAGE DELIVERED
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1 font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                      Your transmission has been forwarded directly to <strong className="text-[#2067e8]">priyamwork111@gmail.com</strong>.
                    </p>
                  </div>
                  <div className="p-3 bg-[#f5ecdc] border-2 border-[#1c1d21] text-left text-xs font-mono max-w-sm mx-auto space-y-1.5 shadow-[2px_2px_0px_#1c1d21]">
                    <div>FROM: <span className="font-bold text-gray-900">{submittedData.name} &lt;{submittedData.email}&gt;</span></div>
                    <div>TO: <span className="font-bold text-gray-900">Priyam Prakash &lt;priyamwork111@gmail.com&gt;</span></div>
                    <div>SUBJECT: <span className="font-bold text-gray-900">{submittedData.subject}</span></div>
                    <div className="text-[#16a34a] font-black pt-1 border-t border-[#1c1d21]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      STATUS: ACK_RECEIVED (200 OK) // DISPATCHED
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-[#f7c815] hover:bg-[#ffd92e] text-[#1c1d21] text-xs font-mono font-black border-2 border-[#1c1d21] shadow-[3px_3px_0px_#1c1d21] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                  >
                    [ SEND ANOTHER TRANSMISSION ]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-[#ede4d0] p-2.5 border-2 border-[#1c1d21] text-xs text-gray-900 font-bold flex items-center justify-between">
                    <span>TO: Priyam Prakash &lt;priyamwork111@gmail.com&gt;</span>
                    <span className="text-[10px] text-[#2067e8] font-black">PORT 587</span>
                  </div>

                  {/* Error feedback banner if transmission encountered issue */}
                  {sendStatus === 'error' && (
                    <div className="p-3 bg-[#fee2e2] border-2 border-[#ef4444] shadow-[3px_3px_0px_#1c1d21] text-xs font-mono text-[#991b1b] space-y-2">
                      <div className="flex items-center gap-1.5 font-black text-red-900">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>TRANSMISSION FAILED: PACKET DROP DETECTED</span>
                      </div>
                      <p className="text-[11px] text-red-800">
                        {errorMessage || 'Unable to complete network dispatch. You can retry or reach out directly.'}
                      </p>
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:priyamwork111@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`}
                          className="px-2.5 py-1 bg-[#ef4444] hover:bg-[#dc2626] text-white text-[11px] font-mono font-bold border border-[#1c1d21] flex items-center gap-1 shadow-xs"
                        >
                          <span>[ OPEN DIRECT EMAIL CLIENT ]</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black font-mono text-gray-900 uppercase mb-1">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Vance / Hiring Lead"
                      className="w-full px-3 py-2 bg-white border-2 border-[#1c1d21] focus:border-[#2067e8] outline-none text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 font-bold shadow-[2px_2px_0px_#1c1d21]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black font-mono text-gray-900 uppercase mb-1">
                      YOUR EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 bg-white border-2 border-[#1c1d21] focus:border-[#2067e8] outline-none text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 font-bold shadow-[2px_2px_0px_#1c1d21]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black font-mono text-gray-900 uppercase mb-1">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship / Collaboration / Hardware Inquiry"
                      className="w-full px-3 py-2 bg-white border-2 border-[#1c1d21] focus:border-[#2067e8] outline-none text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 font-bold shadow-[2px_2px_0px_#1c1d21]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black font-mono text-gray-900 uppercase mb-1">
                      MESSAGE BODY *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Priyam, I came across your portfolio and wanted to discuss..."
                      className="w-full px-3 py-2 bg-white border-2 border-[#1c1d21] focus:border-[#2067e8] outline-none text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] text-gray-950 font-bold shadow-[2px_2px_0px_#1c1d21] resize-y"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={sendStatus === 'sending'}
                      id="send-transmission-btn"
                      className="px-6 py-2.5 bg-[#f7c815] hover:bg-[#ffd92e] text-[#1c1d21] font-mono text-xs font-black border-3 border-[#1c1d21] shadow-[4px_4px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {sendStatus === 'sending' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#1c1d21]" />
                          <span>TRANSMITTING PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#1c1d21]" />
                          <span>[ SEND TRANSMISSION ]</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-gray-600 hover:text-gray-950 underline font-bold cursor-pointer"
                    >
                      Clear Fields
                    </button>
                  </div>
                </form>
              )}
            </RetroWindow>
          </div>

          {/* Right Column: Direct Channels & Interactive CLI */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Coordinates Card with Pink DL Sticky Note Accent */}
            <div className="relative bg-[#fffdf7] border-3 border-[#1c1d21] p-4 shadow-[4px_4px_0px_#1c1d21] space-y-3">
              {/* Pink Post-It sticker in corner */}
              <div className="absolute -top-3 -right-3 px-2 py-0.5 bg-[#ff548e] text-white font-mono text-[9px] font-black border-2 border-[#1c1d21] rotate-6 shadow-[2px_2px_0px_#1c1d21]">
                DL BESOK!
              </div>

              <div className="text-xs font-mono font-black text-[#1c1d21] border-b-2 border-[#1c1d21] pb-2">
                DIRECT CONTACT CHANNELS
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-2.5 bg-[#ffffff] border-2 border-[#1c1d21] text-xs shadow-[2px_2px_0px_#1c1d21]">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Mail className="w-4 h-4 text-[#2067e8] shrink-0" />
                  <span className="truncate text-gray-900 font-mono font-bold">{data.social.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(data.social.email, 'email')}
                  className="p-1.5 bg-[#ede4d0] hover:bg-[#f7c815] text-[#1c1d21] border border-[#1c1d21] cursor-pointer"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-2.5 bg-[#ffffff] border-2 border-[#1c1d21] text-xs shadow-[2px_2px_0px_#1c1d21]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span className="text-gray-900 font-mono font-bold">{data.social.phone}</span>
                </div>
                <button
                  onClick={() => handleCopy(data.social.phone, 'phone')}
                  className="p-1.5 bg-[#ede4d0] hover:bg-[#f7c815] text-[#1c1d21] border border-[#1c1d21] cursor-pointer"
                  title="Copy phone"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 p-2.5 bg-[#ffffff] border-2 border-[#1c1d21] text-xs text-gray-900 font-bold shadow-[2px_2px_0px_#1c1d21]">
                <MapPin className="w-4 h-4 text-[#ef4444] shrink-0" />
                <span>{data.social.location}</span>
              </div>

              {/* External Profiles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="p-2.5 bg-[#1c1d21] hover:bg-black text-white text-xs font-mono font-black flex items-center justify-center gap-1.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="p-2.5 bg-[#2067e8] hover:bg-[#1853bf] text-white text-xs font-mono font-black flex items-center justify-center gap-1.5 border-2 border-[#1c1d21] shadow-[2px_2px_0px_#1c1d21] active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Interactive Easter Egg Mini Terminal */}
            <div className="bg-[#14234b] border-3 border-[#1c1d21] p-3.5 text-cyan-200 font-mono text-xs shadow-[4px_4px_0px_#1c1d21]">
              <div className="flex items-center justify-between border-b-2 border-blue-400/40 pb-1.5 mb-2 text-[10px] text-cyan-200">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#f7c815]" />
                  <span className="font-bold text-[#f7c815]">SHELL_CLI // PRIYAM_CONSOLE</span>
                </div>
                <span>TYPE "HELP"</span>
              </div>

              {/* Output History */}
              <div className="max-h-36 overflow-y-auto space-y-1.5 text-[11px] mb-2 pr-1">
                {cliHistory.map((item, idx) => (
                  <div key={idx}>
                    <div className="text-gray-300">
                      <span className="text-[#f7c815] font-black">$</span> {item.cmd}
                    </div>
                    <div className="text-cyan-200 pl-3 text-[10px] whitespace-pre-wrap font-medium">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prompt Input */}
              <form onSubmit={handleCliSubmit} className="flex items-center gap-1.5 pt-1.5 border-t-2 border-blue-400/30">
                <span className="text-[#f7c815] font-black">$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type a command (e.g. help, skills, vit)..."
                  className="flex-1 bg-transparent text-white outline-none text-xs font-mono placeholder:text-gray-400"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

