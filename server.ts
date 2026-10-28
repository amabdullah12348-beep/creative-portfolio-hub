import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initialData } from './src/data/initialData.ts';
import { DatabaseState, Inquiry, ThemeSettings } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure data and upload directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Read or initialize database
function getDb(): DatabaseState {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading database, falling back to initial data:', err);
    return initialData;
  }
}

function saveDb(data: DatabaseState): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database:', err);
    throw new Error('Failed to persist database state');
  }
}

// In-memory sessions store (token -> timestamp)
const activeSessions = new Map<string, number>();

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    return;
  }
  const token = authHeader.substring(7);
  if (!activeSessions.has(token)) {
    res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
    return;
  }
  // Refresh token lifetime (24 hours)
  activeSessions.set(token, Date.now());
  next();
}

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static uploads directory
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API Endpoints ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Admin Auth
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    const db = getDb();
    const currentHash = db.adminPasswordHash || 'admin123';

    if (password === currentHash) {
      const token = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      activeSessions.set(token, Date.now());
      res.json({ success: true, token, role: 'admin' });
    } else {
      res.status(401).json({ error: 'Invalid administrator password' });
    }
  });

  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (activeSessions.has(token)) {
        res.json({ valid: true, role: 'admin' });
        return;
      }
    }
    res.status(401).json({ valid: false });
  });

  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      activeSessions.delete(token);
    }
    res.json({ success: true });
  });

  app.post('/api/auth/change-password', requireAdmin, (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' });
      return;
    }
    const db = getDb();
    db.adminPasswordHash = newPassword;
    saveDb(db);
    res.json({ success: true, message: 'Password updated successfully' });
  });

  // Database Backup / Export / Import / Supabase SQL
  app.get('/api/db/export', requireAdmin, (_req, res) => {
    const db = getDb();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="portfolio-cms-backup.json"');
    res.send(JSON.stringify(db, null, 2));
  });

  app.post('/api/db/import', requireAdmin, (req, res) => {
    const importedData = req.body;
    if (!importedData || !importedData.profile || !Array.isArray(importedData.education)) {
      res.status(400).json({ error: 'Invalid database backup structure' });
      return;
    }
    saveDb(importedData);
    res.json({ success: true, message: 'Database restored successfully' });
  });

  app.get('/api/db/sql-schema', (_req, res) => {
    const sqlPath = path.resolve(__dirname, 'supabase', 'migrations', '20261028000000_init_schema.sql');
    if (fs.existsSync(sqlPath)) {
      res.setHeader('Content-Type', 'text/plain');
      res.send(fs.readFileSync(sqlPath, 'utf-8'));
    } else {
      res.status(404).json({ error: 'SQL migration file not found' });
    }
  });

  // Profile
  app.get('/api/profile', (_req, res) => {
    const db = getDb();
    res.json(db.profile);
  });

  app.put('/api/profile', requireAdmin, (req, res) => {
    const db = getDb();
    db.profile = { ...db.profile, ...req.body };
    saveDb(db);
    res.json(db.profile);
  });

  // Education & Training
  app.get('/api/education', (_req, res) => {
    const db = getDb();
    res.json(db.education.sort((a, b) => a.order - b.order));
  });

  app.post('/api/education', requireAdmin, (req, res) => {
    const db = getDb();
    const newRecord = { ...req.body, id: 'edu_' + Date.now() };
    db.education.push(newRecord);
    saveDb(db);
    res.status(201).json(newRecord);
  });

  app.put('/api/education/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.education.findIndex((e) => e.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
    db.education[idx] = { ...db.education[idx], ...req.body };
    saveDb(db);
    res.json(db.education[idx]);
  });

  app.delete('/api/education/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.education = db.education.filter((e) => e.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Skills
  app.get('/api/skills', (_req, res) => {
    const db = getDb();
    res.json(db.skills.sort((a, b) => a.order - b.order));
  });

  app.post('/api/skills', requireAdmin, (req, res) => {
    const db = getDb();
    const newSkill = { ...req.body, id: 'sk_' + Date.now() };
    db.skills.push(newSkill);
    saveDb(db);
    res.status(201).json(newSkill);
  });

  app.put('/api/skills/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.skills.findIndex((s) => s.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }
    db.skills[idx] = { ...db.skills[idx], ...req.body };
    saveDb(db);
    res.json(db.skills[idx]);
  });

  app.delete('/api/skills/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.skills = db.skills.filter((s) => s.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Services
  app.get('/api/services', (_req, res) => {
    const db = getDb();
    res.json(db.services.sort((a, b) => a.order - b.order));
  });

  app.post('/api/services', requireAdmin, (req, res) => {
    const db = getDb();
    const newService = { ...req.body, id: 'srv_' + Date.now() };
    db.services.push(newService);
    saveDb(db);
    res.status(201).json(newService);
  });

  app.put('/api/services/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.services.findIndex((s) => s.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    db.services[idx] = { ...db.services[idx], ...req.body };
    saveDb(db);
    res.json(db.services[idx]);
  });

  app.delete('/api/services/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.services = db.services.filter((s) => s.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Graphic Design Projects
  app.get('/api/design-projects', (_req, res) => {
    const db = getDb();
    res.json(db.designProjects.sort((a, b) => a.order - b.order));
  });

  app.post('/api/design-projects', requireAdmin, (req, res) => {
    const db = getDb();
    const newProj = { ...req.body, id: 'des_' + Date.now() };
    db.designProjects.push(newProj);
    saveDb(db);
    res.status(201).json(newProj);
  });

  app.put('/api/design-projects/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.designProjects.findIndex((p) => p.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    db.designProjects[idx] = { ...db.designProjects[idx], ...req.body };
    saveDb(db);
    res.json(db.designProjects[idx]);
  });

  app.delete('/api/design-projects/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.designProjects = db.designProjects.filter((p) => p.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Video Projects
  app.get('/api/video-projects', (_req, res) => {
    const db = getDb();
    res.json(db.videoProjects.sort((a, b) => a.order - b.order));
  });

  app.post('/api/video-projects', requireAdmin, (req, res) => {
    const db = getDb();
    const newVid = { ...req.body, id: 'vid_' + Date.now() };
    db.videoProjects.push(newVid);
    saveDb(db);
    res.status(201).json(newVid);
  });

  app.put('/api/video-projects/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.videoProjects.findIndex((v) => v.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }
    db.videoProjects[idx] = { ...db.videoProjects[idx], ...req.body };
    saveDb(db);
    res.json(db.videoProjects[idx]);
  });

  app.delete('/api/video-projects/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.videoProjects = db.videoProjects.filter((v) => v.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Marketing Cases
  app.get('/api/marketing-cases', (_req, res) => {
    const db = getDb();
    res.json(db.marketingCases.sort((a, b) => a.order - b.order));
  });

  app.post('/api/marketing-cases', requireAdmin, (req, res) => {
    const db = getDb();
    const newCase = { ...req.body, id: 'mkt_' + Date.now() };
    db.marketingCases.push(newCase);
    saveDb(db);
    res.status(201).json(newCase);
  });

  app.put('/api/marketing-cases/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.marketingCases.findIndex((m) => m.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    db.marketingCases[idx] = { ...db.marketingCases[idx], ...req.body };
    saveDb(db);
    res.json(db.marketingCases[idx]);
  });

  app.delete('/api/marketing-cases/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.marketingCases = db.marketingCases.filter((m) => m.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Testimonials
  app.get('/api/testimonials', (req, res) => {
    const db = getDb();
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader && authHeader.startsWith('Bearer ') && activeSessions.has(authHeader.substring(7));
    if (isAdmin) {
      res.json(db.testimonials.sort((a, b) => a.order - b.order));
    } else {
      res.json(db.testimonials.filter((t) => t.status === 'published').sort((a, b) => a.order - b.order));
    }
  });

  app.post('/api/testimonials', requireAdmin, (req, res) => {
    const db = getDb();
    const newTest = { ...req.body, id: 'test_' + Date.now() };
    db.testimonials.push(newTest);
    saveDb(db);
    res.status(201).json(newTest);
  });

  app.put('/api/testimonials/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.testimonials.findIndex((t) => t.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    db.testimonials[idx] = { ...db.testimonials[idx], ...req.body };
    saveDb(db);
    res.json(db.testimonials[idx]);
  });

  app.delete('/api/testimonials/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Arabic Calligraphy Artworks
  app.get('/api/calligraphy', (_req, res) => {
    const db = getDb();
    res.json(db.calligraphyArtworks.sort((a, b) => a.order - b.order));
  });

  app.post('/api/calligraphy', requireAdmin, (req, res) => {
    const db = getDb();
    const newArt = { ...req.body, id: 'cal_' + Date.now() };
    db.calligraphyArtworks.push(newArt);
    saveDb(db);
    res.status(201).json(newArt);
  });

  app.put('/api/calligraphy/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.calligraphyArtworks.findIndex((c) => c.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Artwork not found' });
      return;
    }
    db.calligraphyArtworks[idx] = { ...db.calligraphyArtworks[idx], ...req.body };
    saveDb(db);
    res.json(db.calligraphyArtworks[idx]);
  });

  app.delete('/api/calligraphy/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.calligraphyArtworks = db.calligraphyArtworks.filter((c) => c.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // All Links / Social Links (Unlimited by design)
  app.get('/api/links', (req, res) => {
    const db = getDb();
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader && authHeader.startsWith('Bearer ') && activeSessions.has(authHeader.substring(7));
    if (isAdmin) {
      res.json(db.socialLinks.sort((a, b) => a.displayOrder - b.displayOrder));
    } else {
      res.json(db.socialLinks.filter((l) => l.isVisible).sort((a, b) => a.displayOrder - b.displayOrder));
    }
  });

  app.post('/api/links', requireAdmin, (req, res) => {
    const db = getDb();
    const newLink = { ...req.body, id: 'link_' + Date.now() };
    db.socialLinks.push(newLink);
    saveDb(db);
    res.status(201).json(newLink);
  });

  app.put('/api/links/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.socialLinks.findIndex((l) => l.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }
    db.socialLinks[idx] = { ...db.socialLinks[idx], ...req.body };
    saveDb(db);
    res.json(db.socialLinks[idx]);
  });

  app.delete('/api/links/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.socialLinks = db.socialLinks.filter((l) => l.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Theme Settings
  app.get('/api/theme', (_req, res) => {
    const db = getDb();
    res.json(db.themeSettings);
  });

  app.put('/api/theme', requireAdmin, (req, res) => {
    const db = getDb();
    db.themeSettings = { ...db.themeSettings, ...req.body };
    saveDb(db);
    res.json(db.themeSettings);
  });

  app.post('/api/theme/reset', requireAdmin, (_req, res) => {
    const db = getDb();
    db.themeSettings = initialData.themeSettings;
    saveDb(db);
    res.json(db.themeSettings);
  });

  // Inquiries / Contact form
  app.post('/api/inquiries', (req, res) => {
    const { name, email, phone, whatsapp, serviceCategory, budget, message, honeypot } = req.body;
    // Spam protection honeypot
    if (honeypot) {
      res.status(400).json({ error: 'Spam detected' });
      return;
    }
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' });
      return;
    }

    const db = getDb();
    const newInquiry: Inquiry = {
      id: 'inq_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      whatsapp: whatsapp ? whatsapp.trim() : undefined,
      serviceCategory: serviceCategory || 'general',
      budget: budget || '',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      status: 'new',
    };
    db.inquiries.unshift(newInquiry);
    saveDb(db);
    res.status(201).json({ success: true, message: 'Inquiry received successfully' });
  });

  app.get('/api/inquiries', requireAdmin, (_req, res) => {
    const db = getDb();
    res.json(db.inquiries);
  });

  app.put('/api/inquiries/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.inquiries.findIndex((i) => i.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    db.inquiries[idx] = { ...db.inquiries[idx], ...req.body };
    saveDb(db);
    res.json(db.inquiries[idx]);
  });

  app.delete('/api/inquiries/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.inquiries = db.inquiries.filter((i) => i.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // FAQs
  app.get('/api/faqs', (_req, res) => {
    const db = getDb();
    res.json(db.faqs.sort((a, b) => a.order - b.order));
  });

  app.post('/api/faqs', requireAdmin, (req, res) => {
    const db = getDb();
    const newFaq = { ...req.body, id: 'faq_' + Date.now() };
    db.faqs.push(newFaq);
    saveDb(db);
    res.status(201).json(newFaq);
  });

  app.put('/api/faqs/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const idx = db.faqs.findIndex((f) => f.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    db.faqs[idx] = { ...db.faqs[idx], ...req.body };
    saveDb(db);
    res.json(db.faqs[idx]);
  });

  app.delete('/api/faqs/:id', requireAdmin, (req, res) => {
    const db = getDb();
    db.faqs = db.faqs.filter((f) => f.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Media upload & Asset Management
  app.get('/api/media', requireAdmin, (_req, res) => {
    const db = getDb();
    res.json(db.mediaAssets);
  });

  app.post('/api/media/upload', requireAdmin, (req, res) => {
    const { fileName, fileData, mimeType, altText } = req.body;
    if (!fileData || !fileName) {
      res.status(400).json({ error: 'File data and file name required' });
      return;
    }

    try {
      // Decode base64 if prefixed
      const base64Content = fileData.includes(',') ? fileData.split(',')[1] : fileData;
      const buffer = Buffer.from(base64Content, 'base64');
      const safeName = Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = path.join(UPLOADS_DIR, safeName);
      fs.writeFileSync(filePath, buffer);

      const db = getDb();
      const asset = {
        id: 'med_' + Date.now(),
        name: fileName,
        url: `/uploads/${safeName}`,
        mimeType: mimeType || 'image/jpeg',
        sizeBytes: buffer.length,
        uploadedAt: new Date().toISOString(),
        altText: altText || fileName,
      };
      db.mediaAssets.unshift(asset);
      saveDb(db);
      res.status(201).json(asset);
    } catch (err) {
      console.error('File upload error:', err);
      res.status(500).json({ error: 'Failed to write uploaded media file' });
    }
  });

  app.delete('/api/media/:id', requireAdmin, (req, res) => {
    const db = getDb();
    const asset = db.mediaAssets.find((m) => m.id === req.params.id);
    if (asset && asset.url.startsWith('/uploads/')) {
      const fileName = path.basename(asset.url);
      const filePath = path.join(UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete disk file:', e);
        }
      }
    }
    db.mediaAssets = db.mediaAssets.filter((m) => m.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // Dynamic Sitemap
  app.get('/sitemap.xml', (_req, res) => {
    const host = process.env.APP_URL || 'https://portfolio.example.com';
    const pages = [
      '',
      '/graphic-design',
      '/video-editing',
      '/meta-marketing',
      '/arabic-calligraphy',
      '/about',
      '/links',
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${host}${p}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Vite Integration in Development vs Production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio & CMS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server boot error:', err);
  process.exit(1);
});
