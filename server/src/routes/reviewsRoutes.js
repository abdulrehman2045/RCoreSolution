import { Router } from 'express';
import {
  createReview,
  deleteReview,
  listAllReviews,
  listApprovedReviews,
  setReviewApproval,
} from '../controllers/reviewsController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { approvalSchema, reviewSchema } from '../validators/reviewValidators.js';

const router = Router();

router.get('/', listApprovedReviews);
router.get('/admin/all', ...adminOnly, listAllReviews);

router.post('/', protect, validate(reviewSchema), createReview);
router.patch('/:id/approval', ...adminOnly, validate(approvalSchema), setReviewApproval);
router.delete('/:id', protect, deleteReview);

export default router;
