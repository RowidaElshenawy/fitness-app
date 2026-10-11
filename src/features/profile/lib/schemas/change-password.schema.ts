import { z } from 'zod';

import { USER_INFO_SCHEMA } from '../../../auth/schema/register.schema';

const { password } = USER_INFO_SCHEMA.sourceType().shape;

export const CHANGE_PASSWORD_SCHEMA = z
  .object({
    password: z.string().min(1, 'profile.change-password.current-password-required'),
    newPassword: password,
    confirmPassword: z.string().min(1, 'auth.register.errors.re-password-required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'auth.register.errors.password-mismatch',
    path: ['confirmPassword'],
  });
