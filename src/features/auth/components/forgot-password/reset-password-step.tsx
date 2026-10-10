import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';
import HeaderAuth from '../shared/header-auth';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';
import { translateError } from '../../lib/utils/translate-error';

interface ResetPasswordStepProps {
  isPending: boolean;
  error?: string;
}

const ResetPasswordStep = ({ isPending, error }: ResetPasswordStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control } = useFormContext<ForgotPasswordForm>();

  return (
    <>
      <HeaderAuth subtitle={t('auth.forgot-password.enter-new-password')} />

      <Controller
        name="newPassword"
        control={control}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="password"
            subVariant="new-password"
            value={field.value}
            onChange={field.onChange}
            disabled={isPending}
            error={!!fieldState.error}
            errorMessage={translateError(t)(fieldState.error?.message)}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="password"
            subVariant="confirm-new-password"
            value={field.value}
            onChange={field.onChange}
            disabled={isPending}
            error={!!fieldState.error}
            errorMessage={translateError(t)(fieldState.error?.message)}
          />
        )}
      />

      {error && <ErrorAlert errorMessage={error} />}
    </>
  );
};

export default ResetPasswordStep;
