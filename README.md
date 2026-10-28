# Creative Portfolio & Multilingual CMS

A production-grade, database-backed personal portfolio and content management system for **Muhammad Abdullah** — Graphic Designer, Video Editor, Meta Marketing Specialist, and Arabic Calligrapher (Dhaka / Kushtia, Bangladesh).

---

## 🌟 Key Features & Architectures

1. **7 Complete Public Pages**:
   - **Page 1 — Main Homepage**: Split-hero section, 4-discipline cards, quantitative metric strip, featured galleries, testimonials, and contact CTAs.
   - **Page 2 — Graphic Design Portfolio**: Filterable by category (Branding, Social Media, Posters, Thumbnails), search bar, sorting, tags, and high-res lightbox.
   - **Page 3 — Video Editing Portfolio**: Embeds for YouTube/Vimeo/Direct, duration markers, software badges (Premiere Pro, DaVinci Resolve, Audition), and fullscreen player.
   - **Page 4 — Meta Marketing Portfolio**: Real campaign strategies, verified ROAS & CPA metrics, analytical snapshots, and client reviews.
   - **Page 5 — Arabic Calligraphy Gallery**: Image-focused gallery celebrating ~4 years of Arabic calligraphy practice (Thuluth, Diwani, Naskh, Kufic, Ruq'ah) with RTL typography, gold leaf details, and commission quotes.
   - **Page 6 — About Me & Credentials**: Structured timeline distinguishing Islamic academic credentials (Jamia Arabia Ashraful Ulum Kushtia: Dawra-e-Hadith Jayyid Jiddan; Dakhil 2026 GPA 4.63; Alim studies) from As-Sunnah Skill Development Institute training (~3.5 months), plus printable CV modal.
   - **Page 7 — All Links & Connect**: Unlimited social and custom links (Behance, YouTube, Facebook, Instagram, LinkedIn, BDJobs, WhatsApp, Email) with one-click copy and vector QR code modal.

2. **Complete Admin CMS (/admin)**:
   - Secure password-authenticated dashboard (default password: `admin123`, customizable in the Security tab).
   - Real-time CRUD for all 7 sections, projects, videos, case studies, calligraphy, and links.
   - **Visual Website Customizer**: Live palette adjustments, background colors, surface cards, border styling, and homepage section toggles.
   - **Client Inquiries Manager**: Form submissions with bot honeypot protection, status management, and notes.
   - **Media Assets Manager**: Uploads saved to disk/server storage with instant URL copy.
   - **Backup & Export Tools**: One-click full JSON database export, instant JSON restore, and Supabase SQL migration exporter.

3. **Multilingual Architecture (4 Languages)**:
   - Bengali (`bn` — Default)
   - English (`en`)
   - Arabic (`ar` — Full RTL layout)
   - Urdu (`ur` — Full RTL layout)

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express, TSX
- **Persistence**: Server-backed JSON store in `data/database.json` + Full Supabase PostgreSQL schema (`supabase/migrations/20261028000000_init_schema.sql`)
- **Dev Server**: Vite with middleware mode mounted in Express on Port 3000

---

## 🚀 Local Development Setup

1. **Clone or Export repository**:
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🗄️ Database Backup & Restore Workflow

### Exporting Database Records:
1. Log in to `/admin` using your master password.
2. Go to the **Export & Supabase** tab.
3. Click **Export JSON Database**. A full timestamped backup file will be downloaded.

### Restoring Database:
1. In the same tab, under **Restore Database From Backup**, click **Select Backup File**.
2. Select your JSON backup file. The server will atomically update all tables and reload the CMS.

---

## ☁️ Free-First Deployment & Supabase Migration

### Free Tier Strategy ($0 / month):
- **Frontend & Server**: Deploy free on Render, Railway, or Koyeb (using Node.js `npm run start`).
- **Database (Optional Cloud PostgreSQL)**:
  1. Create a free project at [Supabase.com](https://supabase.com).
  2. Open the Supabase SQL Editor.
  3. Copy and run the script from `/supabase/migrations/20261028000000_init_schema.sql` (or copy it directly from the Admin Dashboard).
  4. All tables and Row Level Security (RLS) policies will be provisioned automatically.
- **Custom Domain**:
  - Connect your custom domain (e.g., `abdullahcalligraphy.com`) via Cloudflare DNS (Free plan) with free SSL and edge caching.

---

## 🔐 Admin Authentication Notice
- Default Master Password: `admin123`
- To change: Log in to `/admin` &rarr; Go to **Password & Security** &rarr; Enter your new password &rarr; Click **Change Password**.
