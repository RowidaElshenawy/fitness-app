import LanguageProvider from '@/shared/providers/providers/language-provider';
import { Outlet } from 'react-router-dom';

export default function LocaleLayout() {
  return (
    <>
      <LanguageProvider />
      <Outlet />
    </>
  );
}
