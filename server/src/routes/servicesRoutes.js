import { servicesController } from '../controllers/servicesController.js';
import { createCatalogRouter } from './catalogRoutes.js';

export default createCatalogRouter(servicesController);
