import React, { useState } from 'react';
import { Profile, EducationRecord, SkillItem, ServiceItem } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Award,
  BookOpen,
  GraduationCap,
  Download,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface AboutMePageProps {
  profile: Profile;
  education: EducationRecord[];
  skills: SkillItem[];
  services: ServiceItem[];
  onOpenCvModal: () => void;
  onOpenInquiry: (category?: string, message?: string) => void;
  onNavigate: (page: string) => void;
}

export const AboutMePage: React.FC<AboutMePageProps> = ({
  profile,
  education,
  skills,
  services,
  onOpenCvModal,
  onOpenInquiry,
  onNavigate,
}) => {
  const { t, ui } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'training'>('all');

  const filteredEducation = education.filter((e) => {
    if (activeTab === 'all') return true;
    return e.type === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24 text-slate-800">
      {/* 1. Profile Bio Header (As-Sunnah Style) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-emerald-500/30 bg-slate-100 shadow-xl p-1.5">
                <img
                  src={profile.avatarUrl}
                  alt={t(profile.name)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#006a4e] text-white text-xs font-bold whitespace-nowrap shadow-md">
                {ui.experienceYears}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{ui.aboutMe}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight">
                {t(profile.name)}
              </h1>
              <p className="text-lg font-bold text-[#006a4e]">
                {t(profile.title)}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(profile.bio)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#006a4e] shrink-0" />
                <span><strong>বর্তমান অবস্থান:</strong> {t(profile.location)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#006a4e] shrink-0" />
                <span><strong>প্রশিক্ষণ ইনস্টিটিউট:</strong> {t(profile.trainingInstitute)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#006a4e] shrink-0" />
                <span><strong>ইমেইল:</strong> {profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#006a4e] shrink-0" />
                <span><strong>হোয়াটসঅ্যাপ/মোবাইল:</strong> {profile.whatsapp}</span>
              </div>
            </div>

            {/* Action buttons: Download CV & Contact */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCvModal}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{ui.downloadCv} (সিভি ডাউনলোড)</span>
              </button>

              <button
                onClick={() => onOpenInquiry('general')}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#006a4e] hover:text-white bg-emerald-50 hover:bg-[#006a4e] border border-emerald-300 rounded-xl transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{ui.contactMe}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Structured Timeline: Academic Education vs Skill Training */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>প্রাতিষ্ঠানিক রেকর্ড</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              {ui.educationTrainingTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              শাস্ত্রীয় প্রাতিষ্ঠানিক ডিগ্রি এবং পেশাদার প্রযুক্তিগত প্রশিক্ষণের স্পষ্ট সত্যায়ন।
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl self-start sm:self-auto text-xs shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#006a4e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সকল রেকর্ড
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'education'
                  ? 'bg-[#006a4e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              একাডেমিক ডিগ্রি
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'training'
                  ? 'bg-[#006a4e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              স্কিল ট্রেনিং
            </button>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-300 space-y-8">
          {filteredEducation.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 ${
                  item.type === 'education'
                    ? 'bg-emerald-600 border-emerald-200 ring-4 ring-emerald-100'
                    : 'bg-amber-500 border-amber-200 ring-4 ring-amber-100'
                }`}
              />

              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full ${
                        item.type === 'education' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.type === 'education' ? 'একাডেমিক ডিগ্রি' : 'প্রফেশনাল স্কিল কোর্স'}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{item.yearOrPeriod}</span>
                  </div>
                  <span className="font-bold text-[#006a4e] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {t(item.result)}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900">
                  {t(item.degree)}
                </h3>

                <h4 className="text-xs font-semibold text-slate-600">
                  {t(item.institution)}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {t(item.details)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Skills Matrix */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            দক্ষতা ও প্রযুক্তিগত টুলস
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ক্যালিগ্রাফি, গ্রাফিক্স ডিজাইন, ভিডিও এডিটিং ও ডিজিটাল বিজ্ঞাপনে বাস্তব কর্মদক্ষতা।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{skill.name}</span>
                <span className="font-mono text-[#006a4e] font-bold tabular-nums">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006a4e] to-[#059669] rounded-full transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              {skill.badge && (
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {skill.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Services Overview */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            প্রস্তাবিত পেশাদার সেবাসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ব্যক্তি, প্রতিষ্ঠান এবং ব্যবসার জন্য কাস্টমাইজড নান্দনিক ও কার্যকর সমাধান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#006a4e] hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {t(srv.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t(srv.shortDesc)}
                </p>
                <div className="pt-2 space-y-2">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#006a4e] shrink-0" />
                      <span>{t(feat)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#006a4e] bg-emerald-50 px-2.5 py-1 rounded-md">
                  {srv.startingPrice || 'সুলভ ও মানসম্পন্ন'}
                </span>
                <button
                  onClick={() => onOpenInquiry(srv.category, `সেবা আলোচনা: ${t(srv.title)}`)}
                  className="text-xs font-bold text-[#006a4e] hover:underline flex items-center gap-1"
                >
                  বুক করুন &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
