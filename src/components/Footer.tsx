import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SocialLink } from '../types/index.ts';
import {
  Palette,
  Video,
  TrendingUp,
  Feather,
  Globe,
  Mail,
  MessageSquare,
  Lock,
  ArrowUp,
  MapPin,
  Award,
  Phone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, socialLinks }) => {
  const { ui, lang, setLanguage } = useLanguage();

  const footerLinks = [
    { id: 'home', label: ui.home },
    { id: 'graphic-design', label: ui.graphicDesign },
    { id: 'video-editing', label: ui.videoEditing },
    { id: 'arabic-calligraphy', label: ui.arabicCalligraphy },
    { id: 'meta-marketing', label: ui.metaMarketing },
    { id: 'about', label: ui.aboutMe },
    { id: 'links', label: ui.allLinks },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#063828] border-t-4 border-[#f59e0b] text-emerald-100 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Islamic / Institute Affiliations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-400 text-[#063828] flex items-center justify-center font-bold font-arabic text-xl shadow-md">
                ع
              </span>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-tight">
                  মুহাম্মদ আব্দুল্লাহ
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">
                  Muhammad Abdullah · Portfolio
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে গ্রাফিক্স ডিজাইন, ভিডিও এডিটিং ও মেটা মার্কেটিং প্রশিক্ষিত। ৪+ বছরের অভিজ্ঞতাসম্পন্ন ঐতিহ্যবাহী আরবি ক্যালিগ্রাফার।
            </p>

            <div className="space-y-2 text-xs text-emerald-200 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ঢাকা, বাংলাদেশ (মূল নিবাস: কুষ্টিয়া)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>দাওরায়ে হাদিস: জামিয়া আশরাফুল উলূম কুষ্টিয়া</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
              বিভাগসমূহ ও পোর্টফোলিও
            </h4>
            <ul className="space-y-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="hover:text-amber-400 transition-colors text-emerald-200 text-left flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect & Social Media */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
              সামাজিক মাধ্যম ও যোগাযোগ
            </h4>
            <p className="text-xs text-emerald-200/80 mb-3">
              কাজের অর্ডার, ক্যালিগ্রাফি কমিশন বা প্রজেক্ট পর্যালোচনার জন্য যুক্ত থাকুন:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks
                .filter((l) => l.showOnFooter && l.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs bg-[#0b4835] hover:bg-[#0f5740] border border-emerald-700/60 rounded-lg text-emerald-100 hover:text-amber-300 transition-colors shadow-xs"
                  >
                    {link.title}
                  </a>
                ))}
            </div>
            <button
              onClick={() => {
                onNavigate('links');
                scrollToTop();
              }}
              className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1"
            >
              <span>{ui.allLinks} &rarr;</span>
            </button>
          </div>

          {/* Col 4: Language Switcher & Direct Admin Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
              সাইট ম্যানেজমেন্ট ও ভাষা
            </h4>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#0b4835] p-1 rounded-xl border border-emerald-700/60 mb-4">
              {(['bn', 'en', 'ar', 'ur'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-lg transition-colors ${
                    lang === l
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {l === 'bn' ? 'বাংলা' : l === 'en' ? 'EN' : l === 'ar' ? 'العربية' : 'اردو'}
                </button>
              ))}
            </div>

            {/* Admin CMS Access Box */}
            <div className="p-3 rounded-xl bg-[#0b4835] border border-emerald-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">অ্যাডমিন কন্ট্রোল</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                  /admin
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                ব্রাউজারে সরাসরি সার্চ বা <code className="text-amber-300">/admin</code> টাইপ করে পাসওয়ার্ড দিয়ে ছবি ও তথ্য পরিবর্তন করুন।
              </p>
              <button
                onClick={() => {
                  onNavigate('admin');
                  scrollToTop();
                }}
                className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>অ্যাডমিন প্যানেলে লগইন করুন</span>
              </button>
            </div>

            <div className="mt-3 text-right">
              <button
                onClick={scrollToTop}
                className="p-2 bg-[#0b4835] hover:bg-[#0f5740] rounded-lg text-emerald-200 hover:text-white transition-colors"
                title="উপরে যান (Back to top)"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-3">
          <p>© {new Date().getFullYear()} মুহাম্মদ আব্দুল্লাহ (Muhammad Abdullah). {ui.rightsReserved}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span>জামিয়া আরাবিয়া আশরাফুল উলূম কুষ্টিয়া</span>
            <span>·</span>
            <span>আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট</span>
            <span>·</span>
            <span>দাখিল ২০২৬ (জিপিএ ৪.৬৩)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
