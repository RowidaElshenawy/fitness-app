import LoginForm from '@/features/auth/components/login/login-form';
import HeaderAuth from '@/features/auth/components/shared/header-auth';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderAuth subtitle={t('auth.subtitle-login-register')} title={t('auth.login.subtitle')} />
      <LoginForm />
    </>
  );
};

export default Login;
