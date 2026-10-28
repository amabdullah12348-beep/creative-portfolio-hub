import React, { useState } from 'react';
import { SocialLink, Profile } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Share2,
  Palette,
  Video,
  TrendingUp,
  Feather,
  Mail,
  MessageSquare,
  Briefcase,
  Globe,
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  Sparkles,
} from 'lucide-react';

interface AllLinksPageProps {
  links: SocialLink[];
  profile: Profile;
  onOpenQrModal: (url: string, title?: string) => void;
  onOpenInquiry: (category?: string) => void;
}

export const AllLinksPage: React.FC<AllLinksPageProps> = ({
  links,
  profile,
  onOpenQrModal,
  onOpenInquiry,
}) => {
  const { t, ui } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPage, setCopiedPage] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'behance':
        return Palette;
      case 'youtube':
        return Youtube;
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      case 'bdjobs':
        return Briefcase;
      case 'whatsapp':
        return MessageSquare;
      case 'email':
        return Mail;
      default:
        return Globe;
    }
  };

  const handleCopyLink = (url: string, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSharePage = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl);
    setCopiedPage(true);
    setTimeout(() => setCopiedPage(false), 2000);
  };

  const visibleLinks = links.filter((l) => l.showOnLinksPage && l.isVisible);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10 pb-24">
      {/* Bio & Link Hub Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-500/40 p-1 mx-auto bg-slate-950 shadow-xl">
            <img
              src={profile.avatarUrl}
              alt={t(profile.name)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white" title="Available for projects">
            ✓
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            {t(profile.name)}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-amber-400">
            {t(profile.title)}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto pt-1 leading-relaxed">
            {t(profile.tagline)}
          </p>
        </div>

        {/* Global Page Share & QR buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenQrModal(window.location.href, `${t(profile.name)} — Link Hub`)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>{ui.qrCode}</span>
          </button>

          <button
            onClick={handleSharePage}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors flex items-center gap-1.5"
          >
            {copiedPage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedPage ? ui.copied : 'Share Link Hub'}</span>
          </button>
        </div>
      </div>

      {/* Direct Contact Action Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
            Direct Project Collaboration
          </span>
          <span className="text-sm font-bold text-white block">
            Have a project or commission in mind?
          </span>
        </div>
        <button
          onClick={() => onOpenInquiry()}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shrink-0 active:scale-95"
        >
          {ui.contactMe}
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {visibleLinks.map((link) => {
          const Icon = getPlatformIcon(link.platform);
          return (
            <div
              key={link.id}
              className="group relative p-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-4 shadow-sm"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors block truncate">
                    {link.title}
                  </span>
                  {link.description && (
                    <span className="text-xs text-slate-400 block truncate mt-0.5">
                      {t(link.description)}
                    </span>
                  )}
                </div>
              </a>

              {/* Action Buttons: Copy link & QR */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => handleCopyLink(link.url, link.id, e)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800/80"
                  title="Copy Link"
                  aria-label="Copy link URL"
                >
                  {copiedId === link.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => onOpenQrModal(link.url, link.title)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800/80"
                  title="Show QR Code"
                  aria-label="View QR code"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-amber-400 bg-slate-950/60 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800/80"
                  title="Open Link"
                  aria-label="Open link in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiet Credentials Trust Footer */}
      <div className="pt-8 text-center text-xs text-slate-500 border-t border-slate-800/80 space-y-1">
        <p>Verified Creative &amp; Arabic Calligraphy Portfolio · Dhaka, Bangladesh</p>
        <p>Dawra-e-Hadith (Ashraful Ulum Kushtia) · As-Sunnah Skill Development Institute Graduate</p>
      </div>
    </div>
  );
};
