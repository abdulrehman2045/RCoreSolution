import rateLimit from 'express-rate-limit';

const createLimiter = ({ minutes, limit, message }) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

export const authLimiter = createLimiter({
  minutes: 15,
  limit: 30,
  message: 'Too many attempts. Please try again in a few minutes.',
});

export const messageLimiter = createLimiter({
  minutes: 60,
  limit: 10,
  message: 'You have sent too many messages. Please try again later.',
});
