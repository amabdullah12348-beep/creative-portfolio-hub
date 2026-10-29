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
  Camera,
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
      title: ui.arabicCalligraphy,
      subtitle: 'শাস্ত্রীয় থুলুথ, দিওয়ানি ও নাসখ লিপি',
      desc: '৪ বছরের বাস্তব শিল্পচর্চা। ঐতিহ্যবাহী বাঁশের কলম, ভুসাকালি ও ২৪ ক্যারেট খাঁটি স্বর্ণের পাতে তৈরি আরবি চারুলিপি ও ক্যালিগ্রাফি মাস্টারপিস।',
      icon: Feather,
      metric: '৪+ বছরের শাস্ত্রীয় অভিজ্ঞতা',
      badge: 'শাস্ত্রীয় চারুলিপি',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      actionText: 'ক্যালিগ্রাফি গ্যালারি দেখুন',
    },
    {
      id: 'graphic-design',
      title: ui.graphicDesign,
      subtitle: 'ব্র্যান্ডিং, সোশ্যাল মিডিয়া ও পোস্টার',
      desc: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে প্রশিক্ষণপ্রাপ্ত। আন্তর্জাতিক মানের লোগো, ব্র্যান্ড আইডেন্টিটি, ব্যানার ও হাই-কনভার্টিং সোশ্যাল মিডিয়া গ্রাফিক্স।',
      icon: Palette,
      metric: 'আস-সুন্নাহ ইনস্টিটিউট সার্টিফাইড',
      badge: 'ব্র্যান্ড ডিজাইন',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      actionText: 'ডিজাইন পোর্টফোলিও দেখুন',
    },
    {
      id: 'video-editing',
      title: ui.videoEditing,
      subtitle: 'সিনেমাটিক কাটস ও ভাইরাল রিলস',
      desc: 'ইউটিউব, ফেসবুক ও ইনস্টাগ্রামের জন্য হাই-রিটেনশন ভিডিও এডিটিং, সাউন্ড ডিজাইন, কালার গ্রেডিং ও আকর্ষক মোশন গ্রাফিক্স।',
      icon: Video,
      metric: 'প্রিমিয়ার প্রো ও দাভিঞ্চি রিজলভ',
      badge: 'মোশন ও ভিডিও',
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      actionText: 'ভিডিও প্রজেক্ট দেখুন',
    },
    {
      id: 'meta-marketing',
      title: ui.metaMarketing,
      subtitle: 'টার্গেটেড মেটা অ্যাডস ও সেলস গ্রোথ',
      desc: 'ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপনে নিখুঁত অডিয়েন্স টার্গেটিং, ফানেল স্ট্র্যাটেজি ও হাই ROAS নিশ্চিত করে ব্যবসার বিক্রয় বৃদ্ধি।',
      icon: TrendingUp,
      metric: 'উচ্চ ROAS ও ডেটা-ড্রিভেন সেলস',
      badge: 'মেটা অ্যাডস এক্সপার্ট',
      color: 'text-green-800 bg-green-50 border-green-200',
      actionText: 'মার্কেটিং ফলাফল দেখুন',
    },
  ];

  // Certifications / Accreditations (Matching As-Sunnah Foundation's approval/sanad section)
  const certifications = [
    {
      title: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট',
      englishTitle: 'As-Sunnah Skill Development Institute',
      subtitle: 'গ্রাফিক্স ডিজাইন, ভিডিও এডিটিং ও মেটা মার্কেটিং',
      duration: 'সাড়ে ৩ মাসের পেশাদার প্রশিক্ষণ সম্পন্ন',
      status: 'ভেরিফায়েড প্রফেশনাল গ্রাজুয়েট',
      icon: Award,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      title: 'জামিয়া আরাবিয়া আশরাফুল উলূম কুষ্টিয়া',
      englishTitle: 'Jamia Arabia Ashraful Ulum Kushtia',
      subtitle: 'দাওরায়ে হাদিস (মাস্টার্স সমমান)',
      duration: 'ফলাফল: জায়্যিদ জিদ্দান (Jayyid Jiddan)',
      status: 'সনদপ্রাপ্ত আলিম ও ইসলামিক স্কলার',
      icon: BookOpen,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      title: 'বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড',
      englishTitle: 'Bangladesh Madrasah Education Board',
      subtitle: 'দাখিল পরীক্ষা ২০২৬ (জিপিএ ৪.৬৩)',
      duration: 'আলিম শ্রেণি (উচ্চমাধ্যমিক সমমান) অধ্যয়নরত',
      status: 'মেধাবী প্রাতিষ্ঠানিক ফলাফল',
      icon: GraduationCap,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      title: 'আরবি ক্যালিগ্রাফি শিল্পশালা',
      englishTitle: 'Traditional Arabic Calligraphy Artistry',
      subtitle: 'শাস্ত্রীয় থুলুথ, নাসখ, দিওয়ানি ও রুকাহ লিপি',
      duration: '৪+ বছরের নিরবচ্ছিন্ন শিল্পসাধনা',
      status: 'ঐতিহ্যবাহী ক্যালিগ্রাফি প্র্যাকটিস',
      icon: Feather,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels = {
      calligraphy: 'আরবি ক্যালিগ্রাফি কমিশন',
      design: 'গ্রাফিক্স ডিজাইন ও ব্র্যান্ডিং',
      video: 'ভিডিও এডিটিং ও রিলস',
      marketing: 'মেটা মার্কেটিং ও ফেসবুক বিজ্ঞাপন',
    };
    const msg = `আসসালামু আলাইকুম, আমি ${serviceLabels[selectedService]} সংক্রান্ত কাজের বিষয়ে আলোচনা করতে চাই।${
      quickNotes ? ` বিস্তারিত: ${quickNotes}` : ''
    }`;
    onOpenInquiry(selectedService === 'calligraphy' ? 'arabic_calligraphy' : selectedService === 'design' ? 'graphic_design' : selectedService === 'video' ? 'video_editing' : 'meta_marketing', msg);
  };

  return (
    <div className="space-y-16 pb-20 bg-[#f8fafc] text-slate-800">
      {/* 1. HERO SECTION (As-Sunnah Foundation Style: Crisp White Canvas, Emerald Green Brand, Gold Accents, Interactive Quick Inquiry Card) */}
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
              
              {/* As-Sunnah Pill Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006a4e] text-white text-xs font-semibold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>আস-সুন্নাহ ফাউন্ডেশন ইনস্টিটিউট প্রশিক্ষিত</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>ঢাকা, বাংলাদেশ (কুষ্টিয়া)</span>
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
                  <span>কাজের জন্য যোগাযোগ করুন</span>
                </button>

                <button
                  onClick={() => onNavigate('arabic-calligraphy')}
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#006a4e] hover:text-white bg-emerald-50 hover:bg-[#006a4e] border border-emerald-300 rounded-xl transition-all flex items-center gap-2"
                >
                  <Feather className="w-4 h-4" />
                  <span>ক্যালিগ্রাফি শিল্পকর্ম</span>
                </button>

                <button
                  onClick={() => onNavigate('admin')}
                  className="px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs flex items-center gap-2"
                  title="অ্যাডমিন প্যানেলে সরাসরি সংশোধন করুন"
                >
                  <Camera className="w-4 h-4" />
                  <span>অ্যাডমিন এডিটর (/admin)</span>
                </button>
              </div>

              {/* Quick Trust highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>১০০% সময়নিষ্ঠ ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>ইসলামিক ও আধুনিক নন্দনতত্ত্ব</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#006a4e]" />
                  <span>সরাসরি সংশোধন ও কাস্টমাইজেশন</span>
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
                        দ্রুত সেবা নির্বাচন ও আলোচনা
                      </span>
                      <h3 className="text-lg font-bold font-display">
                        সরাসরি প্রজেক্ট বুকিং ও পরামর্শ
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
                      ১. আপনার কাঙ্ক্ষিত সেবা বেছে নিন:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'design', label: 'গ্রাফিক্স ডিজাইন', icon: Palette },
                        { id: 'calligraphy', label: 'আরবি ক্যালিগ্রাফি', icon: Feather },
                        { id: 'video', label: 'ভিডিও এডিটিং', icon: Video },
                        { id: 'marketing', label: 'মেটা মার্কেটিং', icon: TrendingUp },
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
                      ২. কাজের সংক্ষেপ বা মেসেজ (ঐচ্ছিক):
                    </label>
                    <textarea
                      value={quickNotes}
                      onChange={(e) => setQuickNotes(e.target.value)}
                      rows={2}
                      placeholder="লোগো, ক্যালিগ্রাফি সাইজ বা ক্যাম্পেইনের লক্ষ্য লিখুন..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-transparent bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#006a4e] hover:bg-[#00543c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>আলোচনা শুরু করুন &rarr;</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-slate-500">
                    <span>সরাসরি হোয়াটসঅ্যাপ বা ইনবক্সে যোগাযোগ করা হবে</span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Full-width Metric Strip below Hero */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">৪+ বছর</span>
              <span className="text-xs text-slate-600 font-medium">আরবি ক্যালিগ্রাফি সাধনা</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">৩.৫ মাস</span>
              <span className="text-xs text-slate-600 font-medium">আস-সুন্নাহ ইনস্টিটিউট প্রশিক্ষণ</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-amber-600 font-semibold">জায়্যিদ জিদ্দান</span>
              <span className="text-xs text-slate-600 font-medium">দাওরায়ে হাদিস (কুষ্টিয়া)</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-bold font-display text-[#006a4e] tabular-nums">জিপিএ ৪.৬৩</span>
              <span className="text-xs text-slate-600 font-medium">দাখিল ২০২৬ · আলিম অধ্যয়নরত</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REVIEWS & TESTIMONIALS (EXPLICIT USER REQUEST: "শুরুর দিকে হোমে যেন আমার রিভিউ বা এই টাইপের কিছু থাকে") */}
      {theme.homepageSections.testimonials && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500/20 shadow-md">
            
            {/* Reviews Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>ক্লায়েন্টদের সন্তুষ্টি ও মতামত</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                  রিভিউ ও ক্লায়েন্টদের মূল্যায়ন
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  আমার গ্রাফিক্স ডিজাইন, ক্যালিগ্রাফি এবং মেটা মার্কেটিং সেবার বিষয়ে ক্লায়েন্টদের প্রত্যক্ষ অভিজ্ঞতা ও মন্তব্য।
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>৫.০ স্টার রেটিং</span>
                </div>
                <button
                  onClick={() => onOpenInquiry('review', 'আমি একটি ক্লায়েন্ট রিভিউ ও ফিডব্যাক দিতে চাই।')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs"
                >
                  + আপনার রিভিউ দিন
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
                          ভেরিফায়েড ক্লায়েন্ট
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
                      {test.projectType || 'ভেরিফায়েড ক্লায়েন্ট'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">১০০+</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">সন্তুষ্ট ক্লায়েন্ট ও ক্রেতা</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">১০০%</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">অন-টাইম প্রজেক্ট ডেলিভারি</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">৪+ বছর</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">শিল্পচর্চার অভিজ্ঞতা</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-xl font-bold font-display text-[#006a4e]">২৪/৭</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">সরাসরি সাপোর্ট ও পরামর্শ</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. CERTIFICATIONS & ACCREDITATIONS (Matching As-Sunnah Foundation's approval/sanad section from video 00:10-00:12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-[#006a4e]" />
            <span>সনদপত্র, অনুমোদন ও শিক্ষাগত যোগ্যতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            প্রফেশনাল সার্টিফিকেশন ও প্রাতিষ্ঠানিক ডিগ্রি
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট ও জামিয়া আরাবিয়া আশরাফুল উলূম কুষ্টিয়া থেকে অর্জিত সত্যায়িত যোগ্যতা।
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
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {cert.englishTitle}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-[#006a4e]">
                    {cert.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {cert.duration}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#006a4e] font-semibold">
                  <span>সত্যায়িত রেকর্ড</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FOUR DISCIPLINE PORTAL CARDS (As-Sunnah Foundation Clean White Cards) */}
      {theme.homepageSections.quickNav && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              আমার চারটি প্রধান কর্মক্ষেত্র
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              যেকোনো বিভাগে ক্লিক করে কাজের বিস্তারিত গ্যালারি, প্রজেক্ট এবং কেস স্টাডি দেখুন।
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

      {/* 5. FEATURED ARABIC CALLIGRAPHY SHOWCASE (With prominent Add Photo / View options) */}
      {theme.homepageSections.featuredCalligraphy && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Feather className="w-4 h-4 text-amber-600" />
                <span>আরবি চারুলিপি প্রদর্শনী</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.featuredArtworks}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('admin')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-[#006a4e] border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5"
                title="অ্যাডমিন থেকে ছবি যুক্ত করুন"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>+ অ্যাড ফটো / ছবি আপলোড</span>
              </button>
              <button
                onClick={() => onNavigate('arabic-calligraphy')}
                className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5"
              >
                <span>সব শিল্পকর্ম দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
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
                    {art.scriptStyle} লিপি
                  </div>
                  {art.forSale && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#006a4e] text-white text-[10px] font-bold">
                      সংগ্রহযোগ্য
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
                    <span>{art.dimensions || 'ঐতিহ্যবাহী কাগজ ও কালি'}</span>
                    <span className="text-[#006a4e] font-bold group-hover:underline flex items-center gap-1">
                      বড় করে দেখুন &rarr;
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
                <span>গ্রাফিক্স ডিজাইন ও ব্র্যান্ড আইডেন্টিটি</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.graphicDesign}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('graphic-design')}
              className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>সকল ডিজাইন প্রজেক্ট</span>
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
                    <span className="font-semibold text-[#006a4e]">{proj.client || 'ক্লায়েন্ট প্রজেক্ট'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.completionDate || '২০২৬'}</span>
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
                <span>ভিডিও এডিটিং ও সিনেমাটিক রিলস</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {ui.videoEditing}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('video-editing')}
              className="text-xs font-bold text-[#006a4e] hover:text-[#00543c] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>সকল ভিডিও দেখুন</span>
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
                <span>মেটা মার্কেটিং ও ক্যাম্পেইন গ্রোথ</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
                ডেটা-ড্রিভেন সামাজিক যোগাযোগ বিজ্ঞাপন ও উচ্চ বিক্রয়
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে প্রশিক্ষিত মেটা মার্কেটিং দক্ষতায় পরিচালিত প্রচারণা। নিখুঁত টার্গেটিং, রিটার্গেটিং ও ফানেল অপ্টিমাইজেশন।
              </p>
            </div>

            {/* Case Study Card */}
            {marketingCases[0] && (
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-4">
                  <div>
                    <span className="text-xs text-emerald-200 font-mono">ক্লায়েন্ট: {marketingCases[0].client}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {t(marketingCases[0].title)}
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('meta-marketing')}
                    className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>সম্পূর্ণ কেস স্টাডি দেখুন</span>
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

      {/* 9. AS-SUNNAH FOUNDATION STYLE BANNER / CONTACT SECTION */}
      {theme.homepageSections.contactCta && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#006a4e] shadow-xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#006a4e] text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>সরাসরি নতুন কাজ শুরু করুন</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight max-w-2xl mx-auto">
              আপনার প্রতিষ্ঠানের জন্য আকর্ষণীয় ডিজাইন, ক্যালিগ্রাফি বা বিজ্ঞাপনী সেবা চান?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              আরবি ক্যালিগ্রাফি কমিশন, ব্র্যান্ডিং, ভিডিও এডিটিং কিংবা ফেসবুক/ইনস্টাগ্রাম মার্কেটিং ক্যাম্পেইনের জন্য আজই যোগাযোগ করুন।
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

              <button
                onClick={() => onNavigate('admin')}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>অ্যাডমিন ড্যাশবোর্ড / ফটো এডিটর</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
