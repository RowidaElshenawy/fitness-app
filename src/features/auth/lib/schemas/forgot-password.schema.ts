import { z } from 'zod';

import { USER_INFO_SCHEMA } from '../../schema/register.schema';

const { email, password } = USER_INFO_SCHEMA.sourceType().shape;

export const FORGOT_PASSWORD_SCHEMA = z
  .object({
    email,
    resetCode: z.string().min(1, 'auth.forgot-password.otp-required'),
    newPassword: password,
    confirmPassword: z.string().min(1, 'auth.register.errors.re-password-required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'auth.register.errors.password-mismatch',
    path: ['confirmPassword'],
  });
