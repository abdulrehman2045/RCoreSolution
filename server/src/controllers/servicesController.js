import { Service } from '../models/Service.js';
import { createCatalogController } from './catalogController.js';

export const servicesController = createCatalogController(Service, 'Service');
