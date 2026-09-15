import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';
import { FounderPresentation } from './FounderPresentation';
import { HeroFeaturePoints } from './HeroFeaturePoints';

interface HeroProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onExploreCourses }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#041E4A] via-[#062B68] to-[#073B87] text-white"
    >
      {/* BACKGROUND GRAPHICAL ELEMENTS: SVG circuit lines, glowing dots, subtle grid & curves */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="tech-radial-glow absolute -top-40 left-1/4 w-[600px] h-[600px] pointer-events-none blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#0866D8]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative SVG Circuit Nodes and Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10BFAE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0866D8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Subtle Tech Circuit Traces */}
        <path
          d="M -100 200 L 300 200 L 450 350 L 900 350"
          stroke="url(#circuitGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 4"
        />
        <path
          d="M 200 -50 L 200 150 L 320 270"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 600 600 L 800 400 L 1200 400"
          stroke="url(#circuitGrad)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="300" cy="200" r="4" fill="#16D9C5" />
        <circle cx="450" cy="350" r="5" fill="#10BFAE" />
        <circle cx="200" cy="150" r="3" fill="#16D9C5" />
        <circle cx="800" cy="400" r="4" fill="#0866D8" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Badge, Headline, Subtitle, CTA buttons, Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 z-10 text-center lg:text-left items-center lg:items-start">
            
            {/* Pill/Badge */}
            <div
              id="hero-welcome-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#16D9C5]/40 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider text-cyan-200 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#16D9C5] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#10BFAE]" />
              <span className="uppercase">{BRAND_CONFIG.headlinePill}</span>
            </div>

            {/* Large Headline */}
            <h1
              id="hero-main-headline"
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              <span className="block text-white">Learn Today.</span>
              <span className="block text-white">Build Tomorrow.</span>
              <span className="block text-[#16D9C5] drop-shadow-[0_2px_12px_rgba(22,217,197,0.3)]">
                Lead the Future.
              </span>
            </h1>

            {/* Subtitle / Value proposition */}
            <div className="max-w-xl space-y-2 text-slate-200">
              <p className="text-lg sm:text-xl font-bold text-white tracking-wide">
                {BRAND_CONFIG.valueProposition.lead}
              </p>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {BRAND_CONFIG.valueProposition.sub}
              </p>
            </div>

            {/* Two CTA Buttons */}
            <div
              id="hero-cta-group"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto pt-2"
            >
              <button
                type="button"
                id="hero-start-learning-btn"
                onClick={onStartLearning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] shadow-lg shadow-[#10BFAE]/25 hover:shadow-[#16D9C5]/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Learning Today</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                id="hero-explore-courses-btn"
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen className="w-5 h-5 text-[#16D9C5]" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </button>
            </div>

            {/* Three Feature Highlights */}
            <div className="w-full pt-4 border-t border-white/15">
              <HeroFeaturePoints />
            </div>

          </div>

          {/* RIGHT COLUMN: Founder/CEO presentation area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <FounderPresentation />
          </div>

        </div>
      </div>
    </section>
  );
};
