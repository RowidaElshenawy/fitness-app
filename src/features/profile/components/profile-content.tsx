import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import { logout } from '@/store/slices/auth.slice';
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
import type { ActivityLevel, Goal } from '@/features/auth/types/register';
import { ACTIVITY_LEVEL_OPTIONS } from '@/features/auth/components/register/steps/activity-step';
import { GOAL_OPTIONS } from '@/features/auth/components/register/steps/goal-step';

const ProfileContent = () => {
  // Translation
  const { t } = useTranslation();

  // Navigation
  const navigate = useNavigate();
  const { locale } = useParams();

  // State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Redux state
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // Hooks
  const { mutate: editProfileMutation, isPending } = useEditProfile();
  const { theme, setTheme } = useTheme();

  // Authentication guard
  if (!user) {
    return null;
  }

  // Variables
  const { goal, activityLevel, weight } = user;

  // Functions
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    navigate(location.pathname.replace(`/${locale}`, `/${nextLocale}`));
  };

  return (
    <div className="px-4 pb-6 pt-28 sm:px-6 sm:pb-8 lg:px-32 xl:px-96 lg:pb-0">
      {/* KYC */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-2">
        {/* Goal */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-text-plain text-2xl font-semibold">{t('profile.goal')}</span>
          <span className="text-xs uppercase text-text-plain/60">{t('profile.tap-to-change')}</span>
          <KycSelectField
            value={goal}
            options={GOAL_OPTIONS}
            onChange={(value) => editProfileMutation({ goal: value as Goal })}
            disabled={isPending}
          />
        </div>

        {/* Activity level */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-text-plain text-2xl font-semibold">
            {t('profile.activity-level')}
          </span>
          <span className="text-xs uppercase text-text-plain/60">{t('profile.tap-to-change')}</span>
          <KycSelectField
            value={activityLevel}
            options={ACTIVITY_LEVEL_OPTIONS}
            onChange={(value) => editProfileMutation({ activityLevel: value as ActivityLevel })}
            disabled={isPending}
          />
        </div>

        {/* Weight */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-text-plain text-2xl font-semibold">{t('profile.weight')}</span>
          <span className="text-xs uppercase text-text-plain/60">{t('profile.tap-to-change')}</span>
          <KycWeightField
            value={weight}
            onSave={(value) => editProfileMutation({ weight: value })}
            disabled={isPending}
          />
        </div>
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
        <div className="sm:col-span-2 lg:col-span-1 lg:col-start-2">
          <ProfileActionCard icon={LogOut} title={t('profile.logout')} onClick={handleLogout} />
        </div>
      </div>

      <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
    </div>
  );
};

export default ProfileContent;
