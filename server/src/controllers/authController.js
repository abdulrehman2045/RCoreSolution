import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../utils/token.js';

const sendSession = (res, statusCode, user) => {
  res.status(statusCode).json({ token: signToken(user._id), user });
};

export const register = asyncHandler(async (req, res) => {
  // Public signup always creates a normal user, never an admin.
  const user = await User.create(req.body);
  sendSession(res, 201, user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  const passwordMatches = user && (await user.comparePassword(password));
  if (!passwordMatches) throw new ApiError(401, 'Invalid email or password.');
  if (!user.isActive) throw new ApiError(403, 'This account has been disabled.');

  sendSession(res, 200, user);
});

export const getMe = (req, res) => {
  res.json({ user: req.user });
};

export const updateMe = asyncHandler(async (req, res) => {
  req.user.name = req.body.name;
  await req.user.save();
  res.json({ user: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(400, 'Your current password is incorrect.');
  }

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated.' });
});
