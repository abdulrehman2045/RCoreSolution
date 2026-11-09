import { Message } from '../models/Message.js';
import { Product } from '../models/Product.js';
import { Review } from '../models/Review.js';
import { Service } from '../models/Service.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** Numbers shown on the admin dashboard. */
export const getStats = asyncHandler(async (_req, res) => {
  const [services, products, users, reviews, messages, newMessages] = await Promise.all([
    Service.countDocuments(),
    Product.countDocuments(),
    User.countDocuments(),
    Review.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ status: 'new' }),
  ]);

  res.json({ stats: { services, products, users, reviews, messages, newMessages } });
});
