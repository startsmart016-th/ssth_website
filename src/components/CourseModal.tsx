import React, { useState } from 'react';
import {
  X,
  Clock,
  BarChart3,
  CheckCircle,
  Send,
  Sparkles,
  MessageCircle,
  Tag,
  BookOpen,
} from 'lucide-react';
import { Course } from '../types';
import { BRAND_CONFIG } from '../data/content';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onShowToast }) => {
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) return null;

  const whatsappInquiryUrl = `https://wa.me/233241695698?text=${encodeURIComponent(
    `Hello StartSmart Tech Hub, I want to enroll in ${course.code}: ${course.title} (Duration: ${course.duration}, Fee: GHC ${course.priceGhs}). Please share next batch dates and payment info.`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/mrpbzbqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formType: 'Course Enrollment Application',
          courseCode: course.code,
          courseTitle: course.title,
          tuitionFeeGhs: course.priceGhs,
          duration: course.duration,
          category: course.levelTierName,
          fullName: enquiryName,
          phone: enquiryPhone,
        }),
      });
      setSubmitted(true);
      onShowToast(`Enrollment request submitted for ${course.code}! We will contact you at ${enquiryPhone}.`, 'success');
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEnquiryName('');
        setEnquiryPhone('');
      }, 1500);
    } catch {
      onShowToast(`Enrollment registered! Our team will contact you.`, 'info');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#10BFAE] text-[#062B68]">
              {course.code}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#16D9C5]">
              {course.levelTierName}
            </span>
            {course.isNew && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500 text-white">
                NEW
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {course.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs sm:text-sm text-cyan-100">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-[#16D9C5]" />
              <span>Duration: <strong>{course.duration}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <BarChart3 className="w-4 h-4 text-[#16D9C5]" />
              <span>Level: <strong>{course.level}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30">
              <Tag className="w-4 h-4 text-emerald-300" />
              <span>Tuition: <strong>GHC {course.priceGhs}</strong></span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Program Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {course.description}
            </p>
            {course.levelGoal && (
              <div className="mt-2 text-xs font-semibold text-[#0866D8] bg-blue-50/80 px-3 py-1.5 rounded-lg inline-block">
                Target: {course.levelGoal}
              </div>
            )}
          </div>

          {/* Curriculum Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Curriculum & Hands-on Modules
            </h4>
            <div className="space-y-2">
              {course.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0866D8]/10 text-[#0866D8] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Learning Outcomes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Job-Ready Capabilities You Will Gain
            </h4>
            <div className="space-y-2">
              {course.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#10BFAE] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Fast Enrollment Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-emerald-950">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-emerald-950">Enroll Instantly via WhatsApp</h5>
                <p className="text-xs text-emerald-700">Fastest response for schedules and registration.</p>
              </div>
            </div>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat {BRAND_CONFIG.contact.phone}</span>
            </a>
          </div>

          {/* Direct Formspree Inquiry Form */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-sm sm:text-base font-bold text-[#062B68] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10BFAE]" />
              Or Submit Your Contact Details Here
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              We will email and call you with full timetable options and batch starting dates.
            </p>

            {submitted ? (
              <div className="mt-4 p-4 rounded-xl bg-white text-center text-xs sm:text-sm font-semibold text-teal-700 border border-teal-100">
                Application received! Our admissions team will reach out promptly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number / WhatsApp (e.g. 024...)"
                  required
                  value={enquiryPhone}
                  onChange={(e) => setEnquiryPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#073B87] hover:bg-[#0866D8] transition-colors shadow-md disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Details...' : `Submit Application for ${course.code}`}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
