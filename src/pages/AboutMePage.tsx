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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* 1. Profile Bio Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative group">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-slate-900 shadow-2xl p-2">
              <img
                src={profile.avatarUrl}
                alt={t(profile.name)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold whitespace-nowrap shadow-lg">
              {ui.experienceYears}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ui.aboutMe}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              {t(profile.name)}
            </h1>
            <p className="text-lg font-medium text-amber-300/90">
              {t(profile.title)}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t(profile.bio)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t(profile.location)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t(profile.trainingInstitute)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{profile.whatsapp}</span>
            </div>
          </div>

          {/* Action buttons: Download CV & Contact */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCvModal}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{ui.downloadCv}</span>
            </button>

            <button
              onClick={() => onOpenInquiry('general')}
              className="px-5 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{ui.contactMe}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Structured Timeline: Education vs Training */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {ui.educationTrainingTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Clear distinction between formal Islamic academic qualifications and professional skill development.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'training'
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Skill Training
            </button>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
          {filteredEducation.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  item.type === 'education'
                    ? 'bg-blue-950 border-blue-400'
                    : 'bg-amber-950 border-amber-400'
                }`}
              />

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold uppercase tracking-wider text-[11px] ${
                        item.type === 'education' ? 'text-blue-400' : 'text-amber-400'
                      }`}
                    >
                      {item.type === 'education' ? 'Academic Degree' : 'Skill Training'}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{item.yearOrPeriod}</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">{t(item.result)}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-white">
                  {t(item.degree)}
                </h3>

                <h4 className="text-xs font-semibold text-slate-300">
                  {t(item.institution)}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
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
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            Core Competencies &amp; Technical Tools
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Proficiencies across calligraphy, design, video editing, and digital advertising.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{skill.name}</span>
                <span className="font-mono text-amber-400 tabular-nums">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              {skill.badge && (
                <span className="text-[10px] text-slate-400 block pt-0.5">
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
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            Offered Professional Services
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tailored creative solutions for individuals, businesses, and institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white">
                  {t(srv.title)}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(srv.shortDesc)}
                </p>
                <div className="pt-2 space-y-1.5">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{t(feat)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">{srv.startingPrice || 'Flexible Packages'}</span>
                <button
                  onClick={() => onOpenInquiry(srv.category, `Inquiry regarding: ${t(srv.title)}`)}
                  className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                >
                  Book Service &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
