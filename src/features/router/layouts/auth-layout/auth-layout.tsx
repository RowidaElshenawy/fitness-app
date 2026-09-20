import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Auth</h1>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
