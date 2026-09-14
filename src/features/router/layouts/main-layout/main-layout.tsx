import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const { t } = useTranslation();
  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
