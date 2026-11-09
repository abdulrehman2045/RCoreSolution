import mongoose from 'mongoose';
import { createCatalogSchema } from './catalogFields.js';

export const Product = mongoose.model('Product', createCatalogSchema());
