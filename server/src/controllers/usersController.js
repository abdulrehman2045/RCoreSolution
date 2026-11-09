import { Review } from '../models/Review.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const isSameUser = (req, user) => req.user._id.equals(user._id);

const findUserOr404 = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, 'User not found.');
  return user;
};

export const listUsers = asyncHandler(async (_req, res) => {
  const items = await User.find().sort({ createdAt: -1 });
  res.json({ items });
});

export const createUser = asyncHandler(async (req, res) => {
  const item = await User.create(req.body);
  res.status(201).json({ item });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await findUserOr404(req.params.id);

  const losesAdminAccess = req.body.role !== 'admin' || !req.body.isActive;
  if (isSameUser(req, user) && losesAdminAccess) {
    throw new ApiError(400, 'You cannot remove your own admin access or disable your own account.');
  }

  user.set(req.body);
  await user.save();
  res.json({ item: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await findUserOr404(req.params.id);
  if (isSameUser(req, user)) throw new ApiError(400, 'You cannot delete your own account.');

  await Review.deleteMany({ user: user._id });
  await user.deleteOne();
  res.json({ message: 'User deleted.' });
});
