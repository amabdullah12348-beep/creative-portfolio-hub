import React, { useState, useMemo } from 'react';
import { CalligraphyArtwork } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import { Feather, Sparkles, Filter, Search, ShoppingBag, MessageSquare } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Feather className="w-4 h-4" />
          <span>Classical Islamic Arts &amp; Four Years of Practice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          {ui.arabicCalligraphy}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Sacred Arabic letterforms crafted with classical bamboo pens (qalam), soot ink, and 24K gold leaf on aged handmade cotton archival sheets. Combining time-honored proportion geometry with exquisite illumination.
        </p>
      </div>

      {/* Script Filters & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by verse, script, or title..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="text-xs text-amber-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom commissions open worldwide</span>
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {scripts.map((script) => (
            <button
              key={script}
              onClick={() => setSelectedScript(script)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedScript === script
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800'
              }`}
            >
              {script === 'All' ? 'All Calligraphic Scripts' : `${script} Script`}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks Masonry / Bento Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((art) => (
          <div
            key={art.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 overflow-hidden transition-all flex flex-col justify-between"
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
              className="relative aspect-[4/3] bg-black overflow-hidden cursor-pointer"
            >
              <img
                src={art.thumbnail}
                alt={t(art.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-[11px] font-medium text-amber-300 border border-amber-500/30">
                {art.scriptStyle}
              </div>
              {art.forSale && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-emerald-500/80 text-[10px] font-bold text-slate-950">
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
                  className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t(art.title)}
                </h3>

                {/* Arabic Letterforms Box */}
                <div
                  dir="rtl"
                  className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 text-center font-serif text-lg text-amber-300 leading-relaxed tracking-wide select-all"
                >
                  {art.arabicText}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {t(art.description)}
                </p>

                <div className="text-[11px] text-slate-400 pt-1">
                  <span className="font-semibold text-slate-300">{ui.medium}:</span> {t(art.medium)}
                </div>
              </div>

              {/* Commission CTA button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">{art.dimensions || '50 x 70 cm'}</span>
                <button
                  onClick={() =>
                    onOpenInquiry(
                      'arabic_calligraphy',
                      `I would like to commission an artwork in ${art.scriptStyle} script, similar to: ${t(
                        art.title
                      )}`
                    )
                  }
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ui.commissionArt}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commission Information Section */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
            Custom Commission Process
          </span>
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            Order a Personalized Calligraphy Masterpiece
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            I craft bespoke artworks for residences, mosques, academic institutions, and international collectors. Choose your Quranic verse, Hadith, poetry, or family name. Each piece comes with authentic 24K gold illumination and museum-grade framing advice.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-start md:justify-end">
          <button
            onClick={() => onOpenInquiry('arabic_calligraphy')}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md"
          >
            Request Calligraphy Quote
          </button>
        </div>
      </div>
    </div>
  );
};
