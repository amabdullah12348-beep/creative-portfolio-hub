import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Menu, X, MessageSquare, ChevronRight, Send } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenInquiry: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenInquiry }) => {
  const { ui } = useLanguage();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'arabic-calligraphy', label: 'Arabic Calligraphy' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'video-editing', label: 'Video Editing' },
    { id: 'meta-marketing', label: 'Meta Marketing' },
    { id: 'links', label: 'All Links' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          
          {/* Brand Lockup (As-Sunnah Clean Emerald Style) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            {/* Logo Mark: Islamic Green rounded badge */}
            <div className="w-10 h-10 rounded-xl bg-[#006a4e] flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-xs group-hover:bg-[#059669] transition-colors">
              ع
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight group-hover:text-[#006a4e] transition-colors leading-tight">
                Muhammad Abdullah
              </span>
              <span className="text-[11px] font-medium text-emerald-800 tracking-normal hidden sm:block">
                As-Sunnah Institute Graduate · Creative Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  currentPage === link.id
                    ? 'text-[#006a4e] font-bold'
                    : 'text-slate-700 hover:text-[#006a4e]'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006a4e] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Primary Action Button */}
            <button
              onClick={() => onOpenInquiry('graphic_design')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#006a4e] hover:bg-emerald-50 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 shadow-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                  currentPage === link.id
                    ? 'bg-emerald-50 text-[#006a4e] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenInquiry('graphic_design');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#006a4e] hover:bg-[#00543c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Get In Touch / Hire Me</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
