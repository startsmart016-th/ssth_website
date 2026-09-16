import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Cpu, ShieldCheck, Terminal } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';
import { FounderPresentation } from './FounderPresentation';
import { HeroFeaturePoints } from './HeroFeaturePoints';
import { InteractiveTechBackground } from './InteractiveTechBackground';

interface HeroProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onExploreCourses }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#041E4A] text-white"
    >
      {/* 1. DYNAMIC INTERACTIVE TECH BACKGROUND (Canvas + Constellations + Shockwaves + Interactive Controls + Student Imagery) */}
      <InteractiveTechBackground />

      {/* 2. Floating Parallax Tech Badges (Interact with mouse movement) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto px-4">
        {/* Floating Chip Left Top */}
        <div
          className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#16D9C5]/40 text-xs font-bold text-cyan-200 shadow-lg shadow-[#062B68]/30 transition-transform duration-300 ease-out absolute top-32 left-12"
          style={{
            transform: `translate(${mouseOffset.x * -25}px, ${mouseOffset.y * -25}px)`,
          }}
        >
          <Cpu className="w-3.5 h-3.5 text-[#16D9C5] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Practical Hardware & Software Labs</span>
        </div>

        {/* Floating Chip Right Center */}
        <div
          className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#0866D8]/50 text-xs font-bold text-blue-200 shadow-lg shadow-[#062B68]/30 transition-transform duration-300 ease-out absolute top-48 right-16"
          style={{
            transform: `translate(${mouseOffset.x * 30}px, ${mouseOffset.y * 30}px)`,
          }}
        >
          <Terminal className="w-3.5 h-3.5 text-[#10BFAE]" />
          <span>Full Stack & Data Analytics</span>
        </div>

        {/* Floating Chip Bottom Left */}
        <div
          className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-emerald-400/40 text-xs font-bold text-emerald-200 shadow-lg shadow-[#062B68]/30 transition-transform duration-300 ease-out absolute bottom-28 left-20"
          style={{
            transform: `translate(${mouseOffset.x * -18}px, ${mouseOffset.y * -18}px)`,
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tamale's Premier Tech Training Hub</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 z-10 pointer-events-auto">
        {/* Glassmorphic Hero Content Container */}
        <div
          id="hero-glassmorphism-card"
          className="relative rounded-2xl sm:rounded-3xl lg:rounded-[36px] bg-[#041e4a]/35 sm:bg-[#031c46]/40 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(3,21,51,0.7)] p-4 sm:p-8 lg:p-12 overflow-hidden ring-1 ring-white/10"
        >
          {/* Subtle frosted glass ambient inner reflections */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-white/10 via-[#16D9C5]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-[#0866D8]/20 via-[#10BFAE]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Badge, Headline, Subtitle, CTA buttons, Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-7 z-10 text-center lg:text-left items-center lg:items-start">
            
            {/* Pill/Badge */}
            <div
              id="hero-welcome-badge"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#16D9C5]/40 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider text-cyan-200 shadow-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#16D9C5] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#10BFAE]" />
              <span className="uppercase">{BRAND_CONFIG.headlinePill}</span>
            </div>

            {/* Large Headline */}
            <h1
              id="hero-main-headline"
              className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1]"
            >
              <span className="block text-white">Learn Today.</span>
              <span className="block text-white">Build Tomorrow.</span>
              <span className="block text-[#16D9C5] drop-shadow-[0_2px_14px_rgba(22,217,197,0.35)]">
                Lead the Future.
              </span>
            </h1>

            {/* Subtitle / Value proposition */}
            <div className="max-w-xl space-y-2 text-slate-200">
              <p className="text-base sm:text-xl font-bold text-white tracking-wide">
                {BRAND_CONFIG.valueProposition.lead}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed">
                {BRAND_CONFIG.valueProposition.sub}
              </p>
            </div>

            {/* Two CTA Buttons with Mobile Touch Targets */}
            <div
              id="hero-cta-group"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto pt-1 sm:pt-2"
            >
              <button
                type="button"
                id="hero-start-learning-btn"
                onClick={onStartLearning}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] shadow-lg shadow-[#10BFAE]/25 hover:shadow-[#16D9C5]/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Start Learning Today</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                id="hero-explore-courses-btn"
                onClick={onExploreCourses}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#16D9C5]" />
                <span>Explore Courses</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
              </button>
            </div>

            {/* Three Feature Highlights */}
            <div className="w-full pt-4 border-t border-white/15">
              <HeroFeaturePoints />
            </div>

          </div>

          {/* RIGHT COLUMN: Executive Leadership & Founder Presentation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <FounderPresentation />
          </div>

        </div>
        </div>
      </div>
    </section>
  );
};
