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

  // Navigation State with Hash router support
  const getPageFromHash = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['graphic-design', 'video-editing', 'meta-marketing', 'arabic-calligraphy', 'about', 'links', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page === 'home' ? '' : `/${page}`;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Fetch initial data from server
  useEffect(() => {
    let mounted = true;
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
      if (mounted) {
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
      }
    });

    return () => {
      mounted = false;
    };
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
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 transition-colors">
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
