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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          <span>Meta Advertising &amp; Growth Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
          {ui.metaMarketing}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Trained at As-Sunnah Skill Development Institute, I develop data-backed Meta Ads architectures (Facebook &amp; Instagram). Laser-focused audience targeting, creative testing, and ROAS scaling without ad spend waste.
        </p>
      </div>

      {/* Strategic Capabilities Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-display text-white">
            Audience Architecture &amp; Pixel Setup
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Laser-precise demographic segmentation, interest clustering, Conversions API, and custom lookalike modeling.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-display text-white">
            Full-Funnel Creative Strategy
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hook-driven video creatives, social proof carousels, and dynamic catalog ads orchestrated from cold prospect to repeat buyer.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold font-display text-white">
            ROAS Optimization &amp; Scaling
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Continuous A/B budget distribution, Cost Per Purchase (CPP) compression, and clear, transparent performance reporting.
          </p>
        </div>
      </div>

      {/* Case Studies Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Verified Case Studies &amp; Performance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real campaigns, structured funnels, and verified analytical outcomes.
          </p>
        </div>

        {marketingCases.length === 0 ? (
          <p className="text-xs text-slate-400">No case studies published yet.</p>
        ) : (
          <div className="space-y-8">
            {marketingCases.map((cs) => (
              <div
                key={cs.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Client: {cs.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {cs.campaignPeriod}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-white mt-1">
                      {t(cs.title)}
                    </h3>
                  </div>

                  <button
                    onClick={() => onOpenInquiry('meta_marketing', `Interested in campaign strategy like: ${t(cs.title)}`)}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                  >
                    Discuss Similar Campaign
                  </button>
                </div>

                {/* Metrics strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-2xl font-bold font-display text-amber-400 tabular-nums block">
                        {m.metric}
                      </span>
                      <span className="text-xs text-slate-300 font-medium block mt-1">
                        {t(m.label)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Objective & Strategy details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <span className="font-bold text-slate-200 block text-xs uppercase tracking-wider">
                      {ui.objective}
                    </span>
                    <p className="leading-relaxed text-slate-400">
                      {t(cs.objective)}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <span className="font-bold text-slate-200 block text-xs uppercase tracking-wider">
                      {ui.strategy}
                    </span>
                    <p className="leading-relaxed text-slate-400">
                      {t(cs.strategy)}
                    </p>
                  </div>
                </div>

                {/* Screenshots */}
                {cs.screenshots && cs.screenshots.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-slate-400 block mb-2">
                      Verified Campaign Analytics Snapshot:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cs.screenshots.map((img, sIdx) => (
                        <div
                          key={sIdx}
                          onClick={() =>
                            onOpenLightbox({
                              title: cs.title,
                              image: img,
                              description: cs.objective,
                              client: cs.client,
                            })
                          }
                          className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-black cursor-pointer group"
                        >
                          <img
                            src={img}
                            alt="Campaign Analytics Snapshot"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                            <span className="text-xs font-medium text-white px-3 py-1 bg-black/70 rounded-lg">
                              Click to Enlarge
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            {ui.testimonials}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Genuine feedback and ratings from business owners and collaborators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
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

      {/* Inquiry Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-white">
            Want to scale your business with profitable Meta Ads?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Let's evaluate your audience, audit your ad account, and launch a tailored campaign.
          </p>
        </div>
        <button
          onClick={() => onOpenInquiry('meta_marketing')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shrink-0 self-start sm:self-auto"
        >
          {ui.contactMe}
        </button>
      </div>
    </div>
  );
};
