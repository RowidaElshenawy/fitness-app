import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/ui/button';
import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import ChangePasswordModal from '@/features/profile/components/change-password-modal';
import KycSelectField from '@/features/profile/components/kyc-select-field';
import KycWeightField from '@/features/profile/components/kyc-weight-field';
import LogoutButton from '@/features/profile/components/logout-button';
import ThemeToggle from '@/features/profile/components/theme-toggle';
import { useEditProfile } from '@/features/profile/hooks/use-edit-profile';
import { useProfileData } from '@/features/profile/hooks/use-profile-data';
import type { ActivityLevel, Goal } from '@/features/KYC/types/kyc';
import { ACTIVITY_LEVEL_OPTIONS, GOAL_OPTIONS } from '@/features/KYC/constants/kyc-options';

const Profile = () => {
  const { t } = useTranslation();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const { data } = useProfileData();
  const { mutate: editProfileMutation, isPending } = useEditProfile();

  if (!data) {
    return null;
  }

  const { goal, activityLevel, weight } = data.user;

  return (
    <>
      <div className="flex gap-8 text-white">
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
        <KycWeightField
          value={weight}
          onSave={(value) => editProfileMutation({ weight: value })}
          disabled={isPending}
        />
      </div>
      <Button
        type="button"
        onClick={() => setIsChangePasswordOpen(true)}
        className="cursor-pointer"
      >
        {t('profile.change-password.title')}
      </Button>
      <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
      <LanguageSwitcher />
      <ThemeToggle />
      <LogoutButton />;
    </>
  );
};

export default Profile;
