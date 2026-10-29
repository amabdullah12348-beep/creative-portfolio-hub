import React, { useState, useEffect } from 'react';
import {
  Profile,
  EducationRecord,
  SkillItem,
  ServiceItem,
  DesignProject,
  VideoProject,
  MarketingCase,
  Testimonial,
  CalligraphyArtwork,
  SocialLink,
  ThemeSettings,
  Inquiry,
  MediaAsset,
} from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';
import { ImageUploadField } from '../../components/ImageUploadField.tsx';
import {
  LayoutDashboard,
  User,
  Palette,
  Video,
  TrendingUp,
  Feather,
  Link as LinkIcon,
  Sliders,
  Inbox,
  FolderOpen,
  Database,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  Award,
  Download,
  Copy,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';

interface AdminDashboardProps {
  initialProfile: Profile;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialProfile,
  onNavigateHome,
}) => {
  const { isAdmin, login, logout } = useAuth();
  const { theme, updateTheme, resetTheme } = useTheme();
  const { ui, lang } = useLanguage();

  // Auth state
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  type TabKey =
    | 'quick-edit'
    | 'overview'
    | 'profile'
    | 'education'
    | 'calligraphy'
    | 'design'
    | 'video'
    | 'marketing'
    | 'links'
    | 'theme'
    | 'inquiries'
    | 'media'
    | 'backup'
    | 'security';

  const [activeTab, setActiveTab] = useState<TabKey>('quick-edit');

  // Content States
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [education, setEducation] = useState<EducationRecord[]>([]);
  const [designProjects, setDesignProjects] = useState<DesignProject[]>([]);
  const [videoProjects, setVideoProjects] = useState<VideoProject[]>([]);
  const [marketingCases, setMarketingCases] = useState<MarketingCase[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [calligraphy, setCalligraphy] = useState<CalligraphyArtwork[]>([]);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [sqlSchema, setSqlSchema] = useState<string>('');

  // UI state messages
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  // Load all data when authenticated
  const loadDashboardData = async () => {
    try {
      const [
        p,
        edu,
        des,
        vid,
        mkt,
        test,
        cal,
        lks,
        inqs,
        meds,
        sql,
      ] = await Promise.all([
        api.getProfile(),
        api.getEducation(),
        api.getDesignProjects(),
        api.getVideoProjects(),
        api.getMarketingCases(),
        api.getTestimonials(),
        api.getCalligraphy(),
        api.getLinks(),
        api.getInquiries(),
        api.getMedia(),
        api.getSqlSchema().catch(() => ''),
      ]);

      setProfile(p);
      setEducation(edu);
      setDesignProjects(des);
      setVideoProjects(vid);
      setMarketingCases(mkt);
      setTestimonials(test);
      setCalligraphy(cal);
      setLinks(lks);
      setInquiries(inqs);
      setMedia(meds);
      setSqlSchema(sql);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  const showSuccess = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const ok = await login(loginPassword);
      if (!ok) {
        setLoginError('Invalid password. Default is "admin123"');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- Profile update ---
  const handleSaveProfile = async () => {
    try {
      const updated = await api.updateProfile(profile);
      setProfile(updated);
      showSuccess('Profile & Images saved to live database!');
    } catch (err: any) {
      showError(err.message || 'Failed to save profile');
    }
  };

  // --- Quick-Edit: Save All Core Text & Images ---
  const handleSaveAllQuickEdit = async () => {
    try {
      await api.updateProfile(profile);
      // save calligraphy
      for (const art of calligraphy.slice(0, 3)) {
        await api.updateCalligraphy(art.id, art);
      }
      // save design
      for (const des of designProjects.slice(0, 3)) {
        await api.updateDesignProject(des.id, des);
      }
      showSuccess('All text and images saved successfully!');
    } catch (err: any) {
      showError(err.message || 'Error saving changes');
    }
  };

  // --- Education handlers ---
  const handleAddEducation = async () => {
    const newRecord: Omit<EducationRecord, 'id'> = {
      institution: { bn: 'নতুন প্রতিষ্ঠান', en: 'New Institution', ar: 'مؤسسة جديدة', ur: 'نیا ادارہ' },
      degree: { bn: 'ডিগ্রি বা কোর্স', en: 'Degree / Certificate', ar: 'الشهادة أو الدورة', ur: 'ڈگری یا کورس' },
      yearOrPeriod: '2026',
      result: { bn: 'জিপিএ বা গ্রেড', en: 'GPA / Distinction', ar: 'التقدير', ur: 'گریڈ' },
      details: { bn: 'বিবরণ', en: 'Program details', ar: 'تفاصيل البرنامج', ur: 'تفصیلات' },
      type: 'education',
      order: education.length + 1,
    };
    try {
      const saved = await api.createEducation(newRecord);
      setEducation([...education, saved]);
      showSuccess('Education record added');
    } catch (err: any) {
      showError(err.message || 'Failed to add record');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.deleteEducation(id);
      setEducation(education.filter((e) => e.id !== id));
      showSuccess('Record deleted');
    } catch (err: any) {
      showError(err.message);
    }
  };

  // --- Graphic Design handlers ---
  const handleAddDesignProject = async () => {
    const newProj: Omit<DesignProject, 'id'> = {
      slug: 'project-' + Date.now(),
      title: { bn: 'নতুন ডিজাইন প্রজেক্ট', en: 'New Design Project', ar: 'مشروع تصميم جديد', ur: 'نیا ڈیزائن پروجیکٹ' },
      category: 'Logo & Branding',
      description: { bn: 'প্রজেক্টের বিবরণ...', en: 'Project description...', ar: 'وصف المشروع...', ur: 'پروجیکٹ کی تفصیل...' },
      thumbnail: profile.avatarUrl || '/src/assets/images/branding_identity_showcase_1793194734888.jpg',
      images: [profile.avatarUrl || '/src/assets/images/branding_identity_showcase_1793194734888.jpg'],
      tags: ['Branding', 'Design'],
      client: 'New Client',
      completionDate: '2026',
      featured: true,
      order: designProjects.length + 1,
      status: 'published',
    };
    try {
      const saved = await api.createDesignProject(newProj);
      setDesignProjects([...designProjects, saved]);
      showSuccess('Design project created');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    if (!window.confirm('Delete this design project?')) return;
    try {
      await api.deleteDesignProject(id);
      setDesignProjects(designProjects.filter((p) => p.id !== id));
      showSuccess('Project deleted');
    } catch (err: any) {
      showError(err.message);
    }
  };

  // --- Calligraphy handlers ---
  const handleAddCalligraphy = async () => {
    const newArt: Omit<CalligraphyArtwork, 'id'> = {
      slug: 'calligraphy-' + Date.now(),
      title: { bn: 'নতুন ক্যালিগ্রাফি শিল্পকর্ম', en: 'New Sacred Calligraphy Artwork', ar: 'لوحة خط جديدة', ur: 'نیا خطاطی کا فن پارہ' },
      arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      scriptStyle: 'Thuluth',
      year: '2026',
      medium: { bn: 'হস্তনির্মিত কাগজ ও কালি', en: 'Handmade cotton archival paper & ink', ar: 'ورق يدوي وحبر أصلي', ur: 'ہینڈ میڈ کاغذ اور روایتی سیاہی' },
      dimensions: '50 x 70 cm',
      thumbnail: '/src/assets/images/calligraphy_thuluth_gold_1793194734031.jpg',
      images: ['/src/assets/images/calligraphy_thuluth_gold_1793194734031.jpg'],
      description: { bn: 'শাস্ত্রীয় অনুপাত অনুযায়ী রচিত।', en: 'Executed according to classical proportions.', ar: 'وفق موازين الخط العربي.', ur: 'کلاسیکی میزان کے مطابق۔' },
      commissionAvailable: true,
      forSale: true,
      featured: true,
      order: calligraphy.length + 1,
      status: 'published',
    };
    try {
      const saved = await api.createCalligraphy(newArt);
      setCalligraphy([...calligraphy, saved]);
      showSuccess('Calligraphy artwork created');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleDeleteCalligraphy = async (id: string) => {
    if (!window.confirm('Delete this artwork?')) return;
    try {
      await api.deleteCalligraphy(id);
      setCalligraphy(calligraphy.filter((c) => c.id !== id));
      showSuccess('Artwork deleted');
    } catch (err: any) {
      showError(err.message);
    }
  };

  // --- Social Links handlers ---
  const handleAddLink = async () => {
    const newL: Omit<SocialLink, 'id'> = {
      title: 'New Social Link',
      url: 'https://',
      platform: 'website',
      icon: 'Globe',
      description: { bn: 'নতুন লিংক', en: 'New professional link', ar: 'رابط جديد', ur: 'نیا لنک' },
      showOnHome: true,
      showOnFooter: true,
      showOnAbout: true,
      showOnLinksPage: true,
      displayOrder: links.length + 1,
      isVisible: true,
    };
    try {
      const saved = await api.createLink(newL);
      setLinks([...links, saved]);
      showSuccess('Link added to database');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!window.confirm('Delete this link?')) return;
    try {
      await api.deleteLink(id);
      setLinks(links.filter((l) => l.id !== id));
      showSuccess('Link removed');
    } catch (err: any) {
      showError(err.message);
    }
  };

  // --- Database Export / Import ---
  const handleExportJson = async () => {
    try {
      const blob = await api.exportDatabase();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      showSuccess('Database backup downloaded');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm('WARNING: Restoring will overwrite existing records with the backup file. Proceed?')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        await api.importDatabase(parsed);
        await loadDashboardData();
        showSuccess('Database restored successfully from backup!');
      } catch (err: any) {
        showError('Invalid JSON backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // --- Password update ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    try {
      await api.changePassword(newPassword);
      setPasswordStatus('Password changed successfully');
      setNewPassword('');
      setTimeout(() => setPasswordStatus(null), 3000);
    } catch (err: any) {
      showError(err.message || 'Failed to update password');
    }
  };

  // If not logged in, render the login card
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#f8fafc]">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border-2 border-emerald-500/30 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-center mx-auto text-[#006a4e] shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-900">
              অ্যাডমিন CMS ড্যাশবোর্ড
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              পাসওয়ার্ড দিয়ে লগইন করে সরাসরি ব্রাউজার থেকে আপনার ছবি, নাম, ক্যালিগ্রাফি ও সকল প্রজেক্ট এডিট বা সংশোধন করুন।
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#006a4e]">ডিফল্ট পাসওয়ার্ড:</span>
              <strong className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-emerald-300">
                admin123
              </strong>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-emerald-100">
              <span className="text-[11px] text-slate-500">এক ক্লিকে পাসওয়ার্ড দিন:</span>
              <button
                type="button"
                onClick={() => setLoginPassword('admin123')}
                className="text-xs font-bold text-[#006a4e] hover:underline"
              >
                পাসওয়ার্ড বসান
              </button>
            </div>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                অ্যাডমিন পাসওয়ার্ড (Admin Password)
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006a4e] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00543c] rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন (Sign In)'}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-[#006a4e] hover:underline"
            >
              &larr; মূল ওয়েবসাইটে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs config
  const navTabs: { id: TabKey; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'quick-edit', label: '⚡ Quick Edit Text & Images', icon: Zap },
    { id: 'profile', label: 'Profile & Photos', icon: User },
    { id: 'calligraphy', label: 'Arabic Calligraphy', icon: Feather },
    { id: 'design', label: 'Graphic Design', icon: Palette },
    { id: 'video', label: 'Video Projects', icon: Video },
    { id: 'marketing', label: 'Meta Marketing', icon: TrendingUp },
    { id: 'links', label: 'All Links & Social', icon: LinkIcon },
    { id: 'education', label: 'Education & Credentials', icon: Award },
    { id: 'theme', label: 'Visual Customizer', icon: Sliders },
    { id: 'inquiries', label: `Inquiries (${inquiries.filter((i) => !i.read).length})`, icon: Inbox },
    { id: 'media', label: 'Media Assets', icon: FolderOpen },
    { id: 'backup', label: 'Export & Supabase', icon: Database },
    { id: 'security', label: 'Password & Security', icon: Lock },
    { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-28">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            CMS
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-white">
              CMS Dashboard &amp; Direct Editor
            </h1>
            <p className="text-xs text-slate-400">
              Logged in as Administrator · Edit any text or image directly from your browser
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Status Toasts */}
      {saveStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <Check className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{saveStatus}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-8">
          {/* TAB 0: QUICK EDIT TEXT & IMAGES */}
          {activeTab === 'quick-edit' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Direct Editing</span>
                  </div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Quick Edit Text &amp; Images
                  </h2>
                  <p className="text-xs text-slate-400">
                    Replace photos, change your name, title, bio, or projects right here. Changes save to the live database immediately.
                  </p>
                </div>
                <button
                  onClick={handleSaveAllQuickEdit}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-2 transition-all shadow-md self-start sm:self-auto shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {/* 1. Main Profile Photos */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>1. Main Profile Photo &amp; Site Logo</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploadField
                    label="Profile Photo / Portrait"
                    value={profile.avatarUrl}
                    onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
                    mediaAssets={media}
                    aspectRatio="square"
                    helpText="Shows in the Hero section, About page, and Link Hub."
                  />

                  <ImageUploadField
                    label="Site Logo / Arabic Monogram"
                    value={profile.logoUrl}
                    onChange={(url) => setProfile({ ...profile, logoUrl: url })}
                    mediaAssets={media}
                    aspectRatio="square"
                    helpText="Used for website branding and headers."
                  />
                </div>
              </div>

              {/* 2. Headline & Bio Text */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>2. Hero Headlines &amp; Introduction Text</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Full Name (English)
                    </label>
                    <input
                      type="text"
                      value={profile.name.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: { ...profile.name, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Full Name (Bengali - বাংলা)
                    </label>
                    <input
                      type="text"
                      value={profile.name.bn}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: { ...profile.name, bn: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={profile.title.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          title: { ...profile.title, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          location: { ...profile.location, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={profile.tagline.en}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        tagline: { ...profile.tagline, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    About Me Bio Summary
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio.en}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bio: { ...profile.bio, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white resize-none"
                  />
                </div>
              </div>

              {/* 3. Featured Artworks Quick Image Swapper */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Feather className="w-4 h-4 text-amber-400" />
                  <span>3. Featured Calligraphy Artworks (Edit Text &amp; Image)</span>
                </h3>

                <div className="space-y-4">
                  {calligraphy.slice(0, 2).map((art, idx) => (
                    <div key={art.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Artwork Title</label>
                          <input
                            type="text"
                            value={art.title.en}
                            onChange={(e) => {
                              const updated = [...calligraphy];
                              updated[idx].title.en = e.target.value;
                              setCalligraphy(updated);
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Arabic Text (RTL)</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={art.arabicText}
                            onChange={(e) => {
                              const updated = [...calligraphy];
                              updated[idx].arabicText = e.target.value;
                              setCalligraphy(updated);
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-amber-300 font-serif"
                          />
                        </div>
                      </div>

                      <ImageUploadField
                        label={`Artwork #${idx + 1} Image`}
                        value={art.thumbnail}
                        onChange={(url) => {
                          const updated = [...calligraphy];
                          updated[idx].thumbnail = url;
                          setCalligraphy(updated);
                        }}
                        mediaAssets={media}
                        aspectRatio="video"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button Footer */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveAllQuickEdit}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes to Live Website</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PROFILE & PHOTOS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Edit Profile Details &amp; Contact Info
                  </h2>
                  <p className="text-xs text-slate-400">
                    All text is stored with multilingual support and editable anytime.
                  </p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <ImageUploadField
                    label="Profile Avatar Photo"
                    value={profile.avatarUrl}
                    onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
                    mediaAssets={media}
                    aspectRatio="square"
                  />

                  <ImageUploadField
                    label="Site Logo / Monogram Image"
                    value={profile.logoUrl}
                    onChange={(url) => setProfile({ ...profile, logoUrl: url })}
                    mediaAssets={media}
                    aspectRatio="square"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name (English)
                    </label>
                    <input
                      type="text"
                      value={profile.name.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: { ...profile.name, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name (Bengali - বাংলা)
                    </label>
                    <input
                      type="text"
                      value={profile.name.bn}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: { ...profile.name, bn: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Professional Title (English)
                    </label>
                    <input
                      type="text"
                      value={profile.title.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          title: { ...profile.title, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Professional Title (Bengali)
                    </label>
                    <input
                      type="text"
                      value={profile.title.bn}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          title: { ...profile.title, bn: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Bio Summary (English)
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio.en}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bio: { ...profile.bio, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Current Location
                    </label>
                    <input
                      type="text"
                      value={profile.location.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          location: { ...profile.location, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Origin Location
                    </label>
                    <input
                      type="text"
                      value={profile.originLocation.en}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          originLocation: { ...profile.originLocation, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={profile.whatsapp}
                      onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Availability Status
                    </label>
                    <select
                      value={profile.availability}
                      onChange={(e) =>
                        setProfile({ ...profile, availability: e.target.value as any })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="available">Available for Commissions &amp; Projects</option>
                      <option value="selective">Selective / High Value Only</option>
                      <option value="busy">Busy / Books Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARABIC CALLIGRAPHY */}
          {activeTab === 'calligraphy' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Arabic Calligraphy Artworks Gallery
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload photos, edit Arabic texts, select script styles, and update pricing/status.
                  </p>
                </div>
                <button
                  onClick={handleAddCalligraphy}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Artwork</span>
                </button>
              </div>

              <div className="space-y-6">
                {calligraphy.map((art, idx) => (
                  <div
                    key={art.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        {art.scriptStyle} Script
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            try {
                              await api.updateCalligraphy(art.id, art);
                              showSuccess('Artwork saved to live database');
                            } catch (e: any) {
                              showError(e.message);
                            }
                          }}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleDeleteCalligraphy(art.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Title (English)</label>
                        <input
                          type="text"
                          value={art.title.en}
                          onChange={(e) => {
                            const updated = [...calligraphy];
                            updated[idx].title.en = e.target.value;
                            setCalligraphy(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Script Style</label>
                        <select
                          value={art.scriptStyle}
                          onChange={(e) => {
                            const updated = [...calligraphy];
                            updated[idx].scriptStyle = e.target.value as any;
                            setCalligraphy(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        >
                          <option value="Thuluth">Thuluth</option>
                          <option value="Diwani">Diwani</option>
                          <option value="Naskh">Naskh</option>
                          <option value="Kufic">Kufic</option>
                          <option value="Ruq'ah">Ruq'ah</option>
                          <option value="Modern">Modern</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Arabic Calligraphy Text (RTL)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={art.arabicText}
                        onChange={(e) => {
                          const updated = [...calligraphy];
                          updated[idx].arabicText = e.target.value;
                          setCalligraphy(updated);
                        }}
                        className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-serif"
                      />
                    </div>

                    {/* Image Uploader */}
                    <ImageUploadField
                      label="Artwork Photo"
                      value={art.thumbnail}
                      onChange={(url) => {
                        const updated = [...calligraphy];
                        updated[idx].thumbnail = url;
                        setCalligraphy(updated);
                      }}
                      mediaAssets={media}
                      aspectRatio="video"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GRAPHIC DESIGN */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Graphic Design Projects
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or feature branding packages, posters, and social kits.
                  </p>
                </div>
                <button
                  onClick={handleAddDesignProject}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6">
                {designProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400">{p.category}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            try {
                              await api.updateDesignProject(p.id, p);
                              showSuccess('Design project saved');
                            } catch (e: any) {
                              showError(e.message);
                            }
                          }}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleDeleteDesign(p.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={p.title.en}
                          onChange={(e) => {
                            const updated = [...designProjects];
                            updated[idx].title.en = e.target.value;
                            setDesignProjects(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Client</label>
                        <input
                          type="text"
                          value={p.client || ''}
                          onChange={(e) => {
                            const updated = [...designProjects];
                            updated[idx].client = e.target.value;
                            setDesignProjects(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    {/* Image Uploader */}
                    <ImageUploadField
                      label="Project Thumbnail Image"
                      value={p.thumbnail}
                      onChange={(url) => {
                        const updated = [...designProjects];
                        updated[idx].thumbnail = url;
                        setDesignProjects(updated);
                      }}
                      mediaAssets={media}
                      aspectRatio="video"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VIDEO PROJECTS */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Video Editing Projects
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage video URLs, YouTube/Vimeo embeds, durations, and cover thumbnails.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {videoProjects.map((v, idx) => (
                  <div key={v.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-400">{v.category}</span>
                      <button
                        onClick={async () => {
                          try {
                            await api.updateVideoProject(v.id, v);
                            showSuccess('Video project saved');
                          } catch (e: any) {
                            showError(e.message);
                          }
                        }}
                        className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded transition-colors"
                      >
                        Save
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Video Title</label>
                        <input
                          type="text"
                          value={v.title.en}
                          onChange={(e) => {
                            const updated = [...videoProjects];
                            updated[idx].title.en = e.target.value;
                            setVideoProjects(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Video URL (YouTube/Vimeo)</label>
                        <input
                          type="text"
                          value={v.videoUrl}
                          onChange={(e) => {
                            const updated = [...videoProjects];
                            updated[idx].videoUrl = e.target.value;
                            setVideoProjects(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <ImageUploadField
                      label="Video Cover Thumbnail"
                      value={v.thumbnail}
                      onChange={(url) => {
                        const updated = [...videoProjects];
                        updated[idx].thumbnail = url;
                        setVideoProjects(updated);
                      }}
                      mediaAssets={media}
                      aspectRatio="video"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ALL LINKS MANAGER */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    All Links &amp; Social Channels
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add unlimited custom links with display order and visibility controls.
                  </p>
                </div>
                <button
                  onClick={handleAddLink}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Link</span>
                </button>
              </div>

              <div className="space-y-3">
                {links.map((link, idx) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{link.title}</span>
                        <span className="text-[11px] text-slate-400 uppercase">({link.platform})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            const updated = [...links];
                            updated[idx].isVisible = !updated[idx].isVisible;
                            setLinks(updated);
                            await api.updateLink(link.id, { isVisible: updated[idx].isVisible });
                            showSuccess('Visibility toggled');
                          }}
                          className={`p-1.5 rounded text-xs transition-colors ${
                            link.isVisible
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : 'text-slate-500 bg-slate-800'
                          }`}
                          title="Toggle Public Visibility"
                        >
                          {link.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await api.updateLink(link.id, link);
                              showSuccess('Link saved');
                            } catch (e: any) {
                              showError(e.message);
                            }
                          }}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => {
                            const updated = [...links];
                            updated[idx].title = e.target.value;
                            setLinks(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">URL Target</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => {
                            const updated = [...links];
                            updated[idx].url = e.target.value;
                            setLinks(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION & TRAINING */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Education &amp; Training Records
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or remove academic degrees, Islamic studies, and As-Sunnah training.
                  </p>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Record</span>
                </button>
              </div>

              <div className="space-y-4">
                {education.map((rec, idx) => (
                  <div
                    key={rec.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        {rec.type === 'education' ? 'Academic Degree' : 'Skill Training'}
                      </span>
                      <button
                        onClick={() => handleDeleteEducation(rec.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Degree Title</label>
                        <input
                          type="text"
                          value={rec.degree.en}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].degree.en = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={rec.institution.en}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].institution.en = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Year / Period</label>
                        <input
                          type="text"
                          value={rec.yearOrPeriod}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].yearOrPeriod = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Result / Honors</label>
                        <input
                          type="text"
                          value={rec.result.en}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].result.en = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={async () => {
                            try {
                              await api.updateEducation(rec.id, rec);
                              showSuccess('Record saved to database');
                            } catch (e: any) {
                              showError(e.message);
                            }
                          }}
                          className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors"
                        >
                          Save Record
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: VISUAL WEBSITE CUSTOMIZER */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Visual Website Customizer
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time palette, card styles, and homepage section order.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTheme}
                    className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    onClick={() => updateTheme(theme).then(() => showSuccess('Theme settings saved permanently!'))}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Theme</span>
                  </button>
                </div>
              </div>

              {/* Color Customization */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200">Color Palette Settings</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Primary Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300">{theme.primaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300">{theme.backgroundColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Surface Card Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.surfaceColor}
                        onChange={(e) => updateTheme({ surfaceColor: e.target.value })}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300">{theme.surfaceColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Border Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.borderColor}
                        onChange={(e) => updateTheme({ borderColor: e.target.value })}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300">{theme.borderColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Homepage Section Visibility */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">
                  Homepage Section Visibility Controls
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(theme.homepageSections).map(([secKey, isVisible]) => (
                    <label
                      key={secKey}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
                    >
                      <span className="font-medium text-slate-300 capitalize">
                        {secKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) =>
                          updateTheme({
                            homepageSections: {
                              ...theme.homepageSections,
                              [secKey]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 h-4 w-4"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Client Inquiries &amp; Quotations ({inquiries.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Submissions through the public contact form (protected against bot spam).
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">No inquiries received yet.</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-5 rounded-2xl border transition-colors space-y-3 ${
                        inq.read
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-amber-500/5 border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inq.name}</span>
                          <span className="text-slate-400">({inq.email})</span>
                          {inq.whatsapp && <span className="text-emerald-400 font-mono">{inq.whatsapp}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={async (e) => {
                              try {
                                await api.updateInquiry(inq.id, { status: e.target.value as any, read: true });
                                const updated = inquiries.map((i) =>
                                  i.id === inq.id ? { ...i, status: e.target.value as any, read: true } : i
                                );
                                setInquiries(updated);
                                showSuccess('Inquiry updated');
                              } catch (err: any) {
                                showError(err.message);
                              }
                            }}
                            className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
                          >
                            <option value="new">New</option>
                            <option value="in_review">In Review</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                          </select>
                          <button
                            onClick={async () => {
                              if (!window.confirm('Delete this inquiry?')) return;
                              await api.deleteInquiry(inq.id);
                              setInquiries(inquiries.filter((i) => i.id !== inq.id));
                              showSuccess('Inquiry deleted');
                            }}
                            className="p-1 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Category:</span> {inq.serviceCategory}
                        {inq.budget && <span className="ml-3 font-semibold text-amber-400">Budget: {inq.budget}</span>}
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed p-3 bg-slate-900 rounded-lg">
                        {inq.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: MEDIA ASSETS & STORAGE */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Media Storage &amp; Asset Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload new photos, artwork scans, and logos directly to the persistent server storage.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-xl bg-slate-950 border border-slate-800 overflow-hidden space-y-2 p-2"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-black">
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] space-y-1">
                      <span className="font-medium text-slate-200 block truncate">{item.name}</span>
                      <div className="flex items-center justify-between text-slate-500">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showSuccess('Asset URL copied');
                          }}
                          className="hover:text-amber-400 flex items-center gap-0.5 text-[10px]"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (!window.confirm('Delete media asset?')) return;
                            await api.deleteMedia(item.id);
                            setMedia(media.filter((m) => m.id !== item.id));
                            showSuccess('Asset deleted');
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: BACKUP, EXPORT & SUPABASE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold font-display text-white">
                  Data Portability, Backups &amp; Supabase Integration
                </h2>
                <p className="text-xs text-slate-400">
                  Full ownership of your content. Export everything in JSON, restore anytime, or deploy directly to Supabase PostgreSQL.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download Complete JSON Backup</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Exports all profiles, calligraphy pieces, videos, design projects, marketing cases, inquiries, theme settings, and links into a single portable JSON file.
                  </p>
                  <button
                    onClick={handleExportJson}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    Export JSON Database
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Restore Database From Backup</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Upload a previously downloaded JSON backup to restore all tables and content immediately.
                  </p>
                  <label className="inline-block px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
                    <span>Select Backup File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Supabase Schema Viewer */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Supabase PostgreSQL Migration Script (RLS Included)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Pre-generated production SQL migration with Row Level Security policies ready for your own Supabase project.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sqlSchema);
                      showSuccess('SQL schema copied to clipboard');
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-60 overflow-y-auto">
                  {sqlSchema || '-- Loading Supabase migration schema...'}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 11: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold font-display text-white">
                  Security &amp; Master Password
                </h2>
                <p className="text-xs text-slate-400">
                  Update your administrator password to protect access to the CMS and database.
                </p>
              </div>

              {passwordStatus && (
                <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                  {passwordStatus}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    New Master Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}

          {/* TAB 12: SYSTEM OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display text-white">
                Dashboard Overview &amp; Content Summary
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Calligraphy Works</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {calligraphy.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Graphic Design</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {designProjects.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Video Projects</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {videoProjects.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Unread Inquiries</span>
                  <span className="text-2xl font-bold font-display text-amber-400 mt-1 block">
                    {inquiries.filter((i) => !i.read).length}
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200">
                  Verified Academic &amp; Training Records
                </h3>
                <div className="space-y-2 text-xs text-slate-400">
                  <p>
                    <strong className="text-slate-300">Dawra-e-Hadith:</strong> Jamia Arabia Ashraful Ulum Kushtia — Result: Jayyid Jiddan.
                  </p>
                  <p>
                    <strong className="text-slate-300">Dakhil Examination:</strong> 2026 — GPA 4.63.
                  </p>
                  <p>
                    <strong className="text-slate-300">Alim Studies:</strong> Currently In Progress.
                  </p>
                  <p>
                    <strong className="text-slate-300">As-Sunnah Institute:</strong> ~3.5 Months Intensive Professional Training in Graphic Design, Video Editing &amp; Meta Marketing.
                  </p>
                  <p>
                    <strong className="text-slate-300">Calligraphy Experience:</strong> ~4 Years Continuous Practice in Thuluth, Diwani, Naskh &amp; 24K Gold Illumination.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
