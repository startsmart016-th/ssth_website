import React, { useState } from 'react';
import {
  Award,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Code2,
  Terminal,
  Play,
  RotateCcw,
  User,
  Check,
  FileCode,
  Laptop,
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const FounderPresentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'founder'>('code');
  const [selectedFile, setSelectedFile] = useState<'career.ts' | 'data.py'>('career.ts');
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(BRAND_CONFIG.founder.imageUrl);

  const handleImageError = () => {
    if (imgSrc.includes('i.imgur.com')) {
      setImgSrc('https://imgur.com/Hs6hctE.png');
    }
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setCodeOutput(null);

    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput(
        selectedFile === 'career.ts'
          ? '✨ Build Passed (0 errors)! 14/14 Practical Lab Modules Mastered in Tamale. Ready for Remote & Global Tech Roles 🚀'
          : '📊 Model Accuracy: 98.4%! Real Ghanaian Agriculture & Financial Trends Cleaned & Analyzed with Python & Power BI.'
      );
    }, 600);
  };

  return (
    <div
      id="founder-presentation-container"
      className="relative flex flex-col items-center justify-center lg:items-end w-full max-w-lg mx-auto lg:max-w-none"
    >
      {/* Decorative cyber ambient glow and orbital tech rings */}
      <div className="absolute -inset-4 sm:-inset-8 bg-radial from-[#10BFAE]/20 via-[#0866D8]/10 to-transparent blur-2xl pointer-events-none -z-10" />

      {/* SVG Tech Grid & Curved Circuit Lines surrounding the container */}
      <svg
        className="absolute -top-10 -right-10 w-72 h-72 text-[#16D9C5]/15 pointer-events-none hidden sm:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 20,100 H 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M 140,100 H 180" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="100" r="3" fill="currentColor" />
        <circle cx="140" cy="100" r="3" fill="currentColor" />
      </svg>

      {/* Mode Switcher Tabs (Human Code Studio vs Founder Leadership) */}
      <div className="mb-3 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center p-1 rounded-2xl bg-[#031c46]/80 backdrop-blur-md border border-white/15 shadow-lg">
        <button
          type="button"
          id="toggle-human-code-tab"
          onClick={() => setActiveTab('code')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'code'
              ? 'bg-gradient-to-r from-[#10BFAE] to-[#16D9C5] text-[#062B68] shadow-md shadow-[#10BFAE]/20'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 shrink-0" />
          <span>Human Code Lab</span>
        </button>

        <button
          type="button"
          id="toggle-founder-tab"
          onClick={() => setActiveTab('founder')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'founder'
              ? 'bg-gradient-to-r from-[#0866D8] to-[#10BFAE] text-white shadow-md shadow-[#0866D8]/20'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-3.5 h-3.5 shrink-0" />
          <span>Executive Leader</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]">
        {/* Outer Glow Halo Frame */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#16D9C5]/40 via-[#0866D8]/30 to-[#062B68]/80 shadow-2xl shadow-[#062B68]/80 border border-[#10BFAE]/30 backdrop-blur-sm">
          
          {/* TAB 1: HUMAN CODE STUDIO (Real, Human-Crafted Code Appearance) */}
          {activeTab === 'code' && (
            <div
              id="human-code-appearance-card"
              className="relative rounded-[22px] overflow-hidden bg-[#031533] border border-white/10 flex flex-col justify-between p-4 sm:p-5 text-left font-mono"
            >
              {/* Window Title Bar with Traffic Light Dots */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 pl-1 font-sans hidden sm:inline">
                    StartSmart IDE · Human Code
                  </span>
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile('career.ts');
                      setCodeOutput(null);
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedFile === 'career.ts'
                        ? 'bg-[#0866D8]/30 text-[#16D9C5] border border-[#16D9C5]/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-[#38BDF8]" />
                    <span>career.ts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile('data.py');
                      setCodeOutput(null);
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedFile === 'data.py'
                        ? 'bg-[#0866D8]/30 text-[#16D9C5] border border-[#16D9C5]/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-[#FBBF24]" />
                    <span>data.py</span>
                  </button>
                </div>
              </div>

              {/* Human Coder Attribution Bar */}
              <div className="mb-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[11px] font-sans">
                <div className="flex items-center gap-1.5 text-cyan-200">
                  <span className="w-2 h-2 rounded-full bg-[#16D9C5] animate-pulse" />
                  <span className="font-semibold truncate">Author: Aminata K. (Tamale Student)</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  100% Human Code
                </span>
              </div>

              {/* Code Snippet Editor Content */}
              <div className="rounded-xl bg-[#020D21] p-3 sm:p-3.5 border border-white/5 text-[11px] sm:text-xs leading-relaxed text-slate-300 overflow-x-auto select-text shadow-inner max-h-[260px] overflow-y-auto custom-scrollbar">
                {selectedFile === 'career.ts' ? (
                  <pre className="font-mono">
                    <code>
                      <span className="text-emerald-400/80">{`// 🚀 Authored in StartSmart Hub Lab, Tamale\n`}</span>
                      <span className="text-[#38BDF8]">{`import `}</span>
                      <span className="text-white">{`{ Student, TechSkills } `}</span>
                      <span className="text-[#38BDF8]">{`from `}</span>
                      <span className="text-[#FBBF24]">{`"@startsmart/ghana"`}</span>
                      <span className="text-white">{`;\n\n`}</span>

                      <span className="text-[#16D9C5]">{`export async function `}</span>
                      <span className="text-[#FBBF24]">{`buildFuture`}</span>
                      <span className="text-white">{`(`}</span>
                      <span className="text-white">{`student`}</span>
                      <span className="text-[#38BDF8]">{`: Student`}</span>
                      <span className="text-white">{`) {\n`}</span>

                      <span className="text-slate-500">{`  // 1. Hands-on coding & hardware labs\n`}</span>
                      <span className="text-white">{`  `}</span>
                      <span className="text-[#38BDF8]">{`await `}</span>
                      <span className="text-white">{`student.`}</span>
                      <span className="text-[#16D9C5]">{`masterSkills`}</span>
                      <span className="text-white">{`([\n`}</span>
                      <span className="text-[#FBBF24]">{`    "React & TypeScript",\n`}</span>
                      <span className="text-[#FBBF24]">{`    "Python Data Science",\n`}</span>
                      <span className="text-[#FBBF24]">{`    "Computer Hardware & IoT"\n`}</span>
                      <span className="text-white">{`  ]);\n\n`}</span>

                      <span className="text-slate-500">{`  // 2. Real client production portfolio\n`}</span>
                      <span className="text-[#38BDF8]">{`  const `}</span>
                      <span className="text-white">{`portfolio = `}</span>
                      <span className="text-[#38BDF8]">{`await `}</span>
                      <span className="text-white">{`student.`}</span>
                      <span className="text-[#16D9C5]">{`shipProjects`}</span>
                      <span className="text-white">{`({\n`}</span>
                      <span className="text-white">{`    mentorship: `}</span>
                      <span className="text-[#FBBF24]">{`"1-on-1 Certified"`}</span>
                      <span className="text-white">{`,\n`}</span>
                      <span className="text-white">{`    labHours: `}</span>
                      <span className="text-[#38BDF8]">{`120`}</span>
                      <span className="text-white">{`\n  });\n\n`}</span>

                      <span className="text-slate-500">{`  // 3. Graduate ready to lead\n`}</span>
                      <span className="text-[#16D9C5]">{`  return `}</span>
                      <span className="text-white">{`student.`}</span>
                      <span className="text-[#16D9C5]">{`launchCareer`}</span>
                      <span className="text-white">{`({\n`}</span>
                      <span className="text-white">{`    status: `}</span>
                      <span className="text-[#FBBF24]">{`"Job Ready 🚀"`}</span>
                      <span className="text-white">{`\n  });\n}`}</span>
                    </code>
                  </pre>
                ) : (
                  <pre className="font-mono">
                    <code>
                      <span className="text-emerald-400/80">{`# 📊 Real student data science lab in Tamale\n`}</span>
                      <span className="text-[#38BDF8]">{`import `}</span>
                      <span className="text-white">{`pandas `}</span>
                      <span className="text-[#38BDF8]">{`as `}</span>
                      <span className="text-white">{`pd\n`}</span>
                      <span className="text-[#38BDF8]">{`import `}</span>
                      <span className="text-white">{`matplotlib.pyplot `}</span>
                      <span className="text-[#38BDF8]">{`as `}</span>
                      <span className="text-white">{`plt\n\n`}</span>

                      <span className="text-[#16D9C5]">{`def `}</span>
                      <span className="text-[#FBBF24]">{`analyze_tech_growth`}</span>
                      <span className="text-white">{`(region="Northern Ghana"):`}\n</span>
                      <span className="text-slate-500">{`    # Master data visualization & SQL\n`}</span>
                      <span className="text-white">{`    df = pd.read_csv(`}</span>
                      <span className="text-[#FBBF24]">{`"tamale_graduates.csv"`}</span>
                      <span className="text-white">{`)\n`}</span>
                      <span className="text-white">{`    employment_rate = df[`}</span>
                      <span className="text-[#FBBF24]">{`"employed"`}</span>
                      <span className="text-white">{`].mean()\n`}</span>
                      <span className="text-[#16D9C5]">{`    return `}</span>
                      <span className="text-white">{`f`}</span>
                      <span className="text-[#FBBF24]">{`"Success Rate: {employment_rate * 100}%"`}</span>
                    </code>
                  </pre>
                )}
              </div>

              {/* Interactive Terminal Output (Triggered when Run Code is clicked) */}
              {codeOutput && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-[#010814] border border-[#16D9C5]/30 text-[11px] font-mono text-cyan-200 shadow-inner flex items-start gap-2 animate-in fade-in duration-200">
                  <Terminal className="w-3.5 h-3.5 text-[#16D9C5] shrink-0 mt-0.5" />
                  <p className="leading-snug">{codeOutput}</p>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 font-sans">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Laptop className="w-3.5 h-3.5 text-[#10BFAE]" />
                  <span>Interactive Lab</span>
                </div>

                <button
                  type="button"
                  id="run-human-code-btn"
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] transition-all duration-200 cursor-pointer shadow-md disabled:opacity-75"
                >
                  {isRunningCode ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Compiling...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Human Code</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: FOUNDER & CEO LEADERSHIP VIEW */}
          {activeTab === 'founder' && (
            <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#073B87] via-[#062B68] to-[#041B42] aspect-[4/5] flex flex-col items-center justify-between p-5 sm:p-7">
              {/* Ambient Background Pattern */}
              <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#041B42] via-[#062B68]/90 to-transparent pointer-events-none z-10" />

              {/* Top Badge */}
              <div className="relative z-20 w-full flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium tracking-wide">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16D9C5]" />
                  <span>Executive Leadership</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16D9C5] bg-[#10BFAE]/15 px-2.5 py-1 rounded-full border border-[#10BFAE]/30">
                  <MapPin className="w-3 h-3" />
                  <span>Tamale, Ghana</span>
                </div>
              </div>

              {/* Center Area: Executive Portrait */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-4 ring-[#16D9C5]/50 shadow-2xl shadow-[#041B42] bg-[#073B87]">
                  <img
                    src={imgSrc}
                    alt={`${BRAND_CONFIG.founder.name} - ${BRAND_CONFIG.founder.title}`}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Verified Leadership Overlay Seal */}
                  <div
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-[#10BFAE] to-[#16D9C5] text-[#062B68] p-1.5 rounded-full shadow-lg border-2 border-[#062B68]"
                    title="Verified CEO & Founder"
                  >
                    <CheckCircle className="w-4 h-4 fill-current text-[#062B68]" />
                  </div>
                </div>
              </div>

              {/* Bottom Identity Badge */}
              <div className="relative z-20 w-full pt-2.5 text-center sm:text-left bg-gradient-to-r from-[#062B68]/90 to-[#073B87]/90 rounded-xl p-3 border border-[#10BFAE]/25 backdrop-blur-md">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {BRAND_CONFIG.founder.name}
                      </h3>
                      <CheckCircle className="w-4 h-4 text-[#16D9C5]" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#16D9C5]">
                      {BRAND_CONFIG.founder.title}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {BRAND_CONFIG.founder.company}
                    </p>
                  </div>
                  
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[9px] text-cyan-200/80 font-mono tracking-wider">FOUNDING VISION</span>
                    <span className="text-xs font-bold text-white">Tamale, Ghana</span>
                  </div>
                </div>

                {/* Founder quote */}
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#10BFAE] shrink-0" />
                  <p className="text-[11px] text-slate-200 leading-snug italic line-clamp-2">
                    "Education that empowers individuals to build and lead the digital future."
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Floating Stat Pill: Proven Mentorship */}
        <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 z-30 bg-white text-[#062B68] rounded-xl px-3.5 py-2 shadow-xl border border-slate-100 flex items-center gap-2.5 animate-pulse-subtle">
          <div className="w-8 h-8 rounded-lg bg-[#0866D8]/10 flex items-center justify-center text-[#0866D8]">
            <Award className="w-4 h-4 text-[#0866D8]" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {activeTab === 'code' ? 'Human Craft' : 'Mentorship'}
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-[#062B68]">
              {activeTab === 'code' ? '100% Practical Code' : 'Hands-On ICT Training'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

