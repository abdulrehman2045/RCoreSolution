import { Review } from '../models/Review.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** Public list: only approved reviews, with just the reviewer's name. */
export const listApprovedReviews = asyncHandler(async (_req, res) => {
  const items = await Review.find({ isApproved: true })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ items });
});

/** Admin list: every review, including hidden ones. */
export const listAllReviews = asyncHandler(async (_req, res) => {
  const items = await Review.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ items });
});

export const createReview = asyncHandler(async (req, res) => {
  const alreadyReviewed = await Review.exists({ user: req.user._id });
  if (alreadyReviewed) throw new ApiError(409, 'You have already reviewed us. Delete your old review to write a new one.');

  const review = await Review.create({ ...req.body, user: req.user._id });
  await review.populate('user', 'name');
  res.status(201).json({ item: review });
});

export const setReviewApproval = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isApproved: req.body.isApproved },
    { new: true },
  ).populate('user', 'name email');
  if (!review) throw new ApiError(404, 'Review not found.');
  res.json({ item: review });
});

/** A review can be deleted by its author or by an admin. */
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw new ApiError(404, 'Review not found.');

  const isAuthor = review.user.equals(req.user._id);
  if (!isAuthor && req.user.role !== 'admin') {
    throw new ApiError(403, 'You can only delete your own review.');
  }

  await review.deleteOne();
  res.json({ message: 'Review deleted.' });
});
