import { z } from 'zod';
import type { TFunction } from 'i18next';

import { loginSchema } from '../../../auth/schema/login.schema';

export const getChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z.string().nonempty(t('profile.change-password.current-password-required')),
      newPassword: loginSchema.shape.password,
      confirmPassword: z.string().nonempty(t('profile.change-password.confirm-password-required')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('profile.change-password.passwords-do-not-match'),
      path: ['confirmPassword'],
    });
