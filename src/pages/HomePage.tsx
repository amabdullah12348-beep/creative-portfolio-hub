import React, { useState } from 'react';
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
  Phone,
  ShieldCheck,
  GraduationCap,
  PlusCircle,
  Check,
  Send,
  Layers,
  ChevronRight,
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
  const { t, ui, lang, isRtl } = useLanguage();

  // Interactive quick calculator / inquiry state (As-Sunnah style campaign widget)
  const [selectedService, setSelectedService] = useState<'calligraphy' | 'design' | 'video' | 'marketing'>('design');
  const [quickNotes, setQuickNotes] = useState('');

  const disciplineCards = [
    {
      id: 'arabic-calligraphy',
      title: 'Arabic Calligraphy',
      subtitle: 'Classical Thuluth, Diwani & Naskh Scripts',
      desc: '4+ years of dedicated artistry. Sacred Qur\'anic verses and monograms crafted with traditional bamboo pens, soot ink, and 24K pure gold leaf on aged archival sheets.',
      icon: Feather,
      metric: '4+ Years Classical Practice',
      badge: 'Sacred Artistry',
      actionText: 'Explore Calligraphy Gallery',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      subtitle: 'Brand Identity, Social Media & Print',
      desc: 'Graduate of As-Sunnah Skill Development Institute. Bespoke brand identity systems, high-CTR social media ad creatives, thumbnails, packaging, and marketing collateral.',
      icon: Palette,
      metric: 'As-Sunnah Institute Certified',
      badge: 'Brand Systems',
      actionText: 'View Design Portfolio',
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      subtitle: 'Cinematic Cuts & High-Retention Reels',
      desc: 'High-retention rhythmic video editing, sound design, color grading, and viral short-form reels for YouTube, Facebook, and Instagram.',
      icon: Video,
      metric: 'Premiere Pro & DaVinci Resolve',
      badge: 'Motion & Reels',
      actionText: 'Watch Video Projects',
    },
    {
      id: 'meta-marketing',
      title: 'Meta Marketing',
      subtitle: 'Targeted Meta Ads & Sales Scaling',
      desc: 'Data-driven Facebook and Instagram ad management. Precise audience targeting, full-funnel creative testing, and ROAS scaling for commercial brands.',
      icon: TrendingUp,
      metric: 'High ROAS & Conversion Scaling',
      badge: 'Meta Ads Specialist',
      actionText: 'View Marketing Results',
    },
  ];

  // Certifications / Accreditations (Matching As-Sunnah Foundation's institutional credentials)
  const certifications = [
    {
      title: 'As-Sunnah Skill Development Institute',
      subtitle: 'Graphic Design, Video Editing & Meta Marketing',
      duration: '3.5 Months Professional Training Completed',
      status: 'Verified Professional Graduate',
      icon: Award,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      title: 'Jamia Arabia Ashraful Ulum, Kushtia',
      subtitle: 'Dawra-e-Hadith (Masters Equivalent)',
      duration: 'Academic Distinction: Jayyid Jiddan (Very Good)',
      status: 'Certified Islamic Scholar (Sanad)',
      icon: BookOpen,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      title: 'Bangladesh Madrasah Education Board',
      subtitle: 'Dakhil Examination 2026 (GPA 4.63)',
      duration: 'Alim Studies (Higher Secondary) Currently In Progress',
      status: 'Merit Academic Standing',
      icon: GraduationCap,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      title: 'Sacred Arabic Calligraphy Artistry',
      subtitle: 'Thuluth, Naskh, Diwani & Ruq\'ah Scripts',
      duration: '4+ Years Dedicated Classical Mastery',
      status: 'Traditional Calligraphic Mastery',
      icon: Feather,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels = {
      calligraphy: 'Arabic Calligraphy Commission',
      design: 'Graphic Design & Brand Identity',
      video: 'Video Editing & Motion Reels',
      marketing: 'Meta Marketing & Targeted Ads',
    };
    const msg = `Hello, I would like to discuss a project regarding ${serviceLabels[selectedService]}.${
      quickNotes ? ` Project details: ${quickNotes}` : ''
    }`;
    onOpenInquiry(
      selectedService === 'calligraphy'
        ? 'arabic_calligraphy'
        : selectedService === 'design'
        ? 'graphic_design'
        : selectedService === 'video'
        ? 'video_editing'
        : 'meta_marketing',
      msg
    );
  };

  return (
    <div className="space-y-16 pb-20 bg-[#f8fafc] text-slate-800">
      {/* 1. HERO SECTION (Smart As-Sunnah Style: Crisp White Canvas, Emerald Green Brand, Gold Accents, Interactive Quick Inquiry Card) */}
      <section className="relative pt-6 sm:pt-10 pb-12 bg-gradient-to-b from-emerald-50/60 via-white to-[#f8fafc] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* As-Sunnah Style Islamic Salawat/Greeting Bar */}
          <div className="text-center pb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/80 text-[#006a4e] text-xs sm:text-sm font-arabic font-medium shadow-xs">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Typographic & Profile Showcase */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* As-Sunnah Pill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006a4e] text-white text-xs font-semibold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>As-Sunnah Foundation Institute Trained</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Dhaka, Bangladesh · Orig. Kushtia</span>
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight leading-[1.15]">
                  {t(profile.name)}
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-[#006a4e] leading-snug">
                  {t(profile.title)}
                </p>
              </div>

              {/* Tagline / Introduction */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {t(profile.tagline)}
              </p>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onOpenInquiry('graphic_design')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-md shadow-emerald-900/10 active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Hire Me / Get In Touch</span>
                </button>

                <button
                  onClick={() => onNavigate('arabic-calligraphy')}
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#006a4e] hover:text-white bg-emerald-50 hover:bg-[#006a4e] border border-emerald-300 rounded-xl transition-all flex items-center gap-2"
                >
                  <Feather className="w-4 h-4" />
                  <span>View Calligraphy Gallery</span>
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all flex items-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>About &amp; Credentials</span>
                </button>
              </div>

              {/* Quick Trust highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>100% On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>Classical &amp; Modern Aesthetics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>Direct Communication</span>
                </div>
              </div>
            </div>

            {/* Right Column: As-Sunnah Style Interactive Action / Consultation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border-2 border-emerald-500/30 shadow-xl overflow-hidden">
                {/* Header matching As-Sunnah Campaign Banner */}
                <div className="bg-gradient-to-r from-[#006a4e] to-[#059669] px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold block">
                        Quick Service Inquiry
                      </span>
                      <h3 className="text-lg font-bold font-display">
                        Start a Project / Consultation
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleQuickSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      1. Select Your Desired Discipline:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'design', label: 'Graphic Design', icon: Palette },
                        { id: 'calligraphy', label: 'Calligraphy', icon: Feather },
                        { id: 'video', label: 'Video Editing', icon: Video },
                        { id: 'marketing', label: 'Meta Marketing', icon: TrendingUp },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedService === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setSelectedService(item.id as any)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 font-medium transition-all text-left ${
                              isSelected
                                ? 'bg-emerald-50 border-[#006a4e] text-[#006a4e] shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#006a4e]' : 'text-slate-500'}`} />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      2. Brief Project Scope (Optional):
                    </label>
                    <textarea
                      value={quickNotes}
                      onChange={(e) => setQuickNotes(e.target.value)}
                      rows={2}
                      placeholder="E.g., Brand logo, Calligraphy artwork size, or Meta ad objective..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-transparent bg-slate-50 text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#006a4e] hover:bg-[#00543c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Send Project Inquiry &rarr;</span>
                  </button>

                  <div className="pt-1 text-center text-[11px] text-slate-500">
                    <span>Direct response via WhatsApp or Email within 24 hours</span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Full-width Metric Strip below Hero */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">4+ Years</span>
              <span className="text-xs text-slate-600 font-medium">Sacred Arabic Calligraphy</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">3.5 Months</span>
              <span className="text-xs text-slate-600 font-medium">As-Sunnah Institute Training</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-amber-600 font-semibold">Jayyid Jiddan</span>
              <span className="text-xs text-slate-600 font-medium">Dawra-e-Hadith (Kushtia)</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">GPA 4.63</span>
              <span className="text-xs text-slate-600 font-medium">Dakhil 2026 · Alim In Progress</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REVIEWS & TESTIMONIALS (PLACED RIGHT AT THE TOP OF HOMEPAGE) */}
      {theme.homepageSections.testimonials && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500/20 shadow-md">
            
            {/* Reviews Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Client Satisfaction &amp; Verified Trust</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                  Client Reviews &amp; Testimonials
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Verified endorsements and real client feedback on graphic design, calligraphy commissions, and Meta campaigns.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>5.0 Star Rating</span>
                </div>
                <button
                  onClick={() => onOpenInquiry('review', 'I would like to submit client review feedback.')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs"
                >
                  + Add Your Review
                </button>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {test.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          <CheckCircle className="w-3 h-3 text-[#006a4e]" />
                          Verified Client
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{t(test.quote)}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{test.clientName}</span>
                      <span className="text-slate-500 text-[11px]">
                        {test.clientRole} {test.clientCompany && `· ${test.clientCompany}`}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {test.projectType || 'Verified Client'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">100+</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">Satisfied Clients</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">100%</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">On-Time Delivery</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">4+ Years</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">Artistry &amp; Design Practice</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">24/7</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">Dedicated Communication</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. CERTIFICATIONS & ACCREDITATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-[#006a4e]" />
            <span>Credentials, Diplomas &amp; Academic Honors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Institutional Certifications &amp; Degrees
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Verified academic qualifications from Jamia Arabia Ashraful Ulum Kushtia and professional skill training from As-Sunnah Skill Development Institute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006a4e]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border mb-2 ${cert.badgeColor}`}>
                      {cert.status}
                    </span>
                    <h3 className="text-sm font-bold font-display text-slate-900 leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-[#006a4e]">
                    {cert.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {cert.duration}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#006a4e] font-semibold">
                  <span>Verified Record</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FOUR DISCIPLINE PORTAL CARDS */}
      {theme.homepageSections.quickNav && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              My Four Core Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select any field to view specialized portfolios, case studies, and curated projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplineCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#006a4e] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006a4e] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {card.badge}
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700">
                      {card.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#006a4e] font-bold">
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. FEATURED ARABIC CALLIGRAPHY SHOWCASE */}
      {theme.homepageSections.featuredCalligraphy && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Feather className="w-4 h-4 text-amber-600" />
                <span>Sacred Letterforms &amp; Illumination</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.featuredArtworks}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('arabic-calligraphy')}
              className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5"
            >
              <span>View All Artworks</span>
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
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg overflow-hidden transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={art.thumbnail}
                    alt={t(art.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                    {art.scriptStyle} Script
                  </div>
                  {art.forSale && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#006a4e] text-white text-[10px] font-bold">
                      Original Available
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors line-clamp-1">
                      {t(art.title)}
                    </h3>
                    <div
                      dir="rtl"
                      className="text-base font-arabic text-amber-800 pt-1 line-clamp-1 font-semibold"
                    >
                      {art.arabicText}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{art.dimensions || 'Handmade Paper & Soot Ink'}</span>
                    <span className="text-[#006a4e] font-bold group-hover:underline flex items-center gap-1">
                      Preview &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. FEATURED GRAPHIC DESIGN & BRANDING */}
      {theme.homepageSections.featuredDesign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
                <Palette className="w-4 h-4 text-[#006a4e]" />
                <span>Visual Identity &amp; High-CTR Graphics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.graphicDesign}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('graphic-design')}
              className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All Design Projects</span>
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
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg overflow-hidden transition-all"
              >
                <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={t(proj.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#006a4e]">{proj.client || 'Client Project'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.completionDate || '2026'}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors">
                    {t(proj.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {t(proj.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FEATURED VIDEO EDITING */}
      {theme.homepageSections.featuredVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                <Video className="w-4 h-4 text-teal-600" />
                <span>Cinematic Editing &amp; Viral Reels</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.videoEditing}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('video-editing')}
              className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All Videos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoProjects.slice(0, 2).map((vid) => (
              <div
                key={vid.id}
                onClick={() => onNavigate('video-editing')}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg overflow-hidden transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={t(vid.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/25 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#006a4e] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                      {vid.duration}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#006a4e] font-semibold">
                    <span>{vid.category}</span>
                    {vid.softwareUsed && vid.softwareUsed.length > 0 && (
                      <>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-slate-500">{vid.softwareUsed.join(', ')}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-[#006a4e] transition-colors">
                    {t(vid.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {t(vid.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. META MARKETING CASE STUDY & RESULTS */}
      {theme.homepageSections.metaServices && marketingCases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-900 to-[#006a4e] text-white shadow-xl">
            <div className="max-w-3xl space-y-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                <span>Meta Ads Growth Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
                Data-Driven Social Acquisition &amp; High ROAS
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Trained at As-Sunnah Skill Development Institute, I build full-funnel ad architectures (Awareness, Retargeting, Catalog Sales) designed to eliminate ad spend waste and accelerate e-commerce revenue.
              </p>
            </div>

            {/* Case Study Card */}
            {marketingCases[0] && (
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-4">
                  <div>
                    <span className="text-xs text-emerald-200 font-mono">CLIENT: {marketingCases[0].client}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {t(marketingCases[0].title)}
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('meta-marketing')}
                    className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {marketingCases[0].metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/15">
                      <span className="text-3xl font-bold font-display text-amber-300 tabular-nums block">
                        {m.metric}
                      </span>
                      <span className="text-xs text-white/90 font-medium block mt-1">
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

      {/* 9. CONTACT CTA BANNER */}
      {theme.homepageSections.contactCta && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#006a4e] shadow-xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#006a4e] text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Available for Commercial Commissions &amp; Contracts</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight max-w-2xl mx-auto">
              Ready to elevate your brand with distinguished design, calligraphy, or video?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Available for Arabic calligraphy commissions, brand identity systems, video editing contracts, and Meta advertising management.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenInquiry('graphic_design')}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{ui.contactMe}</span>
              </button>

              <button
                onClick={() => onNavigate('links')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#006a4e] hover:bg-emerald-50 border border-emerald-300 rounded-xl transition-all"
              >
                <span>{ui.allLinks}</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
