import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

export const Footer: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState<string>(BRAND_CONFIG.logoUrl);

  const handleLogoError = () => {
    if (logoSrc !== BRAND_CONFIG.logoFallbackUrl) {
      setLogoSrc(BRAND_CONFIG.logoFallbackUrl);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative bg-gradient-to-b from-[#062B68] via-[#052152] to-[#031535] text-white pt-16 pb-12 overflow-hidden border-t border-blue-900"
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#10BFAE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 flex items-center justify-center bg-white/95 rounded-xl px-2 py-1 shadow-sm">
                <img
                  src={logoSrc}
                  alt={`${BRAND_CONFIG.name} Logo`}
                  onError={handleLogoError}
                  referrerPolicy="no-referrer"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-xs font-semibold text-[#16D9C5] tracking-wider uppercase">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md pt-2">
              {BRAND_CONFIG.description}
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Founder & CEO:</span> {BRAND_CONFIG.founder.name}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#16D9C5] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>→</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#16D9C5] mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#10BFAE] shrink-0 mt-1" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#10BFAE] shrink-0" />
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {BRAND_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#10BFAE] shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </li>
            </ul>

            {/* Social Media & Direct Chat Links */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2.5">
              {/* WhatsApp */}
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                title="WhatsApp 024 169 5698"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.43 0 .07 5.36.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.93 11.93 0 0 0 5.81 1.49h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.21-3.51-8.4zM12.04 21.84a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.6-.23-.37a9.89 9.89 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.46-4.44 9.87-9.94 9.87zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={BRAND_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] border border-[#1877F2]/40 text-blue-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                title="Facebook: StartSmart Tech Hub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>

              {/* TikTok */}
              <a
                href={BRAND_CONFIG.contact.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-black border border-white/20 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                title="TikTok: @startsmart.tech.hub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.044.87.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.96-4.52V8.75a8.28 8.28 0 0 0 4.81 1.52V6.82a4.88 4.88 0 0 1-1-.13z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{BRAND_CONFIG.copyright}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#16D9C5]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
