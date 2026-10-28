export type Language = 'bn' | 'en' | 'ar' | 'ur';

export interface LocalizedString {
  bn: string;
  en: string;
  ar: string;
  ur: string;
}

export interface Profile {
  id: string;
  name: LocalizedString;
  title: LocalizedString;
  tagline: LocalizedString;
  bio: LocalizedString;
  location: LocalizedString;
  originLocation: LocalizedString;
  email: string;
  phone: string;
  whatsapp: string;
  avatarUrl: string;
  logoUrl: string;
  cvUrl?: string;
  portfolioPdfUrl?: string;
  availability: 'available' | 'busy' | 'selective';
  calligraphyYears: number;
  instituteTrainingMonths: number;
  trainingInstitute: LocalizedString;
  dawraResult: LocalizedString;
  dakhilGpa: string;
  dakhilYear: string;
  alimStatus: LocalizedString;
}

export interface EducationRecord {
  id: string;
  institution: LocalizedString;
  degree: LocalizedString;
  yearOrPeriod: string;
  result: LocalizedString;
  details: LocalizedString;
  type: 'education' | 'training';
  order: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'design' | 'video' | 'marketing' | 'calligraphy' | 'tools';
  proficiency: number; // 0 to 100
  badge?: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  slug: string;
  category: 'graphic_design' | 'video_editing' | 'meta_marketing' | 'arabic_calligraphy';
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  features: LocalizedString[];
  startingPrice?: string;
  order: number;
  status: 'published' | 'draft';
}

export interface DesignProject {
  id: string;
  slug: string;
  title: LocalizedString;
  category: 'Logo & Branding' | 'Social Media' | 'Posters & Print' | 'Thumbnails' | 'Custom';
  description: LocalizedString;
  thumbnail: string;
  images: string[];
  tags: string[];
  client?: string;
  completionDate?: string;
  externalUrl?: string;
  featured: boolean;
  order: number;
  status: 'published' | 'draft';
}

export interface VideoProject {
  id: string;
  slug: string;
  title: LocalizedString;
  category: 'Commercial' | 'Reels & Shorts' | 'Documentary' | 'Motion Graphics' | 'YouTube';
  description: LocalizedString;
  videoUrl: string;
  embedType: 'youtube' | 'vimeo' | 'direct';
  thumbnail: string;
  duration?: string;
  softwareUsed?: string[];
  featured: boolean;
  order: number;
  status: 'published' | 'draft';
}

export interface MarketingCase {
  id: string;
  slug: string;
  title: LocalizedString;
  client: string;
  objective: LocalizedString;
  strategy: LocalizedString;
  campaignPeriod: string;
  metrics: {
    metric: string;
    label: LocalizedString;
    trend?: string;
  }[];
  screenshots: string[];
  tags: string[];
  order: number;
  status: 'published' | 'draft';
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  avatarUrl?: string;
  quote: LocalizedString;
  projectType: string;
  rating: number; // 1 to 5
  verified: boolean;
  order: number;
  status: 'published' | 'hidden';
}

export interface CalligraphyArtwork {
  id: string;
  slug: string;
  title: LocalizedString;
  arabicText: string;
  translationMeaning?: LocalizedString;
  scriptStyle: 'Thuluth' | 'Diwani' | 'Naskh' | 'Kufic' | 'Ruq\'ah' | 'Nastaliq' | 'Modern';
  year: string;
  medium: LocalizedString;
  dimensions?: string;
  thumbnail: string;
  images: string[];
  description: LocalizedString;
  commissionAvailable: boolean;
  forSale: boolean;
  featured: boolean;
  order: number;
  status: 'published' | 'draft';
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  platform: 'behance' | 'youtube' | 'facebook' | 'instagram' | 'linkedin' | 'bdjobs' | 'whatsapp' | 'email' | 'website' | 'other';
  icon: string;
  description?: LocalizedString;
  showOnHome: boolean;
  showOnFooter: boolean;
  showOnAbout: boolean;
  showOnLinksPage: boolean;
  displayOrder: number;
  isVisible: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  borderColor: string;
  cardRadius: 'rounded-none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  cardStyle: 'bordered' | 'glass' | 'subtle';
  fontFamily: 'outfit' | 'jakarta' | 'cinzel' | 'amiri';
  layoutPreset: 'classic_editorial' | 'modern_studio' | 'minimalist_luxury';
  homepageSections: {
    hero: boolean;
    quickNav: boolean;
    aboutSummary: boolean;
    featuredCalligraphy: boolean;
    featuredDesign: boolean;
    featuredVideo: boolean;
    metaServices: boolean;
    testimonials: boolean;
    contactCta: boolean;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  serviceCategory: string;
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
  status: 'new' | 'in_review' | 'replied' | 'archived';
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  category: 'general' | 'calligraphy' | 'design' | 'marketing';
  order: number;
  status: 'published' | 'draft';
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  altText?: string;
}

export interface DatabaseState {
  profile: Profile;
  education: EducationRecord[];
  skills: SkillItem[];
  services: ServiceItem[];
  designProjects: DesignProject[];
  videoProjects: VideoProject[];
  marketingCases: MarketingCase[];
  testimonials: Testimonial[];
  calligraphyArtworks: CalligraphyArtwork[];
  socialLinks: SocialLink[];
  themeSettings: ThemeSettings;
  inquiries: Inquiry[];
  faqs: FaqItem[];
  mediaAssets: MediaAsset[];
  adminPasswordHash?: string;
}
