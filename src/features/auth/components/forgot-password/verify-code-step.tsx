import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';
import HeaderAuth from '../shared/header-auth';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';
import { translateError } from '../../lib/utils/translate-error';

interface VerifyCodeStepProps {
  isPending: boolean;
  error?: string;
}

const VerifyCodeStep = ({ isPending, error }: VerifyCodeStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control } = useFormContext<ForgotPasswordForm>();

  return (
    <>
      <HeaderAuth subtitle={t('auth.forgot-password.enter-code')} />

      <Controller
        name="resetCode"
        control={control}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="otp"
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

export default VerifyCodeStep;
