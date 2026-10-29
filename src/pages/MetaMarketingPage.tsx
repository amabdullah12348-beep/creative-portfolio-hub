import React, { useState } from 'react';
import { MarketingCase, Testimonial, ServiceItem } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LightboxItem } from '../components/LightboxModal.tsx';
import {
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle,
  Star,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
  Send,
} from 'lucide-react';

interface MetaMarketingPageProps {
  marketingCases: MarketingCase[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  onOpenLightbox: (item: LightboxItem) => void;
  onOpenInquiry: (category?: string, message?: string) => void;
}

export const MetaMarketingPage: React.FC<MetaMarketingPageProps> = ({
  marketingCases,
  testimonials,
  services,
  onOpenLightbox,
  onOpenInquiry,
}) => {
  const { t, ui } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<MarketingCase | null>(
    marketingCases[0] || null
  );

  const marketingServices = services.filter((s) => s.category === 'meta_marketing');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 pb-24 text-slate-800">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-[#006a4e]" />
          <span>আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট প্রশিক্ষিত</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight">
          {ui.metaMarketing}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ফেসবুক ও ইনস্টাগ্রামের জন্য ফলাফলভিত্তিক বিজ্ঞাপন প্রচারণা। নিখুঁত অডিয়েন্স রিসার্চ, মেটা পিক্সেল ও কনভার্সন এপিআই সেটআপ, ক্রিয়েটিভ টেস্টিং এবং সর্বোচ্চ ROAS নিশ্চিতকরণ।
        </p>
      </div>

      {/* Strategic Capabilities Breakdown (Clean White Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-slate-900">
            অডিয়েন্স আর্কিটেকচার ও পিক্সেল সেটআপ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            লেজার-টার্গেটিং, ডেমোগ্রাফিক সেগমেন্টেশন, লুকঅ্যালাইক অডিয়েন্স ও মেটা কনভার্সন ট্র্যাকিং।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-slate-900">
            ফুল-ফানেল ক্রিয়েটিভ স্ট্র্যাটেজি
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            আকর্ষণীয় ভিডিও হুক, সোশ্যাল প্রুফ ক্যারোসেল ও হাই-কনভার্টিং ক্যাটালগ বিজ্ঞাপন।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-slate-900">
            ROAS অপ্টিমাইজেশন ও বাজেট স্কেলিং
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            বিজ্ঞাপনী বাজেটের সঠিক বণ্টন, প্রতি ক্রয়ে খরচ কমানো এবং স্বচ্ছ পারফরম্যান্স অ্যানালিটিক্স।
          </p>
        </div>
      </div>

      {/* Case Studies Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            বাস্তব কেস স্টাডি ও বিজ্ঞাপনী ফলাফল
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            সত্যায়িত ও ক্লায়েন্ট-অনুমোদিত ফলাফলসমূহ।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Case Studies List */}
          <div className="lg:col-span-5 space-y-4">
            {marketingCases.map((c) => {
              const isSelected = selectedCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-[#006a4e] shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold text-[#006a4e]">{c.client}</span>
                    <span className="font-mono">{c.campaignPeriod}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {t(c.title)}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {t(c.objective)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Case Details */}
          {selectedCase && (
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#006a4e] font-mono uppercase">
                  কেস স্টাডি · {selectedCase.client}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1">
                  {t(selectedCase.title)}
                </h3>
              </div>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-3 gap-3">
                {selectedCase.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <span className="text-2xl font-bold font-display text-[#006a4e] tabular-nums block">
                      {m.metric}
                    </span>
                    <span className="text-[11px] text-slate-700 font-semibold block mt-1">
                      {t(m.label)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Strategy & Outcome */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">মূল লক্ষ্য:</h4>
                  <p>{t(selectedCase.objective)}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">প্রযুক্তিকৌশল:</h4>
                  <p>{t(selectedCase.strategy)}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    onOpenInquiry(
                      'meta_marketing',
                      `আমি "${selectedCase.client}" কেস স্টাডির মতো আমার ব্যবসার জন্যও মেটা বিজ্ঞাপন পরিচালনা করতে চাই।`
                    )
                  }
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ক্যাম্পেইন আলোচনা করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Review Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            ক্লায়েন্ট রিভিউ ও ফিডব্যাক
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            সরাসরি ভেরিফায়েড ক্লায়েন্টদের সন্তোষজনক মতামত।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(tItem.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t(tItem.quote)}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{tItem.clientName}</span>
                  <span className="text-slate-500 text-[11px]">{tItem.clientRole}</span>
                </div>
                {tItem.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006a4e]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ভেরিফায়েড
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
