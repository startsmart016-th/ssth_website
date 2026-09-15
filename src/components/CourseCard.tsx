import React from 'react';
import {
  ArrowRight,
  Clock,
  BarChart3,
  FileSpreadsheet,
  MessageSquareCode,
  Database,
  Cpu,
  Code,
  Palette,
  Laptop,
  Smartphone,
  Presentation,
  TrendingUp,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';
import { Course } from '../types';
import { BRAND_CONFIG } from '../data/content';

interface CourseCardProps {
  course: Course;
  onViewCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewCourse }) => {
  const getCourseIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={`${iconClass} text-[#0866D8]`} />;
      case 'MessageSquareCode':
        return <MessageSquareCode className={`${iconClass} text-[#10BFAE]`} />;
      case 'Database':
        return <Database className={`${iconClass} text-[#073B87]`} />;
      case 'Cpu':
        return <Cpu className={`${iconClass} text-[#16D9C5]`} />;
      case 'Code':
        return <Code className={`${iconClass} text-[#0866D8]`} />;
      case 'Palette':
        return <Palette className={`${iconClass} text-rose-500`} />;
      case 'Laptop':
        return <Laptop className={`${iconClass} text-[#073B87]`} />;
      case 'Smartphone':
        return <Smartphone className={`${iconClass} text-[#10BFAE]`} />;
      case 'Presentation':
        return <Presentation className={`${iconClass} text-amber-500`} />;
      case 'TrendingUp':
        return <TrendingUp className={`${iconClass} text-emerald-600`} />;
      case 'GraduationCap':
        return <GraduationCap className={`${iconClass} text-[#0866D8]`} />;
      default:
        return <FileSpreadsheet className={`${iconClass} text-[#0866D8]`} />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case '100':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '200':
        return 'bg-blue-50 text-[#0866D8] border-blue-200';
      case '300':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case '400':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const whatsappInquiryUrl = `https://wa.me/233241695698?text=${encodeURIComponent(
    `Hello StartSmart Tech Hub, I want to enroll in ${course.code}: ${course.title} (GHC ${course.priceGhs}). Please send me registration and schedule details.`
  )}`;

  return (
    <div
      id={`course-card-${course.id}`}
      className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/80 hover:border-[#10BFAE]/60 shadow-sm hover:shadow-xl hover:shadow-[#062B68]/10 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/* Top Banner & Icon Header */}
      <div className="p-5 sm:p-6 pb-3">
        <div className="flex items-center justify-between mb-3.5">
          {/* Circular/Rounded Icon container */}
          <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-teal-50/60 border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm">
            {getCourseIcon(course.iconName)}
          </div>

          <div className="flex items-center gap-1.5">
            {course.isNew && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 animate-pulse">
                NEW
              </span>
            )}
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono tracking-wide border ${getTierColor(
                course.levelTier
              )}`}
            >
              {course.code}
            </span>
          </div>
        </div>

        {/* Category / Tier */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0866D8]">
            {course.levelTierName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#062B68] group-hover:text-[#0866D8] transition-colors mt-1 line-clamp-1">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">
          {course.description}
        </p>

        {/* Price Tag Highlight */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <span className="text-[11px] font-medium uppercase text-slate-400 tracking-wider">Tuition Fee</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-slate-500">GHC</span>
            <span className="text-xl font-extrabold text-[#062B68] tracking-tight">{course.priceGhs}</span>
          </div>
        </div>
      </div>

      {/* Meta details & Action */}
      <div className="px-5 sm:px-6 pb-5 pt-2 mt-auto">
        <div className="py-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#10BFAE]" />
            <span className="font-semibold text-slate-700 truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500 truncate">{course.level}</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id={`view-course-btn-${course.id}`}
            onClick={() => onViewCourse(course)}
            className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl text-xs font-bold text-[#073B87] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-200 cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`whatsapp-enroll-${course.id}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all duration-200 cursor-pointer"
            title={`Chat on WhatsApp to enroll in ${course.code}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enroll</span>
          </a>
        </div>
      </div>
    </div>
  );
};
