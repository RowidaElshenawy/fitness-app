'use client';

import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import { FieldGroup, Field } from '@/shared/components/ui/field';

import LoginRegisterDesign from '../shared/login-register-design';
import type { TUserInfoData, TUserInfoProps } from '../../types/register';
import { USER_INFO_SCHEMA } from '../../schema/register.schema';
import HeaderAuth from '../shared/header-auth';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';

export default function UserInfoForm({ setUserInfo, setStep }: TUserInfoProps) {
  const { t } = useTranslation();
  const { locale = 'en' } = useParams();

  const translateError = (message?: string) => (message ? t(message) : undefined);

  const form = useForm<TUserInfoData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
    },
    resolver: zodResolver(USER_INFO_SCHEMA),
  });

  const onSubmit = (data: TUserInfoData) => {
    console.log(data);
    setUserInfo(data);
    setStep('gender');
  };

  return (
    <>
      <HeaderAuth subtitle={t('auth.subtitle-login-register')} title={t('auth.register.title')} />
      <LoginRegisterDesign
        or={t('auth.or')}
        buttonTitle={t('auth.login.register')}
        spanTitle={t('auth.register.already-have-account')}
        linkTitle={t('auth.register.login')}
        title={t('auth.login.register')}
        forgotPassword={t('auth.login.forgot-password')}
        href={`/${locale}/login`}
        form={form}
        onSubmit={onSubmit}
      >
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <CustomInput
                  {...field}
                  id="firstName"
                  autoComplete="given-name"
                  variant="default"
                  subVariant="first-name"
                  errorMessage={translateError(fieldState.error?.message)}
                />
                {fieldState.invalid && (
                  <ErrorAlert errorMessage={translateError(fieldState.error?.message)} />
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <CustomInput
                  {...field}
                  id="lastName"
                  autoComplete="family-name"
                  variant="default"
                  subVariant="last-name"
                  errorMessage={translateError(fieldState.error?.message)}
                />
                {fieldState.invalid && (
                  <ErrorAlert errorMessage={translateError(fieldState.error?.message)} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <CustomInput
                  {...field}
                  id="email"
                  autoComplete="email"
                  variant="email"
                  errorMessage={translateError(fieldState.error?.message)}
                />
                {fieldState.invalid && (
                  <ErrorAlert errorMessage={translateError(fieldState.error?.message)} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <CustomInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                  variant="password"
                  subVariant="password"
                  errorMessage={translateError(fieldState.error?.message)}
                />
                {fieldState.invalid && (
                  <ErrorAlert errorMessage={translateError(fieldState.error?.message)} />
                )}
              </Field>
            )}
          />

          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <CustomInput
                  {...field}
                  id="rePassword"
                  autoComplete="new-password"
                  variant="password"
                  subVariant="confirm-password"
                  errorMessage={translateError(fieldState.error?.message)}
                />
                {fieldState.invalid && (
                  <ErrorAlert errorMessage={translateError(fieldState.error?.message)} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </LoginRegisterDesign>
    </>
  );
}
