import mongoose from 'mongoose';

/** Fields shared by services and products (both are shown as the same kind of page). */
const catalogFields = {
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 400 },
  icon: { type: String, default: 'Code2', trim: true },
  problem: { type: String, required: true, trim: true },
  solution: { type: String, required: true, trim: true },
  features: { type: [String], default: [] },
  faqQuestion: { type: String, default: '', trim: true },
  faqAnswer: { type: String, default: '', trim: true },
  order: { type: Number, default: 0 },
};

export const createCatalogSchema = () => new mongoose.Schema(catalogFields, { timestamps: true });
