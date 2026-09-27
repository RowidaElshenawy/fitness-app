import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectableOption from './share/selectable-option';
import { GOAL_OPTIONS } from '../constants/kyc-options';
import type { Goal } from '../types/kyc';

interface GoalStepProps {
  goal: Goal | '';
  onSelectGoal: (goal: Goal) => void;
}

export const GoalStep: React.FC<GoalStepProps> = ({ goal, onSelectGoal }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {GOAL_OPTIONS.map((option) => (
        <SelectableOption
          key={option.value}
          label={t(option.labelKey)}
          isSelected={goal === option.value}
          onSelect={() => onSelectGoal(option.value)}
        />
      ))}
    </div>
  );
};
