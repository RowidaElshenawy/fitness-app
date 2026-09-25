import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import HeaderAuth from '../shared/header-auth';
import type { ForgotPasswordForm } from './forgot-password-flow';

interface ResetPasswordStepProps {
  isPending: boolean;
}

const ResetPasswordStep = ({ isPending }: ResetPasswordStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control, getValues } = useFormContext<ForgotPasswordForm>();

  return (
    <>
      <HeaderAuth subtitle={t('forgot-password.enter-new-password')} />

      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: t('forgot-password.password-required'),
        }}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="password"
            subVariant="new-password"
            value={field.value}
            onChange={field.onChange}
            disabled={isPending}
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: t('forgot-password.confirm-password-required'),
          validate: (value) =>
            value === getValues('newPassword') || t('forgot-password.passwords-do-not-match'),
        }}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="password"
            subVariant="confirm-new-password"
            value={field.value}
            onChange={field.onChange}
            disabled={isPending}
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </>
  );
};

export default ResetPasswordStep;
