import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LanguageProvider() {
  const { locale } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (locale === 'ar' || locale === 'en') {
      i18n.changeLanguage(locale);

      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [locale, i18n]);

  return null;
}
