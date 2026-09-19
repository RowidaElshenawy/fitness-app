import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './shared/components/custom-ui/language-switcher/language-switcher';

function App() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
    </>
  );
}

export default App;
