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
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Identity & Qualifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                ع
              </span>
              <span className="font-display font-bold text-lg text-white">Muhammad Abdullah</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multidisciplinary creative professional combining 4 years of classical Arabic calligraphy practice with graphic design, video editing, and Meta marketing.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Dhaka, Bangladesh · Orig. Kushtia</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>As-Sunnah Skill Development Institute Graduate</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Sections &amp; Portfolios
            </h4>
            <ul className="space-y-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="hover:text-amber-400 transition-colors text-slate-400 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Connect &amp; Social
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks
                .filter((l) => l.showOnFooter && l.isVisible)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 rounded-lg text-slate-300 hover:text-amber-400 transition-colors"
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
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{ui.allLinks} &rarr;</span>
            </button>
          </div>

          {/* Col 4: Language & Admin Entry */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Preferences &amp; Management
            </h4>
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800/80 mb-4">
              {(['bn', 'en', 'ar', 'ur'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`flex-1 py-1 text-[11px] font-semibold uppercase rounded transition-colors ${
                    lang === l
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
              <button
                onClick={() => {
                  onNavigate('admin');
                  scrollToTop();
                }}
                className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin CMS Portal</span>
              </button>
              <button
                onClick={scrollToTop}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                title="Scroll to Top"
                aria-label="Back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Muhammad Abdullah. {ui.rightsReserved}</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Jamia Arabia Ashraful Ulum Kushtia</span>
            <span>·</span>
            <span>As-Sunnah Institute</span>
            <span>·</span>
            <span>Dakhil 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
