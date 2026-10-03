import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import LanguageProvider from '@/shared/providers/providers/language-provider';
import { Outlet } from 'react-router-dom';

export default function LocaleLayout() {
  return (
    <div className="min-h-screen bg-amber-950">
      <LanguageProvider />
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
}
