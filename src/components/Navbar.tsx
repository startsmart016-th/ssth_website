import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, BookOpen } from 'lucide-react';
import { BRAND_CONFIG } from '../data/content';

interface NavbarProps {
  onExploreCourses: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExploreCourses }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoSrc, setLogoSrc] = useState<string>(BRAND_CONFIG.logoUrl);

  const handleLogoError = () => {
    if (logoSrc !== BRAND_CONFIG.logoFallbackUrl) {
      setLogoSrc(BRAND_CONFIG.logoFallbackUrl);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['home', 'courses', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Courses', href: '#courses', id: 'courses' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3'
          : 'bg-white py-3.5 sm:py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name & Tagline */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            id="brand-logo-link"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0866D8] rounded-lg p-1"
          >
            {/* Logo Image */}
            <div className="h-10 sm:h-12 flex items-center justify-center">
              <img
                src={logoSrc}
                alt={`${BRAND_CONFIG.name} Logo`}
                onError={handleLogoError}
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain max-w-[140px] sm:max-w-[180px] drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#062B68] leading-tight">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#10BFAE] tracking-wide uppercase">
                {BRAND_CONFIG.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-[#0866D8] font-semibold bg-blue-50/80'
                      : 'text-slate-600 hover:text-[#062B68] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.43 0 .07 5.36.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.93 11.93 0 0 0 5.81 1.49h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.21-3.51-8.4zM12.04 21.84a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.6-.23-.37a9.89 9.89 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.46-4.44 9.87-9.94 9.87zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
              <span>024 169 5698</span>
            </a>

            <button
              type="button"
              id="nav-explore-btn"
              onClick={onExploreCourses}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0866D8] to-[#10BFAE] hover:from-[#073B87] hover:to-[#16D9C5] rounded-xl shadow-sm hover:shadow-md hover:shadow-[#10BFAE]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#062B68] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0866D8]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#062B68]" /> : <Menu className="w-6 h-6 text-[#062B68]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-blue-50 text-[#0866D8] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#062B68]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.43 0 .07 5.36.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.23-1.63a11.93 11.93 0 0 0 5.81 1.49h.01c6.61 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.21-3.51-8.4zM12.04 21.84a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.6-.23-.37a9.89 9.89 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.46-4.44 9.87-9.94 9.87zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
              <span>Chat on WhatsApp (024 169 5698)</span>
            </a>

            <button
              type="button"
              id="mobile-nav-explore-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreCourses();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0866D8] to-[#10BFAE] rounded-xl shadow-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
