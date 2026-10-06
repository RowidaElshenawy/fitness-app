import CustomInput from '@/shared/components/custom-ui/custom-input';
import LoginRegisterDesign from '../shared/login-register-design';
import { Controller, useForm } from 'react-hook-form';
import { loginSchema } from '../../schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TLoginField } from '../../types/login-field';
import { useLogin } from '../../hooks/use-login';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';

const LoginForm = () => {
  const { locale } = useParams();
  //translation
  const { t } = useTranslation();
  //mutation
  const { mutate: login, backendError } = useLogin();
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
    login(userData);
  };

  return (
    <>
      <LoginRegisterDesign
        buttonTitle={t('auth.login.title')}
        spanTitle={t('auth.login.dont-have-an-account')}
        linkTitle={t('auth.login.register')}
        title={t('auth.login.title')}
        forgotPassword={t('auth.login.forgot-password')}
        or={t('auth.login.or')}
        href={`/${locale}/register`}
        form={form}
        onSubmit={onSubmit}
        // loading={isPending}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <CustomInput variant="email" {...field} error={fieldState.invalid} />
              {fieldState.error && <ErrorAlert errorMessage={fieldState.error?.message} />}
            </>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomInput
                variant="password"
                {...field}
                subVariant="password"
                error={fieldState.invalid}
              />
              {fieldState.error && <ErrorAlert errorMessage={fieldState.error?.message} />}
            </div>
          )}
        />
        {backendError && <ErrorAlert errorMessage={backendError} />}
      </LoginRegisterDesign>
    </>
  );
};

export default LoginForm;
