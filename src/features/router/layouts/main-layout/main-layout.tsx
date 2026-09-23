import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';

import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
const MainLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <Button variant="outline" icon={<ArrowUpRight />}>
        Explore More
      </Button>
      <Button variant="ghost" icon={<ArrowUpRight />}>
        Get Started
      </Button>
      <Outlet />
    </div>
  );
};

export default MainLayout;
