import React from 'react';
import { ArrowRight, Sparkles, Users, Presentation, Award, CheckCircle2 } from 'lucide-react';

interface InstructorCTAProps {
  onBecomeInstructor: () => void;
}

export const InstructorCTA: React.FC<InstructorCTAProps> = ({ onBecomeInstructor }) => {
  return (
    <section
      id="instructors"
      className="py-16 sm:py-24 bg-white border-t border-slate-200/60 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062B68] via-[#073B87] to-[#0A4EA3] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-900">
          
          {/* Subtle Cyber Grid and Decorative Shapes */}
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#16D9C5]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0866D8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#16D9C5]/30 backdrop-blur-md text-cyan-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#10BFAE]" />
                Instructor Community
              </div>

              <h2
                id="instructor-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              >
                Share Your Knowledge With the World
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Become an instructor and help learners develop practical skills for the future. Teach what you love, mentor aspiring youth in Tamale and across Ghana, and earn while making a lasting community impact.
              </p>

              {/* Perks / Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#16D9C5] shrink-0" />
                  <span>Flexible Teaching Schedules</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#16D9C5] shrink-0" />
                  <span>Competitive Remuneration</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#16D9C5] shrink-0" />
                  <span>Dedicated Teaching Studio</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  id="become-instructor-btn"
                  onClick={onBecomeInstructor}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] shadow-lg shadow-[#10BFAE]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Become an Instructor</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Badge / Statistics Box */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-[#10BFAE]/20 text-[#16D9C5] flex items-center justify-center mb-4 mx-auto sm:mx-0">
                  <Presentation className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Join 40+ Tech Instructors</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Teach coding, office productivity, data analysis, or IT maintenance to ambitious learners eager to absorb your experience.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
