import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import LanguageProvider from '@/shared/providers/providers/language-provider';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

export default function LocaleLayout() {
  const { locale } = useParams();
  const location = useLocation();
  const defaultLocale = 'en';

  if (locale !== 'en' && locale !== 'ar') {
    const segments = location.pathname.split('/').filter(Boolean);
    const remainingPath = segments.slice(1).join('/');
    const legacyAuthRoutes = ['login', 'register', 'forgot-password'];

    if (locale === 'register' && remainingPath === 'forgot-password') {
      return <Navigate to={`/${defaultLocale}/forgot-password`} replace />;
    }

    if (locale && legacyAuthRoutes.includes(locale)) {
      return (
        <Navigate
          to={`/${defaultLocale}/${locale}${remainingPath ? `/${remainingPath}` : ''}`}
          replace
        />
      );
    }

    if (locale === ':locale') {
      return (
        <Navigate to={`/${defaultLocale}${remainingPath ? `/${remainingPath}` : ''}`} replace />
      );
    }

    return <Navigate to={`/${defaultLocale}/${segments.join('/')}`} replace />;
  }

  return (
    <div className="min-h-screen bg-amber-950">
      <LanguageProvider />
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
}
