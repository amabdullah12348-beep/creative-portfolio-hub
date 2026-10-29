import React, { useState, useMemo } from 'react';
import { VideoProject } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Video, Play, ExternalLink, X, Search, Sparkles, Send } from 'lucide-react';

interface VideoEditingPageProps {
  projects: VideoProject[];
  onOpenInquiry: (category?: string, message?: string) => void;
}

export const VideoEditingPage: React.FC<VideoEditingPageProps> = ({
  projects,
  onOpenInquiry,
}) => {
  const { t, ui } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  const categories = ['All', 'Commercial', 'Reels & Shorts', 'Documentary', 'Motion Graphics', 'YouTube'];

  const filteredProjects = useMemo(() => {
    return projects.filter((vid) => {
      return selectedCategory === 'All' || vid.category === selectedCategory;
    });
  }, [projects, selectedCategory]);

  // Convert youtube watch URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com/')) {
      const vidId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${vidId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider">
          <Video className="w-4 h-4 text-[#006a4e]" />
          <span>আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট প্রশিক্ষিত</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight">
          {ui.videoEditing}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          হাই-রিটেনশন শর্ট-ফর্ম রিলস, ইউটিউব কন্টেন্ট, মোশন গ্রাফিক্স ও ডকুমেন্টারি এডিটিং। প্রিমিয়ার প্রো ও দাভিঞ্চি রিজলভের মাধ্যমে সাউন্ড ডিজাইন ও সিনেমাটিক কালার গ্রেডিং।
        </p>
      </div>

      {/* Category Tabs (As-Sunnah Clean Box) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
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
            {cat === 'All' ? 'সকল ভিডিও' : cat}
          </button>
        ))}
      </div>

      {/* Video Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((vid) => (
          <div
            key={vid.id}
            className="group rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg overflow-hidden transition-all flex flex-col justify-between"
          >
            {/* Thumbnail with Click to Play */}
            <div
              onClick={() => setActiveVideo(vid)}
              className="relative aspect-[16/9] bg-slate-900 overflow-hidden cursor-pointer"
            >
              <img
                src={vid.thumbnail}
                alt={t(vid.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                <div className="w-14 h-14 rounded-full bg-[#006a4e] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-[11px] font-semibold text-white">
                {vid.category}
              </div>
              {vid.duration && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                  {vid.duration}
                </div>
              )}
            </div>

            {/* Info details */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#006a4e] font-semibold">
                  <span>{vid.category}</span>
                  {vid.softwareUsed && vid.softwareUsed.length > 0 && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">{vid.softwareUsed.join(', ')}</span>
                    </>
                  )}
                </div>

                <h3
                  onClick={() => setActiveVideo(vid)}
                  className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors cursor-pointer"
                >
                  {t(vid.title)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {t(vid.description)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveVideo(vid)}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>ভিডিও প্লে করুন</span>
                </button>

                <button
                  onClick={() =>
                    onOpenInquiry(
                      'video_editing',
                      `আমি "${t(vid.title)}" এর মতো ভিডিও এডিটিং সেবা নিতে চাই।`
                    )
                  }
                  className="px-3 py-2 text-xs font-semibold text-[#006a4e] hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-200"
                >
                  প্রজেক্ট আলোচনা &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <h4 className="text-sm font-bold font-display line-clamp-1">
                {t(activeVideo.title)}
              </h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] bg-black">
              {activeVideo.videoUrl.includes('youtube.com') ||
              activeVideo.videoUrl.includes('youtu.be') ||
              activeVideo.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={t(activeVideo.title)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#006a4e] font-semibold">
                <span>ক্যাটাগরি: {activeVideo.category}</span>
                {activeVideo.softwareUsed && (
                  <>
                    <span>·</span>
                    <span className="text-slate-500">টুলস: {activeVideo.softwareUsed.join(', ')}</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {t(activeVideo.description)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
