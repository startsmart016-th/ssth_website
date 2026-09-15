import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                SS
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">StartSmart Tech Hub</h4>
                <p className="text-[11px] text-emerald-200">Admissions & Technical Support</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              aria-label="Close chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#ECE5DD] space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs text-slate-700 max-w-[90%]">
              Hello! 👋 Welcome to StartSmart Tech Hub. Need course fees, 2026 timetable, or package deals? Chat with us on WhatsApp!
              <span className="block text-[10px] text-slate-400 text-right mt-1">Just now</span>
            </div>
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat {BRAND_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
