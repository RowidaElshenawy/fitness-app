import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { ForgotPasswordForm } from '../components/forgot-password/forgot-password-flow';
import { forgotPassword, resetPassword, verifyResetCode } from '../lib/apis/forgot-password.api';

export type ForgotPasswordStep = 'email' | 'code' | 'password';

const useForgotPassword = (form: UseFormReturn<ForgotPasswordForm>) => {
  const navigate = useNavigate();

  const [step, setStep] = useState<ForgotPasswordStep>('password');

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => setStep('code'),
  });

  const verifyResetCodeMutation = useMutation({
    mutationFn: verifyResetCode,
    onSuccess: () => setStep('password'),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate('../login');
    },
  });

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

    resetPasswordMutation.mutate({ email, newPassword });
  };

  const handleResendCode = () => {
    const { email } = form.getValues();

    forgotPasswordMutation.mutate({ email });
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

    navigate('../login');
  };

  const isPending =
    forgotPasswordMutation.isPending ||
    verifyResetCodeMutation.isPending ||
    resetPasswordMutation.isPending;

  const getErrorMessage = (error: unknown) =>
    isAxiosError(error) ? String(error.response?.data?.error ?? '') : '';

  const stepError = {
    email: getErrorMessage(forgotPasswordMutation.error),
    code: getErrorMessage(verifyResetCodeMutation.error),
    password: getErrorMessage(resetPasswordMutation.error),
  }[step];

  return {
    step,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    handleResendCode,
    handleBack,
    isPending,
    stepError,
  };
};

export default useForgotPassword;
