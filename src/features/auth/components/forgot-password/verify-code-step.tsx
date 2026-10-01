import { ArrowLeft } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import type { ForgotPasswordForm } from './forgot-password-flow';

interface VerifyCodeStepProps {
  onSubmit: () => void;
  onBack: () => void;
  isPending: boolean;
}

const VerifyCodeStep = ({ onSubmit, onBack, isPending }: VerifyCodeStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control } = useFormContext<ForgotPasswordForm>();

  return (
    <div className="mx-auto flex w-96 flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onBack}
          disabled={isPending}
        >
          <ArrowLeft className="rtl:rotate-180" />
        </Button>

        <h1 className="text-2xl font-bold">{t('forgot-password.verify-account')}</h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <p>{t('forgot-password.enter-code')}</p>

        <Controller
          name="resetCode"
          control={control}
          render={({ field }) => (
            <CustomInput
              variant="otp"
              value={field.value}
              onChange={field.onChange}
              disabled={isPending}
            />
          )}
        />

        <Button type="submit" variant="primary" className="cursor-pointer" disabled={isPending}>
          {t('forgot-password.verify-code')}
        </Button>
      </form>
    </div>
  );
};

export default VerifyCodeStep;
