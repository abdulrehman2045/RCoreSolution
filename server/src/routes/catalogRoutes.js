import { Router } from 'express';
import { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { catalogSchema } from '../validators/catalogValidators.js';

/** Public read, admin-only write. Used for both services and products. */
export function createCatalogRouter(controller) {
  const router = Router();

  router.get('/', controller.list);
  router.post('/', ...adminOnly, validate(catalogSchema), controller.create);
  router.put('/:id', ...adminOnly, validate(catalogSchema), controller.update);
  router.delete('/:id', ...adminOnly, controller.remove);

  return router;
}
