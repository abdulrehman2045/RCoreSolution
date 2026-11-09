import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1, 'Choose a rating from 1 to 5.').max(5, 'Choose a rating from 1 to 5.'),
  comment: z
    .string({ required_error: 'Please write a short review.' })
    .trim()
    .min(5, 'Review must be at least 5 characters.')
    .max(600, 'Review is too long (600 characters max).'),
});

export const approvalSchema = z.object({
  isApproved: z.boolean({ required_error: 'isApproved is required.' }),
});
