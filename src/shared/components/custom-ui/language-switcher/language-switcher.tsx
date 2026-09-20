import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams();

  const newLocale = locale === 'ar' ? 'en' : 'ar';

  const changeLanguage = () => {
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`);
    navigate(newPath);
  };

  return (
    <button type="button" onClick={changeLanguage}>
      {locale === 'ar' ? t('language.english') : t('language.arabic')}
    </button>
  );
}
