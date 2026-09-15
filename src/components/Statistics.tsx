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
      <div className="rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#062B68]/10 border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {PLATFORM_STATISTICS.map((stat, idx) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className={`flex flex-col items-center text-center group ${
                idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
              }`}
            >
              {/* Stat Icon badge */}
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-50/80 border border-slate-100 flex items-center justify-center mb-3 transition-colors duration-200">
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
