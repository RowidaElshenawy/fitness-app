import CustomInput from '@/shared/components/custom-ui/custom-input';
import LoginRegisterDesign from '../shared/login-register-design';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { REGISTER_SCHEMA } from '../../schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TRegisterData } from '../../types/register';
export default function RegisterForm() {
  const { t } = useTranslation();
  const SCHEMA = useMemo(() => REGISTER_SCHEMA(t), [t]);
  //form

  const form = useForm<TRegisterData>({
    resolver: zodResolver(SCHEMA),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //function
  const onSubmit = 2;

  return (
    <>
      <LoginRegisterDesign
        buttonTitle="Register"
        spanTitle="Already Have an account ?"
        linkTitle="Register"
        href="/:locale/login"
        form={form}
        onSubmit={onSubmit}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="email" {...field} error={fieldState.invalid} />
          )}
        />

        <CustomInput variant="password" subVariant="password" />
      </LoginRegisterDesign>
    </>
  );
}
