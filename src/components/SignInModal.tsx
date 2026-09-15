import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [role, setRole] = useState<'learner' | 'instructor'>('learner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onShowToast(`Welcome back to StartSmart Tech Hub! Logged in as ${role === 'learner' ? 'Learner' : 'Instructor'}.`, 'success');
      onClose();
    }, 650);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#062B68] via-[#073B87] to-[#0866D8] text-white p-6 sm:p-8 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-[#16D9C5]" />
          </div>

          <h3 className="text-2xl font-bold text-white">
            Sign In to StartSmart
          </h3>
          <p className="text-xs text-cyan-200 mt-1">
            Access your course materials, certificate status & practical labs
          </p>
        </div>

        {/* Role toggle */}
        <div className="px-6 sm:px-8 pt-6">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('learner')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'learner'
                  ? 'bg-white text-[#062B68] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learner Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('instructor')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'instructor'
                  ? 'bg-white text-[#062B68] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Instructor Portal
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="p-6 sm:p-8 pt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => onShowToast('Password reset link sent to your registered email.', 'info')}
                className="text-[11px] font-medium text-[#0866D8] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0866D8] to-[#073B87] hover:from-[#073B87] hover:to-[#062B68] shadow-md transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-500">
            Having trouble signing in? Reach out to our Tamale support desk at{' '}
            <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-[#0866D8] underline">
              {BRAND_CONFIG.contact.email}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
