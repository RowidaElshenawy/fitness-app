import { ArrowLeft } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import type { ForgotPasswordForm } from './forgot-password-flow';

interface ResetPasswordStepProps {
  onSubmit: () => void;
  onBack: () => void;
  isPending: boolean;
}

const ResetPasswordStep = ({ onSubmit, onBack, isPending }: ResetPasswordStepProps) => {
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

        <h1 className="text-2xl font-bold">{t('forgot-password.reset-password')}</h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <p>{t('forgot-password.enter-new-password')}</p>

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
              errorMessage={fieldState.error?.message}
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
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" variant="primary" className="cursor-pointer" disabled={isPending}>
          {t('forgot-password.reset-password-button')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordStep;
