import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  MessageCircle,
} from 'lucide-react';
import { BRAND_CONFIG, ALL_COURSES, PACKAGE_DEALS } from '../data/content';
import { ContactFormData } from '../types';

interface ContactProps {
  onShowToast: (message: string, type: 'success' | 'info') => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    courseInterest: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://formspree.io/f/mrpbzbqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formType: 'Contact / Inquiry Submission',
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          courseInterest: formData.courseInterest,
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        onShowToast(`Thank you, ${formData.fullName}! Your message has been sent to StartSmart Tech Hub.`, 'success');
        setFormData({
          fullName: '',
          email: '',
          courseInterest: 'General Inquiry',
          message: '',
        });
      } else {
        const data = await response.json().catch(() => ({}));
        const err = data.errors
          ? data.errors.map((item: { message: string }) => item.message).join(', ')
          : (data.error || 'Failed to send message. Please try again.');
        setErrorMsg(err);
        onShowToast('Could not send message. Please check the form and try again.', 'info');
      }
    } catch {
      setErrorMsg('Network error. Please verify your connection or try again.');
      onShowToast('Network error while connecting to server. Please try again.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#F5F8FC] border-t border-slate-200/60 scroll-mt-16 relative overflow-hidden"
    >
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 tech-dot-grid-light opacity-50 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0866D8]/10 border border-[#0866D8]/20 text-[#0866D8] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-[#10BFAE]" />
            Get In Touch
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062B68] tracking-tight"
          >
            Connect With StartSmart Tech Hub
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Have questions about our 2026 tech batches, fees, or course schedules? Reach out to us via WhatsApp, phone, email, or visit our Tamale center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            
            {/* WhatsApp Priority Card */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Official WhatsApp</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-200 text-emerald-800">Instant Chat</span>
                </div>
                <h4 className="text-xl font-extrabold text-[#062B68] mt-1">
                  <a
                    href={BRAND_CONFIG.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {BRAND_CONFIG.contact.whatsapp}
                  </a>
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Chat directly with our admissions and technical instructors for fast answers.
                </p>
                <a
                  href={BRAND_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0866D8] flex items-center justify-center shrink-0 border border-blue-100">
                <MapPin className="w-6 h-6 text-[#0866D8]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus & Lab Location</span>
                <h4 className="text-lg font-bold text-[#062B68] mt-0.5">{BRAND_CONFIG.contact.location}</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {BRAND_CONFIG.contact.address}
                </p>
              </div>
            </div>

            {/* Social Channels Card (Facebook & TikTok) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Follow Our Social Media
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Facebook */}
                <a
                  href={BRAND_CONFIG.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#1877F2]/5 hover:bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center gap-3 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Facebook</span>
                    <span className="text-xs font-bold text-[#062B68] group-hover:text-[#0866D8] transition-colors">
                      {BRAND_CONFIG.contact.facebookName}
                    </span>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href={BRAND_CONFIG.contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-black/5 hover:bg-black/10 border border-black/15 flex items-center gap-3 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.044.87.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.96-4.52V8.75a8.28 8.28 0 0 0 4.81 1.52V6.82a4.88 4.88 0 0 1-1-.13z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">TikTok</span>
                    <span className="text-xs font-bold text-[#062B68] group-hover:text-[#0866D8] transition-colors">
                      {BRAND_CONFIG.contact.tiktokHandle}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <Mail className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Addresses</span>
                <div className="mt-1 space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#062B68]">
                    <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-[#0866D8] transition-colors">
                      {BRAND_CONFIG.contact.email}
                    </a>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Alternate: <a href={`mailto:${BRAND_CONFIG.contact.secondaryEmail}`} className="hover:text-[#0866D8] underline">{BRAND_CONFIG.contact.secondaryEmail}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours Badge */}
            <div className="p-4 rounded-xl bg-white/70 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
              <Clock className="w-4 h-4 text-[#10BFAE] shrink-0" />
              <span>{BRAND_CONFIG.contact.workingHours}</span>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50">
              
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-teal-50 text-[#10BFAE] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#062B68]">Message Sent Successfully!</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-md">
                    Thank you for reaching out to StartSmart Tech Hub. An advisor from our Tamale center will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#073B87] hover:bg-[#0866D8] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/mrpbzbqe"
                  method="POST"
                  className="space-y-5"
                  id="startsmart-contact-form"
                >
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#062B68]">Send Us a Direct Message</h3>
                    <p className="text-xs text-slate-500 mt-1">Fill out the form below and we will get back to you promptly.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ibrahim Abdulai"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ibrahim@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Course of Interest with all 25 courses and package deals */}
                  <div>
                    <label htmlFor="contact-courseInterest" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Select Course or Package Deal
                    </label>
                    <select
                      id="contact-courseInterest"
                      name="courseInterest"
                      value={formData.courseInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] focus:bg-white transition-all text-slate-700"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      
                      <optgroup label="📦 Package Deals (Save up to GHC 400)">
                        {PACKAGE_DEALS.map((deal) => (
                          <option key={deal.id} value={`${deal.title} (GHC ${deal.discountedPriceGhs})`}>
                            {deal.title} - GHC {deal.discountedPriceGhs} ({deal.badge})
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="🌱 100 Level: Foundation Programs">
                        {ALL_COURSES.filter((c) => c.levelTier === '100').map((c) => (
                          <option key={c.id} value={`${c.code}: ${c.title} (GHC ${c.priceGhs})`}>
                            {c.code}: {c.title} - GHC {c.priceGhs} ({c.duration})
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="🚀 200 Level: Intermediate Programs">
                        {ALL_COURSES.filter((c) => c.levelTier === '200').map((c) => (
                          <option key={c.id} value={`${c.code}: ${c.title} (GHC ${c.priceGhs})`}>
                            {c.code}: {c.title} - GHC {c.priceGhs} ({c.duration})
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="🎯 300 Level: Specialization Tracks">
                        {ALL_COURSES.filter((c) => c.levelTier === '300').map((c) => (
                          <option key={c.id} value={`${c.code}: ${c.title} (GHC ${c.priceGhs})`}>
                            {c.code}: {c.title} - GHC {c.priceGhs} ({c.duration})
                          </option>
                        ))}
                      </optgroup>

                      <optgroup label="🏆 400 Level: Advanced Programs">
                        {ALL_COURSES.filter((c) => c.levelTier === '400').map((c) => (
                          <option key={c.id} value={`${c.code}: ${c.title} (GHC ${c.priceGhs})`}>
                            {c.code}: {c.title} - GHC {c.priceGhs} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message / Questions <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ask about timetable, practical lab slots, payment methods, or student requirements..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0866D8] to-[#10BFAE] hover:from-[#073B87] hover:to-[#16D9C5] shadow-lg shadow-[#0866D8]/20 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message to StartSmart</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
