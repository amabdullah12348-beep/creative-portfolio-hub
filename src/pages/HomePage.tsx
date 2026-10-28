import React from 'react';
import {
  Profile,
  CalligraphyArtwork,
  DesignProject,
  VideoProject,
  MarketingCase,
  Testimonial,
  SocialLink,
  ThemeSettings,
} from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import {
  Palette,
  Video,
  TrendingUp,
  Feather,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  MapPin,
  Play,
  CheckCircle,
  ExternalLink,
  Star,
  MessageSquare,
} from 'lucide-react';

interface HomePageProps {
  profile: Profile;
  calligraphyArtworks: CalligraphyArtwork[];
  designProjects: DesignProject[];
  videoProjects: VideoProject[];
  marketingCases: MarketingCase[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  theme: ThemeSettings;
  onNavigate: (page: string) => void;
  onOpenLightbox: (item: LightboxItem) => void;
  onOpenInquiry: (category?: string, message?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  calligraphyArtworks,
  designProjects,
  videoProjects,
  marketingCases,
  testimonials,
  socialLinks,
  theme,
  onNavigate,
  onOpenLightbox,
  onOpenInquiry,
}) => {
  const { t, ui, isRtl } = useLanguage();

  const disciplineCards = [
    {
      id: 'arabic-calligraphy',
      title: ui.arabicCalligraphy,
      desc: 'Classical Thuluth, Diwani & Naskh scripts with 24K pure gold leaf illumination on aged cotton archival paper.',
      icon: Feather,
      metric: '4 Years Master Practice',
      color: 'from-amber-500/20 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-400',
    },
    {
      id: 'graphic-design',
      title: ui.graphicDesign,
      desc: 'Bespoke brand identities, luxury monograms, typography, packaging, and high-CTR social media marketing collateral.',
      icon: Palette,
      metric: 'As-Sunnah Certified',
      color: 'from-blue-500/20 to-transparent',
      border: 'border-blue-500/30 hover:border-blue-400',
    },
    {
      id: 'video-editing',
      title: ui.videoEditing,
      desc: 'High-retention rhythmic cuts, cinematic color grading, sound design, and viral short-form reels for digital platforms.',
      icon: Video,
      metric: 'Premiere & Resolve',
      color: 'from-purple-500/20 to-transparent',
      border: 'border-purple-500/30 hover:border-purple-400',
    },
    {
      id: 'meta-marketing',
      title: ui.metaMarketing,
      desc: 'Meta Ads Manager campaigns, pixel tracking, full-funnel strategy, and ROAS optimization for e-commerce and brands.',
      icon: TrendingUp,
      metric: 'Proven High ROAS',
      color: 'from-emerald-500/20 to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-400',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION (Split-Screen Hero as required by Portfolio reference) */}
      {theme.homepageSections.hero && (
        <section className="relative pt-12 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-6">
                {/* Clean Unboxed Kicker */}
                <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wide">
                  <span>{t(profile.location)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{ui.experienceYears}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.1] text-balance">
                  {t(profile.name)}
                </h1>

                <p className="text-lg sm:text-xl font-medium text-amber-300/90 leading-snug">
                  {t(profile.title)}
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {t(profile.tagline)}
                </p>

                {/* Primary CTA Row */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenInquiry('arabic_calligraphy')}
                    className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-95 flex items-center gap-2"
                  >
                    <Feather className="w-4 h-4" />
                    <span>{ui.commissionArt}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('about')}
                    className="px-5 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>{ui.aboutMe}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Artwork Anchor */}
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl p-2">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={profile.avatarUrl}
                      alt={t(profile.name)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider block">
                        Master Studio &amp; Artistry
                      </span>
                      <span className="text-xs text-slate-200 font-medium">
                        Traditional Bamboo Qalam, Soot Ink &amp; 24K Gold Leaf
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width Metric Strip below the split */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div>
                <span className="block text-2xl font-bold font-display text-white tabular-nums">4+ Years</span>
                <span className="text-xs text-slate-400">Arabic Calligraphy Mastery</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-white tabular-nums">3.5 Months</span>
                <span className="text-xs text-slate-400">As-Sunnah Institute Training</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-amber-400">Jayyid Jiddan</span>
                <span className="text-xs text-slate-400">Dawra-e-Hadith (Kushtia)</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-white tabular-nums">GPA 4.63</span>
                <span className="text-xs text-slate-400">Dakhil 2026 · Alim In Progress</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. FOUR DISCIPLINE PORTAL CARDS */}
      {theme.homepageSections.quickNav && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Disciplines &amp; Creative Portfolios
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a specialized domain to explore curated projects, techniques, and case studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplineCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  className={`p-6 rounded-2xl bg-slate-900/60 border ${card.border} hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-amber-400/90 block">
                      {card.metric}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 group-hover:text-amber-400 font-medium">
                    <span>Explore Section</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. FEATURED ARABIC CALLIGRAPHY SHOWCASE */}
      {theme.homepageSections.featuredCalligraphy && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <Feather className="w-3.5 h-3.5" />
                <span>Sacred Letterforms</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                {ui.featuredArtworks}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('arabic-calligraphy')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{ui.viewAllProjects}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {calligraphyArtworks.slice(0, 3).map((art) => (
              <div
                key={art.id}
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
                className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 overflow-hidden transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-black overflow-hidden">
                  <img
                    src={art.thumbnail}
                    alt={t(art.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[11px] font-medium text-amber-400 border border-amber-500/20">
                    {art.scriptStyle} Script
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold font-display text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {t(art.title)}
                    </h3>
                    <div
                      dir="rtl"
                      className="text-sm font-serif text-amber-300/90 pt-1 line-clamp-1"
                    >
                      {art.arabicText}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{art.dimensions || 'Archival Sheet'}</span>
                    <span className="text-amber-400 group-hover:underline flex items-center gap-1">
                      Preview &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. FEATURED GRAPHIC DESIGN & BRANDING */}
      {theme.homepageSections.featuredDesign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                <Palette className="w-3.5 h-3.5" />
                <span>Brand Systems &amp; Visual Design</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                {ui.graphicDesign}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('graphic-design')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{ui.viewAllProjects}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designProjects.slice(0, 2).map((proj) => (
              <div
                key={proj.id}
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
                className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all"
              >
                <div className="relative aspect-[16/9] bg-black overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={t(proj.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[11px] font-medium text-slate-200">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{proj.client || 'Client Project'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.completionDate || '2026'}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                    {t(proj.title)}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {t(proj.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FEATURED VIDEO EDITING REELS */}
      {theme.homepageSections.featuredVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                <Video className="w-3.5 h-3.5" />
                <span>Cinematic &amp; Short-Form Motion</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                {ui.videoEditing}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('video-editing')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{ui.viewAllProjects}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoProjects.slice(0, 2).map((vid) => (
              <div
                key={vid.id}
                onClick={() => onNavigate('video-editing')}
                className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-black overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={t(vid.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                      {vid.duration}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
                    <span>{vid.category}</span>
                    {vid.softwareUsed && vid.softwareUsed.length > 0 && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400">{vid.softwareUsed.join(', ')}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                    {t(vid.title)}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {t(vid.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. META MARKETING & VERIFIED RESULTS */}
      {theme.homepageSections.metaServices && marketingCases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <div className="max-w-3xl space-y-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Meta Ads Growth Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Data-Driven Social Acquisition &amp; High ROAS
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trained at As-Sunnah Skill Development Institute, I develop full-funnel ad architectures (Awareness, Retargeting, Catalog Sales) designed to eliminate ad spend waste and elevate revenue.
              </p>
            </div>

            {/* Case Study Card */}
            {marketingCases[0] && (
              <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">CLIENT: {marketingCases[0].client}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {t(marketingCases[0].title)}
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('meta-marketing')}
                    className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {marketingCases[0].metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-2xl font-bold font-display text-amber-400 tabular-nums block">
                        {m.metric}
                      </span>
                      <span className="text-xs text-slate-300 font-medium block mt-1">
                        {t(m.label)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. VERIFIED TESTIMONIALS */}
      {theme.homepageSections.testimonials && testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {ui.testimonials}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Endorsements from clients and institutional directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{t(test.quote)}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{test.clientName}</span>
                    <span className="text-slate-400">
                      {test.clientRole} {test.clientCompany && `· ${test.clientCompany}`}
                    </span>
                  </div>
                  {test.verified && (
                    <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {ui.verifiedReview}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. COMMISSION & CONTACT CTA BANNER */}
      {theme.homepageSections.contactCta && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight max-w-xl mx-auto">
              Ready to create something distinguished together?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Available for Arabic calligraphy commissions, brand identity systems, video editing contracts, and Meta advertising management.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenInquiry('arabic_calligraphy')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95"
              >
                {ui.contactMe}
              </button>
              <button
                onClick={() => onNavigate('links')}
                className="px-6 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              >
                {ui.allLinks}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
