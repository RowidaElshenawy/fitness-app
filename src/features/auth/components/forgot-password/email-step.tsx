import { ArrowLeft } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';
import type { ForgotPasswordForm } from './forgot-password-flow';

interface EmailStepProps {
  onSubmit: () => void;
  onBack: () => void;
  isPending: boolean;
  error?: string;
}

const EmailStep = ({ onSubmit, onBack, isPending, error }: EmailStepProps) => {
  // Translation
  const { t } = useTranslation();

  // Context
  const { control, trigger } = useFormContext<ForgotPasswordForm>();

  // Functions
  const handleSubmit = async () => {
    const isValid = await trigger('email');

    if (!isValid) return;

    onSubmit();
  };

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

        <h1 className="text-2xl font-bold">{t('forgot-password.find-account')}</h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <p>{t('forgot-password.enter-email')}</p>

        <Controller
          name="email"
          control={control}
          rules={{
            required: t('forgot-password.email-required'),
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              variant="email"
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        {error && <ErrorAlert errorMessage={error} />}

        <Button type="submit" variant="primary" className="cursor-pointer" disabled={isPending}>
          {t('forgot-password.send-otp')}
        </Button>
      </form>
    </div>
  );
};

export default EmailStep;
