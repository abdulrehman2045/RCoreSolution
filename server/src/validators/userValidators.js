import { z } from 'zod';
import { USER_ROLES } from '../models/User.js';
import { emailField, nameField, passwordField } from './fields.js';

export const createUserSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  role: z.enum(USER_ROLES).default('user'),
  isActive: z.boolean().default(true),
});

// On update the password is optional: leave it out to keep the current one.
export const updateUserSchema = createUserSchema.extend({
  password: passwordField.optional(),
});
