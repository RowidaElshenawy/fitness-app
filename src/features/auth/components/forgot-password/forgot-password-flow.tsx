import { ArrowLeft } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/ui/button';
import HeaderAuth from '../shared/header-auth';
import EmailStep from './email-step';
import ResetPasswordStep from './reset-password-step';
import VerifyCodeStep from './verify-code-step';
import useForgotPassword from '../../hooks/use-forgot-password';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';
import { FORGOT_PASSWORD_SCHEMA } from '../../lib/schemas/forgot-password.schema';

const ForgotPasswordFlow = () => {
  // Translation
  const { t } = useTranslation();

  // Form
  const schema = FORGOT_PASSWORD_SCHEMA;

  const form = useForm<ForgotPasswordForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });

  // Custom hooks
  const {
    step,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    handleResendCode,
    handleBack,
    isPending,
    stepError,
  } = useForgotPassword(form);

  // Variables
  const stepTitle = {
    email: t('auth.forgot-password.find-account'),
    code: t('auth.forgot-password.verify-account'),
    password: t('auth.forgot-password.reset-password'),
  }[step];

  const stepButtonTitle = {
    email: t('auth.forgot-password.send-otp'),
    code: t('auth.forgot-password.verify-code'),
    password: t('auth.forgot-password.reset-password-button'),
  }[step];

  // Functions
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 'email') {
      if (await form.trigger('email')) {
        handleEmailSubmit();
      }

      return;
    }

    if (step === 'code') {
      if (await form.trigger('resetCode')) {
        handleCodeSubmit();
      }

      return;
    }

    const newPasswordValid = await form.trigger('newPassword');
    const confirmPasswordValid = await form.trigger('confirmPassword');

    if (newPasswordValid && confirmPasswordValid) {
      handlePasswordSubmit();
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={handleBack}
            disabled={isPending}
          >
            <ArrowLeft className="rtl:rotate-180" />
          </Button>

          <HeaderAuth title={stepTitle} />
        </div>

        <div className="rounded-xl border border-border-muted p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 'email' && <EmailStep isPending={isPending} error={stepError} />}

            {step === 'code' && <VerifyCodeStep isPending={isPending} error={stepError} />}

            {step === 'password' && <ResetPasswordStep isPending={isPending} error={stepError} />}

            <Button
              type="submit"
              variant="primary"
              className="w-full cursor-pointer"
              loading={isPending}
            >
              {stepButtonTitle}
            </Button>

            {step === 'code' && (
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-sm text-text-subtle">
                  {t('auth.forgot-password.didnt-receive-code')}
                </span>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isPending}
                  className="w-fit cursor-pointer text-sm font-bold text-text-primary hover:underline"
                >
                  {t('auth.forgot-password.resend-code')}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default ForgotPasswordFlow;
