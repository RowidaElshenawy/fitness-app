import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import HeaderAuth from '../shared/header-auth';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';

interface VerifyCodeStepProps {
  isPending: boolean;
}

const VerifyCodeStep = ({ isPending }: VerifyCodeStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control } = useFormContext<ForgotPasswordForm>();

  return (
    <>
      <HeaderAuth subtitle={t('forgot-password.enter-code')} />

      <Controller
        name="resetCode"
        control={control}
        rules={{
          required: t('forgot-password.otp-required'),
        }}
        render={({ field, fieldState }) => (
          <CustomInput
            variant="otp"
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

export default VerifyCodeStep;
