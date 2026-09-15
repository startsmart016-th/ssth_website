import React from 'react';
import { GraduationCap, Laptop, TrendingUp } from 'lucide-react';
import { HERO_FEATURE_POINTS } from '../data/content';

export const HeroFeaturePoints: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#10BFAE]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#16D9C5]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#38BDF8]" />;
      default:
        return <GraduationCap className="w-5 h-5 text-[#10BFAE]" />;
    }
  };

  return (
    <div
      id="hero-feature-points"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2"
    >
      {HERO_FEATURE_POINTS.map((point) => (
        <div
          key={point.id}
          id={`feature-point-${point.id}`}
          className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 backdrop-blur-sm transition-all duration-200 group"
        >
          {/* Circular modern icon container */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-white/10 ring-1 ring-white/20 group-hover:scale-105 transition-transform shadow-inner"
            style={{ borderColor: point.accentColor }}
          >
            {getIcon(point.iconName)}
          </div>

          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-cyan-200 transition-colors">
              {point.title}
            </h4>
            <p className="text-xs text-slate-300/90 leading-snug mt-0.5">
              {point.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
