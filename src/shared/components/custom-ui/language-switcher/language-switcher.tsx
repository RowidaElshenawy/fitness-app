import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../ui/button';

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
    <Button type="button" onClick={changeLanguage} className="cursor-pointer">
      {locale === 'ar' ? t('language.english') : t('language.arabic')}
    </Button>
  );
}
