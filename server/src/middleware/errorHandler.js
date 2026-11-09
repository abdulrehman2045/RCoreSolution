import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

/** Turns any error into a consistent `{ message }` JSON response. */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message;

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'value';
    statusCode = 409;
    message = `That ${field} is already in use.`;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors).map((item) => item.message).join(' ');
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid id.';
  }

  if (statusCode >= 500) {
    console.error(error);
    if (env.nodeEnv === 'production') message = 'Something went wrong on our side.';
  }

  res.status(statusCode).json({ message });
};
