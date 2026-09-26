import { z } from 'zod';

type Translate = (key: string, options?: Record<string, unknown>) => string;

export const USER_INFO_SCHEMA = (t: Translate) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, t('register.errors.first-name'))
        .max(50, t('register.errors.first-name-max')),
      lastName: z
        .string()
        .trim()
        .min(1, t('register.errors.last-name'))
        .max(50, t('register.errors.last-name-max')),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, t('register.errors.email-required'))
        .email(t('register.errors.invalid-email')),
      password: z
        .string()
        .min(8, t('register.errors.password-min-length'))
        .max(50, t('register.errors.password-max-length'))
        .regex(/[A-Z]/, t('register.errors.password-uppercase'))
        .regex(/[a-z]/, t('register.errors.password-lowercase'))
        .regex(/[0-9]/, t('register.errors.password-number'))
        .regex(/[^A-Za-z0-9]/, t('register.errors.password-special')),
      rePassword: z.string().min(1, t('register.errors.re-password-required')),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('register.errors.password-mismatch'),
      path: ['rePassword'],
    });
