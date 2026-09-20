import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './shared/components/custom-ui/language-switcher/language-switcher';
import RegisterPage from './app/auth-pages/register';

function App() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      <h1 className="bg-bg-palin">{t('welcome')}</h1>
      <RegisterPage />
    </>
  );
}

export default App;
