import { productsController } from '../controllers/productsController.js';
import { createCatalogRouter } from './catalogRoutes.js';

export default createCatalogRouter(productsController);
