import { z } from 'zod';
import { emailField } from './fields.js';

const text = (label, max) => z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);
const optionalUrl = z.union([z.literal(''), z.string().trim().url('Enter a full link starting with https://')]);

export const settingsSchema = z.object({
  siteName: text('Site name', 80),
  heroTitle: text('Headline', 160),
  heroSubtitle: text('Intro text', 400),
  metaDescription: text('Meta description', 300),
  footerText: text('Footer text', 300),
  email: emailField,
  phone: text('Phone', 30),
  whatsappNumber: z.string().trim().regex(/^\d{8,15}$/, 'Use digits only with country code, e.g. 923001234567.'),
  businessHours: text('Business hours', 120),
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
  linkedinUrl: optionalUrl,
});
