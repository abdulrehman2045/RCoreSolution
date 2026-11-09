import { z } from 'zod';
import { emailField, nameField, passwordField } from './fields.js';

export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});

export const loginSchema = z.object({
  email: emailField,
  password: z.string({ required_error: 'Password is required.' }).min(1, 'Password is required.'),
});

export const updateProfileSchema = z.object({
  name: nameField,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string({ required_error: 'Current password is required.' }).min(1, 'Current password is required.'),
  newPassword: passwordField,
});
