import CustomInput from '@/shared/components/custom-ui/custom-input';
import LoginRegisterDesign from '../shared/login-register-design';
import { Controller, useForm } from 'react-hook-form';
// import { useState } from 'react';
import { loginSchema } from '../../schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../../api/login.api';
import type { TLoginField } from '../../types/login-field';
const LoginForm = () => {
  //mutation

  //form
  const form = useForm<TLoginField>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //function
  const onSubmit = async (userData: TLoginField) => {
    console.log(userData);
    const response = await login(userData);
    console.log(response);
  };

  return (
    <>
      <LoginRegisterDesign
        buttonTitle="Login"
        spanTitle="Dont have an account yet ? "
        linkTitle="Register"
        href="/:locale/register"
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
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput
              variant="password"
              {...field}
              subVariant="password"
              error={fieldState.invalid}
            />
          )}
        />
      </LoginRegisterDesign>
    </>
  );
};

export default LoginForm;
