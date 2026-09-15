import React from 'react';
import { Wrench, CalendarCheck, Briefcase, Rocket, Check, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_REASONS } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getReasonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#10BFAE]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-[#0866D8]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#073B87]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#16D9C5]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#10BFAE]" />;
    }
  };

  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-24 bg-[#F5F8FC] border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 tech-dot-grid-light opacity-50 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Circuit Paths */}
      <svg
        className="absolute bottom-0 left-0 w-80 h-80 text-[#10BFAE]/10 pointer-events-none hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 240 240"
      >
        <path d="M 0 180 L 80 180 L 140 120 L 240 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
        <circle cx="80" cy="180" r="3" fill="currentColor" />
        <circle cx="140" cy="120" r="4" fill="currentColor" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10BFAE]/10 border border-[#10BFAE]/30 text-[#073B87] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#10BFAE]" />
            The StartSmart Advantage
          </div>

          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062B68] tracking-tight"
          >
            Why Choose StartSmart Tech Hub?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Engineered from the ground up to give you high-utility skills that pay dividends in your daily career.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_REASONS.map((reason) => (
            <div
              key={reason.id}
              id={`why-card-${reason.id}`}
              className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-[#10BFAE]/50 shadow-sm hover:shadow-xl hover:shadow-[#062B68]/10 transition-all duration-300 transform hover:-translate-y-1.5"
            >
              <div>
                {/* Top Badge Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#10BFAE]/10 border border-slate-100 flex items-center justify-center transition-colors">
                    {getReasonIcon(reason.iconName)}
                  </div>

                  <span className="text-2xl font-black font-mono text-slate-200 group-hover:text-[#10BFAE]/40 transition-colors">
                    {reason.badgeNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#062B68] group-hover:text-[#0866D8] transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Bottom Decorative Accent */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#10BFAE]">
                <Check className="w-4 h-4 text-[#10BFAE]" />
                <span>Verified Impact</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
