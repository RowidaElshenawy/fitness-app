import { z } from 'zod';

import { USER_INFO_SCHEMA } from '../../schemas/register.schema';

type Translate = (key: string, options?: Record<string, unknown>) => string;

export const FORGOT_PASSWORD_SCHEMA = (t: Translate) => {
  const { email, password } = USER_INFO_SCHEMA(t).sourceType().shape;

  return z
    .object({
      email,
      resetCode: z.string().min(1, t('forgot-password.otp-required')),
      newPassword: password,
      confirmPassword: z.string().min(1, t('forgot-password.confirm-password-required')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('forgot-password.passwords-do-not-match'),
      path: ['confirmPassword'],
    });
};
