-- ==============================================================================
-- SUPABASE POSTGRESQL PRODUCTION MIGRATION & RLS POLICIES
-- Portfolio & CMS Architecture for Muhammad Abdullah
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profile Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT 'profile-main',
    name JSONB NOT NULL,
    title JSONB NOT NULL,
    tagline JSONB NOT NULL,
    bio JSONB NOT NULL,
    location JSONB NOT NULL,
    origin_location JSONB NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    avatar_url TEXT,
    logo_url TEXT,
    cv_url TEXT,
    portfolio_pdf_url TEXT,
    availability TEXT DEFAULT 'available',
    calligraphy_years INT DEFAULT 4,
    training_months NUMERIC DEFAULT 3.5,
    training_institute JSONB NOT NULL,
    dawra_result JSONB NOT NULL,
    dakhil_gpa TEXT DEFAULT '4.63',
    dakhil_year TEXT DEFAULT '2026',
    alim_status JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Education & Credentials Table
CREATE TABLE IF NOT EXISTS public.education_records (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    institution JSONB NOT NULL,
    degree JSONB NOT NULL,
    year_or_period TEXT NOT NULL,
    result JSONB NOT NULL,
    details JSONB NOT NULL,
    type TEXT CHECK (type IN ('education', 'training')) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('design', 'video', 'marketing', 'calligraphy', 'tools')) NOT NULL,
    proficiency INT CHECK (proficiency BETWEEN 0 AND 100) DEFAULT 80,
    badge TEXT,
    display_order INT DEFAULT 0
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    title JSONB NOT NULL,
    short_desc JSONB NOT NULL,
    full_desc JSONB NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    starting_price TEXT,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft'))
);

-- 6. Graphic Design Projects Table
CREATE TABLE IF NOT EXISTS public.design_projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL,
    category TEXT NOT NULL,
    description JSONB NOT NULL,
    thumbnail TEXT NOT NULL,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    client TEXT,
    completion_date TEXT,
    external_url TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Video Projects Table
CREATE TABLE IF NOT EXISTS public.video_projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL,
    category TEXT NOT NULL,
    description JSONB NOT NULL,
    video_url TEXT NOT NULL,
    embed_type TEXT DEFAULT 'youtube' CHECK (embed_type IN ('youtube', 'vimeo', 'direct')),
    thumbnail TEXT NOT NULL,
    duration TEXT,
    software_used JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Meta Marketing Case Studies Table
CREATE TABLE IF NOT EXISTS public.marketing_cases (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL,
    client TEXT NOT NULL,
    objective JSONB NOT NULL,
    strategy JSONB NOT NULL,
    campaign_period TEXT NOT NULL,
    metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    client_company TEXT,
    avatar_url TEXT,
    quote JSONB NOT NULL,
    project_type TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    verified BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Arabic Calligraphy Artworks Table
CREATE TABLE IF NOT EXISTS public.calligraphy_artworks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL,
    arabic_text TEXT NOT NULL,
    translation_meaning JSONB,
    script_style TEXT NOT NULL,
    year TEXT NOT NULL,
    medium JSONB NOT NULL,
    dimensions TEXT,
    thumbnail TEXT NOT NULL,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    description JSONB NOT NULL,
    commission_available BOOLEAN DEFAULT true,
    for_sale BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Social & Custom Links Table (Unlimited by Design)
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    platform TEXT NOT NULL,
    icon TEXT NOT NULL,
    description JSONB,
    show_on_home BOOLEAN DEFAULT true,
    show_on_footer BOOLEAN DEFAULT true,
    show_on_about BOOLEAN DEFAULT true,
    show_on_links_page BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Theme Customization Table
CREATE TABLE IF NOT EXISTS public.theme_settings (
    id TEXT PRIMARY KEY DEFAULT 'current-theme',
    primary_color TEXT DEFAULT '#f59e0b',
    secondary_color TEXT DEFAULT '#d97706',
    accent_color TEXT DEFAULT '#fbbf24',
    background_color TEXT DEFAULT '#080d1a',
    surface_color TEXT DEFAULT '#0f172a',
    text_color TEXT DEFAULT '#f8fafc',
    border_color TEXT DEFAULT '#1e293b',
    card_radius TEXT DEFAULT 'rounded-xl',
    card_style TEXT DEFAULT 'bordered',
    font_family TEXT DEFAULT 'outfit',
    layout_preset TEXT DEFAULT 'classic_editorial',
    homepage_sections JSONB NOT NULL DEFAULT '{"hero": true, "quickNav": true, "aboutSummary": true, "featuredCalligraphy": true, "featuredDesign": true, "featuredVideo": true, "metaServices": true, "testimonials": true, "contactCta": true}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Client Inquiries / Contact Form Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    service_category TEXT DEFAULT 'general',
    budget TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    read BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'replied', 'archived')),
    notes TEXT
);

-- 14. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    question JSONB NOT NULL,
    answer JSONB NOT NULL,
    category TEXT DEFAULT 'general',
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'published'
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enforce: Public may ONLY read published records; only Admin can mutate data.
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calligraphy_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public education records viewable" ON public.education_records FOR SELECT USING (true);
CREATE POLICY "Public skills viewable" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public services viewable" ON public.services FOR SELECT USING (status = 'published');
CREATE POLICY "Public design projects viewable" ON public.design_projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public video projects viewable" ON public.video_projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public marketing cases viewable" ON public.marketing_cases FOR SELECT USING (status = 'published');
CREATE POLICY "Public testimonials viewable" ON public.testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Public calligraphy artworks viewable" ON public.calligraphy_artworks FOR SELECT USING (status = 'published');
CREATE POLICY "Public social links viewable" ON public.social_links FOR SELECT USING (is_visible = true);
CREATE POLICY "Public theme settings viewable" ON public.theme_settings FOR SELECT USING (true);
CREATE POLICY "Public faqs viewable" ON public.faqs FOR SELECT USING (status = 'published');

-- Public INSERT for Inquiries (Spam controlled via backend/captcha)
CREATE POLICY "Public can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (full CRUD)
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on education" ON public.education_records FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on design_projects" ON public.design_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on video_projects" ON public.video_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on marketing_cases" ON public.marketing_cases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on calligraphy" ON public.calligraphy_artworks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on theme_settings" ON public.theme_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
