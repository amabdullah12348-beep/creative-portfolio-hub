import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Language } from '../types/index.ts';
import { Menu, X, Globe, Lock, MessageSquare, User, Sparkles, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenInquiry: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenInquiry }) => {
  const { lang, setLanguage, ui } = useLanguage();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'arabic-calligraphy', label: 'আরবি ক্যালিগ্রাফি' },
    { id: 'graphic-design', label: 'গ্রাফিক ডিজাইন' },
    { id: 'video-editing', label: 'ভিডিও এডিটিং' },
    { id: 'meta-marketing', label: 'মেটা মার্কেটিং' },
    { id: 'links', label: 'সমস্ত লিংক' },
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
          {/* Zone 1: As-Sunnah Styled Brand Lockup */}
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
                মুহাম্মদ আব্দুল্লাহ
              </span>
              <span className="text-[11px] font-medium text-emerald-800 tracking-normal hidden sm:block">
                আস-সুন্নাহ ফাউন্ডেশন স্কিল ইনস্টিটিউট সনদপ্রাপ্ত · ক্রিয়েটিভ পোর্টফোলিও
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean text links with As-Sunnah green accent) */}
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

          {/* Zone 3: Language Toggle + Admin CMS + Primary Action Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* As-Sunnah Style Language Switcher (বাং | EN) */}
            <div className="hidden sm:flex items-center border border-emerald-200 rounded-lg overflow-hidden text-xs font-semibold p-0.5 bg-emerald-50/50">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'bn'
                    ? 'bg-[#006a4e] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#006a4e]'
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-[#006a4e] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#006a4e]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Admin CMS Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                isAdmin
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'text-slate-700 hover:text-[#006a4e] border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/60'
              }`}
              title="অ্যাডমিন প্যানেল (/admin)"
            >
              <Lock className="w-3.5 h-3.5 text-[#006a4e]" />
              <span className="hidden md:inline">{isAdmin ? 'অ্যাডমিন ড্যাশবোর্ড' : 'অ্যাডমিন'}</span>
            </button>

            {/* As-Sunnah Style Prominent Green Button (Like 'দান করুন' in video) */}
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#059669] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>যোগাযোগ করুন</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#006a4e] focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Matching exact As-Sunnah Foundation layout seen in video at 00:46) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in lg:hidden">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#006a4e] flex items-center justify-center text-amber-300 font-serif font-bold text-base">
                    ع
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">মুহাম্মদ আব্দুল্লাহ</span>
                    <span className="text-[10px] text-emerald-800">আস-সুন্নাহ স্কিল সনদপ্রাপ্ত</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu items list */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                      currentPage === link.id
                        ? 'bg-emerald-50 text-[#006a4e]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${currentPage === link.id ? 'text-[#006a4e]' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Bottom (Exact As-Sunnah styling: Language buttons + Yellow 'আমার অ্যাকাউন্ট / অ্যাডমিন' button) */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              {/* Language toggle: বাং | EN */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLanguage('bn')}
                  className={`py-2 text-xs font-bold rounded-lg border text-center transition-colors ${
                    lang === 'bn'
                      ? 'bg-[#006a4e] text-white border-[#006a4e]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  বাং
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`py-2 text-xs font-bold rounded-lg border text-center transition-colors ${
                    lang === 'en'
                      ? 'bg-[#006a4e] text-white border-[#006a4e]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Yellow 'আমার অ্যাকাউন্ট / অ্যাডমিন' button matching video at 00:46 */}
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] border border-[#fcd34d] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <User className="w-4 h-4 text-[#b45309]" />
                <span>আমার অ্যাকাউন্ট / অ্যাডমিন প্যানেল</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
