import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Sparkles, Building, Award, Laptop } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

interface AboutProps {
  onLearnMore: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'impact'>('mission');

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-white scroll-mt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Modern Illustration & Technology Visual Display */}
          <div className="lg:col-span-6 relative">
            {/* Ambient Backlight */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#10BFAE]/15 via-[#0866D8]/10 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl bg-gradient-to-br from-[#062B68] via-[#073B87] to-[#0866D8] p-6 sm:p-10 text-white overflow-hidden shadow-2xl border border-blue-900">
              
              {/* Tech background graphics */}
              <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header tag */}
                <div className="flex items-center justify-between pb-6 border-b border-white/15">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#16D9C5] uppercase tracking-wider">
                    <Building className="w-4 h-4 text-[#10BFAE]" />
                    <span>ICT Center of Excellence</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-slate-200">
                    <MapPin className="w-3 h-3 text-[#16D9C5]" />
                    <span>Tamale, Ghana</span>
                  </div>
                </div>

                {/* Central Interactive Graphic / Feature Tiles */}
                <div className="my-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="w-9 h-9 rounded-lg bg-[#10BFAE]/20 text-[#16D9C5] flex items-center justify-center mb-2">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-extrabold text-white">100%</div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">Practical Hands-on ICT</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                    <div className="w-9 h-9 rounded-lg bg-[#0866D8]/30 text-sky-300 flex items-center justify-center mb-2">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-extrabold text-white">Verified</div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">Skill Certifications</div>
                  </div>
                </div>

                {/* Local Hub Impact Callout */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-black/20 to-black/40 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#16D9C5] shrink-0 bg-[#062B68] shadow-md">
                      <img
                        src={BRAND_CONFIG.founder.imageUrl}
                        alt={BRAND_CONFIG.founder.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {BRAND_CONFIG.founder.name}
                      </div>
                      <div className="text-xs text-[#16D9C5]">
                        {BRAND_CONFIG.founder.title}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-200 italic leading-relaxed">
                    "{BRAND_CONFIG.founder.quote}"
                  </p>
                </div>

              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="absolute -bottom-5 right-6 sm:right-10 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-2.5 flex items-center gap-2.5 text-[#062B68]">
              <Sparkles className="w-5 h-5 text-[#10BFAE]" />
              <div className="text-xs font-bold">
                Empowering Ghana's Next Generation
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Text & Story */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10BFAE]/10 border border-[#10BFAE]/30 text-[#073B87] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10BFAE]" />
              About StartSmart
            </div>

            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062B68] tracking-tight leading-tight"
            >
              Empowering People Through Digital Skills
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              StartSmart Tech Hub provides practical ICT enhancement knowledge designed to help individuals and professionals build confidence, improve productivity, and adapt to the changing digital workplace.
            </p>

            {/* Key Pillars */}
            <div className="space-y-3 w-full pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#10BFAE] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10BFAE]" />
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  <strong className="text-[#062B68]">Action-Oriented Curricula:</strong> Step-by-step guidance centered on workplace computer tasks, document architecture, data analysis, and digital communications.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#10BFAE] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10BFAE]" />
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  <strong className="text-[#062B68]">Accessible & Inclusive:</strong> Accessible to professionals, university students, small business owners, and learners of all backgrounds across Tamale and beyond.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#10BFAE] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10BFAE]" />
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  <strong className="text-[#062B68]">Local Roots, Global Standards:</strong> Grounded in Tamale, Ghana with international-grade digital workplace competencies.
                </p>
              </div>
            </div>

            {/* Action CTA button */}
            <div className="pt-4">
              <button
                type="button"
                id="about-learn-more-btn"
                onClick={onLearnMore}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#073B87] hover:bg-[#0866D8] shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#16D9C5]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
