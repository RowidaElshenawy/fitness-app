import { Button } from '@/shared/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <Button type="button" onClick={handleLogout} className="cursor-pointer">
      {t('profile.logout')}
    </Button>
  );
};

export default LogoutButton;
