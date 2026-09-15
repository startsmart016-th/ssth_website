import React, { useState } from 'react';
import { X, Send, Award, CheckCircle2 } from 'lucide-react';
import { InstructorApplicationData } from '../types';

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const InstructorModal: React.FC<InstructorModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [formData, setFormData] = useState<InstructorApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    specialization: 'Microsoft Office & Productivity',
    experienceYears: '1-3 Years',
    portfolioUrl: '',
    bio: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onShowToast(`Thank you, ${formData.fullName}! Your instructor application has been submitted to StartSmart Tech Hub.`, 'success');
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 1500);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
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

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16D9C5] mb-2">
            <Award className="w-4 h-4 text-[#10BFAE]" />
            Faculty Recruitment
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Join as an Instructor
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Shape digital careers in Tamale and across Ghana with StartSmart Tech Hub.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-[#10BFAE] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#062B68]">Application Submitted!</h4>
              <p className="text-sm text-slate-600 mt-2 max-w-sm">
                Our academic coordination team will review your credentials and contact you via phone/email for an introductory session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Amina Mohammed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. amina@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 024 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Teaching Specialization
                  </label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                  >
                    <option value="Microsoft Office & Productivity">Microsoft Office & Productivity</option>
                    <option value="Digital Communication">Digital Communication</option>
                    <option value="Data Management & Analysis">Data Management & Analysis</option>
                    <option value="Essential ICT Skills">Essential ICT Skills</option>
                    <option value="Web Development & Coding">Web Development & Coding</option>
                    <option value="Graphic & Multimedia Design">Graphic & Multimedia Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                  >
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  LinkedIn / Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Bio & Teaching Passion
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about your practical teaching background or ICT projects..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0866D8] to-[#10BFAE] hover:from-[#073B87] hover:to-[#16D9C5] transition-all shadow-md mt-2 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <span>Submit Instructor Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
