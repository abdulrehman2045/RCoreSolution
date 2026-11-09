import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/token.js';

const getBearerToken = (req) => {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;
};

/** Returns the active user a token belongs to, or null if the token is bad. */
const findUserByToken = async (token) => {
  try {
    const { id } = verifyToken(token);
    const user = await User.findById(id);
    return user?.isActive ? user : null;
  } catch {
    return null;
  }
};

/** Requires a valid login. Puts the user on `req.user`. */
export const protect = asyncHandler(async (req, _res, next) => {
  const token = getBearerToken(req);
  if (!token) throw new ApiError(401, 'Please log in to continue.');

  const user = await findUserByToken(token);
  if (!user) throw new ApiError(401, 'Your session is invalid or has expired. Please log in again.');

  req.user = user;
  next();
});

/** Puts the user on `req.user` when logged in, but lets guests through. */
export const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = getBearerToken(req);
  if (token) req.user = await findUserByToken(token);
  next();
});

export const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to do that.'));
  }
  next();
};

/** Use as `router.get('/', ...adminOnly, handler)`. */
export const adminOnly = [protect, restrictTo('admin')];
