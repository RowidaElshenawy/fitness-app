import { useTranslation } from 'react-i18next';
import SelectableOption from './selectable-option';
import type { Goal } from '../../../types/register';

const GOAL_OPTIONS = [
  { value: 'Gain weight', labelKey: 'auth.kyc.goal.gain-weight' },
  { value: 'Lose weight', labelKey: 'auth.kyc.goal.lose-weight' },
  { value: 'Get fitter', labelKey: 'auth.kyc.goal.get-fitter' },
  { value: 'Gain flexibility', labelKey: 'auth.kyc.goal.gain-flexibility' },
  { value: 'Learn the basics', labelKey: 'auth.kyc.goal.learn-basics' },
] as const;

interface GoalStepProps {
  goal: Goal | '';
  onSelectGoal: (goal: Goal) => void;
}

export const GoalStep = ({ goal, onSelectGoal }: GoalStepProps) => {
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
