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
  const { ui } = useLanguage();

  const footerLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'arabic-calligraphy', label: 'Arabic Calligraphy' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'video-editing', label: 'Video Editing' },
    { id: 'meta-marketing', label: 'Meta Marketing' },
    { id: 'links', label: 'All Links' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#063828] border-t-4 border-[#f59e0b] text-emerald-100 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-400 text-[#063828] flex items-center justify-center font-bold font-serif text-xl shadow-md">
                ع
              </span>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-tight">
                  Muhammad Abdullah
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">
                  Creative Specialist &amp; Arabic Calligrapher
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Trained at As-Sunnah Skill Development Institute in graphic design, video editing, and Meta marketing. Over 4 years of classical Arabic calligraphy practice.
            </p>

            <div className="space-y-2 text-xs text-emerald-200 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dhaka, Bangladesh · Orig. Kushtia</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>As-Sunnah Skill Development Institute</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dawra-e-Hadith: Jamia Ashraful Ulum Kushtia</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
              Navigation &amp; Sections
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
              Connect &amp; Social
            </h4>
            <p className="text-xs text-emerald-200/80 mb-3">
              Available for design commissions, calligraphy artwork orders, and marketing contracts:
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
              <span>View All Links &rarr;</span>
            </button>
          </div>

          {/* Col 4: Verified Qualifications & Back to top */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
              Verified Qualifications
            </h4>
            <div className="p-3 rounded-xl bg-[#0b4835] border border-emerald-700/60 text-xs space-y-2 text-emerald-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-white">Dawra-e-Hadith:</span>
                <span>Jayyid Jiddan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-white">Dakhil Exam:</span>
                <span>GPA 4.63</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white">Alim Studies:</span>
                <span>In Progress</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-300/60 text-[11px]">
                Type <code className="text-amber-300 font-mono">/admin</code> in URL to manage
              </span>
              <button
                onClick={scrollToTop}
                className="p-2 bg-[#0b4835] hover:bg-[#0f5740] rounded-lg text-emerald-200 hover:text-white transition-colors"
                title="Back to top"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-3">
          <p>© {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('admin')}
              className="text-emerald-400/50 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
