import { Router } from 'express';
import { getStats } from '../controllers/statsController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', ...adminOnly, getStats);

export default router;
