import mongoose from 'mongoose';

/** Website-wide settings. Only one document ever exists. */
const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'RCore Solutions', trim: true },
    heroTitle: { type: String, default: 'Technology Built Around Your Business.', trim: true },
    heroSubtitle: {
      type: String,
      default:
        'RCore Solutions builds websites, software and digital systems that help businesses operate smarter, serve customers better and grow with confidence.',
      trim: true,
    },
    metaDescription: {
      type: String,
      default:
        'RCore Solutions builds business websites, custom software, CRM, ERP, SaaS and AI automation solutions around real business needs.',
      trim: true,
    },
    footerText: {
      type: String,
      default: 'Software house building websites, CRM, ERP and AI automation for businesses.',
      trim: true,
    },
    email: { type: String, default: 'rcoresolutions011@gmail.com', trim: true },
    phone: { type: String, default: '+92 318 4077453', trim: true },
    whatsappNumber: { type: String, default: '923184077453', trim: true },
    businessHours: { type: String, default: '9:00 AM – 5:00 PM · 8:00 PM – 5:00 AM', trim: true },
    facebookUrl: { type: String, default: '', trim: true },
    instagramUrl: { type: String, default: '', trim: true },
    linkedinUrl: { type: String, default: '', trim: true },
  },
  { timestamps: true },
);

export const Setting = mongoose.model('Setting', settingSchema);

/** Returns the settings document, creating it with defaults on first use. */
export async function getSettings() {
  const existing = await Setting.findOne();
  return existing ?? Setting.create({});
}
