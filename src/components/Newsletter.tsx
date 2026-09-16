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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl sm:rounded-[32px] bg-gradient-to-br from-[#062B68] via-[#052357] to-[#041a42] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-[#062B68]/20 border border-white/10 relative overflow-hidden">
          
          {/* Subtle Cyber Grid & Glowing Orbs inside the card */}
          <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#16D9C5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#0866D8]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#16D9C5]/40 backdrop-blur-md text-cyan-200 text-xs font-bold tracking-wider uppercase mb-5 shadow-sm">
              <Bell className="w-3.5 h-3.5 text-[#16D9C5] animate-bounce" />
              <span>Priority Cohort Alerts</span>
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
                className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/10 border border-[#16D9C5]/40 backdrop-blur-md text-left flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto animate-fadeIn"
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
                className="mt-8 max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner focus-within:border-[#16D9C5]/80 focus-within:ring-2 focus-within:ring-[#16D9C5]/30 transition-all">
                  
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

                  {/* Subscribe Button */}
                  <button
                    type="submit"
                    id="newsletter-subscribe-btn"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#062B68] bg-gradient-to-r from-[#16D9C5] to-[#10BFAE] hover:from-[#10BFAE] hover:to-[#16D9C5] shadow-lg shadow-[#10BFAE]/30 hover:shadow-[#16D9C5]/40 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0 cursor-pointer"
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
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
