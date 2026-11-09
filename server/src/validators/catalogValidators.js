import { z } from 'zod';

const requiredText = (label, min, max) =>
  z
    .string({ required_error: `${label} is required.` })
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} is too long.`);

/** Used for both services and products. */
export const catalogSchema = z.object({
  name: requiredText('Name', 2, 120),
  // Optional: generated from the name when left empty.
  slug: z.string().trim().max(120).optional(),
  description: requiredText('Description', 10, 400),
  icon: z.string().trim().regex(/^[A-Za-z0-9]+$/, 'Icon name is invalid.').default('Code2'),
  problem: requiredText('Problem', 10, 1000),
  solution: requiredText('Solution', 10, 1000),
  features: z.array(z.string().trim().min(1).max(160)).default([]),
  faqQuestion: z.string().trim().max(200).default(''),
  faqAnswer: z.string().trim().max(1000).default(''),
  order: z.coerce.number().int().default(0),
});
