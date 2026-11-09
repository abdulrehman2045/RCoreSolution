import { Router } from 'express';
import { readSettings, updateSettings } from '../controllers/settingsController.js';
import { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { settingsSchema } from '../validators/settingValidators.js';

const router = Router();

router.get('/', readSettings);
router.put('/', ...adminOnly, validate(settingsSchema), updateSettings);

export default router;
