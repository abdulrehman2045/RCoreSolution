import { z } from 'zod';

/** Small reusable zod fields shared by several validators. */
export const nameField = z
  .string({ required_error: 'Name is required.' })
  .trim()
  .min(2, 'Name must be at least 2 characters.')
  .max(80, 'Name is too long.');

export const emailField = z
  .string({ required_error: 'Email is required.' })
  .trim()
  .toLowerCase()
  .email('Enter a valid email address.');

export const passwordField = z
  .string({ required_error: 'Password is required.' })
  .min(6, 'Password must be at least 6 characters.')
  .max(100, 'Password is too long.');

export const optionalText = (maxLength) => z.string().trim().max(maxLength, 'Text is too long.').default('');
