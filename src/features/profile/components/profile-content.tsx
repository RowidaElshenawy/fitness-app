import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Languages,
  LifeBuoy,
  LockKeyhole,
  LogOut,
  Moon,
  Settings,
  ShieldAlert,
} from 'lucide-react';

import ChangePasswordModal from '@/features/profile/components/change-password-modal';
import KycSelectField from '@/features/profile/components/kyc-select-field';
import KycWeightField from '@/features/profile/components/kyc-weight-field';
import ProfileActionCard from '@/features/profile/components/profile-action-card';
import { useEditProfile } from '@/features/profile/hooks/use-edit-profile';
import { useProfileData } from '@/features/profile/hooks/use-profile-data';
import { useTheme } from '@/features/profile/hooks/use-theme';
import type { ActivityLevel, Goal } from '@/features/KYC/types/kyc';
import { ACTIVITY_LEVEL_OPTIONS, GOAL_OPTIONS } from '@/features/KYC/constants/kyc-options';

const ProfileContent = () => {
  // Translation
  const { t } = useTranslation();

  // Navigation
  const navigate = useNavigate();
  const { locale } = useParams();

  // State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Custom hooks
  const { data } = useProfileData();
  const { mutate: editProfileMutation, isPending } = useEditProfile();
  const { theme, changeTheme } = useTheme();

  // Variables
  if (!data) {
    return null;
  }

  const { goal, activityLevel, weight } = data.user;

  // Functions
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    changeTheme(nextTheme);
  };

  const handleLanguageChange = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    navigate(location.pathname.replace(`/${locale}`, `/${nextLocale}`));
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* KYC */}
      <div className="mb-10 mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Goal */}
        <KycSelectField
          label={t('profile.goal')}
          value={goal}
          options={GOAL_OPTIONS}
          onChange={(value) =>
            editProfileMutation({
              goal: value as Goal,
            })
          }
          disabled={isPending}
        />

        {/* Activity level */}
        <KycSelectField
          label={t('profile.activity-level')}
          value={activityLevel}
          options={ACTIVITY_LEVEL_OPTIONS}
          onChange={(value) =>
            editProfileMutation({
              activityLevel: value as ActivityLevel,
            })
          }
          disabled={isPending}
        />

        {/* Weight */}
        <KycWeightField
          value={weight}
          onSave={(value) => editProfileMutation({ weight: value })}
          disabled={isPending}
        />
      </div>

      {/* Actions */}
      <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Change Password */}
        <ProfileActionCard
          icon={LockKeyhole}
          title={t('profile.change-password.title')}
          onClick={() => setIsChangePasswordOpen(true)}
        />

        {/* Language */}
        <ProfileActionCard
          icon={Languages}
          title={t('profile.language')}
          value={locale === 'ar' ? 'العربية' : 'English'}
          onClick={handleLanguageChange}
        />

        {/* Theme */}
        <ProfileActionCard
          icon={Moon}
          title={t('profile.mood')}
          value={theme === 'dark' ? 'Dark' : 'Light'}
          onClick={handleThemeChange}
        />

        {/* Static */}
        <ProfileActionCard icon={Settings} title={t('profile.security')} />
        <ProfileActionCard icon={ShieldAlert} title={t('profile.privacy-policy')} />
        <ProfileActionCard icon={LifeBuoy} title={t('profile.help')} />

        {/* Logout */}
        <ProfileActionCard icon={LogOut} title={t('profile.logout')} onClick={handleLogout} />
      </div>

      <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
    </div>
  );
};

export default ProfileContent;
