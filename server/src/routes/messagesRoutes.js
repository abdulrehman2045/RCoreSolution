import { Router } from 'express';
import {
  createMessage,
  deleteMessage,
  listAllMessages,
  listMyMessages,
  setMessageStatus,
} from '../controllers/messagesController.js';
import { adminOnly, optionalAuth, protect } from '../middleware/auth.js';
import { messageLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';
import { messageSchema, messageStatusSchema } from '../validators/messageValidators.js';

const router = Router();

router.post('/', messageLimiter, optionalAuth, validate(messageSchema), createMessage);
router.get('/mine', protect, listMyMessages);

router.get('/', ...adminOnly, listAllMessages);
router.patch('/:id/status', ...adminOnly, validate(messageStatusSchema), setMessageStatus);
router.delete('/:id', ...adminOnly, deleteMessage);

export default router;
