import React from 'react';
import { Clock, Globe, ShieldCheck, Target } from 'lucide-react';
import { PLATFORM_BENEFITS } from '../data/content';

export const Benefits: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#10BFAE]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#0866D8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#16D9C5]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#073B87]" />;
      default:
        return <Clock className="w-6 h-6 text-[#10BFAE]" />;
    }
  };

  return (
    <section
      id="platform-benefits-bar"
      aria-label="Key Educational Benefits"
      className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PLATFORM_BENEFITS.map((benefit) => (
          <div
            key={benefit.id}
            id={`benefit-item-${benefit.id}`}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#10BFAE]/40 transition-all duration-200 group"
          >
            {/* Clean Line Icon */}
            <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#10BFAE]/10 border border-slate-100 flex items-center justify-center shrink-0 transition-colors">
              {getBenefitIcon(benefit.iconName)}
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-bold text-[#062B68] group-hover:text-[#0866D8] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
