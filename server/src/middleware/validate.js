import { ApiError } from '../utils/ApiError.js';

/** Validates `req.body` against a zod schema and replaces it with the cleaned data. */
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const [issue] = result.error.issues;
    const field = issue.path.join('.');
    return next(new ApiError(400, field ? `${field}: ${issue.message}` : issue.message));
  }

  req.body = result.data;
  next();
};
