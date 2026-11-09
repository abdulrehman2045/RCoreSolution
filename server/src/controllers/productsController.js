import { Product } from '../models/Product.js';
import { createCatalogController } from './catalogController.js';

export const productsController = createCatalogController(Product, 'Product');
