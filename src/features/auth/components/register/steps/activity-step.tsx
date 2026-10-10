import { useTranslation } from 'react-i18next';
import SelectableOption from './selectable-option';
import type { ActivityLevel } from '../../../types/register';

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: 'level1', labelKey: 'auth.kyc.activity.rookie' },
  { value: 'level2', labelKey: 'auth.kyc.activity.beginner' },
  { value: 'level3', labelKey: 'auth.kyc.activity.intermediate' },
  { value: 'level4', labelKey: 'auth.kyc.activity.advance' },
  { value: 'level5', labelKey: 'auth.kyc.activity.true-beast' },
] as const;

interface ActivityStepProps {
  activityLevel: ActivityLevel | '';
  onSelectActivityLevel: (activityLevel: ActivityLevel) => void;
}

export const ActivityStep = ({ activityLevel, onSelectActivityLevel }: ActivityStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {ACTIVITY_LEVEL_OPTIONS.map((option) => (
        <SelectableOption
          key={option.value}
          label={t(option.labelKey)}
          isSelected={activityLevel === option.value}
          onSelect={() => onSelectActivityLevel(option.value)}
        />
      ))}
    </div>
  );
};
