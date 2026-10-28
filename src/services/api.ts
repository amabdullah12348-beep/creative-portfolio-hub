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
  FaqItem,
  MediaAsset,
  DatabaseState,
} from '../types/index.ts';

const TOKEN_KEY = 'portfolio_cms_admin_token';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const getHeaders = (needsAuth = false): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (needsAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Generic fetcher
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    let message = 'API request failed';
    try {
      const parsed = JSON.parse(errorText);
      message = parsed.error || message;
    } catch {
      message = errorText || res.statusText;
    }
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  // Auth
  async login(password: string): Promise<{ success: boolean; token: string }> {
    const data = await apiFetch<{ success: boolean; token: string }>('/api/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ password }),
    });
    setAuthToken(data.token);
    return data;
  },

  async verifyAuth(): Promise<boolean> {
    const token = getAuthToken();
    if (!token) return false;
    try {
      await apiFetch<{ valid: boolean }>('/api/auth/verify', {
        headers: getHeaders(true),
      });
      return true;
    } catch {
      removeAuthToken();
      return false;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiFetch('/api/auth/logout', {
        method: 'POST',
        headers: getHeaders(true),
      });
    } finally {
      removeAuthToken();
    }
  },

  async changePassword(newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiFetch('/api/auth/change-password', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ newPassword }),
    });
  },

  // Profile
  getProfile: () => apiFetch<Profile>('/api/profile'),
  updateProfile: (data: Partial<Profile>) =>
    apiFetch<Profile>('/api/profile', {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),

  // Education & Training
  getEducation: () => apiFetch<EducationRecord[]>('/api/education'),
  createEducation: (data: Omit<EducationRecord, 'id'>) =>
    apiFetch<EducationRecord>('/api/education', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateEducation: (id: string, data: Partial<EducationRecord>) =>
    apiFetch<EducationRecord>(`/api/education/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteEducation: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/education/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Skills
  getSkills: () => apiFetch<SkillItem[]>('/api/skills'),
  createSkill: (data: Omit<SkillItem, 'id'>) =>
    apiFetch<SkillItem>('/api/skills', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateSkill: (id: string, data: Partial<SkillItem>) =>
    apiFetch<SkillItem>(`/api/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteSkill: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Services
  getServices: () => apiFetch<ServiceItem[]>('/api/services'),
  createService: (data: Omit<ServiceItem, 'id'>) =>
    apiFetch<ServiceItem>('/api/services', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateService: (id: string, data: Partial<ServiceItem>) =>
    apiFetch<ServiceItem>(`/api/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteService: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Design Projects
  getDesignProjects: () => apiFetch<DesignProject[]>('/api/design-projects'),
  createDesignProject: (data: Omit<DesignProject, 'id'>) =>
    apiFetch<DesignProject>('/api/design-projects', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateDesignProject: (id: string, data: Partial<DesignProject>) =>
    apiFetch<DesignProject>(`/api/design-projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteDesignProject: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/design-projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Video Projects
  getVideoProjects: () => apiFetch<VideoProject[]>('/api/video-projects'),
  createVideoProject: (data: Omit<VideoProject, 'id'>) =>
    apiFetch<VideoProject>('/api/video-projects', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateVideoProject: (id: string, data: Partial<VideoProject>) =>
    apiFetch<VideoProject>(`/api/video-projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteVideoProject: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/video-projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Marketing Cases
  getMarketingCases: () => apiFetch<MarketingCase[]>('/api/marketing-cases'),
  createMarketingCase: (data: Omit<MarketingCase, 'id'>) =>
    apiFetch<MarketingCase>('/api/marketing-cases', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateMarketingCase: (id: string, data: Partial<MarketingCase>) =>
    apiFetch<MarketingCase>(`/api/marketing-cases/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteMarketingCase: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/marketing-cases/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Testimonials
  getTestimonials: () => apiFetch<Testimonial[]>('/api/testimonials', { headers: getHeaders(true) }),
  createTestimonial: (data: Omit<Testimonial, 'id'>) =>
    apiFetch<Testimonial>('/api/testimonials', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    apiFetch<Testimonial>(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteTestimonial: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Calligraphy Artworks
  getCalligraphy: () => apiFetch<CalligraphyArtwork[]>('/api/calligraphy'),
  createCalligraphy: (data: Omit<CalligraphyArtwork, 'id'>) =>
    apiFetch<CalligraphyArtwork>('/api/calligraphy', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateCalligraphy: (id: string, data: Partial<CalligraphyArtwork>) =>
    apiFetch<CalligraphyArtwork>(`/api/calligraphy/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteCalligraphy: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/calligraphy/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Social Links
  getLinks: () => apiFetch<SocialLink[]>('/api/links', { headers: getHeaders(true) }),
  createLink: (data: Omit<SocialLink, 'id'>) =>
    apiFetch<SocialLink>('/api/links', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateLink: (id: string, data: Partial<SocialLink>) =>
    apiFetch<SocialLink>(`/api/links/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteLink: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/links/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Theme Settings
  getTheme: () => apiFetch<ThemeSettings>('/api/theme'),
  updateTheme: (data: Partial<ThemeSettings>) =>
    apiFetch<ThemeSettings>('/api/theme', {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  resetTheme: () =>
    apiFetch<ThemeSettings>('/api/theme/reset', {
      method: 'POST',
      headers: getHeaders(true),
    }),

  // Inquiries
  submitInquiry: (data: {
    name: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    serviceCategory: string;
    budget?: string;
    message: string;
    honeypot?: string;
  }) =>
    apiFetch<{ success: boolean; message: string }>('/api/inquiries', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }),
  getInquiries: () => apiFetch<Inquiry[]>('/api/inquiries', { headers: getHeaders(true) }),
  updateInquiry: (id: string, data: Partial<Inquiry>) =>
    apiFetch<Inquiry>(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteInquiry: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // FAQs
  getFaqs: () => apiFetch<FaqItem[]>('/api/faqs'),
  createFaq: (data: Omit<FaqItem, 'id'>) =>
    apiFetch<FaqItem>('/api/faqs', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  updateFaq: (id: string, data: Partial<FaqItem>) =>
    apiFetch<FaqItem>(`/api/faqs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteFaq: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/faqs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Media
  getMedia: () => apiFetch<MediaAsset[]>('/api/media', { headers: getHeaders(true) }),
  uploadMedia: (data: { fileName: string; fileData: string; mimeType?: string; altText?: string }) =>
    apiFetch<MediaAsset>('/api/media/upload', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }),
  deleteMedia: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/media/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }),

  // Database Backup & Restore
  exportDatabase: async (): Promise<Blob> => {
    const token = getAuthToken();
    const res = await fetch('/api/db/export', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Backup export failed');
    return res.blob();
  },

  importDatabase: async (data: DatabaseState): Promise<{ success: boolean; message: string }> => {
    return apiFetch('/api/db/import', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
  },

  getSqlSchema: async (): Promise<string> => {
    const res = await fetch('/api/db/sql-schema');
    if (!res.ok) throw new Error('Failed to load SQL migration schema');
    return res.text();
  },
};
