import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, Bell, ShieldCheck } from 'lucide-react';

interface NewsletterProps {
  onShowToast?: (message: string, type?: 'success' | 'info') => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return localStorage.getItem('startsmart_newsletter_subscribed') === 'true';
    } catch {
      return false;
    }
  });
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate lead capture saving (can connect to Formspree or newsletter backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);

      try {
        localStorage.setItem('startsmart_newsletter_subscribed', 'true');
        // Store the lead in a local list for offline retrieval
        const existingLeads = JSON.parse(localStorage.getItem('startsmart_newsletter_leads') || '[]');
        existingLeads.push({ email: cleanEmail, date: new Date().toISOString() });
        localStorage.setItem('startsmart_newsletter_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.error('Local storage error:', err);
      }

      if (onShowToast) {
        onShowToast(
          `Subscribed! We'll send cohort schedules and course updates to ${cleanEmail}.`,
          'success'
        );
      }

      setEmail('');
    }, 600);
  };

  return (
    <section
      id="newsletter-section"
      aria-label="Newsletter Subscription"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#F5F8FC] to-white relative overflow-hidden border-t border-slate-200/80"
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 tech-dot-grid-light opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-[#062B68] via-[#052357] to-[#041a42] text-white p-5 sm:p-10 lg:p-14 shadow-2xl shadow-[#062B68]/20 border border-white/10 relative overflow-hidden">
          
          {/* Real Background Imagery: Students & tech learners collaborating on computers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Students learning tech and working on laptops together"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-[1.2] opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#062B68]/95 via-[#052357]/80 to-[#041a42]/95 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041a42] via-transparent to-[#062B68]/80" />

            {/* Human Code background watermark */}
            <div className="absolute top-4 right-6 font-mono text-[10px] text-cyan-400/10 pointer-events-none hidden md:block text-right">
              <p>{`// Human Code Lab: Tamale Priority Cohort`}</p>
              <p>{`async function subscribeLearner(email: string) {`}</p>
              <p>{`  await hub.notifyUpcomingDates({ cohort: "2026", track: "All" });`}</p>
              <p>{`}`}</p>
            </div>
          </div>

          {/* Subtle Cyber Grid & Glowing Orbs inside the card */}
          <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#16D9C5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#0866D8]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Pill Badge with Human Code Tag */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#16D9C5]/40 backdrop-blur-md text-cyan-200 text-xs font-bold tracking-wider uppercase shadow-sm">
                <Bell className="w-3.5 h-3.5 text-[#16D9C5] animate-bounce" />
                <span>Priority Cohort Alerts</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10BFAE]/15 border border-[#16D9C5]/30 text-cyan-200 text-[11px] font-mono">
                <span>// Tamale Tech Hub</span>
              </div>
            </div>

            {/* Headline */}
            <h2
              id="newsletter-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Never Miss Upcoming Training Dates & Course Updates
            </h2>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Be the first to know when new cohorts open, receive early-bird registration discounts, and get practical digital tech guides sent directly to your inbox.
            </p>

            {/* Form or Confirmed State */}
            {isSubscribed ? (
              <div
                id="newsletter-confirmed-banner"
                className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-white/10 border border-[#16D9C5]/40 backdrop-blur-md text-left flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto animate-fadeIn"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#16D9C5]/20 text-[#16D9C5] flex items-center justify-center shrink-0 border border-[#16D9C5]/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      You're on the priority list!
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      We'll notify you as soon as upcoming class schedules are published.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubscribed(false)}
                  className="text-xs font-semibold text-cyan-300 hover:text-white underline underline-offset-2 shrink-0 cursor-pointer"
                >
                  Change email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="newsletter-form"
                noValidate
                className="mt-6 sm:mt-8 max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner focus-within:border-[#16D9C5]/80 focus-within:ring-2 focus-within:ring-[#16D9C5]/30 transition-all">
                  
                  {/* Email Input Field */}
                  <div className="relative flex-1 flex items-center">
                    <Mail className="w-5 h-5 text-cyan-200/70 absolute left-3.5 pointer-events-none shrink-0" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your email address..."
                      aria-label="Email address for newsletter"
                      className="w-full bg-transparent pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-300/80 focus:outline-none"
                    />
                  </div>

                  {/* Subscribe Button with min-44px touch target */}
                  <button
                    type="submit"
                    id="newsletter-subscribe-btn"
                    disabled={isSubmitting}
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] shadow-lg shadow-[#10BFAE]/30 hover:shadow-[#16D9C5]/40 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#062B68] border-t-transparent animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Validation Error Message */}
                {errorMessage && (
                  <p
                    id="newsletter-error-text"
                    className="mt-2.5 text-xs text-rose-300 font-semibold text-center sm:text-left pl-2"
                  >
                    {errorMessage}
                  </p>
                )}
              </form>
            )}

            {/* Anti-spam & Privacy Trust Badges */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16D9C5]" />
                <span>Zero Spam. Unsubscribe anytime.</span>
              </div>
              <span className="hidden sm:inline text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#16D9C5]" />
                <span>Cohort Dates & Exclusive Discounts</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
