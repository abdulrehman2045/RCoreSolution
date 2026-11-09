import { Router } from 'express';
import authRoutes from './authRoutes.js';
import messagesRoutes from './messagesRoutes.js';
import productsRoutes from './productsRoutes.js';
import reviewsRoutes from './reviewsRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import statsRoutes from './statsRoutes.js';
import usersRoutes from './usersRoutes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.use('/auth', authRoutes);
router.use('/services', servicesRoutes);
router.use('/products', productsRoutes);
router.use('/users', usersRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/messages', messagesRoutes);
router.use('/settings', settingsRoutes);
router.use('/stats', statsRoutes);

export default router;
