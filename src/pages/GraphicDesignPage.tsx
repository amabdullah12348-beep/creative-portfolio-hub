import React, { useState, useMemo } from 'react';
import { DesignProject } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import { Search, Filter, ExternalLink, Palette, Sparkles, Layers, Send } from 'lucide-react';

interface GraphicDesignPageProps {
  projects: DesignProject[];
  onOpenLightbox: (item: LightboxItem) => void;
  onOpenInquiry: (category?: string, message?: string) => void;
}

export const GraphicDesignPage: React.FC<GraphicDesignPageProps> = ({
  projects,
  onOpenLightbox,
  onOpenInquiry,
}) => {
  const { t, ui } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'order' | 'newest'>('order');

  const categories = ['All', 'Logo & Branding', 'Social Media', 'Posters & Print', 'Thumbnails', 'Custom'];

  const filteredProjects = useMemo(() => {
    return projects
      .filter((proj) => {
        const matchesCategory =
          selectedCategory === 'All' || proj.category === selectedCategory;
        const titleText = t(proj.title).toLowerCase();
        const descText = t(proj.description).toLowerCase();
        const tagText = (proj.tags || []).join(' ').toLowerCase();
        const clientText = (proj.client || '').toLowerCase();
        const matchesSearch =
          !searchQuery.trim() ||
          titleText.includes(searchQuery.toLowerCase()) ||
          descText.includes(searchQuery.toLowerCase()) ||
          tagText.includes(searchQuery.toLowerCase()) ||
          clientText.includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return (b.completionDate || '').localeCompare(a.completionDate || '');
        }
        return a.order - b.order;
      });
  }, [projects, selectedCategory, searchQuery, sortBy, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider">
          <Palette className="w-4 h-4 text-[#006a4e]" />
          <span>আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে প্রশিক্ষিত</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight">
          {ui.graphicDesign}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ব্র্যান্ড আইডেন্টিটি, নান্দনিক লোগো, সামাজিক যোগাযোগ মাধ্যমের কনভার্টিং ব্যানার, থাম্বনেইল ও প্রিন্ট মিডিয়া ডিজাইন। আন্তর্জাতিক মান ও কালার সাইকোলজি বজায় রেখে প্রস্তুতকৃত।
        </p>
      </div>

      {/* Filter, Search & Sort Bar (As-Sunnah Style Clean Box) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ক্যাটাগরি, ক্লায়েন্ট বা নাম দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-transparent transition-all"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-600">
            <span className="font-medium">সাজানো:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006a4e]"
            >
              <option value="order">বাছাইকৃত ক্রম</option>
              <option value="newest">সর্বশেষ প্রজেক্ট</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#006a4e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'সকল প্রজেক্ট' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg overflow-hidden transition-all flex flex-col justify-between"
          >
            {/* Thumbnail */}
            <div
              onClick={() =>
                onOpenLightbox({
                  title: proj.title,
                  image: proj.thumbnail,
                  description: proj.description,
                  category: proj.category,
                  client: proj.client,
                  externalUrl: proj.externalUrl,
                })
              }
              className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer"
            >
              <img
                src={proj.thumbnail}
                alt={t(proj.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-[11px] font-semibold text-white">
                {proj.category}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-[#006a4e]">{proj.client || 'ক্লায়েন্ট কাজ'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{proj.completionDate || '২০২৬'}</span>
                </div>

                <h3
                  onClick={() =>
                    onOpenLightbox({
                      title: proj.title,
                      image: proj.thumbnail,
                      description: proj.description,
                      category: proj.category,
                      client: proj.client,
                      externalUrl: proj.externalUrl,
                    })
                  }
                  className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors cursor-pointer"
                >
                  {t(proj.title)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {t(proj.description)}
                </p>

                {/* Tags */}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    onOpenInquiry(
                      'graphic_design',
                      `আমি "${t(proj.title)}" প্রজেক্টের অনুরূপ ডিজাইন করাতে আগ্রহী।`
                    )
                  }
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ডিজাইন আলোচনা করুন</span>
                </button>

                {proj.externalUrl && (
                  <a
                    href={proj.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-[#006a4e] hover:bg-emerald-50 rounded-lg transition-colors"
                    title="প্রজেক্ট লিঙ্ক দেখুন"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
