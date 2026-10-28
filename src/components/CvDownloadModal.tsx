import React from 'react';
import { X, Printer, Download, MapPin, Mail, Phone, Award, BookOpen, Sparkles } from 'lucide-react';
import { Profile, EducationRecord, SkillItem } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface CvDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  education: EducationRecord[];
  skills: SkillItem[];
}

export const CvDownloadModal: React.FC<CvDownloadModalProps> = ({
  isOpen,
  onClose,
  profile,
  education,
  skills,
}) => {
  const { t, ui } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Toolbar (Hidden in Print) */}
        <div className="no-print p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Curriculum Vitae &amp; Credentials</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-slate-900 text-slate-100 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-800 print:border-black/30 pb-6 mb-6">
            <h1 className="text-3xl font-bold font-display text-white print:text-black tracking-tight">
              {t(profile.name)}
            </h1>
            <p className="text-sm font-medium text-amber-400 print:text-black/80 mt-1">
              {t(profile.title)}
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 print:text-black/70 mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 print:text-black" />
                {t(profile.location)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400 print:text-black" />
                {profile.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400 print:text-black" />
                {profile.whatsapp}
              </span>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black mb-2">
              Professional Profile
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 print:text-black/90">
              {t(profile.bio)}
            </p>
          </div>

          {/* Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-slate-800 print:border-gray-300 text-xs">
            <div>
              <span className="text-slate-400 print:text-black/60 block font-medium">Arabic Calligraphy Experience</span>
              <span className="text-slate-200 print:text-black font-semibold text-sm">~4 Years Active Practice</span>
              <p className="text-[11px] text-slate-400 print:text-black/70 mt-0.5">Thuluth, Diwani, Naskh &amp; 24K Gold Tazhib</p>
            </div>
            <div>
              <span className="text-slate-400 print:text-black/60 block font-medium">Professional Skill Training</span>
              <span className="text-slate-200 print:text-black font-semibold text-sm">3.5 Months Intensive Certification</span>
              <p className="text-[11px] text-slate-400 print:text-black/70 mt-0.5">{t(profile.trainingInstitute)}</p>
            </div>
          </div>

          {/* Education & Academic Honors */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black mb-3">
              Academic Background &amp; Credentials
            </h2>
            <div className="space-y-4">
              {education.map((rec) => (
                <div key={rec.id} className="text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-white print:text-black">{t(rec.degree)}</span>
                      <span className="text-slate-400 print:text-black/70 block">{t(rec.institution)}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-amber-400 print:text-black font-semibold">{t(rec.result)}</span>
                      <span className="text-[11px] text-slate-400 print:text-black/60 block">{rec.yearOrPeriod}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 print:text-black/70 mt-1">
                    {t(rec.details)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-black mb-3">
              Skills &amp; Capabilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {skills.map((skill) => (
                <div key={skill.id} className="p-2 bg-slate-950/40 print:bg-gray-50 border border-slate-800 print:border-gray-200 rounded">
                  <span className="font-medium text-slate-200 print:text-black block">{skill.name}</span>
                  <span className="text-[10px] text-slate-400 print:text-black/60">{skill.badge || skill.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
