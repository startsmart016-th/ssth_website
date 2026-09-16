import React from 'react';
import { PLATFORM_STATISTICS } from '../data/content';
import { Users, BookOpenCheck, Award, Smile } from 'lucide-react';

export const Statistics: React.FC = () => {
  const getStatIcon = (id: string) => {
    switch (id) {
      case 'active-learners':
        return <Users className="w-5 h-5 text-[#10BFAE]" />;
      case 'expert-courses':
        return <BookOpenCheck className="w-5 h-5 text-[#16D9C5]" />;
      case 'certificates':
        return <Award className="w-5 h-5 text-[#38BDF8]" />;
      case 'satisfaction':
        return <Smile className="w-5 h-5 text-[#67E8F9]" />;
      default:
        return <Award className="w-5 h-5 text-[#10BFAE]" />;
    }
  };

  return (
    <section
      id="platform-statistics-section"
      aria-label="Platform Key Metrics"
      className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        id="statistics-glass-bar"
        className="relative rounded-2xl sm:rounded-3xl bg-white/80 sm:bg-white/85 backdrop-blur-xl shadow-2xl shadow-[#062B68]/15 border border-white/80 p-6 sm:p-8 overflow-hidden ring-1 ring-slate-900/5 transition-all duration-300 hover:bg-white/90"
      >
        {/* Subtle glass prism ambient glow & specular reflection */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-[#16D9C5]/15 via-teal-100/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gradient-to-tl from-[#0866D8]/15 via-blue-100/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
          {PLATFORM_STATISTICS.map((stat, idx) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className={`flex flex-col items-center text-center group ${
                idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
              }`}
            >
              {/* Stat Icon badge with glass styling */}
              <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-md group-hover:bg-[#10BFAE]/15 border border-white group-hover:border-[#10BFAE]/40 shadow-sm flex items-center justify-center mb-3 transition-all duration-200 group-hover:scale-105">
                {getStatIcon(stat.id)}
              </div>

              {/* Number display */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#062B68] group-hover:text-[#0866D8] transition-colors">
                {stat.value}
              </div>

              {/* Label */}
              <div className="mt-1 text-sm sm:text-base font-bold text-slate-800">
                {stat.label}
              </div>

              {/* Subtext */}
              {stat.subtext && (
                <div className="mt-1 text-xs text-slate-500 hidden sm:block max-w-[180px]">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
