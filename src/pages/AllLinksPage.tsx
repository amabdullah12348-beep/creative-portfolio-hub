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
  Phone,
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-24 text-slate-800">
      {/* Bio & Link Hub Header (As-Sunnah Style) */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-emerald-500/40 p-1 mx-auto bg-white shadow-lg">
            <img
              src={profile.avatarUrl}
              alt={t(profile.name)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#006a4e] border-2 border-white flex items-center justify-center text-[10px] text-white shadow-xs" title="নতুন কাজের জন্য উন্মুক্ত">
            ✓
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            {t(profile.name)}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#006a4e]">
            {t(profile.title)}
          </p>
          <p className="text-xs text-slate-600 max-w-md mx-auto pt-1">
            আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে প্রশিক্ষিত গ্রাফিক্স ডিজাইনার, ভিডিও এডিটর ও মেটা বিজ্ঞাপন বিশেষজ্ঞ।
          </p>
        </div>

        {/* Quick Contact & Share buttons */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={handleSharePage}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-xs text-slate-700 font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            {copiedPage ? <Check className="w-3.5 h-3.5 text-[#006a4e]" /> : <Share2 className="w-3.5 h-3.5 text-[#006a4e]" />}
            <span>{copiedPage ? 'লিঙ্ক কপি হয়েছে' : 'প্রোফাইল শেয়ার'}</span>
          </button>

          <button
            onClick={() => onOpenInquiry('general')}
            className="px-4 py-1.5 rounded-xl bg-[#006a4e] hover:bg-[#00543c] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>সরাসরি যোগাযোগ</span>
          </button>
        </div>
      </div>

      {/* Links Stack */}
      <div className="space-y-3">
        {visibleLinks.map((link) => {
          const Icon = getPlatformIcon(link.platform);
          const isCopied = copiedId === link.id;

          return (
            <div
              key={link.id}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-[#006a4e] hover:shadow-md transition-all p-4 flex items-center justify-between gap-4"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006a4e] group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-sm text-slate-900 group-hover:text-[#006a4e] transition-colors block truncate">
                    {link.title}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate block">
                    {(link.description ? t(link.description) : '') || link.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </a>

              {/* Utility actions: Copy & QR */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => handleCopyLink(link.url, link.id, e)}
                  className="p-2 text-slate-400 hover:text-[#006a4e] rounded-lg hover:bg-emerald-50 transition-colors"
                  title="লিঙ্ক কপি করুন"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-[#006a4e]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onOpenQrModal(link.url, link.title)}
                  className="p-2 text-slate-400 hover:text-[#006a4e] rounded-lg hover:bg-emerald-50 transition-colors"
                  title="QR কোড প্রদর্শন"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-[#006a4e] rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
