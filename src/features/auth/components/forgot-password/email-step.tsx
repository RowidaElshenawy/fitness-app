import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';
import HeaderAuth from '../shared/header-auth';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';
import { translateError } from '../../lib/utils/translate-error';

interface EmailStepProps {
  isPending: boolean;
  error?: string;
}

const EmailStep = ({ isPending, error }: EmailStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control } = useFormContext<ForgotPasswordForm>();

  return (
    <>
      <HeaderAuth subtitle={t('auth.forgot-password.enter-email')} />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="email"
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

export default EmailStep;
