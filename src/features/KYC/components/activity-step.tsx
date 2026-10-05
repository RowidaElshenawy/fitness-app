import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectableOption from './share/selectable-option';
import { ACTIVITY_LEVEL_OPTIONS } from '../constants/kyc-options';
import type { ActivityLevel } from '../types/kyc';

interface ActivityStepProps {
  activityLevel: ActivityLevel | '';
  onSelectActivityLevel: (activityLevel: ActivityLevel) => void;
}

export const ActivityStep: React.FC<ActivityStepProps> = ({
  activityLevel,
  onSelectActivityLevel,
}) => {
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
