import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChangePasswordModal from '@/features/profile/components/change-password-modal';
import LogoutButton from '@/features/profile/components/logout-button';
import { Button } from '@/shared/components/ui/button';
import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';

const Profile = () => {
  const { t } = useTranslation();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsChangePasswordOpen(true)}
        className="cursor-pointer"
      >
        {t('profile.change-password.title')}
      </Button>
      <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
      <LanguageSwitcher />
      <LogoutButton />;
    </>
  );
};

export default Profile;
