import { z } from 'zod';

export const USER_INFO_SCHEMA = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'auth.register.errors.first-name')
      .max(50, 'auth.register.errors.first-name-max'),
    lastName: z
      .string()
      .trim()
      .min(1, 'auth.register.errors.last-name')
      .max(50, 'auth.register.errors.last-name-max'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'auth.register.errors.email-required')
      .email('auth.register.errors.invalid-email'),
    password: z
      .string()
      .min(8, 'auth.register.errors.password-min-length')
      .max(50, 'auth.register.errors.password-max-length')
      .regex(/[A-Z]/, 'auth.register.errors.password-uppercase')
      .regex(/[a-z]/, 'auth.register.errors.password-lowercase')
      .regex(/[0-9]/, 'auth.register.errors.password-number')
      .regex(/[^A-Za-z0-9]/, 'auth.register.errors.password-special'),
    rePassword: z.string().min(1, 'auth.register.errors.re-password-required'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'auth.register.errors.password-mismatch',
    path: ['rePassword'],
  });
