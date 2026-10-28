import React, { useState, useMemo } from 'react';
import { DesignProject } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import { Search, Filter, ExternalLink, Palette, Sparkles, Layers } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <Palette className="w-4 h-4" />
          <span>Visual Branding &amp; Graphics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          {ui.graphicDesign}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Crafting memorable visual identities, brand systems, packaging, and high-conversion social assets rooted in design balance and marketing psychology.
        </p>
      </div>

      {/* Filter, Search & Sort Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-400">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="order">Curated Order</option>
              <option value="newest">Latest First</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Functional Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? ui.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-2">
          <Layers className="w-8 h-8 mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-medium">No graphic design projects match your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() =>
                onOpenLightbox({
                  title: project.title,
                  image: project.thumbnail,
                  description: project.description,
                  category: project.category,
                  client: project.client,
                  externalUrl: project.externalUrl,
                })
              }
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={t(project.title)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-medium text-slate-300 border border-slate-700/40">
                  {project.category}
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-500/80 backdrop-blur-sm text-[10px] font-bold text-slate-950 uppercase tracking-wider">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{project.client || 'Studio Work'}</span>
                    {project.completionDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{project.completionDate}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-display text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {t(project.title)}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {t(project.description)}
                  </p>
                </div>

                {/* Tags unboxed */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={idx}>
                        <span>#{tag}</span>
                        {idx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inquiry Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-white">
            Need a distinctive brand identity or design collateral?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Let's discuss your project scope and create a customized visual package.
          </p>
        </div>
        <button
          onClick={() => onOpenInquiry('graphic_design')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shrink-0 self-start sm:self-auto"
        >
          {ui.contactMe}
        </button>
      </div>
    </div>
  );
};
