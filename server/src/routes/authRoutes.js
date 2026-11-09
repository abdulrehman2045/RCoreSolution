import { Router } from 'express';
import { changePassword, getMe, login, register, updateMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from '../validators/authValidators.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

router.get('/me', protect, getMe);
router.patch('/me', protect, validate(updateProfileSchema), updateMe);
router.patch('/password', protect, validate(changePasswordSchema), changePassword);

export default router;
