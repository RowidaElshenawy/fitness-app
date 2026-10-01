import RegisterSteps from '@/features/auth/components/register/register-steps';
import HeaderAuth from '@/features/auth/components/shared/header-auth';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderAuth subtitle={t('auth.subtitle-login-register')} title={t('auth.login.subtitle')} />
      <RegisterSteps />;
    </>
  );
}
