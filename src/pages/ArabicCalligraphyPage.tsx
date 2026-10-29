import React, { useState, useMemo } from 'react';
import { CalligraphyArtwork } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import { Feather, Sparkles, Filter, Search, ShoppingBag, MessageSquare, Camera } from 'lucide-react';

interface ArabicCalligraphyPageProps {
  artworks: CalligraphyArtwork[];
  onOpenLightbox: (item: LightboxItem) => void;
  onOpenInquiry: (category?: string, message?: string) => void;
}

export const ArabicCalligraphyPage: React.FC<ArabicCalligraphyPageProps> = ({
  artworks,
  onOpenLightbox,
  onOpenInquiry,
}) => {
  const { t, ui, isRtl } = useLanguage();
  const [selectedScript, setSelectedScript] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scripts = ['All', 'Thuluth', 'Diwani', 'Naskh', 'Kufic', 'Ruq\'ah', 'Modern'];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchesScript =
        selectedScript === 'All' || art.scriptStyle === selectedScript;
      const titleText = t(art.title).toLowerCase();
      const arabicText = (art.arabicText || '').toLowerCase();
      const descText = t(art.description).toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        titleText.includes(searchQuery.toLowerCase()) ||
        arabicText.includes(searchQuery.toLowerCase()) ||
        descText.includes(searchQuery.toLowerCase());
      return matchesScript && matchesSearch;
    });
  }, [artworks, selectedScript, searchQuery, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider">
          <Feather className="w-4 h-4 text-[#006a4e]" />
          <span>৪ বছরের সুদীর্ঘ শাস্ত্রীয় সাধনা · ঐতিহ্যবাহী আরবি চারুলিপি</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight">
          {ui.arabicCalligraphy}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ঐতিহ্যবাহী বাঁশের কলম (ক্বলম), ভুসাকালি ও খাঁটি স্বর্ণের পাতে তৈরি আরবি চারুলিপির অমূল্য সংগ্রহ। কোরআনের আয়াত, হাদিসের বাণী ও ক্লাসিক্যাল ক্যালিগ্রাফি মাস্টারপিস।
        </p>
      </div>

      {/* Script Filters & Search (As-Sunnah Clean White Box) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আয়াত, লিপি বা শিরোনাম দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-transparent transition-all"
            />
          </div>

          <div className="text-xs text-[#006a4e] font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>দেশ-বিদেশে কাস্টম ক্যালিগ্রাফি কমিশন অর্ডার নেওয়া হয়</span>
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {scripts.map((script) => (
            <button
              key={script}
              onClick={() => setSelectedScript(script)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedScript === script
                  ? 'bg-[#006a4e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {script === 'All' ? 'সকল লিপি (All Scripts)' : `${script} লিপি`}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((art) => (
          <div
            key={art.id}
            className="group rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg overflow-hidden transition-all flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div
              onClick={() =>
                onOpenLightbox({
                  title: art.title,
                  image: art.thumbnail,
                  arabicText: art.arabicText,
                  scriptStyle: art.scriptStyle,
                  medium: art.medium,
                  dimensions: art.dimensions,
                  description: art.description,
                  forSale: art.forSale,
                  commissionAvailable: art.commissionAvailable,
                })
              }
              className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
            >
              <img
                src={art.thumbnail}
                alt={t(art.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                {art.scriptStyle}
              </div>
              {art.forSale && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#006a4e] text-[10px] font-bold text-white shadow-xs">
                  {ui.originalForSale}
                </div>
              )}
            </div>

            {/* Info details */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3
                  onClick={() =>
                    onOpenLightbox({
                      title: art.title,
                      image: art.thumbnail,
                      arabicText: art.arabicText,
                      scriptStyle: art.scriptStyle,
                      medium: art.medium,
                      dimensions: art.dimensions,
                      description: art.description,
                    })
                  }
                  className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors cursor-pointer"
                >
                  {t(art.title)}
                </h3>

                {/* Arabic Letterforms Box */}
                <div
                  dir="rtl"
                  className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 text-center font-arabic text-lg text-amber-900 font-bold leading-relaxed tracking-wide select-all"
                >
                  {art.arabicText}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {t(art.description)}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  <span className="font-semibold text-slate-700">{ui.medium}:</span> {t(art.medium)}
                </div>
              </div>

              {/* Commission CTA button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500">{art.dimensions || '50 x 70 cm'}</span>
                <button
                  onClick={() =>
                    onOpenInquiry(
                      'arabic_calligraphy',
                      `আমি ${art.scriptStyle} লিপিতে "${t(art.title)}" এর মতো একটি ক্যালিগ্রাফি আর্টওয়ার্ক কমিশন করতে আগ্রহী।`
                    )
                  }
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ui.commissionArt}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commission Information Section (As-Sunnah Style) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#006a4e] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="text-xs font-bold text-[#006a4e] uppercase tracking-wider block">
            কাস্টম ক্যালিগ্রাফি কমিশন প্রক্রিয়া
          </span>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            আপনার পছন্দের আয়াত বা নাম দিয়ে ক্যালিগ্রাফি তৈরি করুন
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            বাসা, অফিস, মসজিদ বা মাদ্রাসার জন্য যে কোনো সাইজের কাস্টম ক্যালিগ্রাফি অর্ডার নেওয়া হয়। ফ্রেমসহ বা ফ্রেম ছাড়া প্রিমিয়াম তুলা আর্ট পেপার ও খাঁটি স্বর্ণের পাতে তৈরি করা হয়।
          </p>
        </div>

        <div className="md:col-span-4 flex justify-start md:justify-end">
          <button
            onClick={() => onOpenInquiry('arabic_calligraphy')}
            className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-md"
          >
            ক্যালিগ্রাফি উদ্ধৃতি চেয়ে বার্তা পাঠান
          </button>
        </div>
      </div>
    </div>
  );
};
