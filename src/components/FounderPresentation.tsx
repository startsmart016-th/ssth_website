import React, { useState } from 'react';
import { Award, MapPin, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const FounderPresentation: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string>(BRAND_CONFIG.founder.imageUrl);

  const handleImageError = () => {
    // Fallback between direct i.imgur.com and imgur.com
    if (imgSrc.includes('i.imgur.com')) {
      setImgSrc('https://imgur.com/Hs6hctE.png');
    }
  };

  return (
    <div
      id="founder-presentation-container"
      className="relative flex flex-col items-center justify-center lg:items-end w-full max-w-lg mx-auto lg:max-w-none"
    >
      {/* Decorative cyber ambient glow and orbital tech rings */}
      <div className="absolute -inset-4 sm:-inset-8 bg-radial from-[#10BFAE]/20 via-[#0866D8]/10 to-transparent blur-2xl pointer-events-none -z-10" />

      {/* SVG Tech Grid & Curved Circuit Lines surrounding the portrait */}
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

      {/* Main Integrated Composition */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
        {/* Outer Glow Halo Frame */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#16D9C5]/40 via-[#0866D8]/30 to-[#062B68]/80 shadow-2xl shadow-[#062B68]/80 border border-[#10BFAE]/30 backdrop-blur-sm">
          {/* Inner Portrait Container */}
          <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#073B87] via-[#062B68] to-[#041B42] aspect-[4/5] flex flex-col items-center justify-between p-6 sm:p-8">
            
            {/* Ambient Background Pattern within Portrait Area */}
            <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#041B42] via-[#062B68]/90 to-transparent pointer-events-none z-10" />

            {/* Top Badge: Executive / Verified Leadership */}
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

            {/* Center Area: Executive Portrait of CEO Seidu Mahamadu */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden ring-4 ring-[#16D9C5]/50 shadow-2xl shadow-[#041B42] bg-[#073B87]">
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

            {/* Bottom Presentation Identity Badge (Seamlessly Integrated) */}
            <div className="relative z-20 w-full pt-3 text-center sm:text-left bg-gradient-to-r from-[#062B68]/90 to-[#073B87]/90 rounded-xl p-3.5 border border-[#10BFAE]/25 backdrop-blur-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {BRAND_CONFIG.founder.name}
                    </h3>
                    <CheckCircle className="w-4 h-4 text-[#16D9C5]" />
                  </div>
                  <p className="text-sm font-semibold text-[#16D9C5]">
                    {BRAND_CONFIG.founder.title}
                  </p>
                  <p className="text-xs text-slate-300">
                    {BRAND_CONFIG.founder.company}
                  </p>
                </div>
                
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] text-cyan-200/80 font-mono tracking-wider">FOUNDING VISION</span>
                  <span className="text-xs font-bold text-white">Tamale, Ghana</span>
                </div>
              </div>

              {/* Founder quote pill */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#10BFAE] shrink-0" />
                <p className="text-[11px] text-slate-200 leading-snug italic line-clamp-2">
                  "Education that empowers individuals to build and lead the digital future."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Stat Pill: Proven Mentorship */}
        <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 z-30 bg-white text-[#062B68] rounded-xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse-subtle">
          <div className="w-9 h-9 rounded-lg bg-[#0866D8]/10 flex items-center justify-center text-[#0866D8]">
            <Award className="w-5 h-5 text-[#0866D8]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Mentorship</div>
            <div className="text-sm font-extrabold text-[#062B68]">Hands-On ICT Training</div>
          </div>
        </div>

      </div>
    </div>
  );
};
