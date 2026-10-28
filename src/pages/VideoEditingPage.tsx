import React, { useState, useMemo } from 'react';
import { VideoProject } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Video, Play, ExternalLink, X, Search, Sparkles } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
          <Video className="w-4 h-4" />
          <span>Cinematic Cuts &amp; Dynamic Motion</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          {ui.videoEditing}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          High-retention video editing designed for maximum audience engagement. From short-form viral reels to mini-documentaries, sound-engineered and color-graded.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            {cat === 'All' ? ui.allCategories : cat}
          </button>
        ))}
      </div>

      {/* Video Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((vid) => (
          <div
            key={vid.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all flex flex-col justify-between"
          >
            {/* Thumbnail with Click to Play */}
            <div
              onClick={() => setActiveVideo(vid)}
              className="relative aspect-[16/9] bg-black overflow-hidden cursor-pointer"
            >
              <img
                src={vid.thumbnail}
                alt={t(vid.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-medium text-purple-300 border border-purple-500/20">
                {vid.category}
              </div>
              {vid.duration && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                  {vid.duration}
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3
                  onClick={() => setActiveVideo(vid)}
                  className="text-lg font-bold font-display text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t(vid.title)}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {t(vid.description)}
                </p>
              </div>

              {/* Software used */}
              {vid.softwareUsed && vid.softwareUsed.length > 0 && (
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Edited in:</span>
                    <span className="font-medium text-slate-300">{vid.softwareUsed.join(', ')}</span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(vid)}
                    className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    Watch Video &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/80 hover:bg-slate-800 transition-colors"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-black">
              {activeVideo.embedType === 'direct' ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={t(activeVideo.title)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">
                  {activeVideo.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {t(activeVideo.title)}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveVideo(null);
                  onOpenInquiry('video_editing', `Inquiry regarding video editing for: ${t(activeVideo.title)}`);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Book Video Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-white">
            Have raw footage ready for editing or viral reels?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Let's turn your ideas into polished, high-retention video content.
          </p>
        </div>
        <button
          onClick={() => onOpenInquiry('video_editing')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shrink-0 self-start sm:self-auto"
        >
          {ui.contactMe}
        </button>
      </div>
    </div>
  );
};
