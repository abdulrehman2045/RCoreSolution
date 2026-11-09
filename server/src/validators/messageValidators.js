import { z } from 'zod';
import { MESSAGE_STATUSES } from '../models/Message.js';
import { emailField, nameField, optionalText } from './fields.js';

export const messageSchema = z.object({
  name: nameField,
  email: emailField,
  phone: optionalText(30),
  business: optionalText(120),
  service: optionalText(120),
  budget: optionalText(60),
  details: z
    .string({ required_error: 'Please describe your project.' })
    .trim()
    .min(10, 'Please add a few more details (10 characters minimum).')
    .max(3000, 'Message is too long (3000 characters max).'),
});

export const messageStatusSchema = z.object({
  status: z.enum(MESSAGE_STATUSES, { errorMap: () => ({ message: 'Invalid status.' }) }),
});
