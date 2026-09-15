import React from 'react';
import { X, Target, Heart, Sparkles, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#062B68] via-[#073B87] to-[#0866D8] text-white p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16D9C5] mb-1">
            <Sparkles className="w-4 h-4 text-[#10BFAE]" />
            Our Heritage & Story
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            About {BRAND_CONFIG.name}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-200 mt-1">
            {BRAND_CONFIG.tagline} • Tamale, Northern Region, Ghana
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          <div>
            <h4 className="text-base font-bold text-[#062B68] mb-2">
              Our Founding Story & Mission
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Founded by <strong>{BRAND_CONFIG.founder.name}</strong>, StartSmart Tech Hub emerged from a decisive vision: to close the digital divide in Northern Ghana by providing world-class, practical ICT enhancement knowledge for everyday professionals, ambitious students, rising entrepreneurs, and public sector workers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-[#0866D8] font-bold text-sm mb-1.5">
                <Target className="w-4 h-4 text-[#10BFAE]" />
                <span>Our Mission</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                To demystify technology and build actionable, job-ready digital capabilities that empower individuals to thrive in the modern workplace.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-[#0866D8] font-bold text-sm mb-1.5">
                <Heart className="w-4 h-4 text-[#16D9C5]" />
                <span>Our Core Values</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrity, practical excellence, learner-centric empathy, continuous improvement, and local community upliftment.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Why We Are Different
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#10BFAE] shrink-0 mt-0.5" />
                <span><strong>No Theoretical Fluff:</strong> Every single module contains live laboratory exercises, document creation, or software problem solving.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#10BFAE] shrink-0 mt-0.5" />
                <span><strong>Local Mentorship Support:</strong> Direct face-to-face and virtual support from certified trainers rooted in our Tamale center.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#10BFAE] shrink-0 mt-0.5" />
                <span><strong>Recognized Certification:</strong> Verifiable completion credentials that add legitimate weight to your CV and LinkedIn profiles.</span>
              </li>
            </ul>
          </div>

          {/* Founder Quote Card */}
          <div className="p-5 rounded-2xl bg-[#062B68] text-white flex items-start gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#16D9C5] shrink-0 bg-[#073B87] shadow-md">
              <img
                src={BRAND_CONFIG.founder.imageUrl}
                alt={BRAND_CONFIG.founder.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed">
                "{BRAND_CONFIG.founder.quote}"
              </p>
              <div className="mt-2 text-xs font-bold text-[#16D9C5]">
                {BRAND_CONFIG.founder.name} — {BRAND_CONFIG.founder.title}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#10BFAE]" />
            <span>Tamale, Ghana</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0866D8] hover:bg-[#073B87] transition-colors"
            >
              Get In Touch With Our Team
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
