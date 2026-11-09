import mongoose from 'mongoose';
import { createCatalogSchema } from './catalogFields.js';

export const Service = mongoose.model('Service', createCatalogSchema());
