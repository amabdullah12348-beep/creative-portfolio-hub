import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
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
} from './types/index.ts';
import { api } from './services/api.ts';
import { initialData } from './data/initialData.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { LightboxModal, LightboxItem } from './components/LightboxModal.tsx';
import { InquiryModal } from './components/InquiryModal.tsx';
import { CvDownloadModal } from './components/CvDownloadModal.tsx';
import { QrCodeModal } from './components/QrCodeModal.tsx';

// Public Pages
import { HomePage } from './pages/HomePage.tsx';
import { GraphicDesignPage } from './pages/GraphicDesignPage.tsx';
import { VideoEditingPage } from './pages/VideoEditingPage.tsx';
import { MetaMarketingPage } from './pages/MetaMarketingPage.tsx';
import { ArabicCalligraphyPage } from './pages/ArabicCalligraphyPage.tsx';
import { AboutMePage } from './pages/AboutMePage.tsx';
import { AllLinksPage } from './pages/AllLinksPage.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';

function MainAppContent() {
  const { lang, ui } = useLanguage();
  const { theme } = useTheme();
  const { isAdmin, logout } = useAuth();

  // Navigation State with Pathname + Hash router support
  const getPageFromLocation = (): string => {
    // 1. Check pathname (e.g. /admin, /graphic-design, /links)
    const pathname = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
    if (pathname === 'admin') return 'admin';
    if (['graphic-design', 'video-editing', 'meta-marketing', 'arabic-calligraphy', 'about', 'links'].includes(pathname)) {
      return pathname;
    }

    // 2. Check hash (e.g. #/admin, #admin)
    const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
    if (['graphic-design', 'video-editing', 'meta-marketing', 'arabic-calligraphy', 'about', 'links', 'admin'].includes(hash)) {
      return hash;
    }

    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getPageFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPage(getPageFromLocation());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (page: string) => {
    const targetPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', targetPath);
    // Also sync hash for universal compatibility
    window.location.hash = page === 'home' ? '' : `/${page}`;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If navigating from admin back to public, refresh data
    if (page !== 'admin') {
      refreshData();
    }
  };

  // Live Data States
  const [profile, setProfile] = useState<Profile>(initialData.profile);
  const [education, setEducation] = useState<EducationRecord[]>(initialData.education);
  const [skills, setSkills] = useState<SkillItem[]>(initialData.skills);
  const [services, setServices] = useState<ServiceItem[]>(initialData.services);
  const [designProjects, setDesignProjects] = useState<DesignProject[]>(initialData.designProjects);
  const [videoProjects, setVideoProjects] = useState<VideoProject[]>(initialData.videoProjects);
  const [marketingCases, setMarketingCases] = useState<MarketingCase[]>(initialData.marketingCases);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData.testimonials);
  const [calligraphy, setCalligraphy] = useState<CalligraphyArtwork[]>(initialData.calligraphyArtworks);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialData.socialLinks);

  // Modals state
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<string>('arabic_calligraphy');
  const [inquiryDefaultMsg, setInquiryDefaultMsg] = useState<string>('');
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrModalUrl, setQrModalUrl] = useState<string>('');
  const [qrModalTitle, setQrModalTitle] = useState<string>('');

  const refreshData = () => {
    Promise.all([
      api.getProfile().catch(() => initialData.profile),
      api.getEducation().catch(() => initialData.education),
      api.getSkills().catch(() => initialData.skills),
      api.getServices().catch(() => initialData.services),
      api.getDesignProjects().catch(() => initialData.designProjects),
      api.getVideoProjects().catch(() => initialData.videoProjects),
      api.getMarketingCases().catch(() => initialData.marketingCases),
      api.getTestimonials().catch(() => initialData.testimonials),
      api.getCalligraphy().catch(() => initialData.calligraphyArtworks),
      api.getLinks().catch(() => initialData.socialLinks),
    ]).then(([p, edu, sk, srv, des, vid, mkt, test, cal, lks]) => {
      if (p) setProfile(p);
      if (edu) setEducation(edu);
      if (sk) setSkills(sk);
      if (srv) setServices(srv);
      if (des) setDesignProjects(des);
      if (vid) setVideoProjects(vid);
      if (mkt) setMarketingCases(mkt);
      if (test) setTestimonials(test);
      if (cal) setCalligraphy(cal);
      if (lks) setSocialLinks(lks);
    });
  };

  // Fetch initial data from server
  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenInquiry = (category?: string, message?: string) => {
    if (category) setInquiryCategory(category);
    if (message) setInquiryDefaultMsg(message);
    setInquiryOpen(true);
  };

  const handleOpenQr = (url: string, title?: string) => {
    setQrModalUrl(url);
    if (title) setQrModalTitle(title);
    setQrModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 transition-colors">
      {/* Admin Quick Control Bar when logged in */}
      {isAdmin && currentPage !== 'admin' && (
        <div className="bg-[#006a4e] text-white px-4 py-2.5 flex items-center justify-between text-xs z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold">অ্যাডমিন মোড সক্রিয় (CMS Admin Active)</span>
            <span className="hidden sm:inline text-emerald-100">· ব্রাউজার থেকে সরাসরি ছবি, টেক্সট ও প্রজেক্ট পরিবর্তন করুন</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('admin')}
              className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 transition-colors shadow-xs"
            >
              CMS এডিটর খুলুন (/admin)
            </button>
            <button
              onClick={logout}
              className="px-3 py-1 bg-[#063828] hover:bg-[#04251a] text-white font-medium rounded-lg transition-colors border border-emerald-600/40"
            >
              লগআউট
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            profile={profile}
            calligraphyArtworks={calligraphy}
            designProjects={designProjects}
            videoProjects={videoProjects}
            marketingCases={marketingCases}
            testimonials={testimonials}
            socialLinks={socialLinks}
            theme={theme}
            onNavigate={navigateTo}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'graphic-design' && (
          <GraphicDesignPage
            projects={designProjects}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'video-editing' && (
          <VideoEditingPage
            projects={videoProjects}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'meta-marketing' && (
          <MetaMarketingPage
            marketingCases={marketingCases}
            testimonials={testimonials}
            services={services}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'arabic-calligraphy' && (
          <ArabicCalligraphyPage
            artworks={calligraphy}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'about' && (
          <AboutMePage
            profile={profile}
            education={education}
            skills={skills}
            services={services}
            onOpenCvModal={() => setCvModalOpen(true)}
            onOpenInquiry={handleOpenInquiry}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'links' && (
          <AllLinksPage
            links={socialLinks}
            profile={profile}
            onOpenQrModal={handleOpenQr}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            initialProfile={profile}
            onNavigateHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={navigateTo} socialLinks={socialLinks} />
      )}

      {/* Interactive Global Modals */}
      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onCommission={(title) => {
          handleOpenInquiry('arabic_calligraphy', `Inquiry regarding artwork: ${title}`);
        }}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => {
          setInquiryOpen(false);
          setInquiryDefaultMsg('');
        }}
        defaultCategory={inquiryCategory}
        defaultMessage={inquiryDefaultMsg}
      />

      <CvDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        profile={profile}
        education={education}
        skills={skills}
      />

      <QrCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        url={qrModalUrl}
        title={qrModalTitle}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <MainAppContent />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
