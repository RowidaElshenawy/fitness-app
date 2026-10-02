import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { forgotPassword, resetPassword, verifyResetCode } from '../../lib/apis/forgot-password.api';
import EmailStep from './email-step';
import ResetPasswordStep from './reset-password-step';
import VerifyCodeStep from './verify-code-step';

type ForgotPasswordStep = 'email' | 'code' | 'password';

export interface ForgotPasswordForm {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordForm = () => {
  // Navigation
  const navigate = useNavigate();

  const { locale } = useParams<{ locale: string }>();

  // State
  const [step, setStep] = useState<ForgotPasswordStep>('email');

  // Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setStep('code');
    },
  });

  const verifyResetCodeMutation = useMutation({
    mutationFn: verifyResetCode,
    onSuccess: () => {
      setStep('password');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate(`/${locale}`);
    },
  });

  // Form
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Variables
  const isPending =
    forgotPasswordMutation.isPending ||
    verifyResetCodeMutation.isPending ||
    resetPasswordMutation.isPending;

  const forgotPasswordError = isAxiosError(forgotPasswordMutation.error)
    ? String(forgotPasswordMutation.error.response?.data?.error ?? '')
    : '';

  // Functions
  const handleEmailSubmit = () => {
    const { email } = form.getValues();

    forgotPasswordMutation.mutate({ email });
  };

  const handleCodeSubmit = () => {
    const { resetCode } = form.getValues();

    verifyResetCodeMutation.mutate({ resetCode });
  };

  const handlePasswordSubmit = () => {
    const { email, newPassword } = form.getValues();

    resetPasswordMutation.mutate({
      email,
      newPassword,
    });
  };

  const handleBack = () => {
    if (step === 'code') {
      setStep('email');
      return;
    }

    if (step === 'password') {
      setStep('code');
      return;
    }

    navigate(`/${locale}`);
  };

  return (
    <FormProvider {...form}>
      {step === 'email' && (
        <EmailStep
          onSubmit={handleEmailSubmit}
          onBack={handleBack}
          isPending={isPending}
          error={forgotPasswordError}
        />
      )}

      {step === 'code' && (
        <VerifyCodeStep onSubmit={handleCodeSubmit} onBack={handleBack} isPending={isPending} />
      )}

      {step === 'password' && (
        <ResetPasswordStep
          onSubmit={handlePasswordSubmit}
          onBack={handleBack}
          isPending={isPending}
        />
      )}
    </FormProvider>
  );
};

export default ForgotPasswordForm;
