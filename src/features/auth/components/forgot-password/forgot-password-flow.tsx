import { ArrowLeft } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import HeaderAuth from '../shared/header-auth';
import EmailStep from './email-step';
import ResetPasswordStep from './reset-password-step';
import VerifyCodeStep from './verify-code-step';
import useForgotPassword from '../../hooks/use-forgot-password';
import type { ForgotPasswordForm } from '../../lib/types/forgot-password';

const ForgotPasswordFlow = () => {
  // Translation
  const { t } = useTranslation();

  // Form
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
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
    email: t('forgot-password.find-account'),
    code: t('forgot-password.verify-account'),
    password: t('forgot-password.reset-password'),
  }[step];

  const stepButtonTitle = {
    email: t('forgot-password.send-otp'),
    code: t('forgot-password.verify-code'),
    password: t('forgot-password.reset-password-button'),
  }[step];

  return (
    <FormProvider {...form}>
      <div className="mx-auto mt-12.5 flex max-w-121.5 flex-col gap-4">
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
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (step === 'email') {
                form.handleSubmit(handleEmailSubmit)(event);
                return;
              }

              if (step === 'code') {
                form.handleSubmit(handleCodeSubmit)(event);
                return;
              }

              form.handleSubmit(handlePasswordSubmit)(event);
            }}
            className="flex flex-col gap-4"
          >
            {step === 'email' && <EmailStep isPending={isPending} error={stepError} />}

            {step === 'code' && <VerifyCodeStep isPending={isPending} />}

            {step === 'password' && <ResetPasswordStep isPending={isPending} />}

            <Button
              type="submit"
              variant="primary"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {stepButtonTitle}
            </Button>

            {step === 'code' && (
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-sm text-text-subtle">
                  {t('forgot-password.didnt-receive-code')}
                </span>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isPending}
                  className="w-fit cursor-pointer text-sm font-bold text-text-primary hover:underline"
                >
                  {t('forgot-password.resend-code')}
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
